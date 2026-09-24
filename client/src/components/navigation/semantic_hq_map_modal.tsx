'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@/components/icons/icons';
import { DepartmentCluster, SectorSummary } from '@/types/semantic_map.types';
import { INITIAL_SECTORS, DEPARTMENT_OPTIONS } from './semantic_map_data';

interface SemanticHqMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SemanticHqMapModal({ isOpen, onClose }: SemanticHqMapModalProps) {
  const router = useRouter();
  const [selectedDept, setSelectedDept] = useState<DepartmentCluster>('ALL');

  if (!isOpen) return null;

  const totalHeadcount = INITIAL_SECTORS.reduce((acc, s) => acc + s.activeCount, 0);

  const handleTeleport = (route: string) => {
    onClose();
    router.push(route);
  };

  const filteredSectors = INITIAL_SECTORS.map((sector) => {
    if (selectedDept === 'ALL') return sector;
    const filteredOccupants = sector.occupants.filter((occ) => occ.department === selectedDept);
    return {
      ...sector,
      occupants: filteredOccupants,
      activeCount: filteredOccupants.length,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#fbfbfa] rounded-2xl border border-black/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-black/8 bg-white/70 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-bold tracking-tight text-[#252724]">
                Semantic Functional HQ Map
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-[#eef2ec] text-[#5a8357] text-[11px] font-mono font-medium">
                {totalHeadcount} Members Active
              </span>
            </div>
            <p className="text-xs text-[#252724]/65 mt-0.5">
              Live operational radar tracking team presence and activities across web application routes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#252724]/60 hover:bg-black/5 hover:text-[#252724]"
            aria-label="Close semantic map"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Department Filter Bar */}
        <div className="px-6 py-2.5 bg-white/40 border-b border-black/5 flex items-center gap-1.5 overflow-x-auto shrink-0">
          <span className="text-[11px] font-semibold text-[#252724]/60 mr-1 shrink-0">
            Filter Cluster:
          </span>
          {DEPARTMENT_OPTIONS.map((dept) => {
            const isSelected = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#252724] text-white shadow-2xs'
                    : 'bg-white text-[#252724]/75 border border-black/8 hover:border-black/20'
                }`}
              >
                {dept.label}
              </button>
            );
          })}
        </div>

        {/* Functional Sector Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
          {filteredSectors.map((sector: SectorSummary) => (
            <div
              key={sector.id}
              className="bg-white rounded-xl border border-black/8 p-4 shadow-2xs flex flex-col justify-between hover:border-black/20 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/5 text-[#252724]/70">
                    {sector.route}
                  </span>
                  <span className="text-[10px] font-medium text-[#5a8357] bg-[#eef2ec] px-2 py-0.5 rounded-full">
                    {sector.tierName.split(':')[0]}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-sm font-bold text-[#252724] group-hover:text-[#5a8357] transition-colors">
                    {sector.label}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-[#252724]">
                    {sector.activeCount} live
                  </span>
                </div>

                <p className="text-[11px] text-[#252724]/65 line-clamp-2 mb-3">
                  {sector.description}
                </p>

                {/* Sub Context Highlights */}
                <div className="space-y-1 mb-3 pt-2 border-t border-black/5">
                  {sector.subContexts.slice(0, 3).map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between text-[11px] text-[#252724]/80">
                      <span className="truncate">{sub.name}</span>
                      <span className="font-mono text-[10px] text-[#252724]/50">{sub.activeCount}</span>
                    </div>
                  ))}
                </div>

                {/* Occupants Avatars */}
                {sector.occupants.length > 0 && (
                  <div className="mb-3 pt-2 border-t border-black/5 flex flex-wrap gap-1">
                    {sector.occupants.map((occ) => (
                      <span
                        key={occ.user.id}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#fbfbfa] border border-black/8 text-[10px] text-[#252724]"
                        title={`${occ.user.fullName} (${occ.location.activityLabel})`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            occ.user.status === 'AVAILABLE'
                              ? 'bg-[#5a8357]'
                              : occ.user.status === 'DEEP_WORK'
                              ? 'bg-[#8c5e31]'
                              : 'bg-indigo-600'
                          }`}
                        />
                        <span className="truncate max-w-[80px]">{occ.user.fullName.split(' ')[0]}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleTeleport(sector.route)}
                className="w-full mt-2 py-1.5 px-3 rounded-lg bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shadow-2xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Teleport to Sector</span>
                <span className="text-[10px] opacity-70">&rarr;</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer Operational Layer Legend */}
        <div className="px-6 py-3 bg-white/80 border-t border-black/8 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#252724]/70 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#252724]">Vertical Tiers:</span>
            <span>T1: Solo Flow</span>
            <span>T2: Micro-Knock</span>
            <span>T3: Squad Huddles</span>
            <span>T4: Macro Broadcast</span>
            <span>T5: Governance</span>
          </div>
          <span className="font-mono text-[10px] text-[#252724]/50">
            Address Scheme: REALNT://{'{route}'}@{'{tier}'}
          </span>
        </div>
      </div>
    </div>
  );
}
