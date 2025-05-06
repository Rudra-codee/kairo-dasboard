
import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';
type ColorTheme = 'purple' | 'blue' | 'pink' | 'green';

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colorTheme: 'purple',
  setTheme: () => null,
  setColorTheme: () => null
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('purple');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    if (savedColorTheme) {
      setColorTheme(savedColorTheme);
    }
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleSetColorTheme = (newColorTheme: ColorTheme) => {
    setColorTheme(newColorTheme);
    localStorage.setItem('colorTheme', newColorTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorTheme,
        setTheme: handleSetTheme,
        setColorTheme: handleSetColorTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
