// components/ResourceConservationCharts.tsx
'use client';

import React from 'react';
import Chart from 'react-apexcharts';

const ResourceConservationCharts: React.FC = () => {
  const baseOptions = {
    chart: {
      type: 'radialBar' as const,
      height: 300,
    },
    plotOptions: {
      radialBar: {
        // Full circle settings
        startAngle: 0,
        endAngle: 360,
        hollow: {
          size: '68%',
          background: 'transparent',
        },
        track: {
          background: '#e5e7eb', // gray-300
          strokeWidth: '100%',
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 0,
            fontSize: '36px',
            fontWeight: 700,
            color: '#1f2937',
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    stroke: {
      lineCap: 'round' as const,
    },
  };

  const charts = [
    { title: 'Water',  value: 72, color: '#86efac' }, // green-300
    { title: 'Land',   value: 65, color: '#1e293b' }, // dark teal
    { title: 'Forest', value: 51, color: '#f9a8d4' }, // pink-300
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-medium">Resource Conservation</h2>
        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium">
          Summary
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {charts.map((chart) => (
          <div key={chart.title} className="flex flex-col items-center">
            <Chart
              options={{
                ...baseOptions,
                colors: [chart.color],
                fill: {
                  type: 'solid',
                },
              }}
              series={[chart.value]}
              type="radialBar"
              height={300}
              width={300}
            />
            <h3 className="mt-6 text-xl font-semibold text-gray-800">{chart.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceConservationCharts;