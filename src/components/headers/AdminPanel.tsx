import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaCoffee,
  FaClipboardList,
  FaCogs,
  FaSignOutAlt,
  FaThLarge,
  FaEllipsisH,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

export default function AdminPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaThLarge /> },
    { name: "User Manage", path: "/admin/users", icon: <FaUsers /> },
    { name: "Item Manage", path: "/admin/items", icon: <FaCoffee /> },
    { name: "Order Manage", path: "/admin/orders", icon: <FaClipboardList /> },
    { name: "Others", path: "/admin/others", icon: <FaEllipsisH /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCogs /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#3e2723] text-white flex flex-col shadow-xl fixed left-0 top-0">
      <div className="p-6 border-b border-white/10 text-center">
        <h1 className="text-xl font-serif font-bold tracking-tighter">
          AROMISTA <span className="text-[#a8c69f]">ADMIN</span>
        </h1>
      </div>

      <nav className="flex-grow mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-[#4a6741] text-white shadow-lg shadow-black/20"
                : "text-stone-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
        >
          <FaSignOutAlt />
          <span className="text-sm font-bold">Logout</span>
        </button>
      </div>
    </div>
  );
}
