'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// ApexCharts is not SSR‑friendly → load only on the client
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ProjectType = () => {
    // -----------------------------------------------------------------
    // 1. Data – percentages that add up to 100%
    // -----------------------------------------------------------------
    const series = [45, 25, 20, 10]; // Land Use | Grid Electricity | Diesel Fuel | Others

    // -----------------------------------------------------------------
    // 2. Labels + units (exactly as in the image)
    // -----------------------------------------------------------------
    const labelWithUnit = [
        'Land Use – 1.5 tCO₂e/ha',
        'Grid Electricity – 0.72 tCO₂e/MWh',
        'Diesel Fuel – 0.15 tCO₂e/liter',
        'Others – 0.15 tCO₂e/liter',
    ];

    // -----------------------------------------------------------------
    // 3. ApexCharts options
    // -----------------------------------------------------------------
    const options = {
        chart: {
            type: 'donut' as const,
            fontFamily: 'Inter, system-ui, sans-serif',
        },
        colors: ['#044D5E', '#4FC3B8', '#4CD4F0', '#C9DBB4'], // matches your palette
        labels: ['Land Use', 'Grid Electricity', 'Diesel Fuel', 'Others'],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                },
            },
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 3, colors: ['#fff'] },

        // -----------------------------------------------------------------
        // 4. Legend – we build it **manually** so it can sit in its own column
        // -----------------------------------------------------------------
        legend: {
            show: false, // hide ApexCharts default legend
        },

        // -----------------------------------------------------------------
        // 5. Responsive behaviour
        // -----------------------------------------------------------------
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: { width: 300 },
                },
            },
        ],
    };

    return (
        <div className="w-full p-4 md:p-6 bg-white rounded-lg">
            {/* -------------------------------------------------------------
          6. Two‑column layout (chart | legend)
          ------------------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* ---------- CHART ---------- */}
                <div className="">
                    <h3 className="text-lg font-medium text-[#044D5E] mb-6">
                        Reduction by Project Type
                    </h3>
                    <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width={380}
                        height={380}
                    />
                </div>

                {/* ---------- LEGEND (manual) ---------- */}
                <div className="space-y-4">
                    {series.map((value, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            {/* coloured dot */}
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: options.colors[idx] }}
                            />
                            {/* label + value */}
                            <span className="text-sm text-gray-800">{labelWithUnit[idx]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectType;