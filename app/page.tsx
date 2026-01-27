'use client';

import Link from 'next/link';
import { FiMessageCircle, FiCpu, FiTrendingUp, FiCalendar, FiHeart, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            MusePath
                        </h1>
                        <p className="text-3xl md:text-4xl font-semibold text-white mb-4">
                            あなたの可能性を見つける
                        </p>
                        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                            日常の呟きからAIが潜在的な興味・関心を分析。<br />
                            最適な学びと進路を提案する、新しい学生支援プラットフォーム
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/dashboard"
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                        >
                            今すぐ始める
                        </Link>
                        <Link
                            href="#features"
                            className="px-8 py-4 glass text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                        >
                            詳しく見る
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-16 text-gray-400 text-sm"
                    >
                        <p>京都産業大学 学生向けプラットフォーム</p>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            主な機能
                        </h2>
                        <p className="text-xl text-gray-400">
                            AIがあなたの学生生活をサポート
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} feature={feature} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative py-24 px-4 bg-black/30">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            使い方は簡単
                        </h2>
                    </motion.div>

                    <div className="space-y-8">
                        {steps.map((step, index) => (
                            <StepCard key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="glass-dark rounded-3xl p-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            さあ、始めよう
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            あなたの潜在的な可能性を発見する旅を、今日から始めましょう
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-block px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                        >
                            無料で始める
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-12 px-4 border-t border-white/5">
                <div className="max-w-6xl mx-auto text-center text-gray-400">
                    <p className="mb-2">© 2026 MusePath. All rights reserved.</p>
                    <p className="text-sm">Kyoto Sangyo University Student Support Platform</p>
                </div>
            </footer>
        </div>
    );
}

// Feature Card Component
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
        >
            <div className="text-5xl mb-4 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-300 leading-relaxed">{feature.description}</p>
        </motion.div>
    );
}

// Step Card Component
function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-start gap-6"
        >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                {index + 1}
            </div>
            <div className="flex-1 glass-dark rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </div>
        </motion.div>
    );
}

// Data
const features = [
    {
        icon: <FiMessageCircle />,
        title: 'SNS投稿',
        description: '日常の考えや気づきを自由に投稿。タグ機能で後から振り返りも簡単に。',
    },
    {
        icon: <FiCpu />,
        title: 'AI分析',
        description: 'あなたの投稿や会話をAIが分析。潜在的な興味・関心を可視化します。',
    },
    {
        icon: <FiTrendingUp />,
        title: '履修推薦',
        description: 'あなたの興味に合った講義を自動推薦。シラバスと完全連携。',
    },
    {
        icon: <FiCalendar />,
        title: 'キャリア支援',
        description: '分析結果から最適な職種・業界を提案。必要なスキルも明確に。',
    },
    {
        icon: <FiHeart />,
        title: 'AIチャット',
        description: '24時間いつでも相談できるAIアシスタント。悩みも気軽に話せる。',
    },
    {
        icon: <FiZap />,
        title: 'スクリームタイム',
        description: '目標から逆算したスケジュール自動生成で、計画的な学習をサポート。',
    },
];

const steps = [
    {
        title: '日常を投稿',
        description: 'X（旧Twitter）のように、日々の思考や学びを気軽に投稿。AIチャットで壁打ちも可能。',
    },
    {
        title: 'AIが分析',
        description: '投稿内容からあなたの興味・関心をAIが深層分析。タグクラウドやレーダーチャートで可視化。',
    },
    {
        title: '最適な提案',
        description: '分析結果に基づいて、おすすめの講義や将来のキャリアパスを提案。自分でも気づかなかった可能性が見つかります。',
    },
];
