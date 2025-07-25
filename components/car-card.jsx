"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Car as CarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { toggleSavedCar } from "@/actions/car-listing";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { CardSpotlight } from "./ui/card-spotlight";

import React, { useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export const CarCard = ({ car }) => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(car.wishlisted);

  // Use the useFetch hook
  const {
    loading: isToggling,
    fn: toggleSavedCarFn,
    data: toggleResult,
    error: toggleError,
  } = useFetch(toggleSavedCar);

  // Handle toggle result with useEffect
  useEffect(() => {
    if (toggleResult?.success && toggleResult.saved !== isSaved) {
      setIsSaved(toggleResult.saved);
      toast.success(toggleResult.message);
    }
  }, [toggleResult, isSaved]);

  // Handle errors with useEffect
  useEffect(() => {
    if (toggleError) {
      toast.error("Failed to update favorites");
    }
  }, [toggleError]);

  // Handle save/unsave car
  const handleToggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      toast.error("Please sign in to save cars");
      router.push("/sign-in");
      return;
    }

    if (isToggling) return;

    // Call the toggleSavedCar function using our useFetch hook
    await toggleSavedCarFn(car.id);
  };

  return (
    <CardSpotlight>
      <Card className="overflow-hidden hover:shadow-lg transition group">
        <div className="relative h-48">
          {car.images && car.images.length > 0 ? (
            <div className="relative w-full h-full">
              <Image
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <CarIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/90 rounded-full p-1.5 ${
              isSaved
                ? "text-red-500 hover:text-red-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={handleToggleSave}
            disabled={isToggling}
          >
            {isToggling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart className={isSaved ? "fill-current" : ""} size={20} />
            )}
          </Button>
        </div>

        <CardContent className="p-4 relative">
          <div className="flex flex-col mb-2">
            <h3 className="text-lg font-bold line-clamp-1">
              {car.make} {car.model}
            </h3>
            <span className="text-xl font-bold text-[#d4ff16]">
              ₹{new Intl.NumberFormat("en-IN").format(car.price)}
            </span>
          </div>

          <div className="text-white mb-2 flex items-center">
            <span>{car.year}</span>
            <span className="mx-2">•</span>
            <span>{car.transmission}</span>
            <span className="mx-2">•</span>
            <span>{car.fuelType}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            <Badge variant="outline" className="bg-gray-50 dark:text-black">
              {car.bodyType}
            </Badge>
            <Badge variant="outline" className="bg-gray-50 dark:text-black">
              {new Intl.NumberFormat("en-IN").format(car.mileage)} Kms
            </Badge>
            <Badge variant="outline" className="bg-gray-50 dark:text-black">
              {car.color}
            </Badge>
          </div>

          <div className="flex justify-between mb-2">
            <Button
              className="flex-1"
              onClick={() => {
                router.push(`/cars/${car.id}`);
              }}
            >
              View Car
            </Button>
          </div>

          <>
            <AnimatePresence>
              {active && typeof active === "object" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 h-full w-full z-10"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {active && typeof active === "object" ? (
                <div className="fixed inset-0 grid place-items-center z-[100]">
                  <motion.button
                    key={`button-${active.title}-${id}`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.05 },
                    }}
                    className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                    onClick={() => setActive(null)}
                  >
                    <CloseIcon />
                  </motion.button>
                  <motion.div
                    layoutId={`card-${active.title}-${id}`}
                    ref={ref}
                    className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                  >
                    <motion.div layoutId={`image-${active.title}-${id}`}>
                      <img
                        width={200}
                        height={200}
                        src={car.images[0]}
                        alt={active.title}
                        className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                      />
                    </motion.div>

                    <div>
                      <div className="flex justify-between items-start p-4">
                        <div>
                          <motion.h3
                            layoutId={`title-${active.title}-${id}`}
                            className="font-bold text-neutral-700 dark:text-neutral-200"
                          >
                            {car.make} {car.model}
                          </motion.h3>
                          <motion.p
                            layoutId={`description-${active.description}-${id}`}
                            className="text-neutral-600 dark:text-neutral-400"
                          >
                            {car.year}
                          </motion.p>
                        </div>

                        <motion.a
                          layoutId={`button-${active.title}-${id}`}
                          href={active.ctaLink}
                          target="_blank"
                          className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                        >
                          Book Test Ride
                        </motion.a>
                      </div>
                      <div className="pt-4 relative px-4">
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                        >
                          {car.description}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>
            <ul className="max-w-2xl mx-auto w-full gap-4">
              {cards.map((card) => (
                <motion.div
                  layoutId={`card-${card.title}-${id}`}
                  key={`card-${card.title}-${id}`}
                  onClick={() => setActive(card)}
                  className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                >
                  <div className="flex gap-4 flex-col md:flex-row">
                    <motion.div layoutId={`image-${card.title}-${id}`}>
                      <img
                        width={100}
                        height={100}
                        src={car.images[0]}
                        alt={car.images[0]}
                        className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                      />
                    </motion.div>
                    <div>
                      <motion.h3
                        layoutId={`title-${car.make}-${id}`}
                        className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                      >
                        {car.make}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${card.description}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                      >
                        {car.model}
                      </motion.p>
                    </div>
                  </div>
                  <motion.button
                    layoutId={`button-${card.title}-${id}`}
                    className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                  >
                    EV Analysis
                  </motion.button>
                </motion.div>
              ))}
            </ul>
          </>
        </CardContent>
      </Card>
    </CardSpotlight>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.05 },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Lana Del Rey, an iconic American singer-songwriter, is celebrated for
        her melancholic and cinematic music style. Born Elizabeth Woolridge
        Grant in New York City, she has captivated audiences worldwide with her
        haunting voice and introspective lyrics. <br />
        <br />
        Her songs often explore themes of tragic romance, glamour, and
        melancholia, drawing inspiration from both contemporary and vintage pop
        culture. With a career that has seen numerous critically acclaimed
        albums, Lana Del Rey has established herself as a unique and influential
        figure in the music industry.
      </p>
    ),
  },
];
