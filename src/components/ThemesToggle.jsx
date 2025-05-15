import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ArrowBigDown, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useAppStore } from "../lib/zustand";

export default function ThemesToggle() {
  const { themes } = useAppStore();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );

  const handleTheme = (type, mode) => {
    const html = document.documentElement;
    const isDark = html.dataset.theme.startsWith("dark-");

    if (mode === "theme") {
      const newTheme = isDark ? `dark-${type}` : type;
      html.dataset.theme = newTheme;
      setTheme(newTheme);
    } else if (mode === "dark") {
      const newTheme = type.startsWith("dark-")
        ? type.replace("dark-", "")
        : `dark-${type}`;
      html.dataset.theme = newTheme;
      setTheme(newTheme);
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Select Theme"
            title="Select Theme"
          >
            <ArrowBigDown className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 relative z-[1000]">
          <DropdownMenuLabel className="text-sm font-semibold px-4 pt-3">
            Select Theme
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-gray-300 dark:border-gray-600" />
          <div className="flex flex-col gap-1 px-4 py-2">
            {themes.map((el) => {
              const isActive =
                theme === el ||
                theme === `dark-${el}` ||
                `dark-${theme}` === el;

              return (
                <Button
                  key={el}
                  onClick={() => handleTheme(el, "theme")}
                  className={`justify-start text-left capitalize rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold"
                      : ""
                  }`}
                  variant="ghost"
                  size="sm"
                >
                  {el}
                </Button>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        size="icon"
        onClick={() => handleTheme(theme, "dark")}
        className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
        aria-label="Toggle Dark Mode"
        title="Toggle Dark Mode"
      >
        {theme.startsWith("dark-") ? (
          <Sun className="h-5 w-5 text-yellow-300" />
        ) : (
          <Moon className="h-5 w-5 text-white" />
        )}
      </Button>
    </div>
  );
}
