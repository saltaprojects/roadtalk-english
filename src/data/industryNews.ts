export interface NewsItem {
  id: string;
  category: 'FMCSA' | 'DOT' | 'Industry' | 'Safety' | 'Regulations';
  title: {
    en: string;
    ru: string;
  };
  excerpt: {
    en: string;
    ru: string;
  };
  date: string;
  source: string;
  url: string;
  featured?: boolean;
}

export const industryNews: NewsItem[] = [
  {
    id: '1',
    category: 'Regulations',
    title: {
      en: 'English Proficiency Now Required for All Commercial Truck Drivers',
      ru: 'Знание английского языка теперь обязательно для всех водителей коммерческого транспорта'
    },
    excerpt: {
      en: 'FMCSA announces that English language proficiency is now mandatory for all commercial truck drivers. This requirement ensures drivers can read and understand road signs, communicate effectively with dispatchers, law enforcement officers, border officials, and other drivers. English proficiency is critical for safety, regulatory compliance, and successful operations in the trucking industry.',
      ru: 'FMCSA объявляет, что знание английского языка теперь является обязательным для всех водителей коммерческого транспорта. Это требование гарантирует, что водители могут читать и понимать дорожные знаки, эффективно общаться с диспетчерами, сотрудниками правоохранительных органов, пограничниками и другими водителями. Знание английского языка имеет решающее значение для безопасности, соблюдения нормативных требований и успешной работы в сфере грузоперевозок.'
    },
    date: '2025-01-18',
    source: 'FMCSA',
    url: 'https://www.fmcsa.dot.gov/',
    featured: true
  },
];
