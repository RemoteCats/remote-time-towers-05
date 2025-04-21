
import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import AuthButton from "./AuthButton";

interface HeaderProps {
  onBackgroundChange: (background: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onBackgroundChange }) => {
  return (
    <header className="py-4 border-b border-[#999266]/20 bg-black/90">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex flex-col hover:opacity-90 transition-opacity">
            <pre className="text-xs font-ibm-mono leading-none text-[#999266]">
{`░▒▓███████▓▒░ ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
░▒▓███████▓▒░░▒▓█▓▒░        
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░`}
            </pre>
            <h1 className="text-xl font-bold font-josefin text-[#999266]">RemoteCats</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-[#999266] hover:text-black hover:bg-[#999266]">
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-[#999266]">
                <DropdownMenuItem asChild>
                  <Link to="/tools" className="text-[#999266] hover:text-black hover:bg-[#999266]">
                    Remote Tools
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/analytics" className="text-[#999266] hover:text-black hover:bg-[#999266]">
                    Analytics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/rc-deals" className="text-[#999266] hover:text-black hover:bg-[#999266]">
                    RC Deals
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* BackgroundSelector removed */}

            {/* ThemeDropdown removed */}
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
