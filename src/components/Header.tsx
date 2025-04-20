import React from "react";
import { Cat } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Link } from "react-router-dom";
import BackgroundSelector from "./BackgroundSelector";

interface HeaderProps {
  onBackgroundChange: (background: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onBackgroundChange }) => {
  return (
    <header className="py-4 border-b border-gray-800">
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
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="px-4 py-2 rounded-md flex items-center space-x-1 transition-all hover:scale-105 active:scale-95 bg-gray-800 border-gray-700"
                >
                  <Cat className="h-4 w-4 mr-1" />
                  <span className="text-gray-200">Sign In</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sign In</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Button variant="outline" className="w-full group bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700">
                    <Cat className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                    Continue with Google
                  </Button>
                  <Button variant="outline" className="w-full group bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700">
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
