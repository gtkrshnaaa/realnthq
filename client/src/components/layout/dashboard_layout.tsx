'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/navigation/sidebar';
import { BulletinPanel } from '@/components/bulletin/bulletin_panel';
import { MenuIcon, XMarkIcon, MegaphoneIcon } from '@/components/icons/icons';
import { UserProfile, UserPresenceStatus } from '@/types/office.types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePath: string;
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: React.ReactNode;
  currentUser?: UserProfile;
  organizationName?: string;
  onUpdateStatus?: (status: UserPresenceStatus, message?: string) => void;
}

export function DashboardLayout({
  children,
  activePath,
  title,
  subtitle,
  badge,
  actions,
  currentUser,
  organizationName,
  onUpdateStatus,
}: DashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isBulletinOpen, setIsBulletinOpen] = useState(true);
  const [isMobileBulletinOpen, setIsMobileBulletinOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#fbfbfa] text-[#252724] overflow-hidden">
      {/* Desktop Sticky Left Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <Sidebar
          activePath={activePath}
          currentUser={currentUser}
          organizationName={organizationName}
          onUpdateStatus={onUpdateStatus}
        />
      </div>

      {/* Mobile Sidebar Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl z-10">
            <div className="absolute top-3 right-3 z-20">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 rounded-lg text-[#252724]/70 hover:bg-black/5"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <Sidebar
              activePath={activePath}
              currentUser={currentUser}
              organizationName={organizationName}
              onUpdateStatus={onUpdateStatus}
              onNavigate={() => setIsMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Mobile Bulletin Drawer Overlay */}
      {isMobileBulletinOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileBulletinOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl z-10">
            <BulletinPanel onClose={() => setIsMobileBulletinOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Workspace Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Mobile Top Bar (Fixed h-16) */}
        <header className="lg:hidden h-16 px-4 bg-white border-b border-black/8 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="p-1.5 rounded-lg text-[#252724]/80 hover:bg-black/5"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <Link href="/" className="font-serif text-lg font-bold text-[#252724]">
              realnthq
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#eef2ec] text-[#5a8357]">
              {title}
            </span>
            <button
              type="button"
              onClick={() => setIsMobileBulletinOpen(true)}
              className="p-1.5 rounded-lg text-[#5a8357] hover:bg-[#eef2ec]"
              aria-label="Open company announcements"
            >
              <MegaphoneIcon className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Desktop Context Top Bar (Fixed h-16) */}
        <div className="hidden lg:flex items-center justify-between h-16 px-6 bg-white/60 border-b border-black/8 backdrop-blur-xs shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg font-bold tracking-tight text-[#252724] leading-tight">
                  {title}
                </h1>
                {badge && (
                  <span className="px-2 py-0.5 rounded-md bg-[#eef2ec] text-[#5a8357] text-[10px] font-medium border border-[#5a8357]/20">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-[11px] text-[#252724]/65 mt-0.5 truncate max-w-md">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {actions}
            <button
              type="button"
              onClick={() => setIsBulletinOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                isBulletinOpen
                  ? 'bg-[#252724] text-white border-transparent shadow-xs'
                  : 'bg-white text-[#252724] border-black/8 hover:border-black/20'
              }`}
              title="Toggle Company Bulletin Portal"
            >
              <MegaphoneIcon className="w-3.5 h-3.5" />
              <span>HQ Bulletin</span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isBulletinOpen ? 'bg-[#5a8357]' : 'bg-black/30'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Scrollable Center Panel Viewport */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-7">
          <div className="max-w-6xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Right-Hand Company Announcements Portal */}
      {isBulletinOpen && (
        <div className="hidden xl:block shrink-0 h-full">
          <BulletinPanel />
        </div>
      )}
    </div>
  );
}
