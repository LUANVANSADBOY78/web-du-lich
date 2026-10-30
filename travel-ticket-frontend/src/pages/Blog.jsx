import { useState, useEffect } from 'react';
import { 
  BookOpen, Star, MessageSquare, ThumbsUp, Calendar, User, 
  Search, ArrowRight, Share2, Sparkles, Send, CheckCircle2, Bookmark, Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const INITIAL_ARTICLES = [
  {
    id: 1,
    title: "Review Tour Nhật Bản Mùa Thu Lá Đỏ 6N5Đ: Cung Đường Vàng Tokyo - Phú Sĩ - Kyoto Chi Tiết",
    category: "Đánh Giá Tour",
    date: "15/10/2026",
    author: "Minh Anh Travel",
    rating: 5,
    score: "9.9/10",
    readTime: "7 phút đọc",
    thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600",
    summary: "Nhật Bản mùa lá đỏ đẹp ngỡ ngàng với sắc phong rực rỡ bên hồ Kawaguchiko. Chia sẻ trải nghiệm thực tế từ bay Vietnam Airlines, tắm Onsen truyền thống đến thưởng thức bò Kobe hảo hạng.",
    content: `Chuyến đi Nhật Bản 6 ngày 5 đêm vừa qua là một trong những hành trình đáng nhớ nhất trong năm 2026 của gia đình mình.

### 1. Thời điểm vàng ngắm lá đỏ Momiji
Mùa thu Nhật Bản từ giữa tháng 10 đến cuối tháng 11 là lúc toàn bộ công viên và đền đài ngập tràn sắc đỏ cam tuyệt đẹp. Điểm nhấn là hồ Kawaguchiko, nơi bạn có thể vừa ngắm lá phong vừa chiêm ngưỡng ngọn núi Phú Sĩ tuyết phủ sừng sững in bóng xuống mặt hồ phẳng lặng.

### 2. Trải nghiệm dịch vụ 5 sao
• **Phương tiện:** Bay thẳng Vietnam Airlines êm ái, hành lý 23kg gửi nên mua sắm thỏa thích. Được đi tàu siêu tốc Shinkansen vận tốc 300km/h từ Nagoya đến Kyoto cực êm.
• **Khách sạn & Ẩm thực:** Nghỉ tại Resort Onsen ngâm khoáng nóng thư giãn sau ngày dài đi bộ. Các bữa ăn được chăm chút kỹ lưỡng, đặc biệt là set bò Wagyu/Kobe nướng xèo xèo và lẩu cua tuyết tươi ngọt lịm.

### 3. Đánh giá hướng dẫn viên
Hướng dẫn viên am hiểu tường tận văn hóa Nhật Bản, dẫn đoàn nhiệt tình và luôn hỗ trợ chụp ảnh lưu niệm cực kỳ có tâm cho từng gia đình.

**Tổng kết:** Tour xứng đáng đạt 10/10 điểm về chất lượng và trải nghiệm!`,
    comments: [
      { id: 'c1', name: 'Trần Văn Long', rating: 5, date: 'Hôm qua', text: 'Bài viết review rất chi tiết và có tâm! Mình vừa đặt cọc tour này cho 2 vợ chồng đi vào 22/11 tới đây. Hy vọng sẽ có trải nghiệm tuyệt vời như bài viết.', likes: 18 },
      { id: 'c2', name: 'Nguyễn Thị Hương', rating: 5, date: '2 ngày trước', text: 'Nhà mình đi tour này đợt đầu tháng 10 rồi, công nhận Onsen và lẩu cua tuyết đỉnh thật sự các bác ạ!', likes: 24 }
    ]
  },
  {
    id: 2,
    title: "Kinh Nghiệm Đi Tour Hàn Quốc Mùa Thu Nami - Everland Đầy Đủ A-Z Cho Người Đi Lần Đầu",
    category: "Cẩm Nang Du Lịch",
    date: "12/10/2026",
    author: "Hoàng Yến Blogger",
    rating: 5,
    score: "9.8/10",
    readTime: "6 phút đọc",
    thumbnail: "https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&q=80&w=600",
    summary: "Đảo Nami ngập tràn sắc vàng ngân hạnh, công viên giải trí Everland với gấu trúc Panda cưng xỉu và thư viện khổng lồ Starfield ở Suwon.",
    content: `Hàn Quốc luôn là điểm đến hấp dẫn bậc nhất châu Á mỗi độ thu về. Dưới đây là trọn bộ kinh nghiệm thực tế khi tham gia tour Hàn Quốc 5N4Đ:

### 1. Thủ tục Visa nhanh gọn
Nhờ chính sách visa du lịch đoàn thông thoáng, hồ sơ chỉ cần sao kê tài khoản và hộ chiếu. Thời gian xét duyệt chỉ từ 5 - 7 ngày làm việc.

### 2. Các điểm check-in không thể bỏ lỡ
• **Đảo Nami:** Hàng cây ngân hạnh vàng rực như phim trường Bản Tình Ca Mùa Đông.
• **Công viên Everland:** Khu Panda World gặp gỡ gia đình gấu trúc Bao Family nổi tiếng.
• **Thư viện Starfield Suwon:** Kiến trúc giếng trời 5 tầng với hàng triệu đầu sách đồ sộ.
• **Mặc Hanbok:** Chụp ảnh tại Hoàng cung Gyeongbokgung hoàn toàn miễn phí vé vào cổng.

**Lời khuyên:** Nên mang theo giày thể thao êm ái vì bạn sẽ đi bộ khá nhiều ở Seoul!`,
    comments: [
      { id: 'c3', name: 'Đỗ Thảo My', rating: 5, date: '3 ngày trước', text: 'Đảo Nami mùa thu đẹp xỉu luôn! Thư viện Starfield bên ngoài to đẹp gấp 10 lần trong ảnh.', likes: 15 }
    ]
  },
  {
    id: 3,
    title: "Review Siêu Du Thuyền 5 Sao Genting Dream: Thành Phố Giải Trí Nổi Giữa Đại Dương",
    category: "Đánh Giá Tour",
    date: "08/10/2026",
    author: "Thanh Tùng Captain",
    rating: 5,
    score: "9.9/10",
    readTime: "8 phút đọc",
    thumbnail: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=600",
    summary: "Trải nghiệm du thuyền quốc tế 18 tầng vượt đại dương Singapore - Malaysia. Trượt máng nước trên biển, xem nhạc kịch Broadway và ăn buffet miễn phí 24/7.",
    content: `Nếu bạn muốn một kỳ nghỉ sang chảnh mà không phải mệt mỏi chuyển vali giữa các khách sạn thì Tour Du Thuyền 5 Sao Genting Dream chính là lựa chọn số 1.

### Điểm nổi bật nhất trên du thuyền:
1. **Phòng Balcony ngắm biển:** Thức dậy giữa đại dương mênh mông, đón bình minh ngay tại ban công riêng tư.
2. **Ẩm thực đa dạng:** Hơn 8 nhà hàng phục vụ từ món Á, dimsum đến BBQ và món Âu sang trọng.
3. **Giải trí không giới hạn:** Công viên nước 6 đường trượt cảm giác mạnh, rạp chiếu phim ngoài trời, đu dây Zipline trên biển.`,
    comments: [
      { id: 'c4', name: 'Gia đình Bác Hùng', rating: 5, date: '5 ngày trước', text: 'Nhà mình có 2 cháu nhỏ đi tour du thuyền này các cháu thích mê, ăn uống buffet no nê cả ngày!', likes: 32 }
    ]
  },
  {
    id: 4,
    title: "Cẩm Nang Ăn Chơi Đà Nẵng - Hội An - Bà Nà Hills: Lịch Trình Chuẩn Đẹp 4N3Đ",
    category: "Kinh Nghiệm Săn Vé",
    date: "05/10/2026",
    author: "Trang Hí Vi Vu",
    rating: 5,
    score: "9.7/10",
    readTime: "5 phút đọc",
    thumbnail: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=600",
    summary: "Check-in Cầu Vàng sương mù Bà Nà Hills, thả hoa đăng lung linh phố cổ Hội An và thưởng thức mì Quảng, bánh mì Phượng nức tiếng.",
    content: `Đà Nẵng luôn là thành phố đáng sống nhất Việt Nam. Với lịch trình 4N3Đ, bạn vừa có thể tắm biển Mỹ Khê nước trong xanh, vừa đi cáp treo lên Bà Nà Hills ngắm Cầu Vàng và thưởng thức trọn vẹn ẩm thực xứ Quảng.`,
    comments: [
      { id: 'c5', name: 'Lê Hoàng Quân', rating: 5, date: '1 tuần trước', text: 'Vé Bà Nà mua trên GoTicket quét mã QR đi cổng ưu tiên rất nhanh, buffet Arapang nhiều món ngon!', likes: 29 }
    ]
  }
];

export default function Blog() {
  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem('gotravel_blog_articles');
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [search, setSearch] = useState('');

  // Comment Form state
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentRating, setCommentRating] = useState(5);

  useEffect(() => {
    try {
      localStorage.setItem('gotravel_blog_articles', JSON.stringify(articles));
    } catch (e) {
      console.error(e);
    }
  }, [articles]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) {
      toast.warning('Vui lòng điền tên và nội dung bình luận!');
      return;
    }

    const newComment = {
      id: `c-${Date.now()}`,
      name: commentName.trim(),
      rating: commentRating,
      date: 'Vừa xong',
      text: commentText.trim(),
      likes: 0
    };

    setArticles(prev => prev.map(art => {
      if (art.id === selectedArticle.id) {
        const updatedComments = [newComment, ...(art.comments || [])];
        const updatedArt = { ...art, comments: updatedComments };
        setSelectedArticle(updatedArt);
        return updatedArt;
      }
      return art;
    }));

    toast.success(`Cảm ơn bạn ${commentName}! Đánh giá 5 sao của bạn đã được đăng thành công.`);
    setCommentName('');
    setCommentText('');
    setCommentRating(5);
  };

  const handleLikeComment = (commentId) => {
    if (!selectedArticle) return;
    setArticles(prev => prev.map(art => {
      if (art.id === selectedArticle.id) {
        const updatedComments = (art.comments || []).map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c);
        const updatedArt = { ...art, comments: updatedComments };
        setSelectedArticle(updatedArt);
        return updatedArt;
      }
      return art;
    }));
    toast.info('Cảm ơn bạn đã thả tim cho bình luận hữu ích!');
  };

  const categories = ['Tất cả', 'Đánh Giá Tour', 'Cẩm Nang Du Lịch', 'Kinh Nghiệm Săn Vé'];

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'Tất cả' || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-[1240px] mx-auto px-4 space-y-8">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-amber-300">
              <Sparkles size={14} /> Cẩm Nang & Review Du Lịch Chuẩn iVIVU
            </span>
            <h1 className="text-3xl sm:text-4xl font-black leading-tight">
              Kinh Nghiệm, Đánh Giá & Bài Viết Du Lịch Chân Thực
            </h1>
            <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
              Khám phá hơn 1.000 bài viết review thực tế, cẩm nang săn vé giá rẻ và hàng nghìn bình luận đánh giá 5 sao từ những du khách đã trải nghiệm.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none">
            <BookOpen size={320} />
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-sky-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search size={16} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Tìm bài viết review tour, cẩm nang..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filtered.map(art => (
            <div 
              key={art.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setSelectedArticle(art)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={art.thumbnail} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-sky-700 shadow-md">
                    {art.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white font-black text-xs shadow-md">
                  <Star size={13} className="fill-current" />
                  <span>{art.score}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {art.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><User size={13} /> {art.author}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                    <MessageSquare size={15} className="text-sky-500" />
                    <span>{art.comments?.length || 0} Đánh giá & Bình luận</span>
                  </div>

                  <span className="font-bold text-sky-600 group-hover:translate-x-1 transition flex items-center gap-1">
                    Đọc tiếp & Đánh giá <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Đọc Chi Tiết & Bình Luận Đánh Giá 5 Sao */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150">
              
              {/* Modal Top */}
              <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-100">
                      {selectedArticle.category}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-xs border border-amber-200">
                      <Star size={12} className="fill-amber-400 text-amber-400" /> {selectedArticle.score} Tuyệt vời
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 leading-snug pt-2">
                    {selectedArticle.title}
                  </h2>
                </div>

                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Main Article Image */}
              <img 
                src={selectedArticle.thumbnail} 
                alt={selectedArticle.title} 
                className="w-full h-80 object-cover rounded-2xl shadow"
              />

              {/* Article Content */}
              <div className="prose max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-wrap">
                {selectedArticle.content}
              </div>

              {/* COMMENTS & REVIEWS SECTION */}
              <div className="pt-6 border-t border-slate-200 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <MessageSquare size={20} className="text-sky-600" />
                    Bình Luận & Đánh Giá Của Khách Hàng ({selectedArticle.comments?.length || 0})
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={15} className="fill-current" />)}
                    <span className="text-slate-700 ml-1">100% đánh giá 5 sao</span>
                  </div>
                </div>

                {/* Form Viết Bình Luận */}
                <form onSubmit={handleAddComment} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3.5">
                  <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                    <Sparkles size={16} className="text-amber-500" />
                    Gửi Đánh Giá 5 Sao Của Bạn Cho Bài Viết Này
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Họ tên của bạn (*)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="VD: Nguyễn Tuấn Anh"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Chấm điểm sao</label>
                      <div className="flex items-center gap-1.5 py-1.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setCommentRating(star)}
                            className="cursor-pointer hover:scale-110 transition"
                          >
                            <Star 
                              size={20} 
                              className={star <= commentRating ? "fill-amber-400 text-amber-400" : "text-slate-300"} 
                            />
                          </button>
                        ))}
                        <span className="font-bold text-amber-600 text-xs ml-2">({commentRating}/5 sao)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung nhận xét / bình luận (*)</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Chia sẻ cảm nhận, thắc mắc hoặc kinh nghiệm chuyến đi của bạn..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <Send size={16} /> Gửi Bình Luận 5 Sao
                    </button>
                  </div>
                </form>

                {/* List Comments */}
                <div className="space-y-4">
                  {selectedArticle.comments?.map(c => (
                    <div key={c.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-900">{c.name}</div>
                            <div className="text-[11px] text-slate-400">{c.date}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(c.rating || 5)].map((_, i) => (
                            <Star key={i} size={14} className="fill-current" />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-slate-700 leading-relaxed pl-10">
                        {c.text}
                      </p>

                      <div className="flex items-center justify-end gap-3 text-xs text-slate-400 pt-1">
                        <button 
                          onClick={() => handleLikeComment(c.id)}
                          className="flex items-center gap-1 hover:text-sky-600 transition cursor-pointer"
                        >
                          <ThumbsUp size={13} /> Hữu ích ({c.likes || 0})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition cursor-pointer"
                >
                  Đóng
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
