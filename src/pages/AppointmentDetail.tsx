
import Layout from "@/components/Layout";
import { ChevronLeft, QrCode } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const AppointmentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state?.appointment;

  if (!appointment) {
    return null;
  }

  return (
    <Layout>
      <div className="p-4 animate-fade-in">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
            返回
          </button>
          <h1 className="text-xl font-bold ml-2">预约详情</h1>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-32 h-32 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">请出示二维码完成就诊</p>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="font-semibold mb-2">就诊信息</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">预约编号</span>
                  <span>{appointment.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">就诊科室</span>
                  <span>{appointment.departmentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">医生信息</span>
                  <span>{appointment.doctor.name} {appointment.doctor.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">就诊时间</span>
                  <span>{new Date(appointment.appointmentTime).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">就诊状态</span>
                  <span>{appointment.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">就诊类型</span>
                  <span>{appointment.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">预约渠道</span>
                  <span>{appointment.channel}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-2">就诊须知</h2>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 请您按时到达医院，避免迟到</li>
                <li>• 请携带有效身份证件</li>
                <li>• 如需取消预约，请提前24小时操作</li>
                <li>• 就诊前请确保手机电量充足</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AppointmentDetail;
