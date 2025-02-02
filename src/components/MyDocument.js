import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
});

// PDF Template Component
const MyDocument = ({ resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Personal Information */}
            <View style={styles.section}>
                <Text style={styles.title}>{resume.name}</Text>
                <Text style={styles.text}>Email: {resume.email}</Text>
                <Text style={styles.text}>Phone: {resume.phone}</Text>
            </View>

            {/* Summary */}
            <View style={styles.section}>
                <Text style={styles.subtitle}>Summary</Text>
                <Text style={styles.text}>{resume.summary}</Text>
            </View>

            {/* Skills */}
            <View style={styles.section}>
                <Text style={styles.subtitle}>Skills</Text>
                <Text style={styles.text}>{resume.skills.join(', ')}</Text>
            </View>

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.subtitle}>Experience</Text>
                {resume.experience.map((exp, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={styles.text}>{exp.title} at {exp.company}</Text>
                        <Text style={styles.text}>{exp.duration}</Text>
                        <Text style={styles.text}>{exp.description}</Text>
                    </View>
                ))}
            </View>

            {/* Education */}
            <View style={styles.section}>
                <Text style={styles.subtitle}>Education</Text>
                {resume.education.map((edu, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={styles.text}>{edu.degree} from {edu.institution}</Text>
                        <Text style={styles.text}>{edu.duration}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default MyDocument;