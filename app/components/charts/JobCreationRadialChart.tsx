// app/components/charts/JobCreationNestedDonutChart.tsx
'use client';

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const JobCreationNestedDonutChart = () => {
    const outerSeries = [38, 32, 30];
    const outerLabels = ['Women', 'Youth', 'Other'];

    const innerSeries = [56, 44];
    const innerLabels = ['Full Time', 'Part Time'];

    // Fixed chart size
    const chartSize = 380;

    const options: ApexCharts.ApexOptions = {
        series: outerSeries,
        chart: {
            type: 'donut',
            height: chartSize,
            width: chartSize,
        },
        labels: outerLabels,
        colors: ['#10b981', '#8b5cf6', '#94a3b8'],
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
                donut: {
                    size: '75%', // This creates the hole for the inner chart
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total Jobs',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#374151',
                        },
                    },
                },
            },
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        tooltip: {
            y: { formatter: (val) => `${val}%` },
        },
    };

    const innerOptions: ApexCharts.ApexOptions = {
        series: innerSeries,
        chart: {
            type: 'donut',
            height: chartSize,
            width: chartSize,
        },
        labels: innerLabels,
        colors: ['#0ea5e9', '#3b82f6'],
        plotOptions: {
            pie: {
                donut: {
                    size: '75%', // Inner donut fills exactly 75% → matches outer hole
                },
            },
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        tooltip: { enabled: false },
    };

    return (
        <div className="p-6">
            <h2 className="text-sm font-medium text-gray-800 mb-8">
                Job Creation from all activities
            </h2>

            {/* Side-by-side Layout */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Left: Perfectly Nested Donut Chart */}
                <div className="relative" style={{ width: chartSize, height: chartSize, margin: '0 auto' }}>
                    {/* Outer Donut */}
                    <Chart
                        options={options}
                        series={outerSeries}
                        type="donut"
                        height={chartSize}
                        width={chartSize}
                    />

                    {/* Inner Donut - Perfectly overlaid and touching */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div style={{ width: chartSize * 0.75, height: chartSize * 0.75 }}>
                            <Chart
                                options={innerOptions}
                                series={innerSeries}
                                type="donut"
                                height={chartSize * 0.75}
                                width={chartSize * 0.75}
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Legend (unchanged, just prettier) */}
                <div className="space-y-8">
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Employment Type
                        </p>
                        <div className="space-y-5">
                        {[
                            { label: 'Full Time', value: 56, color: '#0ea5e9' },
                            { label: 'Part Time', value: 44, color: '#3b82f6' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-4 justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                className="w-6 h-6 rounded-full flex-shrink-0"
                                style={{ backgroundColor: item.color }}
                                />
                                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                            </div>

                            <p className="text-lg font-medium text-gray-900">{item.value}%</p>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Beneficiary Group
                        </p>
                        <div className="space-y-5">
                            {[
                                { label: 'Women', value: 38, color: '#10b981' },
                                { label: 'Youth', value: 32, color: '#8b5cf6' },
                                { label: 'Other', value: 30, color: '#94a3b8' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-4 justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <p className="text-sm font-medium text-gray-700">{item.label}</p>
                                    </div>

                                    <p className="text-lg font-medium text-gray-900">{item.value}%</p>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCreationNestedDonutChart;