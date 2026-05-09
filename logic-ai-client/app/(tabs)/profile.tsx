import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Background } from "@react-navigation/elements";

const { width } = Dimensions.get("window");

export default function Profile() {
  const [isNegativeMarking, setIsNegativeMarking] = useState(true);
  const [isAiInsights, setIsAiInsights] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. THE HERO COMMAND MODULE - UPDATED COLORS */}
        <View style={styles.heroWrapper}>
          <LinearGradient
            colors={["#1A237E", "#3949AB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.topUtilityBar}>
              <View style={styles.statusPill}>
                <View style={styles.pulseDot} />
                <Text style={styles.statusText}>#2026_TRIL</Text>
              </View>
              <TouchableOpacity style={styles.circleBtn}>
                <Ionicons name="notifications-outline" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>

            <Animatable.View
              animation="zoomIn"
              duration={1000}
              style={styles.avatarStack}
            >
              <View style={styles.avatarGlow}>
                <Image
                  source={{
                    uri: "https://ui-avatars.com/api/?name=Kanha&background=fff&color=1A237E&size=150",
                  }}
                  style={styles.avatarImage}
                />
              </View>
              <LinearGradient
                colors={["#F59E0B", "#D97706"]}
                style={styles.rankRibbon}
              >
                <Text style={styles.rankLabel}>RANK: ELITE</Text>
              </LinearGradient>
              <Text style={styles.userName}>Kanha</Text>
              <Text style={styles.userCallsign}>
                Cognitive Intelligence Asset
              </Text>
            </Animatable.View>
          </LinearGradient>
        </View>

        {/* 2. THE FLOATING HUD MATRIX - ADDED ICONS */}
        <View style={styles.hudMatrix}>
          {[
            {
              lab: "ACCURACY",
              val: "88.4%",
              col: "#10B981",
              icon: "stats-chart",
              trend: "+2.1%",
            },
            {
              lab: "VELOCITY",
              val: "12.4s",
              col: "#F59E0B",
              icon: "flash",
              trend: "FAST",
            },
            {
              lab: "SESSIONS",
              val: "128",
              col: "#3949AB",
              icon: "calendar",
              trend: "STABLE",
            },
          ].map((item, i) => (
            <View key={i} style={styles.hudItem}>
              <Ionicons
                name={item.icon as any}
                size={14}
                color={item.col}
                style={{ marginBottom: 4 }}
              />
              <Text style={styles.hudLabel}>{item.lab}</Text>
              <Text style={[styles.hudValue, { color: item.col }]}>
                {item.val}
              </Text>
              <Text style={styles.hudTrend}>{item.trend}</Text>
              {i < 2 && <View style={styles.vDivider} />}
            </View>
          ))}
        </View>

        {/* 2. EVOLUTION TIMELINE (The Core Card) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>INTELLIGENCE EVOLUTION</Text>
          <View style={styles.evoCard}>
            <View style={styles.evoHeader}>
              <View>
                <Text style={styles.evoMainTitle}>Growth Trajectory</Text>
                <Text style={styles.evoSub}>
                  Baseline vs. Current Calibration
                </Text>
              </View>
              <View style={styles.growthBadge}>
                <Text style={styles.growthText}>+54.2%</Text>
              </View>
            </View>

            <View style={styles.evoVisual}>
              <View style={styles.evoPoint}>
                <Text style={styles.evoVal}>42%</Text>
                <Text style={styles.evoLab}>ENTRY PHASE</Text>
                <Text style={styles.evoDate}>Jan 12</Text>
              </View>

              <View style={styles.evoTrack}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#E2E8F0", "#10B981"]}
                  style={styles.trackFill}
                />
                <View style={styles.pulseContainer}>
                  <View style={styles.pulseCircle} />
                </View>
              </View>

              <View style={styles.evoPoint}>
                <Text style={[styles.evoVal, { color: "#10B981" }]}>96%</Text>
                <Text style={styles.evoLab}>LIVE STATUS</Text>
                <Text style={styles.evoDate}>Today</Text>
              </View>
            </View>

            <View style={styles.evoFooter}>
              <Ionicons name="sparkles" size={12} color="#10B981" />
              <Text style={styles.footerNote}>
                AI Analysis: You are currently outperforming 98% of your entry
                cohort.
              </Text>
            </View>
          </View>
        </View>

        {/* 4. LATEST ACHIEVEMENT */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>LATEST ACHIEVEMENT</Text>
          <View style={styles.achievementCard}>
            <LinearGradient
              colors={["#F8F9FE", "#FFFFFF"]}
              style={styles.achGradient}
            >
              <View style={styles.achIconBox}>
                <Ionicons name="trophy" size={24} color="#F59E0B" />
              </View>
              <View style={styles.achText}>
                <Text style={styles.achTitle}>Precision Master</Text>
                <Text style={styles.achDesc}>
                  10 consecutive sessions with 90%+ Accuracy achieved.
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* 3. ACHIEVEMENTS (Milestones) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACHIEVEMENTS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.achievementRow}
          >
            {[
              { icon: "trophy", label: "Top 1%", col: "#F59E0B" },
              { icon: "flame", label: "15 Day Streak", col: "#EF4444" },
              { icon: "speedometer", label: "Velocity King", col: "#6366F1" },
              { icon: "shield-checkmark", label: "Zero Error", col: "#10B981" },
            ].map((ach, i) => (
              <View key={i} style={styles.achCard}>
                <View
                  style={[styles.achIcon, { backgroundColor: ach.col + "15" }]}
                >
                  <Ionicons name={ach.icon as any} size={22} color={ach.col} />
                </View>
                <Text style={styles.achLabel}>{ach.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 2. NEURAL SKILL RADAR (Strengths / Weaknesses) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TOP 3 STRENGTHS / WEAKNESSES</Text>
          <View style={styles.skillMap}>
            {/* Strengths */}
            <View style={styles.skillGroup}>
              <View style={styles.skillHeader}>
                <Ionicons name="flash" size={14} color="#10B981" />
                <Text style={styles.skillGroupTitle}>STRENGTHS</Text>
              </View>
              {["Syllogism", "Data Interpretation", "Series"].map((skill) => (
                <View key={skill} style={styles.skillTag}>
                  <Text style={styles.skillTagText}>{skill}</Text>
                  <Text style={styles.skillVal}>94%</Text>
                </View>
              ))}
            </View>

            {/* Weaknesses */}
            <View style={styles.skillGroup}>
              <View style={styles.skillHeader}>
                <Ionicons name="trending-down" size={14} color="#EF4444" />
                <Text style={styles.skillGroupTitle}>WEAKNESSES</Text>
              </View>
              {["Probability", "Complex Puzzles"].map((skill) => (
                <View
                  key={skill}
                  style={[styles.skillTag, { borderColor: "#FEE2E2" }]}
                >
                  <Text style={[styles.skillTagText, { color: "#B91C1C" }]}>
                    {skill}
                  </Text>
                  <Text style={[styles.skillVal, { color: "#B91C1C" }]}>
                    32%
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 4. SETTINGS & CALIBRATION */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>STRATEGIC SETTINGS</Text>
          <View style={styles.settingsCard}>
            {/* Negative Marking Feature */}
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={styles.settingIconWrap}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={20}
                    color="#EF4444"
                  />
                </View>
                <View>
                  <Text style={styles.settingTitle}>Negative Marking</Text>
                  <Text style={styles.settingSub}>
                    Simulate real exam penalty (-0.25)
                  </Text>
                </View>
              </View>
              <Switch
                value={isNegativeMarking}
                onValueChange={setIsNegativeMarking}
                trackColor={{ false: "#E2E8F0", true: "#1A237E" }}
              />
            </View>

            <View style={styles.divider} />

            {/* AI Insights Toggle */}
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View
                  style={[
                    styles.settingIconWrap,
                    { backgroundColor: "#F0FDF4" },
                  ]}
                >
                  <Ionicons name="sparkles" size={20} color="#10B981" />
                </View>
                <View>
                  <Text style={styles.settingTitle}>AI Strategy Briefs</Text>
                  <Text style={styles.settingSub}>
                    Receive daily neural calibrations
                  </Text>
                </View>
              </View>
              <Switch
                value={isAiInsights}
                onValueChange={setIsAiInsights}
                trackColor={{ false: "#E2E8F0", true: "#10B981" }}
              />
            </View>
          </View>
        </View>

        {/* LOGOUT */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}>
            <Ionicons name="exit-outline" size={18} color="#EF4444" />
            <View style={styles.gap} />
            <Text style={styles.logoutText}>TERMINATE SESSION</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingBottom: 20 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 2,
    marginBottom: 15,
  },

  evoCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 25,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  // Skill Map
  skillMap: { flexDirection: "row", justifyContent: "space-between" },
  skillGroup: { width: "48%" },
  skillHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  skillGroupTitle: { fontSize: 9, fontWeight: "900", color: "#64748B" },
  skillTag: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DCFCE7",
    marginBottom: 8,
  },
  skillTagText: { fontSize: 11, fontWeight: "800", color: "#065F46" },
  skillVal: { fontSize: 10, fontWeight: "900", color: "#10B981" },

  // Achievements
  achievementRow: { flexDirection: "row" },
  achCard: {
    width: 100,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  achIcon: {
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  achLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "#1A237E",
    textAlign: "center",
  },

  // Settings
  settingsCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  settingInfo: { flexDirection: "row", alignItems: "center", gap: 15 },
  settingIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  settingTitle: { fontSize: 14, fontWeight: "800", color: "#1A237E" },
  settingSub: { fontSize: 10, color: "#94A3B8", fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#F8FAFC", marginVertical: 5 },

  logoutBtn: {
    flexDirection: "row", // Align icon and text horizontally
    alignItems: "center", // Center both vertically to the same height
    justifyContent: "center", // Center the whole group in the button
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FEE2E2", // Subtle red border
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  gap: {
    width: 5,
  },
  logoutText: {
    color: "#EF4444",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 1,
  },

  // Evolution Card
  evoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  evoMainTitle: { fontSize: 16, fontWeight: "800", color: "#1A237E" },
  evoSub: { fontSize: 10, color: "#94A3B8", fontWeight: "600", marginTop: 2 },
  growthBadge: {
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  growthText: { color: "#10B981", fontSize: 12, fontWeight: "900" },

  evoVisual: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  evoPoint: { alignItems: "center", width: 80 },
  evoVal: { fontSize: 24, fontWeight: "900", color: "#1E293B" },
  evoLab: { fontSize: 8, fontWeight: "800", color: "#94A3B8", marginTop: 4 },
  evoDate: { fontSize: 8, color: "#CBD5E1", marginTop: 2 },

  evoTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "#F1F5F9",
    borderRadius: 2,
    marginHorizontal: 10,
    position: "relative",
  },
  trackFill: { height: "100%", width: "100%", borderRadius: 2 },
  pulseContainer: { position: "absolute", right: 0, top: -4 },
  pulseCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#FFF",
  },

  evoFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F8FAFC",
  },
  footerNote: { fontSize: 9, color: "#64748B", fontWeight: "600", flex: 1 },

  // Hero Section
  heroWrapper: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
    elevation: 20,
  },
  heroGradient: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 50 },
  topUtilityBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4ADE80",
    marginRight: 8,
  },
  statusText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarStack: { alignItems: "center" },
  avatarGlow: {
    padding: 4,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  avatarImage: {
    width: 85,
    height: 85,
    borderRadius: 24,
    backgroundColor: "#FFF",
  },
  rankRibbon: {
    position: "absolute",
    bottom: 55,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 10,
    elevation: 5,
  },
  rankLabel: {
    color: "#FFF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  userName: { fontSize: 28, fontWeight: "900", color: "#FFF", marginTop: 15 },
  userCallsign: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "700",
    marginTop: 4,
  },

  // HUD Matrix
  hudMatrix: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginHorizontal: 24,
    marginTop: -30,
    borderRadius: 24,
    paddingVertical: 20,
    elevation: 10,
    shadowColor: "#1A237E",
    shadowOpacity: 0.1,
    alignItems: "center",
  },
  hudItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  hudLabel: {
    fontSize: 8,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 1,
    marginBottom: 2,
  },
  hudValue: { fontSize: 18, fontWeight: "900" },
  vDivider: {
    position: "absolute",
    right: 0,
    width: 1,
    height: 25,
    backgroundColor: "#F1F5F9",
  },
  hudTrend: { fontSize: 9, fontWeight: "800", color: "#94A3B8", marginTop: 4 },

  // Bento Grid
  section: { paddingHorizontal: 24, marginTop: 35 },
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

  // Achievement
  achievementCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
    marginTop: 10,
  },
  achGradient: { flexDirection: "row", alignItems: "center", padding: 16 },
  achIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  achText: { flex: 1, marginLeft: 15 },
  achTitle: { fontSize: 14, fontWeight: "800", color: "#1A237E" },
  achDesc: { fontSize: 11, color: "#64748B", marginTop: 4, lineHeight: 16 },

  // Biometrics
  bioCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginTop: 10,
  },
  bioRow: { flexDirection: "row", alignItems: "center" },
  bioIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bioTextContainer: { flex: 1, marginLeft: 12 },
  bioTitle: { fontSize: 14, fontWeight: "800", color: "#1A237E" },
  bioSub: { fontSize: 11, color: "#94A3B8", fontWeight: "600", marginTop: 2 },
  bioStatus: { fontSize: 9, fontWeight: "900", color: "#10B981" },
  bioDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 15 },
  heatmapCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginTop: 10,
  },
  heatColumn: { alignItems: "center" },
  heatBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  heatActive: { backgroundColor: "#1A237E", borderColor: "#1A237E" },
  heatInactive: { backgroundColor: "transparent", borderColor: "#E2E8F0" },
  heatLabel: { fontSize: 10, fontWeight: "800", color: "#94A3B8" },
});
