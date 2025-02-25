
import Layout from "@/components/Layout";
import { CreditCard, AlertCircle } from "lucide-react";

const mockPayments = [
  {
    id: 1,
    type: "挂号费",
    amount: 50,
    status: "待支付",
    dueDate: "2024-03-16",
    department: "内科",
  },
  {
    id: 2,
    type: "检查费",
    amount: 200,
    status: "已支付",
    dueDate: "2024-03-10",
    department: "外科",
  },
];

const Payments = () => {
  return (
    <Layout>
      <div className="p-4 animate-fade-in">
        <h1 className="text-xl font-bold mb-4">医疗支付</h1>

        <div className="bg-medical-primary text-white p-4 rounded-xl mb-6">
          <p className="text-lg font-semibold">待支付总额</p>
          <p className="text-3xl font-bold mt-2">¥ 250.00</p>
        </div>

        <div className="space-y-4">
          {mockPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{payment.type}</p>
                  <p className="text-sm text-gray-600">{payment.department}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    payment.status === "待支付"
                      ? "bg-red-50 text-red-500"
                      : "bg-green-50 text-green-500"
                  }`}
                >
                  {payment.status}
                </span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-lg font-bold">¥ {payment.amount}.00</p>
                {payment.status === "待支付" && (
                  <button className="bg-medical-primary text-white px-4 py-2 rounded-lg text-sm">
                    立即支付
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Payments;
