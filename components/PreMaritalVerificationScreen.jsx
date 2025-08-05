import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PreMaritalVerificationScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>💍</Text>
        <Text style={styles.headerTitle}>Pre-Marital Verification</Text>
        <Text style={styles.headerSubtitle}>Background verification service</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Pre-Marital Verification - Coming Soon!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { alignItems: 'center', paddingVertical: 60, backgroundColor: '#FFFFFF' },
  headerIcon: { fontSize: 32, marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center' },
  content: { padding: 20, backgroundColor: '#FFFFFF', marginTop: 8, alignItems: 'center' },
  contentText: { fontSize: 16, color: '#6B7280', textAlign: 'center' },
});