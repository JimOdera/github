import { ArrowUpRight, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Define variants with proper typing
const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -8,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: -12 },
  open: { opacity: 1, x: 0 },
};

const options = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
];

export default function CO2ReductionChart() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === selectedYear)?.label || "2025";

  const series = [
    {
      name: "CO₂ Reduction",
      data: [1200, 2850, 4200, 5100, 4200, 2200, 1950, 1050],
    },
  ];

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    colors: ["#1ecec9"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      labels: { style: { colors: "#6b7280", fontSize: "12px" } },
    },
    yaxis: {
      title: {
        text: "Total CO₂ Reduction (tonnes)",
        style: {
          color: "#374151",
          fontSize: "14px",
          fontWeight: 600,
        },
      },
      labels: {
        formatter: (val) => `${val.toLocaleString()}`,
        style: { colors: "#6b7280" },
      },
    },
    tooltip: {
      x: { format: "MMM" },
      y: {
        formatter: (val) => `${val.toLocaleString()} tonnes`,
      },
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 4,
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">

      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Total CO2 reduction</h1>
        {/* Custom Animated Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium cursor-pointer
              text-gray-700 hover:border-gray-400 focus:outline-none focus:border-gray-500 focus:border-offset-1 transition-all duration-200"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <span>{selectedLabel}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 -z-10"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                  />

                  {/* Dropdown Menu */}
                  <motion.div
                    variants={menuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
                    role="listbox"
                  >
                    <div className="py-2">
                      {options.map((option) => (
                        <motion.button
                          key={option.value}
                          variants={itemVariants}
                          whileHover={{ backgroundColor: "#f9fafb" }}
                          onClick={() => {
                            setSelectedYear(option.value);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
                            selectedYear === option.value
                              ? "text-emerald-600 bg-emerald-50"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          role="option"
                          aria-selected={selectedYear === option.value}
                        >
                          <span>{option.label}</span>
                          {selectedYear === option.value && (
                            <span className="text-emerald-600 text-lg">Check</span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      {/* Header */}
        {/* Big Number */}
        <div className="flex items-end gap-2">
          <div className="text-2xl font-medium text-gray-900">
            6,750 <span className="text-sm font-normal text-gray-600">tonnes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-emerald-600 flex items-center">
              <ArrowUpRight size={16} />
              +18%
            </span>
            <span className="text-sm text-gray-500">vs last year</span>
          </div>

        
      </div>

      {/* Chart */}
      <Chart options={chartOptions} series={series} type="area" height={380} />
    </div>
  );
}