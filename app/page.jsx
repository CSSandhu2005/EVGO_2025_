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
import { bodyTypes, carMakes, faqItems, Logo_Dark } from "@/lib/data";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignedOutButtons from "@/components/SignedOutButtons";
import BlurText from "@/components/animations/TextAnimations/BlurText/BlurText";
import Beams from "@/components/animations/Backgrounds/Beams/Beams";
import FlowingMenu from "@/components/animations/Components/FlowingMenu/FlowingMenu";
import { FocusCards } from "@/components/ui/focus-cards";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsTitle,
  GlowingStarsDescription,
} from "@/components/ui/glowing-stars";
import React from "react";
import { GeminiCard } from "@/components/gemini-card";
import { Timeline } from "@/components/ui/timeline";
import ModelViewer from "@/components/animations/Components/ModelViewer/ModelViewer";
import { Spotlight } from "@/components/ui/spotlight-new";
import { LinkPreview } from "@/components/ui/link-preview";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export default async function Home() {
  const featuredCars = await getFeaturedCars();

  const data = [
    {
      title: "Upload Your EV Photos",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            You can either use our AI Function and features to Automatically
            Upload EV details on our form , or enter manually, and have to
            compulsorily include some important photos like the Hero Photo And
            Battery ScreenShot From The DashBoard .
          </p>
          <div className="">
            <img
              src="/upload_ev.png"
              alt="startup template"
              
              className="h-full  rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
           
          </div>
        </div>
      ),
    },
    {
      title: "AI EV Analysis",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-lg dark:text-neutral-200 ">
            Once, you upload you data or allow our AI to fetch your EV data and
            you confirm it, we run an intense AI Prompts checking and analyze
            your vehicle and predict A value that is fair and
          </p>
          <div className="">
            <img
              src="/ev_analysis.png"
              alt="hero template"
             
              className="h-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            
          </div>
        </div>
      ),
    },
    {
      title: "EVGO Verified✅",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            Your EV has gone now gone through a set of checks through our AI And
            we have analyzed the price of your vehicle, this includes your
            battery check, exterior damages and everything our AI needs to make
            sure that your EV is values at a fair price !
          </p>
          <div className="">
            <img
              src="/ev_verified.png"
              alt="hero template"
            
              className="h-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            
          </div>
        </div>
      ),
    },
  ];

  const faqItems = [
    {
      id: "item-1",
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days, depending on your location. Express shipping options are available at checkout for 1-2 business day delivery.",
    },
    {
      id: "item-2",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. For enterprise customers, we also offer invoicing options.",
    },
    {
      id: "item-3",
      question: "Can I change or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it. After this window, please contact our customer support team who will assist you with any changes.",
    },
    {
      id: "item-4",
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-14 business days. Additional customs fees may apply depending on your country's import regulations.",
    },
    {
      id: "item-5",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some specialty items may have different return terms, which will be noted on the product page.",
    },
  ];

  const cards = [
    {
      title: bodyTypes[0].name,
      src: bodyTypes[0].image,
    },
    {
      title: bodyTypes[1].name,
      src: bodyTypes[1].image,
    },
    {
      title: bodyTypes[2].name,
      src: bodyTypes[2].image,
    },
    {
      title: bodyTypes[3].name,
      src: bodyTypes[3].image,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO */}

      <section className="relative py-35 md:pt-52">
        <div className="absolute inset-0 z-0">
          <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#D5FF00"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="mb-8">
            <BlurText
              text="Premium Quality Second Hand EV On EVGO."
              delay={150}
              animateBy="words"
              direction="top"
              className="font-extrabold tracking-tighter pr-2 pb-2 text-5xl md:text-8xl mb-4 text-center text-white"
            />
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              EVGO Helps You Find The Best Second Hand EV Near You
            </p>
          </div>

          {/* SEARCH */}
          <HomeSearch />
        </div>
      </section>

      {/* FEATURED CARS */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8 p-3  ">
            <h2 className="text-2xl font-bold">Featured Cars</h2>
            <Link href="/cars">
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#EAFF39_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY MAKE */}
      <section className="py-12">
  <div className="container mx-auto">
    <div className="flex justify-between items-center mb-8 px-5">
      <h2 className="text-2xl font-bold">Browse By Make</h2>
      <Link href="/cars">
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#EAFF39_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </span>
        </button>
      </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {carMakes.map((make) => (
        <Link key={make.name} href={`/cars?make=${make.name}`}>
          <div className="flex items-center justify-center antialiased">
            <GlowingStarsBackgroundCard>
              <div className="flex items-center justify-between w-full">
                {/* Logo Image */}
                <img
                  src={make.logo}
                  alt={make.name}
                  className="w-6 h-6 object-contain"
                />
                {/* Company Name */}
                <GlowingStarsTitle>{make.name}</GlowingStarsTitle>
                {/* Icon Right Side */}
                <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                  <div
                    key={make.name}
                    href={`/cars?make=${make.name}`}
                    className="cursor-pointer"
                  >
                    <Icon />
                  </div>
                </div>
              </div>
            </GlowingStarsBackgroundCard>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>


      {/* BROWSE BY BODY TYPE */}
      <section className="py-8 relative px-6">
        {/* <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8 px-5">
            <h2 className="text-2xl font-bold">Browse By Body Type</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3">
            {bodyTypes.map((type) => (
              <Link
                key={type.name}
                href={`/cars?bodyType=${type.name}`}
                className="relative group cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg flex justify-end h-45 mb-12   relative bg-white">
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
            ))}
          </div>
        </div>  */}
        <div className="flex justify-between items-center mb-8 px-18">
          <h2 className="text-2xl font-bold">Browse By Body Type</h2>
          <Link href="/cars">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#EAFF39_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </span>
            </button>
          </Link>
        </div>
        <FocusCards cards={cards} />
      </section>

      <GeminiCard />

      <div className="relative w-full overflow-clip mt-10">
        <Timeline data={data} />
      </div>

      {/* <ModelViewer /> */}

      <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F]">
        <MacbookScroll
          title={
            <span>
              Modern DashBoard To Analyze &Sell The Fleet Of EVs For Business
              Owners. <br /> Right From Your EVGO DashBoard.
            </span>
          }
          badge={
            <a href="https://evgoindia.com">
              <Image
                src={Logo_Dark[0].image}
                width="12"
                height="12"
                className="h-10 w-10 -rotate-12 transform"
                alt="EVGO Logo Here"
              />
            </a>
          }
          src={`/linear.webp`}
          showGradient={false}
        />
      </div>

      <div className="w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden py-25">
        <Spotlight />
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-5">
            Future Mobility, Pre-Owned Assurity.
          </h1>
          <div className="flex justify-center items-center flex-col px-4">
            <div className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-5xl mx-auto mb-10">
              Upload your EV{" "}
              <LinkPreview url="https://evgoindia.com/" className="font-bold">
                Front View
              </LinkPreview>{" "}
              Or{" "}
              <LinkPreview
                url="https://evgoindia.com/cars"
                className="font-bold"
              >
                DashBoard ScreenShot
              </LinkPreview>{" "}
              These photos will now will be sent to the AI for Analysis .
            </div>
            <div className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-5xl mx-auto">
              After A list of checks Done by{" "}
              <LinkPreview
                url="https://evgoindia.com/"
                className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
              >
                Gemini
              </LinkPreview>{" "}
              with prompts curated by us. your EV is now Verified By EVGO.
            </div>
          </div>
        </div>
      </div>

      <div className="h-[40rem] flex items-center justify-center">
        <TextHoverEffect text="EVGO" />
      </div>
    </div>
  );
}

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4 text-white stroke-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
};

// Peerlist logo
const Badge = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
        fill="#00AA45"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#219653"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
        fill="#24292E"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
        fill="white"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
        fill="#24292E"
      ></path>
    </svg>
  );
};
