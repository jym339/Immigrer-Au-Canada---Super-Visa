
export interface LicoEntry {
  size: string;
  income: number;
}

export interface Testimony {
  text: string;
  author: string;
  location: string;
}

export enum SectionId {
  Hero = 'accueil',
  Benefits = 'avantages',
  Timeline = 'delais',
  Eligibility = 'eligibilite',
  Lico = 'revenus',
  Contact = 'contact'
}
