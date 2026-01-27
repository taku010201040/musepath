'use client';

import { useState } from 'react';
import { FiImage, FiHash, FiX } from 'react-icons/fi';

interface PostComposerProps {
    onPost?: (content: string, tags: string[]) => void;
}

export default function PostComposer({ onPost }: PostComposerProps) {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [showTagSuggestions, setShowTagSuggestions] = useState(false);

    const maxLength = 500;
    const suggestedTags = ['研究', '悩み', '趣味', '授業', 'アイデア', 'キャリア'];

    const handlePost = () => {
        if (content.trim()) {
            if (onPost) {
                onPost(content, tags);
            }
            console.log('Posting:', { content, tags });
            setContent('');
            setTags([]);
        }
    };

    const addTag = (tag: string) => {
        if (!tags.includes(tag) && tags.length < 5) {
            setTags([...tags, tag]);
            setTagInput('');
            setShowTagSuggestions(false);
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="glass-dark rounded-2xl p-6">
            <div className="flex gap-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold">
                        山
                    </div>
                </div>

                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="今何を考えていますか？"
                        className="w-full bg-transparent text-white placeholder-gray-500 resize-none outline-none text-lg mb-3"
                        rows={3}
                        maxLength={maxLength}
                    />

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm"
                                >
                                    #{tag}
                                    <button
                                        onClick={() => removeTag(tag)}
                                        className="hover:text-white transition-colors"
                                    >
                                        <FiX size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Tag Input */}
                    <div className="relative mb-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => {
                                    setTagInput(e.target.value);
                                    setShowTagSuggestions(e.target.value.length > 0);
                                }}
                                onFocus={() => setShowTagSuggestions(tagInput.length > 0)}
                                placeholder="タグを追加..."
                                className="flex-1 bg-white/5 text-white placeholder-gray-500 px-4 py-2 rounded-full outline-none text-sm"
                            />
                        </div>

                        {/* Tag Suggestions */}
                        {showTagSuggestions && (
                            <div className="absolute top-full mt-2 left-0 right-0 glass rounded-xl p-2 z-10">
                                <div className="text-xs text-gray-400 mb-2 px-2">おすすめタグ</div>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedTags
                                        .filter(tag => tag.includes(tagInput) && !tags.includes(tag))
                                        .map((tag) => (
                                            <button
                                                key={tag}
                                                onClick={() => addTag(tag)}
                                                className="px-3 py-1 bg-white/5 hover:bg-white/10 text-gray-300 rounded-full text-sm transition-colors"
                                            >
                                                #{tag}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-purple-400">
                                <FiImage size={20} />
                            </button>
                            <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-purple-400">
                                <FiHash size={20} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className={`text-sm ${content.length > maxLength * 0.9 ? 'text-red-400' : 'text-gray-500'}`}>
                                {content.length} / {maxLength}
                            </span>
                            <button
                                onClick={handlePost}
                                disabled={!content.trim()}
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                            >
                                投稿
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
