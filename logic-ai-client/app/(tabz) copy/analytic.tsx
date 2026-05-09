import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const SkillZone = ({ label, color, sub, count }) => (
  <View style={styles.zoneCard}>
    <View style={[styles.zoneIndicator, { backgroundColor: color }]} />
    <View style={{ flex: 1 }}>
      <Text style={styles.zoneTitle}>{label}</Text>
      <Text style={styles.zoneSub}>{sub}</Text>
    </View>
    <Text style={styles.zoneCount}>{count} Topics</Text>
  </View>
);

export default function AnalyticsEngine() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        {/* 1. SKILL MAP HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SKILL MAP</Text>
          <Text style={styles.headerSub}>LIFETIME DOMAIN ANALYSIS</Text>
        </View>

        {/* 2. THE 4 ZONES (From your PRD) */}
        <View style={styles.section}>
          <SkillZone label="Strength Zone" color="#10B981" sub="High Accuracy & High Speed" count="12" />
          <SkillZone label="Growth Zone" color="#F59E0B" sub="Consistent but Speed is Low" count="08" />
          <SkillZone label="Risk Zone" color="#EF4444" sub="High Speed but Low Accuracy" count="05" />
          <SkillZone label="Low ROI Zone" color="#64748B" sub="High Failure • Attempt Carefully" count="03" />
        </View>

        {/* 3. MISTAKE INTELLIGENCE */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MISTAKE INTELLIGENCE</Text>
          <View style={styles.intelGrid}>
            <View style={styles.intelCard}>
               <Text style={styles.intelVal}>64%</Text>
               <Text style={styles.intelLab}>Careless Errors</Text>
               <Text style={styles.intelDesc}>Often on Easy topics</Text>
            </View>
            <View style={styles.intelCard}>
               <Text style={styles.intelVal}>22%</Text>
               <Text style={styles.intelLab}>Concept Gaps</Text>
               <Text style={styles.intelDesc}>Requires Revision Lab</Text>
            </View>
          </View>
        </View>

        {/* 4. EXAM STRATEGY ENGINE */}
        <View style={styles.section}>
          <View style={styles.strategyCard}>
            <Ionicons name="bulb" size={24} color="#FFF" />
            <View style={styles.strategyText}>
              <Text style={styles.stratTitle}>Exam Strategy Generated</Text>
              <Text style={styles.stratSub}>Priority: Attempt Reasoning first, Skip Geometry.</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingBottom: 40 },
  header: { padding: 25, paddingTop: 40 },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#1A237E', letterSpacing: 2 },
  headerSub: { fontSize: 10, fontWeight: '800', color: '#94A3B8', marginTop: 4 },

  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1.5, marginBottom: 15 },

  zoneCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 18, borderRadius: 20, marginBottom: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  zoneIndicator: { width: 12, height: 12, borderRadius: 6, marginRight: 15 },
  zoneTitle: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  zoneSub: { fontSize: 10, color: '#94A3B8', fontWeight: '600', marginTop: 2 },
  zoneCount: { fontSize: 11, fontWeight: '900', color: '#1A237E' },

  intelGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  intelCard: { width: '48%', backgroundColor: '#FFF', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#F1F5F9' },
  intelVal: { fontSize: 24, fontWeight: '900', color: '#1A237E' },
  intelLab: { fontSize: 12, fontWeight: '800', color: '#475569', marginTop: 5 },
  intelDesc: { fontSize: 9, color: '#94A3B8', fontWeight: '700', marginTop: 8 },

  strategyCard: { backgroundColor: '#1A237E', borderRadius: 24, padding: 25, flexDirection: 'row', alignItems: 'center' },
  strategyText: { marginLeft: 20, flex: 1 },
  stratTitle: { color: '#FFF', fontSize: 15, fontWeight: '900' },
  stratSub: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '700', marginTop: 4 }
});