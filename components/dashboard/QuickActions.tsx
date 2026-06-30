import Link from "next/link";
import { Upload, FileText, Sparkles } from "lucide-react";

interface QuickAction {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const actions: QuickAction[] = [
    {
        label: "Upload New CV",
        href: "/upload",
        icon: <Upload size={20} />,
    },
    {
        label: "View Results",
        href: "/results",
        icon: <FileText size={20} />,
    },
    {
        label: "Optimize Again",
        href: "/upload",
        icon: <Sparkles size={20} />,
    },
];

export default function QuickActions() {
    return (
        <section>
            <h2 className="text-xl font-semibold text-text mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {actions.map((action) => (
                    <Link
                        key={action.label}
                        href={action.href}
                        className="bg-card border border-white/5 rounded-xl p-4 flex items-center gap-3 text-text hover:border-primary transition-colors"
                    >
                        <span className="text-primary">{action.icon}</span>
                        <span className="font-medium">{action.label}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}