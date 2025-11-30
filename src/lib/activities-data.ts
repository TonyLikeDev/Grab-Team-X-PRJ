export interface Activity {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  price: number
  image: string
  duration: string
  location: string
  rating: number
  reviews: number
  guideInfo: {
    name: string
    avatar: string
    bio: string
    experience: string
  }
  destinations: string[]
  advice: string[]
  detailedInfo: {
    schedule: string
    included: string[]
    excluded: string[]
    requirements: string[]
  }
  customerReviews: {
    id: string
    name: string
    avatar: string
    rating: number
    date: string
    comment: string
    images?: string[]
  }[]
  mapLocation: {
    lat: number
    lng: number
  }
}

export const activities: Activity[] = [
  {
    id: "1",
    title: "Go Fishing on a Round Boat",
    titleEn: "Go Fishing on a Round Boat",
    description: "Why is this experience meaningful to the community?\n\n• The traditional net fishing profession is gradually disappearing in Nam Ô\n• Participating in this experience helps fishermen gain stable income outside of the fishing season\n• Vietnamese and international guests have the opportunity to connect with the authentic life of a fisherman, with a commitment to non-commercialization\n• Each booking contributes 20,000 VND to the 'New Nets for Fishermen' fund",
    descriptionEn: "Why is this experience meaningful to the community?\n\n• The traditional net fishing profession is gradually disappearing in Nam Ô\n• Participating in this experience helps fishermen gain stable income outside of the fishing season\n• Vietnamese and international guests have the opportunity to connect with the authentic life of a fisherman, with a commitment to non-commercialization\n• Each booking contributes 20,000 VND to the 'New Nets for Fishermen' fund",
    price: 500000,
    image: "https://i.pinimg.com/1200x/dc/f9/0f/dcf90f7a1f908a656264afd0553d3fdb.jpg",
    duration: "4 hours",
    location: "Nha Trang",
    rating: 4.8,
    reviews: 124,
    guideInfo: {
      name: "Unc. Bay",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      bio: "I started going out to sea when I was 14. Setting out to sea every morning and returning to sell my catch at the market has been my familiar routine for 30 years. I opened up this experience to share the fishing profession that I have been so passionate about all this time. If anyone enjoys the feeling of the early morning sea and wants to understand how the people of Da Nang live, I invite you to join me for a session.",
      experience: "Fisherman, born and raised in Nam Ô "
    },
    destinations: ["Dai Beach", "Hon Chong", "Vinpearl"],
    advice: [
      "Bring sunscreen",
      "Arrive early to watch the sunrise",
      "Wear comfortable clothes"
    ],
    detailedInfo: {
      schedule: "5:00 AM - 9:00 AM",
      included: ["Transportation", "Light breakfast", "Guide"],
      excluded: ["Personal expenses", "Insurance"],
      requirements: ["Good health", "Basic swimming ability"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Thuy Linh",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        rating: 5,
        date: "15/03/2024",
        comment: "Wonderful experience! Beautiful scenery and enthusiastic guide.",
        images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"]
      },
      {
        id: "2",
        name: "Van An",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
        rating: 5,
        date: "10/03/2024",
        comment: "Worth every penny. Will come back next time!",
        images: ["https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 12.2388, lng: 109.1967 }
  },
  {
    id: "2",
    title: "Bau Truc Pottery Making",
    titleEn: "Bau Truc Pottery Making",
    description: "Learn traditional pottery making",
    descriptionEn: "Learn traditional pottery making",
    price: 300000,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop",
    duration: "3 hours",
    location: "Ninh Thuan",
    rating: 4.7,
    reviews: 89,
    guideInfo: {
      name: "Mrs. Thu",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      bio: "Pottery artisan with over 30 years of experience",
      experience: "30 years experience"
    },
    destinations: ["Bau Truc Pottery Village", "Local Market"],
    advice: [
      "Wear comfortable clothes, they may get dirty",
      "Be prepared for handwork",
      "Bring a camera to capture memories"
    ],
    detailedInfo: {
      schedule: "2:00 PM - 5:00 PM",
      included: ["Pottery materials", "Instruction", "Take-home product"],
      excluded: ["Food and drinks", "Transportation"],
      requirements: ["8 years old and up"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Mai Anh",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
        rating: 5,
        date: "20/03/2024",
        comment: "Wonderful cultural experience. Really loved it!",
        images: ["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 11.5753, lng: 108.9890 }
  },
  {
    id: "3",
    title: "Sunset SUP Paddling",
    titleEn: "Sunset SUP Paddling",
    description: "SUP paddling while watching sunset",
    descriptionEn: "SUP paddling while watching sunset",
    price: 450000,
    image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800&h=600&fit=crop",
    duration: "2 hours",
    location: "Da Nang",
    rating: 4.9,
    reviews: 156,
    guideInfo: {
      name: "Hoang Long",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
      bio: "Professional SUP instructor",
      experience: "5 years experience"
    },
    destinations: ["My Khe Beach", "Dragon Bridge"],
    advice: [
      "Basic swimming ability required",
      "Bring a life jacket",
      "Arrive on time to catch the sunset"
    ],
    detailedInfo: {
      schedule: "5:00 PM - 7:00 PM",
      included: ["SUP equipment", "Life jacket", "Guide", "Drinking water"],
      excluded: ["Insurance", "Photos"],
      requirements: ["Can swim", "12 years old and up", "Good health"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Quoc Anh",
        avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop",
        rating: 5,
        date: "25/03/2024",
        comment: "Beautiful sunset view! Unforgettable experience.",
        images: ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 16.0544, lng: 108.2022 }
  },
  {
    id: "4",
    title: "Sapa Trekking Adventure",
    titleEn: "Sapa Trekking Adventure",
    description: "Mountain trekking and rice terrace exploration",
    descriptionEn: "Mountain trekking and rice terrace exploration",
    price: 800000,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop",
    duration: "1 day",
    location: "Sapa, Lao Cai",
    rating: 4.8,
    reviews: 203,
    guideInfo: {
      name: "Ly Cha",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop",
      bio: "Local H'Mong ethnic guide",
      experience: "10 years experience"
    },
    destinations: ["Cat Cat", "Y Linh Ho", "Lao Chai", "Ta Van"],
    advice: [
      "Wear good trekking shoes",
      "Bring warm clothes",
      "Bring personal medications"
    ],
    detailedInfo: {
      schedule: "7:00 AM - 5:00 PM",
      included: ["Guide", "Lunch", "Transportation", "Spring water"],
      excluded: ["Insurance", "Personal expenses"],
      requirements: ["Good health", "Good fitness level", "10 years old and up"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Phuong Anh",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
        rating: 5,
        date: "01/04/2024",
        comment: "Beautiful rice terraces! Enthusiastic guide.",
        images: ["https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 22.3364, lng: 103.8438 }
  },
  {
    id: "5",
    title: "Coral Reef Diving",
    titleEn: "Coral Reef Diving",
    description: "Explore the colorful underwater world",
    descriptionEn: "Explore the colorful underwater world",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    duration: "5 hours",
    location: "Phu Quoc",
    rating: 4.9,
    reviews: 178,
    guideInfo: {
      name: "Tuan Anh",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      bio: "PADI certified professional diver",
      experience: "12 years experience"
    },
    destinations: ["Hon May Rut", "Hon Thom", "Hon Mong Tay"],
    advice: [
      "Diving certification required",
      "Do not dive if sick",
      "Follow safety guidelines"
    ],
    detailedInfo: {
      schedule: "8:00 AM - 1:00 PM",
      included: ["Diving equipment", "Guide", "Lunch", "Insurance"],
      excluded: ["Underwater photos/videos", "Personal expenses"],
      requirements: ["Diving certification", "Good health", "15 years old and up"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Duc Trung",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop",
        rating: 5,
        date: "05/04/2024",
        comment: "Beautiful corals! Safe and professional.",
        images: ["https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 10.2899, lng: 103.9840 }
  },
  {
    id: "6",
    title: "Ha Long Bay Kayaking",
    titleEn: "Ha Long Bay Kayaking",
    description: "Kayak through mysterious caves",
    descriptionEn: "Kayak through mysterious caves",
    price: 650000,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
    duration: "6 hours",
    location: "Ha Long, Quang Ninh",
    rating: 4.8,
    reviews: 245,
    guideInfo: {
      name: "Van Hai",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop",
      bio: "Experienced kayak guide",
      experience: "7 years experience"
    },
    destinations: ["Sung Sot Cave", "Titop Island", "Cua Van Fishing Village"],
    advice: [
      "Bring waterproof jacket",
      "Protect electronic devices",
      "Wear non-slip shoes"
    ],
    detailedInfo: {
      schedule: "9:00 AM - 3:00 PM",
      included: ["Kayak", "Life jacket", "Guide", "Lunch", "Drinking water"],
      excluded: ["Insurance", "Personal expenses"],
      requirements: ["Basic swimming ability", "10 years old and up"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Hong Nhung",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
        rating: 5,
        date: "10/04/2024",
        comment: "Ha Long Bay is beautiful like a painting. Kayaking is very fun!",
        images: ["https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 20.9101, lng: 107.1839 }
  },
  {
    id: "7",
    title: "Mui Ne Paragliding",
    titleEn: "Mui Ne Paragliding",
    description: "Experience the feeling of flying in the air",
    descriptionEn: "Experience the feeling of flying in the air",
    price: 1500000,
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
    duration: "2 hours",
    location: "Mui Ne, Binh Thuan",
    rating: 4.9,
    reviews: 134,
    guideInfo: {
      name: "Minh Quan",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
      bio: "Professional paraglider pilot",
      experience: "9 years experience"
    },
    destinations: ["Flying sand dune", "Mui Ne Beach"],
    advice: [
      "Check weather beforehand",
      "Do not fly if afraid of heights",
      "Wear comfortable clothes"
    ],
    detailedInfo: {
      schedule: "7:00 AM - 9:00 AM or 4:00 PM - 6:00 PM",
      included: ["Flight equipment", "Insurance", "Guide", "Flight video"],
      excluded: ["Food and drinks", "Transportation"],
      requirements: ["Weight under 100kg", "16 years old and up", "Not afraid of heights"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Bao Long",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        rating: 5,
        date: "15/04/2024",
        comment: "The feeling of flying is amazing! Safe and professional.",
        images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 10.9333, lng: 108.2833 }
  },
  {
    id: "8",
    title: "Cu Lao Cham Cycling",
    titleEn: "Cu Lao Cham Cycling",
    description: "Cycle around the pristine island",
    descriptionEn: "Cycle around the pristine island",
    price: 400000,
    image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&h=600&fit=crop",
    duration: "1 day",
    location: "Cu Lao Cham, Hoi An",
    rating: 4.7,
    reviews: 167,
    guideInfo: {
      name: "Thanh Tung",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      bio: "Local guide",
      experience: "6 years experience"
    },
    destinations: ["Chong Beach", "Ong Beach", "Cu Lao Cham Fishing Village"],
    advice: [
      "Bring sunscreen",
      "Drink plenty of water",
      "Wear comfortable clothes"
    ],
    detailedInfo: {
      schedule: "7:00 AM - 4:00 PM",
      included: ["Bicycle", "Ferry round trip", "Lunch", "Guide"],
      excluded: ["Personal expenses", "Insurance"],
      requirements: ["Able to ride a bicycle", "8 years old and up"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Thu Ha",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
        rating: 5,
        date: "20/04/2024",
        comment: "Beautiful and peaceful island. Cycling is very comfortable!",
        images: ["https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 15.9533, lng: 108.5097 }
  },
  {
    id: "9",
    title: "Fansipan Mountain Climbing",
    titleEn: "Fansipan Mountain Climbing",
    description: "Conquer the Roof of Indochina",
    descriptionEn: "Conquer the Roof of Indochina",
    price: 2000000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    duration: "2 days",
    location: "Fansipan, Lao Cai",
    rating: 4.8,
    reviews: 189,
    guideInfo: {
      name: "Son Tung",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
      bio: "Professional mountain climbing guide",
      experience: "15 years experience"
    },
    destinations: ["Fansipan Peak", "Bamboo forest", "Rest station"],
    advice: [
      "Build good fitness level",
      "Bring specialized climbing gear",
      "Check weather beforehand"
    ],
    detailedInfo: {
      schedule: "2 days 1 night",
      included: ["Guide", "Meals", "Tent", "Climbing equipment"],
      excluded: ["Insurance", "Personal expenses"],
      requirements: ["Good fitness level", "16 years old and up", "Mountain climbing experience"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Minh Hoang",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        rating: 5,
        date: "25/04/2024",
        comment: "Difficult trip but worth it. Beautiful scenery!",
        images: ["https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 22.3021, lng: 103.7751 }
  },
  {
    id: "10",
    title: "Hoi An Basket Boat",
    titleEn: "Hoi An Basket Boat",
    description: "Paddle basket boat in coconut forest",
    descriptionEn: "Paddle basket boat in coconut forest",
    price: 350000,
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop",
    duration: "3 hours",
    location: "Hoi An, Quang Nam",
    rating: 4.9,
    reviews: 312,
    guideInfo: {
      name: "Mrs. Ba",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      bio: "Master basket boat paddler",
      experience: "25 years experience"
    },
    destinations: ["Bay Mau Coconut Forest", "Tra Que Vegetable Village"],
    advice: [
      "Bring hat and sunscreen",
      "Prepare waterproof camera",
      "Wear life jacket"
    ],
    detailedInfo: {
      schedule: "8:00 AM - 11:00 AM or 2:00 PM - 5:00 PM",
      included: ["Basket boat", "Life jacket", "Guide", "Coconut water"],
      excluded: ["Light snacks", "Transportation"],
      requirements: ["Swimming not required", "5 years old and up"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Kim Anh",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop",
        rating: 5,
        date: "30/04/2024",
        comment: "Unique cultural experience! Very fun and interesting.",
        images: ["https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 15.8801, lng: 108.3380 }
  }
]
