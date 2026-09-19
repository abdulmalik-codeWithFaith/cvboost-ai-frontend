import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export interface ResumeExperience {
    role: string;
    company: string;
    dates: string;
    bullets: string[];
}

export interface ResumeEducation {
    degree: string;
    school: string;
    dates: string;
}

export interface ResumeData {
    fullName: string;
    title: string;
    contact: string;
    summary: string;
    skills: string[];
    experience: ResumeExperience[];
    education: ResumeEducation[];
}

const styles = StyleSheet.create({
    page: { padding: 40, fontSize: 10.5, fontFamily: "Helvetica", color: "#1a1a1a" },
    name: { fontSize: 22, fontFamily: "Helvetica-Bold", marginBottom: 2 },
    title: { fontSize: 12, color: "#444444", marginBottom: 6 },
    contact: { fontSize: 9, color: "#555555", marginBottom: 14 },
    sectionTitle: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginTop: 14,
        marginBottom: 6,
        borderBottom: "1px solid #cccccc",
        paddingBottom: 3,
    },
    summary: { lineHeight: 1.5 },
    skillsRow: { flexDirection: "row", flexWrap: "wrap" },
    skillPill: {
        fontSize: 9,
        backgroundColor: "#f0f0f0",
        borderRadius: 3,
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginRight: 4,
        marginBottom: 4,
    },
    expBlock: { marginBottom: 10 },
    expHeaderRow: { flexDirection: "row", justifyContent: "space-between" },
    role: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
    company: { fontSize: 10, color: "#333333" },
    dates: { fontSize: 9, color: "#666666" },
    bullet: { flexDirection: "row", marginTop: 3 },
    bulletDot: { width: 10 },
    bulletText: { flex: 1, lineHeight: 1.4 },
    eduBlock: { marginBottom: 6 },
});

export function ResumeDocument({ resume }: { resume: ResumeData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.name}>{resume.fullName}</Text>
                {resume.title ? <Text style={styles.title}>{resume.title}</Text> : null}
                {resume.contact ? <Text style={styles.contact}>{resume.contact}</Text> : null}

                {resume.summary ? (
                    <>
                        <Text style={styles.sectionTitle}>Summary</Text>
                        <Text style={styles.summary}>{resume.summary}</Text>
                    </>
                ) : null}

                {resume.skills?.length ? (
                    <>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.skillsRow}>
                            {resume.skills.map((skill, i) => (
                                <Text key={i} style={styles.skillPill}>
                                    {skill}
                                </Text>
                            ))}
                        </View>
                    </>
                ) : null}

                {resume.experience?.length ? (
                    <>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {resume.experience.map((exp, i) => (
                            <View key={i} style={styles.expBlock} wrap={false}>
                                <View style={styles.expHeaderRow}>
                                    <Text style={styles.role}>
                                        {exp.role} — {exp.company}
                                    </Text>
                                    <Text style={styles.dates}>{exp.dates}</Text>
                                </View>
                                {exp.bullets.map((b, j) => (
                                    <View key={j} style={styles.bullet}>
                                        <Text style={styles.bulletDot}>•</Text>
                                        <Text style={styles.bulletText}>{b}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </>
                ) : null}

                {resume.education?.length ? (
                    <>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {resume.education.map((edu, i) => (
                            <View key={i} style={styles.eduBlock}>
                                <Text style={styles.role}>{edu.degree}</Text>
                                <Text style={styles.company}>
                                    {edu.school} · {edu.dates}
                                </Text>
                            </View>
                        ))}
                    </>
                ) : null}
            </Page>
        </Document>
    );
}