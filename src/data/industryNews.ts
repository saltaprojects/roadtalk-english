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
    category: 'FMCSA',
    title: {
      en: 'New Hours of Service Regulations Take Effect',
      ru: 'Новые правила рабочего времени вступают в силу'
    },
    excerpt: {
      en: 'FMCSA announces updated Hours of Service rules providing more flexibility for drivers while maintaining safety standards. The new regulations include extended break flexibility and adjusted driving windows.',
      ru: 'FMCSA объявляет обновленные правила рабочего времени, предоставляющие водителям больше гибкости при сохранении стандартов безопасности. Новые правила включают расширенную гибкость перерывов и скорректированные окна вождения.'
    },
    date: '2025-01-15',
    source: 'FMCSA',
    url: 'https://www.fmcsa.dot.gov/',
    featured: true
  },
  {
    id: '2',
    category: 'Safety',
    title: {
      en: 'Winter Driving Safety Tips for Truck Drivers',
      ru: 'Советы по безопасному зимнему вождению для водителей грузовиков'
    },
    excerpt: {
      en: 'As winter weather intensifies across the country, transportation safety experts share essential tips for safe winter driving, including proper tire chain usage and speed adjustment in icy conditions.',
      ru: 'Поскольку зимняя погода усиливается по всей стране, эксперты по безопасности на транспорте делятся важными советами по безопасному зимнему вождению, включая правильное использование цепей противоскольжения и регулировку скорости в условиях гололеда.'
    },
    date: '2025-01-10',
    source: 'DOT Safety Division',
    url: 'https://www.transportation.gov/',
  },
  {
    id: '3',
    category: 'Industry',
    title: {
      en: 'Diesel Prices Show Downward Trend',
      ru: 'Цены на дизельное топливо показывают тенденцию к снижению'
    },
    excerpt: {
      en: 'National average diesel prices decrease for the third consecutive week, providing relief for owner-operators and fleet managers. Analysts predict continued stability through Q1 2025.',
      ru: 'Средние по стране цены на дизельное топливо снижаются третью неделю подряд, принося облегчение владельцам-операторам и менеджерам автопарков. Аналитики прогнозируют продолжение стабильности до первого квартала 2025 года.'
    },
    date: '2025-01-08',
    source: 'Transport Topics',
    url: 'https://www.ttnews.com/',
  },
  {
    id: '4',
    category: 'Regulations',
    title: {
      en: 'Updated ELD Compliance Requirements',
      ru: 'Обновленные требования соответствия ELD'
    },
    excerpt: {
      en: 'New Electronic Logging Device technical specifications announced. All carriers must ensure their ELD systems meet the updated standards by the end of 2025 to maintain compliance.',
      ru: 'Объявлены новые технические спецификации электронных устройств регистрации. Все перевозчики должны убедиться, что их системы ELD соответствуют обновленным стандартам к концу 2025 года для поддержания соответствия.'
    },
    date: '2025-01-05',
    source: 'FMCSA',
    url: 'https://www.fmcsa.dot.gov/',
  },
  {
    id: '5',
    category: 'Industry',
    title: {
      en: 'Freight Demand Increases in Manufacturing Sector',
      ru: 'Спрос на грузоперевозки растет в секторе производства'
    },
    excerpt: {
      en: 'Manufacturing sector sees significant growth, leading to increased demand for truck drivers. Industry experts report improved rates and more available loads across major freight lanes.',
      ru: 'Сектор производства демонстрирует значительный рост, что приводит к увеличению спроса на водителей грузовиков. Эксперты отрасли сообщают об улучшении ставок и большем количестве доступных грузов на основных маршрутах.'
    },
    date: '2025-01-03',
    source: 'FreightWaves',
    url: 'https://www.freightwaves.com/',
  },
  {
    id: '6',
    category: 'DOT',
    title: {
      en: 'Infrastructure Bill Brings New Rest Area Improvements',
      ru: 'Инфраструктурный закон приносит улучшения зон отдыха'
    },
    excerpt: {
      en: 'Department of Transportation announces $200 million investment in truck parking and rest area facilities along major interstate highways, addressing the critical shortage of safe parking.',
      ru: 'Департамент транспорта объявляет об инвестициях в размере 200 миллионов долларов в парковки для грузовиков и зоны отдыха вдоль основных междуштатных автомагистралей, решая критическую нехватку безопасных парковок.'
    },
    date: '2024-12-28',
    source: 'U.S. DOT',
    url: 'https://www.transportation.gov/',
  },
];
