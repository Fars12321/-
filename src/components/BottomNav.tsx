import React from 'react';
import { useTheme } from '../lib/ThemeContext';
import { cn } from '../lib/utils';
import { Home, BarChart2, BookOpen, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'stats' | 'adhkar' | 'settings';
  onChange: (tab: 'home' | 'stats' | 'adhkar' | 'settings') => void;
}

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  const { theme } = useTheme();

  const tabs = [
    { id: 'settings', label: 'الإعدادات', icon: Settings },
    { id: 'adhkar', label: 'الأذكار', icon: BookOpen },
    { id: 'stats', label: 'الإحصائيات', icon: BarChart2 },
    { id: 'home', label: 'الرئيسية', icon: Home },
  ] as const;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 w-full rounded-t-[32px] px-6 py-4 flex justify-between items-center z-50",
      theme.navClass
    )}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id as any)}
            className={cn(
              "flex flex-col items-center justify-center p-2 transition-all duration-300",
              isActive ? "scale-110" : "hover:scale-105"
            )}
          >
            <tab.icon 
              className={cn(
                "w-6 h-6 mb-1 transition-colors duration-300",
                isActive ? theme.navActiveClass : theme.navInactiveClass
              )} 
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span 
              className={cn(
                "text-[10px] font-bold transition-colors duration-300",
                isActive ? theme.navActiveClass : theme.navInactiveClass
              )}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
