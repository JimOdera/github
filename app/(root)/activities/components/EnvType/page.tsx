"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Leaf } from "lucide-react";

// Load charts only on the client side
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const EnvType = () => {
  // -----------------------------------------------------------------
  // 1. Donut Chart – Reduction by Project Type
  // -----------------------------------------------------------------
  const donutSeries = [45, 25, 20, 10];
  const labelWithUnit = [
    "Land Use – 1.5 tCO₂e/ha",
    "Grid Electricity – 0.72 tCO₂e/MWh",
    "Diesel Fuel – 0.15 tCO₂e/liter",
    "Others – 0.15 tCO₂e/liter",
  ];

  const donutOptions = {
    chart: {
      type: "donut" as const,
      fontFamily: "Inter, system-ui, sans-serif",
    },
    colors: ["#044D5E", "#4FC3B8", "#4CD4F0", "#C9DBB4"] as string[],
    labels: ["Land Use", "Grid Electricity", "Diesel Fuel", "Others"],
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["#ffffff"] },
    legend: { show: false },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
  };

  // -----------------------------------------------------------------
  // 2. Radial Bar Charts – Scope Emissions %
  // -----------------------------------------------------------------
  const radialOptions = (percentage: number, color: string) => ({
    chart: { type: "radialBar" as const },
    plotOptions: {
      radialBar: {
        hollow: { size: "65%" },
        track: { background: "#f3f4f6", strokeWidth: "100%" },
        dataLabels: {
          show: true,
          name: { show: false },
          value: {
            fontSize: "20px",
            fontWeight: 700,
            color,
            offsetY: 8,
            formatter: () => `${percentage}%`,
          },
        },
      },
    },
    colors: [color],
    // Fixed: lineCap must be one of the allowed literal values
    stroke: {
      lineCap: "round" as const satisfies "butt" | "square" | "round",
    },
  });

  const scopeData = [
    { name: "Scope 1 Emissions", total: "1,750 tonnes", percentage: 35, color: "#00C587" },
    { name: "Scope 2 Emissions", total: "2,850 tonnes", percentage: 55, color: "#4FC3B8" },
    { name: "Scope 3 Emissions", total: "520 tonnes", percentage: 10, color: "#4CD4F0" },
  ];

  return (
    <div className="w-full p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
        {/* ==================== LEFT: Donut Chart + Legend ==================== */}
        <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-16">
          {/* Chart */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-[#044D5E] mb-3">
              Reduction by Project Type
            </h3>
            <p className="text-sm text-gray-600 mb-6 text-center max-w-xs">
              Carbon reduction contribution by project category
            </p>

            <Chart
              options={donutOptions}
              series={donutSeries}
              type="donut"
              width={360}
              height={360}
            />
          </div>

          {/* Manual Legend */}
          <div className="space-y-5">
            {donutSeries.map((value, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div
                  className="w-5 h-5 rounded-full shadow-sm ring-2 ring-white"
                  style={{ backgroundColor: donutOptions.colors[idx] }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {donutOptions.labels[idx]}
                  </p>
                  <p className="text-xs text-gray-500">
                    {labelWithUnit[idx].split("–")[1]}
                  </p>
                  <p className="text-lg font-bold text-gray-800">{value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== RIGHT: 3 Scope Cards ==================== */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#044D5E] mb-4">
            Emissions by Scope
          </h3>

          {scopeData.map((scope) => (
            <div
              key={scope.name}
              className="flex items-center gap-5 bg-gradient-to-r from-gray-50 to-gray-100/50 
                         rounded-xl p-5 hover:shadow-md transition-all duration-300 border border-gray-200"
            >
              {/* Icon */}
              <div
                className="p-3 rounded-xl text-white shadow-lg"
                style={{ backgroundColor: scope.color }}
              >
                <Leaf className="w-6 h-6" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{scope.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Total: {scope.total} CO₂e
                </p>
              </div>

              {/* Radial Progress */}
              <div className="relative">
                <Chart
                  options={radialOptions(scope.percentage, scope.color)}
                  series={[scope.percentage]}
                  type="radialBar"
                  width={110}
                  height={110}
                />
                {/* Optional: keep the centered % text (ApexCharts already shows it) */}
                {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-2xl font-bold" style={{ color: scope.color }}>
                    {scope.percentage}%
                  </span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnvType;