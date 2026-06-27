import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, SafeAreaView, Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PlanOnboardingStage } from "@/components/PlanOnboardingStage";
import { AdaptiveStatusBar } from "@/components/AdaptiveStatusBar";

const { width, height } = Dimensions.get("window");

export default function AdaptiveCommandCenterScreen() {
  const [hasActivePlan, setHasActivePlan] = useState(false); 
  const [setupStage, setSetupStage] = useState(1);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false); 
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0); 
  const [selectedDate, setSelectedDate] = useState(27); 
  const [showSyncBreakdownModal, setShowSyncBreakdownModal] = useState(false);

  const [startDateObj, setStartDateObj] = useState(new Date("2026-06-27"));
  const [endDateObj, setEndDateObj] = useState(new Date("2026-12-27"));
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["1", "2"]);
  const [challengeTier, setChallengeTier] = useState("mix");

  // Pinned baseline platform loadout state
  const [timelineBlueprint, setTimelineBlueprint] = useState([
    { id: 1, label: "Month 1: June 2026", focusSubject: "Quant" as const, daysCount: 30, monthString: "06", revisionFocus: "Baseline diagnostics mapping", allocatedTopics: [{ id: "ST_101", name: "Time and Work Pro", accuracy: "42%" }, { id: "ST_103", name: "Data Interpretation (Pie Charts)", accuracy: "58%" }] },
    { id: 2, label: "Month 2: July 2026", focusSubject: "Reasoning" as const, daysCount: 31, monthString: "07", revisionFocus: "Core speed drills validation", allocatedTopics: [{ id: "ST_104", name: "Syllogism Diagram Chains", accuracy: "74%" }, { id: "ST_105", name: "Circular Seating Arrangements", accuracy: "39%" }] },
    { id: 3, label: "Month 3: August 2026", focusSubject: "Mix" as const, daysCount: 31, monthString: "08", revisionFocus: "🔄 Back-Review: Month 1 Quant Foundations", allocatedTopics: [{ id: "ST_101", name: "Time and Work Pro", accuracy: "42%" }, { id: "ST_106", name: "Blood Relation Matrix", accuracy: "82%" }] },
    { id: 4, label: "Month 4: September 2026", focusSubject: "Quant" as const, daysCount: 30, monthString: "09", revisionFocus: "🔄 Back-Review: Month 2 Reasoning Core", allocatedTopics: [{ id: "ST_102", name: "Permutations & Combinations", accuracy: "31%" }, { id: "ST_103", name: "Data Interpretation (Pie Charts)", accuracy: "58%" }] },
    { id: 5, label: "Month 5: October 2026", focusSubject: "Reasoning" as const, daysCount: 31, monthString: "10", revisionFocus: "🔄 Mega Review: Multi-subject cross mixes", allocatedTopics: [{ id: "ST_104", name: "Syllogism Diagram Chains", accuracy: "74%" }, { id: "ST_105", name: "Circular Seating Arrangements", accuracy: "39%" }] },
    { id: 6, label: "Month 6: November 2026", focusSubject: "Mix" as const, daysCount: 30, monthString: "11", revisionFocus: "🎓 High-Yield Mock Marathons & OPSC simulation", allocatedTopics: [{ id: "ST_102", name: "Permutations & Combinations", accuracy: "31%" }, { id: "ST_107", name: "Reading Comprehension Traps", accuracy: "65%" }] },
  ]);

  const days = useMemo(() => {
    const activeMonth = timelineBlueprint[selectedMonthIndex];
    return Array.from({ length: activeMonth?.daysCount || 30 }, (_, i) => {
      const dNum = i + 1;
      const isJune = selectedMonthIndex === 0;
      const startBound = startDateObj.getDate();
      return { id: dNum, active: isJune ? dNum < 27 : false, isToday: isJune && dNum === 27, isSelectable: isJune ? (dNum >= startBound) : true };
    });
  }, [selectedMonthIndex, startDateObj, timelineBlueprint]);

  const selectedDateString = useMemo(() => {
    const activeMonth = timelineBlueprint[selectedMonthIndex];
    return `2026-${activeMonth?.monthString || "06"}-${selectedDate < 10 ? "0" + selectedDate : selectedDate}`;
  }, [selectedDate, selectedMonthIndex, timelineBlueprint]);

  const dailyPlanDatabase: Record<string, any> = {
    "2026-06-27": { topicTitle: "Quantitative Aptitude", subTopic: "Time and Work", trickTitle: "The LCM Efficiency Engine Shortcut", trickFormula: "Total Work = LCM of individual day targets. Efficiency Rate = Total Work / Individual Days.", howToIdentify: "Look for keywords like 'working together' or 'alternating shifts'. Calculate total units using absolute numbers to sidestep fractional equations.", userAccuracy: "48% Accuracy" },
  };

  const activeDayPlan = useMemo(() => {
    return dailyPlanDatabase[selectedDateString] || { topicTitle: "General Syllabus Calibration", subTopic: "Comprehensive Setup Review", trickTitle: "Active Error Mapping", trickFormula: "Isolate specific question triggers from your past failed attempts.", howToIdentify: "Look for semantic cues in question phrasing where calculation patterns repeat.", userAccuracy: "62% Baseline Accuracy" };
  }, [selectedDateString]);

  const handleUpdateMonthTopics = (monthId: number, updatedTopics: any[]) => {
    setTimelineBlueprint(prev => prev.map(m => m.id === monthId ? { ...m, allocatedTopics: updatedTopics } : m));
  };

  const syncMetrics = { planScopeSummary: "4 Core Topics • 12 Assigned Sub-topics Scheduled", recentImprovements: "+15% velocity jump on Seating Arrays, +8% optimization on Ratio extractions.", skippedLogs: [{ date: "2026-06-25", topicName: "Time and Distance (Relative Speed)", overallScore: "55% Accuracy" }, { date: "2026-06-26", topicName: "Logical Reasoning (Syllogism Chains)", overallScore: "42% Accuracy" }] };

  return (
    <SafeAreaView style={styles.masterSafeContainer}>
      {!hasActivePlan ? (
        <ScrollView style={styles.section} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <PlanOnboardingStage
            stage={setupStage} startDateObj={startDateObj} endDateObj={endDateObj} selectedTopics={selectedTopics} challengeTier={challengeTier} timelineBlueprint={timelineBlueprint}
            onStartDateChange={setStartDateObj} onEndDateChange={setEndDateObj}
            onToggleTopic={(id) => setSelectedTopics(p => p.includes(id) ? p.filter(t => t !== id) : [...p, id])}
            onChangeTier={setChallengeTier}
            onRotateSubject={(id) => setTimelineBlueprint(p => p.map(m => m.id === id ? { ...m, focusSubject: m.focusSubject === "Quant" ? "Reasoning" : m.focusSubject === "Reasoning" ? "Mix" : "Quant" } : m))}
            onUpdateMonthTopics={handleUpdateMonthTopics}
            onNext={() => { if(selectedTopics.length === 0) return Alert.alert("Required", "Select a topic area."); setSetupStage(2); }}
            onBack={() => setSetupStage(1)}
            onFinalize={() => { setSelectedDate(startDateObj.getDate()); setHasActivePlan(true); }}
          />
        </ScrollView>
      ) : (
        <ScrollView style={styles.section} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}><Text style={styles.sectionLabel}>AI CURATED INTELLIGENCE FEED</Text><Text style={styles.mainTitle}>Adaptive Execution Hub</Text></View>
            <TouchableOpacity style={styles.aiRefresh} onPress={() => { setHasActivePlan(false); setSetupStage(1); }}><Ionicons name="options-outline" size={18} color="#2563EB" /></TouchableOpacity>
          </View>

          <AdaptiveStatusBar expanded={isSummaryExpanded} onToggle={() => setIsSummaryExpanded(!isSummaryExpanded)} scopeSummary={syncMetrics.planScopeSummary} improvements={syncMetrics.recentImprovements} skippedLogs={syncMetrics.skippedLogs} onLaunchAudit={() => setShowSyncBreakdownModal(true)} />

          <View style={styles.sectionCalendar}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.monthSelectorBar}>
                <TouchableOpacity disabled={selectedMonthIndex === 0} onPress={() => { setSelectedMonthIndex(p => p - 1); setSelectedDate(1); }}><Ionicons name="chevron-back" size={16} color="#475569" /></TouchableOpacity>
                <Text style={styles.monthTitleText}>{timelineBlueprint[selectedMonthIndex]?.label.split(": ")[1]}</Text>
                <TouchableOpacity disabled={selectedMonthIndex === timelineBlueprint.length - 1} onPress={() => { setSelectedMonthIndex(p => p + 1); setSelectedDate(1); }}><Ionicons name="chevron-forward" size={16} color="#475569" /></TouchableOpacity>
              </View>
              <View style={styles.streakBadge}><Ionicons name="bookmark" size={11} color="#B45309" /><Text style={styles.streakText}>DAY {selectedDate}</Text></View>
            </View>

            <View style={styles.calendarGrid}>
              {days.map((day) => (
                <TouchableOpacity key={day.id} disabled={!day.isSelectable} onPress={() => setSelectedDate(day.id)} style={[styles.dayBox, day.active && styles.dayActive, day.id === selectedDate && styles.daySelected, day.isToday && styles.dayToday, !day.isSelectable && styles.dayDisabled]}>
                  <Text style={[styles.dayNumber, (day.active || day.id === selectedDate) && { color: "#FFF" }, day.isToday && day.id !== selectedDate && { color: "#1A237E" }, !day.isSelectable && { color: "#CBD5E1" }]}>{day.id}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.currentGoalWrapper}>
            <View style={styles.goalBadgeContainer}><Text style={styles.goalBadgeText}>CALIBRATED RUN TASK</Text></View>
            <Text style={styles.goalDateSubText}>{activeDayPlan.subTopic} Blueprint</Text>
            <Text style={styles.accuracyWarningText}>Active Subject Diagnostic Accuracy: {activeDayPlan.userAccuracy}</Text>
          </View>

          <View style={styles.conceptCard}>
            <View style={styles.conceptHeaderRow}><Ionicons name="sparkles-outline" size={16} color="#B45309" /><Text style={styles.conceptMetaTitle}>STRATEGIC IDENTIFICATION CARD</Text></View>
            <Text style={styles.conceptTitle}>{activeDayPlan.trickTitle}</Text>
            <View style={styles.formulaCalloutBox}><Text style={styles.formulaBodyText}>{activeDayPlan.trickFormula}</Text></View>
            <View style={styles.howToIdentifyBlock}><Text style={styles.howToIdentifyTitleText}>💡 HOW TO SPOT TRIGGER PATTERNS IN QUESTIONS:</Text><Text style={styles.howToIdentifyBodyText}>{activeDayPlan.howToIdentify}</Text></View>
          </View>

          <View style={styles.executionCard}>
            <Text style={styles.executionMetaLabel}>READY FOR EVALUATION WORKSPACE?</Text>
            <Text style={styles.executionSubjectTitle}>Test your shortcut retrieval speeds</Text>
            <View style={styles.instructionAnxietyBufferCard}>
              <Ionicons name="shield-checkmark" size={15} color="#059669" /><Text style={styles.instructionAnxietyBufferText}>Take time to practice equations from your personal sources first. Once prepared, launch this diagnostic task to update your metric profiles.</Text>
            </View>
            <TouchableOpacity style={styles.launchQuizButton} onPress={() => Alert.alert("Launching Lab", "Assembling targeted question bank.")}><Text style={styles.launchQuizButtonText}>LAUNCH TODAY'S DIAGNOSTIC TEST</Text></TouchableOpacity>
          </View>

          <View style={styles.actionGridFooter}>
            <TouchableOpacity style={styles.modifySettingsButton} onPress={() => { setHasActivePlan(false); setSetupStage(1); }}><Ionicons name="options-outline" size={16} color="#475569" /><Text style={styles.modifySettingsButtonText}>Reset Plan</Text></TouchableOpacity>
            <TouchableOpacity style={styles.refreshReSyncButton} onPress={() => Alert.alert("Adaptive Re-Sync Triggered", "Outstanding tasks distributed smoothly into remaining windows.")}><Ionicons name="sync-outline" size={16} color="#2563EB" /><Text style={styles.refreshReSyncButtonText}>Re-Sync Matrix</Text></TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <Modal visible={showSyncBreakdownModal} animationType="slide" transparent={true}>
        <View style={styles.modalBackdropShadow}>
          <View style={styles.syncDetailsSheet}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalMainTitleText}>Syllabus Ledger Logs</Text>
              <TouchableOpacity style={styles.modalCloseCircle} onPress={() => setShowSyncBreakdownModal(false)}><Ionicons name="close" size={18} color="#475569" /></TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {syncMetrics.skippedLogs.map((row, idx) => (
                <View key={idx} style={styles.ledgerRowItemCard}><Text style={styles.ledgerRowTopicName}>{row.topicName}</Text><Text style={styles.ledgerRowSubjectMeta}>Deadline Log: {row.date} • {row.overallScore}</Text></View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  masterSafeContainer: { flex: 1, backgroundColor: "#F8FAFC" },
  section: { paddingHorizontal: 24, marginTop: 15, flex: 1 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  sectionLabel: { fontSize: 9, fontWeight: "900", color: "#94A3B8", letterSpacing: 1.5 },
  mainTitle: { fontSize: 24, fontWeight: "900", color: "#0F172A", marginTop: 2 },
  aiRefresh: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#EFF6FF", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#BFDBFE" },
  sectionCalendar: { marginBottom: 20 },
  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  monthSelectorBar: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#F1F5F9", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: "#E2E8F0" },
  arrowBtn: { padding: 2 },
  monthTitleText: { color: "#1E293B", fontSize: 13, fontWeight: "800", minWidth: 90, textAlign: "center" },
  streakBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#FEF3C7", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  streakText: { fontSize: 10, fontWeight: "900", color: "#B45309" },
  calendarGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  dayBox: { width: (width - 100) / 6, height: (width - 100) / 6, borderRadius: 12, backgroundColor: "#F1F5F9", justifyContent: "center", alignItems: "center", marginBottom: 8 },
  dayActive: { backgroundColor: "#CBD5E1" },
  daySelected: { backgroundColor: "#1A237E" },
  dayToday: { borderWidth: 2, borderColor: "#1A237E" },
  dayDisabled: { backgroundColor: "#F8FAFC", borderColor: "#F1F5F9", opacity: 0.3 },
  dayNumber: { fontSize: 12, fontWeight: "800", color: "#475569" },
  currentGoalWrapper: { marginBottom: 12 },
  goalBadgeContainer: { backgroundColor: "#E0F2FE", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: "flex-start" },
  goalBadgeText: { color: "#0369A1", fontSize: 9, fontWeight: "900" },
  goalDateSubText: { color: "#0F172A", fontSize: 18, fontWeight: "900", marginTop: 4 },
  accuracyWarningText: { color: "#D97706", fontSize: 12, fontWeight: "700", marginTop: 2 },
  conceptCard: { backgroundColor: "#FFF7ED", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#FFEDD5", marginBottom: 14 },
  conceptHeaderRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  conceptMetaTitle: { color: "#C2410C", fontSize: 9, fontWeight: "900" },
  conceptTitle: { color: "#7C2D12", fontSize: 16, fontWeight: "800" },
  formulaCalloutBox: { backgroundColor: "#FFFFFF", padding: 12, borderRadius: 10, borderLeftWidth: 3, borderLeftColor: "#EA580C", marginTop: 8, marginBottom: 10 },
  formulaBodyText: { color: "#431407", fontSize: 13, fontWeight: "700", fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  howToIdentifyBlock: { backgroundColor: "rgba(255,255,255,0.5)", padding: 12, borderRadius: 10, marginTop: 4 },
  howToIdentifyTitleText: { color: "#9A3412", fontSize: 10, fontWeight: "900" },
  howToIdentifyBodyText: { color: "#7C2D12", fontSize: 13, fontWeight: "600", marginTop: 4, lineHeight: 18 },
  executionCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 18, borderWidth: 1, borderColor: "#E2E8F0", marginBottom: 20 },
  executionMetaLabel: { color: "#64748B", fontSize: 9, fontWeight: "800" },
  executionSubjectTitle: { color: "#0F172A", fontSize: 15, fontWeight: "800", marginTop: 2 },
  instructionAnxietyBufferCard: { flexDirection: "row", gap: 8, backgroundColor: "#E6F4EA", padding: 12, borderRadius: 12, borderWidth: 1, borderColor: "#A7F3D0", marginTop: 12, marginBottom: 16 },
  instructionAnxietyBufferText: { color: "#065F46", fontSize: 12, fontWeight: "600", flex: 1, lineHeight: 18 },
  launchQuizButton: { backgroundColor: "#2563EB", borderRadius: 12, padding: 15, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 10 },
  launchQuizButtonText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  actionGridFooter: { flexDirection: "row", gap: 8, marginTop: 10 },
  modifySettingsButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: "#CBD5E1", backgroundColor: "#FFFFFF" },
  modifySettingsButtonText: { color: "#475569", fontSize: 12, fontWeight: "800" },
  refreshReSyncButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 14, borderRadius: 12, backgroundColor: "#EFF6FF", borderWidth: 1, borderColor: "#BFDBFE" },
  refreshReSyncButtonText: { color: "#2563EB", fontSize: 12, fontWeight: "800" },
  modalBackdropShadow: { flex: 1, backgroundColor: "rgba(15,23,42,0.4)", justifyContent: "flex-end" },
  syncDetailsSheet: { backgroundColor: "#FFFFFF", borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, maxHeight: height * 0.8 },
  modalHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  modalMainTitleText: { color: "#0F172A", fontSize: 20, fontWeight: "900" },
  modalCloseCircle: { backgroundColor: "#F1F5F9", padding: 6, borderRadius: 20 },
  ledgerRowItemCard: { padding: 14, backgroundColor: "#F8FAFC", borderRadius: 12, borderWidth: 1, borderColor: "#E2E8F0", marginBottom: 8 },
  ledgerRowTopicName: { color: "#1E293B", fontSize: 14, fontWeight: "800" },
  ledgerRowSubjectMeta: { color: "#64748B", fontSize: 11, marginTop: 2 }
});