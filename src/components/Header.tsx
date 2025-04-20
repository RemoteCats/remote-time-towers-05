
import React from "react";
import { Clock, Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="py-4 border-b">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Remote Clocker</h1>
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="px-4 py-2 rounded-md flex items-center space-x-1">
                  <span>Sign In</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sign In</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Button variant="outline" className="w-full">
                    Continue with Google
                  </Button>
                  <Button variant="outline" className="w-full">
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
