import React from 'react';
import { useTheme } from '../lib/ThemeContext';
import { cn } from '../lib/utils';
import { themes } from '../lib/themes';

export function ModernThemeSelector() {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <div className={cn("p-6 w-full rounded-[32px] mb-24 backdrop-blur-xl", currentTheme.cardClass)}>
      <h2 className={cn("text-xl font-bold mb-6 text-center", currentTheme.textClass)}>
        اختر الثيم
      </h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300",
              "border-2",
              currentTheme.id === t.id 
                ? "border-current scale-[1.02] shadow-xl bg-black/10" 
                : "border-transparent opacity-70 hover:opacity-100 bg-white/5",
              currentTheme.textClass
            )}
            style={{ 
              borderColor: currentTheme.id === t.id ? 'currentColor' : 'transparent',
            }}
          >
            <div className={cn("w-10 h-10 rounded-full mb-3 shadow-md border", t.buttonClass)} />
            <span className="text-sm font-bold text-center leading-tight">
              {t.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
