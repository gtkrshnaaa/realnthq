'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BuildingIcon } from '@/components/icons/icons';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@acme.org');
  const [password, setPassword] = useState('••••••••••••');
  const [authMethod, setAuthMethod] = useState<'SSO' | 'PASSWORD'>('PASSWORD');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#fbfbfa]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-black/8 p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#252724] text-white flex items-center justify-center mb-3 shadow-xs">
            <BuildingIcon className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#252724]">
            realnthq
          </h1>
          <p className="text-xs text-[#252724]/70 mt-1">
            Acme Global Digital Campus Workplace Authentication
          </p>
        </div>

        <div className="flex rounded-xl bg-[#fbfbfa] p-1 border border-black/8 mb-6 text-xs font-medium">
          <button
            type="button"
            onClick={() => setAuthMethod('PASSWORD')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              authMethod === 'PASSWORD'
                ? 'bg-[#252724] text-white shadow-xs'
                : 'text-[#252724]/70 hover:text-[#252724]'
            }`}
          >
            Direct Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('SSO')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              authMethod === 'SSO'
                ? 'bg-[#252724] text-white shadow-xs'
                : 'text-[#252724]/70 hover:text-[#252724]'
            }`}
          >
            Enterprise SSO
          </button>
        </div>

        {authMethod === 'PASSWORD' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#252724]/80 mb-1">
                Work Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-black/10 text-xs text-[#252724] focus:outline-none focus:border-[#5a8357] transition-all bg-[#fbfbfa]"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-[#252724]/80">
                  Password
                </label>
                <span className="text-[11px] text-[#5a8357] hover:underline cursor-pointer">
                  Forgot?
                </span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-black/10 text-xs text-[#252724] focus:outline-none focus:border-[#5a8357] transition-all bg-[#fbfbfa]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#252724] hover:bg-[#3b3e39] text-white text-xs font-semibold shadow-sm transition-all"
            >
              Sign In to Virtual Office
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-black/10 hover:border-black/25 bg-white text-xs font-medium text-[#252724] transition-all flex items-center justify-center gap-2"
            >
              <span>Continue with Okta / SAML SSO</span>
            </button>
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-black/10 hover:border-black/25 bg-white text-xs font-medium text-[#252724] transition-all flex items-center justify-center gap-2"
            >
              <span>Continue with Google Workspace</span>
            </button>
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-black/10 hover:border-black/25 bg-white text-xs font-medium text-[#252724] transition-all flex items-center justify-center gap-2"
            >
              <span>Continue with GitHub Organization</span>
            </button>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-black/8 text-center">
          <p className="text-[11px] text-[#252724]/60">
            Protected by Anti-Panopticon Privacy Standards. Zero keystroke loggers.
          </p>
          <div className="mt-3">
            <Link
              href="/"
              className="text-xs text-[#5a8357] hover:underline font-medium"
            >
              Return to Campus Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
