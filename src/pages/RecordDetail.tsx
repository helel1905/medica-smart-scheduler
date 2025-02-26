
import { useState } from "react";
import Layout from "@/components/Layout";
import { AlertTriangle, ChevronLeft, Download, FileText, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockRecordDetail = {
  basicInfo: {
    patient: {
      name: "张*",
      gender: "男",
      age: "35",
      recordNo: "0021****89",
      allergies: ["青霉素", "磺胺类药物"],
    },
    visit: {
      type: "门诊",
      time: "2023-08-20 14:30",
      department: "呼吸与危重症医学科",
      doctor: {
        name: "李华",
        title: "主任医师",
        licenseNo: "110108197001012345",
      },
    },
  },
  diagnosis: {
    chiefComplaint: {
      description: "咳嗽伴发热3天，最高体温38.5℃",
      timeline: [
        { time: "2023-08-17", temp: 37.5 },
        { time: "2023-08-18", temp: 38.2 },
        { time: "2023-08-19", temp: 38.5 },
        { time: "2023-08-20", temp: 37.8 },
      ],
    },
    history: {
      past: "高血压病史2年（用药：络活喜5mg qd）",
      family: "父亲糖尿病史",
    },
    examination: {
      vitalSigns: {
        temperature: "37.8℃",
        pulse: "92次/分",
        respiration: "20次/分",
        bloodPressure: "130/85mmHg",
      },
      specialist: {
        throat: "充血++",
        lung: "右下肺湿啰音",
      },
    },
    labTests: [
      { item: "WBC", result: "13.2", reference: "4-10", abnormal: true },
      { item: "CRP", result: "48", reference: "0-10", abnormal: true },
    ],
    imaging: [
      { type: "胸部CT", finding: "右下肺片状磨玻璃影", hasImage: true },
      { type: "心电图", finding: "窦性心动过速", hasImage: true },
    ],
    conclusion: {
      primary: "社区获得性肺炎（CAP）",
      differential: "肺结核（已排除）",
      icdCode: "J15.9",
    },
  },
  treatment: {
    medications: [
      {
        name: "左氧氟沙星",
        spec: "0.5g",
        usage: "每日一次 静脉滴注",
        duration: "7天",
      },
      {
        name: "氨溴索口服液",
        spec: "30ml",
        usage: "10ml tid 口服",
        duration: "至症状消失",
      },
    ],
    procedures: [
      { time: "2023-08-20 15:00", action: "静脉采血" },
      { time: "2023-08-21 09:00", action: "胸部CT检查" },
    ],
    instructions: [
      "卧床休息，每日饮水>2000ml",
      "3天后复查血常规",
    ],
  },
  meta: {
    signature: {
      doctor: "李华",
      timestamp: "2023-08-20 16:45:32",
      verified: true,
    },
    revisions: [
      {
        time: "2023-08-22 10:30",
        doctor: "李华",
        action: "补充病程记录",
      },
    ],
  },
};

const RecordDetail = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-4 pb-20 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
            返回
          </button>
          <button className="text-medical-primary flex items-center gap-1">
            <Download className="w-4 h-4" />
            导出
          </button>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="text-lg font-bold mb-3">基础病历信息</h2>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium">
                  {mockRecordDetail.basicInfo.patient.name} {" "}
                  {mockRecordDetail.basicInfo.patient.gender} {" "}
                  {mockRecordDetail.basicInfo.patient.age}岁
                </span>
              </div>
              <p className="text-sm text-gray-600">
                病历号：{mockRecordDetail.basicInfo.patient.recordNo}
              </p>
            </div>
            {mockRecordDetail.basicInfo.patient.allergies.length > 0 && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>过敏史</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-gray-500">就诊类型：</span>
              {mockRecordDetail.basicInfo.visit.type}
            </p>
            <p className="text-sm">
              <span className="text-gray-500">就诊时间：</span>
              {mockRecordDetail.basicInfo.visit.time}
            </p>
            <p className="text-sm">
              <span className="text-gray-500">就诊科室：</span>
              {mockRecordDetail.basicInfo.visit.department}
            </p>
            <p className="text-sm">
              <span className="text-gray-500">接诊医生：</span>
              {mockRecordDetail.basicInfo.visit.doctor.name} {" "}
              {mockRecordDetail.basicInfo.visit.doctor.title}
            </p>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="text-lg font-bold mb-3">诊断详情</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">主诉与病史</h3>
              <p className="text-sm text-gray-600 mb-2">
                {mockRecordDetail.diagnosis.chiefComplaint.description}
              </p>
              <p className="text-sm text-gray-600">
                <span className="text-gray-500">既往史：</span>
                {mockRecordDetail.diagnosis.history.past}
              </p>
              <p className="text-sm text-gray-600">
                <span className="text-gray-500">家族史：</span>
                {mockRecordDetail.diagnosis.history.family}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">体格检查</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm">
                  <span className="text-gray-500">体温：</span>
                  {mockRecordDetail.diagnosis.examination.vitalSigns.temperature}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">脉搏：</span>
                  {mockRecordDetail.diagnosis.examination.vitalSigns.pulse}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">呼吸：</span>
                  {mockRecordDetail.diagnosis.examination.vitalSigns.respiration}
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">血压：</span>
                  {mockRecordDetail.diagnosis.examination.vitalSigns.bloodPressure}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">检验报告</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-2">项目</th>
                      <th className="text-left p-2">结果</th>
                      <th className="text-left p-2">参考值</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRecordDetail.diagnosis.labTests.map((test, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{test.item}</td>
                        <td className={`p-2 ${test.abnormal ? "text-red-500" : ""}`}>
                          {test.result}
                          {test.abnormal && "↑"}
                        </td>
                        <td className="p-2 text-gray-500">{test.reference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">影像检查</h3>
              <div className="space-y-2">
                {mockRecordDetail.diagnosis.imaging.map((image, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{image.type}</p>
                      <p className="text-sm text-gray-600">{image.finding}</p>
                    </div>
                    {image.hasImage && (
                      <button className="text-medical-primary text-sm">
                        查看图像
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">诊断结论</h3>
              <p className="text-sm">
                <span className="text-gray-500">初步诊断：</span>
                {mockRecordDetail.diagnosis.conclusion.primary}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">鉴别诊断：</span>
                {mockRecordDetail.diagnosis.conclusion.differential}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">ICD-10：</span>
                {mockRecordDetail.diagnosis.conclusion.icdCode}
              </p>
            </div>
          </div>
        </div>

        {/* Treatment */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="text-lg font-bold mb-3">治疗记录</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">用药方案</h3>
              <div className="space-y-3">
                {mockRecordDetail.treatment.medications.map((med, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-sm">{med.name}</p>
                    <p className="text-sm text-gray-600">
                      规格：{med.spec} | 用法：{med.usage}
                    </p>
                    <p className="text-sm text-gray-600">疗程：{med.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">处置记录</h3>
              <div className="space-y-2">
                {mockRecordDetail.treatment.procedures.map((proc, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-gray-500">{proc.time}</span>
                    {" "}{proc.action}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">医嘱信息</h3>
              <div className="space-y-1">
                {mockRecordDetail.treatment.instructions.map((instruction, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    • {instruction}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Meta Information */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <div>
              医师签名：{mockRecordDetail.meta.signature.doctor}
              <span className="ml-2">
                {mockRecordDetail.meta.signature.timestamp}
              </span>
            </div>
            {mockRecordDetail.meta.signature.verified && (
              <span className="text-green-500">已验证</span>
            )}
          </div>
          {mockRecordDetail.meta.revisions.length > 0 && (
            <div className="text-sm text-gray-500">
              修订记录：
              {mockRecordDetail.meta.revisions.map((rev, index) => (
                <div key={index}>
                  {rev.time} {rev.doctor} {rev.action}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RecordDetail;
