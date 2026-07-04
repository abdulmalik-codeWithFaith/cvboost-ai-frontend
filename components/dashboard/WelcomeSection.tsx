interface WelcomeSectionProps {
    userName: string;
}

export default function WelcomeSection({ userName }: WelcomeSectionProps) {
    return (
        <div>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
                Good morning, {userName} 👋
            </h2>
            <p className="text-on-surface-variant mt-1">
                Your CV optimization hub. Ready to land your next role?
            </p>
        </div>
    );
}