import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AICommandCenter() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        {/* HEADER: OPERATIVE STATUS */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>COMMAND CENTER</Text>
            <Text style={styles.operative}>Operative: Kanha • Rank: King 👑</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <LinearGradient colors={['#4ADE80', '#22C55E']} style={styles.profileGrad}>
               <Text style={styles.profileInitial}>K</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* SECTION 1: TODAY'S FOCUS (MAIN ACTION) */}
        <View style={styles.section}>
          <Text style={styles.label}>TODAY'S STRATEGIC FOCUS</Text>
          <TouchableOpacity activeOpacity={0.9} style={styles.focusCard}>
            <LinearGradient colors={['#1A237E', '#3949AB']} style={styles.focusGrad}>
              <View style={styles.focusInfo}>
                <Text style={styles.focusTitle}>Weakness Attack</Text>
                <Text style={styles.focusSub}>Focus: Reasoning • Puzzles</Text>
                <Text style={styles.focusDesc}>Your accuracy in puzzles dropped 12% recently. Let's fix it.</Text>
              </View>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={28} color="#1A237E" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* SECTION 2: AI RECOMMENDED ACTIONS */}
        <View style={styles.section}>
          <Text style={styles.label}>AI RECOMMENDED ACTIONS</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionTile}>
              <View style={[styles.iconBg, {backgroundColor: '#EEF2FF'}]}>
                <Ionicons name="refresh-circle" size={24} color="#6366F1" />
              </View>
              <Text style={styles.actionText}>Revision Due</Text>
              <Text style={styles.actionMeta}>8 Topics</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionTile}>
              <View style={[styles.iconBg, {backgroundColor: '#FFF7ED'}]}>
                <Ionicons name="flash" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.actionText}>Speed Drills</Text>
              <Text style={styles.actionMeta}>Arithmetic</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 3: QUICK PROGRESS */}
        <View style={styles.section}>
          <Text style={styles.label}>REAL-TIME PERFORMANCE</Text>
          <View style={styles.statCard}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>82%</Text>
              <Text style={styles.statLab}>Accuracy</Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>14s</Text>
              <Text style={styles.statLab}>Avg Speed</Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>12</Text>
              <Text style={styles.statLab}>Streak</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.continueBtn}>
           <Text style={styles.continueText}>CONTINUE LAST SESSION: QUANTITATIVE</Text>
           <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingBottom: 40 },
  header: { padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcome: { fontSize: 18, fontWeight: '900', color: '#1A237E', letterSpacing: 2 },
  operative: { fontSize: 11, fontWeight: '700', color: '#94A3B8', marginTop: 4 },
  profileBtn: { width: 44, height: 44, borderRadius: 15, overflow: 'hidden' },
  profileGrad: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileInitial: { color: '#FFF', fontWeight: '900', fontSize: 18 },

  section: { paddingHorizontal: 25, marginTop: 25 },
  label: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1.5, marginBottom: 15 },
  
  focusCard: { borderRadius: 30, overflow: 'hidden', elevation: 10, shadowColor: '#1A237E', shadowOpacity: 0.3, shadowRadius: 15 },
  focusGrad: { padding: 25, flexDirection: 'row', alignItems: 'center' },
  focusInfo: { flex: 1 },
  focusTitle: { color: '#FFF', fontSize: 20, fontWeight: '900' },
  focusSub: { color: '#4ADE80', fontSize: 12, fontWeight: '800', marginTop: 4 },
  focusDesc: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '600', marginTop: 10, lineHeight: 16 },
  playBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginLeft: 15 },

  actionGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  actionTile: { backgroundColor: '#FFF', width: '48%', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F1F5F9', elevation: 2 },
  iconBg: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  actionText: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  actionMeta: { fontSize: 10, color: '#94A3B8', fontWeight: '700', marginTop: 4 },

  statCard: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#F1F5F9' },
  statItem: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '900', color: '#1A237E' },
  statLab: { fontSize: 9, fontWeight: '800', color: '#94A3B8', marginTop: 4 },
  vDivider: { width: 1, backgroundColor: '#F1F5F9' },

  continueBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, marginTop: 30, opacity: 0.7 },
  continueText: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1 }
});