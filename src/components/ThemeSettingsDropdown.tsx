
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

export function ThemeSettingsDropdown() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-[#999266] hover:text-black hover:bg-[#999266]">
          Theme
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
          onClick={() => setTheme("grey")}
          className="text-[#999266] hover:text-black hover:bg-[#999266] cursor-pointer"
        >
          Grey
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("ash")}
          className="text-[#999266] hover:text-black hover:bg-[#999266] cursor-pointer"
        >
          Ash
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="text-[#999266] hover:text-black hover:bg-[#999266] cursor-pointer"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ThemeSettingsDropdown;
