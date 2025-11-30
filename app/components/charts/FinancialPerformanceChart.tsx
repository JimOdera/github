'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import Image from 'next/image';
import { projectIcon, projectIcon2, projectIcon3 } from '@/public';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface FinancialPerformanceChartProps {
    number: number;
    type: 'roi' | 'npv' | 'irr';
}

const FinancialPerformanceChart: React.FC<FinancialPerformanceChartProps> = ({
    number,
    type,
}) => {
    const progress = Math.min(Math.round(number), 100); // cap at 100%

    // ─── Config per metric ─────────────────────────────────────
    const configs = {
        roi: {
            title: 'Return on Investment (ROI)',
            subtitle: 'Total return generated',
            icon: projectIcon,
            bgColor: 'bg-[#F6FFEB]',
            borderColor: 'border-[#C9DA96]',
            gradientFrom: '#008459',
            gradientTo: '#0F1C16',
        },
        npv: {
            title: 'Net Present Value (NPV)',
            subtitle: 'Discounted cash flow value',
            icon: projectIcon2,
            bgColor: 'bg-[#EBFFF5]',
            borderColor: 'border-[#B6EBCF]',
            gradientFrom: '#00C587',
            gradientTo: '#065F46',
        },
        irr: {
            title: 'Internal Rate of Return (IRR)',
            subtitle: 'Annualized effective return',
            icon: projectIcon3,
            bgColor: 'bg-[#F0FDF4]',
            borderColor: 'border-[#86EFAC]',
            gradientFrom: '#10B981',
            gradientTo: '#065F46',
        },
    };

    // Safe fallback – always returns a config object
    const config = configs[type] ?? configs.roi;

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
                        dropShadow: { enabled: true, top: 3, left: 0, blur: 4, opacity: 0.5 },
                    },
                    track: {
                        background: '#e5e7eb',
                        strokeWidth: '67%',
                        margin: 0,
                    },
                    dataLabels: {
                        show: true,
                        name: { show: false },
                        value: {
                            formatter: () => `${progress}%`,
                            color: '#111',
                            fontSize: '28px',
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
                    gradientToColors: [config.gradientTo],   // now always defined
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                    colorStops: [
                        { offset: 0, color: config.gradientFrom, opacity: 1 },
                        { offset: 100, color: config.gradientTo, opacity: 1 },
                    ],
                },
            },
            stroke: { lineCap: 'round' },
            labels: ['Progress'],
        },
    };

    return (
        <div
            className={`${config.bgColor} ${config.borderColor} border flex flex-col md:flex-row items-center gap-6 w-full px-8 py-2 rounded-lg shadow-sm`}
        >
            {/* Icon + Text */}
            <div className="flex items-start gap-3 flex-1">
                <div className="p-2 bg-[#B1CA69] rounded-lg shadow-sm">
                    <Image src={config.icon} alt="Icon" width={24} height={24} className="w-6 h-6" />
                </div>

                <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-800 leading-tight">
                        {config.title}
                    </span>
                    <span className="text-xs text-gray-600 mt-0.5">{config.subtitle}</span>
                </div>
            </div>

            {/* Radial Chart */}
            <div className="flex items-center justify-center">
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

export default FinancialPerformanceChart;