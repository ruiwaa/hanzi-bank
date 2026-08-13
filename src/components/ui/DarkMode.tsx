"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function DarkMode() {
  const { setTheme } = useTheme();

  const handleThemeChange = () => {
    const isDark = document.documentElement.classList.contains("dark");

    setTheme(isDark ? "light" : "dark");
  };
  return (
    <button onClick={handleThemeChange}>
      <Sun aria-label="다크모드" className="block dark:hidden" />
      <Moon aria-label="라이트모드" className="hidden dark:block" />
    </button>
  );
}
