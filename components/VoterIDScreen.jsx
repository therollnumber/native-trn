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
  Vote,
  Shield,
  CheckCircle,
  Upload,
  Eye,
  Clock,
  AlertTriangle,
} from 'lucide-react-native';
import { Input } from './ui/input.jsx';
import { Button } from './ui/button.jsx';

export default function VoterIDScreen({ onValidationComplete, context }) {
  const [verificationStep, setVerificationStep] = useState('input'); // input, verified, upload, complete
  const [voterIdNumber, setVoterIdNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedData, setVerifiedData] = useState(null);

  const isFromVerificationRequest = context?.returnTo === 'verification-requests';

  const handleVoterIdSubmit = async () => {
    if (voterIdNumber.length < 8) {
      Alert.alert('Error', 'Please enter a valid Voter ID number');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVerifiedData({
        name: 'John Doe',
        voterIdNumber: voterIdNumber.toUpperCase(),
        constituency: 'Mumbai South Central',
        assemblyConstituency: 'Worli',
        pollingStation: 'Municipal School, Worli',
        address: '123 Main Street, Mumbai, Maharashtra - 400001',
        status: 'Active',
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
    Alert.alert('Document Viewer', 'Opening Voter ID document...');
  };

  const renderInputStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Vote size={32} color="#4F7CFF" />
        <Text style={styles.stepTitle}>Enter Voter ID Details</Text>
        <Text style={styles.stepDescription}>
          Enter your Voter ID number for verification
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          label="Voter ID Number"
          placeholder="Enter your Voter ID number"
          value={voterIdNumber}
          onChangeText={(text) => setVoterIdNumber(text.toUpperCase())}
          autoCapitalize="characters"
        />
        
        <Button
          onPress={handleVoterIdSubmit}
          loading={isLoading}
          disabled={voterIdNumber.length < 8}
        >
          Verify Voter ID
        </Button>
      </View>

      <View style={styles.securityNote}>
        <Shield size={16} color="#10B981" />
        <Text style={styles.securityText}>
          Your voter data is encrypted and secure. We comply with Election Commission guidelines.
        </Text>
      </View>
    </View>
  );

  const renderVerifiedStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <CheckCircle size={32} color="#10B981" />
        <Text style={styles.stepTitle}>Voter ID Verified</Text>
        <Text style={styles.stepDescription}>
          Your Voter ID details have been successfully verified
        </Text>
      </View>

      <View style={styles.verifiedData}>
        <Text style={styles.dataTitle}>Verified Information:</Text>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Name:</Text>
          <Text style={styles.dataValue}>{verifiedData?.name}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Voter ID:</Text>
          <Text style={styles.dataValue}>{verifiedData?.voterIdNumber}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Constituency:</Text>
          <Text style={styles.dataValue}>{verifiedData?.constituency}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Assembly:</Text>
          <Text style={styles.dataValue}>{verifiedData?.assemblyConstituency}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Polling Station:</Text>
          <Text style={styles.dataValue}>{verifiedData?.pollingStation}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Address:</Text>
          <Text style={styles.dataValue}>{verifiedData?.address}</Text>
        </View>
        
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Status:</Text>
          <Text style={styles.dataValue}>{verifiedData?.status}</Text>
        </View>
      </View>

      {!isFromVerificationRequest && (
        <Button onPress={handleUploadDocument}>
          Upload Voter ID Document
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
          Please wait while we securely upload your Voter ID document...
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
        <Text style={styles.stepTitle}>Voter ID Added Successfully</Text>
        <Text style={styles.stepDescription}>
          Your Voter ID has been verified and added to your wallet
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
          Your Voter ID verification is complete and can now be shared with verified organizations.
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
        <Text style={styles.title}>Voter ID Verification</Text>
        <Text style={styles.subtitle}>
          Election Commission of India
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
            Voter ID verification requested for background check
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
    backgroundColor: '#F59E0B',
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
    backgroundColor: '#F59E0B',
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
    backgroundColor: '#F59E0B',
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
    backgroundColor: '#F59E0B',
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