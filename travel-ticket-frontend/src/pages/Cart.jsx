import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const navigate = useNavigate();

  const applyVoucher = () => {
    if (voucherCode.toUpperCase() === 'GOTRAVEL10') {
      const d = total * 0.1;
      setDiscount(d);
      setVoucherApplied(true);
      toast.success('Áp dụng mã giảm giá thành công! Giảm 10%');
    } else if (voucherCode.toUpperCase() === 'SUMMER50K') {
      setDiscount(50000);
      setVoucherApplied(true);
      toast.success('Áp dụng mã giảm giá thành công! Giảm 50.000đ');
    } else {
      toast.error('Mã giảm giá không hợp lệ hoặc đã hết hạn');
    }
  };

  const typeLabel = { tour: 'Tour', ticket: 'Vé', hotel: 'Khách sạn', combo: 'Combo' };
  const typeColor = { tour: 'bg-sky-100 text-sky-700', ticket: 'bg-green-100 text-green-700', hotel: 'bg-violet-100 text-violet-700', combo: 'bg-amber-100 text-amber-700' };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-slate-300" />
          </div>
          <h2 className="text-2xl font-black text-slate-700 mb-2">Giỏ hàng trống</h2>
          <p className="text-slate-500 mb-8">Hãy thêm tour, vé hoặc khách sạn vào giỏ hàng</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/tours" className="bg-sky-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-sky-700 transition">Khám Phá Tour</Link>
            <Link to="/tickets" className="bg-white border border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl hover:border-sky-500 transition">Tìm Vé Vui Chơi</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-900">Giỏ Hàng</h1>
          <span className="bg-sky-100 text-sky-700 font-bold text-sm px-3 py-1 rounded-full">{items.length} sản phẩm</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items list */}
          <div className="flex-1 space-y-4">
            {items.map(item => (
              <div key={`${item.id}-${item.type}`}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex gap-4 group hover:shadow-md transition">
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200'}
                  alt={item.name}
                  className="w-24 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeColor[item.type] || 'bg-slate-100 text-slate-600'}`}>
                        {typeLabel[item.type] || item.type}
                      </span>
                      <h3 className="font-black text-slate-900 mt-1 text-sm leading-tight truncate">{item.name}</h3>
                      {item.date && <p className="text-xs text-slate-500 mt-0.5">📅 Ngày: {item.date}</p>}
                      {item.departure && <p className="text-xs text-slate-500">📍 Khởi hành: {item.departure}</p>}
                    </div>
                    <button
                      onClick={() => { removeItem(item.id, item.type); toast.info('Đã xóa khỏi giỏ hàng'); }}
                      className="text-slate-300 hover:text-red-500 transition p-1 shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:border-sky-500 hover:text-sky-600 transition"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:border-sky-500 hover:text-sky-600 transition"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-sky-600 text-base">{formatCurrency(item.price * item.quantity)}</div>
                      <div className="text-xs text-slate-400">{formatCurrency(item.price)} × {item.quantity}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <Link to="/tours" className="text-sm text-sky-600 hover:underline font-medium">← Tiếp tục mua sắm</Link>
              <button onClick={() => { clearCart(); toast.info('Đã xóa tất cả'); }}
                className="text-red-500 text-sm font-medium hover:text-red-600">Xóa tất cả</button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
              <h3 className="font-black text-slate-900 mb-5 text-lg">Tóm Tắt Đơn Hàng</h3>

              {/* Voucher */}
              <div className="mb-5">
                <label className="text-xs font-bold text-slate-500 block mb-1.5">MÃ GIẢM GIÁ</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={voucherCode}
                      onChange={e => setVoucherCode(e.target.value.toUpperCase())}
                      placeholder="VD: GOTRAVEL10"
                      disabled={voucherApplied}
                      className="w-full border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-sm outline-none focus:border-sky-500 disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>
                  <button
                    onClick={applyVoucher}
                    disabled={voucherApplied || !voucherCode}
                    className="bg-slate-800 text-white font-bold px-3 py-2.5 rounded-xl text-sm hover:bg-slate-700 transition disabled:opacity-40"
                  >
                    Áp dụng
                  </button>
                </div>
                {voucherApplied && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-green-600 font-bold">✓ Đã áp dụng mã {voucherCode}</span>
                    <button onClick={() => { setDiscount(0); setVoucherApplied(false); setVoucherCode(''); }}
                      className="text-xs text-red-500 hover:underline">Xóa</button>
                  </div>
                )}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-3 text-sm border-t border-slate-50 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tạm tính ({items.length} sản phẩm)</span>
                  <span className="font-bold text-slate-800">{formatCurrency(total)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá voucher</span>
                    <span className="font-bold">-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Phí dịch vụ</span>
                  <span className="font-medium text-green-600">Miễn phí</span>
                </div>
                <hr className="border-slate-100" />
                <div className="flex justify-between text-base">
                  <span className="font-black text-slate-900">Tổng cộng</span>
                  <span className="font-black text-sky-600 text-xl">{formatCurrency(total - discount)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-black py-4 rounded-xl mt-6 flex items-center justify-center gap-2 transition text-base shadow-md"
              >
                Tiến Hành Đặt Chỗ <ArrowRight size={18} />
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-slate-400">🔒 Thanh toán an toàn & bảo mật</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

