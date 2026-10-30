import { useState } from 'react';
import { QrCode, Search, CheckCircle2, XCircle, AlertCircle, User, Calendar, MapPin, Ticket } from 'lucide-react';
import { toast } from 'react-toastify';

const SAMPLE_TICKETS = [
  { code: 'GT-2026-9812', customer: 'Nguyễn Văn An', phone: '0912345678', service: 'Vé Sun World Bà Nà Hills + Buffet', quantity: 2, date: '30/10/2026', status: 'valid', usedAt: null },
  { code: 'GT-2026-7734', customer: 'Trần Thị Bình', phone: '0923456789', service: 'Tour Trọn Gói Hàn Quốc 5N4Đ', quantity: 4, date: '05/11/2026', status: 'valid', usedAt: null },
  { code: 'GT-2026-5521', customer: 'Lê Minh Cường', phone: '0934567890', service: 'Vé VinWonders Phú Quốc All-In-One', quantity: 3, date: '28/10/2026', status: 'used', usedAt: '28/10/2026 09:15' }
];

export default function QRCheckin() {
  const [tickets, setTickets] = useState(SAMPLE_TICKETS);
  const [inputCode, setInputCode] = useState('');
  const [scanResult, setScanResult] = useState(null);

  const handleCheckCode = (codeToCheck) => {
    const code = (codeToCheck || inputCode).trim().toUpperCase();
    if (!code) {
      toast.warning('Vui lòng nhập hoặc quét mã vé!');
      return;
    }

    const found = tickets.find(t => t.code.toUpperCase() === code);
    if (!found) {
      setScanResult({
        status: 'not_found',
        message: `Mã vé "${code}" không tồn tại trên hệ thống GoTravel!`
      });
      toast.error('Vé không hợp lệ!');
    } else if (found.status === 'used') {
      setScanResult({
        status: 'used',
        ticket: found,
        message: `Vé này ĐÃ ĐƯỢC SỬ DỤNG vào lúc ${found.usedAt}!`
      });
      toast.warning('Vé đã sử dụng trước đó!');
    } else {
      setScanResult({
        status: 'valid',
        ticket: found,
        message: 'Vé hợp lệ! Đã sẵn sàng làm thủ tục check-in.'
      });
      toast.success('Vé hợp lệ!');
    }
  };

  const handleConfirmCheckin = () => {
    if (!scanResult || !scanResult.ticket) return;
    const now = new Date().toLocaleString('vi-VN');
    setTickets(prev => prev.map(t => t.code === scanResult.ticket.code ? { ...t, status: 'used', usedAt: now } : t));
    setScanResult(prev => ({
      ...prev,
      status: 'used',
      ticket: { ...prev.ticket, status: 'used', usedAt: now },
      message: `ĐÃ CHECK-IN THÀNH CÔNG cho khách hàng ${scanResult.ticket.customer}!`
    }));
    toast.success(`Check-in thành công cho vé ${scanResult.ticket.code}!`);
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <QrCode size={26} className="text-sky-600" />
          Hệ Thống Quét Mã QR & Soát Vé Điện Tử
        </h1>
        <p className="text-slate-500 text-sm mt-1">Soát vé vào cổng tại điểm tham quan và điểm khởi hành tour</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Box */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-800 text-base">Quét / Nhập Mã Vé Cần Kiểm Tra</h3>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" size={18} />
              <input 
                type="text" 
                placeholder="Nhập mã vé (VD: GT-2026-9812)..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheckCode()}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-base font-bold focus:outline-none focus:border-sky-500 uppercase"
              />
            </div>
            <button 
              onClick={() => handleCheckCode()}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl shadow transition cursor-pointer"
            >
              Kiểm Tra
            </button>
          </div>

          <div className="pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Mã vé mẫu kiểm tra nhanh:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {tickets.map(t => (
                <button
                  key={t.code}
                  onClick={() => { setInputCode(t.code); handleCheckCode(t.code); }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 rounded-xl font-mono text-xs font-bold transition border border-slate-200"
                >
                  {t.code} ({t.status === 'valid' ? 'Hợp lệ' : 'Đã dùng'})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scan Result Box */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center">
          {!scanResult ? (
            <div className="text-center py-10 text-slate-400 space-y-2">
              <QrCode size={48} className="mx-auto text-slate-300" />
              <p className="font-bold text-sm">Vui lòng quét hoặc nhập mã vé để xem thông tin xác thực</p>
            </div>
          ) : scanResult.status === 'valid' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200">
                <CheckCircle2 size={32} className="text-emerald-600 shrink-0" />
                <div>
                  <div className="font-black text-lg">VÉ HỢP LỆ (SẴN SÀNG CHECK-IN)</div>
                  <div className="text-xs">{scanResult.message}</div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Mã vé:</span> <strong className="font-mono text-sky-600">{scanResult.ticket.code}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Khách hàng:</span> <strong className="text-slate-800">{scanResult.ticket.customer}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Số điện thoại:</span> <span>{scanResult.ticket.phone}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Dịch vụ:</span> <strong className="text-slate-800">{scanResult.ticket.service}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Số lượng người:</span> <strong className="text-sky-600">{scanResult.ticket.quantity} Khách</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Ngày áp dụng:</span> <span>{scanResult.ticket.date}</span></div>
              </div>

              <button 
                onClick={handleConfirmCheckin}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl shadow-lg transition cursor-pointer"
              >
                XÁC NHẬN CHO KHÁCH VÀO CỔNG
              </button>
            </div>
          ) : scanResult.status === 'used' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-amber-50 text-amber-800 rounded-2xl border border-amber-200">
                <AlertCircle size={32} className="text-amber-600 shrink-0" />
                <div>
                  <div className="font-black text-lg">VÉ ĐÃ SỬ DỤNG TRƯỚC ĐÓ</div>
                  <div className="text-xs">{scanResult.message}</div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl space-y-1 text-xs text-slate-600">
                <div>Khách: <strong>{scanResult.ticket?.customer}</strong></div>
                <div>Dịch vụ: <strong>{scanResult.ticket?.service}</strong></div>
                <div>Thời gian check-in: <strong>{scanResult.ticket?.usedAt}</strong></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-red-50 text-red-800 rounded-2xl border border-red-200">
              <XCircle size={32} className="text-red-600 shrink-0" />
              <div>
                <div className="font-black text-lg">MÃ VÉ KHÔNG HỢP LỆ</div>
                <div className="text-xs">{scanResult.message}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
