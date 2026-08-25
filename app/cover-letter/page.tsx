import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import CoverLetterEditor from "@/components/cover-letter/CoverLetterEditor";

export default function CoverLetterPage() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-6 md:p-10 pb-24 md:pb-10">
                <CoverLetterEditor />
            </main>
            <MobileNav />
        </div>
    );
}