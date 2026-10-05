import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award, Headphones, Smartphone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Value Propositions Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-slate-200">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <ShieldCheck size={36} className="text-sky-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-white">Xác Nhận Tức Thì</h4>
              <p className="text-xs text-slate-400">Nhận ngay vé QR điện tử qua email</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <Award size={36} className="text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-white">Giá Tốt Hàng Đầu</h4>
              <p className="text-xs text-slate-400">Nhiều ưu đãi & mã giảm giá hấp dẫn</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <Headphones size={36} className="text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-white">Hỗ Trợ 24/7</h4>
              <p className="text-xs text-slate-400">Đội ngũ chăm sóc khách hàng nhiệt tình</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <Smartphone size={36} className="text-purple-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-white">Thanh Toán Dễ Dàng</h4>
              <p className="text-xs text-slate-400">Hỗ trợ QR Banking, Ví MoMo, Thẻ</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Col 1: Brand & Contact */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-1.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-amber-500 flex items-center justify-center text-white font-black text-xl">
                G
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Go<span className="text-sky-400">Ticket</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-sm">
              Nền tảng thương mại điện tử chuyên cung cấp vé công viên giải trí, vé xem show, cáp treo và trải nghiệm du lịch trực tuyến hàng đầu Việt Nam.
            </p>
            
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-sky-400 shrink-0 mt-0.5" />
                <span>Tòa nhà GoTicket Tower, 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-amber-400 shrink-0" />
                <span>Hotline: <strong className="text-white text-base">1900 1234</strong> (8:00 - 22:00)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-400 shrink-0" />
                <span>Email: support@goticket.vn</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-purple-400 shrink-0" />
                <span>Giờ làm việc: Tất cả các ngày trong tuần</span>
              </div>
            </div>
          </div>

          {/* Col 2: Về GoTicket */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Về GoTicket</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="#" className="hover:text-sky-400 transition">Giới thiệu GoTicket</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition">Tuyển dụng vị trí mới</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition">Chương trình đại lý</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition">Blog kinh nghiệm du lịch</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition">Tin tức & khuyến mãi</Link></li>
            </ul>
          </div>

          {/* Col 3: Hỗ trợ khách hàng */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="#" className="hover:text-sky-400 transition">Điều khoản & Điều kiện</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition">Chính sách bảo mật</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition">Chính sách hoàn hủy vé</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition">Hướng dẫn sử dụng QR vé</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition">Câu hỏi thường gặp (FAQ)</Link></li>
            </ul>
          </div>

          {/* Col 4: Tải app & Đối tác */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Tải Ứng Dụng</h4>
            <p className="text-xs text-slate-400 mb-4">Đặt vé dễ dàng hơn trên ứng dụng di động GoTicket</p>
            <div className="space-y-2 mb-6">
              <div className="bg-slate-800 hover:bg-slate-700 transition p-2.5 rounded-xl border border-slate-700 flex items-center gap-3 cursor-pointer">
                <Smartphone size={20} className="text-sky-400" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Tải về trên</div>
                  <div className="text-xs font-bold text-white">App Store & Google Play</div>
                </div>
              </div>
            </div>

            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Đối Tác Đồng Hành</h4>
            <div className="text-xs text-slate-400">
              Sun World, VinWonders, Ký Ức Hội An, Ambassador Cruise, Lotte World Aquarium.
            </div>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            © 2026 <strong>GoTicket Vietnam</strong>. Tất cả các quyền được bảo lưu. Thương hiệu vé du lịch trực tuyến độc lập.
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-300">Chấp nhận thanh toán:</span>
            <span className="bg-white px-2 py-1 rounded text-slate-900 font-black text-[11px]">VISA</span>
            <span className="bg-white px-2 py-1 rounded text-slate-900 font-black text-[11px]">MasterCard</span>
            <span className="bg-white px-2 py-1 rounded text-slate-900 font-black text-[11px]">JCB</span>
            <span className="bg-pink-600 text-white font-bold px-2 py-1 rounded text-[11px]">MoMo</span>
            <span className="bg-sky-600 text-white font-bold px-2 py-1 rounded text-[11px]">VietQR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
