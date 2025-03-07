
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Phone, Lock, User, LogIn } from "lucide-react";

// Mock user data
const mockUser = {
  name: "张三",
  phone: "13812345678",
  password: "123456"
};

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (phone: string) => {
    // Simple Chinese phone number validation
    return /^1[3-9]\d{9}$/.test(phone);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validatePhone(phone)) {
      toast({
        title: "手机号格式不正确",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      if (password === mockUser.password) {
        toast({
          title: "登录成功",
          description: `欢迎回来，${mockUser.name}`,
        });
        navigate("/profile");
      } else {
        toast({
          title: "密码错误",
          description: "请检查您的密码是否正确",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleVerificationLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validatePhone(phone)) {
      toast({
        title: "手机号格式不正确",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      if (verificationCode === "1234") {
        toast({
          title: "登录成功",
          description: `欢迎回来，${mockUser.name}`,
        });
        navigate("/profile");
      } else {
        toast({
          title: "验证码错误",
          description: "请检查您的验证码是否正确",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSendVerificationCode = () => {
    if (!validatePhone(phone)) {
      toast({
        title: "手机号格式不正确",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "验证码已发送",
      description: "验证码为1234（模拟）",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-medical-primary/10">
            <User className="w-8 h-8 text-medical-primary" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6">健康医疗系统</h1>
        
        <Tabs defaultValue="password" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="password">密码登录</TabsTrigger>
            <TabsTrigger value="verification">验证码登录</TabsTrigger>
          </TabsList>
          
          <TabsContent value="password">
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <Phone className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="请输入手机号"
                    className="flex-1 outline-none"
                    maxLength={11}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <Lock className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="请输入密码"
                    className="flex-1 outline-none"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-medical-primary text-white py-2 rounded-lg disabled:opacity-70"
              >
                {isLoading ? "登录中..." : "登录"}
              </button>
            </form>
          </TabsContent>
          
          <TabsContent value="verification">
            <form onSubmit={handleVerificationLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <Phone className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="请输入手机号"
                    className="flex-1 outline-none"
                    maxLength={11}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <Lock className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="请输入验证码"
                    className="flex-1 outline-none"
                    maxLength={4}
                  />
                  <button
                    type="button"
                    onClick={handleSendVerificationCode}
                    className="text-sm text-medical-primary"
                  >
                    获取验证码
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-medical-primary text-white py-2 rounded-lg disabled:opacity-70"
              >
                {isLoading ? "登录中..." : "登录"}
              </button>
            </form>
          </TabsContent>
        </Tabs>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          注册即表示同意《用户协议》和《隐私条款》
        </p>
      </div>
    </div>
  );
};

export default Login;
