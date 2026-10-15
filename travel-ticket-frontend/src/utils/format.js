export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '0đ';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date));
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(new Date(date));
};

export const formatDuration = (days) => {
  if (!days) return '';
  return `${days}N${days - 1}Đ`;
};

export const slugify = (text) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getStatusColor = (status) => {
  const map = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    paid: 'bg-green-100 text-green-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-slate-100 text-slate-600',
  };
  return map[status?.toLowerCase()] || 'bg-slate-100 text-slate-600';
};

export const getStatusLabel = (status) => {
  const map = {
    pending: 'Chờ XN',
    confirmed: 'Đã XN',
    paid: 'Đã TT',
    completed: 'Hoàn Thành',
    cancelled: 'Đã Hủy',
    active: 'Hoạt Động',
    inactive: 'Ngừng HĐ',
    unpaid: 'Chưa TT',
  };
  return map[status?.toLowerCase()] || status;
};

