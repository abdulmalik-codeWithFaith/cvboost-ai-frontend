import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/action";
import FormSubmitButton from "@/components/shared/FormSubmitButton";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import MobileHeader from "@/components/shared/MobileHeader";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import MetricCards from "@/components/dashboard/MetricCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentOptimizations from "@/components/dashboard/RecentOptimizations";

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const displayName = user.user_metadata?.full_name ?? user.email ?? "there";

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="min-w-0 flex-1 md:ml-64 p-4 sm:p-6 md:p-10 pb-24 md:pb-10">
                <MobileHeader
                    rightElement={
                        <form action={signOut}>
                            <FormSubmitButton
                                pendingLabel="Signing out..."
                                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-on-surface-variant transition-colors hover:bg-white/5 hover:text-on-surface"
                            >
                                Sign out
                            </FormSubmitButton>
                        </form>
                    }
                />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <WelcomeSection userName={displayName} />
                    <form action={signOut} className="hidden sm:block">
                        <FormSubmitButton
                            pendingLabel="Signing out..."
                            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-white/5 hover:text-on-surface"
                        >
                            Sign out
                        </FormSubmitButton>
                    </form>
                </div>
                <div className="lg:grid-cols-12 gap-6 mt-8">
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <MetricCards />
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <QuickActions />
                    </div>
                </div>
                <div className="mt-6">
                    <RecentOptimizations optimizations={mockOptimizations} />
                </div>
            </main>
            <MobileNav />
        </div>
    );
}

const mockOptimizations = [
    {
        id: "1",
        jobTitle: "Senior Product Designer",
        company: "TechFlow Inc.",
        matchScore: 92,
        date: "Today, 10:24 AM",
        status: "high" as const,
    },
    {
        id: "2",
        jobTitle: "Full Stack Engineer",
        company: "Stripe",
        matchScore: 78,
        date: "Yesterday",
        status: "mid" as const,
    },
    {
        id: "3",
        jobTitle: "Product Manager",
        company: "Linear",
        matchScore: 61,
        date: "3 days ago",
        status: "low" as const,
    },
];
