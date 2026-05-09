import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AnalysisLaunchpad() {
  const router = useRouter();

  // Tactical Grouping
  const groups = [
    { 
      type: 'SKIP', 
      title: 'Skipped Questions', 
      subtitle: 'Identify logic gaps',
      count: 4, 
      questions: [10, 12, 15, 18], 
      color: '#64748B', 
      icon: 'return-down-forward' 
    },
    { 
      type: 'SLOW', 
      title: 'Correct but Slow', 
      subtitle: 'Optimize speed & rhythm',
      count: 3, 
      questions: [4, 8, 14], 
      color: '#F59E0B', 
      icon: 'hourglass-outline' 
    },
    { 
      type: 'WRONG', 
      title: 'Incorrect Attempts', 
      subtitle: 'Repair fundamental errors',
      count: 2, 
      questions: [7, 9], 
      color: '#EF4444', 
      icon: 'close-circle-outline' 
    }
  ];

  const totalActions = 4 + 3 + 2;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        title: "", 
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#F8F9FE' },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={styles.backCircle}>
            <Ionicons name="chevron-back" size={24} color="#1A237E" />
          </TouchableOpacity>
        )
      }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* 1. STRATEGIC HEADER */}
        <View style={styles.header}>
          <Text style={styles.tagline}>OPERATIONAL ANALYSIS</Text>
          <Text style={styles.title}>Improvement Plan</Text>
          <View style={styles.insightPill}>
            <Ionicons name="analytics" size={14} color="#1A237E" />
            <Text style={styles.subtitle}>We found {totalActions} optimization points in your logic.</Text>
          </View>
        </View>

        {/* 2. TACTICAL CARDS */}
        {groups.map((group, index) => (
          <Animatable.View 
            animation="fadeInUp" 
            delay={index * 150} 
            key={group.type} 
            style={styles.groupCard}
          >
            {/* Pulsing Icon for Urgency */}
            <Animatable.View 
              animation="pulse" 
              iterationCount="infinite" 
              duration={2500}
              style={[styles.iconBox, { backgroundColor: `${group.color}15` }]}
            >
              <Ionicons name={group.icon as any} size={24} color={group.color} />
            </Animatable.View>

            <View style={styles.groupInfo}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <Text style={styles.groupSub}>{group.subtitle}</Text>
              
              <View style={styles.qBadgeRow}>
                {group.questions.map(q => (
                  <View key={q} style={styles.qBadge}>
                    <Text style={styles.qBadgeText}>Q{q}</Text>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.startBtn, { backgroundColor: group.color }]}
              onPress={() => router.push({ 
                pathname: '/quiz/drilldown', 
                params: { filter: group.type } 
              })}
            >
              <Ionicons name="chevron-forward" size={18} color="#FFF" />
            </TouchableOpacity>
          </Animatable.View>
        ))}

        <TouchableOpacity 
          activeOpacity={0.9}
          style={styles.fullAnalysisContainer}
          onPress={() => router.push('/quiz/report')}
        >
          <LinearGradient 
            colors={['#1A237E', '#3949AB']} 
            start={{x:0, y:0}} end={{x:1, y:0}}
            style={styles.fullAnalysisBtn}
          >
            <View style={styles.fullBtnContent}>
               <View>
                  <Text style={styles.fullAnalysisText}>View Analysis Report</Text>
               </View>
               <View style={styles.goCircle}>
                  <Ionicons name="play" size={20} color="#1A237E" />
               </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE' },
  content: { padding: 25 },
  backCircle: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8EAF6' },
  
  header: { marginBottom: 30 },
  tagline: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1.5, marginBottom: 5 },
  title: { fontSize: 32, fontWeight: '900', color: '#1A237E', letterSpacing: -1 },
  insightPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8EAF6', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginTop: 12 },
  subtitle: { fontSize: 12, color: '#1A237E', fontWeight: '700', marginLeft: 8 },
  
  groupCard: { 
    flexDirection: 'row', backgroundColor: '#FFF', padding: 20, borderRadius: 28, 
    alignItems: 'center', marginBottom: 16, elevation: 4, shadowColor: '#1A237E', shadowOpacity: 0.05, shadowRadius: 15
  },
  iconBox: { width: 54, height: 54, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  groupInfo: { flex: 1, marginLeft: 18 },
  groupTitle: { fontSize: 17, fontWeight: '800', color: '#1A237E' },
  groupSub: { fontSize: 11, color: '#94A3B8', fontWeight: '600', marginTop: 2 },
  qBadgeRow: { flexDirection: 'row', marginTop: 12, flexWrap: 'wrap' },
  qBadge: { backgroundColor: '#F1F3F9', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginRight: 6, marginBottom: 4 },
  qBadgeText: { fontSize: 10, fontWeight: '800', color: '#1A237E' },
  
  startBtn: { width: 40, height: 40, borderRadius: 14, justifyContent: 'center', alignItems: 'center', elevation: 4 },

  fullAnalysisContainer: { marginTop: 15, borderRadius: 24, overflow: 'hidden', elevation: 8, shadowColor: '#1A237E', shadowOpacity: 0.3 },
  fullAnalysisBtn: { padding: 25 },
  fullBtnContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  fullAnalysisText: { color: '#FFF', fontSize: 20, fontWeight: '900' },
  fullAnalysisSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4, fontWeight: '700' },
  goCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }
});