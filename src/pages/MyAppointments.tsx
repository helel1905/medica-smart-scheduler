
import { useState } from "react";
import Layout from "@/components/Layout";
import { Calendar, Clock, ChevronRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  name: string;
  title: string;
  licenseNo: string;
}

interface Appointment {
  id: string;
  departmentName: string;
  doctor: Doctor;
  appointmentTime: string;
  status: "已就诊" | "未就诊" | "已取消" | "已过期";
  type: "门诊" | "复诊" | "检查" | "手术";
  channel: "微信" | "APP" | "电话" | "现场";
}

const mockAppointments: Appointment[] = [
  {
    id: "APT202403150001",
    departmentName: "心血管内科",
    doctor: {
      name: "张医生",
      title: "主任医师",
      licenseNo: "110108197001012345"
    },
    appointmentTime: "2024-03-15 09:30:00",
    status: "已就诊",
    type: "门诊",
    channel: "APP"
  },
  {
    id: "APT202403200002",
    departmentName: "心血管内科",
    doctor: {
      name: "李医生",
      title: "副主任医师",
      licenseNo: "110108198001012345"
    },
    appointmentTime: "2024-03-20 14:30:00",
    status: "未就诊",
    type: "复诊",
    channel: "APP"
  },
  {
    id: "APT202403180003",
    departmentName: "放射科",
    doctor: {
      name: "王医生",
      title: "主治医师",
      licenseNo: "110108199001012345"
    },
    appointmentTime: "2024-03-18 10:00:00",
    status: "未就诊",
    type: "检查",
    channel: "微信"
  }
];

const statusColors = {
  "已就诊": "bg-green-500",
  "未就诊": "bg-blue-500",
  "已取消": "bg-gray-500",
  "已过期": "bg-red-500"
};

const MyAppointments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState<"全部" | "已就诊" | "未就诊" | "已取消">("全部");
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const handleViewDetail = (appointment: Appointment) => {
    navigate(`/my-appointments/detail/${appointment.id}`, { state: { appointment } });
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === appointmentId ? { ...appointment, status: "已取消" } : appointment
      )
    );
    toast({
      title: "预约已取消",
      description: "您已成功取消预约",
      variant: "destructive",
    });
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (activeFilter === "全部") return true;
    return appointment.status === activeFilter;
  });

  return (
    <Layout>
      <div className="p-4 animate-fade-in">
        {/* Current Patient */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-gray-600" />
              <div>
                <h2 className="font-semibold">张三</h2>
                <p className="text-sm text-gray-500">身份证: 310******1234</p>
              </div>
            </div>
            <button className="text-medical-primary text-sm">切换就诊人</button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {["全部", "已就诊", "未就诊", "已取消"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as typeof activeFilter)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeFilter === filter
                  ? "bg-medical-primary text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Appointment Cards */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl p-4 shadow-sm relative"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold">{appointment.departmentName}</h3>
                  <p className="text-sm text-gray-600">{appointment.doctor.name} | {appointment.doctor.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  {appointment.status === "未就诊" && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="text-red-500 text-sm"
                    >
                      取消预约
                    </button>
                  )}
                  <button
                    onClick={() => handleViewDetail(appointment)}
                    className="text-medical-primary text-sm"
                  >
                    查看详情
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(appointment.appointmentTime).toLocaleDateString()}
                </span>
                <Clock className="w-4 h-4 ml-2" />
                <span>
                  {new Date(appointment.appointmentTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs text-white ${
                    statusColors[appointment.status]
                  }`}>
                    {appointment.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {appointment.type}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {appointment.channel}预约
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            暂无预约记录
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyAppointments;
