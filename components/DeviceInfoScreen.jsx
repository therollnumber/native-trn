import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function DeviceInfoScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
        <Text style={styles.headerSubtitle}>Additional features and settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Device Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Device Model</Text>
              <Text style={styles.infoValue}>React Native Device</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>OS Version</Text>
              <Text style={styles.infoValue}>Android 14</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>App Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Device ID</Text>
              <Text style={styles.infoValue}>TRW-****-****-6789</Text>
            </View>
          </View>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Status</Text>
          
          <View style={styles.securityCard}>
            <View style={styles.securityItem}>
              <View style={styles.securityIndicator}>
                <Text style={styles.securityIcon}>✅</Text>
              </View>
              <View style={styles.securityContent}>
                <Text style={styles.securityTitle}>Device Encrypted</Text>
                <Text style={styles.securitySubtitle}>Your device storage is encrypted</Text>
              </View>
            </View>

            <View style={styles.securityItem}>
              <View style={styles.securityIndicator}>
                <Text style={styles.securityIcon}>✅</Text>
              </View>
              <View style={styles.securityContent}>
                <Text style={styles.securityTitle}>App Lock Enabled</Text>
                <Text style={styles.securitySubtitle}>Biometric authentication active</Text>
              </View>
            </View>

            <View style={styles.securityItem}>
              <View style={styles.securityIndicator}>
                <Text style={styles.securityIcon}>✅</Text>
              </View>
              <View style={styles.securityContent}>
                <Text style={styles.securityTitle}>Secure Connection</Text>
                <Text style={styles.securitySubtitle}>All data transmitted securely</Text>
              </View>
            </View>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>TheRollNumber Wallet</Text>
            <Text style={styles.aboutDescription}>
              Digital Identity & Credential Management Platform
            </Text>
            <Text style={styles.aboutVersion}>Version 1.0.0</Text>
            <Text style={styles.aboutCopyright}>
              © 2024 TheRollNumber. All rights reserved.
            </Text>
          </View>
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
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  securityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  securityIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  securityIcon: {
    fontSize: 20,
  },
  securityContent: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  securitySubtitle: {
    fontSize: 12,
    color: '#6c757d',
  },
  aboutCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 12,
  },
  aboutVersion: {
    fontSize: 12,
    color: '#adb5bd',
    marginBottom: 8,
  },
  aboutCopyright: {
    fontSize: 10,
    color: '#adb5bd',
    textAlign: 'center',
  },
});