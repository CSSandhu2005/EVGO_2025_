import { getFeaturedCars } from "@/actions/home";
import { CarCard } from "@/components/car-card";
import { HomeSearch } from "@/components/home-search";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { bodyTypes, carMakes, faqItems } from "@/lib/data";
import { SignedOut } from "@clerk/nextjs";
import { Calendar, Car, ChevronRight, Heart, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const featuredCars = await getFeaturedCars() ; 

  return (
    <div className="pt-20 flex flex-col">
      {/* HERO */}

      <section className="relative py-16 md:py-28 dotted-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="bg-[#1a1a1a] font-extrabold tracking-tighter pr-2 pb-2 text-transparent bg-clip-text text-5xl md:text-8xl mb-4">
              Premium Quality Second Hand EV ON EVGO.
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              EVGO Helps You Find The Best Second Hand EV Near You
            </p>
          </div>

          {/* SEARCH */}
          <HomeSearch />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Cars</h2>
            <Button vartiant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3">
            {featuredCars.map((car) => {
              return <CarCard key={car.id} car={car} />;
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#88a3002b]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse By Make</h2>
            <Button vartiant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 px-3">
            {carMakes.map((make) => {
              return (
                <Link
                  key={make.name}
                  href={`/cars?make=${make.name}`}
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer"
                >
                  <div className="h-16 w-auto mx-auto mb-2 relative">
                    <Image
                      src={make.image}
                      alt={make.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="font-medium">{make.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Why Choose Our PlatForm
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#D6FF00] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Verified Electric Vehicles From Trusted Dealerships And Private
                Sellers .
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#D6FF00] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy EV Test Drive</h3>
              <p className="text-gray-600">
                Book Your EV Test Ride Online In Minutes With Flexible
                Scheduling Options .
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#D6FF00] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Process</h3>
              <p className="text-gray-600">
                Verfield Electric Vehicles And Secure Booking Process For Peace
                Of Mind .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#88a3002b]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse By Body Type</h2>
            <Button vartiant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3">
            {bodyTypes.map((type) => {
              return (
                <Link
                  key={type.name}
                  href={`/cars?bodyType=${type.name}`}
                  className="relative group cursor-pointer"
                >
                  <div className="overflow-hidden rounded-lg flex justify-end h-45 mb-8 relative bg-white">
                    <Image
                      src={type.image}
                      alt={type.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D6FF00]/70 to-transparent rounded-lg flex items-end">
                    <h3 className="text-black text-xl font-bold pl-4 pb-2">
                      {type.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            FreQuently Asked Questions
          </h2>
          {faqItems.map((faq, index) => {
            return (
              <Accordion type="single" collapsible className="w-full" key={index}>
                <AccordionItem key={index} value={`items-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </section>

      <section className="py-16 dotted-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Find You Dream EV Now !</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Our Growing Audience Making Smarter And Sustainable Choice Of
            Choosing EVs For A Better And Smarter Future .
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/cars">View All Cars</Link>
          </Button>
          <SignedOut>
            <Button size="lg" asChild>
              <Link href="/sign-up">Sign Up Now !</Link>
            </Button>
          </SignedOut>
        </div>
      </section>
    </div>
  );
}
