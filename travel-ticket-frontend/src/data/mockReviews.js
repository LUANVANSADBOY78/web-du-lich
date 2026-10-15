// src/data/mockReviews.js
// Hệ thống dữ liệu đánh giá & bình luận du lịch phong phú chuẩn phong cách iVIVU / GoTravel

export const DEFAULT_MOCK_REVIEWS = [
  // 1. TOUR NHẬT BẢN MÙA THU (tour-5)
  {
    id: 'rev-1',
    tourId: 'tour-5',
    author: 'Trần Minh Quân',
    avatarColor: 'from-blue-500 to-indigo-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '14/10/2026 (Hôm qua)',
    title: 'Chuyến đi mùa thu Nhật Bản đẹp như mơ!',
    comment: 'Gia đình mình vừa hoàn thành chuyến đi 6N5Đ từ Hà Nội. Lễ hội lá đỏ ở hồ Kawaguchiko nhìn ngắm núi Phú Sĩ đẹp ngỡ ngàng, bố mẹ mình lớn tuổi đi rất thoải mái vì lịch trình thư thái, không bị hối thúc. Hướng dẫn viên tên Nam cực kỳ nhiệt tình, am hiểu văn hóa Nhật và chụp ảnh cho gia đình siêu có tâm. Khách sạn chuẩn 4 sao sạch sẽ, tắm khoáng Onsen thư giãn tuyệt vời, bữa bò Kobe và cua tuyết rất ngon!',
    helpfulCount: 38,
    verified: true,
    tags: ['Núi Phú Sĩ', 'Lá đỏ Momiji', 'Bò Kobe', 'Tắm Onsen'],
    images: [
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=400'
    ],
    reply: {
      author: 'GoTravel Chăm Sóc Khách Hàng',
      date: '14/10/2026',
      content: 'Dạ GoTravel xin chân thành cảm ơn anh Trần Minh Quân và gia đình đã tin tưởng đồng hành cùng chúng em. Niềm vui và sự hài lòng của hai bác cùng gia đình là động lực to lớn nhất cho đội ngũ HDV và GoTravel!'
    }
  },
  {
    id: 'rev-2',
    tourId: 'tour-5',
    author: 'Nguyễn Thị Bích Ngọc',
    avatarColor: 'from-rose-500 to-pink-600',
    rating: 5,
    tripType: 'Đi theo cặp đôi',
    date: '12/10/2026 (3 ngày trước)',
    title: 'Trải nghiệm vượt xa kỳ vọng, thủ tục visa siêu nhanh',
    comment: 'Hai vợ chồng mình chọn tour này đi tuần trăng mật và hoàn toàn hài lòng 100%. Đội ngũ làm visa hỗ trợ giấy tờ rất tận tâm, chỉ 6 ngày là có kết quả. Đi tàu Shinkansen êm ru, Kyoto mùa lá đỏ thơ mộng chụp ảnh cháy máy. Rất cảm ơn GoTravel đã sắp xếp chu đáo từ xe cộ đến các bữa ăn!',
    helpfulCount: 26,
    verified: true,
    tags: ['Tàu Shinkansen', 'Trăng mật', 'Kyoto'],
    images: [
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=400'
    ],
    reply: {
      author: 'GoTravel Chăm Sóc Khách Hàng',
      date: '13/10/2026',
      content: 'GoTravel chúc mừng hạnh phúc của hai bạn! Chúc anh chị luôn có thật nhiều hành trình ngọt ngào và đong đầy kỷ niệm đẹp cùng nhau.'
    }
  },
  {
    id: 'rev-3',
    tourId: 'tour-5',
    author: 'Bác Lê Văn Thắng',
    avatarColor: 'from-amber-500 to-emerald-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '10/10/2026 (5 ngày trước)',
    title: 'Người lớn tuổi đi rất khoẻ, ăn uống hợp khẩu vị',
    comment: 'Tôi và bà xã 68 tuổi lần đầu đi Nhật Bản. Lúc đầu lo lắng không theo kịp đoàn nhưng hướng dẫn viên và lái xe người Nhật hỗ trợ rất chu đáo, luôn nhường lối ưu tiên. Đồ ăn ấm nóng, cơm dẻo canh thanh. Tối ngủ khách sạn đệm êm, sáng dậy tỉnh táo ngắm lá phong đỏ rực.',
    helpfulCount: 42,
    verified: true,
    tags: ['Người cao tuổi', 'Chu đáo', 'Khách sạn 4 sao'],
    images: [],
    reply: {
      author: 'GoTravel Đội Ngũ Tour Trưởng',
      date: '10/10/2026',
      content: 'Kính chúc bác Thắng và bác gái luôn dồi dào sức khỏe, trường thọ và an vui bên con cháu ạ!'
    }
  },
  {
    id: 'rev-4',
    tourId: 'tour-5',
    author: 'Đặng Thị Phương Thảo',
    avatarColor: 'from-purple-500 to-pink-500',
    rating: 4,
    tripType: 'Đi cùng bạn bè',
    date: '06/10/2026 (1 tuần trước)',
    title: 'Cảnh đẹp tuyệt vời, Ginza mua sắm thoả thích',
    comment: 'Nhóm 3 người bạn mình vừa có một chuyến đi tuyệt vời. Hồ Kawaguchiko lá phong đỏ rực soi bóng Phú Sĩ quá đỉnh. Chỉ tiếc là thời gian tự do mua sắm ở Ginza hơi ngắn vì nhiều cửa hàng muốn ghé quá. Đánh giá 4.5/5 sao, sẽ quay lại vào mùa hoa anh đào!',
    helpfulCount: 15,
    verified: true,
    tags: ['Mua sắm Ginza', 'Lá đỏ', 'Chụp ảnh đẹp'],
    images: [],
    reply: null
  },

  // 2. TOUR HÀN QUỐC MÙA THU (tour-4)
  {
    id: 'rev-5',
    tourId: 'tour-4',
    author: 'Lê Hoàng Yến',
    avatarColor: 'from-amber-500 to-orange-600',
    rating: 5,
    tripType: 'Đi cùng bạn bè',
    date: '13/10/2026 (2 ngày trước)',
    title: 'Tour Hàn Quốc mùa thu rực rỡ, Everland vui hết nấc',
    comment: 'Nhóm 4 đứa mình vừa đi tour Hàn Quốc về. Đảo Nami mùa thu cây ngân hạnh vàng rực như trong phim Bản Tình Ca Mùa Đông, công viên Everland rộng và nhiều trò chơi hấp dẫn. Bữa ăn gà hầm sâm và thịt nướng BBQ chuẩn vị Hàn ăn rất no. Đánh giá 5 sao cho bạn hướng dẫn viên!',
    helpfulCount: 31,
    verified: true,
    tags: ['Đảo Nami', 'Everland', 'Gà hầm sâm', 'BBQ Hàn Quốc'],
    images: [
      'https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&q=80&w=400'
    ],
    reply: {
      author: 'GoTravel CSKH Quốc Tế',
      date: '13/10/2026',
      content: 'Cảm ơn Hoàng Yến và nhóm bạn! Rất vui vì các bạn đã có một bộ ảnh mùa thu lung linh tại Nami.'
    }
  },
  {
    id: 'rev-6',
    tourId: 'tour-4',
    author: 'Võ Thành Đạt',
    avatarColor: 'from-emerald-500 to-teal-600',
    rating: 5,
    tripType: 'Đi theo cặp đôi',
    date: '09/10/2026 (6 ngày trước)',
    title: 'Thư viện Starfield hoành tráng, Cung điện Gyeongbokgung đẹp',
    comment: 'Tour rất đáng đồng tiền bát gạo! Được mặc trang phục Hanbok chụp ảnh miễn phí vé vào cung Gyeongbokgung. Thư viện khổng lồ Starfield ở Suwon bên ngoài lộng lẫy gấp 10 lần trong ảnh. Xe đưa đón máy sưởi ấm cúng.',
    helpfulCount: 19,
    verified: true,
    tags: ['Hanbok', 'Starfield', 'Cung điện'],
    images: [
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=400'
    ],
    reply: null
  },
  {
    id: 'rev-7',
    tourId: 'tour-4',
    author: 'Chị Mai Lan & Gia đình',
    avatarColor: 'from-pink-500 to-rose-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '05/10/2026 (10 ngày trước)',
    title: 'Các bé thích mê công viên Everland và gấu trúc Bao Family',
    comment: 'Nhà mình có 2 bé nhỏ 6 tuổi và 9 tuổi. Bé nào cũng mê mẩn khu Panda World ngắm gấu trúc ăn tre và đi thuyền safari. Hướng dẫn viên giúp gia đình giữ chỗ và xếp hàng rất thông minh. Khách sạn sạch sẽ gần trung tâm.',
    helpfulCount: 22,
    verified: true,
    tags: ['Gia đình', 'Everland', 'Trẻ em thích'],
    images: [],
    reply: null
  },

  // 3. TOUR NHẬT BẢN 5N5Đ (tour-6)
  {
    id: 'rev-8',
    tourId: 'tour-6',
    author: 'Phan Gia Huy',
    avatarColor: 'from-cyan-500 to-blue-600',
    rating: 5,
    tripType: 'Đi cùng bạn bè',
    date: '11/10/2026 (4 ngày trước)',
    title: 'Làng cổ Oshino Hakkai và lẩu cua tuyết siêu đỉnh!',
    comment: 'Hành trình 5N5Đ khám phá trọn vẹn từ Osaka đến Tokyo. Bữa lẩu cua tuyết tươi rói ngọt lịm ăn thoả thích. Làng cổ Oshino Hakkai nước suối trong vắt nhìn thấy đáy, xa xa là núi Phú Sĩ tuyết phủ trắng ngọn.',
    helpfulCount: 27,
    verified: true,
    tags: ['Lẩu cua tuyết', 'Oshino Hakkai', 'Phú Sĩ'],
    images: [
      'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80&w=400'
    ],
    reply: null
  },
  {
    id: 'rev-9',
    tourId: 'tour-6',
    author: 'Đoàn Cty Công Nghệ F-Tech (18 khách)',
    avatarColor: 'from-blue-600 to-violet-600',
    rating: 5,
    tripType: 'Đi một mình / Công tác',
    date: '07/10/2026 (1 tuần trước)',
    title: 'Tổ chức Teambuilding & Company Trip chuyên nghiệp',
    comment: 'Đại diện công ty gửi lời cảm ơn sâu sắc tới GoTravel. Tour 18 người được sắp xếp xe riêng rộng rãi, có banner chào đón, các bữa ăn đặt phòng riêng chu đáo. Toàn bộ nhân viên công ty đều rất hào hứng và đánh giá cao.',
    helpfulCount: 35,
    verified: true,
    tags: ['Công ty', 'Teambuilding', 'Chuyên nghiệp'],
    images: [],
    reply: {
      author: 'Ban Giám Đốc GoTravel',
      date: '08/10/2026',
      content: 'GoTravel trân trọng cảm ơn quý công ty F-Tech. Rất hy vọng tiếp tục được đồng hành cùng toàn thể anh chị em trong các chuyến tham quan tiếp theo!'
    }
  },

  // 4. DU THUYỀN 5 SAO (tour-3)
  {
    id: 'rev-10',
    tourId: 'tour-3',
    author: 'Nguyễn Văn Hùng',
    avatarColor: 'from-sky-500 to-blue-700',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '10/10/2026 (5 ngày trước)',
    title: 'Du thuyền Genting Dream 5 sao đẳng cấp thế giới',
    comment: 'Siêu du thuyền quá to và hoành tráng, các cháu nhỏ nhà mình mê mẩn máng trượt nước và xem kịch xiếc buổi tối. Đồ ăn buffet đổi món liên tục từ Á sang Âu, phòng có ban công riêng ngắm biển bình minh tuyệt đẹp.',
    helpfulCount: 45,
    verified: true,
    tags: ['Du thuyền 5 sao', 'Buffet quốc tế', 'Máng trượt nước'],
    images: [
      'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=400'
    ],
    reply: {
      author: 'GoTravel Du Thuyền',
      date: '10/10/2026',
      content: 'Cảm ơn anh Hùng và gia đình! Genting Dream là một trong những sản phẩm du thuyền được yêu thích nhất năm 2026 của GoTravel.'
    }
  },

  // 5. TOUR ĐÀ NẴNG - HỘI AN - BÀ NÀ (tour-10 / tour-25)
  {
    id: 'rev-11',
    tourId: 'tour-10',
    author: 'Phạm Thanh Hương',
    avatarColor: 'from-teal-500 to-cyan-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '12/10/2026 (3 ngày trước)',
    title: 'Đi tàu hỏa khoang 4 ngắm đèo Hải Vân cực chill!',
    comment: 'Trải nghiệm đi tàu hỏa ngắm vịnh Lăng Cô và đèo Hải Vân thật sự rất đẹp và thư thái. Khoang tàu sạch sẽ, máy lạnh mát mẻ. Khách sạn ở Đà Nẵng sát biển Mỹ Khê, vé cáp treo Bà Nà Hills và buffet đồ ăn rất ngon miệng.',
    helpfulCount: 29,
    verified: true,
    tags: ['Tàu hỏa', 'Đèo Hải Vân', 'Bà Nà Hills', 'Biển Mỹ Khê'],
    images: [],
    reply: null
  },
  {
    id: 'rev-12',
    tourId: 'tour-10',
    author: 'Hoàng Minh Tuấn',
    avatarColor: 'from-violet-500 to-purple-600',
    rating: 5,
    tripType: 'Đi theo cặp đôi',
    date: '08/10/2026 (1 tuần trước)',
    title: 'Phố cổ Hội An về đêm lung linh huyền ảo',
    comment: 'Đi thuyền thả hoa đăng trên sông Hoài lãng mạn vô cùng. Ăn cao lầu, bánh mì Phượng nổi tiếng chuẩn vị. HDV giới thiệu từng ngóc ngách di tích cổ rất cuốn hút.',
    helpfulCount: 18,
    verified: true,
    tags: ['Hội An', 'Thả hoa đăng', 'Ẩm thực'],
    images: [],
    reply: null
  },

  // 6. TOUR TRUNG QUỐC (tour-2 / tour-7)
  {
    id: 'rev-13',
    tourId: 'tour-2',
    author: 'Vũ Hải Đăng',
    avatarColor: 'from-purple-500 to-indigo-600',
    rating: 5,
    tripType: 'Đi theo cặp đôi',
    date: '11/10/2026 (4 ngày trước)',
    title: 'Ô Trấn và Tây Đường đẹp nao lòng, tặng Hán phục xịn xò',
    comment: 'Thích nhất là trải nghiệm ngồi thuyền dạo cổ trấn Tây Đường và được tặng set chụp Hán phục. Cảnh sắc hữu tình, Bến Thượng Hải về đêm lung linh rực rỡ. Đồ ăn Trung Hoa phong phú, đoàn đi xe đời mới rất êm.',
    helpfulCount: 33,
    verified: true,
    tags: ['Cổ trấn', 'Hán phục', 'Bến Thượng Hải'],
    images: [],
    reply: null
  },
  {
    id: 'rev-14',
    tourId: 'tour-7',
    author: 'Trịnh Kim Ngân',
    avatarColor: 'from-emerald-600 to-teal-700',
    rating: 5,
    tripType: 'Đi cùng bạn bè',
    date: '09/10/2026 (6 ngày trước)',
    title: 'Cửu Trại Câu thiên đường nơi hạ giới, nước hồ ngũ sắc',
    comment: 'Không bõ công vượt đường xa đến Cửu Trại Câu. Nước hồ xanh biếc nhìn thấy tận đáy cây rừng hóa thạch. Vườn gấu trúc Thành Đô gặp được mấy chú gấu trúc tròn xoe lăn lộn ăn trúc cưng xỉu!',
    helpfulCount: 40,
    verified: true,
    tags: ['Cửu Trại Câu', 'Gấu trúc Panda', 'Thiên nhiên'],
    images: [],
    reply: {
      author: 'GoTravel CSKH',
      date: '10/10/2026',
      content: 'Cảm ơn bạn Kim Ngân! Mùa thu đông là thời điểm Cửu Trại Câu khoác lên màu áo kỳ diệu nhất trong năm.'
    }
  },

  // 7. CÁC ĐÁNH GIÁ THỰC TẾ KHÁC
  {
    id: 'rev-15',
    tourId: 'tour-1',
    author: 'Đặng Tuấn Kiệt',
    avatarColor: 'from-emerald-500 to-teal-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '08/10/2026 (1 tuần trước)',
    title: 'Dịch vụ bay Vietnam Airlines chu đáo, hành lý thoải mái',
    comment: 'Tour tổ chức rất chuyên nghiệp, bay Vietnam Airlines hành lý thoải mái 23kg gửi nên mua sắm quà tẹt ga. Thư viện Starfield ở Suwon to đẹp ngoài đời còn lộng lẫy hơn trên hình. Khách sạn trung tâm tiện đi dạo chợ đêm Myeongdong. Sẽ ủng hộ GoTravel dài dài!',
    helpfulCount: 36,
    verified: true,
    tags: ['Vietnam Airlines', 'Myeongdong', 'Starfield'],
    images: [],
    reply: {
      author: 'GoTravel Hỗ Trợ Tour Quốc Tế',
      date: '09/10/2026',
      content: 'Cảm ơn anh Kiệt! GoTravel luôn lựa chọn các hãng hàng không hàng đầu để đảm bảo trải nghiệm bay êm ái và hành lý thuận tiện nhất cho quý khách.'
    }
  },
  {
    id: 'rev-16',
    tourId: 'tour-8',
    author: 'Bùi Thị Tuyết Mai',
    avatarColor: 'from-pink-500 to-rose-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '06/10/2026 (9 ngày trước)',
    title: 'Tour Sapa đỉnh Fansipan mây bồng bềnh như cõi tiên',
    comment: 'Lên đỉnh Fansipan may mắn gặp ngày nắng đẹp, mây cuồn cuộn dưới chân tượng Phật A Di Đà sừng sững. Khách sạn ở trung tâm thị xã Sapa view thung lũng Mường Hoa rất thơ. Đồ nướng Sapa buổi tối ngon tuyệt.',
    helpfulCount: 25,
    verified: true,
    tags: ['Fansipan', 'Sapa', 'Biển mây'],
    images: [],
    reply: null
  },
  {
    id: 'rev-17',
    tourId: 'tour-12',
    author: 'Lâm Chí Dũng',
    avatarColor: 'from-amber-600 to-orange-700',
    rating: 5,
    tripType: 'Đi cùng bạn bè',
    date: '04/10/2026 (11 ngày trước)',
    title: 'Tour Tây Ninh cáp treo Núi Bà Đen hoành tráng kỷ lục',
    comment: 'Cáp treo hiện đại lên đỉnh Vân Sơn ngắm tượng Phật Tây Bổ Đà Sơn cực kỳ linh thiêng. Vườn hoa bạt ngàn mát mẻ như Đà Lạt. Đi trong ngày từ Sài Gòn rất thuận tiện.',
    helpfulCount: 16,
    verified: true,
    tags: ['Núi Bà Đen', 'Tây Ninh', 'Tượng Phật Bà'],
    images: [],
    reply: null
  },
  {
    id: 'rev-18',
    tourId: 'tour-15',
    author: 'Dương Thuỳ Chi',
    avatarColor: 'from-teal-500 to-emerald-600',
    rating: 4,
    tripType: 'Đi theo cặp đôi',
    date: '02/10/2026 (2 tuần trước)',
    title: 'Phú Quốc hoàng hôn Bãi Trường đẹp mê mẩn',
    comment: 'Đi tour cano 4 đảo ngắm san hô bằng mắt kính rất thích. Đi cáp treo Hòn Thơm vượt biển dài nhất thế giới. Điểm trừ nhẹ là hôm đi trời có một cơn mưa rào buổi chiều nhưng HDV đổi lịch trình ghé Grand World rất linh hoạt.',
    helpfulCount: 20,
    verified: true,
    tags: ['Phú Quốc', 'Cano 4 đảo', 'Cáp treo Hòn Thơm'],
    images: [],
    reply: null
  },
  {
    id: 'rev-19',
    tourId: 'tour-20',
    author: 'Ngô Thanh Vân',
    avatarColor: 'from-indigo-500 to-purple-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '30/09/2026 (2 tuần trước)',
    title: 'Tour Miền Tây chợ nổi Cái Răng và Rừng tràm Trà Sư',
    comment: 'Sáng sớm đi xuồng ăn tô bún nước lèo và uống cà phê kho trên sông Cái Răng rất vui. Rừng tràm Trà Sư bèo xanh ngát mắt, tiếng chim hót ríu rít cả khu rừng.',
    helpfulCount: 28,
    verified: true,
    tags: ['Chợ nổi', 'Miền Tây', 'Rừng tràm Trà Sư'],
    images: [],
    reply: null
  },
  {
    id: 'rev-20',
    tourId: 'tour-22',
    author: 'Đỗ Quang Vinh',
    avatarColor: 'from-blue-600 to-cyan-600',
    rating: 5,
    tripType: 'Đi cùng bạn bè',
    date: '28/09/2026 (2 tuần trước)',
    title: 'Tour Singapore - Malaysia 5N4Đ mua sắm và vui chơi cực đã',
    comment: 'Tham quan Thác nước Jewel Changi, khu vườn Gardens by the Bay huyền ảo về đêm. Ở Malaysia được lên cao nguyên Genting đi cáp treo và thử vận may. Khách sạn 4 sao sạch đẹp đầy đủ tiện nghi.',
    helpfulCount: 23,
    verified: true,
    tags: ['Singapore', 'Malaysia', 'Gardens by the Bay'],
    images: [],
    reply: null
  }
];

