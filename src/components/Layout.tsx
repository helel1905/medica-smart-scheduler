
import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-medical-background">
      <main className="pb-20">{children}</main>
      <BottomNav />
    </div>
  );
};

export default Layout;
