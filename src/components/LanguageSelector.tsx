
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SupportedLanguage, languageNames } from "@/lib/translations";

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as SupportedLanguage);
  };

  // Get flag emoji based on language code
  const getLanguageFlag = (lang: SupportedLanguage): string => {
    switch (lang) {
      case 'en': return '🇬🇧';
      case 'de': return '🇩🇪';
      case 'tr': return '🇹🇷';
      case 'ar': return '🇸🇦';
      case 'es': return '🇪🇸';
      case 'ru': return '🇷🇺';
      case 'fr': return '🇫🇷';
      case 'pl': return '🇵🇱';
      case 'ur': return '🇵🇰';
      default: return '🌐';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="bg-transparent border-none focus:ring-0 p-1 h-8 w-28">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languageNames).map(([code, name]) => (
            <SelectItem key={code} value={code} className="flex items-center">
              <span className="mr-2">{getLanguageFlag(code as SupportedLanguage)}</span>
              <span>{name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