// Danh sách review dự phòng thông minh cho bất kỳ tour/vé nào chưa có ID cụ thể
const SMART_SAMPLE_REVIEWS = [
  {
    author: 'Nguyễn Quốc Tuấn',
    avatarColor: 'from-blue-500 to-indigo-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: 'Hôm qua',
    title: 'Dịch vụ chất lượng cao, đúng như cam kết',
    comment: 'Chuyến đi diễn ra suôn sẻ và trọn vẹn, xe đưa đón mới máy lạnh mát rượi, khách sạn sạch sẽ tiện nghi. Hướng dẫn viên rất chu đáo, luôn hỗ trợ người lớn tuổi và trẻ nhỏ tận tình!',
    helpfulCount: 21,
    tags: ['Đúng giờ', 'HDV nhiệt tình', 'Xe đời mới']
  },
  {
    author: 'Hoàng Mai Lan',
    avatarColor: 'from-rose-500 to-pink-600',
    rating: 5,
    tripType: 'Đi theo cặp đôi',
    date: '2 ngày trước',
    title: 'Rất hài lòng về lịch trình và các bữa ăn',
    comment: 'Điểm tham quan đẹp, có đủ thời gian tự do chụp ảnh và dạo chơi. Các bữa ăn đầy đặn, phong phú hợp khẩu vị. Chắc chắn sẽ tiếp tục đặt tour tại GoTravel.',
    helpfulCount: 17,
    tags: ['Cảnh đẹp', 'Ăn ngon', 'Hài lòng']
  },
  {
    author: 'Bác Vũ Đình Trọng',
    avatarColor: 'from-amber-500 to-orange-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '4 ngày trước',
    title: 'Gia đình 3 thế hệ đi rất vui và thoải mái',
    comment: 'Đoàn nhà tôi có cả ông bà 70 tuổi lẫn các cháu nhỏ. Hướng dẫn viên tên Hùng sắp xếp chỗ ngồi, ăn uống và giờ giấc nghỉ ngơi vô cùng khoa học, không ai bị mệt.',
    helpfulCount: 30,
    tags: ['Gia đình 3 thế hệ', 'Khoa học', 'Chu đáo']
  },
  {
    author: 'Phạm Thu Trang',
    avatarColor: 'from-purple-500 to-indigo-600',
    rating: 5,
    tripType: 'Đi cùng bạn bè',
    date: '5 ngày trước',
    title: 'Giá tốt, chất lượng 5 sao, chụp ảnh siêu có tâm',
    comment: 'So với các bên khác thì giá tại GoTravel rất cạnh tranh mà chất lượng tour không hề bị cắt giảm. Bạn HDV chụp ảnh cho nhóm bằng máy ảnh cơ siêu đẹp luôn!',
    helpfulCount: 24,
    tags: ['Chụp ảnh đẹp', 'Giá tốt', '5 sao']
  },
  {
    author: 'Lê Văn Cường',
    avatarColor: 'from-emerald-500 to-teal-600',
    rating: 4,
    tripType: 'Đi một mình / Công tác',
    date: '1 tuần trước',
    title: 'Lịch trình phong phú, hướng dẫn viên kiến thức uyên bác',
    comment: 'Thuyết minh về lịch sử và văn hóa địa phương rất hay. Mọi thứ từ phòng ốc đến phương tiện đều đúng với cam kết trong hợp đồng.',
    helpfulCount: 14,
    tags: ['Kiến thức hay', 'Uy tín', 'Khách sạn tốt']
  },
  {
    author: 'Trần Bích Thủy',
    avatarColor: 'from-pink-500 to-rose-600',
    rating: 5,
    tripType: 'Đi theo cặp đôi',
    date: '1 tuần trước',
    title: 'Kỷ niệm ngày cưới tuyệt vời',
    comment: 'Được GoTravel chuẩn bị chu đáo và chúc mừng kỷ niệm ngày cưới trong bữa tối. Cảm ơn đội ngũ rất nhiều vì sự tinh tế này!',
    helpfulCount: 26,
    tags: ['Kỷ niệm ngày cưới', 'Tinh tế', 'Chu đáo']
  },
  {
    author: 'Đinh Tiến Dũng',
    avatarColor: 'from-cyan-500 to-blue-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '2 tuần trước',
    title: 'Thủ tục nhanh gọn, tư vấn nhiệt tình 24/7',
    comment: 'Mình đặt tour vào phút chót nhưng các bạn nhân viên tư vấn xử lý hồ sơ và xác nhận chỉ trong 15 phút. Rất yên tâm khi đặt qua GoTravel.',
    helpfulCount: 19,
    tags: ['Xác nhận tức thì', 'Tư vấn 24/7']
  },
  {
    author: 'Võ Thị Kim Oanh',
    avatarColor: 'from-teal-500 to-emerald-600',
    rating: 4,
    tripType: 'Đi cùng bạn bè',
    date: '2 tuần trước',
    title: 'Cảnh sắc tuyệt vời, đồ ăn tươi ngon',
    comment: 'Các bữa ăn hải sản và đặc sản địa phương rất tươi ngon, chế biến vừa miệng. Đi lại thuận tiện, xe ô tô du lịch đời mới có nước suối và khăn lạnh mỗi ngày.',
    helpfulCount: 12,
    tags: ['Hải sản tươi', 'Xe đời mới']
  }
];

