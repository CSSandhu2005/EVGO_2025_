"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "./navbar-components";

const EVGONavbar = ({ isAdminPage = false, user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = user?.role === "ADMIN";

  // Create navigation items for NavItems component
  const getNavItems = () => {
    if (isAdminPage) {
      return [{ name: "Back To App", link: "/saved-cars" }];
    }

    const items = [];
    if (user) {
      items.push({ name: "Saved Cars", link: "/saved-cars" });
      if (!isAdmin) {
        items.push({ name: "Reservations", link: "/reservations" });
      } else {
        items.push({ name: "Admin Portal", link: "/admin" });
      }
    }
    return items;
  };

  return (
    <Navbar className="mt-2">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />

        <SignedIn>
          <NavItems items={getNavItems()} />
        </SignedIn>

        <div className="flex items-center space-x-4">
          {isAdminPage && (
            <NavbarButton href="/saved-cars" variant="dark">
              <ArrowLeft size={16} className="mr-2" />
              Back To App
            </NavbarButton>
          )}

          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <NavbarButton variant="dark">Sign In</NavbarButton>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-9 h-9 ring-2 ring-black/20 hover:ring-black/40 transition-all",
                  userButtonPopoverCard: "shadow-xl border border-black/10",
                },
              }}
            />
          </SignedIn>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />

          <div className="flex items-center space-x-2">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-black/20",
                  },
                }}
              />
            </SignedIn>

            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col space-y-3 w-full">
            {isAdminPage ? (
              <NavbarButton href="/saved-cars" variant="dark" className="w-full">
                <ArrowLeft size={16} className="mr-2" />
                Back To App
              </NavbarButton>
            ) : (
              <SignedIn>
                <NavbarButton href="/saved-cars" variant="primary" className="w-full">
                  <Heart size={16} className="mr-2" />
                  Saved Cars
                </NavbarButton>

                {!isAdmin ? (
                  <NavbarButton href="/reservations" variant="primary" className="w-full">
                    <CarFront size={16} className="mr-2" />
                    Reservations
                  </NavbarButton>
                ) : (
                  <NavbarButton href="/admin" variant="primary" className="w-full">
                    <Layout size={16} className="mr-2" />
                    Admin Portal
                  </NavbarButton>
                )}
              </SignedIn>
            )}

            <SignedOut>
              <SignInButton forceRedirectUrl="/">
                <NavbarButton variant="dark" className="w-full">
                  Sign In
                </NavbarButton>
              </SignInButton>
            </SignedOut>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default EVGONavbar;
