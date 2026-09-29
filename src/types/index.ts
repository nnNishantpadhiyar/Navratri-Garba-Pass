export type EventBadge = 'Trending' | 'Early Bird' | 'Limited Passes' | 'Almost Sold Out' | 'VIP Exclusive';

export type LocationSlug = 
  | 'ahmedabad' 
  | 'bopal' 
  | 'south-bopal' 
  | 'sg-highway' 
  | 'satellite' 
  | 'prahlad-nagar' 
  | 'thaltej' 
  | 'gota' 
  | 'maninagar' 
  | 'chandkheda' 
  | 'gandhinagar' 
  | 'vadodara' 
  | 'surat';

export interface PassTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  validity: string; // e.g. "Single Day Access", "All 9 Nights"
  benefits: string[];
  availableCount: number;
  isPopular?: boolean;
}

export interface GarbaEvent {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  venue: string;
  address: string;
  locationSlug: LocationSlug;
  locationName: string;
  city: string;
  dates: string;
  startDate: string; // ISO or YYYY-MM-DD
  endDate: string;
  startTime: string;
  endTime: string;
  startingPrice: number;
  featuredImage: string;
  galleryImages: string[];
  artistName: string;
  artistRole: string;
  artistImage: string;
  description: string;
  highlights: string[];
  badges: EventBadge[];
  passes: PassTier[];
  parkingInfo: string;
  dressCode: string;
  entryRules: string[];
  contactPhone: string;
  contactEmail: string;
  googleMapsEmbedUrl?: string;
  organizerName: string;
  rating: number;
  reviewCount: number;
}

export interface LocationInfo {
  slug: LocationSlug;
  name: string;
  areaDescription: string;
  topVenues: string[];
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  landmarks: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  author: string;
  readTime: string;
  coverImage: string;
  category: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Passes & Pricing' | 'Refunds' | 'Entry & Gate' | 'Venues';
}

export interface BookingDetails {
  bookingId: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  venueName: string;
  address: string;
  passTierId: string;
  passTierName: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  totalPaid: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addOns?: { name: string; price: number }[];
  qrCodeData: string;
  bookingTimestamp: string;
  paymentMethod: string;
  status: 'CONFIRMED' | 'USED' | 'CANCELLED';
}
