"use client";

import { useState, useEffect } from "react";
import { Search, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { processImageSearch } from "@/actions/home";
import useFetch from "@/hooks/use-fetch";
import { FileUpload } from "@/components/file-upload";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export function HomeSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [uploadKey, setUploadKey] = useState(Date.now()); // 🔑 New key for FileUpload reset

  const {
    loading: isProcessing,
    fn: processImageFn,
    data: processResult,
    error: processError,
  } = useFetch(processImageSearch);

  useEffect(() => {
    if (processResult?.success) {
      const params = new URLSearchParams();
      if (processResult.data.make) params.set("make", processResult.data.make);
      if (processResult.data.bodyType)
        params.set("bodyType", processResult.data.bodyType);
      if (processResult.data.color)
        params.set("color", processResult.data.color);
      router.push(`/cars?${params.toString()}`);
    }
  }, [processResult, router]);

  useEffect(() => {
    if (processError) {
      toast.error(
        "Failed to analyze image: " + (processError.message || "Unknown error")
      );
    }
  }, [processError]);

  const handleFileChange = (files) => {
    const file = files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are supported");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setSearchImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setIsUploading(false);
      toast.success("Image uploaded successfully");
    };
    reader.onerror = () => {
      setIsUploading(false);
      toast.error("Failed to read the image");
    };
    reader.readAsDataURL(file);
  };

  const handleTextSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      console.log(searchTerm);
      return;
    }
    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleImageSearch = async (e) => {
    e.preventDefault();
    if (!searchImage) {
      toast.error("Please upload an image first");
      return;
    }
    await processImageFn(searchImage);
  };

  return (
    <div>
      <div className="relative flex items-center w-full gap-5 px-2">
        <PlaceholdersAndVanishInput
          placeholders={[
            "Search by brand…",
            "Search by model…",
            "Try 'Comet EV'…",
            "Search electric SUVs…",
          ]}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleTextSearch}
          className="w-full"
        />
        {/* 
        <Button
          className={cn(
            "cursor-pointer rounded-xl px-6 py-3 font-semibold transition-colors p-6.5",
            isImageSearchActive
              ? "bg-[#E3F8A9] text-[#22290F] hover:bg-[#d5eba1]"
              : "bg-[#CCF500] text-[#111111] hover:bg-[#b6e000]"
          )}
        >
          AI Search
          <Camera size={25} />
        </Button> */}

        <HoverBorderGradient
          onClick={() => setIsImageSearchActive(!isImageSearchActive)}
          className="flex cursor-pointer gap-2 items-center text-lg font-semibold"
        >
          <Camera size={21} />
          AI Search
        </HoverBorderGradient>
      </div>

      {isImageSearchActive && (
        <div className="mt-6 relative">
          <form onSubmit={handleImageSearch} className="space-y-4">
            {/* 🔁 FileUpload with dynamic key to reset on removal */}
            <FileUpload key={uploadKey} onChange={handleFileChange} />

            {imagePreview && (
              <div className="mt-4 flex flex-col items-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-40 object-contain rounded-md border mb-2"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchImage(null);
                    setImagePreview("");
                    setUploadKey(Date.now()); // 🧠 Force re-render of FileUpload
                    toast.info("Image removed");
                  }}
                >
                  Remove Image
                </Button>
              </div>
            )}

            {imagePreview && (
              <Button
                type="submit"
                className="w-full z-20"
                disabled={isUploading || isProcessing}
              >
                {isUploading
                  ? "Uploading..."
                  : isProcessing
                  ? "Analyzing image..."
                  : "Search with this Image"}
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
