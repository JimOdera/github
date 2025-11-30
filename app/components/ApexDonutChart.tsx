'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartData {
    name: string;
    value: number;
    color: string;
}

interface ApexDonutChartProps {
    data: ChartData[];
    height?: number;
}

export default function ApexDonutChart({ data, height = 300 }: ApexDonutChartProps) {
    const series = data.map(item => item.value);
    const labels = data.map(item => item.name);
    const colors = data.map(item => item.color);

    const options: ApexOptions = {
        chart: {
            type: 'donut',
            fontFamily: 'Inter, system-ui, sans-serif',
        },
        labels: labels,
        colors: colors,
        legend: {
            show: false, // We're using custom legend in the parent component
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: false,
                    },
                },
            },
        },
        stroke: {
            width: 2,
            colors: ['#FBFDFB'],
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: (value: number) => `${value}%`,
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Chart
                options={options}
                series={series}
                type="donut"
                height={height}
            />
        </div>
    );
}