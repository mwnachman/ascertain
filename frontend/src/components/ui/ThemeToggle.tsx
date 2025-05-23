import { useEffect, useState, type SetStateAction, type Dispatch } from 'react';

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

const useTheme = (): [Theme, Dispatch<SetStateAction<Theme>>] => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme && Object.values(Theme).includes(savedTheme)) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
    }
    return Theme.LIGHT;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(Theme.LIGHT, Theme.DARK);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme];
};

const ThemeToggle = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <button 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === Theme.DARK ? 'Light' : 'Dark'} Mode`}
    >
      Switch to {theme === Theme.DARK ? 'Light' : 'Dark'}
    </button>
  );
};

export default ThemeToggle;
