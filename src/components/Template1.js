import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for Template 1
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 40,
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    contact: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3498db',
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 12,
        color: '#333',
    },
    experienceItem: {
        marginBottom: 10,
    },
    educationItem: {
        marginBottom: 10,
    },
});

// Template 1 Component
const Template1 = ({ resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>{resume.name}</Text>
                <Text style={styles.contact}>Email: {resume.email} | Phone: {resume.phone}</Text>
            </View>

            {/* Summary */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.sectionContent}>{resume.summary}</Text>
            </View>

            {/* Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <Text style={styles.sectionContent}>{resume.skills.join(', ')}</Text>
            </View>

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {resume.experience.map((exp, index) => (
                    <View key={index} style={styles.experienceItem}>
                        <Text style={styles.sectionContent}>
                            <Text style={{ fontWeight: 'bold' }}>{exp.title}</Text> at {exp.company}
                        </Text>
                        <Text style={styles.sectionContent}>{exp.duration}</Text>
                        <Text style={styles.sectionContent}>{exp.description}</Text>
                    </View>
                ))}
            </View>

            {/* Education */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map((edu, index) => (
                    <View key={index} style={styles.educationItem}>
                        <Text style={styles.sectionContent}>
                            <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text> from {edu.institution}
                        </Text>
                        <Text style={styles.sectionContent}>{edu.duration}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default Template1;