import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import the JavaScript theme configuration
import { getTheme, rollNumberWalletTheme } from '../styles/globals.js';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();
  
  // Get current theme for React Native styling
  const theme = getTheme(isDarkMode);
  const styles = createStyles(theme);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Header - exactly like the second image */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.brandContainer}>
            <View style={styles.adiLogo}>
              <Text style={styles.adiText}>ADi</Text>
            </View>
            <Text style={styles.brandText}>- Authenticated Digital Identity</Text>
          </View>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.yourDigitalId}>Your Digital ID</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Blue Welcome Card - matching second image exactly */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeHeader}>
            <View style={styles.previewBadge}>
              <Text style={styles.previewText}>Preview</Text>
            </View>
            <View style={styles.kycBadge}>
              <Text style={styles.kycText}>KYC Verified</Text>
            </View>
          </View>
          
          <Text style={styles.welcomeTitle}>Welcome back!</Text>
          
          <View style={styles.userSection}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Rahul Kumar</Text>
              <View style={styles.userIdRow}>
                <Text style={styles.userId}>ID: TRW****6789</Text>
                <Text style={styles.eyeIcon}>👁</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.verificationSection}>
            <Text style={styles.verificationLabel}>Verification Score</Text>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreText}>92%</Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '92%' }]} />
                </View>
              </View>
            </View>
            <Text style={styles.credentialStrength}>Excellent credential strength</Text>
          </View>
        </View>

        {/* Stats Row - matching the three numbers */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>125</Text>
            <Text style={styles.statLabel}>Credits Earned</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Verified</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigateToScreen('IdentityDocuments')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#E8F4FD' }]}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>🆔</Text>
                </View>
              </View>
              <Text style={styles.actionTitle}>Identity Documents</Text>
              <Text style={styles.actionSubtitle}>Manage your ID documents</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigateToScreen('ProfessionalIdentity')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#E8F5E8' }]}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>🏥</Text>
                </View>
              </View>
              <Text style={styles.actionTitle}>Professional Identity</Text>
              <Text style={styles.actionSubtitle}>Verify professional credentials</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigateToScreen('Education')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#F0E8FF' }]}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>🎓</Text>
                </View>
              </View>
              <Text style={styles.actionTitle}>Education Records</Text>
              <Text style={styles.actionSubtitle}>Academic qualifications</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigateToScreen('Employment')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#FFF0E8' }]}>
                <View style={styles.actionIcon}>
                  <Text style={styles.actionIconText}>💼</Text>
                </View>
              </View>
              <Text style={styles.actionTitle}>Employment History</Text>
              <Text style={styles.actionSubtitle}>Work experiences verification</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* List Items - matching the second image */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => navigateToScreen('VerificationRequests')}
        >
          <View style={[styles.listIconContainer, { backgroundColor: '#E3F2FD' }]}>
            <Text style={styles.listIconText}>🔒</Text>
          </View>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>Verification Requests</Text>
            <Text style={styles.listSubtitle}>2 pending requests</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => navigateToScreen('SharedWith')}
        >
          <View style={[styles.listIconContainer, { backgroundColor: '#FFF3E0' }]}>
            <Text style={styles.listIconText}>⚠️</Text>
          </View>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>Attestation</Text>
            <Text style={styles.listSubtitle}>3 employer-signed credentials</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => navigateToScreen('SharedWith')}
        >
          <View style={[styles.listIconContainer, { backgroundColor: '#E8F5E8' }]}>
            <Text style={styles.listIconText}>📤</Text>
          </View>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>Shared With</Text>
            <Text style={styles.listSubtitle}>5 organizations have access</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* More Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Services</Text>
          
          <View style={styles.moreServicesGrid}>
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => navigateToScreen('Subscription')}
            >
              <View style={[styles.serviceIconContainer, { backgroundColor: '#F3E5F5' }]}>
                <Text style={styles.serviceIconText}>👑</Text>
              </View>
              <Text style={styles.serviceTitle}>Subscription</Text>
              <Text style={styles.serviceSubtitle}>Pro Plan</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => navigateToScreen('PreMarital')}
            >
              <View style={[styles.serviceIconContainer, { backgroundColor: '#FCE4EC' }]}>
                <Text style={styles.serviceIconText}>💍</Text>
              </View>
              <Text style={styles.serviceTitle}>Pre-Marital</Text>
              <Text style={styles.serviceSubtitle}>Request check</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => navigateToScreen('FamilyManagement')}
            >
              <View style={[styles.serviceIconContainer, { backgroundColor: '#E3F2FD' }]}>
                <Text style={styles.serviceIconText}>👥</Text>
              </View>
              <Text style={styles.serviceTitle}>Add Family</Text>
              <Text style={styles.serviceSubtitle}>Share docs</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => navigateToScreen('SearchCases')}
            >
              <View style={styles.serviceIconContainer}>
                <View style={styles.notificationDot} />
                <Text style={styles.serviceIconText}>🔍</Text>
              </View>
              <Text style={styles.serviceTitle}>Search Cases</Text>
              <Text style={styles.serviceSubtitle}>Track status</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Create React Native StyleSheet - matching the exact design from second image
