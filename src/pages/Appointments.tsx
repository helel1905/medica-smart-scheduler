
import Layout from "@/components/Layout";
import { Calendar, Clock } from "lucide-react";

const mockDepartments = [
  {
    id: 1,
    name: "内科",
    doctors: [
      { id: 1, name: "张医生", title: "主任医师", availability: "上午" },
      { id: 2, name: "李医生", title: "副主任医师", availability: "下午" },
    ],
  },
  {
    id: 2,
    name: "外科",
    doctors: [
      { id: 3, name: "王医生", title: "主任医师", availability: "全天" },
      { id: 4, name: "刘医生", title: "副主任医师", availability: "上午" },
    ],
  },
];

const Appointments = () => {
  return (
    <Layout>
      <div className="p-4 animate-fade-in">
        <h1 className="text-xl font-bold mb-4">预约挂号</h1>
        
        <div className="space-y-4">
          {mockDepartments.map((dept) => (
            <div key={dept.id} className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">{dept.name}</h2>
              
              <div className="space-y-3">
                {dept.doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.title}</p>
                    </div>
                    <div className="flex items-center text-sm text-medical-primary">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{doctor.availability}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="fixed bottom-24 right-4 bg-medical-primary text-white p-4 rounded-full shadow-lg">
          <Calendar className="w-6 h-6" />
        </button>
      </div>
    </Layout>
  );
};

export default Appointments;
