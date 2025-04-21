
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#999266] hover:text-black hover:bg-[#999266]">
          {theme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black border-[#999266]">
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="text-[#999266] hover:text-black hover:bg-[#999266] cursor-pointer"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("ash")}
          className="text-[#999266] hover:text-black hover:bg-[#999266] cursor-pointer"
        >
          Ash
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
