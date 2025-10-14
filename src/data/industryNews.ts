export interface NewsItem {
  id: string;
  category: 'FMCSA' | 'DOT' | 'Industry' | 'Safety' | 'Regulations';
  title: string;
  excerpt: string;
  date: string;
  source: string;
  url: string;
  featured?: boolean;
}

export const industryNews: NewsItem[] = [
  {
    id: '1',
    category: 'FMCSA',
    title: 'New Hours of Service Regulations Take Effect',
    excerpt: 'FMCSA announces updated Hours of Service rules providing more flexibility for drivers while maintaining safety standards. The new regulations include extended break flexibility and adjusted driving windows.',
    date: '2025-01-15',
    source: 'FMCSA',
    url: 'https://www.fmcsa.dot.gov/',
    featured: true
  },
  {
    id: '2',
    category: 'Safety',
    title: 'Winter Driving Safety Tips for Truck Drivers',
    excerpt: 'As winter weather intensifies across the country, transportation safety experts share essential tips for safe winter driving, including proper tire chain usage and speed adjustment in icy conditions.',
    date: '2025-01-10',
    source: 'DOT Safety Division',
    url: 'https://www.transportation.gov/',
  },
  {
    id: '3',
    category: 'Industry',
    title: 'Diesel Prices Show Downward Trend',
    excerpt: 'National average diesel prices decrease for the third consecutive week, providing relief for owner-operators and fleet managers. Analysts predict continued stability through Q1 2025.',
    date: '2025-01-08',
    source: 'Transport Topics',
    url: 'https://www.ttnews.com/',
  },
  {
    id: '4',
    category: 'Regulations',
    title: 'Updated ELD Compliance Requirements',
    excerpt: 'New Electronic Logging Device technical specifications announced. All carriers must ensure their ELD systems meet the updated standards by the end of 2025 to maintain compliance.',
    date: '2025-01-05',
    source: 'FMCSA',
    url: 'https://www.fmcsa.dot.gov/',
  },
  {
    id: '5',
    category: 'Industry',
    title: 'Freight Demand Increases in Manufacturing Sector',
    excerpt: 'Manufacturing sector sees significant growth, leading to increased demand for truck drivers. Industry experts report improved rates and more available loads across major freight lanes.',
    date: '2025-01-03',
    source: 'FreightWaves',
    url: 'https://www.freightwaves.com/',
  },
  {
    id: '6',
    category: 'DOT',
    title: 'Infrastructure Bill Brings New Rest Area Improvements',
    excerpt: 'Department of Transportation announces $200 million investment in truck parking and rest area facilities along major interstate highways, addressing the critical shortage of safe parking.',
    date: '2024-12-28',
    source: 'U.S. DOT',
    url: 'https://www.transportation.gov/',
  },
];
