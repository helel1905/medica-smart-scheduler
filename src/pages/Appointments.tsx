
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Users } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  title: string;
  schedule: {
    [key: string]: {
      am: boolean;
      pm: boolean;
    };
  };
}

interface SubDepartment {
  id: number;
  name: string;
  description: string;
  doctors: Doctor[];
}

interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

const mockDepartments: Department[] = [
  {
    id: 1,
    name: "内科",
    subDepartments: [
      {
        id: 11,
        name: "心血管内科",
        description: "专注于心脏病、高血压等心血管疾病的诊断和治疗",
        doctors: [
          {
            id: 111,
            name: "张医生",
            title: "主任医师",
            schedule: {
              "2024-03-15": { am: true, pm: false },
              "2024-03-16": { am: true, pm: true },
              "2024-03-17": { am: false, pm: true },
              "2024-03-18": { am: true, pm: false },
              "2024-03-19": { am: true, pm: true }
            }
          },
          {
            id: 112,
            name: "李医生",
            title: "副主任医师",
            schedule: {
              "2024-03-15": { am: true, pm: true },
              "2024-03-16": { am: false, pm: true },
              "2024-03-17": { am: true, pm: false },
              "2024-03-18": { am: true, pm: true },
              "2024-03-19": { am: false, pm: true }
            }
          }
        ]
      },
      {
        id: 12,
        name: "消化内科",
        description: "专注于胃肠道、肝胆等消化系统疾病的诊断和治疗",
        doctors: [
          {
            id: 121,
            name: "王医生",
            title: "主任医师",
            schedule: {
              "2024-03-15": { am: true, pm: true },
              "2024-03-16": { am: true, pm: false },
              "2024-03-17": { am: true, pm: true },
              "2024-03-18": { am: false, pm: true },
              "2024-03-19": { am: true, pm: false }
            }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "外科",
    subDepartments: [
      {
        id: 21,
        name: "普通外科",
        description: "开展普通外科手术及诊疗服务",
        doctors: [
          {
            id: 211,
            name: "刘医生",
            title: "主任医师",
            schedule: {
              "2024-03-15": { am: true, pm: true },
              "2024-03-16": { am: true, pm: true },
              "2024-03-17": { am: false, pm: true },
              "2024-03-18": { am: true, pm: false },
              "2024-03-19": { am: true, pm: true }
            }
          }
        ]
      }
    ]
  }
];

const Appointments = () => {
  const [selectedDept, setSelectedDept] = useState<SubDepartment | null>(null);
  const navigate = useNavigate();

  const handleBooking = (deptId: number, doctorId: number) => {
    navigate(`/appointments/booking`, { 
      state: { 
        departmentId: deptId, 
        doctorId: doctorId 
      } 
    });
  };

  return (
    <Layout>
      <div className="p-4 animate-fade-in">
        <h1 className="text-xl font-bold mb-4">预约挂号</h1>
        
        <div className="flex gap-4">
          {/* Departments List */}
          <div className="w-1/3 space-y-2">
            {mockDepartments.map((dept) => (
              <div key={dept.id}>
                <h3 className="font-bold text-gray-700 mb-2">{dept.name}</h3>
                {dept.subDepartments.map((subDept) => (
                  <div
                    key={subDept.id}
                    onClick={() => setSelectedDept(subDept)}
                    className={`p-3 rounded-lg text-sm cursor-pointer transition-colors ${
                      selectedDept?.id === subDept.id
                        ? "bg-medical-primary text-white"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {subDept.name}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Department Details */}
          {selectedDept ? (
            <div className="flex-1">
              <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                <h2 className="text-lg font-semibold mb-2">{selectedDept.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{selectedDept.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>在线预约量: {selectedDept.doctors.length * 20}/周</span>
                  </div>
                  <button 
                    onClick={() => handleBooking(selectedDept.id, selectedDept.doctors[0].id)}
                    className="bg-medical-primary text-white px-4 py-2 rounded-lg text-sm"
                  >
                    立即预约
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">本周出诊医生</h3>
                {selectedDept.doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.title}</p>
                      </div>
                      <button 
                        onClick={() => handleBooking(selectedDept.id, doctor.id)}
                        className="text-medical-primary text-sm"
                      >
                        预约
                      </button>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(doctor.schedule).map(([date, schedule]) => (
                        <div key={date} className="text-center">
                          <p className="text-xs text-gray-500 mb-1">
                            {new Date(date).getDate()}日
                          </p>
                          <div className="space-y-1">
                            <div className={`text-xs px-2 py-1 rounded ${
                              schedule.am 
                                ? "bg-green-50 text-green-600" 
                                : "bg-gray-50 text-gray-400"
                            }`}>
                              上午
                            </div>
                            <div className={`text-xs px-2 py-1 rounded ${
                              schedule.pm 
                                ? "bg-green-50 text-green-600" 
                                : "bg-gray-50 text-gray-400"
                            }`}>
                              下午
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              请选择科室查看详情
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Appointments;
