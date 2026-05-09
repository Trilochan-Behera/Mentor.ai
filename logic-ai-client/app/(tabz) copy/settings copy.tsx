import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function AICommandCenter() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        {/* 1. THE REPUTATION HEADER (Game Layer) */}
        <View style={styles.header}>
          <View>
            <Text style={styles.rankText}>ELITE STRATEGIST</Text>
            <View style={styles.xpBarContainer}>
               <View style={styles.xpBarFill} />
            </View>
            <Text style={styles.xpLabel}>2,450 / 3,000 XP TO LEVEL 43</Text>
          </View>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={18} color="#F59E0B" />
            <Text style={styles.streakCount}>14</Text>
          </View>
        </View>

        {/* 2. LIVE STATUS (Psychological Confidence) */}
        <Animatable.View animation="fadeInDown" style={styles.statusCard}>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.statusGrad}>
            <Ionicons name="trending-up" size={24} color="#FFF" />
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>Accuracy Peak Detected!</Text>
              <Text style={styles.statusSub}>You are currently in the 'Flow State' for Reasoning.</Text>
            </View>
          </LinearGradient>
        </Animatable.View>

        {/* 3. THE "BATTLE READY" CALL TO ACTION */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MISSION CONTROL</Text>
          <TouchableOpacity activeOpacity={0.9} style={styles.mainMissionCard}>
            <LinearGradient colors={['#1A237E', '#3949AB']} style={styles.missionGrad}>
              <View style={styles.missionContent}>
                <Text style={styles.missionTitle}>Quick Accuracy Sprint</Text>
                <Text style={styles.missionMeta}>5 MIN • 10 QNS • REASONING</Text>
                <View style={styles.rewardTag}>
                  <Text style={styles.rewardText}>+50 XP • SKILL_UPGRADE</Text>
                </View>
              </View>
              <Animatable.View animation="pulse" iterationCount="infinite" style={styles.playIcon}>
                <Ionicons name="play" size={32} color="#1A237E" />
              </Animatable.View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 4. GAME MODES (Anti-Boredom) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>COMPETITIVE ARENA</Text>
          <View style={styles.bentoGrid}>
            <TouchableOpacity style={[styles.bentoTile, { backgroundColor: '#EEF2FF' }]}>
               <Ionicons name="people" size={24} color="#6366F1" />
               <Text style={styles.bentoTitle}>Global Battle</Text>
               <Text style={styles.bentoSub}>Live 4-Player</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.bentoTile, { backgroundColor: '#FFF7ED' }]}>
               <Ionicons name="flash" size={24} color="#F59E0B" />
               <Text style={styles.bentoTitle}>Speed Blitz</Text>
               <Text style={styles.bentoSub}>Beat the Clock</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. REVISION LAB (Personal Coach Feel) */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.coachCard}>
             <View style={styles.coachIcon}>
                <Ionicons name="chatbubble-ellipses" size={20} color="#1A237E" />
             </View>
             <View style={styles.coachContent}>
                <Text style={styles.coachTitle}>AI Mentor Tip</Text>
                <Text style={styles.coachText}>"Kanha, you've mastered Puzzles. Your next growth zone is Arithmetic Speed. Shall we initiate?"</Text>
             </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingBottom: 40 },
  
  // XP & Rank Header
  header: { padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rankText: { fontSize: 10, fontWeight: '900', color: '#1A237E', letterSpacing: 2 },
  xpBarContainer: { width: 140, height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, marginTop: 8, overflow: 'hidden' },
  xpBarFill: { width: '80%', height: '100%', backgroundColor: '#1A237E' },
  xpLabel: { fontSize: 8, fontWeight: '800', color: '#94A3B8', marginTop: 6 },
  streakBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 15, flexDirection: 'row', alignItems: 'center' },
  streakCount: { fontSize: 14, fontWeight: '900', color: '#D97706', marginLeft: 5 },

  // Live Status Card
  statusCard: { paddingHorizontal: 20, marginTop: 10 },
  statusGrad: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 20 },
  statusInfo: { marginLeft: 15 },
  statusTitle: { color: '#FFF', fontSize: 14, fontWeight: '900' },
  statusSub: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '600' },

  // Mission Card
  section: { paddingHorizontal: 20, marginTop: 30 },
  sectionLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1.5, marginBottom: 15 },
  mainMissionCard: { borderRadius: 30, overflow: 'hidden', elevation: 12, shadowColor: '#1A237E', shadowOpacity: 0.3 },
  missionGrad: { padding: 30, flexDirection: 'row', alignItems: 'center' },
  missionContent: { flex: 1 },
  missionTitle: { fontSize: 22, fontWeight: '900', color: '#FFF' },
  missionMeta: { fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.5)', marginTop: 5, letterSpacing: 1 },
  rewardTag: { alignSelf: 'flex-start', backgroundColor: 'rgba(74, 222, 128, 0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 15 },
  rewardText: { color: '#4ADE80', fontSize: 9, fontWeight: '900' },
  playIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },

  // Bento Grid
  bentoGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  bentoTile: { width: '48%', padding: 20, borderRadius: 24, alignItems: 'center' },
  bentoTitle: { fontSize: 14, fontWeight: '900', color: '#1A237E', marginTop: 10 },
  bentoSub: { fontSize: 10, fontWeight: '700', color: '#94A3B8', marginTop: 2 },

  // AI Coach Tip
  coachCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F1F5F9', elevation: 2 },
  coachIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F3F9', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  coachContent: { flex: 1 },
  coachTitle: { fontSize: 12, fontWeight: '900', color: '#1A237E' },
  coachText: { fontSize: 12, color: '#64748B', lineHeight: 18, marginTop: 4, fontWeight: '600' }
});