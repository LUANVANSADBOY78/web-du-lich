export const MOCK_PRODUCTS = [
  // 1. ƯU ĐÃI NỔI BẬT & HOT
  {
    id: 1,
    name: "Vé Sun World Bà Nà Hills Đà Nẵng (Cáp treo & Buffet)",
    category: "cap-treo",
    categoryName: "Cáp treo",
    location: "Đà Nẵng",
    img: "https://images.unsplash.com/photo-1594991168175-68a8677c385b?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1594991168175-68a8677c385b?auto=format&fit=crop&q=80&w=800"
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
    img: "https://images.unsplash.com/photo-1596758416624-9b24479e4d5f?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1596758416624-9b24479e4d5f?auto=format&fit=crop&q=80&w=800"
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
    img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1621217036666-85dc021a8123?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1621217036666-85dc021a8123?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1500514960449-0648c66e2c38?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1500514960449-0648c66e2c38?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1582650625119-3a31f8418b0d?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1582650625119-3a31f8418b0d?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-15405541338287-41700207dee6?auto=format&fit=crop&q=80&w=800"],
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
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"],
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
  "Hà Nội",
  "Hồ Chí Minh",
  "Hội An",
  "Sapa",
  "Quảng Ninh",
  "Quốc tế"
];
