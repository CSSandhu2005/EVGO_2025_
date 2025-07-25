import { SignInButton, UserButton } from "@clerk/nextjs"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowLeft, CarFront, Heart, Layout, Menu } from "lucide-react"
import { checkUser } from "../lib/checkUser"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

const Header = async ({ isAdminPage = false }) => {
  const user = await checkUser()
  const isAdmin = user?.role === "ADMIN"

  const NavigationButtons = () => (
    <>
      {isAdminPage ? (
        <Link href="/saved-cars">
          <Button className="bg-black text-white hover:bg-gray-800 transition-colors">
            <ArrowLeft size={18} />
            <span>Back To App</span>
          </Button>
        </Link>
      ) : (
        <SignedIn>
          <Link href="/saved-cars">
            <Button variant="ghost" className="text-black hover:bg-black/10 transition-colors">
              <Heart size={18} />
              <span className="hidden sm:inline ml-2">Saved Cars</span>
            </Button>
          </Link>

          {!isAdmin ? (
            <Link href="/reservations">
              <Button variant="ghost" className="text-black hover:bg-black/10 transition-colors">
                <CarFront size={18} />
                <span className="hidden sm:inline ml-2">Reservations</span>
              </Button>
            </Link>
          ) : (
            <Link href="/admin">
              <Button variant="ghost" className="text-black hover:bg-black/10 transition-colors">
                <Layout size={18} />
                <span className="hidden sm:inline ml-2">Admin Portal</span>
              </Button>
            </Link>
          )}
        </SignedIn>
      )}
    </>
  )

  return (
    <header className="fixed top-0 w-full bg-[#d4fe01]/95 backdrop-blur-lg z-50 border-b border-black/10 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/EVGO.png"
              width={160}
              height={48}
              alt="EVGO LOGO"
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-black/20",
                  },
                }}
              />
            </SignedIn>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-black hover:bg-black/10">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-white border-l border-black/10">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                    <Image
                      src="/EVGO.png"
                      width={120}
                      height={36}
                      alt="EVGO LOGO"
                      className="h-8 w-auto object-contain"
                    />
                  </div>

                  {isAdminPage ? (
                    <Link href="/saved-cars" className="w-full">
                      <Button className="w-full justify-start bg-black text-white hover:bg-gray-800">
                        <ArrowLeft size={18} />
                        <span className="ml-2">Back To App</span>
                      </Button>
                    </Link>
                  ) : (
                    <SignedIn>
                      <Link href="/saved-cars" className="w-full">
                        <Button variant="ghost" className="w-full justify-start text-black hover:bg-gray-100">
                          <Heart size={18} />
                          <span className="ml-2">Saved Cars</span>
                        </Button>
                      </Link>

                      {!isAdmin ? (
                        <Link href="/reservations" className="w-full">
                          <Button variant="ghost" className="w-full justify-start text-black hover:bg-gray-100">
                            <CarFront size={18} />
                            <span className="ml-2">Reservations</span>
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/admin" className="w-full">
                          <Button variant="ghost" className="w-full justify-start text-black hover:bg-gray-100">
                            <Layout size={18} />
                            <span className="ml-2">Admin Portal</span>
                          </Button>
                        </Link>
                      )}
                    </SignedIn>
                  )}

                  <SignedOut>
                    <SignInButton forceRedirectUrl="/">
                      <Button className="w-full bg-black text-white hover:bg-gray-800">Sign In</Button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
