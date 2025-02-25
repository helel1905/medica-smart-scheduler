
import { Home, Calendar, FileText, CreditCard, Stethoscope } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "首页", path: "/" },
    { icon: Calendar, label: "预约", path: "/appointments" },
    { icon: FileText, label: "病历", path: "/records" },
    { icon: CreditCard, label: "支付", path: "/payments" },
    { icon: Stethoscope, label: "AI问诊", path: "/ai-diagnosis" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center"
          >
            <Icon
              size={24}
              className={`mb-1 transition-colors duration-200 ${
                isActive ? "text-medical-primary" : "text-gray-500"
              }`}
            />
            <span
              className={`text-xs ${
                isActive ? "text-medical-primary" : "text-gray-500"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
