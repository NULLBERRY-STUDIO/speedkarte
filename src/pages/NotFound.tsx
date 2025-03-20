
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Basic translations for the 404 page - these could be added to the main translation files
  // if more complete 404 page translations are needed
  const getNotFoundText = () => {
    const { language } = useLanguage();
    
    switch (language) {
      case 'de': return { title: '404', message: 'Oops! Seite nicht gefunden', link: 'Zurück zur Startseite' };
      case 'tr': return { title: '404', message: 'Hata! Sayfa bulunamadı', link: 'Ana Sayfaya Dön' };
      case 'ar': return { title: '404', message: 'عفوا! الصفحة غير موجودة', link: 'العودة إلى الصفحة الرئيسية' };
      case 'es': return { title: '404', message: '¡Ups! Página no encontrada', link: 'Volver a Inicio' };
      case 'ru': return { title: '404', message: 'Упс! Страница не найдена', link: 'Вернуться на главную' };
      case 'fr': return { title: '404', message: 'Oups! Page non trouvée', link: 'Retour à l\'accueil' };
      default: return { title: '404', message: 'Oops! Page not found', link: 'Return to Home' };
    }
  };

  const notFoundText = getNotFoundText();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{notFoundText.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{notFoundText.message}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
          {notFoundText.link}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
