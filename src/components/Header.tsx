import React from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { Grape } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <header className="py-6 md:py-8 w-full">
      <div className="container mx-auto px-4">
        {/* Top bar with logo and controls */}
        <div className="flex justify-between items-center mb-6">
          {/* Logo */}
          <div className="flex items-center">
            <Grape className="w-5 h-5 text-berry-500 mr-2" />
            <span className="text-base font-medium">
              <span className="text-foreground">Nullberry</span>
            </span>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
        
        {/* Title and subtitle */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 tracking-tight">
            {t.pageTitle}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl text-balance">
            {t.pageSubtitle}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
