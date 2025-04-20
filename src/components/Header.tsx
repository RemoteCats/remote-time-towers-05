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
    <header className="py-4 border-b border-gray-900 bg-gray-900/90">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex flex-col hover:opacity-90 transition-opacity">
            <pre className="text-xs font-ibm-mono leading-none text-primary">
{`░▒▓███████▓▒░ ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
░▒▓███████▓▒░░▒▓█▓▒░        
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░`}
              </pre>
            <h1 className="text-xl font-bold font-josefin">RemoteCats</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Cat className="h-4 w-4" />
                    Menu
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <Link to="/tools" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                        Remote Tools
                      </Link>
                      <Link to="/analytics" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                        Analytics
                      </Link>
                      <Link to="/deadliners" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                        Deadliners
                      </Link>
                    </div>
                  </div>
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
                  className="px-4 py-2 rounded-md flex items-center space-x-1 transition-all hover:scale-105 active:scale-95 bg-gray-900 border-gray-800"
                >
                  <Cat className="h-4 w-4 mr-1 animate-pulse" />
                  <span className="text-gray-200">Sign In</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-gray-900 border-gray-800">
                <SheetHeader>
                  <SheetTitle className="text-gray-200">Sign In</SheetTitle>
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
