'use client';

import React, { useState } from 'react';
import { ChatBubbleIcon } from '@/components/icons/extended_icons';

export interface QaQuestion {
  id: string;
  authorName: string;
  authorTitle: string;
  content: string;
  upvotes: number;
  timestamp: string;
}

interface BroadcastQaProps {
  questions: QaQuestion[];
  onSubmitQuestion: (text: string) => void;
  onUpvoteQuestion: (id: string) => void;
}

export function BroadcastQa({ questions, onSubmitQuestion, onUpvoteQuestion }: BroadcastQaProps) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSubmitQuestion(inputText.trim());
    setInputText('');
  };

  return (
    <div className="bg-[#fbfbfa] rounded-2xl border border-black/8 p-5 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-black/8 mb-3">
        <div className="flex items-center gap-2">
          <ChatBubbleIcon className="w-4 h-4 text-[#5a8357]" />
          <h3 className="text-sm font-bold text-[#252724]">Audience Q&A</h3>
        </div>
        <span className="text-[11px] font-mono text-[#252724]/60">
          {questions.length} Questions
        </span>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a question for the stage speakers..."
            className="flex-1 px-3 py-2 rounded-xl bg-white border border-black/10 text-xs text-[#252724] focus:outline-hidden focus:border-[#668c63]"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shadow-2xs"
          >
            Post
          </button>
        </div>
      </form>

      {/* Question List */}
      <div className="space-y-2.5 overflow-y-auto flex-1 max-h-[340px] pr-1">
        {questions.map((q) => (
          <div
            key={q.id}
            className="p-3 rounded-xl bg-white border border-black/6 shadow-2xs flex items-start justify-between gap-3"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#252724]">{q.authorName}</span>
                <span className="text-[10px] text-[#252724]/50">{q.authorTitle}</span>
                <span className="text-[10px] text-[#252724]/40 font-mono">{q.timestamp}</span>
              </div>
              <p className="text-xs text-[#252724]/80">{q.content}</p>
            </div>

            <button
              type="button"
              onClick={() => onUpvoteQuestion(q.id)}
              className="flex flex-col items-center px-2 py-1 rounded-lg bg-[#fbfbfa] border border-black/8 hover:border-black/20 text-[#252724] transition-all"
            >
              <span className="text-[10px]">&uarr;</span>
              <span className="text-[10px] font-mono font-bold">{q.upvotes}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
