import React, { useState, useRef, useEffect, useCallback } from "react";
import { SPEED_LIMITS, SLIDER_RANGES, RoadType } from "@/lib/constants";
import { Car, GaugeCircle } from "lucide-react";

interface SpeedSliderProps {
  roadType: RoadType;
  value: number;
  onChange: (value: number) => void;
}

const SpeedSlider: React.FC<SpeedSliderProps> = ({ roadType, value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const range = SLIDER_RANGES[roadType];
  const speedLimit = SPEED_LIMITS[roadType];
  
  // Calculate percentage for visual display
  const percentage = ((value - range.min) / (range.max - range.min)) * 100;
  const speedLimitPercentage = ((speedLimit - range.min) / (range.max - range.min)) * 100;
  
  // Handle interaction events - wrap in useCallback to prevent infinite loops
  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const newValue = Math.round(range.min + position * (range.max - range.min));
    
    // Clamp value to range
    const clampedValue = Math.max(range.min, Math.min(range.max, newValue));
    onChange(clampedValue);
  }, [range.min, range.max, onChange]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };
  
  // Event handlers for mousemove and touchmove
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };
    
    const handleEnd = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchend", handleEnd);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove]);
  
  // Determine color based on speed vs. speed limit
  const getTrackColor = () => {
    if (value <= speedLimit) return "bg-emerald-500";
    if (value <= speedLimit * 1.2) return "bg-amber-500";
    if (value <= speedLimit * 1.5) return "bg-orange-500";
    return "bg-berry-600 dark:bg-berry-500";
  };
  
  return (
    <div className="py-4 select-none animate-fade-in bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium flex items-center text-gray-800 dark:text-gray-200">
          <GaugeCircle className="w-4 h-4 text-berry-500 dark:text-berry-400 mr-1.5" />
          {roadType.charAt(0).toUpperCase() + roadType.slice(1)} Roads
        </span>
        <span className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value} <span className="text-sm font-normal text-gray-600 dark:text-gray-400">km/h</span>
        </span>
      </div>
      
      <div 
        ref={sliderRef}
        className="slider-track my-4"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Filled track */}
        <div 
          className={`slider-track-filled ${getTrackColor()}`} 
          style={{ width: `${percentage}%` }}
        />
        
        {/* Speed limit marker */}
        <div 
          className="absolute w-0.5 h-4 bg-gray-900/70 dark:bg-gray-200/70 top-1/2 transform -translate-y-1/2 z-10"
          style={{ left: `${speedLimitPercentage}%` }}
        >
          <div className="absolute -top-6 -translate-x-1/2 text-xs font-medium text-gray-800 dark:text-gray-200">
            Limit
          </div>
        </div>
        
        {/* Thumb with car icon */}
        <div 
          className={`slider-thumb flex items-center justify-center ${getTrackColor()} ${isDragging ? 'scale-110 ring ring-berry-300 dark:ring-berry-700' : ''}`}
          style={{ left: `${percentage}%` }}
        >
          <Car className="w-3 h-3 text-white" />
        </div>
      </div>
      
      {/* Overdrive warning */}
      {value > speedLimit && (
        <div className="mt-1 text-xs text-berry-600 dark:text-berry-400 font-medium animate-pulse-gentle">
          {value - speedLimit} km/h over the speed limit
        </div>
      )}
    </div>
  );
};

export default SpeedSlider;
