'use client';

import { useEffect, useRef } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function RadarChart() {
    const data = {
        labels: ['理系', '文系', 'ビジネス', 'デザイン', '技術', '社会'],
        datasets: [
            {
                label: '興味スコア',
                data: [85, 45, 60, 80, 90, 55],
                backgroundColor: 'rgba(147, 51, 234, 0.2)',
                borderColor: 'rgba(147, 51, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(147, 51, 234, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(147, 51, 234, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                pointLabels: {
                    color: '#e5e7eb',
                    font: {
                        size: 14,
                        family: 'Noto Sans JP',
                    },
                },
                ticks: {
                    color: '#9ca3af',
                    backdropColor: 'transparent',
                    stepSize: 20,
                },
                min: 0,
                max: 100,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                },
                bodyFont: {
                    size: 13,
                },
                callbacks: {
                    label: function (context: any) {
                        return `スコア: ${context.parsed.r}`;
                    },
                },
            },
        },
    };

    return (
        <div className="h-80 glass rounded-xl p-6 flex items-center justify-center">
            <div className="w-full max-w-sm">
                <Radar data={data} options={options} />
            </div>
        </div>
    );
}
