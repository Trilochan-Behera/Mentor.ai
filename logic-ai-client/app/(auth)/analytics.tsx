import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

// Educational Levels Configuration
export const LEVELS: Record<string, { label: string; color: string; icon: string }> = {
  expert: { label: 'EXPERT', color: '#4ADE80', icon: 'ribbon' }, // Green (Mastery)
  proficient: { label: 'PROFICIENT', color: '#FACC15', icon: 'checkmark-done' }, // Warning/Yellow (Specialist)
  intermediate: { label: 'INTERMEDIATE', color: '#3B82F6', icon: 'trending-up' }, // Blue (Tactician)
  foundational: { label: 'FOUNDATIONAL', color: '#94A3B8', icon: 'book' }, // Gray (Beginner)
};

export default function AnalysisLoading() {
  const router = useRouter();
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  // Mock Result Data based on selected subjects
  const userPerformance = [
    { subject: 'Quant', rank: 'expert', score: '94%' },
    { subject: 'Reasoning', rank: 'proficient', score: '72%' },
    { subject: 'English', rank: 'intermediate', score: '58%' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzed(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const processingSteps = [
    "Analyzing Response Velocity...",
    "Identifying Skills...",
    "Mapping Subject Mastery...",
    "Calibrating Personalized Strategy..."
  ];

  const handleFinalize = async () => {
  try {
    // Save that the user has completed the evolution
    await AsyncStorage.setItem('hasCompletedEvolution', 'true');
    
    // Redirect to home
    router.replace('/(tabs)/home');
  } catch (e) {
    console.error("Failed to save onboarding state", e);
  }
};

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1A237E', '#0F172A']} style={styles.gradient}>
        
        {!isAnalyzed ? (
          /* --- YOUR ORIGINAL ANIMATION (UNTOUCHED) --- */
          <Animatable.View animation="fadeIn" style={{ width: '100%', alignItems: 'center' }}>
            <View style={styles.centerBox}>
              <Animatable.View 
                animation="rotate" 
                iterationCount="infinite" 
                duration={3000} 
                easing="linear"
              >
                <Ionicons name="scan-outline" size={80} color="#4ADE80" />
              </Animatable.View>
              <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.loadingTitle}>
                GENERATING SKILL IDENTITY
              </Animatable.Text>
            </View>

            <View style={styles.stepsContainer}>
              {processingSteps.map((step, i) => (
                <Animatable.View 
                  key={i} 
                  animation="fadeInLeft" 
                  delay={i * 800} 
                  style={styles.stepRow}
                >
                  <Ionicons name="checkmark-circle" size={16} color="#4ADE80" />
                  <Text style={styles.stepText}>{step}</Text>
                </Animatable.View>
              ))}
            </View>
          </Animatable.View>
        ) : (
          /* --- UPDATED SKILL IDENTITY REVEAL --- */
          <Animatable.View animation="fadeIn" duration={800} style={styles.identityContainer}>
            <Animatable.View animation="zoomIn" style={styles.idHeader}>
              <Text style={styles.identityLabel}>ANALYSIS COMPLETE</Text>
              <Text style={styles.identityName}>Skill Identity</Text>
              <Text style={styles.subText}>Based on your evaluation performance</Text>
            </Animatable.View>

            <View style={styles.statsWrapper}>
              {userPerformance.map((item, index) => {
                const config = LEVELS[item.rank];
                return (
                  <Animatable.View 
                    animation="slideInRight" 
                    delay={index * 150} 
                    key={item.subject} 
                  >
                    <View style={styles.statCard}>
                      <View style={styles.cardLeft}>
                        <View style={[styles.iconIndicator, { backgroundColor: config.color + '15' }]}>
                          <Ionicons name={config.icon as any} size={20} color={config.color} />
                        </View>
                        <View>
                          <Text style={styles.subjectLabel}>{item.subject}</Text>
                          <Text style={[styles.rankText, { color: config.color }]}>{config.label}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.scoreBox}>
                         <Text style={styles.scoreVal}>{item.score}</Text>
                         <Text style={styles.scoreSub}>Proficiency</Text>
                      </View>
                    </View>
                  </Animatable.View>
                );
              })}
            </View>

            <Animatable.View animation="fadeInUp" delay={1000}>
              <TouchableOpacity 
                onPress={handleFinalize}
                style={styles.finalBtn}
              >
                <LinearGradient colors={['#3949AB', '#1A237E']} style={styles.btnGrad}>
                  <Text style={styles.finalBtnText}>CONTINUE TO DASHBOARD</Text>
                  <Ionicons name="chevron-forward" size={18} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
          </Animatable.View>
        )}

        <Text style={styles.footerNote}>
          {isAnalyzed ? "SECURE IDENTITY GENERATED" : "Calibration Complete • Securing Operational Node"}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  centerBox: { alignItems: 'center', marginBottom: 60 },
  loadingTitle: { color: '#FFF', fontSize: 18, fontWeight: '900', letterSpacing: 2, marginTop: 30 },
  stepsContainer: { width: '100%', paddingLeft: 40 },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  stepText: { color: '#94A3B8', fontSize: 13, fontWeight: '700', marginLeft: 15 },
  footerNote: { position: 'absolute', bottom: 50, color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '800' },

  // Identity Container Styles
  identityContainer: { width: '100%' },
  idHeader: { alignItems: 'center', marginBottom: 35 },
  identityLabel: { color: '#4ADE80', fontSize: 11, fontWeight: '900', letterSpacing: 4 },
  identityName: { color: '#FFF', fontSize: 36, fontWeight: '900', marginTop: 5 },
  subText: { color: '#94A3B8', fontSize: 14, marginTop: 8 },
  
  statsWrapper: { gap: 12, marginBottom: 40 },
  statCard: { 
    padding: 20, 
    borderRadius: 22, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  iconIndicator: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  subjectLabel: { color: '#94A3B8', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  rankText: { fontSize: 20, fontWeight: '900', marginTop: 2 },
  
  scoreBox: { alignItems: 'flex-end' },
  scoreVal: { color: '#FFF', fontSize: 20, fontWeight: '900' },
  scoreSub: { color: '#64748B', fontSize: 10, fontWeight: '800' },

  finalBtn: { height: 64, borderRadius: 20, overflow: 'hidden', marginTop: 10 },
  btnGrad: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  finalBtnText: { color: '#FFF', fontWeight: '900', fontSize: 15, letterSpacing: 1 }
});