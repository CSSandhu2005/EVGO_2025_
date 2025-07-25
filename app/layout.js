import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import FooterSection from "@/components/footersection";
import EVGONavbarWrapper from "@/components/evgo-navbar-wrapper";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EVGO - India's Largest EV Selling Platform.",
  description: "Buy and sell your EV in India in just a few steps.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <EVGONavbarWrapper />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <FooterSection />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
