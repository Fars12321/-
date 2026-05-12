import React from 'react';
import { useTheme } from '../lib/ThemeContext';
import { cn } from '../lib/utils';
import { ModernThemeSelector } from './ThemeSelector';

interface SettingsTabProps {
  tapSoundStyle: string;
  setTapSoundStyle: (style: string) => void;
  ambientType: string;
  setAmbientType: (type: string) => void;
  hapticIntensity: 'none' | 'light' | 'medium' | 'heavy';
  setHapticIntensity: (intensity: 'none' | 'light' | 'medium' | 'heavy') => void;
}

export function SettingsTab({ 
  tapSoundStyle, setTapSoundStyle, 
  ambientType, setAmbientType,
  hapticIntensity, setHapticIntensity
}: SettingsTabProps) {
  const { theme } = useTheme();

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Sound Settings */}
      <div className={cn("p-6 rounded-[32px] border border-current/10 w-full mb-6", theme.cardClass, theme.textClass)}>
        <h2 className="text-xl font-bold mb-6 font-serif">إعدادات الصوت والاهتزاز</h2>
        
        <div className="space-y-6">
          {/* Haptic Intensity */}
          <div>
            <label className="block text-sm opacity-80 mb-3 font-bold">قوة الاهتزاز</label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'none', label: 'بدون اهتزاز' },
                { id: 'light', label: 'خفيف' },
                { id: 'medium', label: 'متوسط' },
                { id: 'heavy', label: 'قوي' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setHapticIntensity(opt.id as any)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-bold transition-all border",
                    hapticIntensity === opt.id 
                      ? "bg-white/20 border-white/50 scale-[1.02]" 
                      : "bg-white/5 border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tap Sound Style */}
          <div>
            <label className="block text-sm opacity-80 mb-3 font-bold">صوت التسبيح</label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'default', label: 'الافتراضي' },
                { id: 'wood', label: 'خشبي' },
                { id: 'click', label: 'نقر' },
                { id: 'soft', label: 'ناعم' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setTapSoundStyle(opt.id)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-bold transition-all border",
                    tapSoundStyle === opt.id 
                      ? "bg-white/20 border-white/50 scale-[1.02]" 
                      : "bg-white/5 border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ambient Sound */}
          <div>
             <label className="block text-sm opacity-80 mb-3 font-bold">صوت الخلفية (أجواء)</label>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { id: 'none', label: 'بدون' },
                  { id: 'brownNoise', label: 'ضوضاء هادئة' },
                  { id: 'nature', label: 'طبيعة' },
                  { id: 'space', label: 'فضاء' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setAmbientType(opt.id)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-bold transition-all border",
                      ambientType === opt.id 
                        ? "bg-white/20 border-white/50 scale-[1.02]" 
                        : "bg-white/5 border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>

      <ModernThemeSelector />
    </div>
  );
}
