'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/navigation/header';
import { BuildingIcon, UsersIcon, RadioIcon, VideoIcon } from '@/components/icons/icons';

interface OrgInfo {
  name: string;
  slug: string;
  domain: string;
  campusName: string;
  activeFloorsCount: number;
  activeDesksCount: number;
  activeMembersCount: number;
}

export default function WelcomeLandingPage() {
  const [org, setOrg] = useState<OrgInfo>({
    name: 'RealntHQ Dev Squad',
    slug: 'realnthq-dev-squad',
    domain: 'squad.realnthq.local',
    campusName: 'RealntHQ Digital Campus',
    activeFloorsCount: 3,
    activeDesksCount: 5,
    activeMembersCount: 3,
  });

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    fetch(`${apiUrl}/organization`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.name) {
          setOrg(data);
        }
      })
      .catch(() => {
        // Retains dynamic seeded fallback state
      });
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <Header activePath="/" />

      <section className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/8 p-8 md:p-12 shadow-sm text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef2ec] border border-[#5a8357]/20 text-[#5a8357] text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-[#5a8357] animate-pulse" />
          <span>Self-Hosted Instance - {org.name}</span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#252724] max-w-3xl mx-auto leading-tight">
          Welcome to {org.name} Digital Headquarters
        </h1>

        <p className="text-sm md:text-base text-[#252724]/70 max-w-2xl mx-auto mt-4 leading-relaxed">
          Your private, self-hosted virtual office powered by <span className="font-semibold text-[#252724]">Realnt HQ</span>.
          Experience fluid spatial awareness, spontaneous soft knocks, and persistent decision records without invasive surveillance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <Link
            href="/campus"
            className="px-6 py-3 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs md:text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
          >
            <BuildingIcon className="w-4 h-4" />
            <span>Enter Digital Campus</span>
          </Link>

          <Link
            href="/rooms"
            className="px-6 py-3 rounded-xl bg-white border border-black/10 hover:border-black/25 text-[#252724] text-xs md:text-sm font-medium transition-all flex items-center gap-2 shadow-xs"
          >
            <VideoIcon className="w-4 h-4 text-[#5a8357]" />
            <span>Join Meeting Rooms</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-black/8 max-w-3xl mx-auto">
          <div className="p-3 bg-[#fbfbfa] rounded-xl border border-black/5">
            <span className="block font-serif text-xl font-bold text-[#252724]">{org.campusName}</span>
            <span className="text-[11px] text-[#252724]/60">Primary Campus</span>
          </div>
          <div className="p-3 bg-[#fbfbfa] rounded-xl border border-black/5">
            <span className="block font-serif text-xl font-bold text-[#252724]">{org.activeFloorsCount} Floors</span>
            <span className="text-[11px] text-[#252724]/60">Active Office Levels</span>
          </div>
          <div className="p-3 bg-[#fbfbfa] rounded-xl border border-black/5">
            <span className="block font-serif text-xl font-bold text-[#252724]">{org.activeDesksCount} Desks</span>
            <span className="text-[11px] text-[#252724]/60">Hot & Dedicated Desks</span>
          </div>
          <div className="p-3 bg-[#fbfbfa] rounded-xl border border-black/5">
            <span className="block font-serif text-xl font-bold text-[#252724]">{org.activeMembersCount} Members</span>
            <span className="text-[11px] text-[#252724]/60">Seeded Team Roster</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/80 border border-black/8 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#eef2ec] text-[#5a8357] flex items-center justify-center mb-4">
            <RadioIcon className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#252724]">Ambient Spatial Presence</h3>
          <p className="text-xs text-[#252724]/70 mt-2 leading-relaxed">
            Peripheral awareness of colleagues across departments. Output-oriented availability without keystroke logging or webcam surveillance.
          </p>
          <Link href="/campus" className="inline-block mt-4 text-xs font-semibold text-[#5a8357] hover:underline">
            Explore Campus Floors
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white/80 border border-black/8 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#eef2ec] text-[#5a8357] flex items-center justify-center mb-4">
            <VideoIcon className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#252724]">Organic Soft Knocks</h3>
          <p className="text-xs text-[#252724]/70 mt-2 leading-relaxed">
            Instant ad-hoc collaboration without scheduled calendar friction. Gentle audio chime cues with full opt-in recipient control.
          </p>
          <Link href="/rooms" className="inline-block mt-4 text-xs font-semibold text-[#5a8357] hover:underline">
            View Huddle Hubs
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white/80 border border-black/8 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#eef2ec] text-[#5a8357] flex items-center justify-center mb-4">
            <UsersIcon className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#252724]">Async Decision Registers</h3>
          <p className="text-xs text-[#252724]/70 mt-2 leading-relaxed">
            Every huddle leaves persistent markdown summaries and action items. Absent and time-zone-shifted members stay synchronized.
          </p>
          <Link href="/artifacts" className="inline-block mt-4 text-xs font-semibold text-[#5a8357] hover:underline">
            Browse Decision Logs
          </Link>
        </div>
      </section>
    </main>
  );
}
