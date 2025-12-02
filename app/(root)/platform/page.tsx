// platform/page.tsx
"use client";

import { message_circle_more } from "@/public";
// import { ArrowRight, Ellipsis } from "lucide-react";
import Image from "next/image";
import Header from "../../components/Header";
import Link from "next/link";

export default function KlimaHarvestPage() {
  const dashimg = "/images/dashimg.png";

  const memberTypes = [
    { icon: "/images/icons/home/icon1.svg", label: "Institution", link: "/platform/create-account" },
    { icon: "/images/icons/home/icon2.svg", label: "Individual Investor", beta: true },
    { icon: "/images/icons/home/icon3.svg", label: "Carbon Expert", beta: true },
    { icon: "/images/icons/home/icon4.svg", label: "Carbon Harvester", beta: true },
    { icon: "/images/icons/home/icon5.svg", label: "Aspirational Harvester", beta: true },
    // { icon: "/images/icons/home/icon2.svg", label: "Individual Investor", link: "/platform/create-individual-investor", beta: true },
    // { icon: "/images/icons/home/icon3.svg", label: "Carbon Expert", link: "/platform/create-carbon-expert", beta: true },
    // { icon: "/images/icons/home/icon4.svg", label: "Carbon Harvester", link: "/platform/create-carbon-harvestor", beta: true },
    // { icon: "/images/icons/home/icon5.svg", label: "Aspirational Harvester", link: '/platform/create-aspiration-harvester', beta: true },
  ];

  // const isViewAllActive = memberTypes.length > 5;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col space-y-0 md:space-y-6">
      {/* ✅ Fixed Header */}
      <Header />

      {/* ✅ Add padding to push content below fixed header */}
      <div className="pt-16 md:pt-20"> {/* Adjust depending on your header height */}

        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center h-48 w-full lg:w-[90vw] mx-auto lg:rounded-lg overflow-hidden p-0 md:px-24"
          style={{ backgroundImage: `url(${dashimg})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 px-4 py-2 text-white flex flex-col md:flex-row items-start md:items-end justify-end md:justify-between h-full md:-bottom-6 md:px-6 md:py-10">
            <div className="flex flex-col md:space-y-4">
              <h2 className="text-sm text-lg">Hello Iris West</h2>
              <h1 className="text-xl lg:text-3xl font-semibold">Welcome to Klima Harvest</h1>
            </div>
            <div className="">
              <Link href='/projects/marketplace'
                className="flex items-center justify-center mt-4 bg-[#00D98A] hover:bg-[#00D98A]/90 text-xs text-black px-5 py-2 rounded-lg transition-all duration-300">
                Explore Community
              </Link>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <main className="flex-grow w-full lg:w-[80vw] mx-auto px-2 py-2 md:px-6 md:py-4">
          <div className="bg-white rounded-sm md:rounded-2xl shadow-md md:py-8 md:px-24 md:p-0 pb-8">
            <div className="flex flex-col gap-2 mb-8 p-2 md:p-0">
              <div className="w-fit text-sm text-[#1ECEC9] font-semibold mb-2">Join Our Platform</div>
              <div>
                <h2 className="text-xl font-bold text-[#044D5E] mb-1">
                  Start Your Klima Harvest Journey
                </h2>
                <p className="text-xs text-[#044D5E]/70 mb-8">
                  Welcome to Klima Harvest! Whether {"you're"} an individual investor looking to explore sustainable opportunities, a green entrepreneur seeking funding,
                  a carbon expert looking to promote your services or an institution looking to track your green finance deployment,
                  we invite you to register and discover tailored resources and connections to suit your unique needs.</p>
              </div>
            </div>

            {/* Member Type Icons */}
            <div className="grid grid-cols-2 gap-2 text-center lg:grid-cols-3 xl:grid-cols-5 md:gap-4">
              {memberTypes.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col items-center justify-center gap-2 md:gap-4 ${!item.link ? "pointer-events-none" : ""
                    }`}
                >
                  {/* Clickable or disabled wrapper */}
                  {item.link ? (
                    <Link href={item.link} className="flex flex-col items-center justify-center gap-2 md:gap-4">
                      {/* Icon Container */}
                      <div className="relative inline-block">
                        <div className="flex items-center justify-center w-16 h-16 bg-[#044D5E]/10 rounded-full hover:bg-[#044D5E]/20 transition-all duration-300 md:w-20 md:h-20">
                          <Image
                            src={item.icon}
                            alt={item.label}
                            width={32}
                            height={32}
                            className="w-8 h-8 md:w-10 md:h-10"
                          />
                        </div>

                        {/* Beta Tag – appears on top-right of the circle */}
                        {item.beta && (
                          <span className="absolute -top-1 -right-3 z-20 rounded-full bg-[#00D98A] px-2.5 py-0.5 text-[9px] md:text-[10px] font-medium uppercase tracking-wider text-black shadow-lg border border-white">
                            Beta
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-normal text-gray-700">{item.label}</p>
                    </Link>
                  ) : (
                    <>
                      {/* Disabled version */}
                      <div className="relative inline-block">
                        <div className="flex items-center justify-center w-16 h-16 bg-[#044D5E]/10 rounded-full opacity-50 filter grayscale md:w-20 md:h-20">
                          <Image
                            src={item.icon}
                            alt={item.label}
                            width={32}
                            height={32}
                            className="w-8 h-8 md:w-10 md:h-10"
                          />
                        </div>

                        {item.beta && (
                          <span className="absolute -top-1 -right-3 z-20 rounded-full bg-[#00D98A] px-2.5 py-0.5 text-[9px] md:text-[10px] font-medium uppercase tracking-wider text-black/80 shadow-lg border border-white/50">
                            Beta
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-normal text-gray-500 opacity-50">{item.label}</p>
                    </>
                  )}
                </div>
              ))}

              {/* View All */}
              {/* <div className={`flex flex-col items-center justify-center gap-2 md:gap-4 ${!isViewAllActive ? 'pointer-events-none' : ''}`}>
                <div
                  className={`w-16 h-16 flex items-center justify-center border border-[#044D5E] rounded-full transition-all duration-300 md:w-20 md:h-20 ${isViewAllActive ? 'hover:bg-[#044D5E]/10' : 'opacity-50 filter grayscale'}`}
                >
                  <ArrowRight className="w-5 h-5 text-[#044D5E] md:w-6 md:h-6" />
                </div>
                <p className={`text-xs font-medium ${isViewAllActive ? 'text-gray-700' : 'text-gray-500 opacity-50'}`}>
                  View all
                </p>
              </div> */}
            </div>
          </div>
        </main>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-5 right-5 flex flex-col items-center">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
          need help?
          <span
            className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"
            aria-hidden="true"
          ></span>
        </div>
        <button className="bg-white shadow-md border border-gray-200 rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300">
          <Image src={message_circle_more} alt="Help" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
