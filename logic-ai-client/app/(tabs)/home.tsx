import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

export default function Home() {

  const data = {
    user: "Trilochan",
    currentAccuracy: 62,
    targetAccuracy: 80,
    rankCredits: 9200,
    totalQs: 1840,
    hours: 42.5,
    // Attempt scores for the Momentum Chart
    attempts: [45, 52, 65, 58, 72],
    accuracy: 62,
    target: 80,
    solved: 1840,
    readiness: 74,
  };

  const ANALYTICS_DATA = {
    skillMap: [
      {
        id: "strength",
        label: "Strength Zone",
        icon: "flash",
        color: "#10B981",
        desc: "Attempt First",
        topics: [
          {
            name: "Syllogism",
            current: 94,
            started: 60,
            speed: "12s",
            skip: "2%",
          },
          {
            name: "Simplification",
            current: 92,
            started: 55,
            speed: "15s",
            skip: "1%",
          },
        ],
      },
      {
        id: "growth",
        label: "Growth Zone",
        icon: "trending-up",
        color: "#3B82F6",
        desc: "Needs Polish",
        topics: [
          {
            name: "Arithmetic",
            current: 72,
            started: 40,
            speed: "45s",
            skip: "8%",
          },
          {
            name: "Data Interpretation",
            current: 68,
            started: 35,
            speed: "50s",
            skip: "12%",
          },
        ],
      },
      {
        id: "risk",
        label: "Risk Zone",
        icon: "alert-circle",
        color: "#F59E0B",
        desc: "High Error Rate",
        topics: [
          {
            name: "Ratios",
            current: 45,
            started: 40,
            speed: "18s",
            skip: "5%",
          },
        ],
      },
      {
        id: "roi",
        label: "Low ROI Zone",
        icon: "hand-left",
        color: "#EF4444",
        desc: "Attempt Last",
        topics: [
          {
            name: "Probability",
            current: 30,
            started: 25,
            speed: "80s",
            skip: "40%",
          },
        ],
      },
    ],
    benchmarks: [
      { label: "Accuracy", user: 72, goal: 85 },
      { label: "Velocity", user: 90, goal: 75 },
      { label: "Consistency", user: 95, goal: 80 },
    ],
    mistakes: [
      { label: "Careless Error", value: 65, icon: "eye-off-outline" },
      { label: "Concept Gap", value: 22, icon: "extension-puzzle-outline" },
      { label: "Time Pressure", value: 13, icon: "timer-outline" },
    ],
    strategy: [
      {
        level: "Attempt First",
        topics: "Reasoning, Syllogism",
        color: "#10B981",
      },
      {
        level: "Medium Priority",
        topics: "Arithmetic, Grammar",
        color: "#3B82F6",
      },
      {
        level: "Careful Attempt",
        topics: "Reading Comp, DI",
        color: "#F59E0B",
      },
      {
        level: "Last Priority",
        topics: "Probability, Puzzles",
        color: "#EF4444",
      },
    ],
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Header Section */}
      <View style={styles.topSection}>
        <View>
          <Text style={styles.welcomeText}>Hello, {data.user}</Text>
          <Text style={styles.subWelcome}>Let's smash today's goals.</Text>
        </View>
        <TouchableOpacity style={styles.notifBadge}>
          <Ionicons name="notifications-outline" size={24} color="#1A237E" />
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>

      {/* 2. Rank & Level */}
      <View style={styles.infoRow}>
        <View style={styles.levelBadge}>
          <Ionicons name="ribbon" size={14} color="#1A237E" />
          <Text style={styles.levelText}>Level 12 • Pro II</Text>
        </View>
        <Text style={styles.idText}>#2026_TRIL</Text>
      </View>

      {/* 3. Mastery Nexus Sphere */}
      <View style={styles.masteryContainer}>
        <View style={styles.sphereOuter}>
          <View style={[styles.sphereRing, styles.targetRing]} />
          <LinearGradient
            colors={["rgba(26, 35, 126, 0.1)", "rgba(26, 35, 126, 0.05)"]}
            style={[styles.sphereRing, styles.growthRing]}
          />
          <View style={styles.sphereCore}>
            <LinearGradient
              colors={["#1A237E", "#3949AB"]}
              style={styles.coreGradient}
            >
              <Text style={styles.coreVal}>{data.accuracy}%</Text>
              <Text style={styles.coreLab}>ACCURACY</Text>
            </LinearGradient>
          </View>
          <View style={[styles.dataNode, { top: 0, left: 20 }]}>
            <Text style={styles.nodeV}>{data.solved}</Text>
            <Text style={styles.nodeL}>SOLVED</Text>
          </View>
          <View style={[styles.dataNode, { bottom: 20, right: 0 }]}>
            <Text style={styles.nodeV}>{data.hours}h</Text>
            <Text style={styles.nodeL}>PRACTICE</Text>
          </View>
        </View>
      </View>

      {/* 4. Global Performance Strip */}
      <View style={styles.statsStrip}>
        <View style={styles.stripItem}>
          <Ionicons name="flash" size={16} color="#F59E0B" />
          <Text style={styles.stripTextRC}>{data.rankCredits} Rank credit</Text>
        </View>
        <View style={styles.vDivider} />
        <View style={styles.stripItem}>
          <Ionicons name="trophy" size={16} color="#1A237E" />
          <Text style={styles.stripText}>Rank: Pro II</Text>
        </View>
      </View>


      {/* 4. Tactical Mission Slot (NEW) */}
      <TouchableOpacity style={styles.missionCard}>
        <LinearGradient
          colors={["#1A237E", "#283593"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.missionGradient}
        >
          <Ionicons name="rocket" size={20} color="#F59E0B" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.missionTitle}>NEXT MISSION</Text>
            <Text style={styles.missionDesc}>
              Improve Ratio & Prop. (A4 Accuracy Low)
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={16}
            color="#FFF"
            style={{ marginLeft: "auto" }}
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* 3. AI STRATEGIC DEBRIEF */}
      <Animatable.View animation="fadeInDown">
        <LinearGradient
          colors={["#1A237E", "#311B92"]}
          style={styles.briefCard}
        >
          <View style={styles.briefHeader}>
            <Ionicons name="sparkles" size={16} color="#4ADE80" />
            <Text style={styles.briefTitle}>AI PERFORMANCE DEBRIEF</Text>
          </View>
          <Text style={styles.briefText}>
            "Operative, your{" "}
            <Text style={styles.highlight}>Logic Stability</Text> has reached a
            critical peak of 94%. We've detected a velocity surge in Arithmetic.
            Trajectory puts you in the{" "}
            <Text style={styles.highlight}>Top 3%</Text> for the 2026 cycle."
          </Text>
          <View style={styles.confMeter}>
            <Text style={styles.confLab}>AI CONFIDENCE</Text>
            <View style={styles.confTrack}>
              <View style={[styles.confFill, { width: "88%" }]} />
            </View>
            <Text style={styles.confVal}>88%</Text>
          </View>
        </LinearGradient>
      </Animatable.View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeader}>CAPABILITY PARAMETERS</Text>
          <Ionicons name="options-outline" size={16} color="#94A3B8" />
        </View>
        <View style={styles.bentoGrid}>
          {[
            {
              title: "Quant",
              sub: "Calculations",
              perc: 92,
              col: "#10B981",
              icon: "calculator",
            },
            {
              title: "Logic",
              sub: "Reasoning",
              perc: 65,
              col: "#F59E0B",
              icon: "git-branch",
            },
            {
              title: "Verbal",
              sub: "Language",
              perc: 40,
              col: "#EF4444",
              icon: "text",
            },
            {
              title: "GS",
              sub: "Awareness",
              perc: 15,
              col: "#94A3B8",
              icon: "globe",
            },
          ].map((item, i) => (
            <View key={i} style={styles.bentoCard}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: `${item.col}10` },
                ]}
              >
                <Ionicons name={item.icon as any} size={18} color={item.col} />
              </View>
              <Text style={styles.bentoTitle}>{item.title}</Text>
              <Text style={styles.bentoSub}>{item.sub}</Text>
              <View style={styles.bentoFooter}>
                <Text style={[styles.bentoPerc, { color: item.col }]}>
                  {item.perc}%
                </Text>
                <View style={styles.miniProgress}>
                  <View
                    style={[
                      styles.miniFill,
                      { width: `${item.perc}%`, backgroundColor: item.col },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 6. EXAM STRATEGY ENGINE */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>EXAM STRATEGY ENGINE</Text>
        <LinearGradient
          colors={["#1A237E", "#3949AB"]}
          style={styles.strategyCard}
        >
          {ANALYTICS_DATA.strategy.map((s, i) => (
            <View key={i} style={styles.stratRow}>
              <View
                style={[styles.stratIndicator, { backgroundColor: s.color }]}
              />
              <View>
                <Text style={styles.stratLevel}>{s.level.toUpperCase()}</Text>
                <Text style={styles.stratTopics}>{s.topics}</Text>
              </View>
            </View>
          ))}
        </LinearGradient>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FE", paddingHorizontal: 20 },
  idText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  welcomeText: { fontSize: 26, fontWeight: "800", color: "#1A237E" },
  subWelcome: { fontSize: 15, color: "#666", marginTop: 4 },
  notifBadge: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  dot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF5252",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8EAF6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1A237E",
    marginLeft: 5,
  },
  masteryContainer: { alignItems: "center", marginVertical: 20 },
  sphereOuter: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  sphereRing: { position: "absolute", borderRadius: 1000 },
  targetRing: {
    width: 220,
    height: 220,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
  },
  growthRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderColor: "rgba(26, 35, 126, 0.1)",
  },
  sphereCore: {
    width: 120,
    height: 120,
    borderRadius: 60,
    elevation: 15,
    shadowColor: "#1A237E",
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  coreGradient: {
    flex: 1,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  coreVal: { color: "#FFF", fontSize: 32, fontWeight: "900" },
  coreLab: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
  dataNode: {
    position: "absolute",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    shadowOpacity: 0.05,
    alignItems: "center",
    minWidth: 70,
  },
  nodeV: { fontSize: 14, fontWeight: "900", color: "#1A237E" },
  nodeL: { fontSize: 8, fontWeight: "700", color: "#94A3B8" },
  statsStrip: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 18,
    elevation: 2,
    marginBottom: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  stripItem: { flexDirection: "row", alignItems: "center" },
  stripText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  stripTextRC: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "700",
    color: "#F59E0B",
  },
  vDivider: { width: 1, height: 20, backgroundColor: "#F1F5F9" },
  header: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 15 },
  cardWrapper: { marginBottom: 18 },
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    elevation: 2,
  },
  cardContent: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  textDetails: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 18, fontWeight: "800", color: "#1A237E" },
  cardSubText: {
    fontSize: 13,
    color: "#5C6BC0",
    marginTop: 2,
    fontWeight: "500",
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  // Momentum Styles
  momentumCard: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 20,
    elevation: 4,
    shadowColor: "#1A237E",
    shadowOpacity: 0.05,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  chartSub: { fontSize: 12, fontWeight: "600", color: "#94A3B8" },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3F51B5",
    marginRight: 6,
  },
  liveText: { fontSize: 9, fontWeight: "800", color: "#3F51B5" },
  barChartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 160,
    paddingBottom: 10,
  },
  barCol: { alignItems: "center", width: 45 },
  thickBar: { width: 22, backgroundColor: "#1A237E", borderRadius: 6 },
  varianceText: { fontSize: 10, fontWeight: "800", marginBottom: 8 },
  barLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    marginTop: 10,
  },
  // Mission Card
  missionCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 5,
    elevation: 4,
  },
  missionGradient: { padding: 16, flexDirection: "row", alignItems: "center" },
  missionTitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  missionDesc: { color: "#FFF", fontSize: 12, fontWeight: "700", marginTop: 2 },

  // Readiness
  readinessModule: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 24,
    marginBottom: 30,
  },
  moduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  moduleTitle: { fontSize: 16, fontWeight: "800", color: "#1A237E" },
  readinessVal: { fontSize: 22, fontWeight: "900", color: "#22C55E" },
  progressTrack: { height: 8, backgroundColor: "#F1F5F9", borderRadius: 4 },
  progressFill: { height: "100%", borderRadius: 4 },
  footerNote: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 12,
    fontWeight: "600",
  },

  // AI Insight
  insightCard: {
    backgroundColor: "#F0F2FF",
    padding: 20,
    borderRadius: 24,
    marginBottom: 25,
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  insightTitle: {
    fontSize: 10,
    fontWeight: "900",
    color: "#3949AB",
    letterSpacing: 1,
  },
  insightBody: { fontSize: 13, color: "#475569", lineHeight: 20 },
  boldText: { fontWeight: "900", color: "#1A237E" },
  warnText: { fontWeight: "900", color: "#EF4444" },

  // Brief Card
  briefCard: {
    padding: 25,
    borderRadius: 20,
    elevation: 10,
    shadowColor: "#1A237E",
    shadowOpacity: 0.3,
  },
  briefHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },
  briefTitle: {
    color: "#4ADE80",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  briefText: {
    color: "#E0E7FF",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
  },
  highlight: {
    color: "#FFF",
    fontWeight: "900",
    textDecorationLine: "underline",
  },
  confMeter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  confLab: { color: "rgba(255,255,255,0.5)", fontSize: 8, fontWeight: "900" },
  confTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 2,
  },
  confFill: { height: "100%", backgroundColor: "#4ADE80", borderRadius: 2 },
  confVal: { color: "#4ADE80", fontSize: 10, fontWeight: "900" },

  sectionLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  strategyCard: { padding: 25, borderRadius: 28 },
  stratRow: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  stratIndicator: { width: 4, height: 30, borderRadius: 2, marginRight: 15 },
  stratLevel: {
    fontSize: 9,
    fontWeight: "900",
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 1,
  },
  stratTopics: { fontSize: 14, fontWeight: "700", color: "#FFF", marginTop: 2 },

  // Bento Grid
  section: { paddingHorizontal: 8, marginTop: 15 },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "900",
    color: "#1A237E",
    letterSpacing: 1.5,
  },
  bentoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  bentoCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  bentoTitle: { fontSize: 14, fontWeight: "800", color: "#1A237E" },
  bentoSub: { fontSize: 10, color: "#94A3B8", fontWeight: "700", marginTop: 2 },
  bentoFooter: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bentoPerc: { fontSize: 13, fontWeight: "900" },
  miniProgress: {
    width: 35,
    height: 4,
    backgroundColor: "#F1F5F9",
    borderRadius: 2,
  },
  miniFill: { height: "100%", borderRadius: 2 },
  strategyText: { marginLeft: 20, flex: 1 },
  stratTitle: { color: "#FFF", fontSize: 15, fontWeight: "900" },
  stratSub: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },
});
