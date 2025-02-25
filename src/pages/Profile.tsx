
import Layout from "@/components/Layout";
import { User, ChevronRight, Bell, Shield, HelpCircle, Settings } from "lucide-react";

const menuItems = [
  { icon: Bell, label: "消息通知", badge: 2 },
  { icon: Shield, label: "隐私设置" },
  { icon: HelpCircle, label: "帮助中心" },
  { icon: Settings, label: "系统设置" },
];

const Profile = () => {
  return (
    <Layout>
      <div className="p-4 animate-fade-in">
        <div className="bg-medical-primary text-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold">张三</h2>
              <p className="text-white/80">手机号: 138****8888</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 border-b">
            <h3 className="font-semibold">就诊人管理</h3>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">张三</p>
              <p className="text-sm text-gray-600">身份证: 3101****1234</p>
            </div>
            <button className="text-medical-primary text-sm">编辑</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
