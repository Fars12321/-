export type ThemeId = 
  | 'royal-gold' | 'minimal-white' | 'neon-future' | 'peaceful-nature'
  | 'sky-stars' | 'classic-ottoman' | 'glassmorphism' | 'holy-mosque';

export type Theme = {
  id: ThemeId;
  name: string;
  bgClass: string;
  cardClass: string;
  textClass: string;
  textMutedClass: string;
  accentClass: string;
  beadActiveClass: string;
  beadInactiveClass: string;
  tasselClass: string;
  buttonClass: string;
  navClass: string;
  navActiveClass: string;
  navInactiveClass: string;
};

export const themes: Theme[] = [
  {
    id: 'royal-gold',
    name: 'الثيم الذهبي الفاخر',
    bgClass: 'bg-neutral-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-neutral-950 to-black',
    cardClass: 'bg-neutral-900/80 border border-yellow-600/30',
    textClass: 'text-neutral-50',
    textMutedClass: 'text-neutral-400',
    accentClass: 'text-yellow-500',
    beadActiveClass: 'fill-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]',
    beadInactiveClass: 'fill-yellow-900/40',
    tasselClass: 'fill-yellow-600',
    buttonClass: 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-neutral-950 shadow-[0_4px_20px_rgba(234,179,8,0.3)]',
    navClass: 'bg-neutral-950/90 border-t border-yellow-900/50',
    navActiveClass: 'text-yellow-500',
    navInactiveClass: 'text-neutral-500',
  },
  {
    id: 'minimal-white',
    name: 'الثيم البسيط النظيف',
    bgClass: 'bg-neutral-50',
    cardClass: 'bg-white border border-neutral-200 shadow-sm',
    textClass: 'text-neutral-800',
    textMutedClass: 'text-neutral-500',
    accentClass: 'text-emerald-600',
    beadActiveClass: 'fill-emerald-600',
    beadInactiveClass: 'fill-neutral-200 shadow-inner',
    tasselClass: 'fill-emerald-700',
    buttonClass: 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700',
    navClass: 'bg-white/90 border-t border-neutral-200',
    navActiveClass: 'text-emerald-600',
    navInactiveClass: 'text-neutral-400',
  },
  {
    id: 'neon-future',
    name: 'الثيم النيون المستقبلي',
    bgClass: 'bg-[#050510] bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050510] to-black',
    cardClass: 'bg-[#0a0a1a]/80 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
    textClass: 'text-cyan-50',
    textMutedClass: 'text-cyan-500/60',
    accentClass: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]',
    beadActiveClass: 'fill-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]',
    beadInactiveClass: 'fill-blue-950',
    tasselClass: 'fill-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]',
    buttonClass: 'bg-transparent border-2 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)_inset,0_0_15px_rgba(6,182,212,0.4)]',
    navClass: 'bg-[#050510]/95 border-t border-cyan-900/50',
    navActiveClass: 'text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]',
    navInactiveClass: 'text-slate-600',
  },
  {
    id: 'peaceful-nature',
    name: 'ثيم الطبيعة الهادئة',
    bgClass: 'bg-stone-900 bg-[url("https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?q=80&w=1080&auto=format&fit=crop")] bg-cover bg-center bg-blend-overlay bg-black/60',
    cardClass: 'bg-stone-900/60 backdrop-blur-md border border-stone-600/50',
    textClass: 'text-stone-100',
    textMutedClass: 'text-stone-400',
    accentClass: 'text-emerald-400',
    beadActiveClass: 'fill-[#8B5A2B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]', // Wood color
    beadInactiveClass: 'fill-stone-800/80',
    tasselClass: 'fill-emerald-600',
    buttonClass: 'bg-emerald-700/90 backdrop-blur-sm border border-emerald-500/50 text-emerald-50 hover:bg-emerald-600',
    navClass: 'bg-stone-900/80 backdrop-blur-lg border-t border-stone-700/50',
    navActiveClass: 'text-emerald-400',
    navInactiveClass: 'text-stone-500',
  },
  {
    id: 'sky-stars',
    name: 'ثيم السماء والنجوم',
    bgClass: 'bg-slate-950 bg-[url("https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1080&auto=format&fit=crop")] bg-cover bg-center bg-blend-multiply',
    cardClass: 'bg-slate-900/60 backdrop-blur-md border border-blue-500/20',
    textClass: 'text-slate-100',
    textMutedClass: 'text-slate-400',
    accentClass: 'text-blue-300',
    beadActiveClass: 'fill-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.6)]',
    beadInactiveClass: 'fill-slate-800/80',
    tasselClass: 'fill-blue-300',
    buttonClass: 'bg-blue-600/40 backdrop-blur-md border border-blue-400/50 text-blue-50 hover:bg-blue-500/50',
    navClass: 'bg-slate-950/80 backdrop-blur-lg border-t border-slate-800',
    navActiveClass: 'text-blue-400',
    navInactiveClass: 'text-slate-600',
  },
  {
    id: 'classic-ottoman',
    name: 'الثيم العثماني الكلاسيكي',
    bgClass: 'bg-[#0B132B] bg-[url("https://www.transparenttextures.com/patterns/arabesque.png")]',
    cardClass: 'bg-[#0B132B]/90 border border-[#D4AF37]/30 shadow-lg',
    textClass: 'text-[#E0E7FF]',
    textMutedClass: 'text-[#64748B]',
    accentClass: 'text-[#D4AF37]',
    beadActiveClass: 'fill-[#1C2541] stroke-[#D4AF37] stroke-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]',
    beadInactiveClass: 'fill-[#0B132B] stroke-[#1C2541] stroke-1',
    tasselClass: 'fill-[#D4AF37]',
    buttonClass: 'bg-gradient-to-b from-[#1C2541] to-[#0B132B] border border-[#D4AF37]/50 text-[#D4AF37] shadow-[0_4px_15px_rgba(0,0,0,0.5)]',
    navClass: 'bg-[#0B132B]/95 border-t border-[#D4AF37]/20',
    navActiveClass: 'text-[#D4AF37]',
    navInactiveClass: 'text-[#475569]',
  },
  {
    id: 'glassmorphism',
    name: 'ثيم الزجاج (Glassmorphism)',
    // Add a beautiful abstract gradient for the glass to sit on
    bgClass: 'bg-slate-900 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_40%)]',
    cardClass: 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
    textClass: 'text-white',
    textMutedClass: 'text-white/50',
    accentClass: 'text-sky-300',
    beadActiveClass: 'fill-white/80 backdrop-blur-md drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]',
    beadInactiveClass: 'fill-white/10 backdrop-blur-sm stroke-white/20 stroke-1',
    tasselClass: 'fill-white/60',
    buttonClass: 'bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:bg-white/20',
    navClass: 'bg-slate-900/40 backdrop-blur-2xl border-t border-white/10',
    navActiveClass: 'text-white',
    navInactiveClass: 'text-white/40',
  },
  {
    id: 'holy-mosque',
    name: 'ثيم الحرم المكي',
    bgClass: 'bg-neutral-900 bg-[url("https://images.unsplash.com/photo-1580418827493-f2b2ca534d4f?q=80&w=1080&auto=format&fit=crop")] bg-cover bg-center bg-blend-multiply bg-black/70',
    cardClass: 'bg-black/60 backdrop-blur-md border border-yellow-700/30 shadow-2xl',
    textClass: 'text-neutral-100',
    textMutedClass: 'text-neutral-400',
    accentClass: 'text-yellow-600',
    beadActiveClass: 'fill-neutral-950 stroke-yellow-700 stroke-[1.5] drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]',
    beadInactiveClass: 'fill-neutral-900/50 stroke-neutral-800 stroke-1',
    tasselClass: 'fill-yellow-700',
    buttonClass: 'bg-neutral-900/80 backdrop-blur border border-yellow-700/50 text-yellow-500 hover:bg-neutral-800',
    navClass: 'bg-black/80 backdrop-blur-lg border-t border-yellow-900/30',
    navActiveClass: 'text-yellow-600',
    navInactiveClass: 'text-neutral-600',
  }
];
