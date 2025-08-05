import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { rollNumberWalletTheme } from '../styles/globals.js';

export default function ShareScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Share</Text>
        <Text style={styles.headerSubtitle}>Manage document sharing</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Shared Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Currently Shared</Text>
          
          <View style={styles.shareItem}>
            <View style={styles.shareIconContainer}>
              <Text style={styles.shareIcon}>🏦</Text>
            </View>
            <View style={styles.shareContent}>
              <Text style={styles.shareTitle}>HDFC Bank</Text>
              <Text style={styles.shareSubtitle}>Aadhaar, PAN • Expires in 30 days</Text>
            </View>
            <TouchableOpacity style={styles.revokeButton}>
              <Text style={styles.revokeButtonText}>Revoke</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.shareItem}>
            <View style={styles.shareIconContainer}>
              <Text style={styles.shareIcon}>🏢</Text>
            </View>
            <View style={styles.shareContent}>
              <Text style={styles.shareTitle}>TCS Ltd</Text>
              <Text style={styles.shareSubtitle}>Educational Records • Expires in 45 days</Text>
            </View>
            <TouchableOpacity style={styles.revokeButton}>
              <Text style={styles.revokeButtonText}>Revoke</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.shareItem}>
            <View style={styles.shareIconContainer}>
              <Text style={styles.shareIcon}>🔍</Text>
            </View>
            <View style={styles.shareContent}>
              <Text style={styles.shareTitle}>FirstAdvantage BGV</Text>
              <Text style={styles.shareSubtitle}>All Documents • Expires in 7 days</Text>
            </View>
            <TouchableOpacity style={styles.revokeButton}>
              <Text style={styles.revokeButtonText}>Revoke</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Share */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Share</Text>
          
          <TouchableOpacity style={styles.quickShareCard}>
            <View style={styles.quickShareIcon}>
              <Text style={styles.quickShareIconText}>📱</Text>
            </View>
            <Text style={styles.quickShareTitle}>Generate QR Code</Text>
            <Text style={styles.quickShareSubtitle}>Share documents quickly</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickShareCard}>
            <View style={styles.quickShareIcon}>
              <Text style={styles.quickShareIconText}>🔗</Text>
            </View>
            <Text style={styles.quickShareTitle}>Create Share Link</Text>
            <Text style={styles.quickShareSubtitle}>Send via email or message</Text>
          </TouchableOpacity>
        </View>

        {/* Share History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.historyItem}>
            <View style={styles.historyIconContainer}>
              <Text style={styles.historyIcon}>✅</Text>
            </View>
            <View style={styles.historyContent}>
              <Text style={styles.historyTitle}>Shared with SBI Bank</Text>
              <Text style={styles.historySubtitle}>2 hours ago • PAN Card</Text>
            </View>
          </View>

          <View style={styles.historyItem}>
            <View style={styles.historyIconContainer}>
              <Text style={styles.historyIcon}>❌</Text>
            </View>
            <View style={styles.historyContent}>
              <Text style={styles.historyTitle}>Revoked access from Flipkart</Text>
              <Text style={styles.historySubtitle}>1 day ago • Employment Records</Text>
            </View>
          </View>

          <View style={styles.historyItem}>
            <View style={styles.historyIconContainer}>
              <Text style={styles.historyIcon}>✅</Text>
            </View>
            <View style={styles.historyContent}>
              <Text style={styles.historyTitle}>Shared with Accenture</Text>
              <Text style={styles.historySubtitle}>3 days ago • All Documents</Text>
            </View>
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
  shareItem: {
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
  shareIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shareIcon: {
    fontSize: 24,
  },
  shareContent: {
    flex: 1,
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  shareSubtitle: {
    fontSize: 12,
    color: '#6c757d',
  },
  revokeButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  revokeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  quickShareCard: {
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
  quickShareIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: rollNumberWalletTheme.gradient.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickShareIconText: {
    fontSize: 28,
  },
  quickShareTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  quickShareSubtitle: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
  historyItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  historyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyIcon: {
    fontSize: 20,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 4,
  },
  historySubtitle: {
    fontSize: 12,
    color: '#6c757d',
  },
});