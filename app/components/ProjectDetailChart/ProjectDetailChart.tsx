'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { projectIcon } from '@/public';
import Image from 'next/image';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ProjectDetailChartProps {
    percentage: number; // e.g., 72 for 72%
}

const ProjectDetailChart: React.FC<ProjectDetailChartProps> = ({ percentage }) => {
    const progress = Math.min(Math.max(Math.round(percentage), 0), 100); // Clamp between 0 and 100

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
                            formatter: () => `${progress}%`,
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
            <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <div className='w-full flex items-center gap-2 rounded-lg'>
                    {/* Icon */}
                    <div className="p-2 bg-[#00C587] rounded-lg">
                        <Image src={projectIcon} alt="Project Icon" className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-start space-y-1">
                        <span className="text-xs font-semibold text-gray-700">Banking Stage</span>
                        <span className="text-xs font-semibold text-gray-700">Under Review</span>
                    </div>
                </div>

                {/* Chart */}
                <div className="w-full flex items-center gap-4">
                    <ReactApexChart
                        options={chartState.options}
                        series={chartState.series}
                        type="radialBar"
                        height={130}
                    />
                    <span className='text-lg font-medium'>Total Drawn</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailChart;