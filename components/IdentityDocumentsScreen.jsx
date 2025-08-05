import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { rollNumberWalletTheme } from '../styles/globals.js';

const { width } = Dimensions.get('window');

export default function IdentityDocumentsScreen() {
  const navigation = useNavigation();

  const documents = [
    {
      id: 'aadhaar',
      title: 'Aadhaar Card',
      subtitle: 'UIDAI Identity Document',
      icon: '🆔',
      status: 'verified',
      color: rollNumberWalletTheme.documents.aadhaar,
      screen: 'Aadhaar',
    },
    {
      id: 'pan',
      title: 'PAN Card',
      subtitle: 'Income Tax Identity',
      icon: '📄',
      status: 'verified',
      color: rollNumberWalletTheme.documents.pan,
      screen: 'PAN',
    },
    {
      id: 'dl',
      title: 'Driving License',
      subtitle: 'Motor Vehicle Document',
      icon: '🚗',
      status: 'pending',
      color: rollNumberWalletTheme.documents.dl,
      screen: 'DL',
    },
    {
      id: 'passport',
      title: 'Passport',
      subtitle: 'International Travel Document',
      icon: '📘',
      status: 'notUploaded',
      color: rollNumberWalletTheme.documents.passport,
      screen: 'Passport',
    },
    {
      id: 'voterId',
      title: 'Voter ID',
      subtitle: 'Election Commission Identity',
      icon: '🗳️',
      status: 'notUploaded',
      color: rollNumberWalletTheme.documents.voterId,
      screen: 'VoterID',
    },
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'verified':
        return {
          color: rollNumberWalletTheme.status.verified,
          text: 'Verified',
          icon: '✅',
        };
      case 'pending':
        return {
          color: rollNumberWalletTheme.status.pending,
          text: 'Pending',
          icon: '⏳',
        };
      case 'rejected':
        return {
          color: rollNumberWalletTheme.status.rejected,
          text: 'Rejected',
          icon: '❌',
        };
      default:
        return {
          color: rollNumberWalletTheme.status.notUploaded,
          text: 'Not Uploaded',
          icon: '📤',
        };
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Verified</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>

        {/* Documents Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Documents</Text>
          
          <View style={styles.documentsGrid}>
            {documents.map((doc) => {
              const statusInfo = getStatusInfo(doc.status);
              
              return (
                <TouchableOpacity
                  key={doc.id}
                  style={styles.documentCard}
                  onPress={() => navigation.navigate(doc.screen)}
                >
                  <View style={[styles.documentIcon, { backgroundColor: doc.color + '20' }]}>
                    <Text style={styles.documentIconText}>{doc.icon}</Text>
                  </View>
                  
                  <View style={styles.documentContent}>
                    <Text style={styles.documentTitle}>{doc.title}</Text>
                    <Text style={styles.documentSubtitle}>{doc.subtitle}</Text>
                    
                    <View style={styles.statusContainer}>
                      <View style={[styles.statusBadge, { backgroundColor: statusInfo.color + '20' }]}>
                        <Text style={styles.statusIcon}>{statusInfo.icon}</Text>
                        <Text style={[styles.statusText, { color: statusInfo.color }]}>
                          {statusInfo.text}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>📁</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Bulk Upload</Text>
              <Text style={styles.actionSubtitle}>Upload multiple documents at once</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>🔄</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Update Documents</Text>
              <Text style={styles.actionSubtitle}>Replace expired or outdated documents</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>📤</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Share Documents</Text>
              <Text style={styles.actionSubtitle}>Create shareable links for organizations</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  documentsGrid: {
    gap: 12,
  },
  documentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentIconText: {
    fontSize: 28,
  },
  documentContent: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  documentSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  chevron: {
    fontSize: 24,
    color: '#adb5bd',
    marginLeft: 8,
  },
  actionCard: {
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
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8f4fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6c757d',
  },
});