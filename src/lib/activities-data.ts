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
    title: "Sáng đi biển cùng chủ A",
    titleEn: "Morning Beach with Guide A",
    description: "Trải nghiệm bình minh tuyệt đẹp tại bãi biển",
    descriptionEn: "Experience beautiful sunrise at the beach",
    price: 500000,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    duration: "4 giờ",
    location: "Nha Trang",
    rating: 4.8,
    reviews: 124,
    guideInfo: {
      name: "Minh Tuấn",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      bio: "Hướng dẫn viên chuyên nghiệp với 8 năm kinh nghiệm",
      experience: "8 năm kinh nghiệm"
    },
    destinations: ["Bãi Dài", "Hòn Chồng", "Vinpearl"],
    advice: [
      "Mang theo kem chống nắng",
      "Đến sớm để ngắm bình minh",
      "Mặc đồ thoải mái"
    ],
    detailedInfo: {
      schedule: "5:00 AM - 9:00 AM",
      included: ["Xe đưa đón", "Bữa sáng nhẹ", "Hướng dẫn viên"],
      excluded: ["Chi phí cá nhân", "Bảo hiểm"],
      requirements: ["Sức khỏe tốt", "Biết bơi cơ bản"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Thùy Linh",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        rating: 5,
        date: "15/03/2024",
        comment: "Trải nghiệm tuyệt vời! Cảnh đẹp và hướng dẫn viên nhiệt tình.",
        images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"]
      },
      {
        id: "2",
        name: "Văn An",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
        rating: 5,
        date: "10/03/2024",
        comment: "Đáng đồng tiền bát gạo. Sẽ quay lại lần sau!",
        images: ["https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 12.2388, lng: 109.1967 }
  },
  {
    id: "2",
    title: "Học làm gốm Bàu Trúc",
    titleEn: "Bau Truc Pottery Making",
    description: "Học nghệ thuật làm gốm truyền thống",
    descriptionEn: "Learn traditional pottery making",
    price: 300000,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop",
    duration: "3 giờ",
    location: "Ninh Thuận",
    rating: 4.7,
    reviews: 89,
    guideInfo: {
      name: "Bà Thu",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      bio: "Nghệ nhân gốm với hơn 30 năm kinh nghiệm",
      experience: "30 năm kinh nghiệm"
    },
    destinations: ["Làng gốm Bàu Trúc", "Chợ địa phương"],
    advice: [
      "Mặc quần áo thoải mái, có thể bẩn",
      "Chuẩn bị tinh thần làm việc tay",
      "Mang theo camera để ghi lại kỷ niệm"
    ],
    detailedInfo: {
      schedule: "2:00 PM - 5:00 PM",
      included: ["Vật liệu làm gốm", "Hướng dẫn", "Sản phẩm mang về"],
      excluded: ["Đồ ăn uống", "Vận chuyển"],
      requirements: ["Từ 8 tuổi trở lên"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Mai Anh",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
        rating: 5,
        date: "20/03/2024",
        comment: "Trải nghiệm văn hóa tuyệt vời. Rất thích!",
        images: ["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 11.5753, lng: 108.9890 }
  },
  {
    id: "3",
    title: "Chèo SUP Nước Hoàng Hôn",
    titleEn: "Sunset SUP Paddling",
    description: "Chèo thuyền SUP ngắm hoàng hôn trên biển",
    descriptionEn: "SUP paddling while watching sunset",
    price: 450000,
    image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800&h=600&fit=crop",
    duration: "2 giờ",
    location: "Đà Nẵng",
    rating: 4.9,
    reviews: 156,
    guideInfo: {
      name: "Hoàng Long",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
      bio: "Huấn luyện viên SUP chuyên nghiệp",
      experience: "5 năm kinh nghiệm"
    },
    destinations: ["Bãi biển Mỹ Khê", "Cầu Rồng"],
    advice: [
      "Biết bơi cơ bản",
      "Mang theo áo phao",
      "Đến đúng giờ để không lỡ hoàng hôn"
    ],
    detailedInfo: {
      schedule: "5:00 PM - 7:00 PM",
      included: ["Thiết bị SUP", "Áo phao", "Hướng dẫn viên", "Nước uống"],
      excluded: ["Bảo hiểm", "Ảnh chụp"],
      requirements: ["Biết bơi", "Từ 12 tuổi trở lên", "Sức khỏe tốt"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Quốc Anh",
        avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop",
        rating: 5,
        date: "25/03/2024",
        comment: "Cảnh hoàng hôn tuyệt đẹp! Trải nghiệm đáng nhớ.",
        images: ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 16.0544, lng: 108.2022 }
  },
  {
    id: "4",
    title: "Trekking Sapa Chinh Phục",
    titleEn: "Sapa Trekking Adventure",
    description: "Leo núi và khám phá ruộng bậc thang",
    descriptionEn: "Mountain trekking and rice terrace exploration",
    price: 800000,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop",
    duration: "1 ngày",
    location: "Sapa, Lào Cai",
    rating: 4.8,
    reviews: 203,
    guideInfo: {
      name: "Ly Chá",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop",
      bio: "Người dân tộc H'Mông địa phương",
      experience: "10 năm kinh nghiệm"
    },
    destinations: ["Cát Cát", "Y Linh Hồ", "Lao Chải", "Tả Van"],
    advice: [
      "Mang giày trekking tốt",
      "Chuẩn bị áo ấm",
      "Mang theo thuốc cá nhân"
    ],
    detailedInfo: {
      schedule: "7:00 AM - 5:00 PM",
      included: ["Hướng dẫn viên", "Bữa trưa", "Xe đưa đón", "Nước suối"],
      excluded: ["Bảo hiểm", "Chi phí cá nhân"],
      requirements: ["Sức khỏe tốt", "Thể lực tốt", "Từ 10 tuổi"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Phương Anh",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
        rating: 5,
        date: "01/04/2024",
        comment: "Ruộng bậc thang đẹp không thể tả! Hướng dẫn viên rất nhiệt tình.",
        images: ["https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 22.3364, lng: 103.8438 }
  },
  {
    id: "5",
    title: "Lặn Biển Ngắm San Hô",
    titleEn: "Coral Reef Diving",
    description: "Khám phá thế giới dưới biển đầy màu sắc",
    descriptionEn: "Explore the colorful underwater world",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    duration: "5 giờ",
    location: "Phú Quốc",
    rating: 4.9,
    reviews: 178,
    guideInfo: {
      name: "Tuấn Anh",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      bio: "Thợ lặn chuyên nghiệp PADI",
      experience: "12 năm kinh nghiệm"
    },
    destinations: ["Hòn Mây Rút", "Hòn Thơm", "Hòn Móng Tay"],
    advice: [
      "Phải có chứng chỉ lặn",
      "Không lặn nếu bị cảm",
      "Tuân thủ hướng dẫn an toàn"
    ],
    detailedInfo: {
      schedule: "8:00 AM - 1:00 PM",
      included: ["Thiết bị lặn", "Hướng dẫn viên", "Bữa trưa", "Bảo hiểm"],
      excluded: ["Ảnh/video dưới nước", "Chi phí cá nhân"],
      requirements: ["Chứng chỉ lặn", "Sức khỏe tốt", "Từ 15 tuổi"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Đức Trung",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop",
        rating: 5,
        date: "05/04/2024",
        comment: "San hô đẹp tuyệt vời! An toàn và chuyên nghiệp.",
        images: ["https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 10.2899, lng: 103.9840 }
  },
  {
    id: "6",
    title: "Chèo Kayak Vịnh Hạ Long",
    titleEn: "Ha Long Bay Kayaking",
    description: "Chèo kayak khám phá hang động kỳ thú",
    descriptionEn: "Kayak through mysterious caves",
    price: 650000,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
    duration: "6 giờ",
    location: "Hạ Long, Quảng Ninh",
    rating: 4.8,
    reviews: 245,
    guideInfo: {
      name: "Văn Hải",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop",
      bio: "Hướng dẫn viên kayak giàu kinh nghiệm",
      experience: "7 năm kinh nghiệm"
    },
    destinations: ["Hang Sửng Sốt", "Đảo Titop", "Làng chài Cửa Vạn"],
    advice: [
      "Mang theo áo khoác chống nước",
      "Bảo vệ thiết bị điện tử",
      "Đi giày chống trượt"
    ],
    detailedInfo: {
      schedule: "9:00 AM - 3:00 PM",
      included: ["Kayak", "Áo phao", "Hướng dẫn viên", "Bữa trưa", "Nước uống"],
      excluded: ["Bảo hiểm", "Chi phí cá nhân"],
      requirements: ["Biết bơi cơ bản", "Từ 10 tuổi"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Hồng Nhung",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
        rating: 5,
        date: "10/04/2024",
        comment: "Vịnh Hạ Long đẹp như tranh vẽ. Chèo kayak rất thú vị!",
        images: ["https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 20.9101, lng: 107.1839 }
  },
  {
    id: "7",
    title: "Bay Dù Lượn Mũi Né",
    titleEn: "Mui Ne Paragliding",
    description: "Trải nghiệm cảm giác bay trên không trung",
    descriptionEn: "Experience the feeling of flying in the air",
    price: 1500000,
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
    duration: "2 giờ",
    location: "Mũi Né, Bình Thuận",
    rating: 4.9,
    reviews: 134,
    guideInfo: {
      name: "Minh Quân",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
      bio: "Phi công dù lượn chuyên nghiệp",
      experience: "9 năm kinh nghiệm"
    },
    destinations: ["Đồi cát bay", "Bãi biển Mũi Né"],
    advice: [
      "Kiểm tra thời tiết trước",
      "Không bay nếu sợ độ cao",
      "Mặc quần áo thoải mái"
    ],
    detailedInfo: {
      schedule: "7:00 AM - 9:00 AM hoặc 4:00 PM - 6:00 PM",
      included: ["Thiết bị bay", "Bảo hiểm", "Hướng dẫn viên", "Video bay"],
      excluded: ["Đồ ăn uống", "Vận chuyển"],
      requirements: ["Cân nặng dưới 100kg", "Từ 16 tuổi", "Không sợ độ cao"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Bảo Long",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        rating: 5,
        date: "15/04/2024",
        comment: "Cảm giác bay thật tuyệt vời! An toàn và chuyên nghiệp.",
        images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 10.9333, lng: 108.2833 }
  },
  {
    id: "8",
    title: "Đi Xe Đạp Cù Lao Chàm",
    titleEn: "Cu Lao Cham Cycling",
    description: "Đạp xe vòng quanh đảo nguyên sơ",
    descriptionEn: "Cycle around the pristine island",
    price: 400000,
    image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&h=600&fit=crop",
    duration: "1 ngày",
    location: "Cù Lao Chàm, Hội An",
    rating: 4.7,
    reviews: 167,
    guideInfo: {
      name: "Thanh Tùng",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      bio: "Hướng dẫn viên địa phương",
      experience: "6 năm kinh nghiệm"
    },
    destinations: ["Bãi Chồng", "Bãi Ông", "Làng chài Cù Lao Chàm"],
    advice: [
      "Mang theo kem chống nắng",
      "Uống nhiều nước",
      "Mặc quần áo thoải mái"
    ],
    detailedInfo: {
      schedule: "7:00 AM - 4:00 PM",
      included: ["Xe đạp", "Phà đi-về", "Bữa trưa", "Hướng dẫn viên"],
      excluded: ["Chi phí cá nhân", "Bảo hiểm"],
      requirements: ["Biết đạp xe", "Từ 8 tuổi"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Thu Hà",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
        rating: 5,
        date: "20/04/2024",
        comment: "Đảo đẹp và yên bình. Đạp xe rất dễ chịu!",
        images: ["https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 15.9533, lng: 108.5097 }
  },
  {
    id: "9",
    title: "Leo Núi Đá Fansipan",
    titleEn: "Fansipan Mountain Climbing",
    description: "Chinh phục nóc nhà Đông Dương",
    descriptionEn: "Conquer the Roof of Indochina",
    price: 2000000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    duration: "2 ngày",
    location: "Fansipan, Lào Cai",
    rating: 4.8,
    reviews: 189,
    guideInfo: {
      name: "Sơn Tùng",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
      bio: "Hướng dẫn viên leo núi chuyên nghiệp",
      experience: "15 năm kinh nghiệm"
    },
    destinations: ["Đỉnh Fansipan", "Rừng tre", "Trạm dừng chân"],
    advice: [
      "Chuẩn bị thể lực tốt",
      "Mang đồ leo núi chuyên dụng",
      "Kiểm tra thời tiết trước"
    ],
    detailedInfo: {
      schedule: "2 ngày 1 đêm",
      included: ["Hướng dẫn viên", "Bữa ăn", "Lều trại", "Thiết bị leo núi"],
      excluded: ["Bảo hiểm", "Chi phí cá nhân"],
      requirements: ["Thể lực tốt", "Từ 16 tuổi", "Kinh nghiệm leo núi"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Minh Hoàng",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        rating: 5,
        date: "25/04/2024",
        comment: "Chuyến đi khó khăn nhưng đáng giá. Phong cảnh tuyệt đẹp!",
        images: ["https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 22.3021, lng: 103.7751 }
  },
  {
    id: "10",
    title: "Thuyền Thúng Hội An",
    titleEn: "Hoi An Basket Boat",
    description: "Chèo thuyền thúng trên rừng dừa",
    descriptionEn: "Paddle basket boat in coconut forest",
    price: 350000,
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop",
    duration: "3 giờ",
    location: "Hội An, Quảng Nam",
    rating: 4.9,
    reviews: 312,
    guideInfo: {
      name: "Cô Ba",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      bio: "Nghệ nhân chèo thuyền thúng lão làng",
      experience: "25 năm kinh nghiệm"
    },
    destinations: ["Rừng dừa Bảy Mẫu", "Làng rau Trà Quế"],
    advice: [
      "Mang theo mũ và kem chống nắng",
      "Chuẩn bị camera chống nước",
      "Mặc áo phao"
    ],
    detailedInfo: {
      schedule: "8:00 AM - 11:00 AM hoặc 2:00 PM - 5:00 PM",
      included: ["Thuyền thúng", "Áo phao", "Hướng dẫn viên", "Nước dừa"],
      excluded: ["Đồ ăn nhẹ", "Vận chuyển"],
      requirements: ["Không cần biết bơi", "Từ 5 tuổi"]
    },
    customerReviews: [
      {
        id: "1",
        name: "Kim Anh",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop",
        rating: 5,
        date: "30/04/2024",
        comment: "Trải nghiệm văn hóa độc đáo! Rất vui và thú vị.",
        images: ["https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop"]
      }
    ],
    mapLocation: { lat: 15.8801, lng: 108.3380 }
  }
]
