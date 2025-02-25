
import Layout from "@/components/Layout";
import { FileText, ChevronRight } from "lucide-react";

const mockRecords = [
  {
    id: 1,
    date: "2024-03-15",
    department: "内科",
    doctor: "张医生",
    diagnosis: "普通感冒",
    type: "门诊",
  },
  {
    id: 2,
    date: "2024-03-10",
    department: "外科",
    doctor: "王医生",
    diagnosis: "扭伤",
    type: "急诊",
  },
];

const Records = () => {
  return (
    <Layout>
      <div className="p-4 animate-fade-in">
        <h1 className="text-xl font-bold mb-4">电子病历</h1>

        <div className="space-y-4">
          {mockRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="bg-blue-50 p-2 rounded-lg mr-3">
                  <FileText className="text-medical-primary w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">{record.date}</p>
                  <p className="text-sm text-gray-600">
                    {record.department} - {record.doctor}
                  </p>
                  <p className="text-sm text-gray-500">{record.diagnosis}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Records;
