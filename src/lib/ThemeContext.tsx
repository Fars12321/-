import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, themes, ThemeId } from './themes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<ThemeId>('royal-gold');

  useEffect(() => {
    const saved = localStorage.getItem('misbaha-theme') as ThemeId;
    if (saved && themes.find(t => t.id === saved)) {
      setThemeId(saved);
    }
  }, []);

  const setTheme = (id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem('misbaha-theme', id);
  };

  const theme = themes.find(t => t.id === themeId) || themes[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

