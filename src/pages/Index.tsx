
import { Calendar, FileText, MessageCircle, User } from "lucide-react";
import Layout from "@/components/Layout";

const quickLinks = [
  {
    icon: Calendar,
    label: "预约挂号",
    path: "/appointments",
    color: "bg-blue-50",
    iconColor: "text-medical-primary",
  },
  {
    icon: FileText,
    label: "病历查询",
    path: "/records",
    color: "bg-green-50",
    iconColor: "text-medical-secondary",
  },
  {
    icon: MessageCircle,
    label: "在线问诊",
    path: "/ai-diagnosis",
    color: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    icon: User,
    label: "个人中心",
    path: "/profile",
    color: "bg-orange-50",
    iconColor: "text-orange-500",
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="p-4 animate-fade-in">
        {/* Banner */}
        <div className="mb-6 bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">医院公告</h2>
          <p className="text-gray-600 text-sm">
            欢迎使用智慧医疗服务平台，为您提供便捷的医疗服务体验。
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.path}
                href={link.path}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm transition-transform duration-200 active:scale-95"
              >
                <div
                  className={`${link.color} p-3 rounded-full mb-2 transition-transform duration-200`}
                >
                  <Icon className={`${link.iconColor} w-6 h-6`} />
                </div>
                <span className="text-gray-700 text-sm">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Health Tips */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">健康提示</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              • 建议保持良好作息，每天保证7-8小时睡眠
            </p>
            <p className="text-sm text-gray-600">
              • 多运动多喝水，保持健康生活方式
            </p>
            <p className="text-sm text-gray-600">
              • 定期体检，预防胜于治疗
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
