'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CarbonOffsetChartProps {
    series: ApexOptions['series'];
    options: ApexOptions;
}

const CarbonOffsetChart: React.FC<CarbonOffsetChartProps> = ({ series, options }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <Chart
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default CarbonOffsetChart;