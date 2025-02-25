
import Layout from "@/components/Layout";
import { Send, User, Bot } from "lucide-react";
import { useState } from "react";

const mockChatHistory = [
  {
    id: 1,
    role: "system",
    content: "您好，我是AI医疗助手。请描述您的症状，我会为您进行初步诊断。",
  },
];

const AIDiagnosis = () => {
  const [messages, setMessages] = useState(mockChatHistory);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: "system",
        content: "根据您的描述，建议您及时就医进行详细检查。需要我为您预约挂号吗？",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Layout>
      <div className="p-4 animate-fade-in">
        <h1 className="text-xl font-bold mb-4">AI智能问诊</h1>

        <div className="bg-gray-50 rounded-xl p-4 h-[calc(100vh-200px)] flex flex-col">
          <div className="flex-1 overflow-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    message.role === "user"
                      ? "bg-medical-primary text-white"
                      : "bg-white"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-xl max-w-[80%] ${
                    message.role === "user"
                      ? "bg-medical-primary text-white"
                      : "bg-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请描述您的症状..."
              className="flex-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-medical-primary"
            />
            <button
              onClick={handleSend}
              className="bg-medical-primary text-white p-3 rounded-xl"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIDiagnosis;
