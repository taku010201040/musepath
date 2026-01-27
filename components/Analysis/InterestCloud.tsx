'use client';

import { useEffect, useRef } from 'react';

export default function InterestCloud() {
    const canvasRef = useRef<HTMLDivElement>(null);

    // Mock interest data
    const interests = [
        { word: 'データ分析', weight: 95 },
        { word: 'Python', weight: 85 },
        { word: 'デザイン', weight: 80 },
        { word: 'UI/UX', weight: 75 },
        { word: '統計', weight: 70 },
        { word: '機械学習', weight: 65 },
        { word: 'ユーザー体験', weight: 60 },
        { word: '可視化', weight: 55 },
        { word: 'プログラミング', weight: 50 },
        { word: 'キャリア', weight: 45 },
        { word: '研究', weight: 40 },
        { word: '読書', weight: 35 },
    ];

    return (
        <div ref={canvasRef} className="h-80 glass rounded-xl p-6 flex flex-wrap items-center justify-center gap-3 overflow-hidden">
            {interests.map((interest, index) => {
                const fontSize = Math.max(12, interest.weight / 4);
                const opacity = 0.5 + (interest.weight / 200);
                const colors = [
                    'text-purple-400',
                    'text-blue-400',
                    'text-pink-400',
                    'text-cyan-400',
                    'text-indigo-400',
                ];
                const color = colors[index % colors.length];

                return (
                    <span
                        key={interest.word}
                        className={`${color} font-semibold hover:scale-110 transition-transform cursor-pointer`}
                        style={{
                            fontSize: `${fontSize}px`,
                            opacity: opacity,
                            animation: `float ${3 + (index % 3)}s ease-in-out infinite`,
                            animationDelay: `${index * 0.1}s`,
                        }}
                    >
                        {interest.word}
                    </span>
                );
            })}
        </div>
    );
}
