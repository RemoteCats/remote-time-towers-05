
import React from "react";
import { Cat, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Link } from "react-router-dom";
import BackgroundSelector from "./BackgroundSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  onBackgroundChange: (background: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onBackgroundChange }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="py-4 border-b">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cat className="h-6 w-6 text-primary animate-pulse" />
            <div className="flex flex-col">
              <pre className="text-xs font-mono leading-none text-primary">
{`░▒▓███████▓▒░ ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
░▒▓███████▓▒░░▒▓█▓▒░        
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░`}
              </pre>
              <h1 className="text-xl font-bold">RemoteCats</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/tools" className={navigationMenuTriggerStyle()}>
                    Remote Tools
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/deadliners" className={navigationMenuTriggerStyle()}>
                    Deadliners
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/analytics" className={navigationMenuTriggerStyle()}>
                    Analytics
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <BackgroundSelector
              selectedBackground={localStorage.getItem("clockBackground") || "bg-gray-900"}
              onChange={onBackgroundChange}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="transition-all hover:scale-105 active:scale-95"
                >
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5 transition-transform hover:rotate-12" />
                  ) : (
                    <Sun className="h-5 w-5 transition-transform hover:rotate-12" />
                  )}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light" className="cursor-pointer">
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark" className="cursor-pointer">
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system" className="cursor-pointer">
                    <Cat className="h-4 w-4 mr-2" />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="px-4 py-2 rounded-md flex items-center space-x-1 transition-all hover:scale-105 active:scale-95"
                >
                  <Cat className="h-4 w-4 mr-1" />
                  <span>Sign In</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sign In</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Button variant="outline" className="w-full group">
                    <Cat className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                    Continue with Google
                  </Button>
                  <Button variant="outline" className="w-full group">
                    <Cat className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                    Continue with Email
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
