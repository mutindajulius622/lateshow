// Mock API functions
export const getDestinations = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: 1,
      name: "Serengeti Luxury Lodge",
      category: "hotel",
      location: "Serengeti, Tanzania",
      price: 350,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      description: "Experience wildlife like never before with our luxury safari lodge in the heart of Serengeti. Wake up to breathtaking views and enjoy guided game drives with experienced rangers.",
      amenities: ["Infinity Pool", "Luxury Spa", "Fine Dining Restaurant", "Free WiFi", "Game Drives", "Bar", "Conference Facilities", "Air Conditioning"],
      transport: [
        { 
          type: "flight", 
          name: "Charter Flight", 
          cost: 450, 
          duration: "2 hours", 
          icon: "✈️",
          features: ["Direct flight from airport", "Luggage included", "Refreshments served", "Scenic route"]
        },
        { 
          type: "car-rental", 
          name: "4x4 Safari Vehicle", 
          cost: 120, 
          duration: "6 hours", 
          icon: "🚙",
          features: ["Self-drive option", "Professional guide available", "Off-road capable", "Insurance included"]
        }
      ],
      contact: {
        phone: "+255-789-456-123",
        email: "bookings@serengetilodge.com",
        website: "www.serengetiluxurylodge.com"
      }
    },
    {
      id: 2,
      name: "Maasai Mara Game Reserve",
      category: "game-park",
      location: "Narok, Kenya",
      price: 280,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400",
      description: "Witness the great migration and encounter the Big Five in one of Africa's most famous game reserves. Professional guides ensure an unforgettable safari experience.",
      amenities: ["Guided Safari Tours", "Luxury Tented Camp", "Wildlife Photography", "Bird Watching", "Cultural Visits", "Night Drives"],
      transport: [
        { 
          type: "flight", 
          name: "Domestic Flight", 
          cost: 320, 
          duration: "1.5 hours", 
          icon: "✈️",
          features: ["Daily flights", "Luggage allowance", "Airport transfers"]
        },
        { 
          type: "bus", 
          name: "Luxury Coach", 
          cost: 85, 
          duration: "5 hours", 
          icon: "🚌",
          features: ["Comfortable seating", "AC throughout", "Rest stops", "Entertainment system"]
        }
      ],
      contact: {
        phone: "+254-723-456-789",
        email: "info@maasaimara.com",
        website: "www.maasaimarareserve.com"
      }
    },
    {
      id: 3,
      name: "Zanzibar Beach Resort",
      category: "resort",
      location: "Zanzibar, Tanzania",
      price: 420,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
      description: "Pristine white sand beaches, crystal clear turquoise waters, and luxury accommodation in paradise. Perfect for honeymooners and family vacations.",
      amenities: ["Private Beach", "Luxury Spa", "Water Sports", "Fine Dining", "Swimming Pools", "Kids Club", "Fitness Center", "Beach Bar"],
      transport: [
        { 
          type: "flight", 
          name: "International Flight", 
          cost: 600, 
          duration: "2 hours", 
          icon: "✈️",
          features: ["International airport", "Visa assistance", "Lounge access available"]
        },
        { 
          type: "boat", 
          name: "Speed Boat Transfer", 
          cost: 75, 
          duration: "30 minutes", 
          icon: "🚤",
          features: ["Private transfer", "Scenic coastal route", "Refreshments provided"]
        }
      ],
      contact: {
        phone: "+255-777-123-456",
        email: "reservations@zanzibarresort.com",
        website: "www.zanzibarluxuryresort.com"
      }
    },
    {
      id: 4,
      name: "Victoria Falls Adventure Park",
      category: "recreation",
      location: "Livingstone, Zambia",
      price: 180,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400",
      description: "Adventure activities and breathtaking views of one of the world's largest waterfalls. From gentle hikes to extreme sports, something for every adventurer.",
      amenities: ["Guided Hiking", "White Water Rafting", "Bungee Jumping", "Helicopter Tours", "Zip Lining", "Cultural Tours", "Photography Spots"],
      transport: [
        { 
          type: "flight", 
          name: "Regional Flight", 
          cost: 380, 
          duration: "1.5 hours", 
          icon: "✈️",
          features: ["Multiple daily flights", "Modern aircraft", "On-time performance"]
        },
        { 
          type: "train", 
          name: "Sleeper Train", 
          cost: 95, 
          duration: "8 hours", 
          icon: "🚂",
          features: ["Sleeping cabins", "Dining car", "Scenic route", "Comfortable beds"]
        },
        { 
          type: "bus", 
          name: "Express Bus", 
          cost: 65, 
          duration: "4 hours", 
          icon: "🚌",
          features: ["Direct service", "AC comfort", "Onboard entertainment", "Regular departures"]
        }
      ],
      contact: {
        phone: "+260-211-456-789",
        email: "bookings@victoriafalls.com",
        website: "www.victoriafallsadventure.com"
      }
    }
  ];
};

export const getNearbyDestinations = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 101,
      name: "Ngorongoro Crater",
      distance: "50 km",
      type: "game-park"
    },
    {
      id: 102,
      name: "Maasai Cultural Village",
      distance: "25 km",
      type: "cultural"
    },
    {
      id: 103,
      name: "Lake Manyara National Park",
      distance: "80 km",
      type: "recreation"
    },
    {
      id: 104,
      name: "Olduvai Gorge Museum",
      distance: "45 km",
      type: "cultural"
    }
  ];
};

export const getReviews = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: 1,
      destinationId: 1,
      author: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely incredible experience! The wildlife sightings were beyond expectations. The staff went above and beyond to make our stay memorable.",
      date: "2024-01-15"
    },
    {
      id: 2,
      destinationId: 1,
      author: "Mike Chen",
      rating: 4,
      comment: "Great lodge with amazing staff. Food was delicious and rooms were very comfortable. Would definitely recommend the sunrise game drive!",
      date: "2024-01-10"
    },
    {
      id: 3,
      destinationId: 2,
      author: "Emma Wilson",
      rating: 5,
      comment: "Once in a lifetime experience! Saw all the Big Five and the great migration was spectacular. Our guide was incredibly knowledgeable.",
      date: "2024-01-08"
    }
  ];
};