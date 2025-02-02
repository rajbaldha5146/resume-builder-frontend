import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for Template 3 - Modern Professional
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: 0,
    },
    leftColumn: {
        width: '30%',
        backgroundColor: '#1a237e',
        padding: 20,
        color: '#ffffff',
    },
    rightColumn: {
        width: '70%',
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ffffff',
    },
    contact: {
        fontSize: 10,
        marginBottom: 5,
        color: '#ffffff',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ffffff',
        borderBottom: '1 solid #ffffff',
        paddingBottom: 5,
    },
    mainSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1a237e',
        borderBottom: '1 solid #1a237e',
        paddingBottom: 5,
    },
    content: {
        fontSize: 10,
        marginBottom: 10,
        lineHeight: 1.5,
    },
    rightContent: {
        fontSize: 10,
        marginBottom: 10,
        color: '#333333',
        lineHeight: 1.5,
    },
    experienceItem: {
        marginBottom: 15,
    },
    jobTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    skillItem: {
        backgroundColor: '#ffffff',
        color: '#1a237e',
        padding: '3 6',
        marginBottom: 5,
        borderRadius: 3,
        fontSize: 9,
    },
});

const Template3 = ({ resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.leftColumn}>
                <View style={styles.header}>
                    <Text style={styles.name}>{resume.name}</Text>
                    <Text style={styles.contact}>{resume.email}</Text>
                    <Text style={styles.contact}>{resume.phone}</Text>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    {resume.skills.map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>
                            {skill}
                        </Text>
                    ))}
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {resume.education.map((edu, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                            <Text style={styles.content}>{edu.degree}</Text>
                            <Text style={styles.content}>{edu.institution}</Text>
                            <Text style={styles.content}>{edu.duration}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.rightColumn}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.mainSectionTitle}>Professional Summary</Text>
                    <Text style={styles.rightContent}>{resume.summary}</Text>
                </View>

                <View>
                    <Text style={styles.mainSectionTitle}>Professional Experience</Text>
                    {resume.experience.map((exp, index) => (
                        <View key={index} style={styles.experienceItem}>
                            <Text style={styles.jobTitle}>{exp.title}</Text>
                            <Text style={styles.rightContent}>{exp.company} | {exp.duration}</Text>
                            <Text style={styles.rightContent}>{exp.description}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default Template3;