
import { LicoEntry, Testimony } from './types';

// Valeurs LICO + 30% (Exigences officielles IRCC 2024/2025 pour le Super Visa)
export const LICO_DATA: LicoEntry[] = [
  { size: { FR: "1 personne", EN: "1 person" }, income: 33484 },
  { size: { FR: "2 personnes", EN: "2 persons" }, income: 41675 },
  { size: { FR: "3 personnes", EN: "3 persons" }, income: 51235 },
  { size: { FR: "4 personnes", EN: "4 persons" }, income: 62213 },
  { size: { FR: "5 personnes", EN: "5 persons" }, income: 70569 },
  { size: { FR: "6 personnes", EN: "6 persons" }, income: 79598 },
  { size: { FR: "7+ personnes", EN: "7+ persons" }, income: 88628 }
];

export const TESTIMONIALS: Testimony[] = [
  {
    text: {
      FR: "Mes parents sont arrivés en moins de 3 mois et restent désormais avec nous et surtout avec leurs petits enfants",
      EN: "My parents arrived in less than 3 months and are now staying with us and especially with their grandchildren"
    },
    author: "M. Kabange",
    location: "Montréal"
  }
];

export const CONTACT_INFO = {
  whatsapp: "+1 438 794 6736",
  email: "immigreraucanada4@gmail.com",
  phone: "+1 438 794 6736",
  address: "Kinshasa / Gombe - Montréal"
};

