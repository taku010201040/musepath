'use client';

import { useState, useEffect } from 'react';
import PostCard, { Post } from './PostCard';

// TimelineFeed component receives posts via props now

interface TimelineFeedProps {
    posts: Post[];
    loading?: boolean;
}

export default function TimelineFeed({ posts, loading = false }: TimelineFeedProps) {
    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-dark rounded-2xl p-6 animate-pulse">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-white/10 rounded w-1/4 mb-3"></div>
                                <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}

            {posts.length === 0 && (
                <div className="glass-dark rounded-2xl p-12 text-center">
                    <p className="text-gray-400 text-lg mb-2">まだ投稿がありません</p>
                    <p className="text-gray-500">最初の投稿をしてみましょう！</p>
                </div>
            )}
        </div>
    );
}
