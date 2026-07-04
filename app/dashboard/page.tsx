<<<<<<< HEAD
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import MetricCards from "@/components/dashboard/MetricCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentOptimizations from "@/components/dashboard/RecentOptimizations";

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-6 md:p-10 pb-24 md:pb-10">
                <WelcomeSection userName="Sarah" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
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
=======
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import RecentOptimizations from "@/components/dashboard/RecentOptimizations";
import QuickActions from "@/components/dashboard/QuickActions";
>>>>>>> 2fb61ef3a092a06e240d924a1c893b64aa0fe816

const mockOptimizations = [
    {
        id: "1",
<<<<<<< HEAD
        jobTitle: "Senior Product Designer",
        company: "TechFlow Inc.",
        matchScore: 92,
        date: "Today, 10:24 AM",
        status: "high" as const,
    },
    {
        id: "2",
        jobTitle: "Frontend Engineer",
        company: "StartupX",
        matchScore: 78,
        date: "Yesterday",
        status: "mid" as const,
    },
    {
        id: "3",
        jobTitle: "UX Researcher",
        company: "Global Agency",
        matchScore: 45,
        date: "Oct 24, 2023",
        status: "low" as const,
    },
];
=======
        jobTitle: "Frontend Developer",
        company: "Google",
        matchScore: 87,
        date: "2 days ago",
    },
    {
        id: "2",
        jobTitle: "React Engineer",
        company: "Stripe",
        matchScore: 92,
        date: "5 days ago",
    },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background p-8">
            <WelcomeSection userName="Sarah" />
            <RecentOptimizations optimizations={mockOptimizations} />
            <QuickActions />
        </div>
    );
}
>>>>>>> 2fb61ef3a092a06e240d924a1c893b64aa0fe816
