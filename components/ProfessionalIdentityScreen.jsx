import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  FileText,
  Stethoscope,
  Heart,
  Calculator,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from 'lucide-react-native';

export function ProfessionalIdentityScreen({ onNavigate }) {
  const professions = [
    {
      id: 'doctor',
      title: 'Doctor License',
      subtitle: 'Medical Council of India',
      description: 'MBBS, MD, MS, and other medical degrees',
      icon: Stethoscope,
      verified: false,
      lastUpdated: null,
      color: '#10B981',
    },
    {
      id: 'nurse',
      title: 'Nurse License',
      subtitle: 'Indian Nursing Council',
      description: 'Registered nurse certification',
      icon: Heart,
      verified: false,
      lastUpdated: null,
      color: '#EF4444',
    },
    {
      id: 'icai',
      title: 'CA Certificate',
      subtitle: 'Institute of Chartered Accountants',
      description: 'Chartered Accountant membership',
      icon: Calculator,
      verified: false,
      lastUpdated: null,
      color: '#8B5CF6',
    },
  ];

  const stats = {
    total: professions.length,
    verified: professions.filter(prof => prof.verified).length,
    pending: professions.filter(prof => !prof.verified).length,
  };

  const renderProfession = (profession) => {
    const IconComponent = profession.icon;
    return (
      <TouchableOpacity
        key={profession.id}
        style={styles.professionCard}
        onPress={() => onNavigate(profession.id)}
        activeOpacity={0.7}
      >
        <View style={styles.professionHeader}>
          <View style={[styles.professionIcon, { backgroundColor: profession.color + '20' }]}>
            <IconComponent size={24} color={profession.color} />
          </View>
          <View style={styles.professionInfo}>
            <Text style={styles.professionTitle}>{profession.title}</Text>
            <Text style={styles.professionSubtitle}>{profession.subtitle}</Text>
            <Text style={styles.professionDescription}>{profession.description}</Text>
          </View>
          <View style={styles.professionStatus}>
            {profession.verified ? (
              <CheckCircle size={20} color="#10B981" />
            ) : (
              <AlertCircle size={20} color="#F59E0B" />
            )}
          </View>
        </View>

        <View style={styles.professionFooter}>
          <View style={styles.statusInfo}>
            <Text style={[
              styles.statusText,
              { color: profession.verified ? '#10B981' : '#F59E0B' }
            ]}>
              {profession.verified ? 'Verified' : 'Not Verified'}
            </Text>
            {profession.lastUpdated && (
              <Text style={styles.lastUpdated}>
                Updated: {profession.lastUpdated}
              </Text>
            )}
          </View>
          <ChevronRight size={16} color="#6B7280" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Professional Identity</Text>
        <Text style={styles.subtitle}>
          Manage and verify your professional licenses and certifications
        </Text>
      </View>

      {/* Statistics */}
      <View style={styles.section}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Licenses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#10B981' }]}>{stats.verified}</Text>
            <Text style={styles.statLabel}>Verified</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#F59E0B' }]}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.section}>
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>How to verify professional licenses:</Text>
          <Text style={styles.instructionStep}>
            1. Tap on the license you want to verify below
          </Text>
          <Text style={styles.instructionStep}>
            2. Enter your license/registration number
          </Text>
          <Text style={styles.instructionStep}>
            3. Provide additional verification details as required
          </Text>
          <Text style={styles.instructionStep}>
            4. Upload supporting documents when prompted
          </Text>
          <Text style={styles.instructionStep}>
            5. Wait for verification from the issuing authority
          </Text>
        </View>
      </View>

      {/* Professions List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Professional Licenses</Text>
        <View style={styles.professionsGrid}>
          {professions.map(renderProfession)}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
            <CheckCircle size={20} color="#10B981" />
            <Text style={styles.actionText}>Verify All Licenses</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
            <FileText size={20} color="#4F7CFF" />
            <Text style={styles.actionText}>Download Certificates</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Security Notice */}
      <View style={styles.section}>
        <View style={styles.securityNotice}>
          <View style={styles.securityIcon}>
            <AlertCircle size={20} color="#F59E0B" />
          </View>
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>Professional Verification Notice</Text>
            <Text style={styles.securityDescription}>
              Your professional credentials are verified directly with the issuing authorities. 
              Only verified healthcare organizations and employers can request access to your 
              professional identity information with your explicit consent.
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Padding */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#4F7CFF',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  instructionsCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    padding: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 12,
  },
  instructionStep: {
    fontSize: 14,
    color: '#1E40AF',
    marginBottom: 8,
    lineHeight: 20,
  },
  professionsGrid: {
    gap: 12,
  },
  professionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  professionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  professionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  professionInfo: {
    flex: 1,
  },
  professionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  professionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  professionDescription: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  professionStatus: {
    marginLeft: 8,
  },
  professionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  securityNotice: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 16,
    flexDirection: 'row',
  },
  securityIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  securityText: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },
  bottomPadding: {
    height: 20,
  },
});