'use client';

import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ApexRadialChartProps {
    percentage: number;
    size?: number;
}

export default function ApexRadialChart({ percentage, size = 80 }: ApexRadialChartProps) {
    // Calculate font size based on chart size (approximately 17.5% of the size)
    const fontSize = size ? `${Math.round(size * 0.175)}px` : '14px';
    
    const options: ApexOptions = {
        chart: {
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '65%',
                    background: '#D1D5DB',
                    margin: 0,
                },
                track: {
                    background: '#FFFFFF',
                    strokeWidth: '100%',
                    margin: 0,
                },
                dataLabels: {
                    show: true,
                    name: {
                        show: false
                    },
                    value: {
                        fontSize: fontSize,
                        fontWeight: '700',
                        color: '#004D40',
                        offsetY: 5,
                        formatter: function(val) {
                            return val + '%';
                        }
                    }
                }
            }
        },
        colors: ['#004D40'],
        stroke: {
            lineCap: 'round'
        },
        fill: {
            type: 'solid',
        }
    };

    const series = [percentage];

    return (
        <div className="w-full h-full">
            <Chart
                options={options}
                series={series}
                type="radialBar"
                height="100%"
                width="100%"
            />
        </div>
    );
}
