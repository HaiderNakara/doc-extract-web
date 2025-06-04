"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun, FileText, Github } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold">Doc Extract</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#docs"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Documentation
          </a>
          <a
            href="#examples"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Examples
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Github className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
