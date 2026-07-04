interface WelcomeSectionProps {
    userName: string;
}

export default function WelcomeSection({ userName }: WelcomeSectionProps) {
    return (
<<<<<<< HEAD
        <div>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
                Good morning, {userName} 👋
            </h2>
            <p className="text-on-surface-variant mt-1">
                Your CV optimization hub. Ready to land your next role?
            </p>
        </div>
=======
        <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text">
                Welcome back, {userName} 👋
            </h1>
            <p className="mt-2 text-text/70">
                Here&apos;s what&apos;s happening with your CV optimizations.
            </p>
        </section>
>>>>>>> 2fb61ef3a092a06e240d924a1c893b64aa0fe816
    );
}