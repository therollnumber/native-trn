import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Calculator,
  Shield,
  CheckCircle,
  Upload,
  Eye,
  AlertTriangle,
} from 'lucide-react-native';
import { Input } from './ui/input.jsx';
import { Button } from './ui/button.jsx';

export default function ICAIScreen({ onValidationComplete, context }) {
  const [verificationStep, setVerificationStep] = useState('input'); // input, verified, upload, complete
  const [membershipNumber, setMembershipNumber] = useState('');
  const [yearOfMembership, setYearOfMembership] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedData, setVerifiedData] = useState(null);

  const isFromVerificationRequest = context?.returnTo === 'verification-requests';

  const handleICAISubmit = async () => {
    if (membershipNumber.length < 6) {
      Alert.alert('Error', 'Please enter a valid membership number');
      return;
    }

    if (!yearOfMembership || yearOfMembership.length !== 4) {
      Alert.alert('Error', 'Please enter a valid year of membership');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVerifiedData({
        name: 'CA John Doe',
        membershipNumber: membershipNumber.toUpperCase(),
        yearOfMembership: yearOfMembership,
        qualification: 'Chartered Accountant (CA)',
        institute: 'Institute of Chartered Accountants of India',
        validity: 'Lifetime Valid',
        specialization: 'Taxation & Audit',
        firmAffiliation: 'John Doe & Associates',
        status: 'Active',
        cpeCertificate: 'Up to Date',
      });
      setIsLoading(false);
      setVerificationStep('verified');
    }, 2000);
  };

  const handleUploadDocument = () => {
    setVerificationStep('upload');
    // Simulate upload process
    setTimeout(() => {
      setVerificationStep('complete');
      if (onValidationComplete) {
        onValidationComplete();
      }
    }, 2000);
  };

  const handleViewDocument = () => {
    Alert.alert('Document Viewer', 'Opening CA Certificate document...');
  };

  const renderInputStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Calculator size={32} color="#4F7CFF" />
        <Text style={styles.stepTitle}>Enter CA Certificate Details</Text>
        <Text style={styles.stepDescription}>
          Enter your ICAI membership number and year of membership
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          label="ICAI Membership Number"
          placeholder="Enter your membership number"
          value={membershipNumber}
          onChangeText={(text) => setMembershipNumber(text.toUpperCase())}
          autoCapitalize="characters"
        />
        
        <Input
          label="Year of Membership"
          placeholder="YYYY"
          value={yearOfMembership}
          onChangeText={setYearOfMembership}
          keyboardType="numeric"
          maxLength={4}
        />
        
        <Button
          onPress={handleICAISubmit}
          loading={isLoading}
          disabled={membershipNumber.length < 6 || yearOfMembership.length !== 4}
        >
          Verify CA Certificate
        </Button>
      </View>

      <View style={styles.securityNote}>
        <Shield size={16} color="#10B981" />
        <Text style={styles.securityText}>
          Your ICAI membership data is encrypted and secure. We verify directly with ICAI.
        </Text>
      </View>
    </View>
  );

  const renderVerifiedStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <CheckCircle size={32} color="#10B981" />
        <Text style={styles.stepTitle}>CA Certificate Verified</Text>
        <Text style={styles.stepDescription}>
          Your CA certificate has been successfully verified
        </Text>
      </View>

      <View style={styles.verifiedData}>
        <Text style={styles.dataTitle}>Verified Information:</Text>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Name:</Text>
          <Text style={styles.dataValue}>{verifiedData?.name}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Membership No:</Text>
          <Text style={styles.dataValue}>{verifiedData?.membershipNumber}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Year of Membership:</Text>
          <Text style={styles.dataValue}>{verifiedData?.yearOfMembership}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Qualification:</Text>
          <Text style={styles.dataValue}>{verifiedData?.qualification}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Institute:</Text>
          <Text style={styles.dataValue}>{verifiedData?.institute}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Validity:</Text>
          <Text style={styles.dataValue}>{verifiedData?.validity}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Specialization:</Text>
          <Text style={styles.dataValue}>{verifiedData?.specialization}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Firm:</Text>
          <Text style={styles.dataValue}>{verifiedData?.firmAffiliation}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Status:</Text>
          <Text style={styles.dataValue}>{verifiedData?.status}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>CPE Certificate:</Text>
          <Text style={styles.dataValue}>{verifiedData?.cpeCertificate}</Text>
        </View>
      </View>

      {!isFromVerificationRequest && (
        <Button onPress={handleUploadDocument}>
          Upload CA Certificate Document
        </Button>
      )}
    </View>
  );

  const renderUploadStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Upload size={32} color="#4F7CFF" />
        <Text style={styles.stepTitle}>Uploading Document</Text>
        <Text style={styles.stepDescription}>
          Please wait while we securely upload your CA certificate document...
        </Text>
      </View>

      <View style={styles.uploadProgress}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.progressText}>Uploading... 75%</Text>
      </View>
    </View>
  );

  const renderCompleteStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <CheckCircle size={32} color="#10B981" />
        <Text style={styles.stepTitle}>CA Certificate Added Successfully</Text>
        <Text style={styles.stepDescription}>
          Your CA certificate has been verified and added to your wallet
        </Text>
      </View>

      <View style={styles.completedActions}>
        <Button
          onPress={handleViewDocument}
          variant="outline"
        >
          <Eye size={16} color="#4F7CFF" />
          <Text style={styles.buttonText}>View Document</Text>
        </Button>
      </View>

      <View style={styles.successNote}>
        <CheckCircle size={16} color="#10B981" />
        <Text style={styles.successText}>
          Your CA certificate verification is complete and can now be shared with verified organizations.
        </Text>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (verificationStep) {
      case 'input':
        return renderInputStep();
      case 'verified':
        return renderVerifiedStep();
      case 'upload':
        return renderUploadStep();
      case 'complete':
        return renderCompleteStep();
      default:
        return renderInputStep();
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>CA Certificate Verification</Text>
        <Text style={styles.subtitle}>
          Institute of Chartered Accountants of India
        </Text>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressSteps}>
          <View style={[styles.progressStep, verificationStep !== 'input' && styles.progressStepCompleted]}>
            <Text style={[styles.progressStepText, verificationStep !== 'input' && styles.progressStepTextCompleted]}>1</Text>
          </View>
          <View style={[styles.progressLine, verificationStep === 'verified' || verificationStep === 'upload' || verificationStep === 'complete' ? styles.progressLineCompleted : null]} />
          <View style={[styles.progressStep, (verificationStep === 'verified' || verificationStep === 'upload' || verificationStep === 'complete') && styles.progressStepCompleted]}>
            <Text style={[styles.progressStepText, (verificationStep === 'verified' || verificationStep === 'upload' || verificationStep === 'complete') && styles.progressStepTextCompleted]}>2</Text>
          </View>
          <View style={[styles.progressLine, verificationStep === 'complete' ? styles.progressLineCompleted : null]} />
          <View style={[styles.progressStep, verificationStep === 'complete' && styles.progressStepCompleted]}>
            <Text style={[styles.progressStepText, verificationStep === 'complete' && styles.progressStepTextCompleted]}>3</Text>
          </View>
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Verify</Text>
          <Text style={styles.progressLabel}>Upload</Text>
          <Text style={styles.progressLabel}>Complete</Text>
        </View>
      </View>

      {/* Context Message */}
      {isFromVerificationRequest && (
        <View style={styles.contextMessage}>
          <AlertTriangle size={16} color="#F59E0B" />
          <Text style={styles.contextText}>
            CA certificate verification requested for professional verification
          </Text>
        </View>
      )}

      {/* Main Content */}
      {renderCurrentStep()}

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
    backgroundColor: '#8B5CF6',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  progressStep: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStepCompleted: {
    backgroundColor: '#8B5CF6',
  },
  progressStepText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  progressStepTextCompleted: {
    color: '#ffffff',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  progressLineCompleted: {
    backgroundColor: '#8B5CF6',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    flex: 1,
  },
  contextMessage: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contextText: {
    fontSize: 14,
    color: '#92400E',
    flex: 1,
  },
  stepContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 24,
    gap: 16,
  },
  securityNote: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  securityText: {
    fontSize: 13,
    color: '#166534',
    flex: 1,
    lineHeight: 18,
  },
  verifiedData: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dataLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    flex: 2,
    textAlign: 'right',
  },
  uploadProgress: {
    alignItems: 'center',
    marginVertical: 32,
  },
  progressBar: {
    width: 200,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
  },
  completedActions: {
    marginBottom: 24,
  },
  buttonText: {
    marginLeft: 8,
  },
  successNote: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  successText: {
    fontSize: 13,
    color: '#166534',
    flex: 1,
    lineHeight: 18,
  },
  bottomPadding: {
    height: 20,
  },
});