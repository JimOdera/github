"use client";

import Header from "@/app/components/Header";
import {
  calendar,
  flag,
  folder,
  message_circle_more,
  projectIcon,
  projectIcon2,
  projectIcon3,
  projectIcon4,
  upfield,
} from "@/public";
import {
  BadgeCheck,
  ChevronRight,
  Leaf,
  Link,
  RefreshCw,
  Zap,
} from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
const MapPins = dynamic(() => import("@/app/components/MapPins"), {
  ssr: false,
});

const DashboardChart = dynamic(
  () => import("@/app/components/charts/DashboardChart"),
  { ssr: false }
);
const GHGIntensityLineChart = dynamic(
  () => import("@/app/components/charts/GHGIntensityLineChart"),
  { ssr: false }
);
const ResourceConservationCharts = dynamic(
  () => import("@/app/components/charts/ResourceConservationCharts"),
  { ssr: false }
);
const JobCreationRadialChart = dynamic(
  () => import("@/app/components/charts/JobCreationRadialChart"),
  { ssr: false }
);
const GreenFinanceChart = dynamic(
  () => import("@/app/components/charts/GreenFinanceChart"),
  { ssr: false }
);
const FinancialPerformanceChart = dynamic(
  () => import("@/app/components/charts/FinancialPerformanceChart"),
  { ssr: false }
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
      <div className="flex-1 flex flex-col relative z-10">
        <Header />

        <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
          {/* HERO */}
          <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20">
            <Image
              src="/images/projects/summary.png"
              alt="Summary Banner"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
              <div className="flex flex-col items-start">
                <Image
                  src={folder}
                  alt="folder"
                  className="block md:hidden w-4 h-4 mb-2 cursor-pointer"
                />
                <Image
                  src={upfield}
                  alt="Upfield Logo"
                  className="h-10 w-auto"
                />
                <span className="text-xs text-teal-700 mt-2">
                  Welcome to Upfield Green Dashboard
                </span>
              </div>
            </div>
          </section>

          <main className="w-full space-y-8 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
            <div className="w-full mx-auto px-4 py-6 md:px-8 space-y-10">
              {/* Important Actions */}
              <div className="bg-[#F9FBFC] border border-gray-200 px-6 py-6 md:px-16 md:py-8 rounded-xl">
                <h1 className="text-lg font-medium text-gray-800">
                  Important Actions (4)
                </h1>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-6">
                  <div className="flex-1 md:flex-none flex items-center justify-between gap-6 bg-white px-6 py-4 rounded-xl shadow-sm">
                    <Image src={flag} alt="Flag" className="w-5 h-5" />
                    <div className="flex flex-col">
                      <h2 className="text-sm font-medium text-teal-900">
                        Update Activity #0243
                      </h2>
                      <span className="text-xs text-teal-700">2 days ago</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 md:flex-none flex items-center justify-between gap-6 bg-white px-6 py-4 rounded-xl shadow-sm">
                    <Image src={calendar} alt="Calendar" className="w-5 h-5" />
                    <div className="flex flex-col">
                      <h2 className="text-sm font-medium text-teal-900">
                        File Annual Report
                      </h2>
                      <span className="text-xs text-teal-700">
                        due in 15 days
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <button className="bg-white border border-[#044D5E]/20 px-6 py-3 rounded-xl flex items-center gap-3 text-xs font-medium text-[#044D5E] hover:bg-[#044D5E]/5 transition-all group">
                    <span>View all</span>
                    <ChevronRight
                      size={18}
                      className="text-[#044D5E]/70 group-hover:text-[#044D5E]"
                    />
                  </button>
                </div>
              </div>

              {/*  Projects Map */}
              <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6 rounded-lg">
                <p className="text-lg font-medium text-[#044D5E]">
                  {" "}
                  Projects Map
                </p>

                <MapPins />
              </div>

              {/* Funding Progress */}
              <div className="bg-[#F9FBFC] border border-gray-200 px-6 py-6 md:px-16 md:py-8 rounded-xl">
                <p className="text-lg font-medium text-gray-800">
                  Funding Progress
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <GreenFinanceChart number={64} />
                  <div className="bg-[#EBFFF5] border border-[#B6EBCF] rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#00C587] rounded-xl">
                        <Image
                          src={projectIcon2}
                          alt="Project"
                          className="w-7 h-7"
                        />
                      </div>
                      <div>
                        <span className="text-base font-medium text-gray-700">
                          Portfolio Value
                        </span>
                        <p className="text-xs text-gray-600">
                          Cumulative green projects
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      $4.5m
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Cards Grid - FIXED BACKGROUND COLORS */}
              <div className="bg-white border border-gray-200 px-8 py-10 md:px-16 md:py-12 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      bg: "bg-[#F7F9FE]",
                      icon: RefreshCw,
                      color: "#2370FE",
                      title: "Renewable Energy Projects",
                      desc: "Total offset: 45 kwh",
                    },
                    {
                      bg: "bg-[#FAF8FE]",
                      icon: Link,
                      color: "#A441FE",
                      title: "Sustainable Infrastructure",
                      desc: "Total offset: 56 tonnes",
                    },
                    {
                      bg: "bg-[#F6FDFA]",
                      icon: Leaf,
                      color: "#00C587",
                      title: "Carbon Offset Projects",
                      desc: "Total emissions: 24 tonnes",
                    },
                    {
                      bg: "bg-[#F6FDFA]",
                      icon: Zap,
                      color: "#00C587",
                      title: "Climate Resilience Projects",
                      desc: "Total emissions: 315 tonnes",
                    },
                    {
                      bg: "bg-[#F7F9FE]",
                      icon: RefreshCw,
                      color: "#2370FE",
                      title: "Sustainable Agriculture & Forestry",
                      desc: "Total emissions: 25 tonnes",
                    },
                    {
                      bg: "bg-[#FAF8FE]",
                      icon: Link,
                      color: "#A441FE",
                      title: "Clean Technology Innovation",
                      desc: "Total emissions: 245 MWh",
                    },
                    {
                      bg: "bg-[#F6FDFA]",
                      icon: Leaf,
                      color: "#00C587",
                      title: "Circular Economy Initiatives",
                      desc: "Total emissions: 24 tonnes",
                    },
                    {
                      bg: "bg-[#F6FDFA]",
                      icon: Zap,
                      color: "#00C587",
                      title: "Social Impact Investments",
                      desc: "Total Offset: 34,000",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`${item.bg} flex items-center justify-between gap-4 rounded-xl px-8 py-5 shadow-sm`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 flex items-center justify-center rounded-xl"
                          style={{ backgroundColor: item.color }}
                        >
                          <item.icon color="#ffffff" size={28} />
                        </div>
                        <div>
                          <p className="text-base font-medium text-gray-800">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                      <span className="text-lg font-medium text-gray-700">
                        85%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <DashboardChart />

              {/* Carbon Revenue Potential */}
              <div className="bg-[#F9FBFC] border border-gray-200 px-6 py-8 md:px-16 md:py-10 rounded-xl">
                <p className="text-lg font-medium text-gray-800">
                  Carbon Revenue Potential
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Image
                          src={projectIcon4}
                          alt="Icon"
                          className="w-5 h-5"
                        />
                        <p className="text-sm font-medium text-gray-700">
                          Renewable Energy Capacity Added
                        </p>
                      </div>
                      <h1 className="text-3xl font-bold text-gray-800 mt-2">
                        720 MWh
                      </h1>
                      <span className="text-xs text-green-600 font-medium">
                        +15% vs last year
                      </span>
                    </div>
                    <div className="border border-gray-200 rounded-xl px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Image
                          src={projectIcon3}
                          alt="Icon"
                          className="w-5 h-5"
                        />
                        <p className="text-sm font-medium text-gray-700">
                          Energy Savings per Unit
                        </p>
                      </div>
                      <h1 className="text-3xl font-bold text-gray-800 mt-2">
                        +32%
                      </h1>
                      <span className="text-xs text-yellow-600 font-medium">
                        +17% of the potential
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <GHGIntensityLineChart />
                  </div>
                </div>
              </div>

              <ResourceConservationCharts />

              {/* Sustainable Development Goals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h1 className="text-lg font-medium text-gray-800">
                    Sustainable Development Goals
                  </h1>
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      {
                        bg: "bg-[#F7F9FE]",
                        icon: RefreshCw,
                        color: "#2370FE",
                        title: "Renewable Energy Projects",
                        desc: "Total offset: 45 kwh",
                      },
                      {
                        bg: "bg-[#FAF8FE]",
                        icon: Link,
                        color: "#A441FE",
                        title: "Sustainable Infrastructure",
                        desc: "Total offset: 56 tonnes",
                      },
                      {
                        bg: "bg-[#F6FDFA]",
                        icon: Leaf,
                        color: "#00C587",
                        title: "Carbon Offset Projects",
                        desc: "Total emissions: 24 tonnes",
                      },
                      {
                        bg: "bg-[#F6FDFA]",
                        icon: Zap,
                        color: "#00C587",
                        title: "Climate Resilience Projects",
                        desc: "Total emissions: 315 tonnes",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`${item.bg} rounded-xl px-6 py-5 flex items-center justify-between shadow-sm`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 flex items-center justify-center rounded-xl"
                            style={{ backgroundColor: item.color }}
                          >
                            <item.icon color="#ffffff" size={26} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                        <span className="text-base font-medium text-gray-700">
                          85%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h1 className="text-lg font-medium text-gray-800">
                    Financial Performance
                  </h1>
                  <div className="grid grid-cols-1 gap-6">
                    <FinancialPerformanceChart number={87} type="roi" />
                    <FinancialPerformanceChart number={73} type="npv" />
                    <FinancialPerformanceChart number={64} type="irr" />
                  </div>
                </div>
              </div>

              {/* Beneficiaries Section */}
              <div className="bg-[#F9FBFC] border border-gray-200 px-6 py-8 md:px-16 md:py-10 rounded-xl space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    {
                      label: "Total Beneficiaries Reached",
                      value: "1,340",
                      change: "+42% vs last year",
                      positive: true,
                    },
                    {
                      label: "Women Empowered",
                      value: "618",
                      change: "46% of total",
                      positive: false,
                    },
                    {
                      label: "Health & Safety Incidents",
                      value: "6",
                      change: "All minor, resolved",
                      positive: false,
                    },
                    {
                      label: "Training Hours Delivered",
                      value: "892",
                      change: "+28% vs last year",
                      positive: true,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-xl px-6 py-5"
                    >
                      <p className="text-xs font-medium text-gray-600">
                        {item.label}
                      </p>
                      <h1 className="text-3xl font-bold text-gray-800 mt-1">
                        {item.value}
                      </h1>
                      <span
                        className={`text-xs font-medium ${
                          item.positive ? "text-green-600" : "text-gray-600"
                        }`}
                      >
                        {item.change}
                      </span>
                    </div>
                  ))}
                </div>
                <JobCreationRadialChart />
              </div>

              {/* Stakeholder Satisfaction */}
              <div className="bg-[#F6FFEB] rounded-xl p-6 flex items-center justify-between shadow-sm border border-[#E6F0D9]">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#B1CA69] rounded-xl shadow-md">
                    <Image
                      src={projectIcon}
                      alt="Project"
                      width={28}
                      height={28}
                      className="w-7 h-7"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-800">
                      Stakeholder Satisfaction
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      From survey of stakeholders
                    </p>
                  </div>
                </div>
                <button className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-[#E6F0D9] hover:bg-[#F0FDF4] transition-all group">
                  <BadgeCheck size={22} color="#065F46" fill="#86efac" />
                  <span className="text-sm font-medium text-[#065F46]">
                    On Track
                  </span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Help */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center">
        <div className="bg-white text-xs font-medium text-gray-700 px-4 py-2 rounded-xl shadow-lg mb-3 relative cursor-pointer">
          need help?
          <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></span>
        </div>
        <button className="bg-white shadow-xl border border-gray-200 rounded-full p-4 hover:scale-110 transition-transform">
          <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
