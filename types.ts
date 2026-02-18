
export type Language = 'FR' | 'EN';

export interface LicoEntry {
  size: {
    FR: string;
    EN: string;
  };
  income: number;
}

export interface Testimony {
  text: {
    FR: string;
    EN: string;
  };
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
