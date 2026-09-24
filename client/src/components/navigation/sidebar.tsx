'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  GridIcon,
  VideoIcon,
  DocumentTextIcon,
  UsersIcon,
  HomeIcon,
  LogOutIcon,
} from '@/components/icons/icons';
import { StatusSelector } from '@/components/presence/status_selector';
import { UserProfile, UserPresenceStatus } from '@/types/office.types';

interface SidebarProps {
  activePath?: string;
  currentUser?: UserProfile;
  organizationName?: string;
  onUpdateStatus?: (status: UserPresenceStatus, message?: string) => void;
  onNavigate?: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'b0000000-0000-0000-0000-000000000001',
  email: 'admin@squad.realnthq.local',
  fullName: 'Alex Vance',
  displayTitle: 'Head of Engineering',
  status: 'AVAILABLE',
  statusMessage: 'Reviewing PRs and architecture',
  floorId: 'floor-2',
  deskId: 'desk-1',
};

export function Sidebar({
  activePath = '/office',
  currentUser = DEFAULT_USER,
  organizationName,
  onUpdateStatus,
  onNavigate,
}: SidebarProps) {
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
    { label: 'Office Grid', href: '/office', icon: GridIcon, badge: 'L2' },
    { label: 'Meeting Rooms', href: '/rooms', icon: VideoIcon, badge: '4' },
    { label: 'Decision Logs', href: '/artifacts', icon: DocumentTextIcon },
    { label: 'Team Roster', href: '/team', icon: UsersIcon, badge: '6' },
  ];

  return (
    <aside className="w-64 md:w-72 bg-white flex flex-col h-full border-r border-black/8 select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-black/8 flex items-center shrink-0">
        <Link href="/" onClick={onNavigate} className="flex items-center gap-2.5 group min-w-0">
          <span className="font-serif text-xl font-bold tracking-tight text-[#252724] group-hover:text-[#5a8357] transition-colors shrink-0">
            realnthq
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#eef2ec] text-[#5a8357] text-[11px] font-medium truncate max-w-[130px] border border-[#5a8357]/20">
            {orgName}
          </span>
        </Link>
      </div>

      {/* Main Navigation Panel */}
      <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
        <div>
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#252724]/50">
            Workplace Panels
          </span>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const isActive = activePath === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#252724] text-white shadow-xs font-semibold'
                      : 'text-[#252724]/80 hover:bg-black/4 hover:text-[#252724]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#252724]/70'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-black/5 text-[#252724]/60'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#252724]/50">
            Platform Gateway
          </span>
          <nav className="mt-2 space-y-1">
            <Link
              href="/"
              onClick={onNavigate}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activePath === '/'
                  ? 'bg-[#252724] text-white'
                  : 'text-[#252724]/70 hover:bg-black/4 hover:text-[#252724]'
              }`}
            >
              <HomeIcon className="w-4 h-4 text-[#252724]/60" />
              <span>Welcome Portal</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* User Footer Panel */}
      <div className="p-3.5 border-t border-black/8 bg-[#fbfbfa]/70 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#252724] text-white flex items-center justify-center font-serif text-xs font-bold shrink-0">
              {currentUser.fullName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#252724] truncate">
                {currentUser.fullName}
              </p>
              <p className="text-[10px] text-[#252724]/60 truncate">
                {currentUser.displayTitle || 'Team Member'}
              </p>
            </div>
          </div>

          <Link
            href="/login"
            title="Sign Out"
            className="p-1.5 rounded-lg text-[#252724]/60 hover:text-[#252724] hover:bg-black/5 transition-colors"
          >
            <LogOutIcon className="w-4 h-4" />
          </Link>
        </div>

        {onUpdateStatus && (
          <div className="pt-1">
            <StatusSelector
              currentStatus={currentUser.status}
              statusMessage={currentUser.statusMessage}
              onUpdateStatus={onUpdateStatus}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
