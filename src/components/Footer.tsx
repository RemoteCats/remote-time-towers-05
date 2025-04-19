
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-6 border-t">
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Remote Time Towers
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Helping remote teams stay connected across time zones
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
