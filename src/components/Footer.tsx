import React from "react";
import { ExternalLink, Grape } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-base font-semibold mb-2">Important Notice</h3>
            <p className="text-sm text-muted-foreground">
              This calculator is for informational purposes only. Actual penalties may vary based on 
              specific circumstances, local regulations, and legal interpretations. Always consult with 
              legal professionals for specific advice.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2">More Resources</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <a 
                  href="https://www.bussgeldkatalog.org/en/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Official German Penalty Catalog
                </a>
              </li>
              <li>
                <a 
                  href="https://www.adac.de/verkehr/recht/verkehrsvorschriften-deutschland/bussgeldrechner/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  ADAC Fine Calculator (German)
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center mb-4 md:mb-0">
            <Grape className="w-5 h-5 text-berry-500 mr-2" />
            <span className="text-sm font-medium">
              <span className="text-foreground">Speedkarte</span>
              <span className="text-muted-foreground ml-1">by Nullberry Studio</span>
            </span>
          </div>
          
          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>
              Data based on the latest German traffic regulations effective {currentYear}.
            </p>
            <p className="mt-1">
              &copy; {currentYear} German Driving License Points Calculator by Nullberry Studio
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Made with care. No tracking, no cookies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
