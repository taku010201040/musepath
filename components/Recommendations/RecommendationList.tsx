'use client';

import { useState } from 'react';
import { FiBookOpen, FiUser, FiClock, FiTrendingUp, FiCheck, FiExternalLink } from 'react-icons/fi';

interface Course {
    id: string;
    code: string;
    title: string;
    professor: string;
    department: string;
    matchScore: number;
    reason: string;
    semester: string;
    credits: number;
}

const mockCourses: Course[] = [
    {
        id: '1',
        code: 'INFO301',
        title: 'データサイエンス入門',
        professor: '田中 一郎',
        department: '情報理工学部',
        matchScore: 92,
        reason: 'あなたのデータ分析やPythonへの興味と完全にマッチしています',
        semester: '2024年度 春学期',
        credits: 2,
    },
    {
        id: '2',
        code: 'DES205',
        title: 'ユーザーインタフェース設計',
        professor: '佐藤 花子',
        department: '情報理工学部',
        matchScore: 88,
        reason: 'UI/UXデザインへの関心が高く、技術とデザインの融合に最適',
        semester: '2024年度 春学期',
        credits: 2,
    },
    {
        id: '3',
        code: 'STAT202',
        title: '統計学II',
        professor: '鈴木 次郎',
        department: '理学部',
        matchScore: 85,
        reason: 'データ分析をより深く学ぶための基礎統計スキルを習得できます',
        semester: '2024年度 春学期',
        credits: 4,
    },
    {
        id: '4',
        code: 'INFO401',
        title: '機械学習基礎',
        professor: '山本 三郎',
        department: '情報理工学部',
        matchScore: 80,
        reason: '最近の機械学習への興味に応える実践的な講義です',
        semester: '2024年度 秋学期',
        credits: 2,
    },
];

export default function RecommendationList() {
    return (
        <div className="space-y-4">
            {mockCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}

function CourseCard({ course }: { course: Course }) {
    const [isWatchlisted, setIsWatchlisted] = useState(false);

    const handleSyllabusClick = () => {
        // In a real app, this would link to the actual syllabus URL
        // For now, we search for the course name + "syllabus" on Google
        const query = encodeURIComponent(`京都産業大学 ${course.title} シラバス`);
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    };

    return (
        <div className="glass rounded-xl p-6 hover:bg-white/10 transition-all group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-xs font-semibold">
                            {course.code}
                        </span>
                        <span className="text-gray-400 text-sm">{course.department}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {course.title}
                    </h3>
                </div>
                <div className="flex flex-col items-end">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                        {course.matchScore}%
                    </div>
                    <div className="text-xs text-gray-400">マッチ度</div>
                </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-300 mb-4">
                <div className="flex items-center gap-2">
                    <FiUser size={16} className="text-gray-400" />
                    <span>{course.professor}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiClock size={16} className="text-gray-400" />
                    <span>{course.credits}単位</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiBookOpen size={16} className="text-gray-400" />
                    <span>{course.semester}</span>
                </div>
            </div>

            <div className="mb-4">
                <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.matchScore}%` }}
                    ></div>
                </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                    <FiTrendingUp className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                    <p className="text-gray-300 text-sm leading-relaxed">{course.reason}</p>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleSyllabusClick}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                >
                    <FiExternalLink />
                    シラバスを見る
                </button>
                <button
                    onClick={() => setIsWatchlisted(!isWatchlisted)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${isWatchlisted
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'glass text-gray-300 hover:bg-white/10'
                        }`}
                >
                    {isWatchlisted ? (
                        <>
                            <FiCheck />
                            追加済み
                        </>
                    ) : (
                        'ウォッチリストに追加'
                    )}
                </button>
            </div>
        </div>
    );
}
