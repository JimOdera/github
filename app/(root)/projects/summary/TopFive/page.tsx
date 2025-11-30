'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const TopFive = () => {
    /* --------------------------------------------------------------
       1. Data – each project has three sources (adds up ≤ 100)
       -------------------------------------------------------------- */
    const series = [
        { name: 'Land Use', data: [45, 38, 52, 41, 48] },
        { name: 'Grid Electricity', data: [25, 30, 18, 28, 22] },
        { name: 'Diesel Fuel', data: [15, 20, 25, 18, 23] },
    ];

    /* --------------------------------------------------------------
       2. Options – colors live inside the options object
       -------------------------------------------------------------- */
    const options: ApexOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            fontFamily: 'Inter, system-ui, sans-serif',
            toolbar: { show: false },
        },

        colors: ['#044D5E', '#53D8F5', '#1ECEC9'],   // same palette as before

        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '60%',
                borderRadius: 6,
                dataLabels: { position: 'top' },
            },
        },

        dataLabels: { enabled: false },

        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },

        xaxis: {
            categories: ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'],
            title: {
                text: 'Projects',
                style: { color: '#6B7280', fontSize: '12px', fontWeight: 600 },
            },
            labels: { style: { colors: '#6B7280', fontSize: '12px' } },
        },

        yaxis: {
            title: {
                text: 'Emission Reduction (tCO₂e)',
                style: { color: '#6B7280', fontSize: '12px', fontWeight: 600 },
            },
            min: 0,
            max: 100,
            tickAmount: 5,
            labels: {
                style: { colors: '#6B7280', fontSize: '12px' },
                formatter: (val: number) => `${val}`,
            },
        },

        grid: {
            borderColor: '#E5E7EB',
            strokeDashArray: 4,
        },

        tooltip: {
            y: { formatter: (val: number) => `${val} tCO₂e` },
        },

        /* --------------------------------------------------------------
           3. Legend – use only the fields allowed by ApexOptions
           -------------------------------------------------------------- */
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            offsetY: 8,
            fontSize: '13px',
            markers: {
                // size is the only supported property for legend markers
                size: 12,
            },
            itemMargin: { horizontal: 16, vertical: 4 },
        },

        fill: { opacity: 1 },

        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: { height: 300 },
                    plotOptions: { bar: { columnWidth: '70%' } },
                    xaxis: { labels: { rotate: -45 } },
                },
            },
        ],
    };

    return (
        <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-[#044D5E] mb-6">
                Top 5 Projects by Emission Reduction
            </h3>

            <Chart options={options} series={series} type="bar" height={380} />
        </div>
    );
};

export default TopFive;