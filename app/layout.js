import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subset: ["latin"] });

export const metadata = {
  title: "EVGO - India's Largest EV Selling PlatForm.",
  description: "Buy And Sell Your EV In India In Just A Few Steps.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>

          <footer className="bg-[#d4fe01]/90 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>EVGO India&apos;s Exclusive EV Selling PlatForm .</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
