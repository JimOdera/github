// app/components/charts/GHGIntensityLineChart.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const GHGIntensityLineChart = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [isOpen, setIsOpen] = useState(false);

  const fullData = {
    years: ['2018', '2019', '2020', '2021', '2022', '2023'],
    greenPortfolio: [120, 115, 180, 105, 100, 155],
    benchmarks: [130, 158, 125, 152, 120, 118],
  };

  const endYearIndex = fullData.years.indexOf(selectedYear);
  const filteredData = {
    years: fullData.years.slice(0, endYearIndex + 1),
    greenPortfolio: fullData.greenPortfolio.slice(0, endYearIndex + 1),
    benchmarks: fullData.benchmarks.slice(0, endYearIndex + 1),
  };

  // const latestGHGValue = fullData.greenPortfolio[fullData.years.indexOf(selectedYear)] || 95;

  const options: ApexCharts.ApexOptions = {
    // ... your existing options (unchanged)
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    series: [
      { name: 'Green Portfolio', data: filteredData.greenPortfolio },
      { name: 'Benchmarks', data: filteredData.benchmarks },
    ],
    colors: ['#10b981', '#8b5cf6'],
    xaxis: {
      categories: filteredData.years,
      title: { text: 'Year', style: { fontSize: '12px', fontWeight: 600, color: '#374151' } },
      axisBorder: { show: false },
      axisTicks: { show: true },
    },
    yaxis: {
      title: { text: 'GHG Intensity (tCO2e/$M)', style: { fontSize: '12px', fontWeight: 600, color: '#374151' } },
      labels: { formatter: (val) => val.toFixed(0) },
    },
    stroke: { curve: 'smooth', width: 1 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.0, stops: [0, 90, 100] },
    },
    markers: { size: 3, hover: { sizeOffset: 2 } },
    tooltip: { y: { formatter: (val) => `${val} tCO2e/$M` } },
    legend: { position: 'bottom', fontSize: '14px', fontWeight: 500, labels: { colors: '#374151' } },
    grid: { borderColor: '#e5e7eb' },
  };

  // Framer Motion variants (type-safe)
  const menuVariants: Variants = {
    closed: { opacity: 0, y: -8, scale: 0.95 },
    open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <div>
      {/* Top Row: Title and Custom Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-medium text-gray-800">GHG Intensity</h2>

        {/* Custom Animated Dropdown - Replaces <select> */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none  focus:border-gray-500 transition-all"
          >
            {selectedYear}
            <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50"
                >
                  <div className="py-1">
                    {fullData.years.map((year) => (
                      <motion.button
                        key={year}
                        variants={itemVariants}
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        onClick={() => {
                          setSelectedYear(year);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                          selectedYear === year
                            ? 'text-green-600 bg-green-50'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {year}
                        {selectedYear === year && <span className="ml-2 text-green-600">Check</span>}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Chart options={options} series={options.series} type="area" height={350} />
    </div>
  );
};

export default GHGIntensityLineChart;