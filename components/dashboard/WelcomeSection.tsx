interface WelcomeSectionProps {
    userName: string;
}

export default function WelcomeSection({ userName }: WelcomeSectionProps) {
    return (
        <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-text">
                Welcome back, {userName} 👋
            </h1>
            <p className="mt-2 text-text/70">
                Here&apos;s what&apos;s happening with your CV optimizations.
            </p>
        </section>
    );
}