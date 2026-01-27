'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { FiHeart, FiMessageCircle, FiShare2 } from 'react-icons/fi';

export interface Post {
    id: string;
    content: string;
    tags: string[];
    imageUrls?: string[];
    createdAt: Date;
    author: {
        name: string;
        avatar: string;
    };
}

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [replies, setReplies] = useState<string[]>([]);
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [isShared, setIsShared] = useState(false);

    const timeAgo = formatDistanceToNow(post.createdAt, {
        addSuffix: true,
        locale: ja
    });

    const handleLike = () => {
        if (liked) {
            setLikeCount(prev => prev - 1);
        } else {
            setLikeCount(prev => prev + 1);
        }
        setLiked(!liked);
    };

    const handleReplySubmit = () => {
        if (!replyText.trim()) return;
        setReplies([...replies, replyText]);
        setReplyText('');
        setIsReplying(false);
    };

    const handleShare = async () => {
        const shareData = {
            title: 'MusePath Post',
            text: post.content,
            url: window.location.href, // In real app: `/posts/${post.id}`
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback to clipboard
            try {
                await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
                setIsShared(true);
                setTimeout(() => setIsShared(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    return (
        <div className="glass-dark rounded-2xl p-6 hover:bg-white/5 transition-all">
            <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold">
                        {post.author.avatar}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-white">{post.author.name}</span>
                        <span className="text-gray-500 text-sm">·</span>
                        <span className="text-gray-500 text-sm">{timeAgo}</span>
                    </div>

                    <p className="text-gray-200 leading-relaxed mb-3 whitespace-pre-wrap">
                        {post.content}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm hover:bg-purple-600/30 transition-colors cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Images */}
                    {post.imageUrls && post.imageUrls.length > 0 && (
                        <div className={`grid gap-2 mb-4 rounded-xl overflow-hidden ${post.imageUrls.length === 1 ? 'grid-cols-1' :
                            post.imageUrls.length === 2 ? 'grid-cols-2' :
                                'grid-cols-2'
                            }`}>
                            {post.imageUrls.map((url, index) => (
                                <div
                                    key={index}
                                    className="aspect-video bg-white/5 rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={url}
                                        alt={`Post image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-6 text-gray-400">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 transition-colors group ${liked ? 'text-pink-500' : 'hover:text-pink-400'}`}
                        >
                            <FiHeart className={`group-hover:scale-110 transition-transform ${liked ? 'fill-current' : ''}`} size={18} />
                            <span className="text-sm">{likeCount}</span>
                        </button>
                        <button
                            onClick={() => setIsReplying(!isReplying)}
                            className={`flex items-center gap-2 transition-colors ${isReplying ? 'text-blue-400' : 'hover:text-blue-400'}`}
                        >
                            <FiMessageCircle size={18} />
                            <span className="text-sm">{replies.length}</span>
                        </button>
                        <button
                            onClick={handleShare}
                            className={`flex items-center gap-2 transition-colors ${isShared ? 'text-green-400' : 'hover:text-green-400'}`}
                        >
                            {isShared ? <span className="text-xs font-bold">Copied!</span> : <FiShare2 size={18} />}
                        </button>
                    </div>

                    {/* Reply Input */}
                    {isReplying && (
                        <div className="mt-4 flex gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            <input
                                type="text"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500/50"
                                placeholder="返信を書き込む..."
                                onKeyDown={(e) => e.key === 'Enter' && handleReplySubmit()}
                                autoFocus
                            />
                            <button
                                onClick={handleReplySubmit}
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all"
                            >
                                返信
                            </button>
                        </div>
                    )}

                    {/* Replies List */}
                    {replies.length > 0 && (
                        <div className="mt-4 space-y-3">
                            {replies.map((reply, index) => (
                                <div key={index} className="flex gap-3 bg-white/5 rounded-xl p-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                        ME
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-200 text-sm whitespace-pre-wrap">{reply}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
