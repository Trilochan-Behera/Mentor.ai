import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();

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
  };

  const subjects = [
    {
      id: "QA",
      title: "Quantitative Aptitude",
      subtitle: "Arithmetic, Algebra & Data",
      icon: "calculator",
      colors: ["#E8EAF6", "#C5CAE9"],
      accent: "#3F51B5",
    },
    {
      id: "Reasoning",
      title: "Logical Reasoning",
      subtitle: "Puzzles, Seating & Logic",
      icon: "bulb",
      colors: ["#E1F5FE", "#B3E5FC"],
      accent: "#0288D1",
    },
    {
      id: "English",
      title: "Verbal Ability",
      subtitle: "Grammar, Vocab & RC",
      icon: "book",
      colors: ["#E8F5E9", "#C8E6C9"],
      accent: "#388E3C",
    },
  ];

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

      {/* 5. Subjects List */}
      <Text style={styles.header}>Prepare by Subject</Text>
      {subjects.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.cardWrapper}
          onPress={() =>
            router.push({
              pathname: "/quiz/subtopics",
              params: { subject: item.id },
            })
          }
        >
          <View style={[styles.card, { backgroundColor: item.colors[0] }]}>
            <View style={styles.cardContent}>
              <View
                style={[styles.iconBox, { backgroundColor: item.colors[1] }]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={28}
                  color={item.accent}
                />
              </View>
              <View style={styles.textDetails}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubText}>{item.subtitle}</Text>
              </View>
              <View
                style={[styles.arrowCircle, { backgroundColor: item.accent }]}
              >
                <Ionicons name="chevron-forward" size={18} color="#FFF" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}

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

      {/* 6. NEW: Momentum Index Bar Chart */}
      <Text style={[styles.header, { marginTop: 20 }]}>Accuracy Momentum</Text>
      <View style={styles.momentumCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartSub}>Last 5 Mock Attempts</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE INDEX</Text>
          </View>
        </View>

        <View style={styles.barChartContainer}>
          {data.attempts.map((val, i) => {
            const prevVal = i > 0 ? data.attempts[i - 1] : val;
            const diff = val - prevVal;
            return (
              <View key={i} style={styles.barCol}>
                {/* Variance Label */}
                {i > 0 && (
                  <Text
                    style={[
                      styles.varianceText,
                      { color: diff >= 0 ? "#4CAF50" : "#FF5252" },
                    ]}
                  >
                    {diff >= 0 ? `+${diff}%` : `${diff}%`}
                  </Text>
                )}
                {/* Thick Blue Bar */}
                <View
                  style={[styles.thickBar, { height: (val / 100) * 120 }]}
                />
                <Text style={styles.barLabel}>A{i + 1}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={{ height: 60 }} />
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
    marginBottom: 25,
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
});
