
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { User, ChevronRight, Bell, Shield, HelpCircle, Settings, UserPlus, Calendar, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Patient {
  id: string;
  name: string;
  idCard: string;
  gender: "男" | "女";
  birthDate: string;
  phone: string;
  address: string;
  relation: string;
  isDefault: boolean;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "张三",
    idCard: "310101199001011234",
    gender: "男",
    birthDate: "1990-01-01",
    phone: "13812345678",
    address: "上海市浦东新区张江高科技园区",
    relation: "本人",
    isDefault: true,
  },
  {
    id: "2",
    name: "张小明",
    idCard: "310101201501011234",
    gender: "男",
    birthDate: "2015-01-01",
    phone: "13812345678",
    address: "上海市浦东新区张江高科技园区",
    relation: "子女",
    isDefault: false,
  }
];

const menuItems = [
  { icon: Calendar, label: "我的预约", path: "/my-appointments" },
  { icon: Bell, label: "消息通知", badge: 2 },
  { icon: Shield, label: "隐私设置" },
  { icon: HelpCircle, label: "帮助中心" },
  { icon: Settings, label: "系统设置" },
  { icon: LogOut, label: "退出登录", path: "/login" },
];

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>(mockPatients);

  const handleEdit = (patient: Patient) => {
    navigate("/profile/patient-edit", { state: { patient } });
  };

  const handleAdd = () => {
    navigate("/profile/patient-edit");
  };

  const handleMenuClick = (path?: string, label?: string) => {
    if (path) {
      if (label === "退出登录") {
        toast({
          title: "退出成功",
          description: "您已成功退出登录",
        });
      }
      navigate(path);
    }
  };

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
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">就诊人管理</h3>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 text-medical-primary text-sm"
            >
              <UserPlus className="w-4 h-4" />
              新增就诊人
            </button>
          </div>
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="p-4 border-b last:border-b-0 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{patient.name}</p>
                  {patient.isDefault && (
                    <span className="text-xs text-medical-primary bg-blue-50 px-2 py-0.5 rounded-full">
                      默认
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  身份证: {patient.idCard.replace(/(\d{4})\d{10}(\d{4})/, "$1****$2")}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {patient.relation} | {patient.gender} | {patient.phone}
                </p>
              </div>
              <button
                onClick={() => handleEdit(patient)}
                className="text-medical-primary text-sm"
              >
                编辑
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b last:border-b-0 cursor-pointer active:bg-gray-50"
                onClick={() => handleMenuClick(item.path, item.label)}
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
