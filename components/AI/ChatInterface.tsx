'use client';

import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface ChatInterfaceProps {
    messages: Message[];
    onSendMessage: (content: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isTyping?: boolean;
}

export default function ChatInterface({ messages, onSendMessage, isOpen, setIsOpen, isTyping = false }: ChatInterfaceProps) {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;
        onSendMessage(input);
        setInput('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110 z-50"
                    >
                        <FiMessageCircle size={28} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 w-96 h-[600px] glass-dark rounded-2xl shadow-2xl flex flex-col z-50 border border-white/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white animate-pulse-slow">
                                    🤖
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">AIアシスタント</h3>
                                    <p className="text-xs text-green-400">オンライン</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                            : 'glass text-gray-200'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="glass rounded-2xl px-4 py-3">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="メッセージを入力..."
                                    className="flex-1 bg-white/5 text-white placeholder-gray-500 px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FiSend size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Export the mock logic so we can use it on the server/parent if needed, 
// though we'll likely move the logic to the parent.
export function generateAIResponse(userInput: string): string {
    const input = userInput.toLowerCase();

    // Specific topics
    if (input.includes('履修') || input.includes('授業') || input.includes('講義') || input.includes('単位')) {
        const responses = [
            'あなたの興味分析を見ると、データサイエンスやデザインの分野に強い関心があるようですね。「データサイエンス入門」以外にも、最近は「人間工学」などの科目にも興味がありますか？',
            '興味・関心に基づくと、技術と社会の接点を探る講義が合いそうです。「情報と職業」のような、将来のキャリアに直結する科目のシラバスはもう確認しましたか？',
            'あなたの投稿には「新しい発見」への期待が感じられます。あえて専門外の「一般教育科目」から刺激を受けてみるのはどうでしょう？何か受けてみたい分野はありますか？'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (input.includes('キャリア') || input.includes('就職') || input.includes('将来') || input.includes('仕事')) {
        const responses = [
            '分析結果からは、UI/UXデザイナーやデータアナリストなどの、創造性と論理性を両立する仕事が向いていると出ています。自分では、エンジニアのように「作る」ことと、アナリストのように「考える」こと、どちらにワクワクしますか？',
            '志望業界を絞る前に、まずは自分の「好き」を深掘りしてみるのも良いですよ。最近、時間を忘れて熱中したことは何ですか？それが意外なキャリアに繋がるかもしれません。',
            '京都産業大学の卒業生は多様な分野で活躍しています。特定の企業タイプ（大企業、スタートアップ、公務員など）に興味はありますか？それとも、仕事内容そのものを重視したいですか？'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (input.includes('悩') || input.includes('心配') || input.includes('不安') || input.includes('困っ')) {
        const responses = [
            '誰にでも不安な時期はあります。大切なのは、それを言葉にすることですよ。今、一番心に引っかかっていることは何ですか？もっと具体的に聞かせてください。',
            '一人で抱え込まずに、 MusePathの分析結果も客観的な視点として使ってみてください。今の悩みは、学習目標に関することですか？それとももっとプライベートなことでしょうか？',
            'まずは一歩踏み出した自分を褒めてあげましょう。少しでも気持ちを整理するために、今感じていることをそのまま箇条書きで話してみませんか？'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (input.includes('趣味') || input.includes('休み') || input.includes('遊び') || input.includes('最近')) {
        return '日常の充実も大切な学びの一部ですね！最近ハマっていることや、週末に予定している楽しいことはありますか？そこから新しい興味の種が見つかることもありますよ。';
    }

    if (input.includes('ありがとう') || input.includes('感謝') || input.includes('助かった')) {
        return 'そう言っていただけて嬉しいです！あなたの成長をサポートできるのが私の何よりの喜びです。他にも何か、一緒に深掘りしてみたいテーマはありますか？';
    }

    // Default responses that encourage sharing
    const defaultResponses = [
        'それは興味深いですね！そのことについて、もう少し詳しく教えていただけますか？特にどんな点に惹かれていますか？',
        'なるほど、あなたの投稿履歴と照らし合わせると面白い発見がありそうです。最近の授業や生活の中で、何か関連する出来事はありましたか？',
        '面白い視点ですね。それを実現するために、今自分に足りないと感じているスキルや知識は何かありますか？',
        'もっと深く理解したいです。例えば、それを始めたきっかけや、今の正直な気持ちを教えてもらえますか？'
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
