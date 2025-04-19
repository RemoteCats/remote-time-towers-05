
import React from "react";
import { Clock } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="py-4 border-b">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Remote Time Towers</h1>
          </div>
          <nav>
            <ul className="flex items-center space-x-4">
              <li>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center space-x-1">
                  <span>Sign In</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
