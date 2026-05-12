/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './lib/ThemeContext';
import { RingMisbaha } from './components/RingMisbaha';
import { SettingsTab } from './components/SettingsTab';
import { BottomNav } from './components/BottomNav';
import { cn } from './lib/utils';
import { Menu, Crown, Moon, Sun, Volume2, VolumeX, RotateCcw, Share2, Plus, Minus, Trophy, Sparkles, CheckCircle, X, Trash2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { adhkarList } from './lib/adhkar';
import { soundManager } from './lib/sound';

function MisbahaApp() {
  const { theme } = useTheme();
  
  const [count, setCount] = useState(() => {
    return parseInt(localStorage.getItem('misbaha-current') || '0', 10);
  });
  
  const [totalCount, setTotalCount] = useState(() => {
    return parseInt(localStorage.getItem('misbaha-total') || '0', 10);
  });

  const [dailyTarget, setDailyTarget] = useState(() => {
    return parseInt(localStorage.getItem('misbaha-daily-target') || '100', 10);
  });

  const [dailyCount, setDailyCount] = useState(() => {
    return parseInt(localStorage.getItem('misbaha-daily-count') || '0', 10);
  });

  const [lastActiveDate, setLastActiveDate] = useState(() => {
    return localStorage.getItem('misbaha-last-date') || new Date().toDateString();
  });

  const [activeTab, setActiveTab] = useState<'home' | 'stats' | 'adhkar' | 'settings'>('home');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [tapSoundStyle, setTapSoundStyle] = useState(() => {
    return localStorage.getItem('misbaha-tap-sound') || 'default';
  });
  const [ambientType, setAmbientType] = useState(() => {
    return localStorage.getItem('misbaha-ambient') || 'none';
  });
  const [hapticIntensity, setHapticIntensity] = useState<'none' | 'light' | 'medium' | 'heavy'>(() => {
    return (localStorage.getItem('misbaha-haptic') as any) || 'medium';
  });

  const [currentThikr, setCurrentThikr] = useState(() => {
    return localStorage.getItem('misbaha-current-thikr') || 'سبحان الله';
  });

  const [sfxVolume, setSfxVolume] = useState(() => {
    const saved = localStorage.getItem('misbaha-sfx-vol');
    return saved !== null ? parseFloat(saved) : 1.0;
  });

  const [ambientVolume, setAmbientVolume] = useState(() => {
    const saved = localStorage.getItem('misbaha-ambient-vol');
    return saved !== null ? parseFloat(saved) : 1.0;
  });

  const [thikrStats, setThikrStats] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem('misbaha-thikr-stats') || '{}');
    } catch {
      return {};
    }
  });

  const [showMenu, setShowMenu] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // Apply volumes to sound manager
  useEffect(() => {
    soundManager.sfxVolume = sfxVolume;
    localStorage.setItem('misbaha-sfx-vol', sfxVolume.toString());
  }, [sfxVolume]);

  useEffect(() => {
    soundManager.ambientVolume = ambientVolume;
    localStorage.setItem('misbaha-ambient-vol', ambientVolume.toString());
  }, [ambientVolume]);

  // Reset daily count if it's a new day
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastActiveDate !== today) {
      setDailyCount(0);
      setLastActiveDate(today);
      localStorage.setItem('misbaha-last-date', today);
    }
  }, [lastActiveDate]);

  useEffect(() => {
    localStorage.setItem('misbaha-current', count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem('misbaha-total', totalCount.toString());
  }, [totalCount]);

  useEffect(() => {
    localStorage.setItem('misbaha-daily-target', dailyTarget.toString());
  }, [dailyTarget]);

  useEffect(() => {
    localStorage.setItem('misbaha-daily-count', dailyCount.toString());
  }, [dailyCount]);

  useEffect(() => {
    localStorage.setItem('misbaha-current-thikr', currentThikr);
  }, [currentThikr]);

  useEffect(() => {
    localStorage.setItem('misbaha-tap-sound', tapSoundStyle);
  }, [tapSoundStyle]);

  useEffect(() => {
    localStorage.setItem('misbaha-ambient', ambientType);
    if (soundEnabled) {
       soundManager.startAmbient(ambientType);
    } else {
       soundManager.stopAmbient();
    }
  }, [ambientType, soundEnabled]);

  useEffect(() => {
    localStorage.setItem('misbaha-haptic', hapticIntensity);
  }, [hapticIntensity]);

  useEffect(() => {
    localStorage.setItem('misbaha-thikr-stats', JSON.stringify(thikrStats));
  }, [thikrStats]);

  const handleTap = () => {
    // Attempt init in case it's first tap
    soundManager.init();

    if (soundEnabled) soundManager.playTapSound(tapSoundStyle);
    
    // Check milestones
    const isMilestone = (count + 1) > 0 && (count + 1) % 33 === 0 && (count + 1) !== dailyTarget;
    const isGoal = (dailyCount + 1) === dailyTarget;

    // Vibrate
    if (navigator.vibrate && hapticIntensity !== 'none') {
      let tapPattern = hapticIntensity === 'light' ? 15 : hapticIntensity === 'heavy' ? 45 : 30;

      if (isGoal) {
        let pattern = [100, 50, 100, 50, 200];
        if (hapticIntensity === 'light') pattern = [50, 30, 50, 30, 100];
        if (hapticIntensity === 'heavy') pattern = [150, 50, 150, 50, 300];
        navigator.vibrate(pattern);
        if (soundEnabled) soundManager.playGoalReachedSound();
      } else if (isMilestone) {
        let pattern = [50, 50, 50];
        if (hapticIntensity === 'light') pattern = [30, 30, 30];
        if (hapticIntensity === 'heavy') pattern = [80, 50, 80];
        navigator.vibrate(pattern);
        if (soundEnabled) soundManager.playMilestoneSound();
      } else {
        navigator.vibrate(tapPattern);
      }
    } else {
      // Fallback for sound if no vibration
      if (isGoal && soundEnabled) soundManager.playGoalReachedSound();
      else if (isMilestone && soundEnabled) soundManager.playMilestoneSound();
    }

    setCount(prev => prev + 1);
    setTotalCount(prev => prev + 1);
    setDailyCount(prev => prev + 1);
    setThikrStats(prev => ({
      ...prev,
      [currentThikr]: (prev[currentThikr] || 0) + 1
    }));
  };

  const handleReset = () => {
    setCount(0);
    if (navigator.vibrate) navigator.vibrate([30, 30, 30]);
    if (soundEnabled) soundManager.playSessionCompletedSound();
  };

  const handleShare = async () => {
    const text = `لقد أتممت ${dailyCount} تسبيحة اليوم، وإجمالي تسبيحاتي ${totalCount}. هل يمكنك التفوق علي؟`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'المسبحة الذكية',
          text: text,
        });
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('تم نسخ النص إلى الحافظة!');
    }
  };

  const progressPercentage = Math.min((dailyCount / dailyTarget) * 100, 100);
  const isGoalReached = dailyCount >= dailyTarget;

  return (
    <div className={cn(
      "min-h-[100dvh] w-full flex flex-col font-sans transition-colors duration-700 relative overflow-hidden",
      theme.bgClass
    )} dir="rtl">
      
      {/* Top Navigation Bar */}
      <div className="w-full flex justify-between items-center p-6 z-10 relative">
        <button onClick={() => {
           if (theme.id === 'minimal-white') setTheme('neon-future');
           else setTheme('minimal-white');
        }} className={cn("p-2 rounded-full", theme.textClass)}>
          {theme.id === 'minimal-white' ? (
            <Moon className="w-6 h-6" />
          ) : (
            <Sun className="w-6 h-6" />
          )}
        </button>
        
        <h1 className={cn("text-xl max-w-[60%] truncate pt-2 font-bold font-serif tracking-wide text-center", theme.textClass)}>
          {currentThikr}
        </h1>
        
        <button onClick={() => setShowMenu(true)} className={cn("p-2 rounded-full", theme.textClass)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Side Menu Drawer */}
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex rtl bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMenu(false)}
          >
            <motion.div
               initial={{ x: '100%' }} 
               animate={{ x: 0 }} 
               exit={{ x: '100%' }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className={cn("w-3/4 sm:w-1/2 max-w-sm h-full p-6 shadow-2xl flex flex-col items-start gap-4", theme.bgClass, theme.textClass)}
               onClick={e => e.stopPropagation()}
            >
               <div className="flex justify-between w-full items-center mb-8">
                 <h2 className="text-xl font-bold font-serif">القائمة</h2>
                 <button onClick={() => setShowMenu(false)} className="p-2 opacity-70 hover:opacity-100"><X className="w-6 h-6"/></button>
               </div>
               
               {!confirmReset ? (
                 <button onClick={() => setConfirmReset(true)} className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 w-full text-right text-red-500 transition-colors">
                   <Trash2 className="w-5 h-5"/>
                   <span className="font-bold">تصفير الإجمالي والسجلات</span>
                 </button>
               ) : (
                 <div className="flex flex-col gap-3 p-4 rounded-xl bg-red-500/10 w-full border border-red-500/20">
                   <span className="font-bold text-red-500 text-right text-sm">هل أنت متأكد؟</span>
                   <div className="flex gap-2 w-full">
                     <button onClick={() => {
                       setTotalCount(0);
                       setThikrStats({});
                       setConfirmReset(false);
                       setShowMenu(false);
                     }} className="flex-1 p-2 rounded-lg bg-red-500 text-white font-bold text-sm">
                       نعم، متأكد
                     </button>
                     <button onClick={() => setConfirmReset(false)} className="flex-1 p-2 rounded-lg bg-red-500/20 text-red-500 font-bold text-sm">
                       إلغاء
                     </button>
                   </div>
                 </div>
               )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col items-center pt-2 overflow-y-auto pb-32 z-10 relative px-4">
        
        {activeTab === 'home' && (
          <div className="w-full flex flex-col items-center flex-1 justify-center">
            
            <div className="flex items-center justify-between w-full max-w-xs px-8 mb-4">
               <button onClick={() => setSoundEnabled(!soundEnabled)} className={cn("p-3 rounded-full opacity-70 hover:opacity-100 transition-all border", theme.textClass, "border-current/20")}>
                 {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
               </button>
               <button onClick={handleReset} className={cn("p-3 rounded-full opacity-70 hover:opacity-100 transition-all border", theme.textClass, "border-current/20")}>
                 <RotateCcw className="w-5 h-5" />
               </button>
               <button onClick={handleShare} className={cn("p-3 rounded-full opacity-70 hover:opacity-100 transition-all border", theme.textClass, "border-current/20")}>
                 <Share2 className="w-5 h-5" />
               </button>
            </div>

            <RingMisbaha count={count} max={dailyTarget} />
            
            <div className="mt-20 w-full flex justify-center">
              <button
                onClick={handleTap}
                className={cn(
                  "relative w-40 h-16 rounded-full text-2xl font-bold tracking-wide transition-all",
                  "active:scale-95 flex items-center justify-center font-sans overflow-hidden group shadow-lg",
                  theme.buttonClass
                )}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
                <span className="relative z-10">تسبيح</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="w-full flex-1 flex flex-col pt-8">
            <SettingsTab 
              tapSoundStyle={tapSoundStyle}
              setTapSoundStyle={setTapSoundStyle}
              ambientType={ambientType}
              setAmbientType={setAmbientType}
              hapticIntensity={hapticIntensity}
              setHapticIntensity={setHapticIntensity}
              sfxVolume={sfxVolume}
              setSfxVolume={setSfxVolume}
              ambientVolume={ambientVolume}
              setAmbientVolume={setAmbientVolume}
            />
          </div>
        )}

        {activeTab === 'stats' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("w-full p-8 rounded-[32px] text-center mt-6 relative overflow-hidden", theme.cardClass, theme.textClass)}
          >
            {isGoalReached && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                className={cn("absolute inset-0 pointer-events-none", theme.accentClass.replace('text-', 'bg-'))}
              />
            )}
            
            <h2 className="text-2xl font-bold mb-6">الإحصائيات والأهداف</h2>
            
            <div className="flex flex-col gap-6 relative z-10">
              {/* Daily Goal */}
              <div className={cn(
                "p-6 rounded-2xl border transition-all duration-500",
                isGoalReached ? "bg-white/10 border-white/30" : "bg-white/5 border-current/10"
              )}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {isGoalReached && <Trophy className={cn("w-5 h-5", theme.accentClass)} />}
                  <p className="text-lg opacity-80">الهدف اليومي</p>
                </div>
                
                <div className="flex items-center justify-center gap-6 mb-6">
                  <button 
                     onClick={() => setDailyTarget(Math.max(10, dailyTarget - 10))} 
                     className={cn("p-3 rounded-full hover:scale-110 active:scale-95 transition-all text-white", theme.buttonClass)}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <motion.span 
                    key={dailyTarget}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={cn("text-4xl font-bold font-serif w-24 block", theme.accentClass)}
                  >
                    {dailyTarget}
                  </motion.span>
                  <button 
                     onClick={() => setDailyTarget(dailyTarget + 10)} 
                     className={cn("p-3 rounded-full hover:scale-110 active:scale-95 transition-all text-white", theme.buttonClass)}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-black/20 rounded-full h-6 mb-3 overflow-hidden relative border border-current/10 p-0.5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    className={cn("h-full rounded-full relative overflow-hidden", isGoalReached ? theme.accentClass.replace('text-', 'bg-') : theme.textClass.replace('text-', 'bg-'))} 
                  >
                    {isGoalReached && (
                      <motion.div
                         animate={{ x: ["-100%", "200%"] }}
                         transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                         className="absolute inset-0 bg-white/30 -skew-x-12 w-1/4"
                      />
                    )}
                  </motion.div>
                </div>
                <p className="text-sm font-bold opacity-80 tracking-widest flex items-center justify-center gap-2">
                  <span>{dailyCount} / {dailyTarget}</span>
                  <span className="opacity-60 text-xs">
                    ({Math.round(progressPercentage)}%)
                  </span>
                </p>
              </div>

              {/* Total Stats */}
              <div className="bg-white/5 p-6 rounded-2xl border border-current/10">
                <p className="text-lg opacity-80">إجمالي التسبيحات (جميع الأيام)</p>
                <p className={cn("text-5xl font-bold font-serif my-4 tracking-wider", theme.accentClass)}>
                  {totalCount.toLocaleString('ar-EG')}
                </p>
              </div>

              {/* Thikr Stats Log */}
              <div className="bg-white/5 p-6 rounded-2xl border border-current/10 text-right">
                <h3 className="text-lg font-bold mb-4 opacity-90 flex items-center gap-2">
                   <BookOpen className="w-5 h-5" />
                   سجل الأذكار المقروءة
                </h3>
                <div className="space-y-3">
                  {Object.entries(thikrStats).sort((a,b) => b[1] - a[1]).map(([thikrText, count], idx) => (
                     <div key={idx} className="flex justify-between items-center border-b border-current/10 pb-3 last:border-0 last:pb-0 text-sm">
                        <span className="font-serif font-bold opacity-90 block max-w-[70%] truncate leading-relaxed">{thikrText}</span>
                        <span className={cn("font-bold text-lg min-w-[max-content]", theme.accentClass)}>{count.toLocaleString('ar-EG')}</span>
                     </div>
                  ))}
                  {Object.keys(thikrStats).length === 0 && (
                     <p className="opacity-60 text-sm py-2">لم يتم تسجيل أذكار بعد.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'adhkar' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("w-full mt-6 mb-8 text-right max-w-sm", theme.textClass)}
          >
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-2xl font-bold">مكتبة الأذكار</h2>
              <Sparkles className="w-5 h-5 opacity-60" />
            </div>
            
            <div className="space-y-4">
              {adhkarList.map((item, i) => {
                const isActive = currentThikr === item.text;
                return (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                      isActive ? "bg-white/10 shadow-lg border-white/20" : "bg-white/5 border-current/10 hover:bg-white/10"
                    )}
                  >
                    {isActive && (
                       <div className={cn("absolute right-0 top-0 bottom-0 w-2", theme.accentClass.replace('text-', 'bg-'))} />
                    )}
                    
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className={cn(
                        "text-xl font-bold font-serif leading-relaxed", 
                        isActive ? theme.accentClass : "opacity-90"
                      )}>
                        {item.text}
                      </h3>
                    </div>
                    
                    <p className="text-xs opacity-70 leading-relaxed font-medium mt-1 mb-4">
                      {item.benefit}
                    </p>

                    <div className="flex justify-between items-center mt-2 pt-3 border-t border-current/10">
                      <div className="flex items-center gap-1.5 opacity-60 text-xs font-bold">
                         <RotateCcw className="w-3.5 h-3.5" />
                         <span>العدد الموصى به: {item.target}</span>
                      </div>
                      <button 
                        onClick={() => {
                          if (!isActive) {
                            setCurrentThikr(item.text);
                            setDailyTarget(item.target);
                            setCount(0);
                            setDailyCount(0);
                            setActiveTab('home');
                          } else {
                            setActiveTab('home');
                          }
                        }}
                        className={cn(
                          "px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2", 
                          isActive 
                            ? theme.buttonClass 
                            : "bg-transparent border border-current/30 opacity-80 hover:opacity-100 hover:bg-white/5"
                        )}
                      >
                        {isActive ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            محدد
                          </>
                        ) : 'اختيار ومتابعة'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MisbahaApp />
    </ThemeProvider>
  );
}

