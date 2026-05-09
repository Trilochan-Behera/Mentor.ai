import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function SubtopicsScreen() {
  const { subject } = useLocalSearchParams();
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = [
    { name: "Number Patterns", accuracy: 82, trend: "+5", solved: 240, status: "STRENGTH" },
    { name: "Circular Seating", accuracy: 45, trend: "-2", solved: 110, status: "WEAKNESS" },
    { name: "Linear Seating", accuracy: 60, trend: "+12", solved: 185, status: "STABLE" },
    { name: "Syllogism", accuracy: 91, trend: "+3", solved: 420, status: "STRENGTH" },
    { name: "Blood Relations", accuracy: 74, trend: "+8", solved: 215, status: "STABLE" },
    { name: "Direction Sense", accuracy: 38, trend: "-5", solved: 150, status: "WEAKNESS" },
  ];

   // Focus on LAST ATTEMPT metrics
  const lastAttempt = {
    date: "Yesterday, 04:20 PM",
    correct: 18,
    wrong: 4,
    skipped: 3,
    accuracy: 72,
    improvement: "+4%", // Improvement from the attempt before last
    timeSpent: "14m 20s",
    difficultyIssue: "High-Level Qs"
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, headerTitle: "", headerShadowVisible: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1A237E" />
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: '#F8F9FE' }
      }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        <View style={styles.headerArea}>
          <Text style={styles.subjectTag}>{subject}</Text>
          <Text style={styles.mainTitle}>Pick a challenge</Text>
          <Text style={styles.subTitle}>Focus on the topic to analyze your speed and accuracy.</Text>
        </View>

        <View style={styles.gridContainer}>
          {topics.map((t) => {
            const isSelected = selectedTopic === t.name;
            const isAnySelected = selectedTopic !== null;
            const isWeak = t.status === "WEAKNESS";

            return (
              <TouchableOpacity 
                key={t.name} 
                activeOpacity={0.9}
                disabled={isAnySelected && !isSelected}
                onPress={() => setSelectedTopic(t.name)}
                style={[
                  styles.topicCard,
                  isSelected && styles.selectedCard,
                  isAnySelected && !isSelected && styles.dimmedCard
                ]}
              >
                {/* Status Indicator */}
                <View style={[styles.statusLine, { backgroundColor: isWeak ? '#FF5252' : '#4ADE80' }]} />
                
                <Text style={[styles.topicName, isSelected && styles.whiteText]}>{t.name}</Text>
                
                <View style={styles.cardFooter}>
                  <View>
                    {/* <Text style={[styles.accVal, isSelected && styles.whiteText]}>{t.accuracy}%</Text> */}
                    <View style={styles.trendRow}>
                      <Ionicons 
                        name={t.trend.includes('+') ? "caret-up" : "caret-down"} 
                        size={12} 
                        color={isSelected ? "#FFF" : (t.trend.includes('+') ? "#4CAF50" : "#FF5252")} 
                      />
                      <Text style={[styles.trendText, isSelected && styles.whiteText, { color: t.trend.includes('+') ? '#4CAF50' : '#FF5252' }]}>
                        {t.trend}%
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.solvedText, isSelected && styles.whiteText]}>{t.solved} Qs</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {selectedTopic && (
              <Animatable.View animation="slideInUp" duration={400} style={styles.briefingPanel}>
                <View style={styles.handle} />
                
                <View style={styles.panelHeader}>
                   <View>
                      <Text style={styles.panelLabel}>LAST ATTEMPT RECAP</Text>
                      <Text style={styles.briefTitle}>{selectedTopic}</Text>
                   </View>
                   <View style={styles.trendBadge}>
                      <Ionicons name="trending-up" size={12} color="#4CAF50" />
                      <Text style={styles.trendText}>{lastAttempt.improvement}</Text>
                   </View>
                </View>
                
                <Text style={styles.timestamp}>{lastAttempt.date}</Text>
                
                <View style={styles.statsRow}>
                  <View style={styles.briefStat}>
                      <Text style={[styles.briefVal, {color: '#4CAF50'}]}>{lastAttempt.correct}</Text>
                      <Text style={styles.briefLab}>CORRECT</Text>
                  </View>
                  <View style={styles.briefStat}>
                      <Text style={[styles.briefVal, {color: '#FF5252'}]}>{lastAttempt.wrong}</Text>
                      <Text style={styles.briefLab}>WRONG</Text>
                  </View>
                  <View style={styles.briefStat}>
                      <Text style={[styles.briefVal, {color: '#94A3B8'}]}>{lastAttempt.skipped}</Text>
                      <Text style={styles.briefLab}>SKIPPED</Text>
                  </View>
                  <View style={styles.briefStat}>
                      <Text style={styles.briefVal}>{lastAttempt.accuracy}%</Text>
                      <Text style={styles.briefLab}>ACCURACY</Text>
                  </View>
                </View>
      
                <View style={styles.insightBox}>
                   <View style={styles.insightItem}>
                      <Ionicons name="timer-outline" size={14} color="#1A237E" />
                      <Text style={styles.insightText}>Time Spent: **{lastAttempt.timeSpent}**</Text>
                   </View>
                   <View style={styles.insightItem}>
                      <Ionicons name="alert-circle-outline" size={14} color="#F59E0B" />
                      <Text style={styles.insightText}>Struggled with: **{lastAttempt.difficultyIssue}**</Text>
                   </View>
                </View>
      
                <View style={styles.panelActions}>
                  <TouchableOpacity onPress={() => setSelectedTopic(null)} style={styles.resetCircle}>
                    <Ionicons name="refresh" size={20} color="#FF5252" />
                  </TouchableOpacity>
      
                  <TouchableOpacity 
                    style={styles.nextBtn} 
                    onPress={() => router.push({ pathname: '/quiz/setup', params: { topic: selectedTopic } })}
                  >
                    <Text style={styles.nextBtnText}>Continue Challenge</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE' },
  scrollPadding: { paddingHorizontal: 20, paddingBottom: 140 },
  backBtn: { marginLeft: 10 },
  headerArea: { marginTop: 10, marginBottom: 30 },
  subjectTag: { color: '#3F51B5', fontWeight: '800', fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase' },
  mainTitle: { fontSize: 32, fontWeight: '900', color: '#1A237E' },
  subTitle: { fontSize: 15, color: '#64748B', marginTop: 8, lineHeight: 22 },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  topicCard: {
    width: (width - 55) / 2,
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 28,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#1A237E',
    shadowOpacity: 0.08,
    shadowRadius: 15,
    justifyContent: 'space-between',
    minHeight: 120
  },
  selectedCard: { backgroundColor: '#1A237E', shadowOpacity: 0.3 },
  dimmedCard: { opacity: 0.3 },
  statusLine: { width: 30, height: 6, borderRadius: 2, marginBottom: 12 },
  
  topicName: { fontSize: 16, fontWeight: '800', color: '#1A237E', lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 10 },
  accVal: { fontSize: 22, fontWeight: '900', color: '#1A237E' },
  trendRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  trendText: { fontSize: 10, fontWeight: '800', marginLeft: 2 },
  solvedText: { fontSize: 10, fontWeight: '700', color: '#94A3B8' },
  whiteText: { color: '#FFF' },

  floatPanel: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: '#FFF', borderRadius: 24, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20 },
  panelInfo: { flex: 1 },
  panelLabel: { fontSize: 10, fontWeight: '800', color: '#999' },
  panelValue: { fontSize: 16, fontWeight: '800', color: '#1A237E' },
  panelActions: { flexDirection: 'row', alignItems: 'center' },
  resetCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFF1F1', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  nextBtn: { flexDirection: 'row', backgroundColor: '#1A237E', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 18, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontWeight: '800', marginRight: 6 },
   statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  briefStat: { alignItems: 'center' },
  briefVal: { fontSize: 18, fontWeight: '900', color: '#1A237E' },
  briefLab: { fontSize: 8, fontWeight: '800', color: '#94A3B8', marginTop: 4 },

  insightBox: { backgroundColor: '#F8F9FE', borderRadius: 16, padding: 16, marginBottom: 25 },
  insightItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  insightText: { fontSize: 12, fontWeight: '700', color: '#475569', marginLeft: 10 },
   // RECAP PANEL
  briefingPanel: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    padding: 24, paddingBottom: 40,
    elevation: 30, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20
  },
  handle: { width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  panelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  briefTitle: { fontSize: 20, fontWeight: '900', color: '#1A237E', marginTop: 2 },
  trendBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  timestamp: { fontSize: 11, color: '#94A3B8', marginTop: 4, marginBottom: 20 },
});