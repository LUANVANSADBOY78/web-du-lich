export const MOCK_PRODUCTS = [
  // 1. ƯU ĐÃI NỔI BẬT & HOT
  {
    id: 1,
    name: "Vé Sun World Bà Nà Hills Đà Nẵng (Cáp treo & Buffet)",
    category: "cap-treo",
    categoryName: "Cáp treo",
    location: "Đà Nẵng",
    img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800"
    ],
    oldPrice: 950000,
    price: 750000,
    rating: 9.8,
    reviews: 320,
    booked: "4.8k",
    badge: "Flash Sale",
    isFeatured: true,
    features: [
      "⚡ Xác nhận đơn hàng tức thì",
      "✓ Không hoàn hủy hoặc thay đổi thông tin",
      "▣ Xuất trình QR code tại địa điểm"
    ],
    description: "Trải nghiệm cáp treo đạt nhiều kỷ lục thế giới, ngắm Cầu Vàng nổi tiếng toàn cầu và khám phá Làng Pháp cổ kính ngập tràn không khí châu Âu tại Sun World Bà Nà Hills.",
    highlights: ["Vé bao gồm cáp treo khứ hồi & Fantasy Park", "Chiêm ngưỡng Cầu Vàng huyền thoại", "Buffet trưa hơn 100 món Việt - Âu"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn (trên 1m4)", price: 750000, oldPrice: 950000 },
      { id: "t2", name: "Vé trẻ em (1m - 1m4)", price: 600000, oldPrice: 750000 },
      { id: "t3", name: "Combo Cáp treo + Buffet Người lớn", price: 1050000, oldPrice: 1250000 }
    ]
  },
  {
    id: 2,
    name: "Vé VinWonders Phú Quốc - Công Viên Chủ Đề Lớn Nhất Việt Nam",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Phú Quốc",
    img: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=800"
    ],
    oldPrice: 950000,
    price: 850000,
    rating: 9.7,
    reviews: 215,
    booked: "3.5k",
    badge: "Đang HOT",
    isFeatured: true,
    features: [
      "⚡ Xác nhận đơn hàng tức thì",
      "✓ Vé điện tử QR qua Email",
      "▣ Không cần xếp hàng chờ đợi"
    ],
    description: "Khám phá 6 phân khu trò chơi độc đáo, Công viên nước Thế giới lốc xoáy và Thủy cung Cung điện Hải Vương hình rùa khổng lồ.",
    highlights: ["Tham quan Thủy cung 5 sao lớn bậc nhất châu Á", "Trải nghiệm trò chơi cảm giác mạnh đỉnh cao", "Thưởng thức Show diễn triệu đô Once"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn", price: 850000, oldPrice: 950000 },
      { id: "t2", name: "Vé trẻ em & Người cao tuổi", price: 640000, oldPrice: 710000 }
    ]
  },
  {
    id: 3,
    name: "Vé Xem Show Ký Ức Hội An - Ghế ECO / VIP",
    category: "show",
    categoryName: "Vé xem show",
    location: "Hội An",
    img: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 600000,
    price: 480000,
    rating: 9.9,
    reviews: 189,
    booked: "2.9k",
    badge: "Ưu đãi",
    isFeatured: true,
    features: [
      "⚡ Xác nhận đơn hàng tức thì",
      "✓ Chọn vị trí ghế trực tiếp",
      "▣ Xuất trình QR tại cổng"
    ],
    description: "Show diễn thực cảnh ngoài trời hoành tráng nhất thế giới với 500 diễn viên, tái hiện 400 năm lịch sử Hội An thương cảng sầm uất.",
    highlights: ["Sân khấu 25.000m2 ngoài trời độc đáo", "Công nghệ ánh sáng và âm thanh đỉnh cao", "Vé bao gồm tham quan Công viên Ấn tượng Hội An"],
    ticketTypes: [
      { id: "t1", name: "Ghế ECO", price: 480000, oldPrice: 600000 },
      { id: "t2", name: "Ghế HIGH", price: 650000, oldPrice: 750000 },
      { id: "t3", name: "Ghế VIP", price: 1100000, oldPrice: 1200000 }
    ]
  },
  {
    id: 4,
    name: "Vé Cáp Treo Hòn Thơm Phú Quốc - Sun World Hon Thom",
    category: "cap-treo",
    categoryName: "Cáp treo",
    location: "Phú Quốc",
    img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 650000,
    price: 520000,
    rating: 9.6,
    reviews: 142,
    booked: "5.1k",
    badge: "Xuất vé ngay",
    isFeatured: true,
    features: [
      "⚡ Cáp treo vượt biển dài nhất thế giới 7.899m",
      "✓ Bao gồm Công viên nước Aquatopia",
      "▣ Quét QR trực tiếp tại cổng"
    ],
    description: "Bay trên đại dương xanh ngắt ngắm nhìn toàn cảnh Nam đảo Phú Quốc từ trên cao trước khi vui chơi tại công viên nước Aquatopia.",
    highlights: ["Tuyến cáp treo vượt biển 3 dây dài nhất thế giới", "Công viên nước Aquatopia với 20 trò chơi hiện đại", "Bãi biển Trào nước trong xanh thiên đường"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn khứ hồi", price: 520000, oldPrice: 650000 },
      { id: "t2", name: "Vé trẻ em khứ hồi", price: 400000, oldPrice: 500000 }
    ]
  },

  // 2. CÔNG VIÊN GIẢI TRÍ
  {
    id: 5,
    name: "Vé VinWonders Nha Trang (Bao gồm cáp treo & Thủy cung)",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Nha Trang",
    img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 950000,
    price: 800000,
    rating: 9.7,
    reviews: 165,
    booked: "2.8k",
    badge: "Không xếp hàng",
    features: ["⚡ Xác nhận tức thì", "✓ Vé điện tử QR", "▣ Đi cáp treo vượt biển"],
    description: "Công viên giải trí của những kỷ lục trên đảo Hòn Tre Nha Trang với bánh xe bầu trời, đường trượt Alpine Coaster và Zipline 3 kỷ lục.",
    highlights: ["Show diễn Tata Show đỉnh cao nghệ thuật", "Vườn quý vương hội tụ động vật quý hiếm", "Bánh xe Skypark ngắm trọn vịnh Nha Trang"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn", price: 800000, oldPrice: 950000 },
      { id: "t2", name: "Vé trẻ em", price: 600000, oldPrice: 710000 }
    ]
  },
  {
    id: 6,
    name: "Vé Universal Studios Singapore (USS Ticket)",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Quốc tế",
    img: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 1650000,
    price: 1420000,
    rating: 9.8,
    reviews: 410,
    booked: "6.2k",
    badge: "Xuất vé ngay",
    features: ["⚡ Vé điện tử vào thẳng cổng", "✓ Quét mã QR code", "▣ Đảm bảo giá tốt nhất"],
    description: "Khám phá công viên giải trí điện ảnh hàng đầu châu Á tại Đảo Sentosa Singapore với 7 vùng đất chủ đề phim Hollywood hoành tráng.",
    highlights: ["Tàu tàu siêu tốc Transformers 3D siêu thực", "Tàu tàu lượn đôi Battlestar Galactica thót tim", "Gặp gỡ Minions và nhân vật Madagascar"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn (13+ tuổi)", price: 1420000, oldPrice: 1650000 },
      { id: "t2", name: "Vé trẻ em (4-12 tuổi)", price: 1080000, oldPrice: 1250000 }
    ]
  },
  {
    id: 7,
    name: "Vé Gardens by the Bay Singapore (Flower Dome & Cloud Forest)",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Quốc tế",
    img: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 720000,
    price: 610000,
    rating: 9.6,
    reviews: 290,
    booked: "4.1k",
    badge: "Ưu đãi",
    features: ["⚡ Xác nhận tức thì", "✓ Vào thẳng Flower Dome & Cloud Forest", "▣ Quét mã điện tử"],
    description: "Chiêm ngưỡng kỳ quan kiến trúc sinh thái với thác nước trong nhà cao 35m và hệ thống Siêu cây Supertree Grove khổng lồ phát sáng.",
    highlights: ["Thác nước trong nhà mờ sương kỳ ảo", "Vườn hoa bốn mùa Flower Dome rực rỡ", "Cầu đi bộ trên không OCBC Skyway"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn 2 nhà kính", price: 610000, oldPrice: 720000 },
      { id: "t2", name: "Vé trẻ em 2 nhà kính", price: 420000, oldPrice: 500000 }
    ]
  },
  {
    id: 8,
    name: "Vé VinWonders Nam Hội An - Trải Nghiệm Văn Hóa & Safari",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Hội An",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 650000,
    price: 550000,
    rating: 9.5,
    reviews: 130,
    booked: "1.9k",
    badge: "Đang HOT",
    features: ["⚡ Nhận vé ngay lập tức", "✓ Đi thuyền xem River Safari", "▣ Trải nghiệm làng nghề truyền thống"],
    description: "Kết hợp giữa vui chơi giải trí hiện đại, công viên bảo tồn động vật hoang dã trên sông đầu tiên tại Việt Nam và Đảo văn hóa dân gian.",
    highlights: ["River Safari xuôi dòng sông khám phá thế giới động vật", "Đảo văn hóa dân gian tái hiện kiến trúc 3 miền", "Tháp rơi tự do Cú rơi thế kỷ từ độ cao 85m"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn", price: 550000, oldPrice: 650000 },
      { id: "t2", name: "Vé trẻ em", price: 410000, oldPrice: 490000 }
    ]
  },
  {
    id: 9,
    name: "Vé Hong Kong Disneyland Park",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Quốc tế",
    img: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 2100000,
    price: 1890000,
    rating: 9.9,
    reviews: 520,
    booked: "7.8k",
    badge: "Xuất vé ngay",
    features: ["⚡ Vé điện tử trực tiếp", "✓ Trải nghiệm World of Frozen mới", "▣ Hỗ trợ 24/7"],
    description: "Bước vào thế giới cổ tích nhiệm màu Disneyland, gặp gỡ Mickey, Elsa và thưởng thức màn bắn pháo hoaMomentous rực rỡ đêm.",
    highlights: ["Khám phá khu vườn băng giá World of Frozen đầu tiên trên thế giới", "Lâu đài những giấc mơ Castle of Magical Dreams", "Show pháo hoa & ánh sáng Momentous hoành tráng"],
    ticketTypes: [
      { id: "t1", name: "Vé ngày thường Tier 1 - Người lớn", price: 1890000, oldPrice: 2100000 },
      { id: "t2", name: "Vé ngày cao điểm Tier 2 - Người lớn", price: 2150000, oldPrice: 2350000 }
    ]
  },

  // 3. TRẢI NGHIỆM NÊN THỬ
  {
    id: 10,
    name: "Vé Xe Buýt 2 Tầng Hop-On Hop-Off Hà Nội Ngắm Cảnh Thành Phố",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Hà Nội",
    img: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 250000,
    price: 196000,
    rating: 9.4,
    reviews: 98,
    booked: "1.6k",
    badge: "Ưu đãi",
    features: ["⚡ Thuyết minh đa ngôn ngữ qua tai nghe", "✓ Lên xuống tự do tại 13 danh thắng", "▣ Quét mã nhận vé"],
    description: "Trải nghiệm ngắm nhìn Thủ đô Hà Nội ngàn năm văn hiến từ tầng 2 thoáng mát đi qua Lăng Bác, Văn Miếu, Hoàng thành Thăng Long.",
    highlights: ["Xe bus hiện đại thoáng mái che tầng 2", "Đi qua 15 điểm du lịch nổi tiếng nhất Hà Nội", "Tai nghe thuyết minh tự động linh hoạt 10 ngôn ngữ"],
    ticketTypes: [
      { id: "t1", name: "Vé 4 giờ ban ngày", price: 196000, oldPrice: 250000 },
      { id: "t2", name: "Vé 24 giờ ngắm cảnh", price: 320000, oldPrice: 400000 }
    ]
  },
  {
    id: 11,
    name: "Vé Thủy Cung Lotte World Aquarium Hà Nội",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Hà Nội",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 350000,
    price: 280000,
    rating: 9.6,
    reviews: 175,
    booked: "3.1k",
    badge: "Đang HOT",
    features: ["⚡ Xác nhận tức thì", "✓ Thủy cung trong lòng đất lớn nhất Hà Nội", "▣ Trải nghiệm mái vòm Acrylic 360 độ"],
    description: "Thủy cung phong cách biển cả hiện đại tại Lotte Mall Tây Hồ, ngôi nhà của 31.000 sinh vật biển thuộc 400 loài kỳ thú.",
    highlights: ["Bể vòm kính trong suốt dài nhất khu vực", "Gặp gỡ chim cánh cụt Humboldt đáng yêu", "Xem show cho cá ăn & biểu diễn nàng tiên cá"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn (Ngày thường)", price: 280000, oldPrice: 350000 },
      { id: "t2", name: "Vé trẻ em (Ngày thường)", price: 190000, oldPrice: 240000 }
    ]
  },
  {
    id: 12,
    name: "Vé Tàu Trải Nghiệm Đi Qua Đường Sách & Phố Cổ Hà Nội",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Hà Nội",
    img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 180000,
    price: 135000,
    rating: 9.3,
    reviews: 64,
    booked: "920",
    badge: "Xuất vé ngay",
    features: ["⚡ Ngắm cảnh Hà Nội hoài niệm", "✓ Tặng nước uống nhẹ", "▣ Trải nghiệm nét đẹp độc đáo"],
    description: "Chuyến tàu hoài cổ đưa du khách xuyên qua khung cảnh nhộn nhịp phố cổ Hà Nội và những góc phố xinh đẹp tràn ngập sắc hoa.",
    highlights: ["Không gian toa tàu hoài cổ ấm cúng", "Ngắm cảnh đường tàu phố cổ góc nhìn thơ mộng", "Thưởng thức cà phê trứng hoặc trà hoa quả miễn phí"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn kèm đồ uống", price: 135000, oldPrice: 180000 }
    ]
  },
  {
    id: 13,
    name: "Vé Khu Vui Chơi Giáo Trí VinKE & Thủy Cung Times City Hà Nội",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Hà Nội",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 310000,
    price: 250000,
    rating: 9.5,
    reviews: 180,
    booked: "2.4k",
    badge: "Ưu đãi",
    features: ["⚡ Thiên đường cho gia đình có trẻ em", "✓ Trải nghiệm hơn 20 mô hình hướng nghiệp", "▣ Khám phá thủy cung underground"],
    description: "Tổ hợp giải trí giáo trí VinKE kết hợp thủy cung hiện đại mang đến không gian học mà chơi, chơi mà học hấp dẫn cho các bé.",
    highlights: ["Mô hình hướng nghiệp ước mơ bác sĩ, lính hỏa háng", "Khu máy game hiện đại phong phú", "Thủy cung Times City với hàng nghìn sinh vật biển"],
    ticketTypes: [
      { id: "t1", name: "Combo VinKE + Thủy Cung Trẻ em", price: 250000, oldPrice: 310000 },
      { id: "t2", name: "Combo VinKE + Thủy Cung Người lớn", price: 210000, oldPrice: 260000 }
    ]
  },
  {
    id: 14,
    name: "Vé Tắm Bún Khoáng Nóng I-Resort Nha Trang",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Nha Trang",
    img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 350000,
    price: 270000,
    rating: 9.6,
    reviews: 110,
    booked: "1.8k",
    badge: "Xuất vé ngay",
    features: ["⚡ Thư giãn cơ thể khỏe mạnh", "✓ Bùn khoáng thiên nhiên giàu khoáng chất", "▣ Bao gồm ngâm khoáng nóng & công viên nước"],
    description: "Tận hưởng phút giây thư giãn tâm trí và chăm sóc làn da mịn màng tại thiên đường tắm bùn khoáng thiên nhiên I-Resort Nha Trang.",
    highlights: ["Ngâm bùn khoáng nóng thiên nhiên 20 phút", "Massage ôn tuyền thủy liệu pháp", "Tự do bơi lội tại hệ thống hồ khoáng nóng & công viên nước"],
    ticketTypes: [
      { id: "t1", name: "Tắm bùn khoáng nóng bồn chung", price: 270000, oldPrice: 350000 },
      { id: "t2", name: "Tắm bùn khoáng nóng bồn riêng (1-3 người)", price: 400000, oldPrice: 500000 }
    ]
  },
  {
    id: 15,
    name: "Vé Triển Lãm Nghệ Thuật Tương Tác Đa Giác Quan Van Gogh Hà Nội",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Hà Nội",
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 300000,
    price: 255000,
    rating: 9.7,
    reviews: 145,
    booked: "2.2k",
    badge: "Đang HOT",
    features: ["⚡ Công nghệ chiếu 3D Mapping đỉnh cao", "✓ Check-in không gian nghệ thuật 16 phân khu", "▣ Vé điện tử vào cửa"],
    description: "Bước vào thế giới hội họa kiệt tác của danh họa Vincent Van Gogh thông qua sự kết hợp hoàn hảo giữa ánh sáng, âm thanh và kỹ thuật đa giác quan.",
    highlights: ["Chiêm ngưỡng đại lộ hoa hướng dương sống động", "Phòng chiếu 360 độ ngập tràn sắc màu Starry Night", "Khu trải nghiệm vẽ tranh tương tác VR độc đáo"],
    ticketTypes: [
      { id: "t1", name: "Vé tiêu chuẩn (Standard)", price: 255000, oldPrice: 300000 },
      { id: "t2", name: "Vé VIP (Tặng quà độc quyền)", price: 450000, oldPrice: 550000 }
    ]
  },

  // 4. VÉ XEM SHOW
  {
    id: 16,
    name: "Vé Show Trình Diễn Trên Biển Symphony Of The Sea Phú Quốc",
    category: "show",
    categoryName: "Vé xem show",
    location: "Phú Quốc",
    img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 800000,
    price: 650000,
    rating: 9.8,
    reviews: 88,
    booked: "1.4k",
    badge: "Flash Sale",
    features: ["⚡ Show Jetski & Flyboard kết hợp pháo hoa", "✓ Khán đài ngắm trọn đại dương", "▣ Vé điện tử tức thì"],
    description: "Show diễn thể thao mạo hiểm trên mặt biển đêm với những màn nhào lộn Flyboard đỉnh cao kết hợp hiệu ứng pháo hoa, ánh sáng huyền ảo.",
    highlights: ["Vận động viên vô địch thế giới nhào lộn trên không", "Hiệu ứng pháo hoa xoay 360 rực rỡ mặt biển", "Âm nhạc giao hưởng hoành tráng sảng khoái"],
    ticketTypes: [
      { id: "t1", name: "Vé khán đài tiêu chuẩn", price: 650000, oldPrice: 800000 }
    ]
  },
  {
    id: 17,
    name: "Vé Show Thực Cảnh Tinh Hoa Bắc Bộ (Thạch Thất, Hà Nội)",
    category: "show",
    categoryName: "Vé xem show",
    location: "Hà Nội",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 500000,
    price: 390000,
    rating: 9.8,
    reviews: 135,
    booked: "2.1k",
    badge: "Ưu đãi",
    features: ["⚡ Sân khấu mặt nước rộng 4.300m2", "✓ Tái hiện đời sống văn hóa làng quê Bắc Bộ", "▣ Quét QR trực tiếp"],
    description: "Show diễn thực cảnh đậm đà nét văn hóa truyền thống đồng bằng Bắc Bộ dưới chân núi Thầy với hàng trăm người dân địa phương tham gia diễn xuất.",
    highlights: ["Mô hình Thủy đình nổi lên từ mặt nước độc đáo", "Màn múa rối nước & điệu hát quan họ ngọt ngào", "Bối cảnh núi non thiên nhiên trầm mặc hùng vĩ"],
    ticketTypes: [
      { id: "t1", name: "Hạng Silver (Bạc)", price: 390000, oldPrice: 500000 },
      { id: "t2", name: "Hạng Gold (Vàng)", price: 550000, oldPrice: 700000 }
    ]
  },
  {
    id: 18,
    name: "Vé Show Kiss Of The Sea - Nụ Hôn Của Biển Cả (Sunset Town Phú Quốc)",
    category: "show",
    categoryName: "Vé xem show",
    location: "Phú Quốc",
    img: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 1000000,
    price: 820000,
    rating: 9.9,
    reviews: 240,
    booked: "4.2k",
    badge: "Đang HOT",
    features: ["⚡ Công nghệ Multimedia kết hợp lửa, nước, laser", "✓ Bắn pháo hoa hàng đêm 365 ngày", "▣ Giảm giá vé đặt sớm"],
    description: "Kiệt tác nghệ thuật đỉnh cao thế giới kết hợp giữa công nghệ màn chiếu nước khổng lồ, hiệu ứng lửa laser và màn bắn pháo hoa thắp sáng bầu trời Phú Quốc.",
    highlights: ["Sân khấu màn chiếu nước rộng nhất thế giới", "Quy tụ 60 nghệ sĩ quốc tế biểu diễn xiếc & múa", "Pháo hoa tầm cao rực rỡ trọn vẹn mỗi đêm"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn xem Show + Pháo hoa", price: 820000, oldPrice: 1000000 },
      { id: "t2", name: "Combo Cầu Hôn Kiss Bridge + Show", price: 990000, oldPrice: 1200000 }
    ]
  },

  // 5. DU THUYỀN - ẨM THỰC - TOUR
  {
    id: 19,
    name: "Tour Du Thuyền 5 Sao Ngắm Hoàng Hôn & Ăn Tối Vịnh Nha Trang",
    category: "tour-du-thuyen",
    categoryName: "Du thuyền - Ẩm thực - Tour",
    location: "Nha Trang",
    img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 1500000,
    price: 1190000,
    rating: 9.8,
    reviews: 112,
    booked: "1.7k",
    badge: "Xuất vé ngay",
    features: ["⚡ Tiệc buffet hải sản thượng hạng", "✓ Nhạc violin & guitar sống động", "▣ Đưa đón tại khách sạn trung tâm"],
    description: "Tận hưởng khoảnh khắc hoàng hôn lãng mạn lướt sóng qua vịnh Nha Trang lung linh ánh đèn trên chiếc du thuyền sang trọng chuẩn 5 sao.",
    highlights: ["Đón hoàng hôn dát vàng trên đại dương", "Thưởng thức bữa tối 5 món Âu - Á cao cấp", "Không gian sang trọng lãng mạn cho cặp đôi & gia đình"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn trọn gói", price: 1190000, oldPrice: 1500000 }
    ]
  },
  {
    id: 20,
    name: "Tour 4 Đảo Phú Quốc Bằng Cano Siêu Tốc & Chụp Ảnh SUP Flycam",
    category: "tour-du-thuyen",
    categoryName: "Du thuyền - Ẩm thực - Tour",
    location: "Phú Quốc",
    img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 900000,
    price: 680000,
    rating: 9.7,
    reviews: 295,
    booked: "5.4k",
    badge: "Flash Sale",
    features: ["⚡ Tặng bộ ảnh & video Flycam chuyên nghiệp", "✓ Lặn ngắm san hô tự nhiên", "▣ Ăn trưa hải sản 8 món"],
    description: "Hành trình vi vu 4 hòn đảo đẹp nhất Nam Phú Quốc: Hòn Mây Rút, Hòn Móng Tay, Hòn Gầm Ghì, Hòn Thơm với trải nghiệm lặn biển rạn san hô rực rỡ.",
    highlights: ["Chụp ảnh chèo SUP & quay video Flycam từ trên cao", "Khám phá rạn san hô tự nhiên đẹp nhất Phú Quốc", "Ăn trưa hải sản tươi ngon trên đảo"],
    ticketTypes: [
      { id: "t1", name: "Tour Canơ 4 Đảo trọn gói", price: 680000, oldPrice: 900000 },
      { id: "t2", name: "Tour 4 Đảo + Vé Cáp Treo Hòn Thơm", price: 1150000, oldPrice: 1400000 }
    ]
  },
  {
    id: 21,
    name: "Tour Thăm Vịnh Hạ Long 1 Ngày Trên Du Thuyền 5 Sao Ambassador",
    category: "tour-du-thuyen",
    categoryName: "Du thuyền - Ẩm thực - Tour",
    location: "Quảng Ninh",
    img: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 1800000,
    price: 1450000,
    rating: 9.9,
    reviews: 310,
    booked: "3.8k",
    badge: "Đang HOT",
    features: ["⚡ Thăm Hang Sửng Sốt & Đảo Titop", "✓ Tiệc Buffet hải sản hơn 60 món", "▣ Đội ngũ phục vụ chuyên nghiệp"],
    description: "Trải nghiệm đẳng cấp nghỉ dưỡng trên kỳ quan thiên nhiên thế giới Vịnh Hạ Long cùng siêu du thuyền Ambassador trang bị bể jacuzzi ngoài trời.",
    highlights: ["Sức chứa 500 khách với 2 tầng sundeck ngắm cảnh 360 độ", "Thăm Hang Sửng Sốt rộng lớn ngút ngàn", "Chèo thuyền Kayak hoặc đi thuyền trúc khám phá Hang Luồn"],
    ticketTypes: [
      { id: "t1", name: "Vé Du Thuyền 1 Ngày (Không xe đưa đón)", price: 1450000, oldPrice: 1800000 },
      { id: "t2", name: "Vé Du Thuyền + Xe Limousine khứ hồi Hà Nội", price: 1850000, oldPrice: 2200000 }
    ]
  },

  // 6. CÔNG VIÊN NƯỚC - SUỐI KHOÁNG NÓNG
  {
    id: 22,
    name: "Vé Công Viên Nước Nóng Onsen Nhật Bản Mikazuki Đà Nẵng",
    category: "cong-vien-nuoc",
    categoryName: "Công viên nước",
    location: "Đà Nẵng",
    img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 450000,
    price: 360000,
    rating: 9.6,
    reviews: 160,
    booked: "2.6k",
    badge: "Ưu đãi",
    features: ["⚡ Công viên nước trong nhà có mái che lớn nhất Việt Nam", "✓ Ngâm tắm Onsen chuẩn phong cách Nhật", "▣ Trượt dòng sông lười mát rượi"],
    description: "Tổ hợp vui chơi giải trí chuẩn Nhật Bản Mikazuki Water Park 365 mang lại không gian thư giãn khoáng nóng Onsen và sóng biển rào rạt bốn mùa.",
    highlights: ["Đường trượt rồng trong nhà dài nhất Việt Nam", "Hồ sóng nhân tạo trong nhà ấm áp bơi lội quanh năm", "Dịch vụ khoáng nóng khoáng bùn Onsen phục hồi sức khỏe"],
    ticketTypes: [
      { id: "t1", name: "Vé Combo Công viên nước + Onsen Người lớn", price: 360000, oldPrice: 450000 },
      { id: "t2", name: "Vé Combo Công viên nước + Onsen Trẻ em", price: 230000, oldPrice: 300000 }
    ]
  },
  {
    id: 23,
    name: "Vé Công Viên Khai Sơn Suối Khoáng Nóng Minera Bình Châu",
    category: "cong-vien-nuoc",
    categoryName: "Công viên nước",
    location: "Bình Châu",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 550000,
    price: 435000,
    rating: 9.5,
    reviews: 94,
    booked: "1.5k",
    badge: "Xuất vé ngay",
    features: ["⚡ Luộc trứng khoáng nóng tự nhiên 82 độ C", "✓ Ngâm chân ngâm mình hồ khoáng Minera Springs", "▣ Tham quan rừng Minera Forest"],
    description: "Thư thái tâm trí hòa mình vào nguồn nước khoáng nóng tự nhiên duy nhất tại miền Nam Việt Nam chảy ra từ lòng đất tại Minera Hot Springs Bình Châu.",
    highlights: ["Hồ khoáng Springs Pool hơn 800m2 rộng lớn", "Luộc trứng hồng đào tại khu bốt nước nóng 82 độ", "Dạo bước công viên rừng thiên nhiên Minera Forest xanh mát"],
    ticketTypes: [
      { id: "t1", name: "Vé Minera Springs + Minera Forest (Người lớn)", price: 435000, oldPrice: 550000 }
    ]
  },
  {
    id: 24,
    name: "Vé Công Viên Nước Công Viên Khai Sơn Sun World Sầm Sơn",
    category: "cong-vien-nuoc",
    categoryName: "Công viên nước",
    location: "Quốc tế",
    img: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 350000,
    price: 280000,
    rating: 9.4,
    reviews: 78,
    booked: "1.2k",
    badge: "Đang HOT",
    features: ["⚡ Tổ hợp công viên nước hiện đại hàng đầu miền Bắc", "✓ Thỏa sức chinh phục làn đường trượt siêu khủng", "▣ Nhận mã QR quét tức thì"],
    description: "Trải nghiệm sảng khoái đánh tan cái nóng mùa hè cùng Công viên nước Sun World Sầm Sơn với hàng chục trò chơi dưới nước kịch tính.",
    highlights: ["Bể tạo sóng biển nhân tạo sóng vỗ rì rào", "Đường trượt xoắn ốc thót tim", "Khu vui chơi sắc màu cho trẻ em"],
    ticketTypes: [
      { id: "t1", name: "Vé người lớn", price: 280000, oldPrice: 350000 }
    ]
  },

  // 7. CÁP TREO
  {
    id: 25,
    name: "Vé Cáp Treo Núi Bà Đen Tây Ninh - Sun World Ba Den Mountain",
    category: "cap-treo",
    categoryName: "Cáp treo",
    location: "Tây Ninh",
    img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 400000,
    price: 335000,
    rating: 9.8,
    reviews: 380,
    booked: "6.8k",
    badge: "Flash Sale",
    features: ["⚡ Chinh phục nóc nhà Nam Bộ cao 986m", "✓ Chiêm bái tượng Phật Bà Tây Bổ Đà Sơn bằng đồng", "▣ Nhà ga cáp treo lớn nhất thế giới"],
    description: "Tuyến cáp treo hiện đại đưa du khách lên đỉnh Núi Bà Đen chiêm bái đại tượng Phật Bà bằng đồng cao nhất châu Á và thưởng ngoạn biển mây ảo diệu.",
    highlights: ["Nhà ga cáp treo Bà Đen kỷ lục Guinness", "Tượng Phật Bà bằng đồng cao 72m uy nghiêm trên đỉnh núi", "Vườn hoa bốn mùa rực rỡ mây mù bao phủ"],
    ticketTypes: [
      { id: "t1", name: "Vé cáp treo Khứ hồi đỉnh Vân Sơn", price: 335000, oldPrice: 400000 },
      { id: "t2", name: "Combo Đỉnh Vân Sơn + Chùa Bà", price: 520000, oldPrice: 600000 }
    ]
  },
  {
    id: 26,
    name: "Vé Cáp Treo Fansipan Legend Sapa - Chinh Phục Nóc Nhà Đông Dương",
    category: "cap-treo",
    categoryName: "Cáp treo",
    location: "Sapa",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 850000,
    price: 715000,
    rating: 9.9,
    reviews: 490,
    booked: "7.1k",
    badge: "Đang HOT",
    features: ["⚡ Tuyến cáp treo 3 dây hiện đại vượt thung lũng Mường Hoa", "✓ Chinh phục đỉnh cao 3.143m linh thiêng", "▣ Quét QR trực tiếp không chờ đợi"],
    description: "Hành trình mây ngàn Fansipan ngắm nhìn thung lũng Mường Hoa xanh ngắt và quần thể tâm linh đại tượng Phật A Di Đà sừng sững giữa đất trời.",
    highlights: ["Kỷ lục tuyến cáp treo độ chênh giữa ga đi và ga đến lớn nhất", "Tàu hỏa leo núi Mường Hoa lãng mạn phong cách châu Âu", "Cột cờ Fansipan thiêng liêng điểm hẹn niềm tự hào Việt Nam"],
    ticketTypes: [
      { id: "t1", name: "Vé Cáp Treo Khứ Hồi Người lớn", price: 715000, oldPrice: 850000 },
      { id: "t2", name: "Vé Tàu Hỏa Leo Núi Đỉnh Fansipan", price: 140000, oldPrice: 170000 }
    ]
  },

  // 8. WIFI - SIM - ESIM
  {
    id: 27,
    name: "eSIM Du Lịch Thái Lan 4G/5G Không Giới Hạn Dung Lượng (Nhận Ngay Qua Mail)",
    category: "esim",
    categoryName: "Wifi - eSIM",
    location: "Quốc tế",
    img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 220000,
    price: 145000,
    rating: 9.9,
    reviews: 620,
    booked: "12.5k",
    badge: "Xuất vé ngay",
    features: ["⚡ Gửi mã QR eSIM qua Email trong 5 phút", "✓ Quét QR kích hoạt tự động tức thì", "▣ Nhà mạng AIS/DTAC tốc độ cao 5G"],
    description: "Kết nối Internet vi vu Thái Lan mượt mà không cần tháo SIM gốc. Quét mã QR code đơn giản cài đặt trước chuyến đi cực kỳ tiện lợi.",
    highlights: ["Không mất công tháo lắp SIM vật lý", "Tốc độ 5G siêu nhanh truy cập Facebook, Zalo, Google Maps", "Hỗ trợ hotline kỹ thuật 24/7"],
    ticketTypes: [
      { id: "t1", name: "Gói 5 Ngày (5GB tốc độ cao/ngày)", price: 145000, oldPrice: 220000 },
      { id: "t2", name: "Gói 8 Ngày Không Giới Hạn 5G", price: 210000, oldPrice: 290000 }
    ]
  },
  {
    id: 28,
    name: "eSIM Du Lịch Nhật Bản 4G Tốc Độ Cao (Nhà Mạng Softbank / NTT Docomo)",
    category: "esim",
    categoryName: "Wifi - eSIM",
    location: "Quốc tế",
    img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 350000,
    price: 240000,
    rating: 9.8,
    reviews: 410,
    booked: "8.9k",
    badge: "Ưu đãi",
    features: ["⚡ Kích hoạt sóng ngay khi vừa hạ cánh", "✓ Tốc độ 4G LTE phủ sóng toàn Nhật Bản", "▣ Đủ các gói từ 3 đến 15 ngày"],
    description: "Kết nối mạng mượt mà tại Tokyo, Osaka, Kyoto mà không lo roaming đắt đỏ. Mã eSIM gửi tự động qua email sẵn sàng quét cài đặt.",
    highlights: ["Truy cập đường truyền mạng hàng đầu Softbank", "Dễ dàng cài đặt chỉ bằng thao tác quét QR", "Hotspot phát wifi cho thiết bị đi kèm"],
    ticketTypes: [
      { id: "t1", name: "Gói 5 Ngày (2GB/ngày)", price: 240000, oldPrice: 350000 },
      { id: "t2", name: "Gói 7 Ngày (3GB/ngày)", price: 340000, oldPrice: 450000 }
    ]
  },
  {
    id: 29,
    name: "eSIM Du Lịch Hàn Quốc 4G/5G (Nhà Mạng SK Telecom / KT)",
    category: "esim",
    categoryName: "Wifi - eSIM",
    location: "Quốc tế",
    img: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 280000,
    price: 195000,
    rating: 9.9,
    reviews: 380,
    booked: "7.4k",
    badge: "Xuất vé ngay",
    features: ["⚡ Tự động nhận sóng mạng SK Telecom", "✓ Nhận QR qua email tức thì", "▣ Truy cập mạng xã hội không giới hạn"],
    description: "Giải pháp vào mạng lý tưởng khi du lịch xứ sở Kim Chi Seoul, đảo Jeju với kết nối internet tốc độ cao ổn định.",
    highlights: ["Truy cập bản đồ KakaoMap, NaverMap mượt mà", "Không cần chờ đợi giao SIM vật lý", "Kích hoạt đơn giản trong vòng 1 phút"],
    ticketTypes: [
      { id: "t1", name: "Gói 5 Ngày (Unlimted Data)", price: 195000, oldPrice: 280000 }
    ]
  },

  // 9. DỊCH VỤ SÂN BAY
  {
    id: 30,
    name: "Dịch Vụ Đón Đón Fast Track Sân Bay Tân Sơn Nhất / Nội Bài (Đón Ưu Tiên)",
    category: "san-bay",
    categoryName: "Dịch vụ sân bay",
    location: "Hồ Chí Minh",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 500000,
    price: 380000,
    rating: 9.8,
    reviews: 140,
    booked: "2.3k",
    badge: "Ưu đãi",
    features: ["⚡ Nhân viên đón ngay tại cửa tàu bay", "✓ Hỗ trợ luồng ưu tiên nhập cảnh không chờ đợi", "▣ Hỗ trợ lấy hành lý nhanh chóng"],
    description: "Tiết kiệm thời gian quý báu trải nghiệm thủ tục nhập cảnh ưu tiên VIP tại các sân bay quốc tế lớn Việt Nam.",
    highlights: ["Lối đi ưu tiên riêng biệt bỏ qua hàng dài chờ đợi", "Nhân viên cầm biển tên đón ngay sau khi xuống máy bay", "Phù hợp với người già, trẻ nhỏ & doanh nhân"],
    ticketTypes: [
      { id: "t1", name: "Dịch vụ Fast Track Nhập Cảnh (Quốc tế)", price: 380000, oldPrice: 500000 }
    ]
  },
  {
    id: 31,
    name: "Vé Phòng Chờ Thương Gia Song Hồng Lounge Sân Bay Nội Bài (Ga Quốc Tế T2)",
    category: "san-bay",
    categoryName: "Dịch vụ sân bay",
    location: "Hà Nội",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 750000,
    price: 590000,
    rating: 9.7,
    reviews: 96,
    booked: "1.9k",
    badge: "Xuất vé ngay",
    features: ["⚡ Sử dụng 3 giờ nghỉ ngơi tiện nghi", "✓ Buffet ẩm thực nóng sốt & đồ uống miễn phí", "▣ Ghế massage, phòng tắm riêng"],
    description: "Tận hưởng không gian thư giãn sang trọng yên tĩnh trước chuyến bay cùng phòng chờ thương gia đẳng cấp với đầy đủ dịch vụ ăn uống giải trí.",
    highlights: ["Buffet phong phú nhiều món Á - Âu ngon miệng", "Wifi tốc độ cao, ổ cắm sạc & ghế nằm thư giãn", "Phòng tắm vòi sen riêng trang bị đầy đủ đồ dùng cá nhân"],
    ticketTypes: [
      { id: "t1", name: "Vé vào phòng chờ 3 tiếng (Người lớn)", price: 590000, oldPrice: 750000 }
    ]
  },
  {
    id: 32,
    name: "Xe Riêng Đưa Đón Sân Bay Tân Sơn Nhất - Trung Tâm TP.HCM (4-7 Chỗ)",
    category: "san-bay",
    categoryName: "Dịch vụ sân bay",
    location: "Hồ Chí Minh",
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 300000,
    price: 220000,
    rating: 9.6,
    reviews: 210,
    booked: "4.5k",
    badge: "Đang HOT",
    features: ["⚡ Xe riêng đời mới máy lạnh mát rượi", "✓ Tài xế chờ sẵn giơ biển tên đón", "▣ Miễn phí 60 phút chờ nếu chuyến bay trễ"],
    description: "Di chuyển thoải mái an toàn từ sân bay Tân Sơn Nhất về khách sạn Quận 1, Quận 3 với xe riêng hiện đại không lo taxi dù chèo kéo.",
    highlights: ["Theo dõi lịch trình chuyến bay tự động điều chỉnh giờ đón", "Giá trọn gói bao gồm phí cầu đường bến bãi", "Tài xế lịch sự văn minh thông thạo đường phố"],
    ticketTypes: [
      { id: "t1", name: "Xe 4 chỗ (Tối đa 3 khách + 3 vali)", price: 220000, oldPrice: 300000 },
      { id: "t2", name: "Xe 7 chỗ (Tối đa 5 khách + 5 vali)", price: 270000, oldPrice: 360000 }
    ]
  },
  // 33. ĐÀ LẠT - MÁNG TRƯỢT DATANLA
  {
    id: 33,
    name: "Vé Trải Nghiệm Máng Trượt Datanla Đà Lạt (New Alpine Coaster) & Zipline",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Đà Lạt",
    img: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 250000,
    price: 190000,
    rating: 9.8,
    reviews: 430,
    booked: "5.2k",
    badge: "Đang HOT",
    isFeatured: true,
    features: ["⚡ Xác nhận tức thì", "✓ Tuyến máng trượt dài 2.400m xuyên rừng thông", "▣ Quét mã QR vào cổng không cần xếp hàng"],
    description: "Lướt qua rừng thông bạt ngàn mát rượi với hệ thống máng trượt alpine hiện đại bậc nhất, chiêm ngưỡng vẻ đẹp hùng vĩ của Thác Datanla.",
    highlights: ["Trải nghiệm máng trượt Alpine Coaster thế hệ mới", "Khám phá tầng thác Datanla huyền bí", "Trò chơi an toàn với phanh cảm biến từ tính"],
    ticketTypes: [
      { id: "t1", name: "Vé Máng trượt khứ hồi Người lớn", price: 190000, oldPrice: 250000 },
      { id: "t2", name: "Vé Máng trượt khứ hồi Trẻ em", price: 120000, oldPrice: 160000 },
      { id: "t3", name: "Combo Máng trượt + Đu dây Zipline xuyên rừng", price: 390000, oldPrice: 480000 }
    ]
  },
  // 34. ĐÀ LẠT - MONGO LAND
  {
    id: 34,
    name: "Vé Nông Trại Châu Âu Mongo Land & Fresh Garden Đà Lạt",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Đà Lạt",
    img: "https://images.unsplash.com/photo-1501117716987-c8c394bb29df?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1501117716987-c8c394bb29df?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 150000,
    price: 120000,
    rating: 9.7,
    reviews: 290,
    booked: "3.8k",
    badge: "Bán chạy",
    features: ["⚡ Miễn phí nước uống tự chọn", "✓ Tương tác với thú cưng cừu, thỏ, alpaca", "▣ Trượt phao khô sắc màu tốc độ cao"],
    description: "Không gian thảo nguyên Mông Cổ thu nhỏ giữa lòng Đà Lạt mộng mơ với cối xay gió, đồi hoa rực rỡ và những chú lạc đà Alpaca siêu đáng yêu.",
    highlights: ["Trượt phao khô cầu vồng dài nhất Đà Lạt", "Chụp ảnh check-in thảo nguyên lều Mông Cổ", "Thưởng ngoạn đồi hoa Fresh Garden khoe sắc"],
    ticketTypes: [
      { id: "t1", name: "Vé vào cổng Mongo Land + Nước uống", price: 120000, oldPrice: 150000 },
      { id: "t2", name: "Combo Vé Mongo Land + Fresh Garden", price: 210000, oldPrice: 280000 }
    ]
  },
  // 35. NINH BÌNH - TRÀNG AN & HANG MÚA
  {
    id: 35,
    name: "Vé Thuyền Danh Thắng Tràng An & Check-in Đỉnh Hang Múa Ninh Bình",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Ninh Bình",
    img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 320000,
    price: 250000,
    rating: 9.9,
    reviews: 580,
    booked: "6.9k",
    badge: "Di sản Thế giới",
    isFeatured: true,
    features: ["⚡ Xuồng chèo tay 3-4 khách/thuyền", "✓ Khám phá 4 hang động và 3 điểm tâm linh", "▣ Miễn xếp hàng tại bến thuyền"],
    description: "Hành trình xuôi thuyền trên dòng sông Sào Khê trong vắt, luồn qua các hang động kỳ ảo và ngắm toàn cảnh Tam Cốc từ đỉnh Ngọa Long Hang Múa.",
    highlights: ["Chiêm ngưỡng di sản văn hóa và thiên nhiên thế giới UNESCO", "Check-in phim trường Kong: Skull Island lừng danh", "Leo 500 bậc đá ngắm kỳ quan non nước Ninh Bình"],
    ticketTypes: [
      { id: "t1", name: "Vé thuyền Tràng An Tuyến 2", price: 250000, oldPrice: 320000 },
      { id: "t2", name: "Combo Thuyền Tràng An + Vé Hang Múa", price: 340000, oldPrice: 420000 }
    ]
  },
  // 36. HUẾ - ĐẠI NỘI & CA HUẾ
  {
    id: 36,
    name: "Vé Tham Quan Quần Thể Đại Nội Huế & Du Thuyền Nghe Ca Huế Sông Hương",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Huế",
    img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 280000,
    price: 200000,
    rating: 9.8,
    reviews: 310,
    booked: "4.1k",
    badge: "Di sản Cố Đô",
    features: ["⚡ Vé điện tử vào thẳng Cửa Ngọ Môn", "✓ Thả hoa đăng cầu bình an trên sông Hương", "▣ Thưởng thức nhã nhạc cung đình Huế"],
    description: "Khám phá Hoàng cung 13 đời vua triều Nguyễn với Điện Thái Hòa, Tử Cấm Thành uy nghiêm và lắng đọng tâm hồn cùng ca Huế trên thuyền rồng.",
    highlights: ["Kiến trúc cung đình vàng son thời phong kiến", "Trải nghiệm du thuyền rồng truyền thống về đêm", "Thả hoa đăng lung linh soi bóng dòng sông Hương"],
    ticketTypes: [
      { id: "t1", name: "Vé tham quan Hoàng Cung Huế (Đại Nội)", price: 200000, oldPrice: 280000 },
      { id: "t2", name: "Vé Thuyền Rồng Ca Huế + Thả Hoa Đăng", price: 150000, oldPrice: 200000 }
    ]
  },
  // 37. PHAN THIẾT - WONDERLAND
  {
    id: 37,
    name: "Vé Công Viên Nước Wonderland Water Park NovaWorld Phan Thiết",
    category: "cong-vien-nuoc",
    categoryName: "Công viên nước",
    location: "Phan Thiết",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 350000,
    price: 280000,
    rating: 9.6,
    reviews: 245,
    booked: "3.3k",
    badge: "Mới mở",
    features: ["⚡ Công viên nước chủ đề hải tặc 7ha", "✓ Hơn 14 cụm trò chơi trượt nước cảm giác mạnh", "▣ Tặng kèm tủ gửi đồ locker"],
    description: "Khu vui chơi giải trí nước quy mô bậc nhất Bình Thuận với vịnh sóng thần nhân tạo, đảo hải tặc và đường trượt lốc xoáy sắc màu.",
    highlights: ["Hồ bơi tạo sóng cao 2m như sóng biển thật", "Tháp trượt nước xoắn ốc 360 độ cực đã", "Khu vui chơi nước an toàn cho trẻ em"],
    ticketTypes: [
      { id: "t1", name: "Vé Người lớn (trên 1m4)", price: 280000, oldPrice: 350000 },
      { id: "t2", name: "Vé Trẻ em (1m - 1m4)", price: 200000, oldPrice: 250000 }
    ]
  },
  // 38. QUY NHƠN - KỲ CO EO GIÓ
  {
    id: 38,
    name: "Tour Ca Nô Lặn Ngắm San Hô Kỳ Co - Eo Gió Quy Nhơn",
    category: "tour-du-thuyen",
    categoryName: "Du thuyền - Tour",
    location: "Quy Nhơn",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 550000,
    price: 420000,
    rating: 9.8,
    reviews: 380,
    booked: "4.7k",
    badge: "Đang HOT",
    features: ["⚡ Ca nô cao tốc khứ hồi ra bãi Kỳ Co", "✓ Lặn ngắm rạn san hô Bãi Dứa", "▣ Bao gồm áo phao, kính lặn và tắm tráng nước ngọt"],
    description: "Khám phá bãi tắm Kỳ Co nước xanh hai màu ngọc bích, check-in con đường ven biển Eo Gió ngắm sóng biển xô bờ đá tuyệt mỹ.",
    highlights: ["Trải nghiệm ca nô cao tốc lướt sóng biển Quy Nhơn", "Lặn biển chiêm ngưỡng thế giới san hô lung linh", "Thưởng thức hải sản tươi ngon đặc sản Nhơn Lý"],
    ticketTypes: [
      { id: "t1", name: "Vé Ca nô Kỳ Co + Lặn San Hô", price: 420000, oldPrice: 550000 },
      { id: "t2", name: "Combo Ca Nô + Bữa trưa hải sản 8 món", price: 650000, oldPrice: 790000 }
    ]
  },
  // 39. VŨNG TÀU - HỒ MÂY PARK
  {
    id: 39,
    name: "Vé Cáp Treo & Khu Du Lịch Sinh Thái Hồ Mây Park Vũng Tàu",
    category: "cap-treo",
    categoryName: "Cáp treo",
    location: "Vũng Tàu",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 400000,
    price: 330000,
    rating: 9.6,
    reviews: 215,
    booked: "3.6k",
    badge: "Ưu đãi",
    features: ["⚡ Cáp treo vượt biển ngắm trọn Vũng Tàu", "✓ Trọn gói hơn 70 trò chơi trên đỉnh Núi Lớn", "▣ Xem biểu diễn nhạc nước Laser Hồ Mây Grand Show"],
    description: "Quần thể du lịch trên đỉnh núi cao 250m nhìn ra toàn cảnh biển Bãi Trước, với công viên nước trên núi, vườn thú và trò chơi cảm giác mạnh.",
    highlights: ["Đi cáp treo ngắm toàn cảnh thành phố biển từ trên cao", "Máng trượt dốc núi và zipline mạo hiểm", "Show nhạc nước hiện đại nhất Đông Nam Bộ"],
    ticketTypes: [
      { id: "t1", name: "Vé Trọn Gói Hồ Mây Người lớn", price: 330000, oldPrice: 400000 },
      { id: "t2", name: "Vé Trọn Gói Trẻ em (1m - 1m3)", price: 200000, oldPrice: 250000 }
    ]
  },
  // 40. CẦN THƠ - CHỢ NỔI & TRÀ SƯ
  {
    id: 40,
    name: "Tour Đi Xuồng Ba Lá Rừng Tràm Trà Sư & Chợ Nổi Cái Răng Cần Thơ",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Cần Thơ",
    img: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 390000,
    price: 290000,
    rating: 9.8,
    reviews: 320,
    booked: "4.9k",
    badge: "Miền Tây",
    features: ["⚡ Đò chèo luồn lách thảm bèo xanh mướt", "✓ Ăn sáng hủ tiếu bồng bềnh trên chợ nổi", "▣ Ghé lò hủ tiếu truyền thống 7 sắc màu"],
    description: "Hành trình khám phá vẻ đẹp đậm chất Nam Bộ với chợ nổi rộn rã lúc bình minh, cầu đi bộ Cần Thơ và rừng tràm ngập nước đẹp nhất Việt Nam.",
    highlights: ["Thưởng thức cà phê kho và trái cây tươi ngay trên ghe", "Chiêm ngưỡng các loài chim quý hiếm tại Trà Sư", "Đi cầu tre vạn bước xuyên rừng dài nhất Việt Nam"],
    ticketTypes: [
      { id: "t1", name: "Vé Tàu Tham Quan Chợ Nổi Cái Răng", price: 150000, oldPrice: 200000 },
      { id: "t2", name: "Combo Chợ Nổi + Miệt Vườn Trái Cây", price: 290000, oldPrice: 390000 }
    ]
  },
  // 41. THÁI LAN - SAFARI WORLD BANGKOK
  {
    id: 41,
    name: "Vé Safari World Bangkok & Marine Park Thái Lan (Kèm Buffet)",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Thái Lan",
    img: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 950000,
    price: 720000,
    rating: 9.9,
    reviews: 512,
    booked: "7.1k",
    badge: "iVIVU Bán chạy",
    isFeatured: true,
    features: ["⚡ Vé điện tử QR quét vào cửa ngay", "✓ Xem show biểu diễn cá heo và điệp viên 007", "▣ Buffet trưa quốc tế hơn 80 món"],
    description: "Vườn thú mở bán hoang dã lớn nhất châu Á tại Thái Lan, nơi du khách ngồi xe ngắm nhìn sư tử, hươu cao cổ và xem các show xiếc đẳng cấp.",
    highlights: ["Cho hàng trăm chú hươu cao cổ ăn trực tiếp", "Show diễn cá heo và hải cẩu thông minh", "Trải nghiệm đi xe xuyên qua vùng động vật hoang dã"],
    ticketTypes: [
      { id: "t1", name: "Vé Trọn Gói Safari Park + Marine Park + Buffet", price: 720000, oldPrice: 950000 },
      { id: "t2", name: "Vé Trẻ em (Dưới 140cm)", price: 580000, oldPrice: 750000 }
    ]
  },
  // 42. SINGAPORE - USS & GARDENS BY THE BAY
  {
    id: 42,
    name: "Vé Universal Studios Singapore (USS) Đảo Sentosa & Gardens by the Bay",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Singapore",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 1650000,
    price: 1390000,
    rating: 9.9,
    reviews: 620,
    booked: "8.5k",
    badge: "Top 1 Đông Nam Á",
    isFeatured: true,
    features: ["⚡ Xác nhận tức thì qua Email", "✓ 6 khu vực chủ đề Transformers, Minions, Jurassic Park", "▣ Vé vào thẳng không cần đổi vé cứng"],
    description: "Công viên giải trí phim trường đẳng cấp quốc tế đầu tiên tại Đông Nam Á với tàu lượn siêu tốc Battlestar Galactica và khu vườn kỳ ảo Gardens by the Bay.",
    highlights: ["Gặp gỡ nhân vật Minions và Transformers khổng lồ", "Tàu lượn siêu tốc 2 đường ray ngoạn mục", "Khám phá Rừng mây Cloud Forest và Supertree Grove"],
    ticketTypes: [
      { id: "t1", name: "Vé 1 Ngày USS Người lớn", price: 1390000, oldPrice: 1650000 },
      { id: "t2", name: "Combo Vé USS + Vé Gardens by the Bay", price: 1850000, oldPrice: 2200000 }
    ]
  },
  // 43. HÀN QUỐC - EVERLAND
  {
    id: 43,
    name: "Vé Công Viên Giải Trí Everland & Lotte World Seoul Hàn Quốc",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Hàn Quốc",
    img: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 1200000,
    price: 950000,
    rating: 9.8,
    reviews: 410,
    booked: "5.8k",
    badge: "iVIVU Đề xuất",
    features: ["⚡ Vé điện tử quét mã QR qua cổng", "✓ Trải nghiệm tàu lượn gỗ T-Express huyền thoại", "▣ Vườn thú Safari World ngắm gấu trúc Panda"],
    description: "Disneyland của xứ sở kim chi với tàu lượn gỗ dốc nhất thế giới, lâu đài cổ tích Lotte World lung linh và công viên nước Caribbean Bay.",
    highlights: ["Ngắm gấu trúc Fubao đáng yêu tại Panda World", "Chinh phục tàu lượn dốc 77 độ T-Express", "Lâu đài Magic Island huyền ảo soi bóng hồ Seokchon"],
    ticketTypes: [
      { id: "t1", name: "Vé 1 Ngày Everland Theme Park", price: 950000, oldPrice: 1200000 },
      { id: "t2", name: "Vé 1 Ngày Lotte World Seoul", price: 890000, oldPrice: 1100000 }
    ]
  },
  // 44. NHẬT BẢN - USJ OSAKA
  {
    id: 44,
    name: "Vé Universal Studios Japan (USJ) Osaka & TeamLab Planets Tokyo",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Nhật Bản",
    img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 1950000,
    price: 1650000,
    rating: 9.9,
    reviews: 490,
    booked: "6.3k",
    badge: "Siêu HOT",
    isFeatured: true,
    features: ["⚡ Khu Thế giới Super Nintendo World & Harry Potter", "✓ Vé chính hãng xác nhận ngay lập tức", "▣ Trải nghiệm nghệ thuật số teamLab độc nhất vô nhị"],
    description: "Lạc vào thế giới phù thủy Harry Potter tại USJ Osaka và bước đi trong không gian ánh sáng huyền ảo vô tận của teamLab Planets tại Tokyo.",
    highlights: ["Đeo vòng tay đập gạch ăn xu tại Super Nintendo World", "Lâu đài Hogwarts tráng lệ và bia bơ thơm ngậy", "Bảo tàng nghệ thuật tương tác cơ thể chìm trong nước"],
    ticketTypes: [
      { id: "t1", name: "Vé Universal Studios Japan 1 Ngày Studio Pass", price: 1650000, oldPrice: 1950000 },
      { id: "t2", name: "Vé Bảo Tàng Nghệ Thuật Số teamLab Planets Tokyo", price: 690000, oldPrice: 850000 }
    ]
  },
  // 45. DU THUYỀN 5 SAO - GENTING DREAM
  {
    id: 45,
    name: "Vé Trải Nghiệm Siêu Du Thuyền 5 Sao Genting Dream (Singapore - Malaysia)",
    category: "tour-du-thuyen",
    categoryName: "Du thuyền - Tour",
    location: "Du thuyền",
    img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 7990000,
    price: 6490000,
    rating: 9.9,
    reviews: 340,
    booked: "2.8k",
    badge: "Đẳng cấp 5 Sao",
    isFeatured: true,
    features: ["⚡ Bao gồm phòng nghỉ cao cấp trên biển", "✓ Miễn phí các bữa ăn buffet tại nhà hàng 5 sao", "▣ Trượt Zipline trên đại dương & rạp hát Broadway"],
    description: "Tận hưởng kỳ nghỉ dưỡng xa hoa trên du thuyền quốc tế 18 tầng với công viên nước trên boong tàu, rạp chiếu phim ngoài trời và hải trình xuyên quốc gia.",
    highlights: ["Khám phá thành phố nổi giữa đại dương", "Thưởng thức ẩm thực Á - Âu không giới hạn", "Xem show diễn tạp kỹ triệu đô mỗi đêm"],
    ticketTypes: [
      { id: "t1", name: "Phòng Balcony Ban Công Hướng Biển 3N2Đ", price: 6490000, oldPrice: 7990000 },
      { id: "t2", name: "Phòng Suite Hoàng Gia The Palace", price: 12500000, oldPrice: 15900000 }
    ]
  },
    // 47. ĐÀ NẴNG - SUỐI KHOÁNG NÚI THẦN TÀI
  {
    id: 47,
    name: "Vé Công Viên Suối Khoáng Nóng Núi Thần Tài Đà Nẵng (Tắm Khoáng & Buffet)",
    category: "cong-vien-nuoc",
    categoryName: "Công viên nước",
    location: "Đà Nẵng",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 520000,
    price: 420000,
    rating: 9.8,
    reviews: 350,
    booked: "4.8k",
    badge: "Bán chạy",
    isFeatured: true,
    features: ["⚡ Tắm khoáng nóng tự nhiên hồ lộ thiên", "✓ Công viên nước trên núi & hồ tạo sóng lớn", "▣ Luộc trứng tại giếng khoáng nóng"],
    description: "Khu du lịch sinh thái suối khoáng nóng tự nhiên Núi Thần Tài với hồ khoáng ấm, đường trượt nước sắc màu và công viên khủng long kỳ thú.",
    highlights: ["Ngâm bồn khoáng nóng tự nhiên phục hồi sức khỏe", "Trải nghiệm dòng sông Lười mát rượi và hồ sóng nhân tạo", "Thưởng thức trứng trường thọ luộc từ nguồn khoáng 80 độ C"],
    ticketTypes: [
      { id: "t1", name: "Vé Phổ Thông Người Lớn", price: 420000, oldPrice: 520000 },
      { id: "t2", name: "Combo Vé Phổ Thông + Buffet Trưa Hơn 70 Món", price: 680000, oldPrice: 800000 }
    ]
  },
  // 48. ĐÀ NẴNG - DU THUYỀN SÔNG HÀN
  {
    id: 48,
    name: "Vé Du Thuyền Sông Hàn Đà Nẵng Về Đêm (Ngắm Cầu Rồng Phun Lửa & Cầu Quay)",
    category: "tour-du-thuyen",
    categoryName: "Du thuyền - Tour",
    location: "Đà Nẵng",
    img: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 200000,
    price: 150000,
    rating: 9.7,
    reviews: 420,
    booked: "6.2k",
    badge: "Ưu đãi HOT",
    features: ["⚡ Dạo thuyền 45 phút ngắm trọn vẹn cảnh sắc đôi bờ sông Hàn", "✓ Chiêm ngưỡng Cầu Rồng phun lửa, phun nước cuối tuần", "▣ Tặng kèm nước suối và múa Chăm Pa trên thuyền"],
    description: "Thưởng ngoạn cảnh sắc lung linh huyền ảo của Đà Nẵng về đêm trên du thuyền sông Hàn hai tầng thoáng mát, lướt êm ả qua 5 cây cầu nổi tiếng.",
    highlights: ["Góc nhìn hoàn hảo ngắm Cầu Rồng phun lửa từ mặt sông", "Màn biểu diễn múa Chăm Pa truyền thống quyến rũ", "Ngắm Vòng quay Mặt Trời Sun Wheel rực rỡ từ xa"],
    ticketTypes: [
      { id: "t1", name: "Vé Du Thuyền Người Lớn (Bao gồm nước uống)", price: 150000, oldPrice: 200000 },
      { id: "t2", name: "Combo Vé Du Thuyền + Bữa Ăn Tối Trên Thuyền", price: 390000, oldPrice: 500000 }
    ]
  },
  // 49. ĐÀ NẴNG - ASIA PARK
  {
    id: 49,
    name: "Vé Công Viên Châu Á Asia Park Đà Nẵng (Vòng Quay Sun Wheel)",
    category: "cong-vien",
    categoryName: "Công viên giải trí",
    location: "Đà Nẵng",
    img: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 250000,
    price: 180000,
    rating: 9.6,
    reviews: 290,
    booked: "3.9k",
    badge: "Vào Cổng Miễn Phí",
    features: ["⚡ Vòng quay Sun Wheel top 10 cao nhất thế giới", "✓ Trải nghiệm tàu lượn Queen Cobra cực đỉnh", "▣ Phố ẩm thực chợ đêm sầm uất"],
    description: "Thiên đường vui chơi giải trí hàng đầu miền Trung với các công trình kiến trúc biểu tượng của 10 quốc gia châu Á và trò chơi cảm giác mạnh.",
    highlights: ["Ngắm toàn cảnh Đà Nẵng về đêm từ độ cao 115m của Sun Wheel", "Tàu lượn dạng treo Queen Cobra lượn vòng 360 độ", "Thưởng thức ẩm thực đường phố tại Chợ đêm Helio"],
    ticketTypes: [
      { id: "t1", name: "Vé Trọn Gói Vòng Quay Sun Wheel & Trò Chơi", price: 180000, oldPrice: 250000 }
    ]
  },
  // 50. ĐÀ NẴNG - BẢO TÀNG 3D
  {
    id: 50,
    name: "Vé Bảo Tàng Nghệ Thuật Tranh 3D Art In Paradise Đà Nẵng",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Đà Nẵng",
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 200000,
    price: 140000,
    rating: 9.5,
    reviews: 185,
    booked: "2.4k",
    badge: "Check-in Ảo Diệu",
    features: ["⚡ Hơn 130 bức tranh 3D vẽ tay nghệ thuật", "✓ 9 khu vực chủ đề kỳ thú từ đại dương đến Ai Cập", "▣ Góc chụp hình siêu thực hài hước"],
    description: "Bảo tàng tranh 3D xoay chiều quy mô lớn nhất miền Trung mang lại những khung hình tương tác sống động, biến bạn thành nhân vật chính trong tranh.",
    highlights: ["Hóa thân vào thế giới khủng long và Ai Cập cổ đại", "Tương tác ảo giác thị giác đỉnh cao", "Không gian máy lạnh mát mẻ phù hợp cho cả gia đình"],
    ticketTypes: [
      { id: "t1", name: "Vé Người Lớn Vào Cổng", price: 140000, oldPrice: 200000 },
      { id: "t2", name: "Vé Trẻ Em (1m - 1m3)", price: 95000, oldPrice: 130000 }
    ]
  },
  // 51. ĐÀ NẴNG - TOUR SƠN TRÀ NGŨ HÀNH SƠN
  {
    id: 51,
    name: "Tour Bán Đảo Sơn Trà & Chùa Linh Ứng - Danh Thắng Ngũ Hành Sơn 1 Ngày",
    category: "trai-nghiem",
    categoryName: "Trải nghiệm nên thử",
    location: "Đà Nẵng",
    img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 490000,
    price: 380000,
    rating: 9.8,
    reviews: 280,
    booked: "3.7k",
    badge: "Tour Văn Hóa",
    features: ["⚡ Xe đưa đón tận nơi tại khách sạn", "✓ Chiêm bái tượng Phật Bà Quán Thế Âm cao 67m", "▣ Khám phá Động Huyền Không & làng đá mỹ nghệ Non Nước"],
    description: "Hành trình tâm linh và thắng cảnh thiên nhiên không thể bỏ qua tại Đà Nẵng, ngắm toàn cảnh bờ biển Mỹ Khê và khám phá hang động Ngũ Hành Sơn.",
    highlights: ["Đón gió biển lồng lộng tại bán đảo Sơn Trà", "Chiêm ngưỡng các hang động kỳ bí lung linh ánh sáng tự nhiên", "Hướng dẫn viên nhiệt tình, am hiểu văn hóa lịch sử"],
    ticketTypes: [
      { id: "t1", name: "Tour Trọn Gói 1 Ngày Người Lớn", price: 380000, oldPrice: 490000 },
      { id: "t2", name: "Tour Trẻ Em (5 - 9 tuổi)", price: 270000, oldPrice: 350000 }
    ]
  },
  // 46. TRUNG QUỐC - TRƯƠNG GIA GIỚI
  {
    id: 46,
    name: "Vé Cáp Treo Trương Gia Giới Cầu Kính & Thiên Môn Sơn - Trung Quốc",
    category: "cap-treo",
    categoryName: "Cáp treo",
    location: "Trung Quốc",
    img: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&q=80&w=800"],
    oldPrice: 1250000,
    price: 990000,
    rating: 9.8,
    reviews: 280,
    booked: "3.7k",
    badge: "Avatar Bay",
    features: ["⚡ Cầu kính dài nhất hẻm vực Trương Gia Giới", "✓ Cáp treo Thiên Môn Sơn 99 khúc cua ngoạn mục", "▣ Cổng Trời Thiên Môn Động kỳ vĩ"],
    description: "Chiêm ngưỡng những cột đá sa thạch dựng đứng nguyên mẫu phim Avatar 3D và bước đi thử thách lòng can đảm trên cầu kính nhìn xuống đáy vực sâu.",
    highlights: ["Chinh phục 999 bậc thang lên Cổng Trời", "Trải nghiệm cáp treo dài hơn 7km", "Hành lang kính ôm sát vách núi cheo leo"],
    ticketTypes: [
      { id: "t1", name: "Vé Trọn Gói Thiên Môn Sơn Tuyến A", price: 990000, oldPrice: 1250000 },
      { id: "t2", name: "Combo Thiên Môn Sơn + Cầu Kính Đại Hiệp Cốc", price: 1450000, oldPrice: 1800000 }
    ]
  }
];

