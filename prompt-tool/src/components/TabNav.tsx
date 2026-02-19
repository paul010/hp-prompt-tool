'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Plus, Bell, MessageCircle } from 'lucide-react';

export function TabNav() {
  const pathname = usePathname();

  const tabs = [
    { icon: Home, label: 'Home', href: '/', active: pathname === '/' },
    { icon: Search, label: 'Search', href: '/?search=', active: pathname === '/?search=' },
    { icon: Plus, label: 'Create', href: '#', active: false },
    { icon: Bell, label: 'Notify', href: '#', active: false },
    { icon: MessageCircle, label: 'Messages', href: '#', active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-academy-black z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`flex flex-col items-center justify-center w-16 h-16 transition-all duration-200 ${
                  tab.active
                    ? 'text-academy-pink scale-110'
                    : 'text-academy-black hover:text-academy-pink'
                }`}
                style={{
                  opacity: tab.active ? 1 : 0.7,
                }}
              >
                <Icon className="w-6 h-6 mb-1 font-black" />
                <span className="text-xs font-bold">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
