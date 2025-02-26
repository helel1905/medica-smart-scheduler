
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { ChevronLeft, User } from "lucide-react";

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

const mockPatient: Patient = {
  id: "1",
  name: "张三",
  idCard: "310101199001011234",
  gender: "男",
  birthDate: "1990-01-01",
  phone: "13812345678",
  address: "上海市浦东新区张江高科技园区",
  relation: "本人",
  isDefault: true,
};

const PatientEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state?.patient != null;
  const [patient, setPatient] = useState<Patient>(
    location.state?.patient || mockPatient
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里应该调用API保存数据
    navigate("/profile");
  };

  return (
    <Layout>
      <div className="p-4 animate-fade-in">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-600">
            <ChevronLeft className="w-5 h-5" />
            返回
          </button>
          <h1 className="text-xl font-bold ml-2">
            {isEdit ? "编辑就诊人" : "新增就诊人"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">姓名</label>
              <input
                type="text"
                value={patient.name}
                onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">身份证号</label>
              <input
                type="text"
                value={patient.idCard}
                onChange={(e) => setPatient({ ...patient, idCard: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">性别</label>
              <div className="flex gap-4">
                {["男", "女"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={patient.gender === gender}
                      onChange={(e) => setPatient({ ...patient, gender: e.target.value as "男" | "女" })}
                      className="mr-2"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">出生日期</label>
              <input
                type="date"
                value={patient.birthDate}
                onChange={(e) => setPatient({ ...patient, birthDate: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">手机号</label>
              <input
                type="tel"
                value={patient.phone}
                onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">地址</label>
              <input
                type="text"
                value={patient.address}
                onChange={(e) => setPatient({ ...patient, address: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">与本人关系</label>
              <select
                value={patient.relation}
                onChange={(e) => setPatient({ ...patient, relation: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="本人">本人</option>
                <option value="配偶">配偶</option>
                <option value="子女">子女</option>
                <option value="父母">父母</option>
                <option value="其他">其他</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={patient.isDefault}
                onChange={(e) => setPatient({ ...patient, isDefault: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm text-gray-600">设为默认就诊人</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-medical-primary text-white p-4 rounded-xl"
          >
            保存
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PatientEdit;
