'use client';

import React from 'react';

interface MetricItem {
  label: string;
  value: string;
  subValue: string;
  status: 'OPTIMAL' | 'NORMAL' | 'WARNING';
}

interface TelemetryMetricsProps {
  metrics: MetricItem[];
}

export function TelemetryMetrics({ metrics }: TelemetryMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-black/8 p-4 shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#252724]/60 uppercase tracking-wider">
              {m.label}
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                m.status === 'OPTIMAL'
                  ? 'bg-[#5a8357]'
                  : m.status === 'NORMAL'
                  ? 'bg-[#252724]'
                  : 'bg-[#8c5e31]'
              }`}
            />
          </div>

          <div className="my-1">
            <span className="text-2xl font-black tracking-tight text-[#252724] font-mono">
              {m.value}
            </span>
          </div>

          <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px] text-[#252724]/60">
            <span>{m.subValue}</span>
            <span className="font-mono text-[10px] text-[#5a8357] font-semibold">
              {m.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
