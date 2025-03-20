
import React from "react";
import { Info, ExternalLink, BookOpen, AlertTriangle } from "lucide-react";

interface InfoCardProps {
  title: string;
  content: string;
  index: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content, index }) => {
  // Use different animation delays based on index for staggered effect
  const animationDelay = `${index * 150}ms`;
  
  // Select an icon based on the content
  const getIcon = () => {
    if (title.toLowerCase().includes("warning") || title.toLowerCase().includes("caution")) {
      return <AlertTriangle className="h-4 w-4 text-primary" />;
    } else if (title.toLowerCase().includes("link") || title.toLowerCase().includes("resource")) {
      return <ExternalLink className="h-4 w-4 text-primary" />;
    } else if (title.toLowerCase().includes("learn") || title.toLowerCase().includes("understand")) {
      return <BookOpen className="h-4 w-4 text-primary" />;
    }
    return <Info className="h-4 w-4 text-primary" />;
  };
  
  // Get a different background color based on index for visual variety
  const getBgClass = () => {
    const colors = [
      "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20",
      "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20",
      "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20",
      "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20",
      "bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/20",
      "bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/20",
    ];
    return colors[index % colors.length];
  };
  
  return (
    <div 
      className={`rounded-xl p-5 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${getBgClass()}`}
      style={{ animationDelay }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="rounded-full bg-background p-1.5">
          {getIcon()}
        </div>
        <div className="font-medium text-base">{title}</div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
};

export default InfoCard;
