
import React from "react";
import { Slider } from "@/components/ui/slider";
import { ROAD_TYPES, SPEED_LIMITS, RoadType } from "@/lib/constants";
import { LucideIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpeedSliderProps {
  roadType: RoadType;
  value: number;
  onChange: (value: number) => void;
  roadLabel?: string; // For translations
  resetLabel?: string; // For translations
}

const SpeedSlider: React.FC<SpeedSliderProps> = ({ 
  roadType, 
  value, 
  onChange,
  roadLabel,
  resetLabel = "Reset to limit"
}) => {
  // Define the max value for each road type (speed limit + 100)
  const MAX_SPEEDS = {
    [ROAD_TYPES.URBAN]: SPEED_LIMITS[ROAD_TYPES.URBAN] + 100,
    [ROAD_TYPES.RURAL]: SPEED_LIMITS[ROAD_TYPES.RURAL] + 100,
    [ROAD_TYPES.HIGHWAY]: SPEED_LIMITS[ROAD_TYPES.HIGHWAY] + 70
  };
  
  // Get the speed limits and max values
  const speedLimit = SPEED_LIMITS[roadType];
  const maxSpeed = MAX_SPEEDS[roadType];
  
  // Determine if vehicle is speeding and by how much
  const isOverLimit = value > speedLimit;
  const overLimitAmount = value - speedLimit;
  const percentage = Math.min(100, (overLimitAmount / (maxSpeed - speedLimit)) * 100);
  
  // Handle reset to limit
  const handleReset = () => {
    onChange(speedLimit);
  };
  
  // Get the appropriate styles for the slider based on speeding amount
  const getSliderClass = () => {
    let bgClass = "bg-green-500";
    
    if (percentage > 0) {
      if (percentage < 25) bgClass = "bg-yellow-500";
      else if (percentage < 50) bgClass = "bg-amber-500";
      else if (percentage < 75) bgClass = "bg-orange-500";
      else bgClass = "bg-red-500";
    }
    
    return bgClass;
  };
  
  // Get dynamic background for the slider container
  const getContainerStyle = (): React.CSSProperties => {
    // Background color transitions based on speed
    let bgGradient = "linear-gradient(to right, #4ade80, #4ade80)";
    
    if (percentage > 0) {
      if (percentage < 25) {
        bgGradient = "linear-gradient(to right, #4ade80, #eab308)";
      } else if (percentage < 50) {
        bgGradient = "linear-gradient(to right, #eab308, #f59e0b)";
      } else if (percentage < 75) {
        bgGradient = "linear-gradient(to right, #f59e0b, #ef4444)";
      } else {
        bgGradient = "linear-gradient(to right, #ef4444, #b91c1c)";
      }
    }
    
    return {
      background: isOverLimit ? bgGradient : "var(--background)",
      transition: "background 0.5s ease",
      opacity: 0.1 + (isOverLimit ? percentage / 200 : 0),
    };
  };
  
  return (
    <div className="relative">
      {/* Background gradient container */}
      <div 
        className="absolute inset-0 rounded-lg -z-10 opacity-10 overflow-hidden"
        style={getContainerStyle()}
      ></div>
      
      <div className="p-4 rounded-lg border border-border transition-all duration-300 hover:border-primary/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`text-sm font-medium ${isOverLimit ? 'text-foreground' : 'text-foreground/70'}`}>
              {roadLabel || roadType.charAt(0).toUpperCase() + roadType.slice(1).toLowerCase()}
            </div>
            {isOverLimit && (
              <div 
                className={`px-1.5 py-0.5 text-xs rounded ${getSliderClass()} text-white animate-pulse flex items-center`}
              >
                +{Math.round(overLimitAmount)} km/h
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={handleReset}
              disabled={value === speedLimit}
              title={resetLabel}
            >
              <RefreshCcw className="h-3 w-3 mr-1" />
              <span>{resetLabel}</span>
            </Button>
            <div className="font-medium tabular-nums">
              {value} km/h
            </div>
          </div>
        </div>
        
        <Slider
          value={[value]}
          min={10}
          max={maxSpeed}
          step={1}
          onValueChange={(values) => onChange(values[0])}
          className={`py-1 ${getSliderClass()}`}
        />
        
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>10</span>
          <span className={value === speedLimit ? "text-primary font-medium" : ""}>
            {speedLimit} 
            {value === speedLimit && " ✓"}
          </span>
          <span>{maxSpeed}</span>
        </div>
      </div>
    </div>
  );
};

export default SpeedSlider;
