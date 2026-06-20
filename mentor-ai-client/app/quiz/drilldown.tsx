import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

export default function DeepAnalysisScreen() {
  const { filter } = useLocalSearchParams();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [showInsight, setShowInsight] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState("");

  // Example data set for the selected filter
  const currentQuestions = [10, 12, 15];
  const isLast = activeIndex === currentQuestions.length - 1;

  const handleNextAction = () => {
    if (isLast) {
      // Logic for returning to previous plan page
      setShowInsight(false);
      router.back();
    } else {
      setShowInsight(false);
      setSelectedReason(null);
      setCustomReason("");
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* 1. QUESTION CONTEXT LAYER */}
      <View style={styles.baseLayer}>
        <View style={styles.header}>
          <Text style={styles.headerLabel}>{filter} ANALYSIS</Text>
          <Text style={styles.headerTitle}>
            Q{currentQuestions[activeIndex]} Investigation
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.questionSection}>
            <Text style={styles.questionText}>
              "A reduction of 20% in the price of salt enables a purchaser to
              obtain 4 kg more for ₹100. What is the reduced price of salt per
              kg?"
            </Text>
          </View>

          <View style={styles.comparisonGrid}>
            <View style={styles.ansCard}>
              <Text style={styles.ansTag}>SELECTED</Text>
              <Text style={styles.ansValRed}>
                {filter === "SKIP" ? "N/A" : "₹6.25"}
              </Text>
            </View>
            <View style={[styles.ansCard, styles.correctCard]}>
              <Text style={styles.ansTagGreen}>CORRECT</Text>
              <Text style={styles.ansValBold}>₹5.00</Text>
            </View>
          </View>

          <View style={styles.promptSection}>
            <Text style={styles.promptText}>Analyze your mental block:</Text>
            <View style={styles.reasonGrid}>
              {[
                "Concept Gap",
                "Calculation Error",
                "Panic/Time",
                "Misread",
              ].map((r) => (
                <TouchableOpacity
                  key={r}
                  onPress={() => setSelectedReason(r)}
                  style={[
                    styles.reasonChip,
                    selectedReason === r && styles.activeReason,
                  ]}
                >
                  <Text
                    style={[
                      styles.reasonChipText,
                      selectedReason === r && styles.whiteText,
                    ]}
                  >
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.reflectionInput}
              placeholder="Describe exactly what went wrong in your steps..."
              placeholderTextColor="#94A3B8"
              multiline
              value={customReason}
              onChangeText={setCustomReason}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.triggerBtn}
          onPress={() => setShowInsight(true)}
        >
          <LinearGradient
            colors={["#1A237E", "#3949AB"]}
            style={styles.triggerGradient}
          >
            <Text style={styles.triggerBtnText}>Generate Deep Analysis</Text>
            <Ionicons name="hardware-chip-outline" size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 3. DEEP STRATEGY OVERLAY */}
      <Modal visible={showInsight} animationType="slide" transparent={true}>
        <View style={styles.overlayContainer}>
          <Animatable.View
            animation="slideInUp"
            duration={400}
            style={styles.insightDrawer}
          >
            <View style={styles.drawerHandle} />
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Strategic Optimization</Text>
              <TouchableOpacity onPress={() => setShowInsight(false)}>
                <Ionicons name="close" size={24} color="#1A237E" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.analysisBlock}>
                <View style={styles.blockHeader}>
                  <Text style={styles.blockTitle}>CONVENTIONAL PATH</Text>
                  <Text style={styles.timeLabelRed}>⏱ 140s - 180s</Text>
                </View>
                <Text style={styles.methodSteps}>
                  1. Let original price be{" "}
                  <Text style={styles.boldItalic}>x</Text>. Reduced price is{" "}
                  <Text style={styles.boldItalic}>0.8x</Text>.{"\n\n"}
                  2. Form Equation:{"\n"}
                  <Text style={styles.equationText}>
                    {" "}
                    (100 / 0.8x) — (100 / x) = 4
                  </Text>
                  {"\n\n"}
                  3. Solve for <Text style={styles.boldItalic}>x</Text>:{"\n"}
                  <Text style={styles.boldItalic}>x = 6.25</Text>
                  {"\n"}
                  Reduced Price ={" "}
                  <Text style={styles.boldItalic}>0.8 × 6.25 = 5</Text>
                </Text>
              </View>

              <View style={[styles.analysisBlock, styles.smartBlock]}>
                <View style={styles.blockHeader}>
                  <Text style={styles.blockTitleGreen}>
                    SMART TRICK (Price-Quantity Inverse)
                  </Text>
                  <Text style={styles.timeLabelGreen}>⚡ 8s - 12s</Text>
                </View>
                <Text style={styles.methodSteps}>
                  <Text style={styles.bold}>The Mental Model:</Text> Saved Money
                  (20% of 100) = ₹20.{"\n"}
                  <Text style={styles.bold}>Calculation:</Text> This ₹20 buys
                  the extra 4 kg.{"\n"}
                  <Text style={styles.bold}>Result:</Text> ₹20 / 4 kg ={" "}
                  <Text style={styles.bold}>₹5/kg</Text>.
                </Text>
              </View>

              <View style={styles.finalWalkthrough}>
                <Text style={styles.walkTitle}>End-to-End Execution Flow</Text>
                <View style={styles.stepRow}>
                  <View style={styles.stepNum}>
                    <Text style={styles.stepNumText}>1</Text>
                  </View>
                  <Text style={styles.stepDesc}>
                    Calculate saved percentage of total money.
                  </Text>
                </View>
                <View style={styles.stepRow}>
                  <View style={styles.stepNum}>
                    <Text style={styles.stepNumText}>2</Text>
                  </View>
                  <Text style={styles.stepDesc}>
                    Divide result by extra quantity for Reduced Price.
                  </Text>
                </View>
              </View>

              {/* ACTION BUTTON WITH LOGIC TO RETURN TO PLAN PAGE */}
              <TouchableOpacity
                style={[styles.nextBtn, isLast && styles.returnBtn]}
                onPress={handleNextAction}
              >
                <Text style={styles.nextText}>
                  {isLast
                    ? `Finish ${filter} Analysis`
                    : "Analyze Next Question"}
                </Text>
                <Ionicons
                  name={
                    isLast ? "checkmark-done-circle" : "arrow-forward-circle"
                  }
                  size={20}
                  color="#FFF"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>

              {isLast && (
                <Text style={styles.footerNote}>
                  All {filter.toLowerCase()} questions reviewed. Returning to
                  your Improvement Plan.
                </Text>
              )}
            </ScrollView>
          </Animatable.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FE" },
  baseLayer: { flex: 1, padding: 25 },
  header: { marginBottom: 20 },
  headerLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 1.5,
  },
  headerTitle: { fontSize: 24, fontWeight: "900", color: "#1A237E" },
  questionSection: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  questionText: {
    fontSize: 16,
    color: "#1E293B",
    lineHeight: 26,
    fontWeight: "600",
  },
  comparisonGrid: { flexDirection: "row", gap: 12, marginBottom: 25 },
  ansCard: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  correctCard: { backgroundColor: "#F0FDF4", borderColor: "#4ADE80" },
  ansTag: { fontSize: 8, fontWeight: "900", color: "#94A3B8", marginBottom: 4 },
  ansTagGreen: {
    fontSize: 8,
    fontWeight: "900",
    color: "#4ADE80",
    marginBottom: 4,
  },
  ansValRed: { fontSize: 16, fontWeight: "800", color: "#EF4444" },
  ansValBold: { fontSize: 16, fontWeight: "900", color: "#1A237E" },
  promptSection: { marginBottom: 20 },
  promptText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A237E",
    marginBottom: 15,
  },
  reasonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 15,
  },
  reasonChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFF",
  },
  activeReason: { backgroundColor: "#1A237E", borderColor: "#1A237E" },
  reasonChipText: { fontSize: 12, fontWeight: "700", color: "#64748B" },
  whiteText: { color: "#FFF" },
  reflectionInput: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 15,
    height: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    color: "#1A237E",
  },
  triggerBtn: {
    margin: 25,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
  },
  triggerGradient: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  triggerBtnText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 16,
    marginRight: 10,
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    justifyContent: "flex-end",
  },
  insightDrawer: {
    backgroundColor: "#FFF",
    height: height * 0.85,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
  },
  drawerHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  drawerTitle: { fontSize: 20, fontWeight: "900", color: "#1A237E" },
  analysisBlock: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#F1F3F9",
  },
  smartBlock: { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" },
  blockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  blockTitle: { fontSize: 10, fontWeight: "900", color: "#64748B" },
  blockTitleGreen: { fontSize: 10, fontWeight: "900", color: "#166534" },
  timeLabelRed: { fontSize: 11, fontWeight: "800", color: "#EF4444" },
  timeLabelGreen: { fontSize: 11, fontWeight: "800", color: "#22C55E" },
  methodSteps: { fontSize: 13, color: "#334155", lineHeight: 22 },
  bold: { fontWeight: "800" },
  finalWalkthrough: {
    backgroundColor: "#F1F5F9",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  walkTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#1A237E",
    marginBottom: 15,
  },
  stepRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1A237E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumText: { color: "#FFF", fontSize: 12, fontWeight: "900" },
  stepDesc: { flex: 1, fontSize: 13, color: "#475569", fontWeight: "600" },
  nextBtn: {
    backgroundColor: "#1A237E",
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  returnBtn: { backgroundColor: "#22C55E" },
  nextText: { color: "#FFF", fontWeight: "900" },
  footerNote: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 20,
  },
  boldItalic: {
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#1A237E',
  },
  equationText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A237E',
    backgroundColor: '#F1F5F9', // Light gray background to make the math pop
    paddingHorizontal: 4,
  },
});
