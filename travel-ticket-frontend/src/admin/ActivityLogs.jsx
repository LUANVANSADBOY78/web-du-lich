// ==============================================================================
// FILE: ActivityLogs.jsx
// CHỨC NĂNG: Màn hình "Nhật Ký Hoạt Động" trong trang Quản Trị (Admin).
// MỤC ĐÍCH: Ghi lại lịch sử ai (User/Admin) đã làm gì (Thêm, Sửa, Xóa), vào lúc nào,
//           trên dữ liệu gì (Tour, Voucher, Đơn hàng,...) kèm địa chỉ IP để bảo mật.
// ==============================================================================

import { useState, useEffect } from 'react';
import { Activity, Search, Filter } from 'lucide-react';
import { adminApi } from '../services/adminApi';

// ------------------------------------------------------------------------------
// 1. DỮ LIỆU MẪU (MOCK DATA)
// Giải thích: Dùng để hiển thị lên bảng khi backend đang offline hoặc chưa kết nối API.
// ------------------------------------------------------------------------------
const MOCK_LOGS = [
  { id: 1, createdAt: '2026-10-05T10:30:00', userName: 'admin@gotravel.vn', action: 'CREATE', module: 'Tour', entityId: '45', oldValue: null, newValue: '{"name":"Tour Phú Quốc 4N3Đ"}', ipAddress: '192.168.1.100' },
  { id: 2, createdAt: '2026-10-05T10:15:00', userName: 'manager@gotravel.vn', action: 'UPDATE', module: 'Voucher', entityId: '12', oldValue: '{"isActive":true}', newValue: '{"isActive":false}', ipAddress: '192.168.1.101' },
  { id: 3, createdAt: '2026-10-05T09:50:00', userName: 'staff@gotravel.vn', action: 'UPDATE', module: 'Booking', entityId: 'BK0023', oldValue: '{"status":"pending"}', newValue: '{"status":"confirmed"}', ipAddress: '192.168.1.102' },
  { id: 4, createdAt: '2026-10-05T09:30:00', userName: 'admin@gotravel.vn', action: 'DELETE', module: 'Review', entityId: '88', oldValue: '{"content":"spam review"}', newValue: null, ipAddress: '192.168.1.100' },
  { id: 5, createdAt: '2026-10-05T09:10:00', userName: 'manager@gotravel.vn', action: 'CREATE', module: 'Voucher', entityId: '15', oldValue: null, newValue: '{"code":"FLASH50","value":50}', ipAddress: '192.168.1.101' },
  { id: 6, createdAt: '2026-10-04T16:30:00', userName: 'admin@gotravel.vn', action: 'UPDATE', module: 'Tour', entityId: '38', oldValue: '{"status":"active"}', newValue: '{"status":"hidden"}', ipAddress: '192.168.1.100' },
  { id: 7, createdAt: '2026-10-04T14:00:00', userName: 'staff@gotravel.vn', action: 'CREATE', module: 'SupportTicket', entityId: 'SP0003', oldValue: null, newValue: '{"subject":"Hỏi về tour"}', ipAddress: '192.168.1.103' },
];

// ------------------------------------------------------------------------------
// 2. ĐỊNH NGHĨA MÀU SẮC CHO TỪNG HÀNH ĐỘNG
// CREATE (Thêm mới) -> Màu xanh lá cây (Emerald)
// UPDATE (Chỉnh sửa) -> Màu cam vàng (Amber)
// DELETE (Xóa dữ liệu) -> Màu đỏ cảnh báo (Red)
// ------------------------------------------------------------------------------
const ACTION_STYLE = {
  CREATE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  UPDATE: 'bg-amber-100 text-amber-700 border-amber-200',
  DELETE: 'bg-red-100 text-red-700 border-red-200',
};

// Danh sách các danh mục nghiệp vụ trong hệ thống để lọc nhanh
const MODULES = ['Tất cả', 'Tour', 'Booking', 'Voucher', 'Review', 'SupportTicket', 'User'];

