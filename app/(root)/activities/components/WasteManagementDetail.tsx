"use client";

import Header from "@/app/components/Header";
import {
  folder,
  forest1,
  forest4,
  forest5,
  forest7,
  message_circle_more,
} from "@/public";
import {
  AlertTriangle,
  BadgeCheck,
  GalleryHorizontalEnd,
  LandPlot,
  Play,
  Recycle,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import EnvType from "./EnvType/page";

const WasteManagementDetail = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
      {/* Main Content Area - Starts after sidebar */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Navigation */}
        <Header />

        <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
          {/* Full Width Hero Section - Behind everything */}
          <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20 transition-all duration-300 ease-in-out">
            <Image
              src="/images/projects/summary.png"
              alt="Summary Banner"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/10 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
              {/* Content starts after dynamic sidebar width with smooth animation */}
              <div className={`flex flex-col items-start`}>
                <Image
                  src={folder}
                  alt="folder Icon"
                  className="block md:hidden w-4 h-4 mb-2 cursor-pointer"
                />
                <h2 className="text-lg md:text-3xl font-medium text-teal-900 transition-transform duration-300 ease-in-out origin-left">
                  Create Activity
                </h2>
                <span className="text-xs text-teal-700 transition-transform duration-300 ease-in-out origin-left">
                  Activities /{" "}
                  <span className="text-[#4ABEA6]">Create Activity</span>
                </span>
              </div>
            </div>
          </section>

          <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-32 md:pt-46">
            <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-6">
              {/*  */}
              <div className="grid grid-cols-3 grid-rows-2 gap-3 sm:gap-4 h-[220px] sm:h-[260px] md:h-[340px] lg:h-[420px] w-full mt-18">
                {/* LEFT: Big vertical image - forest1 */}
                <div className="row-span-2 relative rounded-2xl overflow-hidden ">
                  <Image
                    src={forest1}
                    alt="Forest 1"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm text-white rounded-full p-5 hover:bg-white/30 transition border border-white/50 cursor-pointer">
                      <Play />
                    </div>
                  </div>
                </div>

                {/* CENTER TOP */}
                <div className="relative rounded-2xl overflow-hidden ">
                  <Image
                    src={forest7}
                    alt="Forest 2"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* RIGHT */}
                <div className="row-span-2 relative rounded-2xl overflow-hidden ">
                  <Image
                    src={forest4}
                    alt="Forest 4"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div
                    className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-gray-800
                   px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2  border border-white/50"
                  >
                    <GalleryHorizontalEnd />
                    Show 12
                  </div>
                </div>

                {/* CENTER BOTTOM */}
                <div className="relative rounded-2xl overflow-hidden ">
                  <Image
                    src={forest5}
                    alt="Forest 3"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              {/*  */}
              <div className="space-y-4">
                <h1>Aligned Sdgs</h1>
                <div className="flex items-center gap-4">
                  <button className="bg-[#D3A029] hover:bg-[#D3A029]/90 text-white text-xs font-medium px-6 py-2.5 rounded-lg transition">
                    Zero Hunger
                  </button>
                  <button className="bg-[#48773E] hover:bg-[#48773E]/90 text-white text-xs font-medium px-6 py-2.5 rounded-lg transition">
                    Climate Action
                  </button>
                </div>
              </div>
              <div className="bg-[#FFF8E8] px-6 py-4 rounded-lg space-y-4 mt-6 border-b border-gray-400">
                <div className="flex items-center justify-between mt-2">
                  <p>Progress towards sustainability goals</p>
                  <div className="bg-[#4ABEA6] px-5 py-2 flex items-center justify-center gap-2 text-white rounded-lg text-xs">
                    <BadgeCheck color="#ffffff" fill="#4ABEA6" size={18} />
                    <span>On Track</span>
                  </div>
                </div>

                <div className="flex flex-col w-full space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span>Baseline Year: 2018</span>
                    <span>Target year: 2028</span>
                  </div>

                  {/* Animated Overall Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "45%" }}
                      transition={{
                        duration: 1.2,
                        ease: "easeOut",
                        delay: 0.6,
                      }}
                    />
                  </div>

                  <div>
                    <span className="font-medium text-teal-900">
                      45.0% of target achieved
                    </span>
                  </div>
                </div>
              </div>
              {/*  */}
              <EnvType />

              {/*  */}
              {/* ==================== ENERGY USAGE ==================== */}
              <section className="mt-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-teal-900 mb-2">
                  Energy Usage
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-8">
                  Total energy consumption and renewable sources
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1 – Total Energy */}
                  <div className="bg-[#F6FFEB] rounded-2xl  p-8 flex flex-col items-start border border-[#C9DA96]">
                    <p className="text-sm uppercase tracking-wider mb-2">
                      Total
                    </p>
                    <p className="text-4xl md:text-5xl font-bold text-teal-900">
                      17,000
                    </p>
                    <p className="text-lg text-gray-600 mt-1">MWh</p>
                  </div>

                  {/* Card 2 – Green Energy */}
                  <div className="bg-[#F1FFFE] rounded-2xl  p-8 flex flex-col items-start text-white border border-[#B6EBCF]">
                    <p className="text-gray-600 text-sm uppercase tracking-wider mb-2">
                      Green
                    </p>
                    <p className="text-gray-600 text-4xl md:text-5xl font-bold">
                      47.0<span className="text-2xl">%</span>
                    </p>
                    <p className="text-gray-600 text-lg mt-1 opacity-90">of total</p>
                  </div>
                </div>
              </section>

              {/* ==================== WASTE MANAGEMENT ==================== */}
              <section className="mt-16">
                <h2 className="text-2xl md:text-3xl font-semibold text-teal-900 mb-2">
                  Waste Management
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-8">
                  Waste generation and disposal methods
                </p>

                <div className="grid grid-cols-1 gap-6">
                  {/* Total Waste Generated */}
                  <div className="bg-[#F8F8F8] rounded-2xl  p-6 flex items-start gap-4 border border-gray-100">
                    <div className="bg-[#E5E5E5] p-3 rounded-full">
                      <Trash2 className="w-6 h-6 text-[#000000]" />
                    </div>
                    <div className="flex-1 flex justify-between text-[#000000]">
                      <div>
                        <p className="font-medium text-gray-800">
                          Total waste generated
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Annual production
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-teal-900 mt-3">
                          4,250
                        </p>
                        <p className="text-sm text-gray-600">kg</p>
                      </div>
                    </div>
                  </div>

                  {/* Recycled / Composted */}
                  <div className="bg-[#E8FDEF] rounded-2xl  p-6 flex items-start gap-4 border border-gray-100">
                    <div className="bg-[#B9F8CF] p-3 rounded-full">
                      <Recycle className="w-6 h-6 text-[#06863A]" />
                    </div>
                    <div className="flex-1 flex justify-between text-[#06863A]">
                      <div>
                        <p className="font-medium text-gray-800">
                          Recycled / Composted
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          60.0% of total
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-teal-900 mt-3">
                          2,550
                        </p>
                        <p className="text-sm text-gray-600">kg</p>
                      </div>
                    </div>
                  </div>

                  {/* Landfilled */}
                  <div className="bg-[#FFF3E2] rounded-2xl  p-6 flex items-start gap-4 border border-gray-100">
                    <div className="bg-[#FFD7A8] p-3 rounded-full">
                      <LandPlot className="w-6 h-6 text-[#CC3C07]" />
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div className="text-[#CC3C07]">
                        <p className="font-medium">
                          Total Landfilled
                        </p>
                        <p className="text-xs mt-1">
                          34.1% of total
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold mt-3">
                          1,449
                        </p>
                        <p className="text-sm">kg</p>
                      </div>
                    </div>
                  </div>

                  {/* Hazardous Waste */}
                  <div className="bg-[#FFEAEA] rounded-2xl  p-6 flex items-start gap-4 border border-gray-100">
                    <div className="bg-[#FFC9C9] p-3 rounded-full">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1 flex justify-between text-[#EF0D14]">
                      <div>
                        <p className="font-medium">
                          Total Hazardous waste
                        </p>
                        <p className="text-xs mt-1">
                          Requires special disposal
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold mt-3">
                          251
                        </p>
                        <p className="text-sm">kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-5 right-1 flex flex-col items-center">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-md  mb-2 relative cursor-pointer">
          need help?
          <span
            className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"
            aria-hidden="true"
          ></span>
        </div>
        <button className="bg-white  border border-gray-200 p-2 rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300">
          <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default WasteManagementDetail;
