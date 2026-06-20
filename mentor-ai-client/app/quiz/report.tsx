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

const { height } = Dimensions.get("window");

export default function FinalReport() {
  const router = useRouter();
  const { topic } = useLocalSearchParams();

  const report = {
    accuracy: 85,
    metrics: [
      {
        label: "Correct",
        value: 8,
        color: "#4ADE80",
        icon: "checkmark-circle",
      },
      { label: "Slow", value: 2, color: "#F59E0B", icon: "hourglass" },
      { label: "Incorrect", value: 1, color: "#EF4444", icon: "close-circle" },
      {
        label: "Skipped",
        value: 1,
        color: "#94A3B8",
        icon: "arrow-forward-circle",
      },
    ],
    aiInsights: [
      {
        title: "Velocity Win",
        desc: "Average response time dropped to 12s/Q.",
        icon: "flash",
        color: "#3B82F6",
      },
      {
        title: "Pattern Mastery",
        desc: "Number Series logic is now 100% accurate.",
        icon: "trophy",
        color: "#F59E0B",
      },
      {
        title: "Critical Risk",
        desc: "Complex Seating logic still requires 2m+.",
        icon: "warning",
        color: "#EF4444",
      },
    ],
  };

  const history = [
    {
      id: 3,
      date: "24 Apr",
      acc: 75,
      status: "Improved",
      color: "#4ADE80",
      icon: "trending-up",
    },
    {
      id: 2,
      date: "20 Apr",
      acc: 55,
      status: "Stable",
      color: "#F59E0B",
      icon: "remove-circle",
    },
    {
      id: 1,
      date: "15 Apr",
      acc: 60,
      status: "Dropped",
      color: "#EF4444",
      icon: "trending-down",
    },
  ];

  const isImproving = report.accuracy >= history[0].acc;
  const themeColor = isImproving ? "#22C55E" : "#EF4444";

  // Trigger haptic on mount for "Mission Success" feel
  useEffect(() => {
    Haptics.notificationAsync(
      isImproving
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Warning,
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* 1. DYNAMIC HEADER */}
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Text style={styles.tagline}>OPERATIONAL DEBRIEF</Text>
          <Text style={styles.reportTitle}>Final Performance</Text>
          <View
            style={[
              styles.statusPill,
              { backgroundColor: isImproving ? "#DCFCE7" : "#FEE2E2" },
            ]}
          >
            <Ionicons
              name={isImproving ? "trending-up" : "alert-circle"}
              size={14}
              color={themeColor}
            />
            <Text style={[styles.statusText, { color: themeColor }]}>
              {isImproving ? "IMPROVEMENT DETECTED" : "PERFORMANCE DEGRADED"}
            </Text>
          </View>
        </Animatable.View>

        {/* 2. MAIN GROWTH CARD (Glass-style) */}
        <Animatable.View
          animation="zoomIn"
          duration={800}
          style={styles.mainCard}
        >
          <View style={styles.scoreRow}>
            <View>
              <Text style={styles.bigScore}>{report.accuracy}%</Text>
              <Text style={styles.scoreLabel}>Current Accuracy</Text>
            </View>
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>vs Last Attempt</Text>
              <Text style={[styles.diffText, { color: themeColor }]}>
                {isImproving
                  ? `+${report.accuracy - history[0].acc}%`
                  : `${report.accuracy - history[0].acc}%`}
              </Text>
            </View>
          </View>

          {/* Tactical Metrics Grid */}
          <View style={styles.metricsGrid}>
            {report.metrics.map((m, i) => (
              <View key={i} style={styles.metricItem}>
                {/* Added Icon here as requested */}
                <Ionicons name={m.icon as any} size={20} color={m.color} />
                <Text style={[styles.metricVal, { color: m.color }]}>
                  {m.value}
                </Text>
                <Text style={styles.metricLab}>{m.label}</Text>
              </View>
            ))}
          </View>
        </Animatable.View>

        {/* 3. AI STRATEGIC SUMMARY (Coach Mode) */}
        <Animatable.View
          animation="fadeInUp"
          delay={400}
          style={[styles.aiSummary, { borderLeftColor: themeColor }]}
        >
          <View style={styles.aiHeader}>
            <Ionicons name="sparkles" size={16} color="#1A237E" />
            <Text style={styles.aiTitle}>AI STRATEGIC INSIGHTS</Text>
          </View>
          <Text style={styles.aiMessage}>
            {isImproving
              ? `You saved **3m 15s** compared to Attempt #3. Your 'Price-Quantity' logic is now elite. Suggestion: Focus on harder Permutation questions next.`
              : `Your accuracy dropped in the final 5 questions. This indicates "Mental Fatigue." Review the 'Skipped' logic before your next attempt.`}
          </Text>
        </Animatable.View>

        <Text style={styles.sectionTitle}>AI Strategic Insights</Text>
        <View style={styles.aiGrid}>
          {report.aiInsights.map((insight, idx) => (
            <Animatable.View
              animation="fadeInUp"
              delay={idx * 150}
              key={idx}
              style={styles.aiCard}
            >
              <View
                style={[
                  styles.aiIconBox,
                  { backgroundColor: `${insight.color}15` },
                ]}
              >
                <Ionicons
                  name={insight.icon as any}
                  size={20}
                  color={insight.color}
                />
              </View>
              <View style={styles.aiTextContent}>
                <Text style={styles.aiCardTitle}>{insight.title}</Text>
                <Text style={styles.aiCardDesc}>{insight.desc}</Text>
              </View>
            </Animatable.View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Last 3 Attempts Trajectory</Text>
        <View style={styles.aiGrid}>
          {history.map((item, idx) => (
            <Animatable.View
              animation="fadeInUp"
              delay={400 + idx * 150}
              key={item.id}
              style={styles.aiCard}
            >
              <View
                style={[
                  styles.aiIconBox,
                  { backgroundColor: `${item.color}15` },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={item.color}
                />
              </View>
              <View style={styles.aiTextContent}>
                <Text style={styles.aiCardTitle}>
                  {item.date} • Attempt #{item.id}
                </Text>
                <Text style={styles.aiCardDesc}>
                  Accuracy: {item.acc}% • Status: {item.status}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
            </Animatable.View>
          ))}
        </View>

        {/* 5. DOWNLOAD ACTION */}
        <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8}>
          <LinearGradient
            colors={["#1A237E", "#3949AB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradBtn}
          >
            <Ionicons name="cloud-download" size={20} color="#FFF" />
            <Text style={styles.btnText}>Export Comprehensive PDF</Text>
          </LinearGradient>
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
  tagline: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 1.5,
  },
  reportTitle: { fontSize: 32, fontWeight: "900", color: "#1A237E" },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "900",
    marginLeft: 6,
    letterSpacing: 0.5,
  },

  // Main Card
  mainCard: {
    backgroundColor: "#FFF",
    borderRadius: 32,
    padding: 25,
    elevation: 12,
    shadowColor: "#1A237E",
    shadowOpacity: 0.12,
    shadowRadius: 20,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bigScore: { fontSize: 52, fontWeight: "900", color: "#1A237E" },
  scoreLabel: { fontSize: 12, color: "#94A3B8", fontWeight: "700" },
  vsContainer: { alignItems: "flex-end" },
  vsText: { fontSize: 11, color: "#94A3B8", fontWeight: "800" },
  diffText: { fontSize: 20, fontWeight: "900", marginTop: 2 },

  metricsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: "#F1F3F9",
    paddingTop: 20,
  },
  metricItem: { alignItems: "center", width: "22%" },
  metricVal: { fontSize: 20, fontWeight: "900" },
  metricLab: {
    fontSize: 8,
    fontWeight: "800",
    color: "#94A3B8",
    textTransform: "uppercase",
    marginTop: 4,
  },

  // AI Summary
  aiSummary: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 24,
    borderLeftWidth: 6,
    marginTop: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
  },
  aiHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  aiTitle: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 1,
    marginLeft: 8,
  },
  aiMessage: {
    fontSize: 14,
    color: "#1A237E",
    lineHeight: 22,
    fontWeight: "600",
  },

  // Timeline
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1A237E",
    marginTop: 40,
    marginBottom: 20,
  },
  timelineContainer: { paddingLeft: 5 },
  timelineRow: { flexDirection: "row" },
  timelineLeft: { width: 70, alignItems: "center" },
  timelineDate: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94A3B8",
    marginBottom: 8,
  },
  timelinePoint: { alignItems: "center", flex: 1 },
  outerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  innerCircle: { width: 8, height: 8, borderRadius: 4 },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E2E8F0",
    marginTop: -2,
  },

  timelineCard: {
    flex: 1,
    backgroundColor: "#FFF",
    marginLeft: 15,
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F1F3F9",
  },
  timelineAcc: { fontSize: 18, fontWeight: "900", color: "#1A237E" },
  timelineStatus: { fontSize: 10, fontWeight: "800", color: "#94A3B8" },
  miniGraph: {
    width: 50,
    height: 6,
    backgroundColor: "#F1F3F9",
    borderRadius: 3,
    overflow: "hidden",
  },
  graphBar: { height: "100%" },

  // Buttons
  primaryBtn: {
    marginTop: 40,
    borderRadius: 22,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#1A237E",
    shadowOpacity: 0.3,
  },
  gradBtn: {
    paddingVertical: 22,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { color: "#FFF", fontWeight: "900", fontSize: 16, marginLeft: 10 },
  backBtn: { marginTop: 25, alignSelf: "center", padding: 10 },
  backText: { color: "#94A3B8", fontSize: 14, fontWeight: "800" },

  aiGrid: { gap: 12 },
  aiCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F3F9",
  },
  aiIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  aiTextContent: { flex: 1, marginLeft: 15 },
  aiCardTitle: { fontSize: 14, fontWeight: "800", color: "#1A237E" },
  aiCardDesc: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
    marginTop: 2,
  },

  downloadBtn: { marginTop: 40, borderRadius: 20, overflow: "hidden" },

  homeBtn: { marginTop: 25, alignSelf: "center" },
  homeText: { color: "#94A3B8", fontSize: 14, fontWeight: "800" },
});