// ------------------------------------------------------------------------------
// 3. COMPONENT CHÍNH: ActivityLogs
// ------------------------------------------------------------------------------
export default function ActivityLogs() {
  // --- Các biến trạng thái (State) quản lý dữ liệu trên giao diện ---
  const [logs, setLogs] = useState([]);          // Danh sách các dòng nhật ký đang hiển thị
  const [loading, setLoading] = useState(true);   // Cờ kiểm tra đang tải dữ liệu hay đã xong
  const [module, setModule] = useState('Tất cả'); // Bộ lọc danh mục (Tour, Booking,...)
  const [action, setAction] = useState('');       // Bộ lọc hành động (CREATE, UPDATE, DELETE)
  const [search, setSearch] = useState('');       // Ô tìm kiếm từ khóa theo tên user, module

  // --- Hàm lấy dữ liệu (Fetch Data) từ Backend hoặc lấy từ Mock Data ---
  const fetchLogs = async () => {
    setLoading(true); // Bật hiệu ứng xoay xoay đang tải
    try {
      // 1. Thử gọi API backend thật từ server .NET
      const res = await adminApi.getActivityLogs({
        module: module !== 'Tất cả' ? module : undefined,
        action: action || undefined
      });
      setLogs(res.data.items);
    } catch {
      // 2. Nếu Backend chưa có API hoặc bị lỗi mạng -> Tự động lọc trên danh sách mẫu MOCK_LOGS
      let filtered = [...MOCK_LOGS];
      if (module !== 'Tất cả') {
        filtered = filtered.filter(l => l.module === module);
      }
      if (action) {
        filtered = filtered.filter(l => l.action === action);
      }
      if (search) {
        filtered = filtered.filter(l =>
          l.userName?.toLowerCase().includes(search.toLowerCase()) ||
          l.module.toLowerCase().includes(search.toLowerCase())
        );
      }
      setLogs(filtered);
    } finally {
      setLoading(false); // Tắt hiệu ứng đang tải sau khi xong
    }
  };

  // --- Hook useEffect: Tự động chạy lại fetchLogs() mỗi khi người dùng đổi bộ lọc hoặc gõ tìm kiếm ---
  useEffect(() => {
    fetchLogs();
  }, [module, action, search]);

  // --- Phần giao diện JSX render ra màn hình ---
  return (
    <div className="p-6">
      {/* Tiêu đề trang */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Activity size={24} className="text-sky-600" /> Nhật Ký Hoạt Động (Activity Logs)
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Theo dõi mọi thao tác thêm, sửa, xóa dữ liệu trong hệ thống của ban quản trị
        </p>
      </div>

      {/* Thanh công cụ lọc dữ liệu (Search & Filters) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-5 flex flex-wrap gap-3 items-center shadow-sm">
        {/* Ô nhập tìm kiếm */}
        <div className="relative flex-1 min-w-48">
          <input
            type="text"
            placeholder="Tìm theo email user, tên module..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-sky-500"
          />
          <Search className="absolute left-2.5 top-2.5 text-slate-400" size={16} />
        </div>

        {/* Các nút bấm chọn danh mục nhanh (Tất cả, Tour, Booking,...) */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {MODULES.map(m => (
            <button
              key={m}
              onClick={() => setModule(m)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition border ${
                module === m
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Menu chọn hành động (Thêm mới, Cập nhật, Xóa) */}
        <select
          value={action}
          onChange={e => setAction(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500 bg-white"
        >
          <option value="">Tất cả hành động</option>
          <option value="CREATE">Thêm mới (CREATE)</option>
          <option value="UPDATE">Cập nhật (UPDATE)</option>
          <option value="DELETE">Xóa (DELETE)</option>
        </select>
      </div>

      {/* Bảng hiển thị danh sách nhật ký */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            // Hiển thị vòng xoay khi đang tải dữ liệu
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            // Hiển thị bảng dữ liệu khi đã tải xong
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b">
                  <th className="p-4 font-bold">Thời gian</th>
                  <th className="p-4 font-bold">Người thực hiện</th>
                  <th className="p-4 font-bold">Hành động</th>
                  <th className="p-4 font-bold">Module</th>
                  <th className="p-4 font-bold">ID Bản ghi</th>
                  <th className="p-4 font-bold">Nội dung thay đổi</th>
                  <th className="p-4 font-bold">Địa chỉ IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 transition text-sm">
                    {/* Cột 1: Thời gian thực hiện */}
                    <td className="p-4 text-slate-600 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('vi-VN')}
                    </td>

                    {/* Cột 2: Email người dùng */}
                    <td className="p-4 font-medium text-slate-800">
                      {log.userName}
                    </td>

                    {/* Cột 3: Huy hiệu loại hành động (Thêm/Sửa/Xóa) */}
                    <td className="p-4">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${ACTION_STYLE[log.action] || 'bg-slate-100 text-slate-600'}`}>
                        {log.action === 'CREATE' ? '+ Thêm' : log.action === 'UPDATE' ? '✎ Sửa' : '✕ Xóa'}
                      </span>
                    </td>

                    {/* Cột 4: Tên Module */}
                    <td className="p-4">
                      <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs">{log.module}</span>
                    </td>

                    {/* Cột 5: Mã ID bản ghi */}
                    <td className="p-4 font-mono text-xs text-slate-500">{log.entityId}</td>

                    {/* Cột 6: Giá trị mới hoặc cũ dạng JSON */}
                    <td className="p-4 max-w-xs">
                      <div className="text-xs text-slate-500 font-mono truncate bg-slate-50 px-2 py-1 rounded" title={log.newValue || log.oldValue}>
                        {log.newValue || log.oldValue || '—'}
                      </div>
                    </td>

                    {/* Cột 7: Địa chỉ IP máy khách */}
                    <td className="p-4 font-mono text-xs text-slate-400">{log.ipAddress}</td>
                  </tr>
                ))}

                {/* Hiển thị khi không có dữ liệu nào khớp với tìm kiếm */}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400">
                      <Activity size={36} className="mx-auto mb-2 opacity-30" />
                      <div>Không tìm thấy nhật ký hoạt động nào phù hợp</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
