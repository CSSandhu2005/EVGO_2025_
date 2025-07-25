"use client"

import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import React, { useRef, useState } from "react"

// Base Navbar wrapper
export const Navbar = ({ children, className }) => {
  const ref = useRef(null)
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100)
  })

  return (
    <motion.div ref={ref} className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { visible }) : child
      )}
    </motion.div>
  )
}

// Desktop Navigation Body
export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "95%" : "100%",
        y: visible ? 10 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-6 py-3 lg:flex",
        visible ? "bg-[#d4fe01]/90" : "bg-[#d4fe01]/80",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// Mobile Navigation
export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "95%" : "100%",
        paddingRight: "16px",
        paddingLeft: "16px",
        borderRadius: visible ? "24px" : "0px",
        y: visible ? 10 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between py-3 lg:hidden",
        visible ? "bg-[#d4fe01]/90" : "bg-[#d4fe01]/80",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// Mobile Navigation Header
export const MobileNavHeader = ({ children, className }) => {
  return <div className={cn("flex w-full flex-row items-center justify-between px-2", className)}>{children}</div>
}

// Mobile Navigation Menu
export const MobileNavMenu = ({ children, className, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-6 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Mobile Navigation Toggle
export const MobileNavToggle = ({ isOpen, onClick }) => {
  return (
    <button onClick={onClick} className="p-2">
      {isOpen ? <IconX className="h-6 w-6 text-black" /> : <IconMenu2 className="h-6 w-6 text-black" />}
    </button>
  )
}

// EVGO Logo Component
export const EVGOLogo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image src="/EVGO.png" width={160} height={48} alt="EVGO LOGO" className="h-10 w-auto object-contain" priority />
    </Link>
  )
}

// Navigation Button Component
export const NavButton = ({ href, children, variant = "ghost", className, ...props }) => {
  return (
    <Link href={href}>
      <Button
        variant={variant}
        className={cn(
          "text-black hover:bg-black/10 transition-colors",
          variant === "default" && "bg-black text-white hover:bg-gray-800",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </Link>
  )
}

// Main Header Component
const AnimatedHeader = ({ isAdminPage = false, user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAdmin = user?.role === "ADMIN"

  const NavigationButtons = ({ isMobile = false }) => (
    <>
      {isAdminPage ? (
        <NavButton href="/saved-cars" variant="default" className={isMobile ? "w-full justify-start" : ""}>
          <ArrowLeft size={18} />
          <span className={isMobile ? "ml-2" : "ml-1"}>Back To App</span>
        </NavButton>
      ) : (
        <SignedIn>
          <NavButton href="/saved-cars" className={isMobile ? "w-full justify-start " : ""}>
            <Heart size={18} />
            <span className={isMobile ? "ml-2" : "hidden sm:inline ml-1"}>Saved Cars</span>
          </NavButton>

          {!isAdmin ? (
            <NavButton href="/reservations" className={isMobile ? "flex w-full justify-start" : ""}>
              <CarFront size={18} />
              <span className={isMobile ? "ml-2" : "hidden sm:inline ml-1"}>Reservations</span>
            </NavButton>
          ) : (
            <NavButton href="/admin" className={isMobile ? "w-full justify-start" : ""}>
              <Layout size={18} />
              <span className={isMobile ? "ml-2" : "hidden sm:inline ml-1"}>Admin Portal</span>
            </NavButton>
          )}
        </SignedIn>
      )}
    </>
  )

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <EVGOLogo />
        <div className="flex items-center space-x-4">
          <NavigationButtons />
          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button className="bg-black text-white hover:bg-gray-800 transition-colors">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 ring-2 ring-black/20 hover:ring-black/40 transition-all",
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
          <EVGOLogo />
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
            <MobileNavToggle isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <div className="flex flex-col space-y-3 w-full justify-center">
            <NavigationButtons isMobile />
            <SignedOut>
              <SignInButton forceRedirectUrl="/">
                <Button className="w-full bg-black text-white hover:bg-gray-800">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}

export default AnimatedHeader
