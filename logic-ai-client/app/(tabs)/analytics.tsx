import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import CompetitiveCalibration from "@/components/CompetitiveCalibration";

const { width, height } = Dimensions.get("window");

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
        { name: "Ratios", current: 45, started: 40, speed: "18s", skip: "5%" },
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
    { level: "Careful Attempt", topics: "Reading Comp, DI", color: "#F59E0B" },
    {
      level: "Last Priority",
      topics: "Probability, Puzzles",
      color: "#EF4444",
    },
  ],
};

// --- COMPLETE ANALYTICS DATA ---
const MASTER_ANALYTICS = {
  skillMap: {
    strength: {
      label: "Strength Zone",
      desc: "Attempt First",
      color: "#10B981",
      icon: "flash",
      categories: [
        {
          name: "Quantitative Aptitude",
          topics: [
            {
              name: "Number Series",
              current: 96,
              started: 45,
              speed: "08s",
              skip: "0%",
            },
            {
              name: "Simplification",
              current: 92,
              started: 60,
              speed: "12s",
              skip: "1%",
            },
            {
              name: "Data Interpretation",
              current: 89,
              started: 40,
              speed: "18s",
              skip: "2%",
            },
          ],
        },
        {
          name: "Logical Reasoning",
          topics: [
            {
              name: "Syllogism",
              current: 98,
              started: 30,
              speed: "10s",
              skip: "0%",
            },
            {
              name: "Blood Relations",
              current: 91,
              started: 50,
              speed: "14s",
              skip: "1%",
            },
          ],
        },
      ],
    },
    growth: {
      label: "Growth Zone",
      desc: "Needs Polish",
      color: "#3B82F6",
      icon: "trending-up",
      categories: [],
    },
    risk: {
      label: "Risk Zone",
      desc: "High Error Rate",
      color: "#F59E0B",
      icon: "alert-circle",
      categories: [],
    },
    roi: {
      label: "Low ROI Zone",
      desc: "Attempt Last",
      color: "#EF4444",
      icon: "hand-left",
      categories: [],
    },
  },
  benchmarks: [
    { label: "Accuracy", user: 72, goal: 85 },
    { label: "Velocity", user: 90, goal: 75 },
    { label: "Consistency", user: 95, goal: 80 },
  ],
  mistakes: [
    { label: "Careless", val: 65, icon: "eye-off" },
    { label: "Concepts", val: 22, icon: "book" },
    { label: "Pressure", val: 13, icon: "timer" },
  ],
  attempts: [45, 52, 65, 58, 72],

  strategy: [
    {
      level: "ATTEMPT FIRST",
      topics: "Reasoning, Syllogism, Series",
      color: "#10B981",
    },
    {
      level: "CAREFUL ATTEMPT",
      topics: "Arithmetic, Grammar",
      color: "#F59E0B",
    },
    {
      level: "LAST PRIORITY",
      topics: "Probability, Complex Puzzles",
      color: "#EF4444",
    },
  ],
};

