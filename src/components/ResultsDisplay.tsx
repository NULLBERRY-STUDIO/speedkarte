import React from "react";
import { Progress } from "@/components/ui/progress";
import { PenaltyResult } from "@/lib/calculatePenalty";
import { Check, X, AlertTriangle, Clock } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ROAD_TYPES } from "@/lib/constants";

interface ResultsDisplayProps {
  results: PenaltyResult;
  labels?: {
    title?: string;
    points?: string;
    fine?: string;
    ban?: string;
    risk?: string;
    months?: string;
    never?: string;
    urban?: string;
    rural?: string;
    highway?: string;
  }
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  results,
  labels = {} 
}) => {
  const {
    title = "Your Results",
    points = "Points on License",
    fine = "Fine Amount",
    ban = "License Ban",
    risk = "Risk of License Suspension",
    months = "Months until possible suspension",
    never = "Never",
    urban = "Urban",
    rural = "Rural",
    highway = "Highway"
  } = labels;
  
  // Helper to format Euro amounts
  const formatEuro = (amount: number) => {
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Helper to format ban duration in months
  const formatBanDuration = (months: number) => {
    if (months === 0) return <Check className="text-green-500 h-5 w-5" />;
    if (months === 1) return `1 ${ban} (1 month)`;
    return `${ban} (${months} months)`;
  };
  
  // Function to get risk level text
  const getRiskLevelText = () => {
    const { licenseSuspensionRisk } = results;
    if (licenseSuspensionRisk === 0) return "No risk";
    if (licenseSuspensionRisk < 0.3) return "Low risk";
    if (licenseSuspensionRisk < 0.6) return "Medium risk";
    if (licenseSuspensionRisk < 0.9) return "High risk";
    return "Very high risk";
  };
  
  // Function to get risk level color
  const getRiskLevelColor = () => {
    const { licenseSuspensionRisk } = results;
    if (licenseSuspensionRisk === 0) return "bg-green-500";
    if (licenseSuspensionRisk < 0.3) return "bg-emerald-500";
    if (licenseSuspensionRisk < 0.6) return "bg-yellow-500";
    if (licenseSuspensionRisk < 0.9) return "bg-orange-500";
    return "bg-red-500";
  };
  
  // Get road type label based on type
  const getRoadTypeLabel = (roadType: string) => {
    switch (roadType) {
      case ROAD_TYPES.URBAN: return urban;
      case ROAD_TYPES.RURAL: return rural;
      case ROAD_TYPES.HIGHWAY: return highway;
      default: return roadType;
    }
  };
  
  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <h2 className="section-title mb-4">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Points */}
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground mb-1">{points}</span>
          <span className="text-4xl font-bold mb-1">{results.totalPoints}</span>
          {results.totalPoints > 0 && (
            <Progress 
              value={Math.min(100, (results.totalPoints / 8) * 100)} 
              className="h-1.5 mt-1"
              indicatorClassName={
                results.totalPoints >= 6 ? "bg-red-500" :
                results.totalPoints >= 4 ? "bg-orange-500" :
                results.totalPoints >= 1 ? "bg-yellow-500" :
                "bg-green-500"
              }
            />
          )}
        </div>
        
        {/* Fine */}
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground mb-1">{fine}</span>
          <span className="text-4xl font-bold mb-1">{formatEuro(results.totalFine)}</span>
          {results.totalFine > 0 && (
            <Progress 
              value={Math.min(100, (results.totalFine / 1000) * 100)} 
              className="h-1.5 mt-1"
              indicatorClassName={
                results.totalFine >= 800 ? "bg-red-500" :
                results.totalFine >= 500 ? "bg-orange-500" :
                results.totalFine >= 100 ? "bg-yellow-500" :
                "bg-green-500"
              }
            />
          )}
        </div>
      </div>
      
      {/* License Ban */}
      <div className="flex flex-col mb-6">
        <span className="text-sm text-muted-foreground mb-1">{ban}</span>
        <span className="text-2xl font-semibold flex items-center gap-2">
          {results.banMonths === 0 ? (
            <>
              <Check className="text-green-500 h-5 w-5" />
              <span>No ban</span>
            </>
          ) : (
            <>
              <AlertTriangle className="text-red-500 h-5 w-5" />
              <span>{results.banMonths} {results.banMonths === 1 ? 'month' : 'months'}</span>
            </>
          )}
        </span>
      </div>
      
      {/* License Suspension Risk */}
      <div className="mb-6">
        <span className="text-sm text-muted-foreground mb-2 block">{risk}</span>
        <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getRiskLevelColor()} transition-all duration-500`}
            style={{ width: `${results.licenseSuspensionRisk * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs">{getRiskLevelText()}</span>
          <span className="text-xs">{Math.round(results.licenseSuspensionRisk * 100)}%</span>
        </div>
        
        {results.monthsUntilSuspension !== null && (
          <div className="flex items-center gap-2 mt-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {months}: <strong>
                {results.monthsUntilSuspension > 500 
                  ? never 
                  : `~${results.monthsUntilSuspension} months`}
              </strong>
            </span>
          </div>
        )}
      </div>
      
      {/* Detailed penalties */}
      {results.detailedPenalties.some(p => p.points > 0 || p.fine > 0 || p.banMonths > 0) && (
        <div className="mt-auto pt-4 border-t">
          <h3 className="subsection-title mb-3">Detailed penalties</h3>
          <div className="space-y-3">
            {results.detailedPenalties.map((penalty, index) => (
              penalty.points > 0 || penalty.fine > 0 || penalty.banMonths > 0 ? (
                <div key={index} className="flex justify-between text-sm border-b pb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-normal">
                      {getRoadTypeLabel(penalty.roadType)}
                    </Badge>
                    <span>+{penalty.overSpeedAmount} km/h</span>
                  </div>
                  <div className="flex gap-4 tabular-nums text-right">
                    <div>{penalty.points > 0 ? `${penalty.points} pts` : ''}</div>
                    <div>{penalty.fine > 0 ? formatEuro(penalty.fine) : ''}</div>
                    <div>{penalty.banMonths > 0 ? `${penalty.banMonths}m ban` : ''}</div>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
