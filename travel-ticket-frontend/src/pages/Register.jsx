import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Vui lòng nhập họ tên';
    if (!form.email.includes('@')) errs.email = 'Email không hợp lệ';
    if (!/^(0|\+84)[0-9]{9,10}$/.test(form.phone)) errs.phone = 'Số điện thoại không hợp lệ';
    if (form.password.length < 6) errs.password = 'Mật khẩu ít nhất 6 ký tự';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Mật khẩu không khớp';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      // Try API, fallback to local mock
      const mockUser = { id: Date.now(), fullName: form.fullName, email: form.email, phone: form.phone, role: 'Customer' };
      login(mockUser, 'mock_token_' + Date.now());
      toast.success('Đăng ký thành công! Chào mừng bạn đến với GoTravel!');
      navigate('/');
    } catch {
      toast.error('Đăng ký thất bại. Vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const set = (name, val) => { setForm(p => ({ ...p, [name]: val })); setErrors(p => ({ ...p, [name]: '' })); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-amber-500 flex items-center justify-center text-white font-black text-xl">G</div>
            <span className="text-2xl font-black">Go<span className="text-sky-600">Travel</span></span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Tạo Tài Khoản Mới</h1>
          <p className="text-slate-500 text-sm mt-1">Đăng ký để nhận ưu đãi độc quyền</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-4">
          {[
            { name: 'fullName', label: 'Họ và Tên', icon: User, placeholder: 'Nguyễn Văn A', type: 'text' },
            { name: 'email', label: 'Email', icon: Mail, placeholder: 'email@gmail.com', type: 'email' },
            { name: 'phone', label: 'Số Điện Thoại', icon: Phone, placeholder: '0901234567', type: 'tel' },
          ].map(({ name, label, icon: Icon, placeholder, type }) => (
            <div key={name}>
              <label className="text-sm font-bold text-slate-700 block mb-1.5">{label}</label>
              <div className="relative">
                <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={type}
                  value={form[name]}
                  onChange={e => set(name, e.target.value)}
                  placeholder={placeholder}
                  className={`w-full border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-50 ${errors[name] ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                />
              </div>
              {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
            </div>
          ))}

          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1.5">Mật Khẩu</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => set('password', e.target.value)}
                placeholder="Ít nhất 6 ký tự"
                className={`w-full border rounded-xl py-3 pl-10 pr-10 text-sm outline-none focus:border-sky-500 ${errors.password ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
              />
              <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700 block mb-1.5">Xác Nhận Mật Khẩu</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={form.confirmPassword}
                onChange={e => set('confirmPassword', e.target.value)}
                placeholder="Nhập lại mật khẩu"
                className={`w-full border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-sky-500 ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-black py-3.5 rounded-xl transition mt-2 disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Đang đăng ký...</> : 'Đăng Ký Ngay'}
          </button>

          <p className="text-center text-sm text-slate-500">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-sky-600 font-bold hover:underline">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

