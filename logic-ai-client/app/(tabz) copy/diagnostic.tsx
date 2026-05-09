import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function DiagnosticTest() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(1);
  const [timer, setTimer] = useState(0);
  const totalQuestions = 10;

  // Simulate Timer Tracking for AI Speed Analysis
  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [currentQ]);

  const handleAction = (type: 'answer' | 'skip') => {
    if (currentQ < totalQuestions) {
      setCurrentQ(currentQ + 1);
      setTimer(0); // Reset per question timer
    } else {
      router.push('/analysis-loading'); // Move to AI Profile Generation
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. PROGRESS & SPEED ENGINE */}
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>BASELINE_TEST: {currentQ}/{totalQuestions}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(currentQ / totalQuestions) * 100}%` }]} />
          </View>
        </View>
        <View style={styles.timerBadge}>
          <Ionicons name="timer-outline" size={16} color="#1A237E" />
          <Text style={styles.timerText}>{timer}s</Text>
        </View>
      </View>

      {/* 2. QUESTION AREA */}
      <View style={styles.questionCard}>
        <Text style={styles.categoryTag}>QUANTITATIVE • ARITHMETIC</Text>
        <Text style={styles.questionText}>
          If a train crosses a 180m long platform in 20 seconds at a speed of 54 km/h, what is the length of the train?
        </Text>
      </View>

      {/* 3. OPTION SELECTORS */}
      <View style={styles.optionsArea}>
        {['120m', '150m', '200m', '220m'].map((opt, i) => (
          <TouchableOpacity 
            key={i} 
            style={styles.optionBtn} 
            onPress={() => handleAction('answer')}
          >
            <Text style={styles.optionLabel}>{String.fromCharCode(65 + i)}</Text>
            <Text style={styles.optionValue}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 4. SMART SKIP LOGIC */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipBtn} onPress={() => handleAction('skip')}>
          <Text style={styles.skipText}>SMART SKIP</Text>
          <Ionicons name="play-skip-forward" size={16} color="#94A3B8" />
        </TouchableOpacity>
        
        <View style={styles.aiTip}>
          <Ionicons name="bulb-outline" size={14} color="#6366F1" />
          <Text style={styles.aiTipText}>AI Insight: Skipping difficult topics saves time for ROI zones.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 25 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 40 },
  progressContainer: { flex: 1 },
  progressText: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1 },
  progressBar: { height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, marginTop: 8, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#1A237E' },
  timerBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, elevation: 2 },
  timerText: { marginLeft: 6, fontWeight: '900', color: '#1A237E', fontSize: 12 },
  
  questionCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 30, elevation: 4, shadowColor: '#1A237E', shadowOpacity: 0.05 },
  categoryTag: { fontSize: 10, fontWeight: '900', color: '#6366F1', letterSpacing: 1, marginBottom: 15 },
  questionText: { fontSize: 18, fontWeight: '700', color: '#1E293B', lineHeight: 28 },

  optionsArea: { marginTop: 30 },
  optionBtn: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', 
    padding: 20, borderRadius: 18, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9' 
  },
  optionLabel: { fontSize: 12, fontWeight: '900', color: '#94A3B8', width: 30 },
  optionValue: { fontSize: 15, fontWeight: '700', color: '#1E293B' },

  footer: { marginTop: 'auto', marginBottom: 30, alignItems: 'center' },
  skipBtn: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  skipText: { fontSize: 12, fontWeight: '900', color: '#94A3B8', marginRight: 8, letterSpacing: 1 },
  aiTip: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', 
    paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, marginTop: 10 
  },
  aiTipText: { fontSize: 10, color: '#6366F1', fontWeight: '700', marginLeft: 8 }
});