// app/components/charts/MaterialityTrendChart.tsx
'use client';

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import React from 'react';

const MaterialityTrendChart = () => {
  const series = [
    {
      name: 'Climate Change',
      data: [18, 39, 10, 42, 4, 48],
    },
    {
      name: 'Circular Economy',
      data: [8, 12, 38, 22, 42, 32],
    },
    {
      name: 'Labour Practice',
      data: [15, 55, 35, 18, 58, 67],
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: { type: 'area', height: 350, toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 1 },
    colors: ['#1ecec9', '#28a9f1', '#044d5e'],
    xaxis: {
      categories: ['2020', '2021', '2022', '2023', '2024', '2025'],
      labels: { style: { colors: '#6b7280', fontSize: '12px' } },
    },
    yaxis: { title: { text: 'Number of Entries' }, min: 0 },
    tooltip: { x: { format: 'yyyy' } },
    fill: { opacity: 0.15, type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1 } },
    legend: { position: 'top', horizontalAlign: 'left', offsetY: -10 },
    grid: { borderColor: '#e5e7eb', strokeDashArray: 4 },
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-sm font-medium text-gray-800 mb-4">
        Materiality Trend (2020–2025)
      </h2>
      <Chart options={options} series={series} type="area" height={320} />
    </div>
  );
};

export default MaterialityTrendChart;