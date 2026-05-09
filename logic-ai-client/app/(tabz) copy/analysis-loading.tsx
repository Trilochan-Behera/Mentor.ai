import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AnalysisLoading() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/home'); // Move to Command Center
    }, 4000);
  }, []);

  const processingSteps = [
    "Analyzing Response Velocity...",
    "Identifying Risk Zones...",
    "Mapping Subject Mastery...",
    "Calibrating Personalized Strategy..."
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1A237E', '#0F172A']} style={styles.gradient}>
        
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

        <Text style={styles.footerNote}>Calibration Complete • Securing Operational Node</Text>
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
  footerNote: { position: 'absolute', bottom: 50, color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '800' }
});