function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    
    // Header matching the second image
    header: {
      backgroundColor: '#ffffff',
      paddingTop: 40,
      paddingHorizontal: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    brandContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    adiLogo: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: rollNumberWalletTheme.gradient.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    adiText: {
      color: '#ffffff',
      fontSize: 11,
      fontWeight: '600',
    },
    brandText: {
      fontSize: 13,
      color: '#6c757d',
    },
    viewButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    viewButtonText: {
      fontSize: 14,
      color: '#495057',
    },
    yourDigitalId: {
      fontSize: 18,
      fontWeight: '500',
      color: '#212529',
    },

    // Content
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },

    // Blue Welcome Card - exactly matching second image
    welcomeCard: {
      backgroundColor: '#4A90E2', // Blue gradient-like color
      borderRadius: 16,
      padding: 20,
      marginTop: 16,
      marginBottom: 16,
    },
    welcomeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    previewBadge: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    previewText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: '500',
    },
    kycBadge: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    kycText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: '500',
    },
    welcomeTitle: {
      color: '#ffffff',
      fontSize: 28,
      fontWeight: '600',
      marginBottom: 20,
    },
    userSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 4,
    },
    userIdRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userId: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 14,
      marginRight: 6,
    },
    eyeIcon: {
      fontSize: 16,
    },
    verificationSection: {},
    verificationLabel: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 14,
      marginBottom: 8,
    },
    scoreRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    scoreText: {
      color: '#ffffff',
      fontSize: 36,
      fontWeight: '700',
      marginRight: 16,
    },
    progressBarContainer: {
      flex: 1,
    },
    progressBar: {
      height: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 4,
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#ffffff',
      borderRadius: 4,
    },
    credentialStrength: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 14,
    },

    // Stats Card
    statsCard: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 24,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statDivider: {
      width: 1,
      height: 40,
      backgroundColor: '#f0f0f0',
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
      textAlign: 'center',
    },

    // Sections
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#212529',
      marginBottom: 16,
    },

    // Quick Actions Grid
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    quickActionCard: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      width: (width - 52) / 2,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    actionIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    actionIcon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionIconText: {
      fontSize: 24,
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
      lineHeight: 16,
    },

    // List Items
    listItem: {
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
    listIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    listIconText: {
      fontSize: 20,
    },
    listContent: {
      flex: 1,
    },
    listTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#212529',
      marginBottom: 4,
    },
    listSubtitle: {
      fontSize: 14,
      color: '#6c757d',
    },
    chevron: {
      fontSize: 20,
      color: '#adb5bd',
    },

    // More Services Grid
    moreServicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    serviceCard: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      width: (width - 52) / 2,
      alignItems: 'center',
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    serviceIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#f8f9fa',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
      position: 'relative',
    },
    serviceIconText: {
      fontSize: 24,
    },
    notificationDot: {
      position: 'absolute',
      top: 4,
      right: 4,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#28a745',
    },
    serviceTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#212529',
      marginBottom: 2,
      textAlign: 'center',
    },
    serviceSubtitle: {
      fontSize: 12,
      color: '#6c757d',
      textAlign: 'center',
    },
  });
}