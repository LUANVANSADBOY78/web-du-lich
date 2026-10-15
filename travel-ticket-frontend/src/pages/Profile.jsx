import { useState } from 'react';
import { User, Mail, Lock, Phone, Camera, Save, AlertCircle, BookOpen, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useAuth();
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({
    fullName: user?.fullName || user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    birthdate: '',
  });
  const [passForm, setPassForm] = useState({ current: '', newPass: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl p-12 shadow-sm border border-slate-100">
          <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-black text-slate-700 mb-2">Bạn chưa đăng nhập</h2>
          <p className="text-slate-500 mb-6">Vui lòng đăng nhập để xem hồ sơ</p>
          <Link to="/login" className="bg-sky-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-sky-700 transition">Đăng Nhập</Link>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) { toast.error('Họ tên không được trống'); return; }
    if (!form.email.includes('@')) { toast.error('Email không hợp lệ'); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success('Cập nhật hồ sơ thành công!');
      setLoading(false);
    }, 800);
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    if (!passForm.current) { toast.error('Nhập mật khẩu hiện tại'); return; }
    if (passForm.newPass.length < 6) { toast.error('Mật khẩu mới ít nhất 6 ký tự'); return; }
    if (passForm.newPass !== passForm.confirm) { toast.error('Mật khẩu mới không khớp'); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success('Đổi mật khẩu thành công!');
      setLoading(false);
      setPassForm({ current: '', newPass: '', confirm: '' });
    }, 800);
  };

  const TABS = [
    { id: 'profile', label: 'Hồ Sơ', icon: User },
    { id: 'password', label: 'Đổi Mật Khẩu', icon: Lock },
    { id: 'bookings', label: 'Booking', icon: BookOpen },
    { id: 'favorites', label: 'Yêu Thích', icon: Heart },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Cover + Avatar */}
          <div className="bg-gradient-to-r from-sky-600 to-sky-500 p-8 flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-3xl shadow-lg">
                {(user.fullName || user.name || 'U').charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-md hover:bg-slate-50">
                <Camera size={14} className="text-slate-600" />
              </button>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-black">{user.fullName || user.name}</h1>
              <p className="text-sky-100 text-sm">{user.email}</p>
              <span className="inline-block mt-1 bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">{user.role || 'Customer'}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-100 overflow-x-auto">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 flex-1 py-4 text-sm font-bold transition border-b-2 whitespace-nowrap px-4 ${
                  tab === t.id ? 'text-sky-600 border-sky-600 bg-sky-50' : 'text-slate-500 border-transparent hover:text-slate-700'
                }`}>
                <t.icon size={15} /> {t.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {tab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: 'fullName', label: 'Họ và Tên', icon: User, placeholder: 'Nguyễn Văn A' },
                    { name: 'email', label: 'Email', icon: Mail, placeholder: 'email@gmail.com', type: 'email' },
                    { name: 'phone', label: 'Số Điện Thoại', icon: Phone, placeholder: '0901234567', type: 'tel' },
                    { name: 'address', label: 'Địa Chỉ', icon: User, placeholder: 'Hà Nội, Việt Nam' },
                  ].map(({ name, label, icon: Icon, placeholder, type = 'text' }) => (
                    <div key={name}>
                      <label className="text-sm font-bold text-slate-700 block mb-1.5">{label}</label>
                      <div className="relative">
                        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={type}
                          value={form[name]}
                          onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button type="submit" disabled={loading}
                  className="flex items-center gap-2 bg-sky-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-sky-700 transition disabled:opacity-60">
                  <Save size={16} /> {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                </button>
              </form>
            )}

            {tab === 'password' && (
              <form onSubmit={handleChangePass} className="space-y-5 max-w-sm">
                {[
                  { name: 'current', label: 'Mật Khẩu Hiện Tại' },
                  { name: 'newPass', label: 'Mật Khẩu Mới' },
                  { name: 'confirm', label: 'Xác Nhận Mật Khẩu Mới' },
                ].map(({ name, label }) => (
                  <div key={name}>
                    <label className="text-sm font-bold text-slate-700 block mb-1.5">{label}</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={passForm[name]}
                        onChange={e => setPassForm(p => ({ ...p, [name]: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                ))}
                <button type="submit" disabled={loading}
                  className="flex items-center gap-2 bg-sky-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-sky-700 transition disabled:opacity-60">
                  <Lock size={16} /> {loading ? 'Đang lưu...' : 'Đổi Mật Khẩu'}
                </button>
              </form>
            )}

            {tab === 'bookings' && (
              <div className="text-center py-8">
                <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-600 font-bold mb-4">Xem lịch sử đặt tour, vé và khách sạn</p>
                <Link to="/my-bookings" className="bg-sky-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-sky-700 transition inline-block">
                  Xem Booking Của Tôi
                </Link>
              </div>
            )}

            {tab === 'favorites' && (
              <div className="text-center py-8">
                <Heart size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-600 font-bold mb-4">Tour, vé và khách sạn yêu thích</p>
                <Link to="/favorites" className="bg-sky-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-sky-700 transition inline-block">
                  Xem Danh Sách Yêu Thích
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

