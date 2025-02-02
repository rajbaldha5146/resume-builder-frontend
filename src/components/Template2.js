import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for Template 2
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 40,
        backgroundColor: '#f4f4f9',
    },
    header: {
        marginBottom: 20,
        borderBottom: '2px solid #2c3e50',
        paddingBottom: 10,
    },
    name: {
        fontSize: 28,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
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

// Template 2 Component
const Template2 = ({ resume }) => (
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

export default Template2;