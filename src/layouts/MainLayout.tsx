
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { backgroundOptions } from "../components/BackgroundSelector";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [selectedBackground, setSelectedBackground] = React.useState(() => {
    return localStorage.getItem("clockBackground") || backgroundOptions[0].id;
  });

  React.useEffect(() => {
    localStorage.setItem("clockBackground", selectedBackground);
  }, [selectedBackground]);

  return (
    <div className={`flex flex-col min-h-screen bg-[#1A1F2C] shadow-2xl`}>
      <Header onBackgroundChange={setSelectedBackground} />
      <main className="flex-1 py-8">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