// Helper: Lấy danh sách đánh giá cho một tour cụ thể
export const getReviewsForTour = (tourId) => {
  try {
    const localKey = `gotravel_reviews_${tourId}`;
    const stored = localStorage.getItem(localKey);
    const customReviews = stored ? JSON.parse(stored) : [];

    // Tìm các review mặc định của tour này
    let defaultForTour = DEFAULT_MOCK_REVIEWS.filter(r => r.tourId === tourId);
    
    // Nếu tour chưa có nhiều review riêng, gộp thêm các review mẫu thông minh để luôn có nhiều người đánh giá
    if (defaultForTour.length < 5) {
      const neededCount = 8 - defaultForTour.length;
      const additional = SMART_SAMPLE_REVIEWS.slice(0, neededCount).map((sample, idx) => ({
        id: `rev-sample-${tourId}-${idx}`,
        tourId,
        author: sample.author,
        avatarColor: sample.avatarColor,
        rating: sample.rating,
        tripType: sample.tripType,
        date: sample.date,
        title: sample.title,
        comment: sample.comment,
        helpfulCount: sample.helpfulCount,
        verified: true,
        tags: sample.tags || [],
        images: [],
        reply: idx === 0 ? {
          author: 'GoTravel CSKH',
          date: sample.date,
          content: 'GoTravel xin chân thành cảm ơn quý khách đã tin tưởng và đồng hành cùng chúng tôi!'
        } : null
      }));
      defaultForTour = [...defaultForTour, ...additional];
    }

    // Luôn ưu tiên các đánh giá mới của người dùng (tên bất kỳ) lên trên đầu
    return [...customReviews, ...defaultForTour];
  } catch (e) {
    console.error('Error reading reviews:', e);
    return DEFAULT_MOCK_REVIEWS;
  }
};

