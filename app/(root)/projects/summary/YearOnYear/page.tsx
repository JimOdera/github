'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const YearOnYear = () => {
    const years = [
        '2020', '2021', '2022', '2023', '2024',
        '2025', '2026', '2027', '2028', '2029'
    ];

    // Realistic data with peaks and dips
    const emissions = [
        1200,   // 2020: Starting point
        1800,   // 2021: Early growth
        2500,   // 2022: Momentum
        3100,   // 2023: Strong progress
        4200,   // 2024: Peak performance
        3600,   // 2025: Dip (e.g., project delay, external factor)
        4900,   // 2026: Recovery
        5800,   // 2027: Strong rebound
        7100,   // 2028: Scaling up
        8200    // 2029: New high
    ];

    const options = {
        chart: {
            type: 'line' as const,
            fontFamily: 'Inter, system-ui, sans-serif',
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        stroke: {
            curve: 'smooth' as const,
            width: 2,
            colors: ['#044D5E'],
        },
        markers: {
            size: 4,
            colors: ['#044D5E'],
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: { size: 8 },
        },
        xaxis: {
            categories: years,
            title: {
                text: 'Year',
                style: { color: '#6B7280', fontSize: '12px', fontWeight: 600 },
            },
            labels: {
                style: { colors: '#6B7280', fontSize: '12px' },
                rotate: -45,
                rotateAlways: false,
            },
        },
        yaxis: {
            title: {
                text: 'Emission Reduction (tCO₂e)',
                style: { color: '#6B7280', fontSize: '12px', fontWeight: 600 },
            },
            labels: {
                style: { colors: '#6B7280', fontSize: '12px' },
                formatter: (val: number) => `${val.toLocaleString()}`,
            },
            min: 0,
            max: 9000,
            tickAmount: 6,
        },
        grid: {
            borderColor: '#E5E7EB',
            strokeDashArray: 4,
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: true } },
        },
        tooltip: {
            x: { format: 'yyyy' },
            y: {
                formatter: (val: number) => `${val.toLocaleString()} tCO₂e`,
            },
        },
        dataLabels: { enabled: false },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100],
            },
        },
        annotations: {
            points: [
                {
                    x: '2024',
                    y: 4200,
                    marker: { size: 8, fillColor: '#044D5E', strokeColor: '#fff', strokeWidth: 3 },
                    label: { text: 'Peak', style: { color: '#fff', background: '#044D5E' } }
                },
                {
                    x: '2025',
                    y: 3600,
                    marker: { size: 8, fillColor: '#DC2626', strokeColor: '#fff', strokeWidth: 3 },
                    label: { text: 'Dip', style: { color: '#fff', background: '#DC2626' } }
                },
            ],
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: { height: 300 },
                    xaxis: { labels: { rotate: -45 } },
                    annotations: { points: [] }, // Hide annotations on mobile
                },
            },
        ],
    };

    const series = [
        {
            name: 'Emission Reduction',
            data: emissions,
        },
    ];

    return (
        <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-[#044D5E] mb-6">
                Year-on-Year Emission Reduction
            </h3>
            <Chart
                options={options}
                series={series}
                type="line"
                height={380}
            />
        </div>
    );
};

export default YearOnYear;