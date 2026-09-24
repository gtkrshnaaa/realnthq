'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/navigation/sidebar';
import { MenuIcon, XMarkIcon } from '@/components/icons/icons';
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

      {/* Mobile Drawer Overlay */}
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

      {/* Main Workspace Panel */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-black/8 shrink-0">
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
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#eef2ec] text-[#5a8357]">
            {title}
          </span>
        </header>

        {/* Desktop Context Top Bar */}
        <div className="hidden lg:flex items-center justify-between px-6 py-4 bg-white/60 border-b border-black/8 backdrop-blur-xs shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl font-bold tracking-tight text-[#252724]">
                  {title}
                </h1>
                {badge && (
                  <span className="px-2 py-0.5 rounded-md bg-[#eef2ec] text-[#5a8357] text-[11px] font-medium border border-[#5a8357]/20">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-[#252724]/65 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {actions && <div className="flex items-center gap-2.5">{actions}</div>}
        </div>

        {/* Scrollable Panel Viewport */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
