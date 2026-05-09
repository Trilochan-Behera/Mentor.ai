import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

export default function SmartSuccessScreen() {
  const router = useRouter();
  const { correctCount, totalCount } = useLocalSearchParams();

  // Logic to determine the performance tier
  const correct = parseInt(correctCount as string) || 3;
  const total = parseInt(totalCount as string) || 20;
  const percentage = (correct / total) * 100;

  const getPerformanceData = () => {
    if (correct === 0) {
      return {
        title: "Needs Improvement",
        subtitle: "Zero correct responses detected. We need to revisit the core concepts and try again.",
        icon: "alert-circle",
        color: "#F87171", // Red
        tag: "CRITICAL"
      };
    } else if (percentage < 50) {
      return {
        title: "Good Progress",
        subtitle: `You secured ${correct} correct answers. A decent start, but more consistency is required.`,
        icon: "trending-up",
        color: "#F59E0B", // Orange/Amber
        tag: "DEVELOPING"
      };
    } else {
      return {
        title: "Solid Performance",
        subtitle: `Exceptional work with ${correct}/${total} correct. Your foundation in this topic is now solid.`,
        icon: "shield-checkmark",
        color: "#4ADE80", // Green
        tag: "MASTERED"
      };
    }
  };

  const performance = getPerformanceData();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.content}>
        
        {/* 1. Dynamic Status Badge */}
        <Animatable.View animation="fadeIn" style={[styles.statusBadge, { backgroundColor: `${performance.color}15` }]}>
          <Text style={[styles.statusTag, { color: performance.color }]}>{performance.tag}</Text>
        </Animatable.View>

        {/* 2. Tactical Icon Visual */}
        <Animatable.View 
          animation="zoomIn" 
          duration={1000} 
          style={styles.heroContainer}
        >
          <View style={[styles.iconCircle, { borderColor: `${performance.color}40` }]}>
             <Ionicons name={performance.icon as any} size={60} color={performance.color} />
          </View>
        </Animatable.View>

        {/* 3. Conditional Messaging */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.textBlock}>
          <Text style={styles.victoryTitle}>{performance.title}</Text>
          <Text style={styles.victorySubtitle}>{performance.subtitle}</Text>
        </Animatable.View>

        {/* 4. Core Metrics */}
        <Animatable.View animation="fadeInUp" delay={700} style={styles.statsBar}>
          <View style={styles.statBox}>
             <Text style={styles.statLabel}>CORRECT</Text>
             <Text style={[styles.statValue, { color: performance.color }]}>{correct} Qs</Text>
          </View>
          <View style={styles.vDivider} />
          <View style={styles.statBox}>
             <Text style={styles.statLabel}>AVG. SPEED</Text>
             <Text style={styles.statValue}>12 Seconds</Text>
          </View>
        </Animatable.View>

        {/* 5. Action Footer */}
        <Animatable.View animation="fadeInUp" delay={1000} style={styles.footer}>
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => router.push('/quiz/launchpad')}
            style={styles.mainBtn}
          >
            <LinearGradient 
              colors={["#1A237E", "#3949AB"]} 
              start={{x:0, y:0}} end={{x:1, y:0}} 
              style={styles.btnGradient}
            >
              <Text style={styles.btnText}>Analyze Remaining Logic</Text>
              <Ionicons name="analytics-outline" size={20} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/')} style={styles.exitBtn}>
            <Text style={styles.exitText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </Animatable.View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE', justifyContent: 'center' },
  content: { alignItems: 'center', paddingHorizontal: 35 },

  statusBadge: { paddingHorizontal: 15, paddingVertical: 6, borderRadius: 10, marginBottom: 20 },
  statusTag: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },

  iconCircle: { 
    width: 130, height: 130, borderRadius: 65, 
    backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center',
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15,
    borderWidth: 2
  },
  heroContainer: { marginBottom: 35 },

  textBlock: { alignItems: 'center', marginBottom: 40 },
  victoryTitle: { fontSize: 30, fontWeight: '900', color: '#1A237E', textAlign: 'center' },
  victorySubtitle: { fontSize: 15, color: '#64748B', textAlign: 'center', lineHeight: 24, marginTop: 12, fontWeight: '600' },

  statsBar: { 
    flexDirection: 'row', backgroundColor: '#FFF', paddingVertical: 20, borderRadius: 24,
    borderWidth: 1, borderColor: '#E8EAF6', width: '100%', marginBottom: 50
  },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1 },
  statValue: { fontSize: 18, fontWeight: '900', color: '#1A237E', marginTop: 4 },
  vDivider: { width: 1, height: 30, backgroundColor: '#E8EAF6' },

  footer: { width: '100%' },
  mainBtn: { borderRadius: 22, overflow: 'hidden', elevation: 10 },
  btnGradient: { flexDirection: 'row', paddingVertical: 20, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '900', fontSize: 15, marginRight: 10 },
  exitBtn: { marginTop: 25, alignSelf: 'center' },
  exitText: { color: '#94A3B8', fontSize: 13, fontWeight: '800' }
});