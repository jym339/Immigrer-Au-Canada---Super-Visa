
import React, { useState, useCallback, useMemo } from 'react';
import { LICO_DATA, TESTIMONIALS, CONTACT_INFO, TRANSLATIONS } from './constants';
import { Language } from './types';

interface NavItemProps {
  href: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, onClick, children }) => (
  <a 
    href={href} 
    className="relative text-slate-600 hover:text-canada-red font-semibold transition-colors py-2 group" 
    onClick={onClick}
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-canada-red transition-all duration-300 group-hover:w-full"></span>
  </a>
);

type EligibilityResult = {
  status: 'eligible' | 'ineligible' | 'neutral';
  message: string;
  details?: string;
};

type LegalPage = 'mentions' | 'confidentialite' | 'reglementation' | null;

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('FR');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState('Citoyen Canadien');
  const [parentsCount, setParentsCount] = useState('1');
  const [dependents, setDependents] = useState('');
  const [income, setIncome] = useState('');
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [activeLegalPage, setActiveLegalPage] = useState<LegalPage>(null);

  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  const whatsappUrl = `https://wa.me/14387946736`;

  const calculateEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    
    const statusIndex = t.eligibility.formStatusOptions.indexOf(status);
    if (statusIndex === 2) {
      setResult({
        status: 'ineligible',
        message: t.eligibility.resultStatusAdmissible,
        details: t.eligibility.resultStatusAdmissibleDesc
      });
      return;
    }

    const numIncome = parseFloat(income.replace(/[^0-9.]/g, ''));
    const numDependents = parseInt(dependents) || 0;
    const numParentsToInvite = parseInt(parentsCount) || 1;
    
    // Total family size = Sponsor (1) + Dependents in Canada + Parents invited
    const totalFamilySize = 1 + numDependents + numParentsToInvite; 
    
    let requiredIncome = 0;
    if (totalFamilySize <= 7) {
      requiredIncome = LICO_DATA[totalFamilySize - 1]?.income || 80784;
    } else {
      requiredIncome = 80784 + (totalFamilySize - 7) * 8224;
    }

    if (isNaN(numIncome) || numIncome <= 0) {
      setResult({
        status: 'neutral',
        message: t.eligibility.resultNeutral,
        details: t.eligibility.resultNeutralNote
      });
      return;
    }

    if (numIncome >= requiredIncome) {
      setResult({
        status: 'eligible',
        message: t.eligibility.resultEligible,
        details: t.eligibility.resultIncomeNote(numIncome.toLocaleString(), requiredIncome.toLocaleString(), totalFamilySize)
      });
    } else {
      const gap = requiredIncome - numIncome;
      setResult({
        status: 'ineligible',
        message: t.eligibility.resultIneligible,
        details: t.eligibility.resultGapNote(gap.toLocaleString())
      });
    }
  };

  const renderLegalContent = () => {
    const isFR = lang === 'FR';
    switch (activeLegalPage) {
      case 'mentions':
        return (
          <>
            <h2 className="text-3xl font-black mb-6 text-slate-900">{isFR ? 'Mentions Légales' : 'Legal Mentions'}</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p><strong className="text-slate-900">{isFR ? 'Propriétaire :' : 'Owner:'}</strong> IMMIGRER AU CANADA.</p>
              <p><strong className="text-slate-900">{isFR ? 'Siège social :' : 'Headquarters:'}</strong> Montréal, Canada & Kinshasa, RDC.</p>
              <p><strong className="text-slate-900">Contact :</strong> {CONTACT_INFO.email} | {CONTACT_INFO.phone}</p>
              <p>{isFR ? 'Le site "Immigrer Au Canada" est une plateforme d\'accompagnement. Nous ne sommes pas des représentants officiels du gouvernement canadien.' : 'The "Immigrer Au Canada" site is a support platform. We are not official representatives of the Canadian government.'}</p>
            </div>
          </>
        );
      case 'confidentialite':
        return (
          <>
            <h2 className="text-3xl font-black mb-6 text-slate-900">{isFR ? 'Politique de Confidentialité' : 'Privacy Policy'}</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>{isFR ? 'Toutes les informations que vous partagez sont traitées avec la plus grande confidentialité.' : 'All information you share is treated with the utmost confidentiality.'}</p>
              <p><strong className="text-slate-900">{isFR ? 'Collecte :' : 'Collection:'}</strong> {isFR ? 'Uniquement les données nécessaires au Super Visa.' : 'Only data necessary for the Super Visa.'}</p>
            </div>
          </>
        );
      case 'reglementation':
        return (
          <>
            <h2 className="text-3xl font-black mb-6 text-slate-900">{isFR ? 'Réglementation IRCC' : 'IRCC Regulation'}</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>{isFR ? 'Le Super Visa est régi par les directives de l\'IRCC.' : 'The Super Visa is governed by IRCC guidelines.'}</p>
              <p><strong className="text-slate-900">{isFR ? 'Mise à jour :' : 'Update:'}</strong> {isFR ? 'Séjour de 5 ans autorisé depuis 2022.' : '5-year stay authorized since 2022.'}</p>
            </div>
          </>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={(e) => handleNavClick(e as any, 'accueil')}>
              <div className="bg-canada-red p-2 rounded-lg shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 uppercase">IMMIGRER <span className="text-canada-red">AU CANADA</span></span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <NavItem href="#avantages" onClick={(e) => handleNavClick(e, 'avantages')}>{t.nav.benefits}</NavItem>
              <NavItem href="#delais" onClick={(e) => handleNavClick(e, 'delais')}>{t.nav.timeline}</NavItem>
              <NavItem href="#eligibilite" onClick={(e) => handleNavClick(e, 'eligibilite')}>{t.nav.eligibility}</NavItem>
              <NavItem href="#revenus" onClick={(e) => handleNavClick(e, 'revenus')}>{t.nav.income}</NavItem>
              
              <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
                <button onClick={() => setLang('FR')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'FR' ? 'bg-white text-canada-red shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>FR</button>
                <button onClick={() => setLang('EN')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'EN' ? 'bg-white text-canada-red shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>EN</button>
              </div>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-canada-red text-white px-7 py-3 rounded-full font-bold hover:bg-red-600 transition-all shadow-lg hover:shadow-red-500/30 active:scale-95">
                {t.nav.cta}
              </a>
            </nav>

            <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b p-6 space-y-6 flex flex-col items-center animate-in slide-in-from-top duration-300 shadow-xl">
             <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 mb-2">
                <button onClick={() => setLang('FR')} className={`px-4 py-2 text-sm font-bold rounded-full ${lang === 'FR' ? 'bg-white text-canada-red shadow-sm' : 'text-slate-500'}`}>FR</button>
                <button onClick={() => setLang('EN')} className={`px-4 py-2 text-sm font-bold rounded-full ${lang === 'EN' ? 'bg-white text-canada-red shadow-sm' : 'text-slate-500'}`}>EN</button>
              </div>
            <NavItem href="#avantages" onClick={(e) => handleNavClick(e, 'avantages')}>{t.nav.benefits}</NavItem>
            <NavItem href="#delais" onClick={(e) => handleNavClick(e, 'delais')}>{t.nav.timeline}</NavItem>
            <NavItem href="#eligibilite" onClick={(e) => handleNavClick(e, 'eligibilite')}>{t.nav.eligibility}</NavItem>
            <NavItem href="#revenus" onClick={(e) => handleNavClick(e, 'revenus')}>{t.nav.income}</NavItem>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-canada-red text-white py-4 rounded-xl font-bold text-lg">WhatsApp Direct</a>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section id="accueil" className="relative bg-slate-900 text-white pt-24 pb-32 overflow-hidden scroll-mt-0">
          <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1600" alt="Family reunion" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-2/3">
                <span className="inline-block bg-white/10 text-white/90 px-4 py-1 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-white/20">{t.hero.badge}</span>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
                  {t.hero.title1} <br/>
                  <span className="text-canada-red">{t.hero.title2}</span> {t.hero.title3}
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0">{t.hero.desc}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-canada-red hover:bg-red-600 text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl hover:scale-105 active:scale-95">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-2.135 0-4.114 1.258-5.068 3.23-.393.812-.601 1.705-.601 2.617 0 1.554.621 3.013 1.748 4.104l-.841 3.07 3.149-.824c1.1.597 2.333.914 3.593.914 4.09 0 7.42-3.328 7.42-7.42 0-1.978-.771-3.839-2.171-5.239-1.399-1.401-3.262-2.172-5.229-2.172zm3.178 10.457c-.144.406-.838.74-1.155.789-.317.05-1.071.077-1.554-.117-.306-.123-.728-.277-1.236-.499-2.174-.954-3.582-3.155-3.692-3.297-.11-.143-.896-1.191-.896-2.278 0-1.087.569-1.621.77-1.84.202-.219.44-.274.587-.274s.294.004.421.011c.137.008.321-.052.502.385.187.452.641 1.562.697 1.675.055.113.091.244.018.39-.073.146-.11.238-.219.366-.11.128-.231.286-.33.384-.11.108-.225.226-.097.446.128.219.569.937 1.22 1.516.837.747 1.543.978 1.762 1.087.219.109.348.092.477-.055.128-.147.549-.64.696-.859.146-.22.293-.183.494-.109.202.073 1.281.604 1.501.714.22.109.366.164.421.256.055.092.055.534-.089.939z"/></svg>
                    {t.hero.whatsappBtn}
                  </a>
                  <a href="#eligibilite" onClick={(e) => handleNavClick(e, 'eligibilite')} className="bg-white/10 hover:bg-white/20 text-white px-8 py-5 rounded-2xl font-bold text-lg backdrop-blur-sm border border-white/20 transition-all hover:scale-105">{t.hero.eligibilityBtn}</a>
                </div>
              </div>
              <div className="lg:w-1/3 hidden lg:block">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-canada-red mb-1">{t.hero.statsDays}</div>
                    <div className="text-slate-400 text-sm italic">{t.hero.statsSubtitle}</div>
                  </div>
                  <div className="space-y-4">
                    {t.hero.benefitsList.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="text-sm font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="avantages" className="py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{t.benefits.title}</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t.benefits.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-red-100 text-canada-red rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{t.benefits.card1Title}</h3>
                <p className="text-slate-600">{t.benefits.card1Desc}</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{t.benefits.card2Title}</h3>
                <p className="text-slate-600">{t.benefits.card2Desc}</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{t.benefits.card3Title}</h3>
                <p className="text-slate-600">{t.benefits.card3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="delais" className="py-24 bg-slate-900 text-white scroll-mt-24">
          <div className="container mx-auto px-4 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">{t.timeline.title}</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-canada-red rounded-full flex items-center justify-center font-bold text-xl shadow-lg">1</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-red-400">{t.timeline.item1Title}</h4>
                      <p className="text-slate-400">{t.timeline.item1Desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-canada-red rounded-full flex items-center justify-center font-bold text-xl shadow-lg">2</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-red-400">{t.timeline.item2Title}</h4>
                      <p className="text-slate-400">{t.timeline.item2Desc}</p>
                    </div>
                  </div>
                </div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-12 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-xl">{t.timeline.cta}</a>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-slate-400 text-sm uppercase tracking-wider">{t.timeline.chartTitle}</span>
                    <span className="text-canada-red font-bold text-sm">{t.timeline.chartUpdate}</span>
                  </div>
                  <div className="space-y-6">
                    {[
                      { label: t.timeline.chartLabels[0], days: 112, color: "bg-slate-700" },
                      { label: t.timeline.chartLabels[1], days: 38, color: "bg-blue-600" },
                      { label: t.timeline.chartLabels[2], days: 35, color: "bg-canada-red" }
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-slate-200">{item.label}</span>
                          <span className="font-bold">{item.days} {lang === 'FR' ? 'jours' : 'days'}</span>
                        </div>
                        <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                          <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${(item.days / 112) * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="revenus" className="py-24 bg-slate-50 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{t.lico.title}</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t.lico.subtitle}</p>
            </div>
            <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-white transition-transform hover:scale-[1.01]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">{t.lico.tableSize}</th>
                    <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">{t.lico.tableIncome}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {LICO_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5 text-slate-700 font-medium">{row.size[lang]}</td>
                      <td className="px-6 py-5 text-slate-900 font-bold">{row.income.toLocaleString()} $ CAD</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50">
                    <td className="px-6 py-5 text-slate-500 italic">{t.lico.tableMore}</td>
                    <td className="px-6 py-5 text-slate-900 font-bold">80 784 + 8 224 / pers.</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-6 bg-blue-50 text-blue-800 text-sm border-t border-blue-100 flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <span>{t.lico.tableNote}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="eligibilite" className="py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 text-center lg:text-left">{t.eligibility.title}</h2>
                <div className="space-y-6">
                  {t.eligibility.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-3xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-slate-100 rounded-[2.5rem] p-10 sticky top-28 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 text-slate-800">{t.eligibility.formTitle}</h3>
                  {result ? (
                    <div className={`p-8 rounded-3xl animate-in fade-in zoom-in duration-500 shadow-lg ${result.status === 'eligible' ? 'bg-green-50 border border-green-200' : result.status === 'ineligible' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-red-200'}`}>
                      <div className="flex items-center gap-4 mb-5">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${result.status === 'eligible' ? 'bg-green-100 text-green-600' : result.status === 'ineligible' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                          {result.status === 'eligible' ? <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>}
                        </div>
                        <h4 className={`text-2xl font-black ${result.status === 'eligible' ? 'text-green-800' : result.status === 'ineligible' ? 'text-red-800' : 'text-blue-800'}`}>{result.message}</h4>
                      </div>
                      <p className="text-slate-700 mb-8 leading-relaxed font-medium">{result.details}</p>
                      <div className="flex flex-col gap-4">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`w-full text-center py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 ${result.status === 'eligible' ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200' : 'bg-slate-900 text-white hover:bg-black shadow-slate-200'}`}>{result.status === 'eligible' ? t.eligibility.resultCtaEligible : t.eligibility.resultCtaIneligible}</a>
                        <button onClick={() => setResult(null)} className="text-slate-500 text-sm font-bold uppercase tracking-widest hover:text-slate-800 transition-colors">{t.eligibility.resultRetry}</button>
                      </div>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={calculateEligibility}>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{t.eligibility.formStatus}</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-5 py-4 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all shadow-sm">
                          {t.eligibility.formStatusOptions.map(opt => <option key={opt}>{opt}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{t.eligibility.formParentsCount}</label>
                        <select value={parentsCount} onChange={(e) => setParentsCount(e.target.value)} className="w-full bg-white border border-slate-300 rounded-xl px-5 py-4 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all shadow-sm">
                          <option value="1">{t.eligibility.formParentsCountOptions[0]}</option>
                          <option value="2">{t.eligibility.formParentsCountOptions[1]}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{t.eligibility.formDependents}</label>
                        <input type="number" value={dependents} onChange={(e) => setDependents(e.target.value)} placeholder={t.eligibility.formDependentsPlaceholder} className="w-full bg-white border border-slate-300 rounded-xl px-5 py-4 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{t.eligibility.formIncome}</label>
                        <input type="text" value={income} onChange={(e) => setIncome(e.target.value)} placeholder={t.eligibility.formIncomePlaceholder} className="w-full bg-white border border-slate-300 rounded-xl px-5 py-4 focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all shadow-sm" />
                      </div>
                      <button type="submit" className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-black transition-all shadow-xl hover:shadow-slate-300 active:scale-95 text-lg">{t.eligibility.formSubmit}</button>
                      <p className="text-[11px] text-slate-400 text-center italic mt-4 leading-tight">{t.eligibility.formWarning}</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-slate-900">{t.testimonials.title}</h2>
            <div className="max-w-2xl mx-auto">
              {TESTIMONIALS.map((testimony, idx) => (
                <div key={idx} className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 italic relative overflow-hidden transition-transform hover:scale-[1.02]">
                  <div className="absolute top-0 left-0 w-2 h-full bg-canada-red"></div>
                  <svg className="absolute top-8 right-8 w-16 h-16 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C15.3601 14 14.017 12.6569 14.017 11V8C14.017 6.34315 15.3601 5 17.017 5H20.017C21.6739 5 23.017 6.34315 23.017 8V11C23.017 11.1605 23.0042 11.3175 22.979 11.4697C22.6105 14.5826 19.8601 17 16.517 17H16.017C14.9124 17 14.017 17.8954 14.017 19V21H12V5H2V11C2 12.6569 3.34315 14 5 14H7V16H4.017C2.91243 16 2.017 16.8954 2.017 18V21H4.017V19C4.017 17.8954 4.91243 17 6.017 17H6.517C9.8601 17 12.6105 14.5826 12.979 11.4697C13.0042 11.3175 13.017 11.1605 13.017 11V8C13.017 6.34315 11.6739 5 10.017 5H7.017C5.36015 5 4.017 6.34315 4.017 8V11C4.017 12.6569 5.36015 14 7.017 14H9.017V16H6.017C4.91243 16 4.017 16.8954 4.017 18V21H14.017Z" /></svg>
                  <p className="text-xl md:text-2xl text-slate-700 relative z-10 mb-8 leading-relaxed font-medium">"{testimony.text[lang]}"</p>
                  <div className="font-black text-slate-900 not-italic text-lg tracking-tight">{testimony.author}</div>
                  <div className="text-canada-red text-sm font-bold uppercase tracking-widest not-italic mt-1">{testimony.location}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="bg-canada-red rounded-[3.5rem] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl shadow-red-500/20">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-8">{t.cta.title}</h2>
                <p className="text-xl md:text-2xl mb-16 text-white/90 max-w-3xl mx-auto font-medium">{t.cta.desc}</p>
                <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-canada-red p-8 rounded-[2rem] font-black hover:scale-105 transition-transform flex flex-col items-center gap-3 shadow-xl group">
                    <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{t.cta.labelWhatsapp}</span>
                    <span className="text-xl">{CONTACT_INFO.whatsapp}</span>
                  </a>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="bg-white/10 border border-white/20 p-8 rounded-[2rem] font-black hover:bg-white/20 transition-all flex flex-col items-center gap-3 group">
                    <span className="text-xs uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{t.cta.labelEmail}</span>
                    <span className="text-xl break-all sm:break-normal">{CONTACT_INFO.email}</span>
                  </a>
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="bg-white/10 border border-white/20 p-8 rounded-[2rem] font-black hover:bg-white/20 transition-all flex flex-col items-center gap-3 group">
                    <span className="text-xs uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{t.cta.labelPhone}</span>
                    <span className="text-xl">{CONTACT_INFO.phone}</span>
                  </a>
                </div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-canada-red px-14 py-7 rounded-full font-black text-2xl hover:shadow-2xl hover:-translate-y-2 transition-all active:scale-95">{t.cta.mainBtn}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 pb-16 border-b border-white/10">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={(e) => handleNavClick(e as any, 'accueil')}>
              <div className="bg-canada-red p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
              </div>
              <span className="text-2xl font-black tracking-tight tracking-tight uppercase">IMMIGRER <span className="text-canada-red">AU CANADA</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-slate-400 font-bold uppercase tracking-widest text-xs">
              <button onClick={() => setActiveLegalPage('mentions')} className="hover:text-white transition-colors">{t.footer.mentions}</button>
              <button onClick={() => setActiveLegalPage('confidentialite')} className="hover:text-white transition-colors">{t.footer.privacy}</button>
              <button onClick={() => setActiveLegalPage('reglementation')} className="hover:text-white transition-colors">{t.footer.ircc}</button>
              <a href="#accueil" onClick={(e) => handleNavClick(e, 'accueil')} className="hover:text-white transition-colors">{t.footer.home}</a>
            </div>
          </div>
          <div className="pt-16 text-center text-slate-500 text-sm">
            <p className="mb-6 font-medium tracking-wide">{t.footer.rights}</p>
            <p className="max-w-4xl mx-auto italic leading-loose opacity-60">{t.footer.disclaimer}</p>
          </div>
        </div>
      </footer>

      {activeLegalPage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 sm:p-12 relative">
              <button onClick={() => setActiveLegalPage(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              {renderLegalContent()}
              <div className="mt-12">
                <button onClick={() => setActiveLegalPage(null)} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all active:scale-95">
                  {lang === 'FR' ? 'Fermer' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
