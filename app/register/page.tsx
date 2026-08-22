import RegisterLeftPanel from "@/components/auth/RegisterLeftPanel";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex bg-[#05070f] relative overflow-x-hidden">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#b4c5ff]/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#4cd7f6]/5 blur-[150px]" />
      </div>

      {/* Main Container Card */}
      <div
        className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden"
        style={{
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 40px rgba(6,182,212,0.15)",
        }}
      >
        <RegisterLeftPanel />
        <RegisterForm />
      </div>
    </div>
  );
}