import LoginLeftPanel from "@/components/LoginLeftPanel";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex w-full bg-[#10131c] overflow-hidden relative">
      {/* Ambient glow blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#2563eb]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#4cd7f6]/10 rounded-full blur-[100px] pointer-events-none" />

      <LoginLeftPanel />
      <LoginForm />
    </div>
  );
}