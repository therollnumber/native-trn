import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Service & Help</Text>
        <Text style={styles.headerSubtitle}>Get support and find answers</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Help</Text>
          
          <TouchableOpacity style={styles.helpCard}>
            <View style={styles.helpIcon}>
              <Text style={styles.helpIconText}>📋</Text>
            </View>
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Getting Started Guide</Text>
              <Text style={styles.helpSubtitle}>Learn how to use TheRollNumber Wallet</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpCard}>
            <View style={styles.helpIcon}>
              <Text style={styles.helpIconText}>🔐</Text>
            </View>
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Document Verification</Text>
              <Text style={styles.helpSubtitle}>How to verify your documents</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpCard}>
            <View style={styles.helpIcon}>
              <Text style={styles.helpIconText}>📤</Text>
            </View>
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Sharing Documents</Text>
              <Text style={styles.helpSubtitle}>Safe sharing practices</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How secure is my data?</Text>
            <Text style={styles.faqAnswer}>Your data is encrypted and stored securely. We follow industry-standard security practices.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How long does verification take?</Text>
            <Text style={styles.faqAnswer}>Most documents are verified within 24-48 hours. Professional credentials may take longer.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I revoke document access?</Text>
            <Text style={styles.faqAnswer}>Yes, you can revoke access to any organization at any time from the Share section.</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          
          <TouchableOpacity style={styles.contactCard}>
            <Text style={styles.contactIcon}>💬</Text>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactSubtitle}>Available 24/7</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard}>
            <Text style={styles.contactIcon}>📧</Text>
            <Text style={styles.contactTitle}>Email Support</Text>
            <Text style={styles.contactSubtitle}>support@therollnumber.com</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactTitle}>Phone Support</Text>
            <Text style={styles.contactSubtitle}>+91 80000 12345</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  helpCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  helpIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8f4fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  helpIconText: {
    fontSize: 24,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  helpSubtitle: {
    fontSize: 12,
    color: '#6c757d',
  },
  chevron: {
    fontSize: 20,
    color: '#adb5bd',
  },
  faqItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
});