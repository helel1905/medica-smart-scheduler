
import { useState } from "react";
import Layout from "@/components/Layout";
import { Calendar, Clock, ChevronRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockDepartments = [
  {
    id: 1,
    name: "内科系统",
    subDepartments: [
      {
        id: 11,
        name: "心血管内科",
        description: "专注于冠心病、高血压、心律失常、心力衰竭等疾病的诊疗。特色专业：介入心脏病学、心脏电生理、结构性心脏病。",
        doctors: [
          { 
            id: 111,
            name: "王心医",
            title: "主任医师",
            expertise: "冠心病、心律失常",
            schedule: {
              "2024-03-16": { am: true, pm: true },
              "2024-03-17": { am: true, pm: false },
              "2024-03-18": { am: true, pm: true },
              "2024-03-19": { am: false, pm: true },
              "2024-03-20": { am: true, pm: false },
            }
          },
          { 
            id: 112,
            name: "李心医",
            title: "副主任医师",
            expertise: "高血压、心力衰竭",
            schedule: {
              "2024-03-16": { am: false, pm: true },
              "2024-03-17": { am: true, pm: true },
              "2024-03-18": { am: true, pm: false },
              "2024-03-19": { am: true, pm: true },
              "2024-03-20": { am: false, pm: true },
            }
          },
        ],
      },
      {
        id: 12,
        name: "呼吸与危重症医学科",
        description: "专注于肺炎、哮喘、慢阻肺、肺癌、睡眠呼吸障碍等疾病的诊疗。特色专业：呼吸介入、肺移植、呼吸康复。",
        doctors: [
          { 
            id: 121,
            name: "张呼医",
            title: "主任医师",
            expertise: "肺癌、危重症",
            schedule: {
              "2024-03-16": { am: true, pm: true },
              "2024-03-17": { am: false, pm: true },
              "2024-03-18": { am: true, pm: false },
              "2024-03-19": { am: true, pm: true },
              "2024-03-20": { am: true, pm: true },
            }
          },
        ],
      },
      {
        id: 13,
        name: "消化内科",
        description: "专注于胃炎、溃疡病、肝硬化、胰腺炎、炎症性肠病等疾病的诊疗。特色专业：内镜诊疗、肝病学、胃肠动力。",
        doctors: [
          { 
            id: 131,
            name: "陈消医",
            title: "主任医师",
            expertise: "胃肠疾病、内镜诊疗",
            schedule: {
              "2024-03-16": { am: true, pm: false },
              "2024-03-17": { am: true, pm: true },
              "2024-03-18": { am: true, pm: true },
              "2024-03-19": { am: false, pm: true },
              "2024-03-20": { am: true, pm: false },
            }
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "外科系统",
    subDepartments: [
      {
        id: 21,
        name: "普通外科",
        description: "提供甲状腺/乳腺外科、胃肠外科、肝胆外科、疝与腹壁外科等诊疗服务。特色专业：微创外科、减重代谢外科。",
        doctors: [
          { 
            id: 211,
            name: "刘外医",
            title: "主任医师",
            expertise: "微创手术、甲状腺手术",
            schedule: {
              "2024-03-16": { am: true, pm: false },
              "2024-03-17": { am: true, pm: true },
              "2024-03-18": { am: false, pm: true },
              "2024-03-19": { am: true, pm: false },
              "2024-03-20": { am: true, pm: true },
            }
          },
        ],
      },
      {
        id: 22,
        name: "骨科",
        description: "专注于创伤骨科、关节外科、脊柱外科、运动医学等领域。特色专业：骨肿瘤、显微外科。",
        doctors: [
          { 
            id: 221,
            name: "孙骨医",
            title: "主任医师",
            expertise: "关节置换、脊柱外科",
            schedule: {
              "2024-03-16": { am: true, pm: true },
              "2024-03-17": { am: true, pm: false },
              "2024-03-18": { am: true, pm: true },
              "2024-03-19": { am: false, pm: true },
              "2024-03-20": { am: true, pm: false },
            }
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "专科科室",
    subDepartments: [
      {
        id: 31,
        name: "妇产科",
        description: "提供妇科（肿瘤/内分泌）、产科（高危妊娠）、生殖医学等服务。特色专业：盆底康复、胎儿医学。",
        doctors: [
          { 
            id: 311,
            name: "周妇医",
            title: "主任医师",
            expertise: "妇科肿瘤、高危妊娠",
            schedule: {
              "2024-03-16": { am: true, pm: true },
              "2024-03-17": { am: false, pm: true },
              "2024-03-18": { am: true, pm: false },
              "2024-03-19": { am: true, pm: true },
              "2024-03-20": { am: true, pm: false },
            }
          },
        ],
      },
      {
        id: 32,
        name: "儿科",
        description: "包括新生儿科、儿童呼吸/消化/神经专科等。特色专业：儿童血液肿瘤、发育行为儿科。",
        doctors: [
          { 
            id: 321,
            name: "吴儿医",
            title: "主任医师",
            expertise: "儿童呼吸系统疾病",
            schedule: {
              "2024-03-16": { am: true, pm: false },
              "2024-03-17": { am: true, pm: true },
              "2024-03-18": { am: true, pm: true },
              "2024-03-19": { am: false, pm: true },
              "2024-03-20": { am: true, pm: false },
            }
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "中医科",
    subDepartments: [
      {
        id: 41,
        name: "中医内科",
        description: "专注于脾胃病、心脑病等中医诊疗。特色：中西医结合治疗方案。",
        doctors: [
          { 
            id: 411,
            name: "郑中医",
            title: "主任医师",
            expertise: "脾胃病、心脑病",
            schedule: {
              "2024-03-16": { am: true, pm: true },
              "2024-03-17": { am: true, pm: false },
              "2024-03-18": { am: false, pm: true },
              "2024-03-19": { am: true, pm: true },
              "2024-03-20": { am: true, pm: false },
            }
          },
        ],
      },
      {
        id: 42,
        name: "针灸推拿科",
        description: "提供针灸、推拿、拔罐等传统治疗方式。特色：颈肩腰腿痛治疗。",
        doctors: [
          { 
            id: 421,
            name: "赵针医",
            title: "主任医师",
            expertise: "针灸治疗、推拿",
            schedule: {
              "2024-03-16": { am: true, pm: false },
              "2024-03-17": { am: true, pm: true },
              "2024-03-18": { am: true, pm: false },
              "2024-03-19": { am: false, pm: true },
              "2024-03-20": { am: true, pm: true },
            }
          },
        ],
      },
    ],
  },
];

const Appointments = () => {
  const [selectedDept, setSelectedDept] = useState<any>(null);
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
                {selectedDept.doctors.map((doctor: any) => (
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
                      {Object.entries(doctor.schedule).map(([date, schedule]: [string, any]) => (
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
