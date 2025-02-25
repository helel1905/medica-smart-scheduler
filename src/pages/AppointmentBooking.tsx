
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Calendar, Clock, User, ChevronRight } from "lucide-react";

const mockTimeSlots = [
  { id: 1, time: "09:00", available: true },
  { id: 2, time: "09:30", available: true },
  { id: 3, time: "10:00", available: false },
  { id: 4, time: "10:30", available: true },
  { id: 5, time: "11:00", available: true },
  { id: 6, time: "14:00", available: true },
  { id: 7, time: "14:30", available: false },
  { id: 8, time: "15:00", available: true },
  { id: 9, time: "15:30", available: true },
  { id: 10, time: "16:00", available: true },
];

const mockPatients = [
  { id: 1, name: "张三", idCard: "310********1234", isDefault: true },
  { id: 2, name: "张小明", idCard: "310********5678", isDefault: false },
];

const AppointmentBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("2024-03-16");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);

  const handleSubmit = () => {
    if (!selectedTime || !selectedPatient) return;
    
    // Mock appointment creation
    const appointmentData = {
      date: selectedDate,
      time: selectedTime,
      patient: selectedPatient,
      amount: 50,
    };

    // Navigate to payment page
    navigate("/payments", { state: { appointment: appointmentData } });
  };

  return (
    <Layout>
      <div className="p-4 animate-fade-in">
        <h1 className="text-xl font-bold mb-4">预约确认</h1>

        {/* Date Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="font-semibold mb-3">选择就诊日期</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[0, 1, 2, 3, 4].map((day) => {
              const date = new Date();
              date.setDate(date.getDate() + day);
              const dateStr = date.toISOString().split('T')[0];
              
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`flex-shrink-0 p-3 rounded-lg text-center min-w-[80px] ${
                    selectedDate === dateStr
                      ? "bg-medical-primary text-white"
                      : "bg-gray-50"
                  }`}
                >
                  <p className="text-sm">{date.getDate()}日</p>
                  <p className="text-xs">
                    {['周日','周一','周二','周三','周四','周五','周六'][date.getDay()]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="font-semibold mb-3">选择就诊时间</h2>
          <div className="grid grid-cols-4 gap-2">
            {mockTimeSlots.map((slot) => (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
                className={`p-2 rounded-lg text-center ${
                  !slot.available
                    ? "bg-gray-100 text-gray-400"
                    : selectedTime === slot.time
                    ? "bg-medical-primary text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <span className="text-sm">{slot.time}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Patient Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h2 className="font-semibold mb-3">选择就诊人</h2>
          <div className="space-y-3">
            {mockPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                  selectedPatient.id === patient.id
                    ? "bg-blue-50 border border-medical-primary"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-xs text-gray-500">{patient.idCard}</p>
                  </div>
                </div>
                {patient.isDefault && (
                  <span className="text-xs text-medical-primary">默认</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedTime || !selectedPatient}
          className="w-full bg-medical-primary text-white p-4 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          确认预约
        </button>
      </div>
    </Layout>
  );
};

export default AppointmentBooking;
