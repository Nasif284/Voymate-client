export interface CommunityTripItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  coverImage: string;
  gallery: string[];
  destination: {
    name: string;
    city: string;
    state: string;
    country: string;
  };
  community: {
    id: string;
    name: string;
    avatarUrl: string;
    verified: boolean;
    memberCount: string;
    rating: number;
    leader: string;
    leaderRole: string;
  };
  pricingType: "FREE" | "PAID";
  price?: number;
  currency?: string;
  priceNote?: string;
  category: "Camp" | "Trek & Expedition" | "Workation & Surf";
  dateFrom: string;
  dateTo: string;
  durationText: string;
  maxCapacity: number;
  joinedCount: number;
  tags: string[];
  vibe: string;
  inclusions: string[];
  exclusions: string[];
  requirements: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
  attendees: {
    id: string;
    name: string;
    avatarUrl: string;
    badge?: string;
  }[];
}

export const DUMMY_COMMUNITY_TRIPS: CommunityTripItem[] = [
  {
    id: "ct-1",
    title: "Strangers Camp in Yellappatti, Munnar",
    slug: "strangers-camp-yellappatti-munnar",
    tagline: "Pitch tents above floating cloud beds, cozy around pine bonfires, and bond with strangers in the misty Western Ghats.",
    description:
      "Perched at 6,000+ ft in the secluded hills of Yellappatti near Top Station, Munnar. This is an unfiltered gathering for solo travelers and strangers to unplug from city noise. Wake up surrounded by rolling tea gardens and sea-of-clouds, cook woodfire stew together under chilly 11°C starscapes, and hike to panoramic sunrise cliffs overlooking the Tamil Nadu border.",
    coverImage:
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop",
    ],
    destination: {
      name: "Yellappatti Valley",
      city: "Munnar",
      state: "Kerala",
      country: "India",
    },
    community: {
      id: "comm-1",
      name: "The Wanderers Circle",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      verified: true,
      memberCount: "3.2k mates",
      rating: 4.92,
      leader: "Arjun Nambiar",
      leaderRole: "Founder & Mountain Lead",
    },
    pricingType: "FREE",
    priceNote: "Free Community Entry (BYOT or shared ₹600 kitty for campsite fire & woodfire stew)",
    category: "Camp",
    dateFrom: "2026-10-17",
    dateTo: "2026-10-19",
    durationText: "3 Days / 2 Nights",
    maxCapacity: 16,
    joinedCount: 12,
    tags: ["Strangers Camp", "Yellappatti Clouds", "Bonfire Jam", "Munnar Trek"],
    vibe: "Sea of Clouds, Woodfire Stew & Acoustic Songs",
    inclusions: [
      "Designated private campsite pitch with panoramic valley vista",
      "Nightly firewood, campfire pit & community cooking setup",
      "Guided sunrise ridge trek to the Top Station border cliff",
      "Hot morning spiced tea & campfire stew supplies",
      "Safety equipment, first-aid kit & resident campsite marshal",
    ],
    exclusions: [
      "Personal camping gear (BYOT - Bring Your Own Tent / sleeping bag)",
      "Transportation to Yellappatti base camp (carpooling arranged in chat)",
      "Personal snacks & drinks",
    ],
    requirements: [
      "Open mindset to connect and share stories with strangers",
      "Strict 'Leave No Trace' mountain ethics (Zero Plastic)",
      "Warm thermal layers (temperatures drop to 10°C at night)",
    ],
    itinerary: [
      {
        day: 1,
        title: "Tea Valley Ascent, Pitching Tents & Campfire Icebreakers",
        description:
          "Assemble at Yellappatti base by 3:00 PM. Hike through emerald tea shrubs to the elevated campsite. Pitch tents together, warm up with hot cardamom chai, and kick off the evening with our signature 'Strangers Anonymous' storytelling circle.",
        activities: [
          "3:00 PM: Tea estate trail walk & arrival at campsite",
          "4:30 PM: Communal tent pitching & sleeping bag setup",
          "6:30 PM: Sunset mist descent & campfire lighting",
          "8:00 PM: Woodfire dinner cookout & open acoustic jam session",
        ],
      },
      {
        day: 2,
        title: "Sea-of-Clouds Sunrise Hike & Secret Mountain Stream",
        description:
          "Wake at 5:30 AM to watch the mesmerizing sea-of-clouds blanket the valley beneath your feet. Post breakfast, trek through pine forests to a crystal clear freshwater mountain stream for a refreshing dip.",
        activities: [
          "5:45 AM: Sunrise vantage point overlooking Tamil Nadu plains",
          "8:30 AM: Camp brewed Kerala filter coffee & hot appams",
          "10:30 AM: Forest trek to hidden natural cascade & stream",
          "4:00 PM: Hammock chill, sketch sessions & travel book exchange",
          "7:30 PM: Night barbecue, astrophotography & deep life talks",
        ],
      },
      {
        day: 3,
        title: "Misty Sunrise Tea, Polaroid Keepsakes & Munnar Departure",
        description:
          "Final slow morning sipping hot tea overlooking the cloud peaks. Pack up the campsite together, snap group polaroids, and exchange contacts before descending.",
        activities: [
          "7:00 AM: Final sunrise view over the tea slopes",
          "9:00 AM: Community camp breakfast & clean-up drive",
          "11:00 AM: Group polaroids, hugs, and depart as lifelong mates",
        ],
      },
    ],
    attendees: [
      {
        id: "att-1",
        name: "Devika Roy",
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        badge: "Solo Voyager",
      },
      {
        id: "att-2",
        name: "Rahul Verma",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        badge: "Guitarist",
      },
      {
        id: "att-3",
        name: "Meera Krishnan",
        avatarUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        badge: "Photographer",
      },
      {
        id: "att-4",
        name: "Zeeshan Khan",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        badge: "Camp Chef",
      },
    ],
  },
  {
    id: "ct-2",
    title: "Meghalaya: Living Root Bridges, Sacred Caves & Dawki Waters",
    slug: "meghalaya-living-root-bridges-expedition",
    tagline: "An all-inclusive 5-day mountain odyssey across rain-kissed ridges and crystal rivers.",
    description:
      "A deeply curated expedition into the heart of the Khasi hills. Hike down 3,500 steps to the iconic Double Decker Living Root Bridge, kayak in the translucent waters of Umngot River at Dawki, explore Mawmluh limestone caves with headlamps, and sleep in cozy traditional bamboo homestays.",
    coverImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    ],
    destination: {
      name: "Sohra & Dawki",
      city: "Cherrapunji",
      state: "Meghalaya",
      country: "India",
    },
    community: {
      id: "comm-2",
      name: "Northeast Nomads Club",
      avatarUrl:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80",
      verified: true,
      memberCount: "5.8k mates",
      rating: 4.95,
      leader: "Banrap Lyngdoh",
      leaderRole: "Certified Alpine & Caving Guide",
    },
    pricingType: "PAID",
    price: 14999,
    currency: "INR",
    priceNote: "All-inclusive: Stays, Meals, Local Transfers, Guides & Permits",
    category: "Trek & Expedition",
    dateFrom: "2026-11-05",
    dateTo: "2026-11-10",
    durationText: "5 Days / 4 Nights",
    maxCapacity: 12,
    joinedCount: 9,
    tags: ["Living Root Bridges", "Dawki Kayaking", "Caving Expedition", "Khasi Culture"],
    vibe: "Adventure, Geological Wonders & Deep Culture",
    inclusions: [
      "4 nights boutique bamboo homestays & heritage village stay",
      "All breakfasts & dinners featuring authentic Khasi delicacies",
      "Guwahati to Guwahati private SUV transport throughout",
      "Certified local Khasi spelunking guides, safety harnesses & entry permits",
      "Dawki private boating & kayaking sessions",
    ],
    exclusions: [
      "Flight tickets to/from Guwahati Airport (GAU)",
      "Lunches & personal café stops",
      "Emergency medical or travel insurance",
    ],
    requirements: [
      "Good cardiovascular fitness (3,500 staircase descent & ascent)",
      "Sturdy waterproof trekking shoes with strong grip",
      "Government photo ID for border checkposts",
    ],
    itinerary: [
      {
        day: 1,
        title: "Guwahati to Shillong: Cloud Nine Drive & Café Hop",
        description:
          "Pick-up at Guwahati Airport. Scenic drive to the Scottish Highlands of the East. Evening rock music café dinner in Shillong.",
        activities: [
          "11:00 AM: Airport pickup & Umiam Lake viewpoint",
          "3:30 PM: Check-in at Shillong boutique stay",
          "7:00 PM: Café evening with live indie acoustic performances",
        ],
      },
      {
        day: 2,
        title: "Cherrapunji: 3,500 Steps to Nongriat Living Root Bridges",
        description:
          "Hike down into the ancient lush subtropical valley to witness the UNESCO-heritage Double Decker Living Root Bridge and Rainbow Falls.",
        activities: [
          "6:30 AM: Drive to Tyrna village",
          "8:00 AM: Descent through suspension rope bridges",
          "1:00 PM: Rainbow Falls natural turquoise lagoon swim",
          "6:00 PM: Village homestay dinner with warm bamboo soup",
        ],
      },
      {
        day: 3,
        title: "Mawmluh Limestone Cave Exploration & Waterfalls",
        description:
          "Equip headlamps and caving overalls to navigate through surreal stalactite and stalagmite rock chambers.",
        activities: [
          "8:30 AM: Caving safety briefing & helmet gear fit",
          "10:00 AM: Mawmluh subterranean passage exploration",
          "3:30 PM: Nohkalikai Falls viewpoint & sunset tea",
        ],
      },
      {
        day: 4,
        title: "Dawki Umngot River Kayaking & Indo-Bangla Border",
        description:
          "Boating on water so clear boats seem to float on thin air. Camping along riverside pebble shores.",
        activities: [
          "8:00 AM: Scenic drive via Mawlynnong (Cleanest Village)",
          "11:30 AM: Glass river kayaking & cliff jump",
          "7:00 PM: Riverbank barbecue under open sky",
        ],
      },
      {
        day: 5,
        title: "Krang Suri Waterfalls & Guwahati Departure",
        description:
          "Morning dip in the electric blue Krang Suri falls before driving back to Guwahati airport.",
        activities: [
          "8:00 AM: Krang Suri waterfalls visit",
          "2:00 PM: Drop off at Guwahati Airport with lifelong memories",
        ],
      },
    ],
    attendees: [
      {
        id: "att-5",
        name: "Karan Johar Sharma",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
        badge: "Trekker",
      },
      {
        id: "att-6",
        name: "Shreya Ghoshal K.",
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        badge: "Photographer",
      },
      {
        id: "att-7",
        name: "Aditya Roy",
        avatarUrl:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
        badge: "Explorer",
      },
    ],
  },
  {
    id: "ct-3",
    title: "Goa Sunset Surf & Remote Workation Retreat",
    slug: "goa-sunset-surf-workation-retreat",
    tagline: "Morning waves, midday deep work, and evening beach sundowners with fellow creators.",
    description:
      "A 4-day boutique coastal residency for remote workers, designers, indie hackers, and adventurous souls. We stay in a lush Portuguese villa with high-speed 300 Mbps Wi-Fi, catch waves during morning surf clinics with certified ISA coaches, and unwind at sunset catamaran mixers.",
    coverImage:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    ],
    destination: {
      name: "Ashwem & Mandrem",
      city: "North Goa",
      state: "Goa",
      country: "India",
    },
    community: {
      id: "comm-3",
      name: "Voymate Digital Nomads",
      avatarUrl:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
      verified: true,
      memberCount: "8.1k mates",
      rating: 4.92,
      leader: "Tanya Kapoor",
      leaderRole: "Head of Remote Community",
    },
    pricingType: "PAID",
    price: 8499,
    currency: "INR",
    priceNote: "Includes Villa Stay, 3 Surf Sessions + Board, High-speed Co-working & Dinners",
    category: "Workation & Surf",
    dateFrom: "2026-10-24",
    dateTo: "2026-10-28",
    durationText: "4 Days / 3 Nights",
    maxCapacity: 20,
    joinedCount: 14,
    tags: ["Surf Lessons", "High-Speed Coworking", "Beachside Villa", "Catamaran Sunset"],
    vibe: "Ocean Waves, Focus Sprints & Sunset Mixers",
    inclusions: [
      "3 nights in Portuguese heritage luxury villa with swimming pool",
      "3 certified ISA surf coaching sessions with rashguards and board rentals",
      "Dedicated air-conditioned ergonomic workspace with dual 300Mbps fiber lines",
      "Daily artisan breakfast buffet and 2 curated community villa dinners",
      "Sunset catamaran cruise along Chapora bay with drinks",
    ],
    exclusions: [
      "Transport to Goa (Flights/Train)",
      "Daily scooter/car rentals (available on-site for ₹400/day)",
      "Personal café expenses",
    ],
    requirements: [
      "Must know basic swimming (or comfortable in waist-deep water)",
      "Laptop/work setup if co-working during day",
    ],
    itinerary: [
      {
        day: 1,
        title: "Villa Check-in, Welcome Kokum Spritz & Workspace Setup",
        description:
          "Arrive by 2 PM. Settle into private rooms, tour the villa workspace, and join our welcome sundowner pool mixer with fresh sourdough pizzas.",
        activities: [
          "2:00 PM: Check-in & iced brew station",
          "5:30 PM: Sunset walk along Ashwem quiet shores",
          "7:30 PM: Poolside sourdough pizza night & icebreakers",
        ],
      },
      {
        day: 2,
        title: "Catching First Waves & Coworking Power Sprint",
        description:
          "7 AM beach surf session learning paddle technique and pop-ups. Midday focused work sessions, followed by evening beach volleyball.",
        activities: [
          "7:00 AM: Surf Lesson 1 (Beach sand pop-ups & ocean break)",
          "11:00 AM: Focus co-working sprint with barista coffee",
          "5:00 PM: Beach volleyball & sunset coconuts",
        ],
      },
      {
        day: 3,
        title: "Sunrise Surf, Mastermind Talks & Sunset Catamaran",
        description:
          "Ride green waves with personal coaching footage review. Afternoon community show-and-tell talk, culminating in an exclusive catamaran cruise.",
        activities: [
          "7:00 AM: Surf Lesson 2 & GoPro video analysis",
          "2:00 PM: Lightning talks: AI tools, remote lifestyle & travel hacks",
          "5:00 PM: Private catamaran yacht cruise with music",
        ],
      },
      {
        day: 4,
        title: "Final Ocean Dip, Community Awards & Farewell",
        description:
          "Celebration breakfast, handover of surf certificates and photos, and checkout by noon with option to extend stay.",
        activities: [
          "7:30 AM: Free surf session or beach yoga",
          "9:30 AM: Big farewell brunch & certificate giveaway",
          "12:00 PM: Checkout & airport drops",
        ],
      },
    ],
    attendees: [
      {
        id: "att-8",
        name: "Ananya Deshmukh",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        badge: "Product Designer",
      },
      {
        id: "att-9",
        name: "Siddharth Sen",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        badge: "Full-Stack Dev",
      },
      {
        id: "att-10",
        name: "Ritika Mehta",
        avatarUrl:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
        badge: "Travel Writer",
      },
    ],
  },
];
