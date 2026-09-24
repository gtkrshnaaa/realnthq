'use client';

import React from 'react';
import { RadioIcon, MicIcon, HandRaisedIcon } from '@/components/icons/icons';

interface BroadcastStageProps {
  speakerName: string;
  speakerTitle: string;
  presentationTitle: string;
  viewerCount: number;
  isHandRaised: boolean;
  onToggleHandRaise: () => void;
}

export function BroadcastStage({
  speakerName,
  speakerTitle,
  presentationTitle,
  viewerCount,
  isHandRaised,
  onToggleHandRaise,
}: BroadcastStageProps) {
  return (
    <div className="bg-[#252724] text-white rounded-2xl p-6 shadow-xl border border-black/20 flex flex-col justify-between min-h-[380px] relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#5a8357]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Stage Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Live Broadcast</span>
          </span>
          <span className="text-xs text-white/70 font-mono">
            Amphitheater Stage 01
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-white/80 bg-white/10 px-2.5 py-1 rounded-lg">
            {viewerCount} Live Attendees
          </span>
        </div>
      </div>

      {/* Keynote Presentation Simulation */}
      <div className="my-auto py-8 text-center z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 text-[#5a8357]">
          <RadioIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-white mb-2">
          {presentationTitle}
        </h2>
        <p className="text-sm text-white/70 max-w-md mx-auto">
          Broadcast audio stream is active. Audience members are in listen-only mode.
        </p>

        {/* Active Speaker Spotlight Card */}
        <div className="inline-flex items-center gap-3 mt-6 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
          <div className="w-8 h-8 rounded-full bg-[#5a8357] flex items-center justify-center text-xs font-bold text-white">
            {speakerName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">{speakerName}</span>
              <MicIcon className="w-3.5 h-3.5 text-[#5a8357]" />
            </div>
            <span className="text-[10px] text-white/60 block">{speakerTitle}</span>
          </div>
        </div>
      </div>

      {/* Bottom Stage Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10 z-10">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <span className="w-2 h-2 rounded-full bg-[#5a8357]" />
          <span>WebRTC SFU: 1080p 60fps</span>
        </div>

        <button
          type="button"
          onClick={onToggleHandRaise}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            isHandRaised
              ? 'bg-[#8c5e31] text-white ring-2 ring-[#8c5e31]/50'
              : 'bg-white text-[#252724] hover:bg-white/90 shadow-sm'
          }`}
        >
          <HandRaisedIcon className="w-4 h-4" />
          <span>{isHandRaised ? 'Hand Raised (In Queue)' : 'Raise Hand to Speak'}</span>
        </button>
      </div>
    </div>
  );
}
