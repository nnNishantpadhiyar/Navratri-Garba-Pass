import { LocationInfo, LocationSlug } from '../types';

export const LOCATION_DATA: Record<LocationSlug, LocationInfo> = {
  'ahmedabad': {
    slug: 'ahmedabad',
    name: 'Ahmedabad (City Center)',
    areaDescription: 'Ahmedabad is India\'s undisputed Garba capital during Navratri. From massive club grounds along SG Highway to historic Sheri Garba in Old City heritage pols, Ahmedabad hosts over 100+ organized Garba nights every year.',
    topVenues: ['YMCA International Club', 'Rajpath Club', 'Karnavati Club', 'GMDC Exhibition Grounds', 'AES Ground Drive-In'],
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Navratri Garba Pass Ahmedabad 2026 | Book Tickets Online',
    metaDescription: 'Book online Garba Passes and tickets in Ahmedabad for Navratri 2026. Discover top venues, season passes, prices, parking info and QR tickets.',
    landmarks: ['SG Highway', 'Drive-In Road', 'Law Garden', 'Riverfront', 'Iscon Cross Roads']
  },
  'sg-highway': {
    slug: 'sg-highway',
    name: 'SG Highway',
    areaDescription: 'Sarkhej-Gandhinagar (SG) Highway is the epicenter of luxury, high-energy Garba in Ahmedabad. Lined with world-class clubs like YMCA, Rajpath, Karnavati, and Savvy Grounds, SG Highway attracts top singers and celebrity crowds.',
    topVenues: ['YMCA Club Grounds', 'Rajpath Lawn', 'Karnavati Club', 'Savvy Swaraaj Grounds', 'Crowne Plaza Lawn'],
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Garba Pass SG Highway Ahmedabad 2026 | Top SG Highway Events',
    metaDescription: 'Book Garba Passes for SG Highway Ahmedabad 2026. Explore YMCA Club, Rajpath Club & Karnavati Garba passes online.',
    landmarks: ['YMCA Club', 'Iscon Mega Mall', 'Pakwan Cross Roads', 'Gota Flyover', 'Sola Bridge']
  },
  'bopal': {
    slug: 'bopal',
    name: 'Bopal & South Bopal',
    areaDescription: 'Bopal and South Bopal feature sprawling open green lawns and golf course Garba grounds. Perfect for families and couples who prefer spacious dancing circles and seamless parking.',
    topVenues: ['Gulmohar Greens Golf & Country Club', 'Vrindavan Garba Lawn Bopal', 'TRP Mall Ground Bopal', 'South Bopal Club Lawn'],
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Garba Pass Bopal Ahmedabad 2026 | Bopal Garba Tickets',
    metaDescription: 'Discover and book Garba Passes in Bopal & South Bopal Ahmedabad for Navratri 2026. Season passes & daily entry tickets available.',
    landmarks: ['Bopal 4 Rasta', 'SP Ring Road Bopal Flyover', 'South Bopal SAFAL Parisar', 'Gulmohar Greens']
  },
  'south-bopal': {
    slug: 'south-bopal',
    name: 'South Bopal',
    areaDescription: 'South Bopal has emerged as a major residential Garba hub in West Ahmedabad, featuring vibrant club grounds and family-friendly security.',
    topVenues: ['South Bopal Cultural Ground', 'Gulmohar Greens Golf Club', 'Safal Square Lawn'],
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Garba Pass South Bopal Ahmedabad 2026 | Daily & Season Tickets',
    metaDescription: 'Book South Bopal Garba passes and season tickets for Navratri 2026 online.',
    landmarks: ['Sobha City Bopal', 'Gala Gymkhana Road', 'SP Ring Road']
  },
  'satellite': {
    slug: 'satellite',
    name: 'Satellite',
    areaDescription: 'Satellite is home to classic Garba venues like Rajpath Club and Shivranjani Grounds. Known for premium traditional attire displays, star singer performances, and gourmet food courts.',
    topVenues: ['Rajpath Club Lawn', 'Shivranjani Garba Ground', 'Seema Hall Lawn', 'Fun Republic Ground'],
    heroImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Garba Pass Satellite Ahmedabad 2026 | Book Tickets Online',
    metaDescription: 'Book Garba passes in Satellite Ahmedabad for 2026. Check prices for Rajpath Club and Satellite venues.',
    landmarks: ['Star Bazaar Satellite', 'Shivranjani Cross Roads', 'Iscon Temple', 'Satellite Road']
  },
  'prahlad-nagar': {
    slug: 'prahlad-nagar',
    name: 'Prahlad Nagar',
    areaDescription: 'Prahlad Nagar hosts elite club Garba celebrations with pristine wooden flooring, high-tech LED lighting systems, and celebrity guest appearances.',
    topVenues: ['Karnavati Club Golden Lawn', 'Prahlad Nagar Garden Arena', 'Corporate Road Grounds'],
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Garba Pass Prahlad Nagar Ahmedabad 2026 | Book Online',
    metaDescription: 'Get official Garba passes in Prahlad Nagar Ahmedabad for Navratri 2026. VIP passes, daily passes, and parking info.',
    landmarks: ['Prahlad Nagar Garden', 'Corporate Road', 'Karnavati Club', 'Shyamal Cross Roads']
  },
  'thaltej': {
    slug: 'thaltej',
    name: 'Thaltej',
    areaDescription: 'Thaltej boasts the legendary GMDC Exhibition Ground - home to the official state Govt Vibrant Gujarat Navratri Mahotsav with massive crowd capacities.',
    topVenues: ['GMDC Exhibition Ground', 'Thaltej Metro Arena', 'Sindhu Bhavan Road Lawns'],
    heroImage: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Garba Pass Thaltej Ahmedabad 2026 | GMDC Ground Tickets',
    metaDescription: 'Book official Garba passes for Thaltej & GMDC Ground Ahmedabad 2026 online. Fast track QR pass instant delivery.',
    landmarks: ['Thaltej Metro Station', 'Sindhu Bhavan Road', 'Drive-In Cinema', 'GMDC Ground']
  },
  'gota': {
    slug: 'gota',
    name: 'Gota',
    areaDescription: 'Gota is a booming North Ahmedabad Garba destination along SG Highway, popular among youth and university students for high-energy Dodhiya Garba.',
    topVenues: ['Savvy Swaraaj Sports Arena', 'Gota Flyover Grounds', 'Vandemataram Garba Lawn'],
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Garba Pass Gota Ahmedabad 2026 | Gota Garba Tickets',
    metaDescription: 'Book Garba passes in Gota Ahmedabad for 2026. Explore Savvy Swaraaj and SG Highway Gota event passes.',
    landmarks: ['Gota Bridge', 'Vandemataram Arcade', 'Silver Oak University', 'SG Highway Gota']
  },
  'maninagar': {
    slug: 'maninagar',
    name: 'Maninagar',
    areaDescription: 'Maninagar in East Ahmedabad offers vibrant traditional Sheri and Commercial Garba near Kankaria Lake with deep cultural roots.',
    topVenues: ['Kankaria Lakefront Garba Ground', 'Maninagar Club Lawn', 'Jawahar Chowk Arena'],
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Garba Pass Maninagar Ahmedabad 2026 | East Ahmedabad Garba',
    metaDescription: 'Book Garba passes for Maninagar Ahmedabad 2026. Kankaria Lakefront & East Ahmedabad Navratri tickets.',
    landmarks: ['Kankaria Lake', 'Maninagar Railway Station', 'Jawahar Chowk']
  },
  'chandkheda': {
    slug: 'chandkheda',
    name: 'Chandkheda',
    areaDescription: 'Chandkheda provides high-energy traditional Garba events close to Visat Circle and VTU University grounds.',
    topVenues: ['Visat Ground Chandkheda', 'ONGC Officers Club Lawn', '44 Foot Road Arena'],
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Garba Pass Chandkheda Ahmedabad 2026 | Book Online',
    metaDescription: 'Book online Garba passes in Chandkheda Ahmedabad for Navratri 2026.',
    landmarks: ['Visat Petrol Pump', 'ONGC Colony', 'Chandkheda Circle']
  },
  'gandhinagar': {
    slug: 'gandhinagar',
    name: 'Gandhinagar',
    areaDescription: 'Gujarat\'s green capital Gandhinagar hosts serene and grand cultural Garba events across Sector 11, Sector 28, and GIFT City.',
    topVenues: ['Sector 11 Cultural Ground', 'GIFT City Garba Lawn', 'Sector 28 Garden Arena'],
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Garba Pass Gandhinagar 2026 | Navratri Tickets & Passes',
    metaDescription: 'Book Garba Passes for Gandhinagar 2026. Sector 11 & GIFT City Navratri passes online.',
    landmarks: ['Sector 11 Central Park', 'GIFT City', 'Mahatma Mandir', 'Infocity']
  },
  'vadodara': {
    slug: 'vadodara',
    name: 'Vadodara (Baroda)',
    areaDescription: 'Vadodara is legendary for United Way Garba - the world\'s largest single Garba circle with over 30,000 dancers.',
    topVenues: ['United Way Garba Ground (Navlakhi)', 'Makaipura Cultural Grounds', 'LVP Palace Lawn'],
    heroImage: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Navratri Garba Pass Vadodara 2026 | United Way & Baroda Passes',
    metaDescription: 'Book Navratri Garba Passes for Vadodara 2026. United Way Baroda passes and season tickets available.',
    landmarks: ['Navlakhi Ground', 'Laxmi Vilas Palace', 'Alkapuri', 'Sayajigunj']
  },
  'surat': {
    slug: 'surat',
    name: 'Surat',
    areaDescription: 'Surat Garba nights are famous for opulent ethnic fashion, energetic rhythm, and world-class diamond city hospitality.',
    topVenues: ['Sarsana Dome Ground', 'Dumas Road Garba Arena', 'Vesu Club Lawns'],
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'Navratri Garba Pass Surat 2026 | Book Tickets Online',
    metaDescription: 'Book official Garba Passes in Surat for 2026. Vesu, Dumas Road, and Sarsana Dome Navratri passes.',
    landmarks: ['Dumas Road', 'Vesu Cross Roads', 'Sarsana International Exhibition Center']
  }
};
