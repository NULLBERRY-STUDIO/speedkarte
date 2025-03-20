
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SupportedLanguage, 
  Translation, 
  translations, 
  DEFAULT_LANGUAGE 
} from '@/lib/translations';

type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get language from localStorage, or use default
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const savedLanguage = localStorage.getItem('language') as SupportedLanguage;
    return savedLanguage && translations[savedLanguage] 
      ? savedLanguage 
      : DEFAULT_LANGUAGE;
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Update HTML dir attribute for RTL languages (Arabic and Urdu)
    document.documentElement.dir = ['ar', 'ur'].includes(language) ? 'rtl' : 'ltr';
    
    // Add a body class for additional RTL styling if needed
    if (['ar', 'ur'].includes(language)) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [language]);

  // Get the current translation
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
