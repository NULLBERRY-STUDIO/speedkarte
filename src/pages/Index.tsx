
import React, { useState, useEffect } from "react";
import SpeedSlider from "@/components/SpeedSlider";
import ResultsDisplay from "@/components/ResultsDisplay";
import InfoCard from "@/components/InfoCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FREQUENCY, FrequencyType, ROAD_TYPES } from "@/lib/constants";
import { calculatePenalty, SpeedingData, PenaltyResult } from "@/lib/calculatePenalty";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Car, Gauge, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  
  // State for user input
  const [speedData, setSpeedData] = useState<SpeedingData>({
    urban: 50, // Default to speed limit
    rural: 100, // Default to speed limit
    highway: 130, // Default to recommended speed
    frequency: FREQUENCY.OCCASIONALLY,
  });
  
  // State for calculated results
  const [results, setResults] = useState<PenaltyResult | null>(null);
  const isMobile = useIsMobile();
  
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
  
  // Get frequency button styles based on value
  const getFrequencyButtonStyles = (freq: FrequencyType) => {
    const baseStyles = "px-4 py-2 rounded-lg text-sm flex-1 min-w-[120px] transition-all duration-300";
    
    if (freq === speedData.frequency) {
      switch (freq) {
        case FREQUENCY.RARELY:
          return `${baseStyles} data-[state=on]:bg-emerald-500 data-[state=on]:text-primary-foreground`;
        case FREQUENCY.OCCASIONALLY:
          return `${baseStyles} data-[state=on]:bg-amber-500 data-[state=on]:text-primary-foreground`;
        case FREQUENCY.REGULARLY:
          return `${baseStyles} data-[state=on]:bg-orange-500 data-[state=on]:text-primary-foreground`;
        case FREQUENCY.OFTEN:
          return `${baseStyles} data-[state=on]:bg-red-500 data-[state=on]:text-primary-foreground`;
        default:
          return `${baseStyles} data-[state=on]:bg-primary data-[state=on]:text-primary-foreground`;
      }
    }
    
    return baseStyles;
  };
  
  // Map frequency values to translated labels
  const getFrequencyLabel = (freq: FrequencyType) => {
    switch (freq) {
      case FREQUENCY.RARELY:
        return t.rarely;
      case FREQUENCY.OCCASIONALLY:
        return t.occasionally;
      case FREQUENCY.REGULARLY:
        return t.regularly;
      case FREQUENCY.OFTEN:
        return t.often;
      default:
        return freq;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {/* Main calculator section */}
          <div className={`${isMobile ? 'flex flex-col' : 'grid grid-cols-1 lg:grid-cols-5'} gap-6 mb-10 animate-fade-in`}>
            {/* For mobile, show results first */}
            {isMobile && results && (
              <div className="mb-4">
                <ResultsDisplay results={results} />
              </div>
            )}
            
            {/* Speed settings column */}
            <div className="lg:col-span-2 glass-panel p-6 hover:shadow-lg transition-all duration-300">
              <h2 className="section-title mb-5 flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-primary/20 text-primary">
                  <Gauge className="h-5 w-5" />
                </div>
                <span>{t.yourDrivingSpeed}</span>
              </h2>
              
              {/* Speed sliders */}
              <div className="space-y-5">
                <SpeedSlider 
                  roadType={ROAD_TYPES.URBAN}
                  value={speedData.urban}
                  onChange={(val) => handleSpeedChange("urban", val)}
                  roadLabel={t.urban}
                  resetLabel={t.resetToLimit}
                />
                
                <SpeedSlider 
                  roadType={ROAD_TYPES.RURAL}
                  value={speedData.rural}
                  onChange={(val) => handleSpeedChange("rural", val)}
                  roadLabel={t.rural}
                  resetLabel={t.resetToLimit}
                />
                
                <SpeedSlider 
                  roadType={ROAD_TYPES.HIGHWAY}
                  value={speedData.highway}
                  onChange={(val) => handleSpeedChange("highway", val)}
                  roadLabel={t.highway}
                  resetLabel={t.resetToLimit}
                />
              </div>
              
              {/* Frequency selector */}
              <div className="mt-8">
                <h3 className="subsection-title mb-3 flex items-center gap-2">
                  <span>{t.howOftenDrive}</span>
                  {speedData.frequency === FREQUENCY.OFTEN && 
                    <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
                  }
                </h3>
                
                <ToggleGroup 
                  type="single" 
                  value={speedData.frequency}
                  onValueChange={(value) => {
                    if (value) handleFrequencyChange(value as FrequencyType);
                  }}
                  className="flex flex-wrap justify-center gap-2"
                >
                  {Object.values(FREQUENCY).map((freq) => (
                    <ToggleGroupItem 
                      key={freq} 
                      value={freq}
                      className={getFrequencyButtonStyles(freq)}
                    >
                      {getFrequencyLabel(freq)}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
            
            {/* Results column - only for desktop */}
            {!isMobile && results && (
              <div className="lg:col-span-3 h-full">
                <ResultsDisplay 
                  results={results} 
                  labels={{
                    title: t.resultsTitle,
                    points: t.pointsLabel,
                    fine: t.fineLabel,
                    ban: t.banLabel,
                    risk: t.suspensionRiskLabel,
                    months: t.monthsUntilSuspensionLabel,
                    never: t.neverLabel,
                    urban: t.urban,
                    rural: t.rural,
                    highway: t.highway
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Educational information */}
          <section className="mb-10 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h2 className="section-title text-center mb-6 flex items-center justify-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              {t.aboutTitle}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.educationalInfo.map((info, index) => (
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
