import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for Template 4 - Minimal Executive
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
    },
    header: {
        borderBottom: '2 solid #000000',
        paddingBottom: 20,
        marginBottom: 20,
    },
    name: {
        fontSize: 28,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 5,
    },
    contact: {
        fontSize: 10,
        color: '#666666',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
        padding: 5,
    },
    summary: {
        fontSize: 11,
        lineHeight: 1.6,
        marginBottom: 20,
        fontStyle: 'italic',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    skillItem: {
        fontSize: 10,
        padding: '4 8',
        marginRight: 10,
        marginBottom: 5,
        backgroundColor: '#f5f5f5',
    },
    experienceItem: {
        marginBottom: 15,
    },
    companyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    jobTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    company: {
        fontSize: 12,
    },
    duration: {
        fontSize: 10,
        color: '#666666',
    },
    description: {
        fontSize: 10,
        lineHeight: 1.5,
    },
    educationItem: {
        marginBottom: 10,
        fontSize: 10,
    },
    degree: {
        fontWeight: 'bold',
    },
});

const Template4 = ({ resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.name}>{resume.name}</Text>
                <View style={styles.contact}>
                    <Text>{resume.email}</Text>
                    <Text>|</Text>
                    <Text>{resume.phone}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.summary}>{resume.summary}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Core Competencies</Text>
                <View style={styles.skillsGrid}>
                    {resume.skills.map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>
                            {skill}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
                {resume.experience.map((exp, index) => (
                    <View key={index} style={styles.experienceItem}>
                        <View style={styles.companyHeader}>
                            <Text style={styles.jobTitle}>{exp.title}</Text>
                            <Text style={styles.duration}>{exp.duration}</Text>
                        </View>
                        <Text style={styles.company}>{exp.company}</Text>
                        <Text style={styles.description}>{exp.description}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map((edu, index) => (
                    <View key={index} style={styles.educationItem}>
                        <Text style={styles.degree}>
                            {edu.degree} - {edu.institution}
                        </Text>
                        <Text>{edu.duration}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default Template4;