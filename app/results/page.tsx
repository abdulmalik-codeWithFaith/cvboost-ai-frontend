import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import MatchScoreCard from "@/components/results/MatchScoreCard";
import KeywordAnalysisCard from "@/components/results/KeywordAnalysisCard";
import SuggestionsPanel from "@/components/results/SuggestionsPanel";
import CVPreviewComponent from "@/components/results/CVPreviewComponent";

const mockResults = {
    score: 87,
    jobTitle: "Senior Frontend Engineer",
    company: "TechFlow Inc.",
    presentKeywords: [
        "React", "TypeScript", "Next.js", "Tailwind CSS",
        "REST API", "Git", "Agile", "UI/UX",
    ],
    missingKeywords: [
        "GraphQL", "Jest", "AWS", "Docker", "CI/CD",
    ],
    suggestions: [
        {
            id: "1",
            type: "add" as const,
            title: "Add GraphQL experience",
            description:
                "The job description mentions GraphQL heavily. Add any relevant experience or projects using GraphQL to boost your score.",
        },
        {
            id: "2",
            type: "improve" as const,
            title: "Quantify your achievements",
            description:
                "Your experience section lacks metrics. Add numbers like 'improved performance by 40%' or 'reduced load time by 2s'.",
        },
        {
            id: "3",
            type: "add" as const,
            title: "Mention CI/CD experience",
            description:
                "The role requires CI/CD knowledge. Add your experience with GitHub Actions, Jenkins, or similar tools.",
        },
        {
            id: "4",
            type: "improve" as const,
            title: "Strengthen your summary",
            description:
                "Your professional summary is generic. Tailor it to specifically mention frontend engineering leadership and React expertise.",
        },
        {
            id: "5",
            type: "remove" as const,
            title: "Remove outdated skills",
            description:
                "jQuery and Flash are listed in your skills. These are outdated and may signal an older skill set to ATS systems.",
        },
    ],
    originalCV: `John Doe
Frontend Developer
john@email.com | LinkedIn

EXPERIENCE
Frontend Developer - StartupX (2021-2024)
- Built React applications
- Worked with REST APIs
- Used Git for version control

SKILLS
React, JavaScript, HTML, CSS, jQuery, Git`,

    optimizedCV: `John Doe
Senior Frontend Engineer
john@email.com | LinkedIn | GitHub

PROFESSIONAL SUMMARY
Results-driven Frontend Engineer with 3+ years building 
scalable React/TypeScript applications. Improved app 
performance by 40% at StartupX through code splitting 
and lazy loading optimization.

EXPERIENCE
Frontend Engineer - StartupX (2021-2024)
- Architected 12+ React/TypeScript features serving 50k+ users
- Integrated REST APIs reducing data fetch time by 35%
- Implemented CI/CD pipeline via GitHub Actions
- Led Agile ceremonies for a team of 5 engineers

SKILLS
React, TypeScript, Next.js, GraphQL, REST APIs,
Jest, Git, Docker, AWS, CI/CD, Tailwind CSS`,
};

export default function ResultsPage() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-6 md:p-10 pb-24 md:pb-10">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-on-surface">
                        Analysis Results
                    </h2>
                    <p className="text-on-surface-variant mt-1">
                        Here's how your CV performed against the job description.
                    </p>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                    <MatchScoreCard
                        score={mockResults.score}
                        jobTitle={mockResults.jobTitle}
                        company={mockResults.company}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <KeywordAnalysisCard
                            presentKeywords={mockResults.presentKeywords}
                            missingKeywords={mockResults.missingKeywords}
                        />
                        <SuggestionsPanel suggestions={mockResults.suggestions} />
                    </div>

                    <CVPreviewComponent
                        originalCV={mockResults.originalCV}
                        optimizedCV={mockResults.optimizedCV}
                    />
                </div>
            </main>
            <MobileNav />
        </div>
    );
}