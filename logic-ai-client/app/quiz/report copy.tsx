import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

export default function FinalReport() {
  const router = useRouter();
  const { topic } = useLocalSearchParams();

  // --- PERFORMANCE DATA ---
  const report = {
    accuracy: 85,
    metrics: [
      { label: "Correct", value: 8, color: "#4ADE80", icon: "checkmark-circle" },
      { label: "Slow", value: 2, color: "#F59E0B", icon: "hourglass" },
      { label: "Incorrect", value: 1, color: "#EF4444", icon: "close-circle" },
      { label: "Skipped", value: 1, color: "#94A3B8", icon: "arrow-forward-circle" },
    ],
    aiInsights: [
      { title: "Velocity Win", desc: "Avg response time dropped to 12s/Q.", icon: "flash", color: "#3B82F6" },
      { title: "Pattern Mastery", desc: "Number Series logic is now 100% accurate.", icon: "trophy", color: "#F59E0B" },
      { title: "Critical Risk", desc: "Complex Seating logic still requires 2m+.", icon: "warning", color: "#EF4444" },
    ],
  };

  const history = [
    { id: 3, date: "24 Apr", acc: 75, status: "Improved", color: "#4ADE80", icon: "trending-up" },
    { id: 2, date: "20 Apr", acc: 55, status: "Stable", color: "#F59E0B", icon: "remove-circle" },
    { id: 1, date: "15 Apr", acc: 60, status: "Dropped", color: "#EF4444", icon: "trending-down" },
  ];

  const isImproving = report.accuracy >= history[0].acc;
  const themeColor = isImproving ? "#22C55E" : "#EF4444";

  // Tactical Haptic Feedback on Mount
  useEffect(() => {
    Haptics.notificationAsync(
      isImproving ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* 1. STRATEGIC HEADER */}
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Text style={styles.tagline}>OPERATIONAL DEBRIEF • {topic || 'GENERAL STUDIES'}</Text>
          <Text style={styles.reportTitle}>Mission Result</Text>
          <View style={[styles.statusPill, { backgroundColor: isImproving ? "#DCFCE7" : "#FEE2E2" }]}>
            <Ionicons name={isImproving ? "trending-up" : "alert-circle"} size={14} color={themeColor} />
            <Text style={[styles.statusText, { color: themeColor }]}>
              {isImproving ? "PERFORMANCE CLIMBING" : "CONCEPT DRIFT DETECTED"}
            </Text>
          </View>
        </Animatable.View>

        {/* 2. PERFORMANCE MATRIX CARD */}
        <Animatable.View animation="zoomIn" duration={800} style={styles.mainCard}>
          <View style={styles.scoreRow}>
            <View>
              <Text style={styles.bigScore}>{report.accuracy}%</Text>
              <Text style={styles.scoreLabel}>Final Accuracy</Text>
            </View>
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>vs Previous</Text>
              <Text style={[styles.diffText, { color: themeColor }]}>
                {isImproving ? `+${report.accuracy - history[0].acc}%` : `${report.accuracy - history[0].acc}%`}
              </Text>
            </View>
          </View>

          {/* Tactical Grid with Circular Icons */}
          <View style={styles.metricsGrid}>
            {report.metrics.map((m, i) => (
              <View key={i} style={styles.metricItem}>
                <View style={[styles.iconCircle, { backgroundColor: `${m.color}15` }]}>
                    <Ionicons name={m.icon as any} size={18} color={m.color} />
                </View>
                <Text style={[styles.metricVal, { color: m.color }]}>{m.value}</Text>
                <Text style={styles.metricLab}>{m.label}</Text>
              </View>
            ))}
          </View>
        </Animatable.View>

        {/* 3. AI STRATEGIC INSIGHTS (Glass Effect) */}
        <Text style={styles.sectionTitle}>AI Strategic Insights</Text>
        <View style={styles.aiGrid}>
          {report.aiInsights.map((insight, idx) => (
            <Animatable.View animation="fadeInUp" delay={idx * 150} key={idx} style={styles.aiCard}>
               <LinearGradient 
                colors={[`${insight.color}15`, '#FFFFFF']} 
                start={{x:0, y:0}} end={{x:1, y:0}} 
                style={styles.aiCardGradient}
               >
                  <View style={[styles.aiIconBox, { backgroundColor: insight.color }]}>
                      <Ionicons name={insight.icon as any} size={18} color="#FFF" />
                  </View>
                  <View style={styles.aiTextContent}>
                      <Text style={styles.aiCardTitle}>{insight.title}</Text>
                      <Text style={styles.aiCardDesc}>{insight.desc}</Text>
                  </View>
               </LinearGradient>
            </Animatable.View>
          ))}
        </View>

        {/* 4. TRAJECTORY JOURNEY */}
        <Text style={styles.sectionTitle}>Preparation Journey</Text>
        <View style={styles.aiGrid}>
          {history.map((item, idx) => (
            <Animatable.View 
              animation="fadeInUp" 
              delay={400 + (idx * 150)} 
              key={item.id} 
              style={styles.historyItem}
            >
               <View style={[styles.historyIndicator, { backgroundColor: item.color }]} />
               <View style={styles.historyContent}>
                  <View>
                    <Text style={styles.historyDate}>{item.date} • Attempt #{item.id}</Text>
                    <Text style={styles.historySub}>Status: <Text style={{color: item.color, fontWeight: '800'}}>{item.status}</Text></Text>
                  </View>
                  <View style={styles.historyRight}>
                    <Text style={styles.historyScore}>{item.acc}%</Text>
                    <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
                  </View>
               </View>
            </Animatable.View>
          ))}
        </View>

        {/* 5. PRIMARY ACTIONS */}
        <TouchableOpacity 
          style={styles.downloadBtn} 
          activeOpacity={0.8}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        >
          <LinearGradient colors={['#1A237E', '#3949AB']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.gradBtn}>
            <Ionicons name="cloud-download" size={20} color="#FFF" />
            <Text style={styles.btnText}>Export Comprehensive PDF</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/')} style={styles.homeBtn}>
          <Text style={styles.homeText}>Return to Command Center</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FE" },
  content: { padding: 25, paddingBottom: 60 },

  // Header
  header: { marginTop: 30, marginBottom: 25 },
  tagline: { fontSize: 10, fontWeight: "900", color: "#94A3B8", letterSpacing: 1.5 },
  reportTitle: { fontSize: 32, fontWeight: "900", color: "#1A237E" },
  statusPill: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginTop: 10 },
  statusText: { fontSize: 10, fontWeight: "900", marginLeft: 6, letterSpacing: 0.5 },

  // Main Card
  mainCard: { backgroundColor: "#FFF", borderRadius: 32, padding: 25, elevation: 12, shadowColor: "#1A237E", shadowOpacity: 0.12, shadowRadius: 20 },
  scoreRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  bigScore: { fontSize: 52, fontWeight: "900", color: "#1A237E" },
  scoreLabel: { fontSize: 12, color: "#94A3B8", fontWeight: "700" },
  vsContainer: { alignItems: "flex-end" },
  vsText: { fontSize: 11, color: "#94A3B8", fontWeight: "800" },
  diffText: { fontSize: 20, fontWeight: "900", marginTop: 2 },

  // Tactical Grid
  metricsGrid: { flexDirection: "row", justifyContent: "space-between", marginTop: 25, borderTopWidth: 1, borderTopColor: "#F1F3F9", paddingTop: 20 },
  metricItem: { alignItems: "center", width: "22%" },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  metricVal: { fontSize: 18, fontWeight: "900" },
  metricLab: { fontSize: 8, fontWeight: "800", color: "#94A3B8", textTransform: "uppercase", marginTop: 4 },

  // AI Insights
  sectionTitle: { fontSize: 18, fontWeight: "900", color: "#1A237E", marginTop: 40, marginBottom: 20 },
  aiGrid: { gap: 12 },
  aiCard: { backgroundColor: '#FFF', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#F1F3F9', elevation: 2 },
  aiCardGradient: { flexDirection: 'row', padding: 16, alignItems: 'center' },
  aiIconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  aiTextContent: { flex: 1, marginLeft: 15 },
  aiCardTitle: { fontSize: 14, fontWeight: "800", color: "#1A237E" },
  aiCardDesc: { fontSize: 12, color: "#64748B", fontWeight: "600", marginTop: 2 },

  // History Items
  historyItem: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 20, overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: '#F1F3F9' },
  historyIndicator: { width: 6 },
  historyContent: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  historyDate: { fontSize: 14, fontWeight: '800', color: '#1A237E' },
  historySub: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  historyRight: { flexDirection: 'row', alignItems: 'center' },
  historyScore: { fontSize: 20, fontWeight: '900', color: '#1A237E', marginRight: 10 },

  // Buttons
  downloadBtn: { marginTop: 40, borderRadius: 22, overflow: "hidden", elevation: 10 },
  gradBtn: { paddingVertical: 22, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  btnText: { color: "#FFF", fontWeight: "900", fontSize: 16, marginLeft: 10 },
  homeBtn: { marginTop: 25, alignSelf: "center", padding: 10 },
  homeText: { color: "#94A3B8", fontSize: 14, fontWeight: "800" },
});