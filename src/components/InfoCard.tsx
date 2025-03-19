import React from "react";
import { Info, Grape } from "lucide-react";

interface InfoCardProps {
  title: string;
  content: string;
  index: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content, index }) => {
  // Use different animation delays based on index for staggered effect
  const animationDelay = `${index * 150}ms`;
  
  return (
    <div 
      className="frosted-glass rounded-xl p-5 card-hover-effect border border-neutral-200 dark:border-neutral-700" 
      style={{ animationDelay }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Grape className="h-5 w-5 text-berry-500 dark:text-berry-400" />
        <div className="text-base font-medium text-gray-900 dark:text-white">{title}</div>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{content}</p>
    </div>
  );
};

export default InfoCard;
