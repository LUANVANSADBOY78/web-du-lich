import { useState, useEffect } from "react";
import { 
  Settings as SettingsIcon, Save, RefreshCw, Building, 
  CreditCard, Mail, Globe, ShieldCheck, BellRing
} from "lucide-react";
import { toast } from "react-toastify";

const DEFAULT_SETTINGS = {
  siteName: "GoTravel - Nền Tảng Đặt Tour & Vé Du Lịch Hàng Đầu",
  hotline: "1900 888 999",
  cskhEmail: "hotro@gotravel.vn",
  officeAddress: "Tầng 8, Tòa Nhà Travel Tower, 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  vnpayTmnCode: "GOTRAVEL2026",
  vnpayHashSecret: "VNPAYSECRETKEY998877665544332211",
  momoPartnerCode: "MOMO_GOTRAVEL_01",
  smtpHost: "smtp.gmail.com",
  smtpPort: 587,
  smtpUser: "noreply@gotravel.vn",
  autoSendEmail: true,
  autoApproveRefundDays: 3,
  loyaltyRate: 10000 // 10.000đ = 1 điểm
};

export default function Settings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("gotravel_system_settings");
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("gotravel_system_settings", JSON.stringify(settings));
    toast.success("Đã lưu toàn bộ cài đặt hệ thống thành công!");
  };

  const handleReset = () => {
    if (window.confirm("Khôi phục cài đặt gốc ban đầu?")) {
      setSettings(DEFAULT_SETTINGS);
      localStorage.removeItem("gotravel_system_settings");
      toast.success("Đã khôi phục cài đặt mặc định!");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <SettingsIcon className="text-sky-600" size={28} />
            Cài Đặt Hệ Thống (System Settings)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Cấu hình thông tin thương hiệu, tích hợp thanh toán trực tuyến, cổng gửi email vé và bảo mật
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            title="Khôi phục mặc định"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer"
          >
            <Save size={18} />
            Lưu Cài Đặt
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Info */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building size={18} className="text-sky-600" />
            Thông Tin Doanh Nghiệp & Website
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Thương Hiệu & Tiêu Đề</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hotline CSKH (24/7)</label>
              <input
                type="text"
                value={settings.hotline}
                onChange={(e) => handleChange("hotline", e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-sky-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Hỗ Trợ Khách Hàng</label>
              <input
                type="email"
                value={settings.cskhEmail}
                onChange={(e) => handleChange("cskhEmail", e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Địa Chỉ Trụ Sở Chính</label>
              <input
                type="text"
                value={settings.officeAddress}
                onChange={(e) => handleChange("officeAddress", e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 pb-3 border-b border-slate-100">
            <CreditCard size={18} className="text-emerald-600" />
            Cấu Hình Cổng Thanh Toán Trực Tuyến
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">VNPay TMN Code</label>
              <input
                type="text"
                value={settings.vnpayTmnCode}
                onChange={(e) => handleChange("vnpayTmnCode", e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">VNPay Hash Secret</label>
              <input
                type="password"
                value={settings.vnpayHashSecret}
                onChange={(e) => handleChange("vnpayHashSecret", e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">MoMo Partner Code</label>
              <input
                type="text"
                value={settings.momoPartnerCode}
                onChange={(e) => handleChange("momoPartnerCode", e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tỷ Lệ Tích Điểm Hội Viên</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.loyaltyRate}
                  onChange={(e) => handleChange("loyaltyRate", Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
                <span className="text-xs text-slate-500 whitespace-nowrap">đ = 1 điểm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Email & Notification */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 pb-3 border-b border-slate-100">
            <Mail size={18} className="text-indigo-600" />
            Cấu Hình Email Gửi Vé & Thông Báo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">SMTP Host</label>
              <input
                type="text"
                value={settings.smtpHost}
                onChange={(e) => handleChange("smtpHost", e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">SMTP Port</label>
              <input
                type="number"
                value={settings.smtpPort}
                onChange={(e) => handleChange("smtpPort", Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Người Gửi</label>
              <input
                type="text"
                value={settings.smtpUser}
                onChange={(e) => handleChange("smtpUser", e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="autoSendEmail"
              checked={settings.autoSendEmail}
              onChange={(e) => handleChange("autoSendEmail", e.target.checked)}
              className="w-4 h-4 accent-sky-600 rounded"
            />
            <label htmlFor="autoSendEmail" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Tự động gửi vé điện tử kèm mã QR tới email khách hàng ngay sau khi thanh toán thành công
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
          >
            <Save size={18} />
            Lưu Tất Cả Cài Đặt
          </button>
        </div>
      </form>
    </div>
  );
}
