import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useApi } from "../../hooks/useApi"; // Adjust this path relative to your project root
import EnhancedQuizLoader from "@/components/EnhancedQuizLoader";

const { width, height } = Dimensions.get("window");

interface Question {
  id: string;
  topic_id: string;
  sub_topic: string; // ✅ Added to align with new database schemas
  question_text: string;
  options: string[];
  correct_option: number;
  difficulty_rating: number;
}

export default function Diagnostic() {
  const {
    topics,
    count,
    level,
    id: topicId,
    userEmail,
  } = useLocalSearchParams();
  const router = useRouter();
  const { request, loading } = useApi();

  // --- STATE ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [showPalette, setShowPalette] = useState(false);

  // --- METRIC TELEMETRY REFS ---
  const questionStartTime = useRef<number>(Date.now());
  const attemptLogs = useRef<
    Array<{
      question_id: string;
      sub_topic: string; // ✅ Added tracking requirement mapping
      selected_option: number;
      time_taken_seconds: number;
      is_correct: boolean;
    }>
  >([]);

  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    loadQuestions();
  }, [topicId]);

  const loadQuestions = async () => {
    const targetTopicsString = topics || "1"; 

    const res = await request<{ questions: Question[] }>(
      `/evaluation/questions?topics=${targetTopicsString}`,
      {
        method: "GET",
        service: "eval", 
      },
    );

    if (res.success && res.data) {
      setQuestions(res.data.questions);
      questionStartTime.current = Date.now();
    }
  };

  // --- TIMER ACCUMULATOR ---
  useEffect(() => {
    const timer = setInterval(() => setTotalSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- OPTION SELECTOR ---
  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  // --- SYSTEM TRANSITION DISPATCHER ---
  const commitQuestionTelemetry = (selectedIdx: number | null) => {
    const currentQuestion = questions[currentIndex];
    const timeSpent = Math.max(
      1,
      Math.round((Date.now() - questionStartTime.current) / 1000),
    );

    const isCorrect = selectedIdx !== null ? selectedIdx === currentQuestion.correct_option : false;

    const existingLogIndex = attemptLogs.current.findIndex(
      (log) => log.question_id === currentQuestion.id,
    );
    
    // ✅ Formatted payload object containing sub_topic context strings
    const logPayload = {
      question_id: currentQuestion.id,
      sub_topic: currentQuestion.sub_topic || "General Principles",
      selected_option: selectedIdx !== null ? selectedIdx : -1, 
      time_taken_seconds: timeSpent,
      is_correct: isCorrect,
    };

    if (existingLogIndex > -1) {
      attemptLogs.current[existingLogIndex] = logPayload;
    } else {
      attemptLogs.current.push(logPayload);
    }
  };

  const handleNext = async () => {
    const selectedOption = answers[currentIndex];

    commitQuestionTelemetry(selectedOption !== undefined ? selectedOption : null);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      questionStartTime.current = Date.now(); 
    } else {
      // ✅ Updated payload destination parameters 
      const payload = {
        email: userEmail || "trilochanbeherak@gmail.com",
        topic_id: "evolution_baseline", // 🧠 Forces backend to lock this transaction as Attempt #1 Baseline
        total_time_seconds: totalSeconds,
        attempts: attemptLogs.current,
      };

      const res = await request("/evaluation/analyze", {
        method: "POST",
        service: "eval", 
        body: payload,
      });

      if (res.success && res.data) {
        router.push({
          pathname: "/analytics",
          params: { reportData: JSON.stringify(res.data), topics: topics },
        });
      }
    }
  };

  const handleSkip = () => {
    commitQuestionTelemetry(null); 

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      questionStartTime.current = Date.now();
    } else {
      handleNext(); 
    }
  };

  const formatTime = (secondsAccumulator: number) => {
    const mins = Math.floor(secondsAccumulator / 60);
    const secs = secondsAccumulator % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading && questions?.length === 0) {
    return <EnhancedQuizLoader />;
  }

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const selectedOption = answers[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* 1. TOP NAV & PROGRESS */}
      <View style={styles.topNav}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.exitBtn}
          >
            <Ionicons name="close" size={24} color="#1A237E" />
          </TouchableOpacity>

          <View style={styles.centerBadge}>
            <Ionicons name="timer-outline" size={16} color="#1A237E" />
            <Text style={styles.timerText}>{formatTime(totalSeconds)}</Text>
          </View>

          {/* ✅ Updated from PALETTE to JUMP TO with intuitive location pin icon */}
          <TouchableOpacity
            onPress={() => setShowPalette(true)}
            style={styles.paletteToggle}
          >
            <Ionicons name="location-outline" size={18} color="#FFF" />
            <Text style={styles.paletteLabel}>JUMP TO</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* 2. QUESTION BODY */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollBody}
      >
        <Text style={styles.questionTitle}>Question: {currentIndex + 1}</Text>
        <Text style={styles.questionText}>{currentQuestion.question_text}</Text>

        <View style={styles.optionsList}>
          {currentQuestion.options.map((option, index) => {
            const label = String.fromCharCode(65 + index); 
            const isSelected = selectedOption === index;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => handleSelectOption(index)}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedOptionCard,
                ]}
              >
                <View
                  style={[
                    styles.optionLabel,
                    isSelected && styles.selectedLabel,
                  ]}
                >
                  <Text
                    style={[styles.labelText, isSelected && styles.whiteText]}
                  >
                    {label}
                  </Text>
                </View>
                <Text
                  style={[styles.optionText, isSelected && styles.whiteText]}
                >
                  {option}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* 3. TACTICAL FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
              questionStartTime.current = Date.now();
            }
          }}
          style={[styles.navBtn, currentIndex === 0 && { opacity: 0.3 }]}
          disabled={currentIndex === 0}
        >
          <Ionicons name="chevron-back" size={24} color="#1A237E" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={handleNext}
          disabled={loading}
        >
          <LinearGradient
            colors={["#1A237E", "#3949AB"]}
            style={styles.nextGradient}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <>
                <Text style={styles.nextText}>
                  {currentIndex === totalQuestions - 1 ? "FINISH" : "NEXT"}
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 4. GRID JUMP TO MODAL */}
      <Modal visible={showPalette} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <Animatable.View
            animation="slideInUp"
            duration={400}
            style={styles.paletteDrawer}
          >
            <View style={styles.drawerHeader}>
              <View>
                {/* ✅ Refactored wording alignment */}
                <Text style={styles.drawerTitle}>Jump To Question</Text>
                <Text style={styles.drawerSub}>Select any matrix node to pivot positions</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowPalette(false)}
                style={styles.closeModal}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={styles.paletteGrid}
              showsVerticalScrollIndicator={false}
            >
              {questions.map((_, i) => {
                const isAnswered = answers[i] !== undefined;
                const isCurrent = currentIndex === i;
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setCurrentIndex(i);
                      setShowPalette(false);
                      questionStartTime.current = Date.now();
                    }}
                    style={[
                      styles.gridItem,
                      isAnswered && styles.answeredItem,
                      isCurrent && styles.currentItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.gridItemText,
                        isAnswered && styles.whiteText,
                        isCurrent && !isAnswered && { color: "#1A237E" },
                      ]}
                    >
                      {i + 1}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animatable.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FE" },
  centerLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FE",
  },
  loadingText: {
    marginTop: 14,
    color: "#1A237E",
    fontWeight: "700",
    fontSize: 14,
  },
  topNav: {
    backgroundColor: "#FFF",
    paddingBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 15,
  },
  exitBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F0F2F8",
    justifyContent: "center",
    alignItems: "center",
  },
  centerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8EAF6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  timerText: {
    fontWeight: "800",
    color: "#1A237E",
    marginLeft: 6,
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  paletteToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A237E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  paletteLabel: {
    color: "#FFF",
    fontWeight: "800",
    marginLeft: 6,
    fontSize: 12,
  },
  progressContainer: { height: 4, backgroundColor: "#E0E0E0", width: "100%" },
  progressBar: { height: "100%", backgroundColor: "#1A237E" },
  scrollBody: { padding: 25 },
  questionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#3949AB",
    marginBottom: 6,
  },
  questionText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A237E",
    lineHeight: 30,
    marginBottom: 30,
  },
  optionsList: { gap: 12 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E8EAF6",
    elevation: 2,
  },
  selectedOptionCard: {
    backgroundColor: "#1A237E",
    borderColor: "#1A237E",
    elevation: 8,
  },
  optionLabel: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F0F2F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  selectedLabel: { backgroundColor: "rgba(255,255,255,0.2)" },
  labelText: { fontWeight: "900", color: "#1A237E", fontSize: 14 },
  optionText: { flex: 1, fontSize: 16, fontWeight: '700', color: "#475569" },
  whiteText: { color: "#FFF" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F2F8",
    alignItems: "center",
  },
  navBtn: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#F0F2F8",
    justifyContent: "center",
    alignItems: "center",
  },
  skipBtn: { paddingHorizontal: 20 },
  skipText: { color: "#94A3B8", fontWeight: "800", letterSpacing: 1 },
  nextBtn: { borderRadius: 15, overflow: "hidden", elevation: 4 },
  nextGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 14,
  },
  nextText: { color: "#FFF", fontWeight: "900", fontSize: 16, marginRight: 8 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(26, 35, 126, 0.4)",
    justifyContent: "flex-end",
  },
  paletteDrawer: {
    backgroundColor: "#FFF",
    height: height * 0.65,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 25,
    elevation: 20,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  drawerTitle: { fontSize: 22, fontWeight: "900", color: "#1A237E" },
  drawerSub: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "600",
    marginTop: 4,
  },
  closeModal: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F2F8",
    justifyContent: "center",
    alignItems: "center",
  },
  paletteGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingBottom: 30,
  },
  gridItem: {
    width: (width - 110) / 5,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#F0F2F8",
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
    borderWidth: 1,
    borderColor: "#E8EAF6",
  },
  answeredItem: { backgroundColor: "#1A237E", borderColor: "#1A237E" },
  currentItem: {
    borderColor: "#1A237E",
    borderWidth: 2,
    backgroundColor: "#FFF",
  },
  gridItemText: { fontWeight: "900", color: "#94A3B8" },
});