export const TRANSLATIONS = {
  FR: {
    nav: {
      benefits: "Avantages",
      timeline: "Délais",
      eligibility: "Éligibilité",
      income: "Revenus",
      cta: "Consultation Gratuite"
    },
    hero: {
      badge: "Spécialiste Super Visa - RDC 🇨🇩 🇨🇦",
      title1: "Super Visa Canada",
      title2: "Réunissez votre famille",
      title3: "dès aujourd'hui !",
      desc: "Citoyens et résidents permanents, ramenez vos parents ou grands-parents de la RDC pour une visite longue durée. Jusqu'à 5 ans par séjour, avec des délais de traitement rapides.",
      whatsappBtn: "Consultation Gratuite WhatsApp",
      eligibilityBtn: "Vérifier mon éligibilité",
      statsDays: "~35 Jours",
      statsSubtitle: "Délai moyen constaté pour la RDC",
      benefitsList: [
        "Séjour jusqu'à 5 ans consécutifs",
        "Visa entrées multiples (10 ans)",
        "Pas de tirage au sort (Loterie)",
        "Alternative rapide au parrainage"
      ]
    },
    benefits: {
      title: "Pourquoi choisir le Super Visa ?",
      subtitle: "Les nouvelles règles de 2022 et 2026 rendent la réunification plus accessible que jamais.",
      card1Title: "Durée Record",
      card1Desc: "Restez jusqu'à 5 ans par visite au Canada, contre seulement 2 ans auparavant.",
      card2Title: "Flexibilité Totale",
      card2Desc: "Visa valide 10 ans avec entrées multiples. Sortez et revenez sans nouvelle demande.",
      card3Title: "Garantie & Vitesse",
      card3Desc: "Pas de loterie PGP. Approbation basée sur votre dossier. Délais ultra-courts pour la RDC."
    },
    timeline: {
      title: "Délais de traitement : Rapide pour Kinshasa !",
      item1Title: "Exception Africaine",
      item1Desc: "Alors que le standard IRCC est de 112 jours, nous constatons des délais de 30 à 38 jours pour les dossiers bien préparés en RDC.",
      item2Title: "Dossier Complet = Vitesse",
      item2Desc: "Nous nous assurons que l'assurance, les preuves financières et les actes civils sont parfaits dès l'envoi pour éviter les retards.",
      cta: "Estimer ma date de départ",
      chartTitle: "Évolution des délais",
      chartUpdate: "Mise à jour Fév 2026",
      chartLabels: ["Standard IRCC (Global)", "Nigeria / Afrique de l'Ouest", "RDC (Dossier Expert)"]
    },
    lico: {
      title: "Vos obligations au Canada",
      subtitle: "Vous devez prouver un revenu minimum (LICO + 30%) basé sur votre taille de famille.",
      tableSize: "Taille de la famille",
      tableIncome: "Revenu min. requis (CAD/an)",
      tableMore: "Plus de 7 personnes",
      tableNote: "Le conjoint peut co-signer pour atteindre le revenu requis. Une lettre d'invitation officielle et une assurance santé de 100,000 $ CAD sont obligatoires."
    },
    eligibility: {
      title: "Conditions pour vos parents (RDC)",
      items: [
        { title: "Lien Familial", desc: "Acte de naissance prouvant la filiation directe." },
        { title: "Assurance Santé", desc: "Privée, min. 100 000 CAD, couvrant hospitalisation et rapatriement (min. 1 an)." },
        { title: "Examen Médical", desc: "Effectué par un médecin désigné par l'IRCC si requis." },
        { title: "Documents Voyage", desc: "Passeport valide, casier judiciaire vierge, et intention réelle de visite." }
      ],
      formTitle: "Testez votre éligibilité",
      formStatus: "Votre statut au Canada",
      formStatusOptions: ["Citoyen Canadien", "Résident Permanent", "Autre (Inéligible)"],
      formParentsCount: "Nombre de parents à inviter",
      formParentsCountOptions: ["1 parent", "2 parents"],
      formHousehold: "Taille de votre foyer au Canada (VOUS INCLUS)",
      formHouseholdPlaceholder: "Ex: 2 (vous + conjoint)",
      formIncome: "Revenu annuel brut (CAD)",
      formIncomePlaceholder: "Ex: 55000",
      formSubmit: "Vérifier maintenant",
      formWarning: "Ce calculateur fournit une estimation basée sur les barèmes LICO 2024/2025. Seul un agent de l'IRCC peut confirmer l'éligibilité finale.",
      resultEligible: "Vous semblez éligible !",
      resultIneligible: "Revenu insuffisant",
      resultNeutral: "Données incomplètes",
      resultStatusAdmissible: "Statut non admissible",
      resultStatusAdmissibleDesc: "Seuls les citoyens canadiens et résidents permanents peuvent parrainer leurs parents.",
      resultIncomeNote: (income: string, required: string, size: number) => `Votre revenu de ${income}$ CAD dépasse le minimum requis de ${required}$ CAD pour une famille de ${size} personnes (vous + foyer + invités).`,
      resultGapNote: (gap: string, required: string, size: number) => `Pour une famille de ${size} personnes, le revenu requis est de ${required}$ CAD. Il vous manque environ ${gap}$ CAD.`,
      resultNeutralNote: "Veuillez entrer un revenu annuel valide.",
      resultCtaEligible: "Appliquer Maintenant - Consultation Gratuite",
      resultCtaIneligible: "Consulter un expert gratuitement",
      resultRetry: "Recommencer le test"
    },
    testimonials: {
      title: "Ils ont réuni leur famille"
    },
    cta: {
      title: "Prêt à démarrer ?",
      desc: "Ne laissez pas la distance séparer votre famille. Obtenez votre Super Visa en quelques semaines avec notre expertise exclusive.",
      labelWhatsapp: "Consultation Gratuite WhatsApp",
      labelEmail: "Email Officiel",
      labelPhone: "Assistance Directe",
      mainBtn: "APPLIQUER MAINTENANT - CONSULTATION GRATUITE"
    },
    footer: {
      mentions: "Mentions Légales",
      privacy: "Confidentialité",
      ircc: "Réglementation IRCC",
      home: "Accueil",
      rights: "© 2026 Immigrer Au Canada - Spécialiste RDC. Tous droits réservés.",
      disclaimer: "Avertissement : Les informations présentées ici sont basées sur les directives de l'IRCC de février 2026. L'agence 'IMMIGRER AU CANADA' est une entreprise privée de conseil en immigration et n'est pas affiliée au Gouvernement du Canada. Consultez canada.ca pour les documents légaux officiels."
    }
  },
  EN: {
    nav: {
      benefits: "Benefits",
      timeline: "Processing Times",
      eligibility: "Eligibility",
      income: "Income",
      cta: "Free Consultation"
    },
    hero: {
      badge: "Super Visa Specialist - DRC 🇨🇩 🇨🇦",
      title1: "Canada Super Visa",
      title2: "Reunite your family",
      title3: "today!",
      desc: "Citizens and permanent residents, bring your parents or grandparents from DRC for a long-term visit. Up to 5 years per stay, with fast processing times.",
      whatsappBtn: "Free WhatsApp Consultation",
      eligibilityBtn: "Check my eligibility",
      statsDays: "~35 Days",
      statsSubtitle: "Average time observed for DRC",
      benefitsList: [
        "Stay up to 5 consecutive years",
        "10-year multiple entry visa",
        "No lottery (PGP)",
        "Fast alternative to sponsorship"
      ]
    },
    benefits: {
      title: "Why Choose the Super Visa?",
      subtitle: "New rules from 2022 and 2026 make reunification more accessible than ever.",
      card1Title: "Record Duration",
      card1Desc: "Stay up to 5 years per visit in Canada, compared to only 2 years before.",
      card2Title: "Total Flexibility",
      card2Desc: "10-year valid visa with multiple entries. Come and go without a new application.",
      card3Title: "Guarantee & Speed",
      card3Desc: "No PGP lottery. Approval based on your file. Ultra-short processing for DRC."
    },
    timeline: {
      title: "Processing Times: Fast for Kinshasa!",
      item1Title: "African Exception",
      item1Desc: "While the IRCC standard is 112 days, we observe delays of 30 to 38 days for well-prepared files in DRC.",
      item2Title: "Complete File = Speed",
      item2Desc: "We ensure insurance, financial proof, and civil documents are perfect from the start to avoid delays.",
      cta: "Estimate my departure date",
      chartTitle: "Processing Time Evolution",
      chartUpdate: "Updated Feb 2026",
      chartLabels: ["IRCC Standard (Global)", "Nigeria / West Africa", "DRC (Expert File)"]
    },
    lico: {
      title: "Your Obligations in Canada",
      subtitle: "You must prove a minimum income (LICO + 30%) based on your family size.",
      tableSize: "Family Size",
      tableIncome: "Min. Income Required (CAD/year)",
      tableMore: "More than 7 people",
      tableNote: "Spouse can co-sign to meet the required income. Official invitation letter and $100,000 CAD health insurance are mandatory."
    },
    eligibility: {
      title: "Conditions for your Parents (DRC)",
      items: [
        { title: "Family Link", desc: "Birth certificate proving direct lineage." },
        { title: "Health Insurance", desc: "Private, min. 100,000 CAD, covering hospitalization and repatriation (min. 1 year)." },
        { title: "Medical Exam", desc: "Performed by an IRCC-designated physician if required." },
        { title: "Travel Documents", desc: "Valid passport, clean criminal record, and real intent to visit." }
      ],
      formTitle: "Check Your Eligibility",
      formStatus: "Your Status in Canada",
      formStatusOptions: ["Canadian Citizen", "Permanent Resident", "Other (Ineligible)"],
      formParentsCount: "Number of parents to invite",
      formParentsCountOptions: ["1 parent", "2 parents"],
      formHousehold: "Current household size in Canada (INCLUDING YOU)",
      formHouseholdPlaceholder: "Ex: 2 (you + spouse)",
      formIncome: "Gross Annual Income (CAD)",
      formIncomePlaceholder: "Ex: 55000",
      formSubmit: "Check now",
      formWarning: "This calculator provides an estimate based on 2024/2025 LICO scales. Only an IRCC officer can confirm final eligibility.",
      resultEligible: "You seem eligible!",
      resultIneligible: "Insufficient Income",
      resultNeutral: "Incomplete Data",
      resultStatusAdmissible: "Inadmissible Status",
      resultStatusAdmissibleDesc: "Only Canadian citizens and permanent residents can sponsor their parents.",
      resultIncomeNote: (income: string, required: string, size: number) => `Your income of $${income} CAD exceeds the minimum required of $${required} CAD for a family of ${size} people (you + household + guests).`,
      resultGapNote: (gap: string, required: string, size: number) => `For a family of ${size} people, the required income is $${required} CAD. You are short by approximately $${gap} CAD.`,
      resultNeutralNote: "Please enter a valid annual income.",
      resultCtaEligible: "Apply Now - Free Consultation",
      resultCtaIneligible: "Consult an expert for free",
      resultRetry: "Restart test"
    },
    testimonials: {
      title: "They Reunited Their Family"
    },
    cta: {
      title: "Ready to start?",
      desc: "Don't let distance separate your family. Get your Super Visa in a few weeks with our exclusive expertise.",
      labelWhatsapp: "Free WhatsApp Consultation",
      labelEmail: "Official Email",
      labelPhone: "Direct Assistance",
      mainBtn: "APPLY NOW - FREE CONSULTATION"
    },
    footer: {
      mentions: "Legal Mentions",
      privacy: "Privacy Policy",
      ircc: "IRCC Regulation",
      home: "Home",
      rights: "© 2026 Immigrer Au Canada - DRC Specialist. All rights reserved.",
      disclaimer: "Disclaimer: The information presented here is based on IRCC guidelines as of February 2026. 'IMMIGRER AU CANADA' is a private immigration consulting firm and is not affiliated with the Government of Canada. Visit canada.ca for official legal documents."
    }
  }
};