export const CATEGORIES_LIST = [
  { id: "uu-dai", name: "Ưu Đãi Nổi Bật", icon: "Flame" },
  { id: "cong-vien", name: "Công viên giải trí", icon: "Ticket" },
  { id: "trai-nghiem", name: "Trải nghiệm nên thử", icon: "Compass" },
  { id: "show", name: "Vé xem show", icon: "Sparkles" },
  { id: "tour-du-thuyen", name: "Du thuyền - Tour", icon: "Ship" },
  { id: "cong-vien-nuoc", name: "Công viên nước", icon: "Waves" },
  { id: "cap-treo", name: "Cáp treo", icon: "Mountain" },
  { id: "esim", name: "Wifi - eSIM", icon: "Wifi" },
  { id: "san-bay", name: "Dịch vụ sân bay", icon: "Plane" }
];

export const DESTINATIONS_LIST = [
  "Đà Nẵng",
  "Phú Quốc",
  "Nha Trang",
  "Đà Lạt",
  "Hội An",
  "Hà Nội",
  "Hồ Chí Minh",
  "Sapa",
  "Quảng Ninh",
  "Ninh Bình",
  "Huế",
  "Quy Nhơn",
  "Phan Thiết",
  "Vũng Tàu",
  "Tây Ninh",
  "Cần Thơ",
  "Thái Lan",
  "Singapore",
  "Hàn Quốc",
  "Nhật Bản",
  "Trung Quốc",
  "Du thuyền",
  "Quốc tế"
];


