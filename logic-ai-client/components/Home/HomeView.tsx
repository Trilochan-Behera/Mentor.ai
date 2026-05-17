import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

interface ServerDrivenUiProps {
  uiConfig: {
    header: {
      welcome_title: string;
      welcome_subtitle: string;
      show_notification_dot: boolean;
    };
    status_badges: {
      rank_label: string;
      drill_sequence_label: string;
    };
    mastery_sphere: {
      accuracy_percentage: number;
      solved_count_nodes: number;
      total_drills_nodes: number;
    };
    performance_strip: {
      speed_rating_string: string;
      tier_label: string;
    };
    next_mission_card: {
      title: string;
      description: string;
      action_slug: string;
    };
    ai_debrief_module: {
      title: string;
      profile_text: string;
      stability_ratio: number;
    };
    capability_parameters: Array<{
      title: string;
      sub: string;
      perc: number;
      col: string;
      icon: string;
    }>;
    exam_strategy_engine: Array<{
      level: string;
      topics: string;
      color: string;
    }>;
  };
}

export default function HomeView({ uiConfig }: ServerDrivenUiProps) {
  // Safe destructive fallbacks to keep rendering engines crash-proof
  const {
    header,
    status_badges,
    mastery_sphere,
    performance_strip,
    next_mission_card,
    ai_debrief_module,
    capability_parameters,
    exam_strategy_engine,
  } = uiConfig;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. WELCOME HEADER (Fully Backend Dynamic) */}
      <View style={styles.topSection}>
        <View>
          <Text style={styles.welcomeText}>{header.welcome_title}</Text>
          <Text style={styles.subWelcome}>{header.welcome_subtitle}</Text>
        </View>
        <TouchableOpacity style={styles.notifBadge}>
          <Ionicons name="notifications-outline" size={24} color="#1A237E" />
          {header.show_notification_dot && <View style={styles.dot} />}
        </TouchableOpacity>
      </View>

      {/* 2. LIVE SPEC STATUS STRIP FLAGS */}
      <View style={styles.infoRow}>
        <View style={styles.levelBadge}>
          <Ionicons name="ribbon" size={14} color="#1A237E" />
          <Text style={styles.levelText}>{status_badges.rank_label}</Text>
        </View>
        <Text style={styles.idText}>{status_badges.drill_sequence_label}</Text>
      </View>

      {/* 3. CORE MASTERY NEXUS SPHERICAL DISPLAY */}
      <View style={styles.masteryContainer}>
        <View style={styles.sphereOuter}>
          <View style={[styles.sphereRing, styles.targetRing]} />
          <LinearGradient
            colors={["rgba(26, 35, 126, 0.1)", "rgba(26, 35, 126, 0.05)"]}
            style={[styles.sphereRing, styles.growthRing]}
          />
          <View style={styles.sphereCore}>
            <LinearGradient colors={["#1A237E", "#3949AB"]} style={styles.coreGradient}>
              <Text style={styles.coreVal}>{mastery_sphere.accuracy_percentage}%</Text>
              <Text style={styles.coreLab}>ACCURACY</Text>
            </LinearGradient>
          </View>
          
          <View style={[styles.dataNode, { top: 0, left: 20 }]}>
            <Text style={styles.nodeV}>{mastery_sphere.solved_count_nodes}</Text>
            <Text style={styles.nodeL}>SOLVED</Text>
          </View>
          
          <View style={[styles.dataNode, { bottom: 20, right: 0 }]}>
            <Text style={styles.nodeV}>{mastery_sphere.total_drills_nodes}</Text>
            <Text style={styles.nodeL}>TOTAL ATTEMPTS</Text>
          </View>
        </View>
      </View>

      {/* 4. SPEED CALIBRATION MATRIX STRIP */}
      <View style={styles.statsStrip}>
        <View style={styles.stripItem}>
          <Ionicons name="speedometer-outline" size={16} color="#F59E0B" />
          <Text style={styles.stripTextRC}>{performance_strip.speed_rating_string}</Text>
        </View>
        <View style={styles.vDivider} />
        <View style={styles.stripItem}>
          <Ionicons name="trophy" size={16} color="#1A237E" />
          <Text style={styles.stripText}>{performance_strip.tier_label}</Text>
        </View>
      </View>

      {/* 5. DYNAMIC TARGET TRACK MISSION SLOCK */}
      <TouchableOpacity style={styles.missionCard}>
        <LinearGradient
          colors={["#1A237E", "#283593"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.missionGradient}
        >
          <Ionicons name="rocket" size={20} color="#F59E0B" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.missionTitle}>{next_mission_card.title}</Text>
            <Text style={styles.missionDesc}>{next_mission_card.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#FFF" style={{ marginLeft: "auto" }} />
        </LinearGradient>
      </TouchableOpacity>

      {/* 6. AI STRATEGIC PROFILE DEBRIEF ENGINE */}
      <Animatable.View animation="fadeInDown">
        <LinearGradient colors={["#1A237E", "#311B92"]} style={styles.briefCard}>
          <View style={styles.briefHeader}>
            <Ionicons name="sparkles" size={16} color="#4ADE80" />
            <Text style={styles.briefTitle}>{ai_debrief_module.title}</Text>
          </View>
          <Text style={styles.briefText}>"{ai_debrief_module.profile_text}"</Text>
          <View style={styles.confMeter}>
            <Text style={styles.confLab}>STABILITY RATIO</Text>
            <View style={styles.confTrack}>
              <View style={[styles.confFill, { width: `${ai_debrief_module.stability_ratio}%` }]} />
            </View>
            <Text style={styles.confVal}>{ai_debrief_module.stability_ratio}%</Text>
          </View>
        </LinearGradient>
      </Animatable.View>

      {/* 7. CAPABILITY PARAMETERS BENTO COMPILER LOOP */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeader}>CAPABILITY PARAMETERS</Text>
          <Ionicons name="options-outline" size={16} color="#94A3B8" />
        </View>
        <View style={styles.bentoGrid}>
          {capability_parameters.map((item, i) => (
            <View key={i} style={styles.bentoCard}>
              <View style={[styles.iconCircle, { backgroundColor: `${item.col}10` }]}>
                <Ionicons name={item.icon as any} size={18} color={item.col} />
              </View>
              <Text style={styles.bentoTitle}>{item.title}</Text>
              <Text style={styles.bentoSub}>{item.sub}</Text>
              <View style={styles.bentoFooter}>
                <Text style={[styles.bentoPerc, { color: item.col }]}>{item.perc}%</Text>
                <View style={styles.miniProgress}>
                  <View style={[styles.miniFill, { width: `${item.perc}%`, backgroundColor: item.col }]} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 8. EXAM STRATEGY CONFIGURATION ARRAYS GRID LOOP */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>EXAM STRATEGY ENGINE</Text>
        <LinearGradient colors={["#1A237E", "#3949AB"]} style={styles.strategyCard}>
          {exam_strategy_engine.map((s, i) => (
            <View key={i} style={styles.stratRow}>
              <View style={[styles.stratIndicator, { backgroundColor: s.color }]} />
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

// Keep your exact StyleSheet styling engine code from the previous turn intact...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FE", paddingHorizontal: 20 },
  idText: { fontSize: 10, fontWeight: "800", color: "#94A3B8", letterSpacing: 1, textTransform: "uppercase" },
  topSection: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20, marginBottom: 10 },
  welcomeText: { fontSize: 26, fontWeight: "800", color: "#1A237E" },
  subWelcome: { fontSize: 15, color: "#666", marginTop: 4 },
  notifBadge: { width: 45, height: 45, borderRadius: 15, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", elevation: 2 },
  dot: { position: "absolute", top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: "#FF5252", borderWidth: 2, borderColor: "#FFF" },
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  levelBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#E8EAF6", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  levelText: { fontSize: 12, fontWeight: "700", color: "#1A237E", marginLeft: 5 },
  masteryContainer: { alignItems: "center", marginVertical: 20 },
  sphereOuter: { width: 220, height: 220, justifyContent: "center", alignItems: "center" },
  sphereRing: { position: "absolute", borderRadius: 1000 },
  targetRing: { width: 220, height: 220, borderWidth: 1, borderColor: "#E2E8F0", borderStyle: "dashed" },
  growthRing: { width: 170, height: 170, borderRadius: 85, borderWidth: 1, borderColor: "rgba(26, 35, 126, 0.1)" },
  sphereCore: { width: 120, height: 120, borderRadius: 60, elevation: 15, shadowColor: "#1A237E", shadowOpacity: 0.3, shadowRadius: 20 },
  coreGradient: { flex: 1, borderRadius: 60, justifyContent: "center", alignItems: "center" },
  coreVal: { color: "#FFF", fontSize: 32, fontWeight: "900" },
  coreLab: { color: "rgba(255,255,255,0.6)", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  dataNode: { position: "absolute", backgroundColor: "#FFF", padding: 10, borderRadius: 15, elevation: 5, shadowOpacity: 0.05, alignItems: "center", minWidth: 70 },
  nodeV: { fontSize: 14, fontWeight: "900", color: "#1A237E" },
  nodeL: { fontSize: 8, fontWeight: "700", color: "#94A3B8" },
  statsStrip: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 20, padding: 18, elevation: 2, marginBottom: 10, justifyContent: "space-around", alignItems: "center" },
  stripItem: { flexDirection: "row", alignItems: "center" },
  stripText: { marginLeft: 8, fontSize: 12, fontWeight: "700", color: "#475569" },
  stripTextRC: { marginLeft: 8, fontSize: 12, fontWeight: "700", color: "#F59E0B" },
  vDivider: { width: 1, height: 20, backgroundColor: "#F1F5F9" },
  missionCard: { borderRadius: 16, overflow: "hidden", marginBottom: 5, elevation: 4 },
  missionGradient: { padding: 16, flexDirection: "row", alignItems: "center" },
  missionTitle: { color: "rgba(255,255,255,0.6)", fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  missionDesc: { color: "#FFF", fontSize: 12, fontWeight: "700", marginTop: 2 },
  briefCard: { padding: 25, borderRadius: 20, elevation: 10, shadowColor: "#1A237E", shadowOpacity: 0.3 },
  briefHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 15 },
  briefTitle: { color: "#4ADE80", fontSize: 11, fontWeight: "900", letterSpacing: 1.5 },
  briefText: { color: "#E0E7FF", fontSize: 15, lineHeight: 22, fontWeight: "500" },
  confMeter: { flexDirection: "row", alignItems: "center", marginTop: 20, gap: 10 },
  confLab: { color: "rgba(255,255,255,0.5)", fontSize: 8, fontWeight: "900" },
  confTrack: { flex: 1, height: 4, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2 },
  confFill: { height: "100%", backgroundColor: "#4ADE80", borderRadius: 2 },
  confVal: { color: "#4ADE80", fontSize: 10, fontWeight: "900" },
  sectionLabel: { fontSize: 10, fontWeight: "900", color: "#94A3B8", letterSpacing: 1.5, marginBottom: 15 },
  strategyCard: { padding: 25, borderRadius: 28 },
  stratRow: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  stratIndicator: { width: 4, height: 30, borderRadius: 2, marginRight: 15 },
  stratLevel: { fontSize: 9, fontWeight: "900", color: "rgba(255,255,255,0.6)", letterSpacing: 1 },
  stratTopics: { fontSize: 14, fontWeight: "700", color: "#FFF", marginTop: 2 },
  section: { paddingHorizontal: 8, marginTop: 15 },
  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sectionHeader: { fontSize: 11, fontWeight: "900", color: "#1A237E", letterSpacing: 1.5 },
  bentoGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  bentoCard: { width: "48%", backgroundColor: "#FFF", borderRadius: 24, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#F1F5F9" },
  iconCircle: { width: 36, height: 36, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  bentoTitle: { fontSize: 14, fontWeight: "800", color: "#1A237E" },
  bentoSub: { fontSize: 10, color: "#94A3B8", fontWeight: "700", marginTop: 2 },
  bentoFooter: { marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  bentoPerc: { fontSize: 13, fontWeight: "900" },
  miniProgress: { width: 35, height: 4, backgroundColor: "#F1F5F9", borderRadius: 2 },
  miniFill: { height: "100%", borderRadius: 2 },
});