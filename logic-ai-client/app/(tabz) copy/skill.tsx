import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function EnhancedHome() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        {/* 1. NEURAL STATUS HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.systemStatus}>NEURAL_LINK: ACTIVE</Text>
            <Text style={styles.username}>Operative Kanha</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>LVL 42</Text>
          </View>
        </View>

        {/* 2. DYNAMIC SKILL RADAR (Pure View Visualization) */}
        <View style={styles.section}>
          <View style={styles.radarCard}>
            <Text style={styles.radarLabel}>CURRENT SKILL GEOMETRY</Text>
            <View style={styles.radarContainer}>
              {/* Visualizing the 4-Zones from your PRD */}
              <View style={[styles.radarSpoke, { height: 80, backgroundColor: '#10B981' }]}><Text style={styles.spokeLab}>ACC</Text></View>
              <View style={[styles.radarSpoke, { height: 60, backgroundColor: '#6366F1' }]}><Text style={styles.spokeLab}>SPD</Text></View>
              <View style={[styles.radarSpoke, { height: 40, backgroundColor: '#F59E0B' }]}><Text style={styles.spokeLab}>MEM</Text></View>
              <View style={[styles.radarSpoke, { height: 90, backgroundColor: '#1A237E' }]}><Text style={styles.spokeLab}>STR</Text></View>
            </View>
            <Text style={styles.radarInsight}>AI Insight: Memory retention is dipping in 'Odisha GK'.</Text>
          </View>
        </View>

        {/* 3. TACTICAL MISSIONS (The "Not Bored" Layer) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACTIVE MISSIONS</Text>
          
          <TouchableOpacity style={styles.missionItem}>
            <View style={[styles.missionIcon, { backgroundColor: '#EEF2FF' }]}>
              <Ionicons name="skull" size={20} color="#6366F1" />
            </View>
            <View style={styles.missionInfo}>
              <Text style={styles.missionTitle}>Weakness Decimation</Text>
              <Text style={styles.missionSub}>Target: Arithmetic Careless Errors</Text>
            </View>
            <View style={styles.xpTag}><Text style={styles.xpText}>+120 XP</Text></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.missionItem}>
            <View style={[styles.missionIcon, { backgroundColor: '#FFF7ED' }]}>
              <Ionicons name="shield-checkmark" size={20} color="#F59E0B" />
            </View>
            <View style={styles.missionInfo}>
              <Text style={styles.missionTitle}>Revision Protocol</Text>
              <Text style={styles.missionSub}>5 Flashcards due for review</Text>
            </View>
            <View style={styles.xpTag}><Text style={styles.xpText}>+50 XP</Text></View>
          </TouchableOpacity>
        </View>

        {/* 4. 30-DAY STRIKE HEATMAP */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CONSISTENCY MATRIX (30 DAYS)</Text>
          <View style={styles.heatmap}>
            {Array.from({ length: 30 }).map((_, i) => (
              <View 
                key={i} 
                style={[
                  styles.heatSquare, 
                  { backgroundColor: i < 18 ? '#1A237E' : '#E2E8F0', opacity: i < 18 ? 1 - (i*0.02) : 1 }
                ]} 
              />
            ))}
          </View>
          <View style={styles.streakFooter}>
            <Ionicons name="flame" size={14} color="#F59E0B" />
            <Text style={styles.streakText}>18 DAY OPERATIONAL STREAK</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F9' },
  scroll: { paddingBottom: 40 },
  
  header: { padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  systemStatus: { fontSize: 9, fontWeight: '900', color: '#10B981', letterSpacing: 1.5 },
  username: { fontSize: 22, fontWeight: '900', color: '#1A237E', marginTop: 4 },
  levelBadge: { backgroundColor: '#1A237E', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  levelText: { color: '#FFF', fontSize: 10, fontWeight: '900' },

  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 2, marginBottom: 15 },

  // Radar Card
  radarCard: { backgroundColor: '#FFF', borderRadius: 28, padding: 20, elevation: 4, borderWidth: 1, borderColor: '#F1F5F9' },
  radarLabel: { fontSize: 9, fontWeight: '900', color: '#94A3B8', textAlign: 'center', marginBottom: 20 },
  radarContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 100, paddingHorizontal: 20 },
  radarSpoke: { width: 12, borderRadius: 6, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 5 },
  spokeLab: { fontSize: 7, fontWeight: '900', color: '#FFF' },
  radarInsight: { textAlign: 'center', fontSize: 10, color: '#6366F1', fontWeight: '700', marginTop: 20 },

  // Mission Items
  missionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 22, marginBottom: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  missionIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  missionInfo: { flex: 1 },
  missionTitle: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  missionSub: { fontSize: 10, color: '#94A3B8', fontWeight: '600', marginTop: 2 },
  xpTag: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  xpText: { fontSize: 9, fontWeight: '900', color: '#1A237E' },

  // Heatmap
  heatmap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  heatSquare: { width: (width - 100) / 10, height: (width - 100) / 10, borderRadius: 4, margin: 3 },
  streakFooter: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  streakText: { fontSize: 10, fontWeight: '900', color: '#1A237E', marginLeft: 6, letterSpacing: 1 }
});