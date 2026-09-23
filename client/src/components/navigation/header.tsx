import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StatusSelector } from '@/components/presence/status_selector';
import { UserProfile, UserPresenceStatus } from '@/types/office.types';

interface HeaderProps {
  currentUser?: UserProfile;
  activePath?: string;
  organizationName?: string;
  onUpdateStatus?: (status: UserPresenceStatus, message?: string) => void;
}

export function Header({
  currentUser = {
    id: 'b0000000-0000-0000-0000-000000000001',
    email: 'admin@squad.realnthq.local',
    fullName: 'Alex Vance',
    displayTitle: 'Head of Engineering',
    status: 'AVAILABLE',
    statusMessage: 'Reviewing PRs and architecture',
    floorId: 'floor-2',
    deskId: 'desk-1',
  },
  activePath = '/',
  organizationName,
  onUpdateStatus,
}: HeaderProps) {
  const [orgName, setOrgName] = useState(organizationName || 'RealntHQ Dev Squad');

  useEffect(() => {
    if (!organizationName) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      fetch(`${apiUrl}/organization`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.name) {
            setOrgName(data.name);
          }
        })
        .catch(() => {});
    }
  }, [organizationName]);

  const navItems = [
    { label: 'Overview', href: '/' },
    { label: 'Campus Grid', href: '/campus' },
    { label: 'Meeting Rooms', href: '/rooms' },
    { label: 'Decision Logs', href: '/artifacts' },
    { label: 'Team Roster', href: '/team' },
  ];

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-black/8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#252724] hover:opacity-90">
              realnthq
            </Link>
            <span className="px-2 py-0.5 rounded-md bg-[#eef2ec] text-[#5a8357] text-[11px] font-mono">
              {orgName}
            </span>
          </div>
          <p className="text-xs text-[#252724]/70 mt-0.5">
            Self-Hosted Virtual Office for Distributed Organizations
          </p>
        </div>

        <nav className="flex items-center gap-1 p-1 bg-white/70 rounded-xl border border-black/8 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = activePath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#252724] text-white shadow-xs'
                    : 'text-[#252724]/70 hover:text-[#252724] hover:bg-black/5'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {onUpdateStatus && (
          <StatusSelector
            currentStatus={currentUser.status}
            statusMessage={currentUser.statusMessage}
            onUpdateStatus={onUpdateStatus}
          />
        )}
        <Link
          href="/login"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-black/8 shadow-xs hover:border-black/20 transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-[#252724] text-white flex items-center justify-center text-xs font-semibold">
            {currentUser.fullName.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-[#252724]">
            {currentUser.fullName}
          </span>
        </Link>
      </div>
    </header>
  );
}
