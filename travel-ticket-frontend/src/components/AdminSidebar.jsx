import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaMapMarkedAlt, FaTicketAlt, FaClipboardList, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";

function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/admin/attractions", name: "Địa điểm", icon: <FaMapMarkedAlt /> },
    { path: "/admin/tickets", name: "Quản lý vé", icon: <FaTicketAlt /> },
    { path: "/admin/bookings", name: "Booking", icon: <FaClipboardList /> },
    { path: "/admin/customers", name: "Khách hàng", icon: <FaUsers /> },
    { path: "/admin/settings", name: "Cài đặt", icon: <FaCog /> },
  ];

  return (
    <div className="bg-dark text-white d-flex flex-column p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <h4 className="fw-bold text-center py-3 border-bottom border-secondary mb-4">Admin Panel</h4>
      <Nav className="flex-column flex-grow-1">
        {menuItems.map((item, index) => (
          <Nav.Link 
            key={index}
            as={Link} 
            to={item.path} 
            className={`text-white mb-2 p-2 rounded ${location.pathname === item.path ? 'bg-primary' : 'hover-bg-secondary'}`}
          >
            <span className="me-2">{item.icon}</span> {item.name}
          </Nav.Link>
        ))}
      </Nav>
      <div className="mt-auto border-top border-secondary pt-3">
        <Nav.Link as={Link} to="/" className="text-danger p-2 rounded hover-bg-secondary">
          <span className="me-2"><FaSignOutAlt /></span> Về trang chủ
        </Nav.Link>
      </div>
    </div>
  );
}

export default AdminSidebar;
