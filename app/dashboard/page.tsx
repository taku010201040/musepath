'use client';

import { useState } from 'react';
import TimelineFeed from '@/components/Timeline/TimelineFeed';
import PostComposer from '@/components/Timeline/PostComposer';
import ChatInterface, { Message, generateAIResponse } from '@/components/AI/ChatInterface';
import InterestCloud from '@/components/Analysis/InterestCloud';
import RadarChart from '@/components/Analysis/RadarChart';
import RecommendationList from '@/components/Recommendations/RecommendationList';
import { FiHome, FiMessageSquare, FiBarChart2, FiBookOpen, FiUser } from 'react-icons/fi';

import { Post } from '@/components/Timeline/PostCard';

const mockPosts: Post[] = [
    {
        id: '1',
        content: '今日のデータ分析の授業めっちゃ面白かった！統計学って思ったより実用的なんだな。Pythonでデータ可視化できるようになりたい。',
        tags: ['授業', '研究', 'データ分析'],
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        author: {
            name: '山田 太郎',
            avatar: '山',
        },
    },
    {
        id: '2',
        content: 'キャリアどうしようかな...。最近UIデザインに興味あるけど、情報理工でそういう道に進めるのかな？🤔',
        tags: ['悩み', 'キャリア', 'デザイン'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        author: {
            name: '山田 太郎',
            avatar: '山',
        },
    },
    {
        id: '3',
        content: '図書館でUXデザインの本借りてきた。ユーザー中心設計って考え方、プログラミングにも活かせそう。',
        tags: ['趣味', '読書', 'デザイン'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        author: {
            name: '山田 太郎',
            avatar: '山',
        },
    },
    {
        id: '4',
        content: '最近機械学習に興味出てきた。自分で簡単なモデル作ってみたいけど、何から始めればいいんだろう？',
        tags: ['研究', 'アイデア', '機械学習'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        author: {
            name: '山田 太郎',
            avatar: '山',
        },
    },
];

type Tab = 'timeline' | 'analysis' | 'recommendations' | 'profile';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('timeline');
    const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [loading, setLoading] = useState(false);

    // Chat State
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'こんにちは！私はあなたの学びとキャリアをサポートするAIアシスタントです。何でも気軽に相談してくださいね。',
            timestamp: new Date(),
        },
    ]);
    const [isAiTyping, setIsAiTyping] = useState(false);

    // Profile State
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profile, setProfile] = useState({
        studentId: '',
        department: '',
        grade: '',
        email: '',
    });
    const [editForm, setEditForm] = useState({
        studentId: 'G',
        department: '情報理工学部',
        grade: '1回生',
        email: '@cc.kyoto-su.ac.jp',
    });

    const handleProfileUpdate = () => {
        setProfile(editForm);
        setIsEditingProfile(false);
        setShowOnboarding(false);
    };

    const handleAiMessage = (content: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date(),
        };
        setChatMessages(prev => [...prev, userMessage]);
        setIsAiTyping(true);

        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: generateAIResponse(content),
                timestamp: new Date(),
            };
            setChatMessages(prev => [...prev, aiMessage]);
            setIsAiTyping(false);
        }, 1500);
    };

    const handleNewPost = (content: string, tags: string[]) => {
        const newPost: Post = {
            id: Date.now().toString(),
            content,
            tags,
            createdAt: new Date(),
            author: {
                name: '山田 太郎',
                avatar: '山',
            },
        };
        // Update posts state immediately so we can analyze the full list
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);

        // Trigger AI analysis based on ALL posts
        setTimeout(() => {
            setIsChatOpen(true);
            setIsAiTyping(true);

            // Aggregate all tags to find trends
            const allTags = updatedPosts.flatMap(p => p.tags);
            const tagCounts: { [key: string]: number } = {};
            allTags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });

            // Find top interests
            const sortedTags = Object.entries(tagCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([tag]) => tag);

            const topInterests = sortedTags.slice(0, 3).join('、');

            setTimeout(() => {
                let analysis = "日々の気づきを言語化することは素晴らしい習慣です。";

                // Comprehensive analysis logic based on accumulated tags
                if (allTags.includes('データ分析') && allTags.includes('デザイン')) {
                    analysis = "これまでの投稿傾向から、「データ分析」と「デザイン」の両方に強い関心があることがわかります。この2つを組み合わせた「データビジュアライゼーション」や「UXリサーチ」といった分野は、あなたにとって非常に有望なキャリアパスになるでしょう。";
                } else if (allTags.filter(t => ['悩み', '迷い', 'キャリア'].includes(t)).length >= 2) {
                    analysis = "最近の投稿から、将来のキャリアについて深く思考している様子が伺えます。悩みは成長の証です。興味のある分野の先輩や先生に話を聞いてみるのも良い転機になるかもしれません。";
                } else if (updatedPosts.length >= 5) {
                    analysis = `継続的に学習ログを記録できていますね！特に「${topInterests}」に関するトピックが多く、あなたの専門性がこの方向に育ちつつあることがデータから読み取れます。`;
                }

                const aiAnalysisMessage: Message = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: `【学習ログの総合分析】\n\n■ 今回の投稿\n「${content}」\n\n■ 継続的分析結果\n${analysis}\n\nこれまでの全投稿データの傾向から、上記のフィードバックを生成しました。あなたの興味関心モデルを更新しました。`,
                    timestamp: new Date(),
                };
                setChatMessages(prev => [...prev, aiAnalysisMessage]);
                setIsAiTyping(false);
            }, 1500);
        }, 1000);
    };

    if (showOnboarding) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full glass-dark rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                            M
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">ようこそ MusePath へ</h1>
                        <p className="text-gray-300">まずはあなたのプロフィールを教えてください</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">学籍番号</label>
                            <input
                                type="text"
                                value={editForm.studentId}
                                onChange={(e) => setEditForm({ ...editForm, studentId: e.target.value })}
                                className="w-full bg-white/5 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 border border-white/10"
                                placeholder="例: G1234567"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">学部</label>
                            <select
                                value={editForm.department}
                                onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                                className="w-full bg-white/5 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 border border-white/10"
                            >
                                <option className="bg-slate-900" value="情報理工学部">情報理工学部</option>
                                <option className="bg-slate-900" value="経営学部">経営学部</option>
                                <option className="bg-slate-900" value="経済学部">経済学部</option>
                                <option className="bg-slate-900" value="法学部">法学部</option>
                                <option className="bg-slate-900" value="現代社会学部">現代社会学部</option>
                                <option className="bg-slate-900" value="国際関係学部">国際関係学部</option>
                                <option className="bg-slate-900" value="外国語学部">外国語学部</option>
                                <option className="bg-slate-900" value="文化学部">文化学部</option>
                                <option className="bg-slate-900" value="理学部">理学部</option>
                                <option className="bg-slate-900" value="生命科学部">生命科学部</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">学年</label>
                            <select
                                value={editForm.grade}
                                onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                                className="w-full bg-white/5 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 border border-white/10"
                            >
                                <option className="bg-slate-900" value="1回生">1回生</option>
                                <option className="bg-slate-900" value="2回生">2回生</option>
                                <option className="bg-slate-900" value="3回生">3回生</option>
                                <option className="bg-slate-900" value="4回生">4回生</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">メールアドレス</label>
                            <input
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                className="w-full bg-white/5 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 border border-white/10"
                                placeholder="例: g1234567@cc.kyoto-su.ac.jp"
                            />
                        </div>

                        <button
                            onClick={handleProfileUpdate}
                            className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-[1.02]"
                        >
                            スタートする
                        </button>

                        <button
                            className="w-full mt-4 py-3 bg-[#003B5C] hover:bg-[#002A42] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                        >
                            <span>🎓</span> 学認（GakuNin）でログイン
                        </button>

                        <button
                            onClick={() => setShowOnboarding(false)}
                            className="w-full mt-4 py-2 text-gray-400 hover:text-white text-sm transition-colors"
                        >
                            デモモードでスキップ
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-40 glass-dark border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            MusePath
                        </h1>
                        <div className="flex items-center gap-4">
                            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold">
                                山
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
                {/* Main Content */}
                <main className="flex-1 space-y-6">
                    {activeTab === 'timeline' && (
                        <>
                            <PostComposer onPost={handleNewPost} />
                            <TimelineFeed posts={posts} loading={loading} />
                        </>
                    )}

                    {activeTab === 'analysis' && (
                        <div className="space-y-6">
                            <div className="glass-dark rounded-2xl p-6">
                                <h2 className="text-2xl font-bold text-white mb-6">あなたの興味・関心分析</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-4">キーワードクラウド</h3>
                                        <InterestCloud />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-4">興味分布</h3>
                                        <RadarChart />
                                    </div>
                                </div>
                            </div>

                            <div className="glass-dark rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-white mb-4">深層興味分析</h3>
                                <div className="space-y-4">
                                    <DeepInterestItem
                                        title="データサイエンス"
                                        confidence={87}
                                        reason="統計分析やPythonに関する投稿が多く、研究への関心が高いことが伺えます"
                                    />
                                    <DeepInterestItem
                                        title="UI/UXデザイン"
                                        confidence={72}
                                        reason="ユーザー体験やデザインに関する言及が散見され、創造的思考の傾向があります"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'recommendations' && (
                        <div className="space-y-6">
                            <div className="glass-dark rounded-2xl p-6">
                                <h2 className="text-2xl font-bold text-white mb-2">おすすめ講義</h2>
                                <p className="text-gray-400 mb-6">あなたの興味に基づいた推奨科目</p>
                                <RecommendationList />
                            </div>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="glass-dark rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">プロフィール</h2>
                                <button
                                    onClick={() => {
                                        if (isEditingProfile) handleProfileUpdate();
                                        else {
                                            setEditForm(profile);
                                            setIsEditingProfile(true);
                                        }
                                    }}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${isEditingProfile
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                                        : 'glass text-gray-300 hover:bg-white/10'
                                        }`}
                                >
                                    {isEditingProfile ? '保存する' : '編集する'}
                                </button>
                            </div>

                            {isEditingProfile ? (
                                <div className="space-y-4">
                                    <div className="border-b border-white/10 pb-4">
                                        <label className="block text-gray-400 text-sm mb-2">学籍番号</label>
                                        <input
                                            type="text"
                                            value={editForm.studentId}
                                            onChange={(e) => setEditForm({ ...editForm, studentId: e.target.value })}
                                            className="w-full bg-white/5 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div className="border-b border-white/10 pb-4">
                                        <label className="block text-gray-400 text-sm mb-2">学部</label>
                                        <input
                                            type="text"
                                            value={editForm.department}
                                            onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                                            className="w-full bg-white/5 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div className="border-b border-white/10 pb-4">
                                        <label className="block text-gray-400 text-sm mb-2">学年</label>
                                        <input
                                            type="text"
                                            value={editForm.grade}
                                            onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                                            className="w-full bg-white/5 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div className="border-b border-white/10 pb-4">
                                        <label className="block text-gray-400 text-sm mb-2">メール</label>
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="w-full bg-white/5 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <ProfileItem label="学籍番号" value={profile.studentId} />
                                    <ProfileItem label="学部" value={profile.department} />
                                    <ProfileItem label="学年" value={profile.grade} />
                                    <ProfileItem label="メール" value={profile.email} />
                                </div>
                            )}
                        </div>
                    )}
                </main>

                {/* Sidebar */}
                <aside className="hidden lg:block w-80 space-y-6">
                    {/* Navigation */}
                    <nav className="glass-dark rounded-2xl p-4">
                        <div className="space-y-2">
                            <NavButton
                                icon={<FiHome />}
                                label="タイムライン"
                                active={activeTab === 'timeline'}
                                onClick={() => setActiveTab('timeline')}
                            />
                            <NavButton
                                icon={<FiBarChart2 />}
                                label="分析"
                                active={activeTab === 'analysis'}
                                onClick={() => setActiveTab('analysis')}
                            />
                            <NavButton
                                icon={<FiBookOpen />}
                                label="推薦講義"
                                active={activeTab === 'recommendations'}
                                onClick={() => setActiveTab('recommendations')}
                            />
                            <NavButton
                                icon={<FiUser />}
                                label="プロフィール"
                                active={activeTab === 'profile'}
                                onClick={() => setActiveTab('profile')}
                            />
                        </div>
                    </nav>

                    {/* Quick Stats */}
                    <div className="glass-dark rounded-2xl p-4">
                        <h3 className="text-lg font-semibold text-white mb-4">今週の活動</h3>
                        <div className="space-y-3">
                            <StatItem label="投稿数" value="12" />
                            <StatItem label="AI会話" value="8回" />
                            <StatItem label="新しい興味" value="3個" />
                        </div>
                    </div>
                </aside>
            </div>

            {/* AI Chat - Fixed Bottom Right */}
            <ChatInterface
                messages={chatMessages}
                onSendMessage={handleAiMessage}
                isOpen={isChatOpen}
                setIsOpen={setIsChatOpen}
                isTyping={isAiTyping}
            />

            {/* Mobile Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-dark border-t border-white/10 z-50">
                <div className="flex justify-around py-3">
                    <MobileNavButton
                        icon={<FiHome />}
                        label="ホーム"
                        active={activeTab === 'timeline'}
                        onClick={() => setActiveTab('timeline')}
                    />
                    <MobileNavButton
                        icon={<FiBarChart2 />}
                        label="分析"
                        active={activeTab === 'analysis'}
                        onClick={() => setActiveTab('analysis')}
                    />
                    <MobileNavButton
                        icon={<FiBookOpen />}
                        label="推薦"
                        active={activeTab === 'recommendations'}
                        onClick={() => setActiveTab('recommendations')}
                    />
                    <MobileNavButton
                        icon={<FiUser />}
                        label="プロフ"
                        active={activeTab === 'profile'}
                        onClick={() => setActiveTab('profile')}
                    />
                </div>
            </nav>
        </div>
    );
}

// Helper Components
function NavButton({ icon, label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{label}</span>
        </button>
    );
}

function MobileNavButton({ icon, label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${active ? 'text-purple-400' : 'text-gray-400'
                }`}
        >
            <span className="text-2xl">{icon}</span>
            <span className="text-xs font-medium">{label}</span>
        </button>
    );
}

function StatItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">{label}</span>
            <span className="text-white font-semibold">{value}</span>
        </div>
    );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="border-b border-white/10 pb-3">
            <p className="text-gray-400 text-sm mb-1">{label}</p>
            <p className="text-white font-medium">{value}</p>
        </div>
    );
}

function DeepInterestItem({ title, confidence, reason }: { title: string; confidence: number; reason: string }) {
    return (
        <div className="glass rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold text-white">{title}</h4>
                <span className="text-purple-400 font-semibold">{confidence}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${confidence}%` }}
                ></div>
            </div>
            <p className="text-gray-300 text-sm">{reason}</p>
        </div>
    );
}
