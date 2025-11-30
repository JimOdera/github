'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Define types for chart series
interface ChartSeries {
    year: string;
    value: number;
}

// Props for the FundingProgressChart component
interface FundingProgressChartProps {
    seriesWithYears: ChartSeries[];
    yearColorMap: { [key: string]: string };
}

const FundingProgressChart: React.FC<FundingProgressChartProps> = ({ seriesWithYears, yearColorMap }) => {
    // Chart configuration
    const sortedSeriesWithYears = [...seriesWithYears].sort((a, b) => a.value - b.value);
    const seriesData = sortedSeriesWithYears.map(item => item.value);
    const total = seriesData.reduce((a, b) => a + b, 0);
    const remaining = total < 100 ? 100 - total : 0;
    const finalSeries = total === 100 ? seriesData : [...seriesData, remaining];
    const finalLabels = total === 100
        ? sortedSeriesWithYears.map(item => item.year)
        : [...sortedSeriesWithYears.map(item => item.year), 'Remaining'];
    const finalColors = total === 100
        ? sortedSeriesWithYears.map(item => yearColorMap[item.year])
        : [...sortedSeriesWithYears.map(item => yearColorMap[item.year]), '#D3D3D3'];

    const semiDonutOptions = {
        series: finalSeries,
        chart: {
            type: 'donut' as const,
            height: 200,
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: { show: false },
                        value: {
                            fontSize: '24px',
                            formatter: (val: string) => `${parseFloat(val)}%`, // Convert string to number
                        },
                        total: {
                            show: true,
                            label: 'Funded',
                            formatter: () => `${total}%`,
                        },
                    },
                },
            },
        },
        stroke: { show: false },
        colors: finalColors,
        labels: finalLabels,
        fill: { colors: finalColors },
        legend: { show: false },
        dataLabels: { enabled: false },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { height: 150 },
                    plotOptions: { pie: { donut: { size: '60%' } } },
                },
            },
        ],
    };

    // Legend items for chart
    const legendItems = sortedSeriesWithYears.map(item => ({
        year: item.year,
        color: yearColorMap[item.year],
    }));

    return (
        <div className="flex flex-col items-center justify-center border border-gray-100 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Funding Progress</h2>
            <div className="w-48 h-48">
                <Chart options={semiDonutOptions} series={semiDonutOptions.series} type="donut" height={200} />
            </div>
            <div className="flex justify-center space-x-4 mt-4 text-xs text-gray-500">
                {legendItems.map(item => (
                    <div key={item.year} className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <p>{item.year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FundingProgressChart;