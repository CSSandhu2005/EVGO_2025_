import { SignInButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";

const Header = async ({ isAdminPage = false }) => {
  const isAdmin = false;

  return (
    <header className="fixed top-0 w-full bg-[#d4fe01]/80 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">

        <Link href="#" className="flex items-center">
        {/* LOGO SIDE */}
          <Image
            src={"/EVGO.png"}
            width={200}
            height={60}
            alt="EVGO LOGO"
            className="h-12 w-auto object-contain rounded-full"
          />
          {isAdminPage && (
            <span className="text-xs font-extralight">admin</span>
          )}
        </Link>



        {/* BUTTONS SIDE */}
        <div className="flex items-center space-x-5">
          {isAdminPage ? (
            <Link href="/saved-cars">
                <Button>
                  <ArrowLeft size={18} />
                  <span>Back To App</span>
                </Button>
              </Link>
          ) : (
            <SignedIn>
              {/* SAVED CARS BUTTON */}
              <Link href="/saved-cars">
                <Button>
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>

              {!isAdmin ? (
                <Link href="/reservations">
                  <Button variant="outline">
                    <CarFront size={18} />
                    <span className="hidden md:inline">Reservations</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/admin">
                  <Button variant="outline">
                    <Layout size={18} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              }
            }}/>
          </SignedIn>
        </div>


      </nav>
    </header>
  );
};

export default Header;
