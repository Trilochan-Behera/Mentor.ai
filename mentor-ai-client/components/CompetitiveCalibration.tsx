import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G, LinearGradient, Stop, Defs } from 'react-native-svg';

const CircularBenchmark = ({ item }) => {
  const size = 90;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  const isAhead = item.user >= item.goal;
  const diff = item.user - item.goal;
  
  // Calculate SVG offset: stops exactly at the user's percentage
  const strokeDashoffset = circumference - (item.user / 100) * circumference;
  
  // Calculate rotation for the Threshold (CAP) Marker
  const capRotation = (item.goal * 3.6);

  console.log(capRotation, "capRotation")

  return (
    <View style={styles.orbitNode}>
      <View style={styles.svgWrapper}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={isAhead ? "#3949AB" : "#94A3B8"} />
              <Stop offset="100%" stopColor={isAhead ? "#1A237E" : "#475569"} />
            </LinearGradient>
          </Defs>
          <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
            {/* Background Track */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* User Mastery Ring */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#grad)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          </G>
        </Svg>

        {/* Target Marker (Threshold CAP) */}
        <View style={[styles.capContainer, { transform: [{ rotate: `${capRotation}deg` }] }]}>
          <View style={styles.capLine} />
        </View>

        {/* Center Text */}
        <View style={styles.centerText}>
          <Text style={styles.percVal}>{item.user}%</Text>
          <Text style={[styles.diffVal, { color: isAhead ? '#10B981' : '#EF4444' }]}>
            {isAhead ? `+${diff}` : diff}%
          </Text>
        </View>
      </View>
      
      <Text style={styles.nodeLabel}>{item.label.toUpperCase()}</Text>
    </View>
  );
};

export default function CompetitiveCalibration({ benchmarks }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionLabel}>COMPETITIVE CALIBRATION</Text>
        <View style={styles.liveTag}>
          <View style={styles.livePulse} />
          <Text style={styles.liveTagText}>LIVE BENCHMARK</Text>
        </View>
      </View>

      <View style={styles.benchCard}>
        <View style={styles.orbitGrid}>
          {benchmarks.map((item, i) => (
            <CircularBenchmark key={i} item={item} />
          ))}
        </View>

        {/* Custom Legend */}
        <View style={styles.benchLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#1A237E' }]} />
            <Text style={styles.legendText}>YOUR CALIBRATION</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#1E293B' }]} />
            <Text style={styles.legendText}>THRESHOLD (CAP)</Text>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1.5 },
  liveTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  livePulse: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981', marginRight: 6 },
  liveTagText: { fontSize: 8, fontWeight: '900', color: '#475569' },

  benchCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#F1F5F9' },
  orbitGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  orbitNode: { alignItems: 'center', width: '30%' },
  svgWrapper: { justifyContent: 'center', alignItems: 'center', position: 'relative' },
  
  centerText: { position: 'absolute', alignItems: 'center' },
  percVal: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  diffVal: { fontSize: 9, fontWeight: '800', marginTop: -2 },
  
  capContainer: { position: 'absolute', width: 100, height: 100, justifyContent: 'flex-start', alignItems: 'center' },
  capLine: { width: 3, height: 12, backgroundColor: '#1E293B', borderRadius: 2, borderWidth: 1, borderColor: '#FFF' },

  nodeLabel: { fontSize: 9, fontWeight: '800', color: '#64748B', marginTop: 10, letterSpacing: 0.5 },

  benchLegend: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F8FAFC' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendBox: { width: 10, height: 4, borderRadius: 2 },
  legendText: { fontSize: 8, fontWeight: '900', color: '#94A3B8', letterSpacing: 0.5 },
});