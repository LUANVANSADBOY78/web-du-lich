import { useState, useEffect } from "react";
import { 
  Award, Plus, Search, Edit3, Trash2, Crown, 
  Gift, Star, CheckCircle2, RefreshCw, X, Users, CreditCard, ShieldCheck
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_TIERS = [
  {
    id: 1,
    name: "Thành Viên Đồng (Bronze)",
    code: "TIER-BRONZE",
    minPoints: 0,
    discountTourPercent: 2,
    discountTicketPercent: 0,
    benefits: ["Tích lũy 1% giá trị mọi đơn hàng", "Nhận bản tin khuyến mãi sớm"],
    memberCount: 2450,
    color: "from-amber-700 to-amber-900"
  },
  {
    id: 2,
    name: "Thành Viên Bạc (Silver)",
    code: "TIER-SILVER",
    minPoints: 1000,
    discountTourPercent: 5,
    discountTicketPercent: 3,
    benefits: ["Tích lũy 2% điểm thưởng", "Giảm 5% khi đặt tour theo nhóm", "Quà tặng sinh nhật voucher 200.000đ"],
    memberCount: 890,
    color: "from-slate-400 to-slate-600"
  },
  {
    id: 3,
    name: "Thành Viên Vàng (Gold)",
    code: "TIER-GOLD",
    minPoints: 3000,
    discountTourPercent: 8,
    discountTicketPercent: 5,
    benefits: ["Giảm 8% tour trọn gói", "Ưu tiên chọn chỗ đẹp trên xe & máy bay", "Đường dây nóng CSKH phục vụ 24/7"],
    memberCount: 320,
    color: "from-amber-400 to-yellow-600"
  },
  {
    id: 4,
    name: "Bạch Kim VIP (Platinum)",
    code: "TIER-PLATINUM",
    minPoints: 8000,
    discountTourPercent: 12,
    discountTicketPercent: 10,
    benefits: ["Giảm 12% toàn bộ tour & vé", "Miễn phí vé phòng chờ thương gia sân bay (1 lần/năm)", "Fast-track không xếp hàng"],
    memberCount: 110,
    color: "from-sky-500 to-indigo-700"
  },
  {
    id: 5,
    name: "Kim Cương V.I.P (Diamond)",
    code: "TIER-DIAMOND",
    minPoints: 20000,
    discountTourPercent: 15,
    discountTicketPercent: 15,
    benefits: ["Đặc quyền thiết kế tour riêng với HDV VIP", "Hỗ trợ hoàn hủy vé miễn phí 100%", "Tặng gói bảo hiểm du lịch quốc tế 2 tỷ"],
    memberCount: 28,
    color: "from-purple-600 to-pink-600"
  }
];

const INITIAL_MEMBERS = [
  {
    id: 101,
    name: "Nguyễn Văn Tuấn",
    phone: "0912345678",
    email: "tuan.nguyen@gmail.com",
    tier: "Kim Cương V.I.P (Diamond)",
    points: 24500,
    totalSpent: 185000000,
    joinedDate: "12/01/2025"
  },
  {
    id: 102,
    name: "Trần Mai Phương",
    phone: "0987654321",
    email: "phuong.tran@yahoo.com",
    tier: "Bạch Kim VIP (Platinum)",
    points: 9200,
    totalSpent: 78000000,
    joinedDate: "15/03/2025"
  },
  {
    id: 103,
    name: "Lê Hoàng Long",
    phone: "0903112233",
    email: "long.le@gmail.com",
    tier: "Thành Viên Vàng (Gold)",
    points: 4100,
    totalSpent: 35000000,
    joinedDate: "08/06/2025"
  }
];

export default function Membership() {
  const [tiers, setTiers] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_membership_tiers");
    return saved ? JSON.parse(saved) : INITIAL_TIERS;
  });

  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_members");
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [bonusPoints, setBonusPoints] = useState(500);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    tier: "Thành Viên Vàng (Gold)",
    points: 1000
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_membership_tiers", JSON.stringify(tiers));
    localStorage.setItem("gotravel_admin_members", JSON.stringify(members));
  }, [tiers, members]);

  const handleOpenAddMember = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      tier: "Thành Viên Vàng (Gold)",
      points: 1000
    });
    setIsModalOpen(true);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Vui lòng nhập tên và số điện thoại!");
      return;
    }

    const newM = {
      id: Date.now(),
      ...formData,
      points: Number(formData.points),
      totalSpent: Number(formData.points) * 10000,
      joinedDate: new Date().toLocaleDateString("vi-VN")
    };

    setMembers([newM, ...members]);
    toast.success(`Cấp thẻ hội viên ${newM.tier} cho khách ${newM.name} thành công!`);
    setIsModalOpen(false);
  };

  const handleAddBonusPoints = () => {
    if (!selectedMember) return;
    const added = Number(bonusPoints);
    setMembers(members.map(m => {
      if (m.id === selectedMember.id) {
        const nextPoints = m.points + added;
        toast.success(`Đã tặng +${added} điểm thưởng Loyalty cho khách ${m.name}!`);
        return { ...m, points: nextPoints };
      }
      return m;
    }));
    setIsPointsModalOpen(false);
  };

  const handleDeleteMember = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa hội viên "${name}"?`)) {
      setMembers(members.filter(m => m.id !== id));
      toast.success("Đã xóa hội viên!");
    }
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.phone.includes(searchTerm) ||
    m.tier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMembersCount = tiers.reduce((a, b) => a + b.memberCount, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Award className="text-purple-600" size={28} />
            Quản Lý Hạng Thành Viên & Thẻ Tích Điểm (Membership)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Chính sách khách hàng thân thiết, phân cấp thẻ VIP, tặng điểm thưởng và quyền lợi độc quyền
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_membership_tiers");
              localStorage.removeItem("gotravel_admin_members");
              setTiers(INITIAL_TIERS);
              setMembers(INITIAL_MEMBERS);
              toast.success("Đã khôi phục dữ liệu hội viên chuẩn!");
            }}
            className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            title="Làm mới"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleOpenAddMember}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition cursor-pointer"
          >
            <Plus size={18} />
            Cấp Thẻ Hội Viên VIP Mới
          </button>
        </div>
      </div>

      {/* Tiers Cards */}
      <div>
        <h2 className="text-lg font-black text-slate-800 mb-3 flex items-center gap-2">
          <Crown size={20} className="text-amber-500" />
          Các Hạng Thẻ Thành Viên Hiện Hành
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tiers.map(tier => (
            <div key={tier.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              <div className={`p-4 bg-gradient-to-r ${tier.color} text-white`}>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/80">{tier.code}</div>
                <h3 className="font-bold text-sm mt-0.5">{tier.name}</h3>
                <div className="text-xs font-semibold text-white/90 mt-1">
                  Yêu cầu: ≥ {tier.minPoints.toLocaleString()} điểm
                </div>
              </div>

              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 pb-2 border-b border-slate-100">
                    <span>Ưu đãi Tour:</span>
                    <span className="text-purple-600">Giảm {tier.discountTourPercent}%</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-2 space-y-1">
                    {tier.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-1">
                        <span className="text-emerald-500">✓</span> {b}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <span className="text-xs font-bold text-slate-400">
                    {tier.memberCount.toLocaleString()} hội viên
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Management Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Danh Sách Hội Viên Tiêu Biểu</h3>
            <p className="text-xs text-slate-400">Quản lý cấp độ thẻ và cộng điểm Loyalty Points</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm theo tên, SĐT, hạng thẻ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Tên Hội Viên</th>
                <th className="p-4">Số Điện Thoại</th>
                <th className="p-4">Hạng Thẻ VIP</th>
                <th className="p-4">Điểm Tích Lũy</th>
                <th className="p-4">Tổng Chi Tiêu</th>
                <th className="p-4">Ngày Tham Gia</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredMembers.map(m => (
                <tr key={m.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{m.name}</div>
                    <div className="text-xs text-slate-400">{m.email}</div>
                  </td>
                  <td className="p-4 font-mono font-semibold text-xs text-slate-700">
                    {m.phone}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      <Crown size={13} className="text-amber-500 fill-amber-500" />
                      {m.tier}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-black text-purple-600 text-base">
                      {m.points.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">pts</span>
                  </td>
                  <td className="p-4 font-bold text-slate-800">
                    {m.totalSpent?.toLocaleString()} đ
                  </td>
                  <td className="p-4 text-xs text-slate-500">
                    {m.joinedDate}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => { setSelectedMember(m); setBonusPoints(500); setIsPointsModalOpen(true); }}
                        className="px-2.5 py-1 bg-purple-50 text-purple-600 hover:bg-purple-100 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1"
                        title="Tặng điểm thưởng"
                      >
                        <Gift size={13} />
                        + Điểm
                      </button>
                      <button
                        onClick={() => handleDeleteMember(m.id, m.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Member */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-5 space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <CreditCard className="text-purple-600" size={20} />
              Cấp Thẻ Hội Viên Thân Thiết Mới
            </h3>

            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Khách Hàng *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Điện Thoại *</label>
                  <input
                    type="text"
                    required
                    placeholder="0912345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="khach@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hạng Thẻ Ban Đầu</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    {tiers.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Điểm Tặng Ban Đầu</label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 font-bold rounded-xl text-sm"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Kích Hoạt Thẻ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Bonus Points */}
      {isPointsModalOpen && selectedMember && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-5 space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-slate-800 text-base">Tặng Điểm Loyalty Thưởng</h3>
            <p className="text-xs text-slate-500">Khách: <b>{selectedMember.name}</b> (Hiện có: {selectedMember.points} điểm)</p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Điểm Muốn Tặng Thêm</label>
              <input
                type="number"
                min="100"
                step="100"
                value={bonusPoints}
                onChange={(e) => setBonusPoints(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-purple-600"
              />
            </div>

            <div className="flex gap-2">
              {[200, 500, 1000, 2000].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setBonusPoints(val)}
                  className="flex-1 py-1 bg-slate-100 hover:bg-purple-50 hover:text-purple-600 text-xs font-bold text-slate-600 rounded-lg transition"
                >
                  +{val}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsPointsModalOpen(false)}
                className="px-3 py-1.5 text-slate-600 font-bold rounded-xl text-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleAddBonusPoints}
                className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded-xl text-sm"
              >
                Cộng Điểm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
