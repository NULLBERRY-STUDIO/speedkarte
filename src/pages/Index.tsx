import React, { useState, useEffect } from "react";
import SpeedSlider from "@/components/SpeedSlider";
import ResultsDisplay from "@/components/ResultsDisplay";
import InfoCard from "@/components/InfoCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EDUCATIONAL_INFO, FREQUENCY, FrequencyType } from "@/lib/constants";
import { calculatePenalty, SpeedingData, PenaltyResult } from "@/lib/calculatePenalty";
import { Grape } from "lucide-react";

const Index = () => {
  // State for user input
  const [speedData, setSpeedData] = useState<SpeedingData>({
    urban: 50, // Default to speed limit
    rural: 100, // Default to speed limit
    highway: 130, // Default to recommended speed
    frequency: FREQUENCY.OCCASIONALLY,
  });
  
  // State for calculated results
  const [results, setResults] = useState<PenaltyResult | null>(null);
  
  // Calculate results when inputs change
  useEffect(() => {
    const newResults = calculatePenalty(speedData);
    setResults(newResults);
  }, [speedData]);
  
  // Update individual speed values
  const handleSpeedChange = (roadType: keyof Omit<SpeedingData, 'frequency'>, value: number) => {
    setSpeedData(prev => ({
      ...prev,
      [roadType]: value
    }));
  };
  
  // Update frequency
  const handleFrequencyChange = (frequency: FrequencyType) => {
    setSpeedData(prev => ({
      ...prev,
      frequency
    }));
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-200 dark:bg-neutral-900">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {/* Main calculator section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
            {/* Speed settings column */}
            <div className="lg:col-span-2 frosted-glass rounded-2xl p-5 md:p-6 border border-neutral-800/10">
              <h2 className="flex items-center text-xl font-semibold mb-4">
                <Grape className="w-5 h-5 text-berry-500 mr-2" />
                <span className="text-gradient">Your Driving Speed</span>
              </h2>
              
              {/* Speed sliders */}
              <div className="space-y-6">
                <SpeedSlider 
                  roadType="urban" 
                  value={speedData.urban}
                  onChange={(val) => handleSpeedChange("urban", val)}
                />
                
                <SpeedSlider 
                  roadType="rural" 
                  value={speedData.rural}
                  onChange={(val) => handleSpeedChange("rural", val)}
                />
                
                <SpeedSlider 
                  roadType="highway" 
                  value={speedData.highway}
                  onChange={(val) => handleSpeedChange("highway", val)}
                />
              </div>
              
              {/* Frequency selector */}
              <div className="mt-8">
                <h3 className="text-base font-medium mb-3">How often do you drive like this?</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.values(FREQUENCY).map((freq) => (
                    <button
                      key={freq}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        speedData.frequency === freq 
                          ? 'bg-berry-500 text-white shadow-sm' 
                          : 'bg-neutral-800/10 text-foreground hover:bg-neutral-800/20'
                      }`}
                      onClick={() => handleFrequencyChange(freq)}
                    >
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Results column */}
            <div className="lg:col-span-3">
              {results && <ResultsDisplay results={results} />}
            </div>
          </div>
          
          {/* Educational information */}
          <section className="mb-10">
            <h2 className="flex items-center justify-center text-xl font-semibold mb-6">
              <Grape className="w-5 h-5 text-berry-500 mr-2" />
              <span className="text-gradient">About the German Point System</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {EDUCATIONAL_INFO.map((info, index) => (
                <InfoCard 
                  key={index}
                  title={info.title}
                  content={info.content}
                  index={index}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
