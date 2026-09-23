import React from 'react';
import { FloorInfo } from '@/types/office.types';
import { BuildingIcon } from '@/components/icons/icons';

interface FloorSelectorProps {
  floors: FloorInfo[];
  activeFloorId: string;
  onSelectFloor: (floorId: string) => void;
}

export function FloorSelector({ floors, activeFloorId, onSelectFloor }: FloorSelectorProps) {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-[#fbfbfa] rounded-2xl border border-black/8 shadow-sm">
      <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#252724]/70 uppercase tracking-wider">
        <BuildingIcon className="w-4 h-4 text-[#252724]" />
        <span>Floors</span>
      </div>

      <div className="flex items-center gap-1.5">
        {floors.map((floor) => {
          const isActive = floor.id === activeFloorId;
          return (
            <button
              key={floor.id}
              onClick={() => onSelectFloor(floor.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#252724] text-white shadow-sm'
                  : 'bg-transparent text-[#252724]/80 hover:bg-black/5 hover:text-[#252724]'
              }`}
            >
              <span>{`L${floor.floorNumber}: ${floor.name}`}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#eef2ec] text-[#5a8357]'
                }`}
              >
                {floor.activeOccupantsCount}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
