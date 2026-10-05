export const MOCK_TOURS = [
  // 1. TOUR TRONG NƯỚC - MIỀN TRUNG
  {
    id: 'tour-1',
    code: 'TOUR2026001',
    name: "Tour Đà Nẵng - Bà Nà Hills - Cầu Vàng - Hội An - Huế 4N3Đ (Bao Gồm Vé Máy Bay)",
    type: "trong-nuoc",
    region: "mien-trung",
    category: "khuyen-mai",
    departure: "Hồ Chí Minh",
    destination: "Đà Nẵng",
    duration: "4 ngày 3 đêm",
    vehicle: "Máy bay & Xe du lịch",
    price: 4990000,
    oldPrice: 6990000,
    childPrice: 3490000,
    babyPrice: 990000,
    rating: 9.8,
    reviews: 145,
    booked: "1.2k",
    badge: "Giảm 2 Triệu",
    isHot: true,
    img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800"
    ],
    highlights: ["Vé Cầu Vàng Bà Nà Hills", "Khách sạn 4 sao view biển", "Đêm Phố cổ Hội An", "Ẩm thực Cố đô Huế"],
    departures: [
      { startDate: '2026-10-15', endDate: '2026-10-18', adultPrice: 4990000, childPrice: 3490000, availableSeats: 8, status: 'Còn chỗ' },
      { startDate: '2026-10-22', endDate: '2026-10-25', adultPrice: 5190000, childPrice: 3690000, availableSeats: 12, status: 'Còn chỗ' },
      { startDate: '2026-11-05', endDate: '2026-11-08', adultPrice: 4990000, childPrice: 3490000, availableSeats: 15, status: 'Còn chỗ' }
    ],
    includes: ["Vé máy bay khứ hồi khứ hồi có 20kg ký gửi", "Khách sạn 4 sao tiêu chuẩn 2 khách/phòng", "Các bữa ăn theo chương trình", "Xe đưa đón điều hòa đời mới", "Vé tham quan các điểm trong lịch trình", "Bảo hiểm du lịch mức 100.000.000đ/vụ"],
    excludes: ["Chi phí cá nhân ngoài chương trình", "Tiền Tip HDV và tài xế (3$/ngày/khách)", "Phụ thu phòng đơn nếu ở 1 mình"],
    itinerary: [
      { day: 1, title: "Ngày 1: TP.HCM -> Đà Nẵng -> Sơn Trà -> Phố Cổ Hội An", detail: "Đón tại Tân Sơn Nhất đáp chuyến bay đi Đà Nẵng. Viếng Chùa Linh Ứng Sơn Trà. Chiều dạo Phố cổ Hội An rực rỡ đèn lồng." },
      { day: 2, title: "Ngày 2: Sun World Bà Nà Hills -> Check-in Cầu Vàng", detail: "Chinh phục cáp treo Bà Nà. Check-in Cầu Vàng, Làng Pháp, Fantasy Park. Buffet trưa 100+ món." },
      { day: 3, title: "Ngày 3: Đà Nẵng -> Cố Đô Huế -> Đại Nội -> Chùa Thiên Mụ", detail: "Di chuyển qua hầm Hải Vân đến Huế. Tham quan Đại Nội, Chùa Thiên Mụ, Lăng Khải Định. Thưởng ca Huế." },
      { day: 4, title: "Ngày 4: Chợ Hàn Mua Sắm -> Tiễn Sân Bay Đà Nẵng", detail: "Tự do mua sắm đặc sản miền Trung tại Chợ Hàn. Xe tiễn đoàn ra sân bay Đà Nẵng về lại TP.HCM." }
    ]
  },

  // 2. TOUR TRONG NƯỚC - MIỀN NAM / PHÚ QUỐC
  {
    id: 'tour-2',
    code: 'TOUR2026002',
    name: "Tour Phú Quốc 3N2Đ - Canô 4 Đảo Siêu Tốc & Grand World Không Ngủ",
    type: "trong-nuoc",
    region: "mien-nam",
    category: "hot",
    departure: "Hà Nội",
    destination: "Phú Quốc",
    duration: "3 ngày 2 đêm",
    vehicle: "Máy bay & Canô",
    price: 3890000,
    oldPrice: 4890000,
    childPrice: 2790000,
    babyPrice: 790000,
    rating: 9.7,
    reviews: 210,
    booked: "2.4k",
    badge: "Tour Bán Chạy",
    isHot: true,
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"],
    highlights: ["Canô 4 đảo Nam Phú Quốc", "Tặng chụp ảnh SUP Flycam", "Check-in Grand World Venice", "Khách sạn 4 sao sát biển"],
    departures: [
      { startDate: '2026-10-18', endDate: '2026-10-20', adultPrice: 3890000, childPrice: 2790000, availableSeats: 5, status: 'Còn chỗ' },
      { startDate: '2026-10-25', endDate: '2026-10-27', adultPrice: 3890000, childPrice: 2790000, availableSeats: 10, status: 'Còn chỗ' }
    ],
    includes: ["Vé máy bay khứ hồi", "Khách sạn 4 sao", "Canô 4 đảo + ăn trưa hải sản", "Quay Flycam"],
    excludes: ["Chi phí cá nhân", "Vé VinWonders / Safari"],
    itinerary: [
      { day: 1, title: "Ngày 1: Hà Nội -> Phú Quốc -> Grand World", detail: "Đón tại Nội Bài bay Phú Quốc. Tham quan Grand World, xem show Sắc màu Venice." },
      { day: 2, title: "Ngày 2: Canô 4 Đảo -> Chụp SUP Flycam -> Lặn San Hô", detail: "Đến An Thới đi canô tham quan Hòn Mây Rút, Hòn Móng Tay. Lặn ngắm san hô." },
      { day: 3, title: "Ngày 3: Sunset Town -> Cầu Hôn -> Tiễn Sân Bay", detail: "Check-in Thị trấn Hoàng hôn Sunset Town, mua ngọc trai. Tiễn sân bay." }
    ]
  },

  // 3. TOUR NƯỚC NGOÀI - HÀN QUỐC
  {
    id: 'tour-3',
    code: 'TOUR2026003',
    name: "Tour Hàn Quốc 5N4Đ: Seoul - Đảo Nami - Công Viên Everland - Cảnh Phúc Cung",
    type: "nuoc-ngoai",
    region: "nhat-han",
    category: "khuyen-mai",
    departure: "Hồ Chí Minh",
    destination: "Hàn Quốc",
    duration: "5 ngày 4 đêm",
    vehicle: "Máy bay Vietnam Airlines / Asiana",
    price: 14990000,
    oldPrice: 17990000,
    childPrice: 11990000,
    babyPrice: 3990000,
    rating: 9.9,
    reviews: 320,
    booked: "4.1k",
    badge: "Hot Deal",
    isHot: true,
    img: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=800"],
    highlights: ["Bao gồm Visa Hàn Quốc", "Trải nghiệm làm Kimchi & mặc Hanbok", "Thăm Đảo Nami lãng mạn", "Vui chơi Everland"],
    departures: [
      { startDate: '2026-10-20', endDate: '2026-10-25', adultPrice: 14990000, childPrice: 11990000, availableSeats: 6, status: 'Gần hết chỗ' },
      { startDate: '2026-11-10', endDate: '2026-11-15', adultPrice: 14990000, childPrice: 11990000, availableSeats: 14, status: 'Còn chỗ' }
    ],
    includes: ["Vé máy bay khứ hồi", "Lệ phí Visa Hàn Quốc", "Khách sạn 4 sao Seoul", "Các bữa ăn chuẩn Hàn"],
    excludes: ["Tiền Tip HDV 40$/khách/tour", "Hộ chiếu còn hạn trên 6 tháng"],
    itinerary: [
      { day: 1, title: "Ngày 1: TP.HCM -> Sân Bay Incheon Seoul", detail: "Tập trung Tân Sơn Nhất đáp chuyến bay đêm đi Incheon Hàn Quốc." },
      { day: 2, title: "Ngày 2: Incheon -> Đảo Nami -> Tháp N Seoul", detail: "Tham quan Đảo Nami mùa lá đỏ/vàng lãng mạn. Khám phá Tháp truyền hình N Seoul." },
      { day: 3, title: "Ngày 3: Cung Điện Cảnh Phúc -> Mặc Hanbok -> Tháp Lotte", detail: "Thăm Cung điện Gyeongbokgung, Viện bảo tàng dân gian, Trải nghiệm mặc Hanbok." },
      { day: 4, title: "Ngày 4: Công Viên Giải Trí Everland -> Mua Sắm Myeongdong", detail: "Vui chơi thả ga tại Everland. Tối mua sắm mỹ phẩm tại phố Myeongdong." },
      { day: 5, title: "Ngày 5: Siêu Thị Lotte -> Incheon -> TP.HCM", detail: "Mua đặc sản sâm tươi, ớt bột Hàn Quốc. Tiễn sân bay Incheon về Việt Nam." }
    ]
  },

  // 4. TOUR NƯỚC NGOÀI - NHẬT BẢN
  {
    id: 'tour-4',
    code: 'TOUR2026004',
    name: "Tour Nhật Bản 6N5Đ: Tokyo - Núi Phú Sĩ - Kyoto - Osaka - Tàu Siêu Tốc Shinkansen",
    type: "nuoc-ngoai",
    region: "nhat-han",
    category: "cao-cap",
    departure: "Hà Nội",
    destination: "Nhật Bản",
    duration: "6 ngày 5 đêm",
    vehicle: "Máy bay Japan Airlines",
    price: 26990000,
    oldPrice: 29990000,
    childPrice: 21990000,
    babyPrice: 5990000,
    rating: 9.9,
    reviews: 195,
    booked: "2.8k",
    badge: "Tour Cao Cấp",
    isHot: true,
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800"],
    highlights: ["Ngắm Núi Phú Sĩ Trạm 5", "Trải nghiệm Tàu Shinkansen 300km/h", "Tắm khoáng Onsen chuẩn Nhật", "Thưởng thức Bò Kобе thượng hạng"],
    departures: [
      { startDate: '2026-11-01', endDate: '2026-11-06', adultPrice: 26990000, childPrice: 21990000, availableSeats: 4, status: 'Gần hết chỗ' }
    ],
    includes: ["Vé máy bay JAL 46kg hành lý", "Visa Nhật Bản", "Khách sạn 4 sao", "Trải nghiệm Onsen"],
    excludes: ["Tiền tip 42$/khách"],
    itinerary: [
      { day: 1, title: "Ngày 1: Hà Nội -> Narita Tokyo", detail: "Đáp chuyến bay JAL đến Tokyo. Về khách sạn nghỉ ngơi." },
      { day: 2, title: "Ngày 2: Chùa Asakusa Kannon -> Tháp Skytree -> Núi Phú Sĩ", detail: "Viếng Chùa Asakusa cổ nhất Tokyo. Di chuyển đến khu vực Núi Phú Sĩ ngắm cảnh, ngâm Onsen." },
      { day: 3, title: "Ngày 3: Trạm 5 Núi Phú Sĩ -> Làng Cổ Oshino Hakkai -> Shinkansen", detail: "Lên trạm 5 ngắm ngọn núi linh thiêng. Trải nghiệm tàu siêu tốc Shinkansen đi Nagoya." },
      { day: 4, title: "Ngày 4: Cố Đô Kyoto -> Chùa Vàng Kinkakuji -> Osaka", detail: "Thăm Cố đô Kyoto, Rừng trúc Arashiyama, Cổng Fushimi Inari ngàn cổng Torii." },
      { day: 5, title: "Ngày 5: Lâu Đài Osaka -> Phố Mua Sắm Shinsaibashi", detail: "Chụp ảnh Lâu đài Osaka hoành tráng. Mua sắm sầm uất tại Dotonbori." },
      { day: 6, title: "Ngày 6: Sân Bay Kansai Osaka -> Hà Nội", detail: "Xe đưa ra sân bay Kansai làm thủ tục về Việt Nam." }
    ]
  },

  // 5. TOUR DU THUYỀN
  {
    id: 'tour-5',
    code: 'TOUR2026005',
    name: "Tour Du Thuyền 5 Sao Spectrum of the Seas: Singapore - Malaysia - Thái Lan 5N4Đ",
    type: "nuoc-ngoai",
    region: "du-thuyen",
    category: "du-thuyen",
    departure: "Hồ Chí Minh",
    destination: "Singapore",
    duration: "5 ngày 4 đêm",
    vehicle: "Du thuyền siêu sang & Máy bay",
    price: 18990000,
    oldPrice: 21990000,
    childPrice: 14990000,
    babyPrice: 4990000,
    rating: 9.9,
    reviews: 88,
    booked: "950",
    badge: "Du Thuyền 5 Star",
    isHot: true,
    img: "https://images.unsplash.com/photo-1500514960449-0648c66e2c38?auto=format&fit=crop&q=80&w=800",
    gallery: ["https://images.unsplash.com/photo-1500514960449-0648c66e2c38?auto=format&fit=crop&q=80&w=800"],
    highlights: ["Siêu du thuyền 18 tầng đỉnh cao thế giới", "Phòng Balcony hướng biển sang trọng", "Ăn uống 24/7 hàng chục nhà hàng cao cấp", "Vui chơi lướt sóng, đu quay North Star"],
    departures: [
      { startDate: '2026-11-15', endDate: '2026-11-19', adultPrice: 18990000, childPrice: 14990000, availableSeats: 6, status: 'Còn chỗ' }
    ],
    includes: ["Vé máy bay khứ hồi", "Hải trình du thuyền 5 sao bao gồm cabin & ăn uống trọn gói", "Bảo hiểm du lịch quốc tế"],
    excludes: ["Tiền tip du thuyền 18$/đêm/khách"],
    itinerary: [
      { day: 1, title: "Ngày 1: TP.HCM -> Singapore -> Làm Thủ Tục Lên Du Thuyền Spectrum", detail: "Bay Singapore. Xe đưa ra cảng Marina Bay Cruise Centre làm thủ tục lên du thuyền 5 sao." },
      { day: 2, title: "Ngày 2: Hải Trình Trên Biển -> Khám Phá Siêu Du Thuyền", detail: "Thưởng thức buffet cao cấp, trải nghiệm đu quay North Star, mô phỏng nhảy dù iFly." },
      { day: 3, title: "Ngày 3: Cập Cảng Penang Malaysia -> Tham Quan Phố Cổ", detail: "Cập cảng Penang. Tham quan Di sản thế giới George Town, Chùa Kek Lok Si." },
      { day: 4, title: "Ngày 4: Cập Cảng Phuket Thái Lan -> Biển Patong", detail: "Du thuyền cập bến đảo thiên đường Phuket. Tự do mua sắm và thưởng thức ẩm thực." },
      { day: 5, title: "Ngày 5: Cập Cảng Singapore -> Jewel Changi -> TP.HCM", detail: "Du thuyền cập cảng Singapore. Thăm thác nước Jewel Changi trước khi bay về." }
    ]
  }
];

export const TOUR_CATEGORIES = [
  { id: "all", name: "Tất cả Tour" },
  { id: "khuyen-mai", name: "Tour Khuyến Mãi" },
  { id: "hot", name: "Tour HOT / Bán Chạy" },
  { id: "trong-nuoc", name: "Tour Trong Nước" },
  { id: "nuoc-ngoai", name: "Tour Nước Ngoài" },
  { id: "du-thuyen", name: "Tour Du Thuyền" },
  { id: "cao-cap", name: "Tour Cao Cấp" }
];

