import { History } from "@/components/history";
import Navbar from "@/components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex bg-main-white">
      <Navbar>
        <History />
      </Navbar>
      {children}
    </div>
  );
}
