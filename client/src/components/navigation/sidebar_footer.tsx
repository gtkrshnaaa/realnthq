'use client';

import React from 'react';
import Link from 'next/link';
import { LogOutIcon } from '@/components/icons/icons';
import { StatusSelector } from '@/components/presence/status_selector';
import { UserProfile, UserPresenceStatus } from '@/types/office.types';

interface SidebarFooterProps {
  currentUser: UserProfile;
  organizationName: string;
  onUpdateStatus?: (status: UserPresenceStatus, message?: string) => void;
}

export function SidebarFooter({
  currentUser,
  organizationName,
  onUpdateStatus,
}: SidebarFooterProps) {
  return (
    <div className="p-3.5 border-t border-black/8 bg-[#fbfbfa]/70 space-y-3 shrink-0">
      {/* Workspace Organization Context */}
      <div className="px-3 py-2 rounded-xl bg-white border border-black/8">
        <span className="block text-[9px] font-bold uppercase tracking-wider text-[#252724]/50">
          Workspace Organization
        </span>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-xs font-bold text-[#252724] truncate">
            {organizationName}
          </p>
          <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#eef2ec] text-[#5a8357] border border-[#5a8357]/20">
            HQ
          </span>
        </div>
      </div>

      {/* Current User Session */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#252724] text-white flex items-center justify-center text-xs font-bold shrink-0">
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
  );
}
