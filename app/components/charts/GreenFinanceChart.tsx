'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import Image from 'next/image';
import { projectIcon } from '@/public';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface GreenFinanceChartProps {
    number: number;
}

const GreenFinanceChart: React.FC<GreenFinanceChartProps> = ({ number }) => {
    const progress = Math.round((number / 100) * 100);

    const chartState: { series: number[]; options: ApexOptions } = {
        series: [progress],
        options: {
            chart: {
                height: 200,
                type: 'radialBar' as const,
                toolbar: { show: false },
            },
            plotOptions: {
                radialBar: {
                    startAngle: 0,
                    endAngle: 360,
                    hollow: {
                        margin: 0,
                        size: '70%',
                        background: '#fff',
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.5,
                        },
                    },
                    track: {
                        background: '#e5e7eb',
                        strokeWidth: '67%',
                        margin: 0,
                        dropShadow: {
                            enabled: true,
                            top: -3,
                            left: 0,
                            blur: 4,
                            opacity: 0.7,
                        },
                    },
                    dataLabels: {
                        show: true,
                        name: { show: false },
                        value: {
                            formatter: (val: number) => `${Math.round(val)}%`,
                            color: '#111',
                            fontSize: '28px',   // a bit larger for cleaner look
                            fontWeight: 700,
                            offsetY: 8,
                        },
                    },
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#24180E'],
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                    colorStops: [
                        { offset: 0, color: '#008459', opacity: 1 },
                        { offset: 100, color: '#0F1C16', opacity: 1 },
                    ],
                },
            },
            stroke: {
                lineCap: 'round',
            },
            labels: ['Percent'],
        },
    };

    return (
        <div className="bg-[#F6FFEB] flex flex-col md:flex-row items-center gap-6 w-full px-8 py-2 border border-[#C9DA96] rounded-lg">
            {/* Icon + Title */}
            <div className="flex items-start gap-3">
                <div className="p-2 bg-[#B1CA69] rounded-lg">
                    <Image src={projectIcon} alt="Project Icon" className="w-6 h-6" />
                </div>

                <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-700">
                        Green Finance Disbursed
                    </span>
                    <span className='text-xs'>Cumulative finance drawn</span>
                </div>
            </div>

            {/* Chart – now the only visible value */}
            <div className="flex-1 flex items-center justify-center">
                <ReactApexChart
                    options={chartState.options}
                    series={chartState.series}
                    type="radialBar"
                    height={120}
                    width={120}
                />
            </div>
        </div>
    );
};

export default GreenFinanceChart;