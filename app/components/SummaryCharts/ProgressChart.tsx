'use client';

import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ProgressChartProps {
    title: string;
    value: string;
    target: string;
    changePercentage: number;
    chartData: number[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({
    title,
    value,
    target,
    changePercentage,
    chartData
}) => {
    // LINE CHART OPTIONS
    const lineChartOptions: ApexOptions = {
        chart: {
            type: 'line' as const,
            height: 60,
            sparkline: {
                enabled: true
            },
            toolbar: { show: false }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'horizontal',
                shadeIntensity: 0.3,
                gradientToColors: ['#00C587'],
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.4,
                stops: [0, 100]
            }
        },
        colors: ['#00C587'],
        markers: {
            size: 0
        },
        grid: {
            show: false
        },
        xaxis: {
            axisTicks: { show: false },
            axisBorder: { show: false },
            labels: { show: false },
            categories: [],
            crosshairs: { show: false }
        },
        yaxis: {
            show: false
        },
        tooltip: {
            enabled: false
        }
    };

    return (
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 bg-[#F5F8F5] border border-gray-200 px-8 py-4 rounded-lg'>
            {/* Content */}
            <div className='flex flex-col items-start gap-2'>
                <p className='text-xs'>{title}</p>
                <h1 className='text-2xl font-semibold'>{value}</h1>
                <p className='text-xs'>Target: {target}</p>
            </div>

            {/* Chart & Change Info */}
            <div className='flex flex-col items-center gap-2'>
                <div>
                    <ReactApexChart
                        options={lineChartOptions}
                        series={[{ name: 'Progress', data: chartData }]}
                        type="line"
                        height={60}
                    />
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <p className="text-xs text-gray-500">From last Update</p>
                    <span className={`text-sm font-medium ${changePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {changePercentage >= 0 ? '+' : ''}{changePercentage}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProgressChart;