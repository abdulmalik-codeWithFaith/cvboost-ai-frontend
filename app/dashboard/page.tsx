import WelcomeSection from "@/components/dashboard/WelcomeSection";
import RecentOptimizations from "@/components/dashboard/RecentOptimizations";
import QuickActions from "@/components/dashboard/QuickActions";

const mockOptimizations = [
    {
        id: "1",
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