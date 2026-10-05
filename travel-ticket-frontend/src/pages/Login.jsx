import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, UserCheck, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isRegisterParam = searchParams.get('mode') === 'register';
  const isAdminParam = searchParams.get('role') === 'admin';

  const [isRegister, setIsRegister] = useState(isRegisterParam);
  const [isAdminRole, setIsAdminRole] = useState(isAdminParam);

  const [email, setEmail] = useState(isAdminParam ? 'admin@goticket.vn' : 'khachhang@goticket.vn');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('Nguyễn Văn Tuấn');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Vui lòng điền đầy đủ email và mật khẩu!');
      return;
    }

    if (isAdminRole) {
      const adminUser = { name: 'Admin Luan', email: 'admin@goticket.vn', role: 'Admin' };
      localStorage.setItem('goticket_user', JSON.stringify(adminUser));
      toast.success('Đăng nhập hệ thống Quản Trị thành công!');
      navigate('/admin');
    } else {
      const normalUser = { name: name || 'Nguyễn Văn Tuấn', email, role: 'Customer' };
      localStorage.setItem('goticket_user', JSON.stringify(normalUser));
      toast.success(isRegister ? 'Tạo tài khoản thành công!' : 'Đăng nhập thành công!');
      navigate('/');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center font-sans">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
          
          {/* Logo Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-1.5 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-amber-500 flex items-center justify-center text-white font-black text-2xl shadow">
                G
              </div>
              <span className="text-3xl font-black tracking-tight text-slate-900">
                Go<span className="text-sky-600">Ticket</span>
              </span>
            </Link>
            <p className="text-slate-500 text-xs font-semibold">
              {isAdminRole ? 'Cổng đăng nhập Quản Trị Viên (Admin)' : (isRegister ? 'Tạo tài khoản khách hàng mới' : 'Đăng nhập vào tài khoản của bạn')}
            </p>
          </div>

          {/* Role Switcher Tab */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => {
                setIsAdminRole(false);
                setEmail('khachhang@goticket.vn');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                !isAdminRole ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              <UserCheck size={14} /> Khách Hàng
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdminRole(true);
                setEmail('admin@goticket.vn');
                setPassword('123456');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                isAdminRole ? 'bg-slate-900 text-amber-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              <ShieldCheck size={14} /> Admin Quản Trị
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && !isAdminRole && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Họ và tên</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-sky-600"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-sky-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mật khẩu</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-sky-600"
                  required
                />
              </div>
            </div>

            {isAdminRole && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-amber-600" /> Tài khoản Admin thử nghiệm:
                </div>
                <div>Email: <strong>admin@goticket.vn</strong></div>
                <div>Mật khẩu: <strong>123456</strong></div>
              </div>
            )}

            <button 
              type="submit" 
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center gap-2 text-sm ${
                isAdminRole ? 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20' : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/30'
              }`}
            >
              <span>{isAdminRole ? 'ĐĂNG NHẬP ADMIN' : (isRegister ? 'TẠO TÀI KHOẢN' : 'ĐĂNG NHẬP')}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Toggle Register / Login */}
          {!isAdminRole && (
            <div className="mt-6 text-center text-xs text-slate-500">
              {isRegister ? (
                <span>Đã có tài khoản? <button onClick={() => setIsRegister(false)} className="text-sky-600 font-bold hover:underline">Đăng nhập</button></span>
              ) : (
                <span>Chưa có tài khoản? <button onClick={() => setIsRegister(true)} className="text-sky-600 font-bold hover:underline">Đăng ký ngay</button></span>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;

