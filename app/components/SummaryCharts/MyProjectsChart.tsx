'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { projectIcon2 } from '@/public';
import Image from 'next/image';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface MyProjectsChartProps {
    funded: number;
    target: number;
}

const MyProjectsChart: React.FC<MyProjectsChartProps> = ({ funded, target }) => {
    const progress = Math.round((funded / target) * 100);

    const chartState: { series: number[]; options: ApexOptions } = {
        series: [progress],
        options: {
            chart: {
                height: 200,
                type: 'radialBar' as const,
                toolbar: { show: false }
            },
            plotOptions: {
                radialBar: {
                    startAngle: 0,        // Start at right (3 o'clock)
                    endAngle: 360,        // Full circle
                    hollow: {
                        margin: 0,
                        size: '70%',
                        background: '#fff',
                        dropShadow: {
                            enabled: true,
                            top: 3,
                            left: 0,
                            blur: 4,
                            opacity: 0.5
                        }
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
                            opacity: 0.7
                        }
                    },
                    dataLabels: {
                        show: true,
                        name: { show: false },
                        value: {
                            formatter: (val: number) => `${Math.round(val)}%`,
                            color: '#111',
                            fontSize: '22px',
                            show: true,
                            offsetY: 8,
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#0F1C16'],
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                    colorStops: [
                        { offset: 0, color: '#008459', opacity: 1 },
                        { offset: 100, color: '#0F1C16', opacity: 1 }
                    ]
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Percent'],
        },
    };

    return (
        <div className="flex flex-col items-center bg-white rounded-lg">
            <div className="bg-[#F6FDFA] flex flex-col md:flex-row items-center gap-4 w-full px-8 py-4">
                <div className='w-full flex items-start gap-2 rounded-lg'>
                    {/* Icon */}
                    <div className="p-2 bg-[#00C587] rounded-lg">
                        <Image src={projectIcon2} alt="Project Icon" className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-start space-y-1">
                        <span className="text-xs font-semibold text-gray-700">My Projects</span>
                        <div className='flex items-center gap-2'>
                            {/* Funded Amount */}
                            <span className="text-xs text-gray-500">${funded.toLocaleString()}</span>
                            <span>-</span>
                            {/* Target */}
                            <span className="text-xs text-gray-400">Target: ${target.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="">
                    <ReactApexChart
                        options={chartState.options}
                        series={chartState.series}
                        type="radialBar"
                        height={150}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyProjectsChart;