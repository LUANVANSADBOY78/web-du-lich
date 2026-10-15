// src/data/mockReviews.js
// Dữ liệu đánh giá & bình luận thực tế chuẩn phong cách iVIVU

export const DEFAULT_MOCK_REVIEWS = [
  {
    id: 'rev-1',
    tourId: 'tour-5',
    author: 'Trần Minh Quân',
    avatarColor: 'from-blue-500 to-indigo-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '12/10/2026 (2 ngày trước)',
    title: 'Chuyến đi mùa thu Nhật Bản đẹp như mơ!',
    comment: 'Gia đình mình vừa hoàn thành chuyến đi 6N5Đ từ Hà Nội. Lễ hội lá đỏ ở hồ Kawaguchiko nhìn ngắm núi Phú Sĩ đẹp ngỡ ngàng, bố mẹ mình lớn tuổi đi rất thoải mái vì lịch trình thư thái, không bị hối thúc. Hướng dẫn viên tên Nam cực kỳ nhiệt tình, am hiểu văn hóa Nhật và chụp ảnh cho gia đình siêu có tâm. Khách sạn chuẩn 4 sao sạch sẽ, tắm khoáng Onsen thư giãn tuyệt vời, bữa bò Kobe và cua tuyết rất ngon!',
    helpfulCount: 24,
    verified: true,
    reply: {
      author: 'GoTicket Chăm Sóc Khách Hàng',
      date: '12/10/2026',
      content: 'Dạ GoTicket xin chân thành cảm ơn anh Trần Minh Quân và gia đình đã tin tưởng đồng hành cùng chúng em. Niềm vui và sự hài lòng của hai bác cùng gia đình là động lực to lớn nhất cho đội ngũ HDV và GoTicket!'
    }
  },
  {
    id: 'rev-2',
    tourId: 'tour-5',
    author: 'Nguyễn Thị Bích Ngọc',
    avatarColor: 'from-rose-500 to-pink-600',
    rating: 5,
    tripType: 'Đi theo cặp đôi',
    date: '10/10/2026 (4 ngày trước)',
    title: 'Trải nghiệm vượt xa kỳ vọng, thủ tục visa siêu nhanh',
    comment: 'Hai vợ chồng mình chọn tour này đi tuần trăng mật và hoàn toàn hài lòng 100%. Đội ngũ làm visa hỗ trợ giấy tờ rất tận tâm, chỉ 6 ngày là có kết quả. Đi tàu Shinkansen êm ru, Kyoto mùa lá đỏ thơ mộng chụp ảnh cháy máy. Rất cảm ơn GoTicket đã sắp xếp chu đáo từ xe cộ đến các bữa ăn!',
    helpfulCount: 19,
    verified: true,
    reply: {
      author: 'GoTicket Chăm Sóc Khách Hàng',
      date: '11/10/2026',
      content: 'GoTicket chúc mừng hạnh phúc của hai bạn! Chúc anh chị luôn có thật nhiều hành trình ngọt ngào và đong đầy kỷ niệm đẹp cùng nhau.'
    }
  },
  {
    id: 'rev-3',
    tourId: 'tour-4',
    author: 'Lê Hoàng Yến',
    avatarColor: 'from-amber-500 to-orange-600',
    rating: 5,
    tripType: 'Đi cùng bạn bè',
    date: '08/10/2026 (6 ngày trước)',
    title: 'Tour Hàn Quốc mùa thu rực rỡ, Everland vui hết nấc',
    comment: 'Nhóm 4 đứa mình vừa đi tour Hàn Quốc về. Đảo Nami mùa thu cây ngân hạnh vàng rực như trong phim Bản Tình Ca Mùa Đông, công viên Everland rộng và nhiều trò chơi hấp dẫn. Bữa ăn gà hầm sâm và thịt nướng BBQ chuẩn vị Hàn ăn rất no. Đánh giá 5 sao cho bạn hướng dẫn viên!',
    helpfulCount: 15,
    verified: true,
    reply: null
  },
  {
    id: 'rev-4',
    tourId: 'tour-1',
    author: 'Đặng Tuấn Kiệt',
    avatarColor: 'from-emerald-500 to-teal-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '05/10/2026 (9 ngày trước)',
    title: 'Dịch vụ bay Vietnam Airlines chu đáo, thư viện Starfield hoành tráng',
    comment: 'Tour tổ chức rất chuyên nghiệp, bay Vietnam Airlines hành lý thoải mái 23kg gửi nên mua sắm quà tẹt ga. Thư viện Starfield ở Suwon to đẹp ngoài đời còn lộng lẫy hơn trên hình. Khách sạn trung tâm tiện đi dạo chợ đêm Myeongdong. Sẽ ủng hộ GoTicket dài dài!',
    helpfulCount: 28,
    verified: true,
    reply: {
      author: 'GoTicket Hỗ Trợ Tour Quốc Tế',
      date: '06/10/2026',
      content: 'Cảm ơn anh Kiệt! GoTicket luôn lựa chọn các hãng hàng không hàng đầu để đảm bảo trải nghiệm bay êm ái và hành lý thuận tiện nhất cho quý khách.'
    }
  },
  {
    id: 'rev-5',
    tourId: 'tour-2',
    author: 'Vũ Hải Đăng',
    avatarColor: 'from-purple-500 to-indigo-600',
    rating: 5,
    tripType: 'Đi theo cặp đôi',
    date: '02/10/2026 (12 ngày trước)',
    title: 'Ô Trấn và Tây Đường đẹp nao lòng, tặng Hán phục xịn xò',
    comment: 'Thích nhất là trải nghiệm ngồi thuyền dạo cổ trấn Tây Đường và được tặng set chụp Hán phục. Cảnh sắc hữu tình, Bến Thượng Hải về đêm lung linh rực rỡ. Đồ ăn Trung Hoa phong phú, đoàn đi xe đời mới rất êm.',
    helpfulCount: 18,
    verified: true,
    reply: null
  },
  {
    id: 'rev-6',
    tourId: 'tour-10',
    author: 'Phạm Thanh Hương',
    avatarColor: 'from-teal-500 to-cyan-600',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '28/09/2026 (2 tuần trước)',
    title: 'Đi tàu hỏa khoang 4 ngắm đèo Hải Vân cực chill!',
    comment: 'Trải nghiệm đi tàu hỏa ngắm vịnh Lăng Cô và đèo Hải Vân thật sự rất đẹp và thư thái. Khoang tàu sạch sẽ, máy lạnh mát mẻ. Khách sạn ở Đà Nẵng sát biển Mỹ Khê, vé cáp treo Bà Nà Hills và buffet đồ ăn rất ngon miệng.',
    helpfulCount: 22,
    verified: true,
    reply: null
  },
  {
    id: 'rev-7',
    tourId: 'tour-3',
    author: 'Nguyễn Văn Hùng',
    avatarColor: 'from-sky-500 to-blue-700',
    rating: 5,
    tripType: 'Đi cùng gia đình',
    date: '25/09/2026 (3 tuần trước)',
    title: 'Du thuyền Genting Dream 5 sao đẳng cấp thế giới',
    comment: 'Siêu du thuyền quá to và hoành tráng, các cháu nhỏ nhà mình mê mẩn máng trượt nước và xem kịch xiếc buổi tối. Đồ ăn buffet đổi món liên tục, phòng có ban công ngắm biển bình minh tuyệt đẹp.',
    helpfulCount: 31,
    verified: true,
    reply: {
      author: 'GoTicket Du Thuyền',
      date: '26/09/2026',
      content: 'Cảm ơn anh Hùng và gia đình! Genting Dream là một trong những sản phẩm du thuyền được yêu thích nhất năm 2026 của GoTicket.'
    }
  },
  {
    id: 'rev-8',
    tourId: 'tour-25',
    author: 'Lê Thuỳ Dung',
    avatarColor: 'from-pink-500 to-rose-600',
    rating: 4,
    tripType: 'Đi cùng bạn bè',
    date: '20/09/2026 (3 tuần trước)',
    title: 'Tour Đà Nẵng - Hội An - Huế rất đáng tiền',
    comment: 'Lịch trình 3 ngày đi được hầu hết các điểm nổi bật nhất của dải đất miền Trung: Bà Nà Cầu Vàng, Phố Cổ Hội An, Làng Hương Thủy Xuân. Đồ ăn đậm đà vị miền Trung. Hướng dẫn viên am hiểu lịch sử, thuyết minh rất lôi cuốn.',
    helpfulCount: 14,
    verified: true,
    reply: null
  }
];

