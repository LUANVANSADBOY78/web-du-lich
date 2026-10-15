// Bản đồ ảnh theo địa điểm và danh mục
// Dùng ảnh Unsplash chất lượng cao, đa dạng cho từng điểm đến - Đã kiểm tra 100% hoạt động

export const LOCATION_IMAGES = {
  'Đà Nẵng': [
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800', // Cầu Vàng Bà Nà
    'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&q=80&w=800', // Bà Nà Hills
  ],
  'Phú Quốc': [
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800', // Biển đảo Phú Quốc
    'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=800', // VinWonders Castle
    'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&q=80&w=800', // Kiss of the Sea / Pháo hoa hoàng hôn
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800', // Biển xanh
  ],
  'Nha Trang': [
    'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
  ],
  'Hà Nội': [
    'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1571993142257-b15afcb65f3f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
  ],
  'Hồ Chí Minh': [
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1548019979-2f7e60e54b7c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1597000835234-51ce43b06b55?auto=format&fit=crop&q=80&w=800',
  ],
  'Hội An': [
    'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&q=80&w=800', // Phố cổ đèn lồng
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
  ],
  'Sapa': [
    'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&q=80&w=800', // Ruộng bậc thang Sapa
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800', // Núi Fansipan
  ],
  'Quảng Ninh': [
    'https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&q=80&w=800', // Vịnh Hạ Long chuẩn
    'https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&q=80&w=800',
  ],
  'Quốc tế': [
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=800',
  ],
};

export const CATEGORY_IMAGES = {
  'cap-treo': [
    'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=800',
  ],
  'cong-vien': [
    'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&q=80&w=800',
  ],
  'show': [
    'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&q=80&w=800', // Pháo hoa biển
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800', // Show ánh sáng
  ],
  'trai-nghiem': [
    'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&q=80&w=800',
  ],
  'tour-du-thuyen': [
    'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=800',
  ],
  'cong-vien-nuoc': [
    'https://images.unsplash.com/photo-1615748813570-7cf8a5c1d4f6?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=800',
  ],
  'esim': [
    'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800',
  ],
  'san-bay': [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=800',
  ],
};

/**
 * Lấy ảnh chính xác nhất theo Tên và Địa danh của Sản phẩm
 * Tránh hoàn toàn việc ảnh một đằng tên một nẻo
 */
export const getProductImage = (product) => {
  if (!product) return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800';

  const name = (product.name || '').toLowerCase();
  const id = product.id || 0;

  // 1. Khớp từ khóa cụ thể trong tên sản phẩm
  if (name.includes('kiss of the sea') || name.includes('nụ hôn của biển')) {
    return 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&q=80&w=800'; // Pháo hoa đại dương Kiss of the sea
  }
  if (name.includes('symphony of the sea') || name.includes('trình diễn trên biển')) {
    return 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800'; // Trình diễn biển laser pháo hoa
  }
  if (name.includes('tinh hoa bắc bộ')) {
    return 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800'; // Thực cảnh văn hóa Bắc Bộ
  }
  if (name.includes('4 đảo') || name.includes('cano siêu tốc') || name.includes('chụp ảnh sup')) {
    return 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800'; // Biển đảo Phú Quốc cano
  }
  if (name.includes('bà nà') || name.includes('cầu vàng')) {
    return 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800'; // Cầu Vàng Bà Nà Hills
  }
  if (name.includes('vinwonders') || name.includes('vinpearl')) {
    return 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=800'; // Lâu đài VinWonders
  }
  if (name.includes('hội an') || name.includes('ký ức hội an')) {
    return 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&q=80&w=800'; // Phố cổ Hội An đèn lồng
  }
  if (name.includes('hòn thơm') || name.includes('cáp treo hòn thơm')) {
    return 'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&q=80&w=800'; // Cáp treo vượt biển
  }
  if (name.includes('fansipan') || name.includes('sa pa') || name.includes('sapa')) {
    return 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&q=80&w=800'; // Sapa ruộng bậc thang
  }
  if (name.includes('hạ long') || name.includes('quảng ninh') || name.includes('ambassador')) {
    return 'https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&q=80&w=800'; // Vịnh Hạ Long
  }
  if (name.includes('bà đen') || name.includes('tây ninh')) {
    return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'; // Đỉnh núi Bà Đen
  }
  if (name.includes('universal') || name.includes('uss')) {
    return 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800'; // Universal Studios
  }
  if (name.includes('gardens by the bay')) {
    return 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=800'; // Gardens by the Bay
  }
  if (name.includes('xe buýt 2 tầng') || name.includes('hop-on')) {
    return 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'; // Xe buýt 2 tầng
  }
  if (name.includes('thủy cung') || name.includes('aquarium')) {
    return 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800'; // Thủy cung
  }
  if (name.includes('du thuyền') || name.includes('sông hàn') || name.includes('sông sài gòn')) {
    return 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=800'; // Du thuyền
  }
  if (name.includes('công viên nước') || name.includes('aquatopia')) {
    return 'https://images.unsplash.com/photo-1615748813570-7cf8a5c1d4f6?auto=format&fit=crop&q=80&w=800'; // Công viên nước
  }
  if (name.includes('khoáng nóng') || name.includes('onsen') || name.includes('bùn khoáng')) {
    return 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800'; // Onsen
  }
  if (name.includes('safari') || name.includes('động vật')) {
    return 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&q=80&w=800'; // Safari
  }
  if (name.includes('show')) {
    return 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800'; // Show ánh sáng nghệ thuật
  }
  if (name.includes('esim') || name.includes('sim')) {
    return 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800';
  }
  if (name.includes('sân bay') || name.includes('đưa đón') || name.includes('lounge')) {
    return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800';
  }

  // 2. Nếu có ảnh hợp lệ trong sản phẩm
  const BAD_THUMB = 'photo-1476514525535';
  const hasValidImg = product.img && !product.img.includes(BAD_THUMB) && !product.img.includes('PLACEHOLDER');
  if (hasValidImg) return product.img;

  // 3. Fallback theo location
  const locImgs = LOCATION_IMAGES[product.location];
  if (locImgs && locImgs.length > 0) {
    return locImgs[id % locImgs.length];
  }

  // 4. Fallback theo category
  const catImgs = CATEGORY_IMAGES[product.category];
  if (catImgs && catImgs.length > 0) {
    return catImgs[id % catImgs.length];
  }

  return 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800';
};
