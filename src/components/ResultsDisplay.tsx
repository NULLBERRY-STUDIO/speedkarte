import React from "react";
import { PenaltyResult } from "@/lib/calculatePenalty";
import { AlertCircle, Award, Gauge } from "lucide-react";
import { LICENSE_SUSPENSION_THRESHOLD } from "@/lib/constants";

interface ResultsDisplayProps {
  results: PenaltyResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const { 
    totalPoints, 
    totalFine, 
    banMonths, 
    licenseSuspensionRisk, 
    monthsUntilSuspension,
  } = results;
  
  // Calculate risk percentage for the progress bar
  const riskPercentage = Math.min(100, Math.round(licenseSuspensionRisk * 100));
  
  // Determine risk level for UI indication
  const getRiskLevel = () => {
    if (riskPercentage < 30) return { level: "Low", color: "bg-emerald-500" };
    if (riskPercentage < 60) return { level: "Moderate", color: "bg-amber-500" };
    if (riskPercentage < 85) return { level: "High", color: "bg-orange-500" };
    return { level: "Critical", color: "bg-berry-600 dark:bg-berry-500" };
  };
  
  const riskInfo = getRiskLevel();
  
  // Format months until suspension message
  const formatTimeline = () => {
    if (!monthsUntilSuspension || monthsUntilSuspension > 120) {
      return "You're driving safely!";
    }
    
    if (monthsUntilSuspension <= 0) {
      return "Immediate risk of license suspension!";
    }
    
    const years = Math.floor(monthsUntilSuspension / 12);
    const months = monthsUntilSuspension % 12;
    
    if (years > 0 && months > 0) {
      return `License suspension in ~${years} year${years > 1 ? 's' : ''} and ${months} month${months > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `License suspension in ~${years} year${years > 1 ? 's' : ''}`;
    } else {
      return `License suspension in ~${months} month${months > 1 ? 's' : ''}`;
    }
  };
  
  return (
    <div className="frosted-glass-darker rounded-2xl p-5 md:p-6 shadow-lg animate-scale-in border border-neutral-200 dark:border-neutral-800">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Gauge className="w-5 h-5 text-berry-500 dark:text-berry-400 mr-2" />
        <span className="text-gradient">Your Driving Assessment</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Points and Timeline */}
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
          <div className="mb-4">
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">Points per violation:</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalPoints} <span className="text-sm font-normal text-gray-600 dark:text-gray-400">/ {LICENSE_SUSPENSION_THRESHOLD}</span></div>
          </div>
          
          {/* Risk meter */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-700 dark:text-gray-300">License Suspension Risk:</span>
              <span className="text-sm font-medium">{riskInfo.level}</span>
            </div>
            <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${riskInfo.color} transition-all duration-700 ease-out`}
                style={{ width: `${riskPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="mb-3">
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">Timeline:</div>
            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
              {formatTimeline()}
            </div>
          </div>
        </div>
        
        {/* Monetary and Ban Info */}
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4">
          <div className="mb-4">
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">Potential fine per violation:</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">€{totalFine}</div>
          </div>
          
          {banMonths > 0 ? (
            <div className="flex items-start space-x-2 text-berry-600 dark:text-berry-400 mb-3">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">Temporary license suspension:</div>
                <div>{banMonths} month{banMonths > 1 ? 's' : ''}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-2 text-emerald-500 mb-3">
              <Award className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">No license suspension</div>
                <div>Keep it up!</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
