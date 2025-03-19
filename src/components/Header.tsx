import React from "react";
import { Grape } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const Header: React.FC = () => {
  return (
    <header className="animate-fade-in py-6 md:py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Grape className="w-6 h-6 text-berry-500 mr-2" />
            <span className="text-lg font-medium">
              <span className="text-foreground">Speedkarte</span>
              <span className="text-muted-foreground ml-1">by Nullberry Studio</span>
            </span>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="info-tag mb-2">
            German Traffic Laws
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 tracking-tight">
            <span className="text-gradient">Speedkarte</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl text-balance">
            Calculate when you might lose your license based on your speeding habits in Germany.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
