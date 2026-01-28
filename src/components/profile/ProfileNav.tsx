"use client";
import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { LockIcon, BellDotIcon, RecycleIcon, ShieldAlert } from 'lucide-react';

const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/10 transition">
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </a>
);

export default function ProfileNav() {
  return (
    <aside className="w-full md:w-64 lg:w-72 bg-white/5 border border-white/10 rounded-xl p-4 text-white/90">
      <div className="px-2 pb-3">
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>
      <nav className="flex flex-col gap-1">
        <NavItem href="#profile" icon={CgProfile} label="Profile" />
        <NavItem href="#security" icon={LockIcon} label="Password" />
        <NavItem href="#profile" icon={BellDotIcon} label="Notifications" />
        <div className="mt-3 pt-3 border-t border-white/10" />
        <NavItem href="#danger" icon={RecycleIcon} label="Delete account" />
      </nav>
      <div className="mt-4 text-xs text-white/60 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4" />
        Manage your account details and security
      </div>
    </aside>
  );
}

