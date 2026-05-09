
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HubTile = ({ title, icon, color, sub }) => (
  <TouchableOpacity style={styles.hubTile}>
    <View style={[styles.tileIconBg, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.tileTitle}>{title}</Text>
    <Text style={styles.tileSub}>{sub}</Text>
  </TouchableOpacity>
);

export default function SystemsHub() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SYSTEMS HUB</Text>
          <Text style={styles.headerSub}>GLOBAL OPERATIONAL DIRECTORY</Text>
        </View>

        {/* 1. LEARNING MODULES */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LEARNING & ADAPTATION</Text>
          <View style={styles.hubGrid}>
            <HubTile title="Revision Lab" icon="library-outline" color="#6366F1" sub="Flashcards & Recall" />
            <HubTile title="Study Planner" icon="calendar-outline" color="#F59E0B" sub="Adaptive Schedule" />
            <HubTile title="Diagnostic" icon="pulse-outline" color="#10B981" sub="Reset AI Baseline" />
            <HubTile title="Battle Logs" icon="shield-outline" color="#EF4444" sub="Combat History" />
          </View>
        </View>

        {/* 2. SYSTEM CONFIGURATION */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CORE CONFIGURATION</Text>
          <View style={styles.configList}>
            <TouchableOpacity style={styles.configItem}>
              <Ionicons name="finger-print-outline" size={20} color="#1A237E" />
              <Text style={styles.configText}>Biometric Security (FaceLock)</Text>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.configItem}>
              <Ionicons name="notifications-outline" size={20} color="#1A237E" />
              <Text style={styles.configText}>Operational Alerts</Text>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.configItem, { borderBottomWidth: 0 }]}>
              <Ionicons name="cloud-download-outline" size={20} color="#1A237E" />
              <Text style={styles.configText}>Export Lifetime Reports</Text>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.versionInfo}>Protocol SF-26 • Build 1.0.92</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F9' },
  scroll: { paddingBottom: 40 },
  header: { padding: 25, paddingTop: 30 },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#1A237E', letterSpacing: 2 },
  headerSub: { fontSize: 9, fontWeight: '800', color: '#94A3B8', marginTop: 4 },

  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1.5, marginBottom: 15 },

  hubGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  hubTile: { 
    backgroundColor: '#FFF', width: '48%', borderRadius: 24, padding: 20, 
    marginBottom: 15, elevation: 4, shadowColor: '#1A237E', shadowOpacity: 0.1 
  },
  tileIconBg: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  tileTitle: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  tileSub: { fontSize: 9, color: '#94A3B8', fontWeight: '700', marginTop: 4 },

  configList: { backgroundColor: '#FFF', borderRadius: 24, paddingHorizontal: 20, elevation: 2 },
  configItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  configText: { flex: 1, marginLeft: 15, fontSize: 14, fontWeight: '700', color: '#1E293B' },
  versionInfo: { textAlign: 'center', fontSize: 9, color: '#CBD5E1', fontWeight: '800', marginTop: 40 }
});