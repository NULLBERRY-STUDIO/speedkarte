import { Link } from 'react-router-dom';
import { Grape } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const navigation = {
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/orgs/NULLBERRY-STUDIO/repositories',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:hello@nullberry.org',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      ),
    },
  ],
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isImprintOpen, setIsImprintOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const [changelogEntries, setChangelogEntries] = useState<Array<{hash: string, date: string, message: string}>>([]);

  useEffect(() => {
    if (isChangelogOpen) {
      setChangelogEntries([
        {
          hash: '3f7d2a1',
          date: '2025-03-28',
          message: 'feat: Add version display to footer'
        },
        {
          hash: 'b9e4c12',
          date: '2025-03-27',
          message: 'fix: Resolve dark mode contrast issues'
        },
        {
          hash: '5a8f3e2',
          date: '2025-03-26',
          message: 'feat: Implement responsive layout improvements'
        },
        {
          hash: '7c2d9b1',
          date: '2025-03-25',
          message: 'chore: Update dependencies'
        },
        {
          hash: '2e6f8a3',
          date: '2025-03-24',
          message: 'feat: Add initial project structure'
        }
      ]);
    }
  }, [isChangelogOpen]);

  return (
    <footer className="border-t border-border py-16 mt-24">
      <div className="container mx-auto px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-2">
              <Grape className="h-9 w-9 text-berry-500" />
              <span className="text-lg font-medium">
                <span className="text-foreground">Nullberry</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              An indie software studio dedicated to crafting better software & tools—no subscriptions, no ads, no hidden monetization tricks.
            </p>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-6" />
                </a>
              ))}
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="https://github.com/orgs/NULLBERRY-STUDIO/repositories" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                Source Code
              </a>
              <Dialog open={isImprintOpen} onOpenChange={setIsImprintOpen}>
                <DialogTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Imprint
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-foreground">Impressum</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 text-sm space-y-4 text-muted-foreground">
                    <div>
                      <h3 className="font-medium text-foreground">Angaben gemäß § 5 TMG</h3>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground">Vertreten durch:</h3>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground">Kontakt:</h3>
                      <p className="mt-1">
                        E-Mail: hello@nullberry.org<br />
                        Website: nullberry.org
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground">Registereintrag:</h3>
                      <p className="mt-1">
                        Eingetragen im Vereinsregister/Handelsregister:<br />
                        In Bearbeitung
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground">Haftung für Inhalte:</h3>
                      <p className="mt-1">
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="mt-16 border-t border-border pt-8 xl:col-span-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} Nullberry Studio. No rights reserved.
              </p>
              <div className="flex items-center">
                <Dialog open={isChangelogOpen} onOpenChange={setIsChangelogOpen}>
                  <DialogTrigger asChild>
                    <button className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-berry-100 text-berry-800 dark:bg-berry-900 dark:text-berry-200 hover:bg-berry-200 dark:hover:bg-berry-800 transition-colors">
                      v{import.meta.env.VITE_APP_VERSION}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-foreground">Changelog</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-berry-100 text-berry-800 dark:bg-berry-900 dark:text-berry-200">
                          v{import.meta.env.VITE_APP_VERSION}
                        </span>
                      </div>
                      
                      <div className="border-l-2 border-neutral-200 dark:border-neutral-700 pl-4 space-y-4">
                        {changelogEntries.map((entry, index) => (
                          <div key={entry.hash} className="relative">
                            <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-berry-500"></div>
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center text-sm">
                                <span className="font-mono text-xs text-muted-foreground">{entry.hash}</span>
                                <span className="mx-2 text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">{entry.date}</span>
                              </div>
                              <p className="text-sm text-foreground">{entry.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-4">
                        This project follows semantic versioning (major.minor.patch):
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                          <li><strong>Major</strong>: Breaking changes</li>
                          <li><strong>Minor</strong>: New features (backwards compatible)</li>
                          <li><strong>Patch</strong>: Bug fixes and small changes</li>
                        </ul>
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-6 md:mt-4">
              Made with care. No tracking, no cookies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
