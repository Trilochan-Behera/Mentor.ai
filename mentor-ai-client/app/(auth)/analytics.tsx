import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export const LEVELS: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  expert: { label: "EXPERT", color: "#4ADE80", icon: "ribbon" },
  proficient: { label: "PROFICIENT", color: "#FACC15", icon: "checkmark-done" },
  intermediate: {
    label: "INTERMEDIATE",
    color: "#3B82F6",
    icon: "trending-up",
  },
  foundational: { label: "FOUNDATIONAL", color: "#94A3B8", icon: "book" },
  locked: {
    label: "UNCALIBRATED",
    color: "#64748B",
    icon: "lock-closed-outline",
  },
};

// 🧠 Updated validation contracts to parse individual category logs
interface ReportPayload {
  scoreCard: {
    total: number;
    correct: number;
    accuracy: number;
    timeSpentSeconds: number;
    individual_topics?: Record<string, { correct: number; total: number }>;
  };
  aiInsights: {
    cognitive_profile: string;
    speed_rating: string;
    recommended_focus: string;
  };
}

export default function AnalysisLoading() {
  const router = useRouter();
  const { reportData, topics } = useLocalSearchParams<{
    reportData: string;
    topics: string;
  }>();
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzed(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  // Compute all 3 topics dynamically, mapping exact granular accuracy tiers
  const userPerformance = useMemo(() => {
    const ALL_MASTER_TOPICS = [
      { id: "1", name: "Quant" },
      { id: "2", name: "Reasoning" },
      { id: "3", name: "English" },
    ];

    const activeTopicIds = topics ? topics.split(",") : ["1"];
    let individualTopicsData: Record<
      string,
      { correct: number; total: number }
    > = {};
    let globalAccuracy = 0;

    try {
      if (reportData) {
        const parsed: ReportPayload = JSON.parse(reportData);
        globalAccuracy = parsed.scoreCard.accuracy;
        individualTopicsData = parsed.scoreCard.individual_topics || {};
      }
    } catch (e) {
      console.error(
        "[Payload Parsing Error] Failed compiling stats metrics:",
        e,
      );
    }

    return ALL_MASTER_TOPICS.map((topicItem) => {
      const isSelected = activeTopicIds.includes(topicItem.id);

      if (!isSelected) {
        return {
          subject: topicItem.name,
          rank: "locked",
          score: "--",
          isEnabled: false,
        };
      }

      // 🧠 Extract accuracy parameters specific to this isolated topic ID
      const topicStats = individualTopicsData[topicItem.id];

      // Fallback directly to the overall session accuracy if individual breakdown records are missing
      const subjectAccuracy =
        topicStats && topicStats.total > 0
          ? Math.round((topicStats.correct / topicStats.total) * 100)
          :0;

      // Determine proficiency tier based on the targeted subject score
      const activeRankKey =
        subjectAccuracy >= 80
          ? "expert"
          : subjectAccuracy >= 65
            ? "proficient"
            : subjectAccuracy >= 45
              ? "intermediate"
              : "foundational";

      return {
        subject: topicItem.name,
        rank: activeRankKey,
        score: `${subjectAccuracy}%`,
        isEnabled: true,
      };
    });
  }, [reportData, topics]);

  const processingSteps = [
    "Analyzing Response Velocity...",
    "Identifying Skills...",
    "Mapping Subject Mastery...",
    "Calibrating Personalized Strategy...",
  ];

  const handleFinalize = async () => {
    try {
      await AsyncStorage.setItem("hasCompletedEvolution", "true");
      router.replace("/(tabs)/home");
    } catch (e) {
      console.error("Failed to save onboarding state", e);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={["#1A237E", "#0F172A"]} style={styles.gradient}>
        {!isAnalyzed ? (
          <Animatable.View
            animation="fadeIn"
            style={{ width: "100%", alignItems: "center" }}
          >
            <View style={styles.centerBox}>
              <Animatable.View
                animation="rotate"
                iterationCount="infinite"
                duration={3000}
                easing="linear"
              >
                <Ionicons name="scan-outline" size={80} color="#4ADE80" />
              </Animatable.View>
              <Animatable.Text
                animation="pulse"
                iterationCount="infinite"
                style={styles.loadingTitle}
              >
                GENERATING SKILL IDENTITY
              </Animatable.Text>
            </View>

            <View style={styles.stepsContainer}>
              {processingSteps.map((step, i) => (
                <Animatable.View
                  key={i}
                  animation="fadeInLeft"
                  delay={i * 800}
                  style={styles.stepRow}
                >
                  <Ionicons name="checkmark-circle" size={16} color="#4ADE80" />
                  <Text style={styles.stepText}>{step}</Text>
                </Animatable.View>
              ))}
            </View>
          </Animatable.View>
        ) : (
          <Animatable.View
            animation="fadeIn"
            duration={800}
            style={styles.identityContainer}
          >
            <View style={styles.idHeader}>
              <Text style={styles.identityLabel}>ANALYSIS COMPLETE</Text>
              <Text style={styles.identityName}>Skill Identity</Text>
              <Text style={styles.subText}>
                Based on your evaluation performance
              </Text>
            </View>

            <ScrollView
              style={{ maxHeight: 320 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.statsWrapper}>
                {userPerformance.map((item, index) => {
                  const config = LEVELS[item.rank];
                  return (
                    <Animatable.View
                      animation="slideInRight"
                      delay={index * 150}
                      key={item.subject}
                    >
                      <View
                        style={[
                          styles.statCard,
                          !item.isEnabled && styles.statCardDisabled,
                        ]}
                      >
                        <View style={styles.cardLeft}>
                          <View
                            style={[
                              styles.iconIndicator,
                              { backgroundColor: config.color + "15" },
                            ]}
                          >
                            <Ionicons
                              name={config.icon as any}
                              size={20}
                              color={config.color}
                            />
                          </View>
                          <View>
                            <Text style={styles.subjectLabel}>
                              {item.subject}
                            </Text>
                            <Text
                              style={[
                                styles.rankText,
                                { color: config.color },
                                !item.isEnabled && {
                                  fontSize: 13,
                                  fontWeight: "700",
                                },
                              ]}
                            >
                              {config.label}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.scoreBox}>
                          <Text
                            style={[
                              styles.scoreVal,
                              !item.isEnabled && { color: "#475569" },
                            ]}
                          >
                            {item.score}
                          </Text>
                          <Text style={styles.scoreSub}>
                            {item.isEnabled ? "Proficiency" : "Locked"}
                          </Text>
                        </View>
                      </View>
                    </Animatable.View>
                  );
                })}
              </View>
            </ScrollView>

            <Animatable.View animation="fadeInUp" delay={1000}>
              <TouchableOpacity
                onPress={handleFinalize}
                style={styles.finalBtn}
              >
                <LinearGradient
                  colors={["#3949AB", "#1A237E"]}
                  style={styles.btnGrad}
                >
                  <Text style={styles.finalBtnText}>CONTINUE TO DASHBOARD</Text>
                  <Ionicons name="chevron-forward" size={18} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
          </Animatable.View>
        )}

        <Text style={styles.footerNote}>
          {isAnalyzed
            ? "SECURE IDENTITY GENERATED"
            : "Calibration Complete • Securing Operational Node"}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  centerBox: { alignItems: "center", marginBottom: 60 },
  loadingTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 30,
  },
  stepsContainer: { width: "100%", paddingLeft: 40 },
  stepRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  stepText: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 15,
  },
  footerNote: {
    position: "absolute",
    bottom: 50,
    color: "rgba(255,255,255,0.3)",
    fontSize: 10,
    fontWeight: "800",
  },
  identityContainer: { width: "100%" },
  idHeader: { alignItems: "center", marginBottom: 35 },
  identityLabel: {
    color: "#4ADE80",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 4,
  },
  identityName: {
    color: "#FFF",
    fontSize: 36,
    fontWeight: "900",
    marginTop: 5,
  },
  subText: { color: "#94A3B8", fontSize: 14, marginTop: 8 },
  statsWrapper: { gap: 12, marginBottom: 40 },
  statCard: {
    padding: 20,
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  statCardDisabled: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderColor: "rgba(255,255,255,0.03)",
    opacity: 0.5,
  },
  cardLeft: { flexDirection: "row", alignItems: "center" },
  iconIndicator: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  subjectLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  rankText: { fontSize: 20, fontWeight: "900", marginTop: 2, color: "#FFF" },
  scoreBox: { alignItems: "flex-end" },
  scoreVal: { color: "#FFF", fontSize: 20, fontWeight: "900" },
  scoreSub: { color: "#64748B", fontSize: 10, fontWeight: "800" },
  finalBtn: { height: 64, borderRadius: 20, overflow: "hidden", marginTop: 10 },
  btnGrad: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  finalBtnText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 1,
  },
});