export default function IntelligenceHub() {
  const [selectedZoneKey, setSelectedZoneKey] = useState<string | null>(null);
  // Using an array to allow multiple categories to be open at once
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (name: string) => {
    if (openCategories.includes(name)) {
      setOpenCategories(openCategories.filter((cat) => cat !== name));
    } else {
      setOpenCategories([...openCategories, name]);
    }
  };

  const currentStreak = 14;
  const days = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    active: i < currentStreak, // Days completed
    isToday: i === currentStreak,
  }));

  const selectedZone = selectedZoneKey
    ? MASTER_ANALYTICS.skillMap[selectedZoneKey]
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* 1. HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>DECISION ENGINE</Text>
          <Text style={styles.headerTitle}>Intelligence Hub</Text>
        </View>

        <CompetitiveCalibration benchmarks={ANALYTICS_DATA.benchmarks} />

        {/* 3. TACTICAL SKILL MAP (Main Grid) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TACTICAL SKILL MAP</Text>
          <View style={styles.skillMapGrid}>
            {Object.keys(MASTER_ANALYTICS.skillMap).map((key) => {
              const zone = MASTER_ANALYTICS.skillMap[key];
              // Calculate total topics in this zone across all subjects
              const totalTopics = zone.categories.reduce(
                (acc, cat) => acc + cat.topics.length,
                0,
              );

              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => setSelectedZoneKey(key)}
                  style={[styles.zoneCard, { borderColor: zone.color }]}
                >
                  <View style={styles.cardHeaderRow}>
                    <Ionicons
                      name={zone.icon as any}
                      size={20}
                      color={zone.color}
                    />
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{totalTopics} topics</Text>
                    </View>
                  </View>
                  <Text style={styles.zoneLabel}>{zone.label}</Text>
                  <Text style={styles.zoneDesc}>{zone.desc}</Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.footerText}>View Details</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={10}
                      color={zone.color}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 3. CATEGORY MASTERY (Neural Segment View) */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>NEURAL DOMAIN MASTERY</Text>
            <Ionicons name="analytics" size={14} color="#94A3B8" />
          </View>

          <View style={styles.masteryContainer}>
            {[
              {
                cat: "Reasoning",
                perc: 92,
                trend: "+4%",
                col: "#10B981",
                status: "OPTIMIZED",
              },
              {
                cat: "Arithmetic",
                perc: 85,
                trend: "+12%",
                col: "#6366F1",
                status: "STABILIZING",
              },
              {
                cat: "Computer",
                perc: 78,
                trend: "+2%",
                col: "#F59E0B",
                status: "CALIBRATING",
              },
              {
                cat: "Odisha GK",
                perc: 45,
                trend: "+18%",
                col: "#EF4444",
                status: "CRITICAL",
              },
            ].map((item, i) => (
              <Animatable.View
                key={i}
                animation="fadeInRight"
                delay={i * 100}
                style={styles.neuralCard}
              >
                <View style={styles.neuralTop}>
                  <View style={styles.neuralInfo}>
                    <Text style={styles.neuralCat}>{item.cat}</Text>
                    <View
                      style={[
                        styles.statusTag,
                        { backgroundColor: item.col + "15" },
                      ]}
                    >
                      <Text style={[styles.statusTagText, { color: item.col }]}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.trendBox}>
                    <Ionicons name="trending-up" size={12} color={item.col} />
                    <Text style={[styles.trendValue, { color: item.col }]}>
                      {item.trend}
                    </Text>
                  </View>
                </View>

                <View style={styles.gaugeContainer}>
                  <View style={styles.gaugeTrack}>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={[item.col + "50", item.col]}
                      style={[styles.gaugeFill, { width: `${item.perc}%` }]}
                    />
                    {/* Percentage Marker */}
                    <View
                      style={[
                        styles.gaugeMarker,
                        { left: `${item.perc}%`, backgroundColor: item.col },
                      ]}
                    />
                  </View>
                  <Text style={[styles.percText, { color: item.col }]}>
                    {item.perc}%
                  </Text>
                </View>
              </Animatable.View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>ACCURACY MOMENTUM</Text>
            <Ionicons name="analytics" size={14} color="#94A3B8" />
          </View>
          <Text style={[styles.header, { marginTop: -60 }]}></Text>
          <View style={styles.momentumCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartSub}>Last 5 Mock Attempts</Text>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE INDEX</Text>
              </View>
            </View>

            <View style={styles.barChartContainer}>
              {MASTER_ANALYTICS?.attempts.map((val, i) => {
                const prevVal = i > 0 ? MASTER_ANALYTICS?.attempts[i - 1] : val;
                const diff = val - prevVal;
                return (
                  <View key={i} style={styles.barCol}>
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
                    <View
                      style={[styles.thickBar, { height: (val / 100) * 120 }]}
                    />
                    <Text style={styles.barLabel}>A{i + 1}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* 5. MISTAKE INTELLIGENCE */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MISTAKE INTELLIGENCE</Text>
          <View style={styles.mistakeCard}>
            {ANALYTICS_DATA.mistakes.map((m, i) => (
              <View key={i} style={styles.mistakeItem}>
                <View style={styles.mistakeCircle}>
                  <Ionicons name={m.icon as any} size={18} color="#1A237E" />
                  <Text style={styles.mistakePercent}>{m.value}%</Text>
                </View>
                <Text style={styles.mistakeLabel}>{m.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* --- DRILLDOWN MODAL --- */}
        <Modal
          visible={!!selectedZoneKey}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <Animatable.View
              animation="slideInUp"
              duration={400}
              style={styles.modalContent}
            >
              <View style={styles.modalHeader}>
                <View
                  style={[
                    styles.indicator,
                    { backgroundColor: selectedZone?.color },
                  ]}
                />
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text
                    style={[styles.modalTitle, { color: selectedZone?.color }]}
                  >
                    {selectedZone?.label?.toUpperCase()}
                  </Text>
                  <Text style={styles.modalSub}>{selectedZone?.desc}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedZoneKey(null);
                    setOpenCategories([]);
                  }}
                >
                  <Ionicons name="close-circle" size={32} color="#CBD5E1" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {selectedZone?.categories.map((cat, i) => {
                  const isOpen = openCategories.includes(cat.name);
                  return (
                    <View key={i} style={styles.categoryWrapper}>
                      <TouchableOpacity
                        style={styles.categoryHeader}
                        onPress={() => toggleCategory(cat.name)}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.categoryName}>{cat.name}</Text>
                          <Text style={styles.categoryMeta}>
                            {cat.topics.length} Strategic Topics
                          </Text>
                        </View>
                        <Ionicons
                          name={
                            !isOpen
                              ? "add-circle-outline"
                              : "remove-circle-outline"
                          }
                          size={22}
                          color="#1A237E"
                        />
                      </TouchableOpacity>

                      {isOpen && (
                        <View style={styles.topicTable}>
                          {/* TABLE HEADER RE-ADDED */}
                          <View style={styles.tableHeaderRow}>
                            <Text style={[styles.tableHeadText, { flex: 1 }]}>
                              TOPIC
                            </Text>
                            <Text
                              style={[
                                styles.tableHeadText,
                                { flex: 1, textAlign: "center" },
                              ]}
                            >
                              EVOLUTION
                            </Text>
                            <Text
                              style={[
                                styles.tableHeadText,
                                { flex: 0.4, textAlign: "right" },
                              ]}
                            >
                              SPEED
                            </Text>
                          </View>

                          {cat.topics.map((topic, idx) => (
                            <View key={idx} style={styles.topicRow}>
                              <View style={{ flex: 1 }}>
                                <Text style={styles.topicTitle}>
                                  {topic.name}
                                </Text>
                                <Text style={styles.topicSkip}>
                                  Skip: {topic.skip}
                                </Text>
                              </View>
                              <View style={styles.evoBox}>
                                <Text style={styles.evoStart}>
                                  {topic.started}%
                                </Text>
                                <Ionicons
                                  name="arrow-forward"
                                  size={10}
                                  color="#94A3B8"
                                />
                                <Text
                                  style={[
                                    styles.evoCurrent,
                                    { color: selectedZone.color },
                                  ]}
                                >
                                  {topic.current}%
                                </Text>
                              </View>
                              <Text style={styles.speedText}>
                                {topic.speed}
                              </Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  );
                })}
              </ScrollView>
            </Animatable.View>
          </View>
        </Modal>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>30-DAY CONSISTENCY STRIKE</Text>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={12} color="#F59E0B" />
              <Text style={styles.streakText}>{currentStreak} DAY STREAK</Text>
            </View>
          </View>

          <View style={styles.calendarGrid}>
            {days.map((day) => (
              <View
                key={day.id}
                style={[
                  styles.dayBox,
                  day.active && styles.dayActive,
                  day.isToday && styles.dayToday,
                ]}
              >
                {day.active ? (
                  <Ionicons name="checkmark" size={14} color="#FFF" />
                ) : (
                  <Text
                    style={[
                      styles.dayNumber,
                      day.isToday && { color: "#1A237E" },
                    ]}
                  >
                    {day.id}
                  </Text>
                )}
                {day.isToday && <View style={styles.todayIndicator} />}
              </View>
            ))}
          </View>
          <Text style={styles.calendarFooter}>
            Maintain your strike to optimize memory retention.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scroll: { paddingBottom: 40 },
  header: { padding: 25, paddingTop: 20 },
  headerLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 5,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    justifyContent: "space-between",
  },
  dayBox: {
    width: (width - 110) / 6,
    height: (width - 110) / 6,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 2,
    position: "relative",
  },
  dayActive: { backgroundColor: "#1A237E" },
  dayToday: { backgroundColor: "#FFF", borderWidth: 2, borderColor: "#1A237E" },
  dayNumber: { fontSize: 11, fontWeight: "800", color: "#CBD5E1" },
  todayIndicator: {
    position: "absolute",
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#1A237E",
  },
  calendarFooter: {
    textAlign: "center",
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "700",
    marginTop: 12,
  },
  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 1.5,
    marginBottom: 15,
  },

  // Map Grid
  skillMapGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  zoneCard: {
    width: "48%",
    padding: 16,
    borderRadius: 22,
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    marginBottom: 15,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { fontSize: 10, fontWeight: "800", color: "#475569" },
  zoneLabel: {
    fontSize: 13,
    fontWeight: "900",
    color: "#1E293B",
    marginTop: 10,
  },
  zoneDesc: { fontSize: 10, color: "#64748B", fontWeight: "700", marginTop: 2 },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 8,
  },
  footerText: { fontSize: 10, fontWeight: "900", color: "#1A237E" },

  // Section Header Additions
  liveTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 6,
  },
  liveTagText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#475569",
  },

  // Bench Card Styles
  benchCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  benchRow: {
    marginBottom: 25,
  },
  benchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  benchLab: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.5,
  },
  benchValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  benchPerc: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1A237E",
  },
  diffText: {
    fontSize: 10,
    fontWeight: "800",
  },

  // Visual Track System
  visualTrack: {
    height: 12,
    justifyContent: "center",
    position: "relative",
  },
  trackBase: {
    position: "absolute",
    width: "100%",
    height: 4,
    backgroundColor: "#F1F5F9",
    borderRadius: 2,
  },
  targetZone: {
    position: "absolute",
    right: 0,
    height: 12,
    backgroundColor: "rgba(16, 185, 129, 0.08)",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(16, 185, 129, 0.2)",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  userBar: {
    height: 6,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  userBarHead: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFF",
    marginRight: 2,
    opacity: 0.5,
  },
  goalMarker: {
    position: "absolute",
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  goalLine: {
    width: 2,
    height: 16,
    backgroundColor: "#10B981",
    borderRadius: 1,
  },
  goalPointer: {
    position: "absolute",
    top: -4,
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
    borderRightWidth: 4,
    borderRightColor: "transparent",
    borderTopWidth: 4,
    borderTopColor: "#10B981",
  },

  // Legend
  benchLegend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F8FAFC",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userLegendBox: {
    width: 12,
    height: 4,
    backgroundColor: "#1A237E",
    borderRadius: 2,
  },
  targetLegendBox: {
    width: 12,
    height: 4,
    backgroundColor: "#10B981",
    borderRadius: 2,
  },
  legendText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 1,
  },

  benchInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  benchTrack: {
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    position: "relative",
  },
  benchUserFill: { height: "100%", borderRadius: 3 },
  benchGoalLine: {
    position: "absolute",
    top: -2,
    bottom: -2,
    width: 2,
    backgroundColor: "#4ADE80",
    zIndex: 10,
  },

  // Mistakes
  mistakeGrid: { flexDirection: "row", justifyContent: "space-between" },
  mistakeCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  mistakeItem: { alignItems: "center" },
  mistakeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  mistakePercent: {
    fontSize: 12,
    fontWeight: "900",
    color: "#1A237E",
    marginTop: 2,
  },
  mistakeLabel: { fontSize: 9, fontWeight: "800", color: "#64748B" },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    height: height * 0.85,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 25,
  },
  modalHeader: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  indicator: { width: 5, height: 35, borderRadius: 2 },
  modalTitle: { fontSize: 20, fontWeight: "900" },
  modalSub: { fontSize: 12, color: "#94A3B8", fontWeight: "700" },
  categoryWrapper: {
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: "#F8FAFC",
    overflow: "hidden",
  },
  categoryHeader: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  categoryName: { fontSize: 16, fontWeight: "800", color: "#1A237E" },
  categoryMeta: { fontSize: 12, color: "#64748B" },
  topicTable: { padding: 15, paddingTop: 5 },
  tableHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    paddingBottom: 5,
    marginBottom: 10,
  },
  tableHeadText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 1,
  },
  topicRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#E2E8F0",
  },
  topicTitle: { fontSize: 14, fontWeight: "800", color: "#1E293B" },
  topicSkip: { fontSize: 10, color: "#EF4444" },
  evoBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
  },
  evoStart: { fontSize: 10, color: "#94A3B8" },
  evoCurrent: { fontSize: 12, fontWeight: "900" },
  speedText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#1A237E",
    textAlign: "right",
    flex: 0.4,
  },

  // Benchmarks
  // benchLegend: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   gap: 20,
  //   marginTop: 5,
  // },
  // legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  // dot: { width: 6, height: 6, borderRadius: 3 },
  // legendText: { fontSize: 9, fontWeight: "700", color: "#94A3B8" },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  masteryContainer: {
    gap: 12,
  },
  neuralCard: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  neuralTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  neuralInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  neuralCat: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E293B",
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusTagText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  trendBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendValue: {
    fontSize: 10,
    fontWeight: "900",
  },
  gaugeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  gaugeTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    position: "relative",
    overflow: "visible",
  },
  gaugeFill: {
    height: "100%",
    borderRadius: 3,
  },
  gaugeMarker: {
    position: "absolute",
    top: -3,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFF",
    elevation: 3,
  },
  percText: {
    fontSize: 12,
    fontWeight: "900",
    width: 35,
    textAlign: "right",
  },
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
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  streakText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#D97706",
    marginLeft: 4,
  },
});
