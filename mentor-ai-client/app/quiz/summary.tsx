import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function SummaryScreen() {
  const router = useRouter();

  const stats = {
    totalTime: "18m 40s",
    avgPerQuestion: "56s",
    accuracy: 74,
    rankCreditsEarned: 120,
    categories: [
      { label: 'Tactical (Fast)', count: 3, time: '2s avg', color: '#4ADE80', bg: '#F0FDF4', icon: 'flash' },
      { label: 'Steady (Correct)', count: 4, time: '120s avg', color: '#60A5FA', bg: '#EFF6FF', icon: 'checkmark-done' },
      { label: 'Collateral (Wrong)', count: 2, time: '45s avg', color: '#F87171', bg: '#FEF2F2', icon: 'close-circle' },
      { label: 'Neutral (Skip)', count: 1, time: '10s avg', color: '#94A3B8', bg: '#F8F9FA', icon: 'arrow-forward' },
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* 1. Header Section */}
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Text style={styles.tagline}>MISSION COMPLETED</Text>
          <Text style={styles.title}>Session Debrief</Text>
        </Animatable.View>

        {/* 2. Core Metrics: Time & Accuracy */}
        <View style={styles.timeCardContainer}>
          <LinearGradient colors={["#1A237E", "#3949AB"]} style={styles.timeCard}>
            <View style={styles.statItem}>
              <Text style={styles.timeLabel}>SESSION TIME</Text>
              <Text style={styles.timeValue}>{stats.totalTime}</Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.statItem}>
              <Text style={styles.timeLabel}>AVG. VELOCITY</Text>
              <Text style={styles.timeValue}>{stats.avgPerQuestion}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* 3. Rank Credits Earned (The "Reward" Moment) */}
        <Animatable.View animation="zoomIn" delay={300} style={styles.rewardCard}>
          <View style={styles.rewardInfo}>
             <Ionicons name="sparkles" size={24} color="#F59E0B" />
             <View style={{marginLeft: 15}}>
                <Text style={styles.rewardTitle}>RANK CREDITS EARNED</Text>
                <Text style={styles.rewardValue}>+{stats.rankCreditsEarned} RC</Text>
             </View>
          </View>
          <View style={styles.accuracyPill}>
             <Text style={styles.accText}>{stats.accuracy}% ACC</Text>
          </View>
        </Animatable.View>

        {/* 4. Performance Grid */}
        <Text style={styles.sectionTitle}>Engagement Breakdown</Text>
        <View style={styles.statsGrid}>
          {stats.categories.map((item, index) => (
            <Animatable.View 
              animation="fadeInUp" 
              delay={400 + (index * 100)} 
              key={index} 
              style={[styles.statCard, { backgroundColor: item.bg }]}
            >
              <View style={styles.cardHeader}>
                <Ionicons name={item.icon as any} size={18} color={item.color} />
                <Text style={[styles.statCount, { color: item.color }]}>{item.count}</Text>
              </View>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statTime}>{item.time}</Text>
            </Animatable.View>
          ))}
        </View>

        {/* 5. Primary CTA */}
        <TouchableOpacity 
          activeOpacity={0.8}
          style={styles.detailsBtn}
          onPress={() => router.push('/quiz/success')}
        >
          <LinearGradient 
            colors={["#1A237E", "#5C6BC0"]} 
            start={{x:0, y:0}} end={{x:1, y:0}} 
            style={styles.btnGradient}
          >
            <Text style={styles.detailsBtnText}>Strategic Analysis</Text>
            <Ionicons name="analytics-outline" size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE' },
  content: { padding: 24, paddingBottom: 60 },
  header: { marginTop: 40, marginBottom: 25 },
  tagline: { fontSize: 11, fontWeight: '900', color: '#4CAF50', letterSpacing: 2 },
  title: { fontSize: 32, fontWeight: '900', color: '#1A237E', letterSpacing: -1 },

  // Time Card
  timeCardContainer: { borderRadius: 28, overflow: 'hidden', elevation: 12, shadowColor: '#1A237E', shadowOpacity: 0.3, shadowRadius: 15 },
  timeCard: { flexDirection: 'row', paddingVertical: 28, justifyContent: 'space-around', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  timeLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  timeValue: { color: '#FFF', fontSize: 24, fontWeight: '900', marginTop: 4 },
  vDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.2)' },

  // Reward Card
  rewardCard: { 
    flexDirection: 'row', backgroundColor: '#FFF', padding: 20, borderRadius: 24, 
    marginTop: 20, marginBottom: 30, justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#E8EAF6', elevation: 4, shadowColor: '#000', shadowOpacity: 0.03
  },
  rewardInfo: { flexDirection: 'row', alignItems: 'center' },
  rewardTitle: { fontSize: 9, fontWeight: '900', color: '#94A3B8', letterSpacing: 1 },
  rewardValue: { fontSize: 22, fontWeight: '900', color: '#F59E0B', marginTop: 2 },
  accuracyPill: { backgroundColor: '#F0F2FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  accText: { fontSize: 12, fontWeight: '800', color: '#1A237E' },

  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A237E', marginBottom: 15 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { width: (width - 64) / 2, padding: 20, borderRadius: 24, marginBottom: 16, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statCount: { fontSize: 28, fontWeight: '900' },
  statLabel: { fontSize: 12, fontWeight: '800', color: '#475569' },
  statTime: { fontSize: 10, color: '#94A3B8', marginTop: 4, fontWeight: '700' },

  // CTA
  detailsBtn: { marginTop: 20, borderRadius: 20, overflow: 'hidden', elevation: 8, shadowColor: '#1A237E', shadowOpacity: 0.3 },
  btnGradient: { flexDirection: 'row', paddingVertical: 20, justifyContent: 'center', alignItems: 'center' },
  detailsBtnText: { color: '#FFF', fontSize: 17, fontWeight: '900', marginRight: 10 },
  
  homeBtn: { marginTop: 20, padding: 15, alignItems: 'center' },
  homeBtnText: { color: '#94A3B8', fontSize: 13, fontWeight: '800' }
});