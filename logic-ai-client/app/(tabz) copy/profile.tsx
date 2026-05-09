import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

export default function ProfilePage() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const activity = [true, true, true, false, true, true, true];

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

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>CONSISTENCY MATRIX</Text>
          <View style={styles.heatmapCard}>
            {days.map((day, i) => (
              <View key={i} style={styles.heatColumn}>
                <View
                  style={[
                    styles.heatBox,
                    activity[i] ? styles.heatActive : styles.heatInactive,
                  ]}
                />
                <Text style={styles.heatLabel}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 3. CAPABILITY GRID - UPDATED CONTENT */}
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
                  <Ionicons
                    name={item.icon as any}
                    size={18}
                    color={item.col}
                  />
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

        {/* 5. SYSTEM BIOMETRICS */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>SYSTEM BIOMETRICS</Text>
          <View style={styles.bioCard}>
            <View style={styles.bioRow}>
              <View style={[styles.bioIconBg, { backgroundColor: "#FEF3C7" }]}>
                <Ionicons name="timer" size={18} color="#D97706" />
              </View>
              <View style={styles.bioTextContainer}>
                <Text style={styles.bioTitle}>Processing Speed</Text>
                <Text style={styles.bioSub}>Sub-15s response average.</Text>
              </View>
              <Text style={styles.bioStatus}>OPTIMAL</Text>
            </View>
            <View style={styles.bioDivider} />
            <View style={styles.bioRow}>
              <View style={[styles.bioIconBg, { backgroundColor: "#E0E7FF" }]}>
                <Ionicons name="fitness" size={18} color="#4F46E5" />
              </View>
              <View style={styles.bioTextContainer}>
                <Text style={styles.bioTitle}>Mental Stamina</Text>
                <Text style={styles.bioSub}>Fatigue alert after 45 mins.</Text>
              </View>
              <Text style={[styles.bioStatus, { color: "#EF4444" }]}>
                STABLE
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingBottom: 20 },

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
