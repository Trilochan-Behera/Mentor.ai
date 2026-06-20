import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../theme/colors';

export default function ResultScreen() {
  const router = useRouter();

  useEffect(() => {
    // Simulate AI processing
    setTimeout(() => router.replace('/(tabs)/home'), 4000);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View animation="pulse" iterationCount="infinite" style={styles.scanner}>
        <View style={styles.scanLine} />
        <Text style={styles.status}>AI GENERATING GROWTH ROADMAP...</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={1500} style={styles.card}>
        <Text style={styles.label}>INITIAL ABILITY LEVEL</Text>
        <Text style={styles.rank}>NOVICE TACTICIAN</Text>
        <Text style={styles.level}>RANK 04</Text>
        
        <View style={styles.targetBox}>
          <Text style={styles.targetLabel}>PRIORITY GROWTH ZONE</Text>
          <Text style={styles.targetVal}>QUANT: RATIOS (40% Acc.)</Text>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', padding: 30 },
  scanner: { alignItems: 'center', marginBottom: 50 },
  scanLine: { width: '80%', height: 2, backgroundColor: COLORS.primary, shadowBlur: 10, shadowColor: COLORS.primary },
  status: { color: COLORS.primary, marginTop: 20, fontWeight: '900', fontSize: 10, letterSpacing: 2 },
  card: { backgroundColor: COLORS.surface, padding: 40, borderRadius: 40, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(37, 99, 235, 0.3)' },
  label: { color: COLORS.textDim, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  rank: { color: COLORS.text, fontSize: 28, fontWeight: '900', marginVertical: 10 },
  level: { color: COLORS.accent, fontSize: 22, fontWeight: '900' },
  targetBox: { marginTop: 30, paddingTop: 20, borderTopWidth: 1, borderTopColor: COLORS.border, width: '100%', alignItems: 'center' },
  targetLabel: { color: COLORS.textDim, fontSize: 10, fontWeight: '900' },
  targetVal: { color: COLORS.text, fontSize: 14, fontWeight: '700', marginTop: 5 }
});