// Helper: Lưu một đánh giá mới (cho phép tên bất kỳ, tự động lưu vào localStorage)
export const saveReviewForTour = (tourId, reviewData) => {
  try {
    const localKey = `gotravel_reviews_${tourId}`;
    const stored = localStorage.getItem(localKey);
    const existing = stored ? JSON.parse(stored) : [];

    const newReview = {
      id: `rev-user-${Date.now()}`,
      tourId,
      author: reviewData.author?.trim() || 'Du Khách Ẩn Danh',
      avatarColor: reviewData.avatarColor || getRandomAvatarColor(),
      rating: Number(reviewData.rating) || 5,
      tripType: reviewData.tripType || 'Đi cùng gia đình',
      date: 'Vừa xong (Mới nhất)',
      title: reviewData.title?.trim() || 'Trải nghiệm du lịch tuyệt vời',
      comment: reviewData.comment?.trim() || 'Chuyến đi rất đáng nhớ, dịch vụ tận tâm!',
      helpfulCount: 0,
      verified: true,
      isUserReview: true, // Đánh dấu đây là đánh giá do người dùng viết
      tags: reviewData.tags || ['Đánh giá của bạn'],
      images: reviewData.images || [],
      reply: {
        author: 'GoTravel Chăm Sóc Khách Hàng',
        date: 'Vừa xong',
        content: `Cảm ơn bạn ${reviewData.author?.trim()} đã gửi nhận xét quý báu! GoTravel luôn sẵn sàng phục vụ bạn trong các hành trình tiếp theo.`
      }
    };

    const updated = [newReview, ...existing];
    localStorage.setItem(localKey, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving review:', e);
    return [];
  }
};

// Helper: Xóa đánh giá do người dùng viết
export const deleteUserReview = (tourId, reviewId) => {
  try {
    const localKey = `gotravel_reviews_${tourId}`;
    const stored = localStorage.getItem(localKey);
    if (!stored) return [];
    const existing = JSON.parse(stored);
    const updated = existing.filter(r => r.id !== reviewId);
    localStorage.setItem(localKey, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting review:', e);
    return [];
  }
};

// Helper: Sinh màu gradient ngẫu nhiên cho avatar
const AVATAR_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-rose-500 to-pink-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-indigo-700',
  'from-cyan-500 to-blue-600',
  'from-violet-500 to-purple-600',
  'from-fuchsia-500 to-pink-600',
  'from-teal-600 to-cyan-700'
];

export const getRandomAvatarColor = () => {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
};

// Helper: Thống kê số sao và tỷ lệ phần trăm
export const calculateRatingSummary = (reviews = []) => {
  if (!reviews || reviews.length === 0) {
    return {
      average: 5.0,
      total: 0,
      counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      percentages: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  reviews.forEach(r => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
    counts[star] = (counts[star] || 0) + 1;
    sum += star;
  });

  const total = reviews.length;
  const average = Number((sum / total).toFixed(1));

  const percentages = {
    5: Math.round((counts[5] / total) * 100),
    4: Math.round((counts[4] / total) * 100),
    3: Math.round((counts[3] / total) * 100),
    2: Math.round((counts[2] / total) * 100),
    1: Math.round((counts[1] / total) * 100)
  };

  return { average, total, counts, percentages };
};
