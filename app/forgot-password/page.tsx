import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#10131c] text-[#e1e2ee] overflow-x-hidden relative">
      {/* Ambient glow blobs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#2563eb]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#4cd7f6]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,197,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(180,197,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <ForgotPasswordForm />
    </div>
  );
}