// Helper: Lấy danh sách đánh giá cho một tour cụ thể
export const getReviewsForTour = (tourId) => {
  try {
    const localKey = `goticket_reviews_${tourId}`;
    const stored = localStorage.getItem(localKey);
    const customReviews = stored ? JSON.parse(stored) : [];

    // Tìm các review mặc định của tour này
    let defaultForTour = DEFAULT_MOCK_REVIEWS.filter(r => r.tourId === tourId);
    
    // Nếu tour chưa có review riêng, tạo review mẫu chuẩn theo tên tour
    if (defaultForTour.length === 0) {
      defaultForTour = [
        {
          id: `rev-default-1-${tourId}`,
          tourId,
          author: 'Trần Gia Hưng',
          avatarColor: 'from-blue-500 to-indigo-600',
          rating: 5,
          tripType: 'Đi cùng gia đình',
          date: 'Hôm qua',
          title: 'Dịch vụ chất lượng cao, đúng như cam kết',
          comment: 'Chuyến đi diễn ra suôn sẻ và trọn vẹn, xe đưa đón mới, khách sạn sạch sẽ tiện nghi. Hướng dẫn viên rất chu đáo, luôn hỗ trợ người lớn tuổi và trẻ nhỏ tận tình!',
          helpfulCount: 12,
          verified: true,
          reply: {
            author: 'GoTicket CSKH',
            date: 'Hôm qua',
            content: 'Cảm ơn quý khách đã tin chọn GoTicket! Kính chúc anh và gia đình luôn dồi dào sức khỏe.'
          }
        },
        {
          id: `rev-default-2-${tourId}`,
          tourId,
          author: 'Hoàng Mai Lan',
          avatarColor: 'from-rose-500 to-pink-600',
          rating: 5,
          tripType: 'Đi theo cặp đôi',
          date: '4 ngày trước',
          title: 'Rất hài lòng về lịch trình và các bữa ăn',
          comment: 'Điểm tham quan đẹp, có đủ thời gian tự do chụp ảnh và dạo chơi. Các bữa ăn đầy đặn, phong phú hợp khẩu vị. Chắc chắn sẽ tiếp tục đặt tour tại GoTicket.',
          helpfulCount: 9,
          verified: true,
          reply: null
        },
        {
          id: `rev-default-3-${tourId}`,
          author: 'Nguyễn Quốc Tuấn',
          avatarColor: 'from-amber-500 to-orange-600',
          rating: 5,
          tripType: 'Đi cùng bạn bè',
          date: '1 tuần trước',
          title: 'Giá tốt, chất lượng 5 sao',
          comment: 'So với các bên khác thì giá tại GoTicket rất cạnh tranh mà chất lượng tour không hề bị cắt giảm. Đội ngũ tư vấn phản hồi nhanh chóng 24/7.',
          helpfulCount: 16,
          verified: true,
          reply: null
        }
      ];
    }

    // Luôn ưu tiên các đánh giá mới của người dùng (tên bất kỳ) lên đầu
    return [...customReviews, ...defaultForTour];
  } catch (e) {
    console.error('Error reading reviews:', e);
    return DEFAULT_MOCK_REVIEWS;
  }
};

// Helper: Lưu một đánh giá mới (cho phép tên bất kỳ)
export const saveReviewForTour = (tourId, reviewData) => {
  try {
    const localKey = `goticket_reviews_${tourId}`;
    const stored = localStorage.getItem(localKey);
    const existing = stored ? JSON.parse(stored) : [];

    const newReview = {
      id: `rev-${Date.now()}`,
      tourId,
      author: reviewData.author?.trim() || 'Du Khách Ẩn Danh',
      avatarColor: reviewData.avatarColor || getRandomAvatarColor(),
      rating: Number(reviewData.rating) || 5,
      tripType: reviewData.tripType || 'Đi cùng gia đình',
      date: 'Vừa xong',
      title: reviewData.title?.trim() || 'Trải nghiệm tuyệt vời',
      comment: reviewData.comment?.trim() || 'Chuyến đi rất đáng nhớ, dịch vụ tận tâm!',
      helpfulCount: 0,
      verified: true,
      images: reviewData.images || [],
      reply: null
    };

    const updated = [newReview, ...existing];
    localStorage.setItem(localKey, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving review:', e);
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
  'from-violet-500 to-purple-600'
];

export const getRandomAvatarColor = () => {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
};

// Helper: Thống kê số sao
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

