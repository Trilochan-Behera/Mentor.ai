import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Dimensions, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { height } = Dimensions.get("window");

interface MilestoneMonth {
  id: number;
  label: string;
  focusSubject: "Quant" | "Reasoning" | "Mix";
  daysCount: number;
  monthString: string;
  revisionFocus: string;
  allocatedTopics: { id: string; name: string; accuracy: string }[];
}

interface OnboardingProps {
  stage: number;
  startDateObj: Date;
  endDateObj: Date;
  selectedTopics: string[];
  challengeTier: string;
  timelineBlueprint: MilestoneMonth[];
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onToggleTopic: (id: string) => void;
  onChangeTier: (tier: string) => void;
  onRotateSubject: (id: number) => void;
  onUpdateMonthTopics: (monthId: number, updatedTopics: { id: string; name: string; accuracy: string }[]) => void;
  onNext: () => void;
  onBack: () => void;
  onFinalize: () => void;
}

// Global baseline lookup pool
const GLOBAL_SUBTOPIC_POOL = [
  { id: "ST_101", name: "Time and Work Pro", accuracy: "42%" },
  { id: "ST_102", name: "Permutations & Combinations", accuracy: "31%" },
  { id: "ST_103", name: "Data Interpretation (Pie Charts)", accuracy: "58%" },
  { id: "ST_104", name: "Syllogism Diagram Chains", accuracy: "74%" },
  { id: "ST_105", name: "Circular Seating Arrangements", accuracy: "39%" },
  { id: "ST_106", name: "Blood Relation Matrix", accuracy: "82%" },
  { id: "ST_107", name: "Reading Comprehension Traps", accuracy: "65%" },
];

// Baseline suggestions dictionary used to differentiate platform vs user choices
const DEFAULT_SUGGESTION_IDS = ["ST_101", "ST_103", "ST_104", "ST_105", "ST_106", "ST_107"];

export function PlanOnboardingStage({
  stage, startDateObj, endDateObj, selectedTopics, challengeTier, timelineBlueprint,
  onStartDateChange, onEndDateChange, onToggleTopic, onChangeTier, onRotateSubject, onUpdateMonthTopics, onNext, onBack, onFinalize
}: OnboardingProps) {

  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);
  const [editingMonth, setEditingMonth] = useState<MilestoneMonth | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const masterFormTopics = [
    { id: "1", title: "Quantitative Aptitude", sub: "Calculations, Math, and DI", icon: "calculator", color: "#3B82F6" },
    { id: "2", title: "Logical Reasoning", sub: "Syllogisms, Puzzles, Sequences", icon: "git-branch", color: "#10B981" },
    { id: "3", title: "Verbal Ability", sub: "Grammar & Reading Comprehension", icon: "book", color: "#8B5CF6" },
  ];

  const formatDisplayDate = (dateInstance: Date) => {
    try { return dateInstance.toISOString().split("T")[0]; } catch (e) { return "2026-06-27"; }
  };

  const handleRemoveTopicFromMonth = (topicId: string) => {
    if (!editingMonth) return;
    const filtered = editingMonth.allocatedTopics.filter(t => t.id !== topicId);
    const updated = { ...editingMonth, allocatedTopics: filtered };
    setEditingMonth(updated);
    onUpdateMonthTopics(editingMonth.id, filtered);
  };

  const handleAddTopicToMonth = (topic: { id: string; name: string; accuracy: string }) => {
    if (!editingMonth) return;
    if (editingMonth.allocatedTopics.some(t => t.id === topic.id)) return;
    
    const augmented = [...editingMonth.allocatedTopics, { id: topic.id, name: topic.name, accuracy: topic.accuracy }];
    const updated = { ...editingMonth, allocatedTopics: augmented };
    setEditingMonth(updated);
    onUpdateMonthTopics(editingMonth.id, augmented);
  };

  const filteredPoolOptions = GLOBAL_SUBTOPIC_POOL.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (stage === 1) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.headerBlock}>
          <Text style={styles.metaLabel}>LOGIC.AI COMPILER • STAGE 1 OF 2</Text>
          <Text style={styles.mainTitle}>Configure Horizons</Text>
          <Text style={styles.subTitle}>Select your preparation timeline thresholds safely.</Text>
        </View>

        <View style={styles.premiumCard}>
          <Text style={styles.cardHeading}>1. Target Scheduling Windows</Text>
          <View style={styles.datePickerControlRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>RUNWAY START DATE</Text>
              <TouchableOpacity style={styles.pickerSelectorBtn} onPress={() => setStartPickerVisibility(true)}>
                <Ionicons name="calendar-outline" size={16} color="#2563EB" />
                <Text style={styles.pickerSelectorBtnText}>{formatDisplayDate(startDateObj)}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>PLAN EXAM DATE</Text>
              <TouchableOpacity style={styles.pickerSelectorBtn} onPress={() => setEndPickerVisibility(true)}>
                <Ionicons name="flag-outline" size={16} color="#EF4444" />
                <Text style={styles.pickerSelectorBtnText}>{formatDisplayDate(endDateObj)}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.premiumCard}>
          <Text style={styles.cardHeading}>2. Choose Target Focus Topics</Text>
          {masterFormTopics.map((topic) => {
            const isChecked = selectedTopics.includes(topic.id);
            return (
              <TouchableOpacity key={topic.id} style={[styles.topicRow, isChecked && styles.topicRowActive]} onPress={() => onToggleTopic(topic.id)}>
                <View style={styles.topicLeft}>
                  <View style={[styles.iconFrame, { backgroundColor: topic.color + "15" }]}><Ionicons name={topic.icon as any} size={18} color={topic.color} /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    <Text style={styles.topicSub}>{topic.sub}</Text>
                  </View>
                </View>
                <Ionicons name={isChecked ? "checkmark-circle" : "ellipse-outline"} size={22} color={isChecked ? "#2563EB" : "#CBD5E1"} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.premiumCard}>
          <Text style={styles.cardHeading}>3. Question Density Profile</Text>
          <View style={styles.tierRow}>
            {["basic", "medium", "hard", "mix"].map((lvl) => (
              <TouchableOpacity key={lvl} style={[styles.tierBtn, challengeTier === lvl && styles.tierBtnActive]} onPress={() => onChangeTier(lvl)}>
                <Text style={[styles.tierBtnText, challengeTier === lvl && { color: "#FFF" }]}>{lvl.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.primaryActionBtn} onPress={onNext}>
          <Text style={styles.primaryActionBtnText}>ANALYZE STRATEGY MATRIX</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFF" />
        </TouchableOpacity>

        <DateTimePickerModal isVisible={isStartPickerVisible} mode="date" date={startDateObj} onConfirm={(d) => { setStartPickerVisibility(false); onStartDateChange(d); }} onCancel={() => setStartPickerVisibility(false)} />
        <DateTimePickerModal isVisible={isEndPickerVisible} mode="date" date={endDateObj} minimumDate={startDateObj} onConfirm={(d) => { setEndPickerVisibility(false); onEndDateChange(d); }} onCancel={() => setEndPickerVisibility(false)} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerBlock}>
        <Text style={styles.metaLabel}>LOGIC.AI COMPILER • STAGE 2 OF 2</Text>
        <Text style={styles.mainTitle}>Curriculum Designer</Text>
        <Text style={styles.subTitle}>Review our baseline topic suggestions. Tap any month card to add further subtopics or prune allocations.</Text>
      </View>

      {timelineBlueprint.map((month) => {
        // Separates the local dataset dynamically for clear UI rendering buckets
        const suggestions = month.allocatedTopics?.filter(t => DEFAULT_SUGGESTION_IDS.includes(t.id)) || [];
        const userAdded = month.allocatedTopics?.filter(t => !DEFAULT_SUGGESTION_IDS.includes(t.id)) || [];

        return (
          <View key={month.id} style={styles.timelineCard}>
            <View style={styles.timelineCardHeader}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.monthLabel}>{month.label}</Text>
                <Text style={styles.monthPacingSubText}>Retention Plan: {month.revisionFocus}</Text>
              </View>
              <TouchableOpacity style={styles.cycleBadge} onPress={() => onRotateSubject(month.id)}>
                <Text style={styles.cycleBadgeText}>{month.focusSubject.toUpperCase()}</Text>
              </TouchableOpacity>
            </View>

            {/* ── SEPARATE ROW 1: SUGGESTED PACK WITH BULLET MARKS ── */}
            <View style={styles.inlineTopicSummaryPreviewRow}>
              <Text style={styles.inlineTopicCountHeader}>📌 Suggested Topics ({suggestions.length})</Text>
              <View style={styles.bulletListContainer}>
                {suggestions.length === 0 ? (
                  <Text style={styles.noneText}>None selected</Text>
                ) : (
                  suggestions.map(t => (
                    <Text key={t.id} style={styles.bulletItemText}>• {t.name} ({t.accuracy})</Text>
                  ))
                )}
              </View>
            </View>

            {/* ── SEPARATE ROW 2: USER ADDED INJECTIONS WITH BULLET MARKS ── */}
            <View style={[styles.inlineTopicSummaryPreviewRow, { marginTop: 8, backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }]}>
              <Text style={[styles.inlineTopicCountHeader, { color: "#166534" }]}>➕ Topics Added By You ({userAdded.length})</Text>
              <View style={styles.bulletListContainer}>
                {userAdded.length === 0 ? (
                  <Text style={[styles.noneText, { color: "#166534", opacity: 0.6 }]}>No manual additions yet</Text>
                ) : (
                  userAdded.map(t => (
                    <Text key={t.id} style={[styles.bulletItemText, { color: "#14532D" }]}>• {t.name} ({t.accuracy})</Text>
                  ))
                )}
              </View>
            </View>

            <TouchableOpacity style={styles.expandDrilldownRowBtn} onPress={() => setEditingMonth(month)}>
              <Text style={styles.expandDrilldownRowBtnText}>MANAGE OR ADD FURTHER SUBTOPICS</Text>
              <Ionicons name="create-outline" size={14} color="#2563EB" />
            </TouchableOpacity>
          </View>
        );
      })}

      <View style={styles.dualActionRow}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}><Text style={styles.backBtnText}>Back</Text></TouchableOpacity>
        <TouchableOpacity style={styles.finalizeBtn} onPress={onFinalize}>
          <Text style={styles.finalizeBtnText}>LOCK & ACTIVATE ROADMAP</Text>
          <Ionicons name="checkmark-done" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* ── PREMIUM MODAL EDITOR DRAWER ── */}
      <Modal visible={editingMonth !== null} animationType="slide" transparent={true}>
        <View style={styles.modalBackdropShadow}>
          <View style={styles.customizationDetailsSheet}>
            <View style={styles.modalHeaderRow}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.modalMetaLabelText}>{editingMonth?.label.toUpperCase()}</Text>
                <Text style={styles.modalMainTitleText}>Review & Modify Plan</Text>
              </View>
              <TouchableOpacity style={styles.modalCloseCircle} onPress={() => { setEditingMonth(null); setSearchQuery(""); }}>
                <Ionicons name="close" size={18} color="#475569" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
              <Text style={styles.sheetSectionHeading}>Active Suggestions List (Deselect as needed)</Text>
              {editingMonth?.allocatedTopics?.length === 0 ? (
                <Text style={styles.emptyListFallbackText}>All suggested items cleared. Please lookup and add modules below.</Text>
              ) : (
                editingMonth?.allocatedTopics?.map((topic) => (
                  <View key={topic.id} style={styles.activeCustomRowCard}>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                      <Text style={styles.customRowTopicTitle}>{topic.name}</Text>
                      <Text style={[styles.customRowTopicAccuracyText, parseFloat(topic.accuracy) < 50 ? { color: "#DC2626" } : { color: "#059669" }]}>
                        Your Current Accuracy: {topic.accuracy}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.pruneTopicItemBtn} onPress={() => handleRemoveTopicFromMonth(topic.id)}>
                      <Ionicons name="close-circle-outline" size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ))
              )}

              <View style={styles.injectionSearchWrapperBlock}>
                <Text style={styles.sheetSectionHeading}>Search & Add Further Subtopics</Text>
                <View style={styles.searchBarContainerBox}>
                  <Ionicons name="search" size={14} color="#94A3B8" style={{ marginLeft: 12 }} />
                  <TextInput
                    style={styles.searchBarInputField}
                    placeholder="Type to search and add (e.g., Seating, Ratios)..."
                    placeholderTextColor="#94A3B8"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>

                <View style={styles.searchPoolResultsListWrapper}>
                  {filteredPoolOptions.map((poolItem) => {
                    const isAlreadyAssigned = editingMonth?.allocatedTopics?.some(t => t.id === poolItem.id);
                    return (
                      <TouchableOpacity 
                        key={poolItem.id} 
                        disabled={isAlreadyAssigned}
                        style={[styles.poolOptionRowItem, isAlreadyAssigned && { opacity: 0.4 }]}
                        onPress={() => handleAddTopicToMonth(poolItem)}
                      >
                        <View style={{ flex: 1, paddingRight: 8 }}>
                          <Text style={styles.poolItemTitleText}>{poolItem.name}</Text>
                          <Text style={styles.poolItemAccuracyText}>Current Score Accuracy: {poolItem.accuracy}</Text>
                        </View>
                        <Ionicons name={isAlreadyAssigned ? "checkmark-circle" : "add-circle-outline"} size={18} color={isAlreadyAssigned ? "#059669" : "#2563EB"} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.modalDismissConfirmationBtnAction} onPress={() => { setEditingMonth(null); setSearchQuery(""); }}>
              <Text style={styles.modalDismissConfirmationBtnActionText}>SAVE CONFIGURATIONS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBlock: { marginBottom: 25, marginTop: 10 },
  metaLabel: { color: "#2563EB", fontSize: 10, fontWeight: "900", letterSpacing: 1.5 },
  mainTitle: { color: "#0F172A", fontSize: 26, fontWeight: "900", marginTop: 4 },
  subTitle: { color: "#64748B", fontSize: 14, marginTop: 6, lineHeight: 20 },
  premiumCard: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "#E2E8F0" },
  cardHeading: { color: "#1E293B", fontSize: 14, fontWeight: "800", marginBottom: 14 },
  datePickerControlRow: { flexDirection: "row", gap: 12 },
  inputLabel: { color: "#94A3B8", fontSize: 9, fontWeight: "800", marginBottom: 6 },
  pickerSelectorBtn: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#F8FAFC", borderRadius: 12, borderWidth: 1, borderColor: "#E2E8F0", padding: 14 },
  pickerSelectorBtnText: { color: "#1E293B", fontSize: 13, fontWeight: "700" },
  topicRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 14, borderRadius: 16, backgroundColor: "#F8FAFC", marginBottom: 10, borderWidth: 1, borderColor: "#E2E8F0" },
  topicRowActive: { backgroundColor: "#F0F6FF", borderColor: "#BFDBFE" },
  topicLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  iconFrame: { width: 38, height: 38, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  topicTitle: { color: "#475569", fontSize: 14, fontWeight: "700" },
  topicSub: { color: "#94A3B8", fontSize: 11, marginTop: 2 },
  tierRow: { flexDirection: "row", gap: 6 },
  tierBtn: { flex: 1, paddingVertical: 14, backgroundColor: "#F8FAFC", borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: "#E2E8F0" },
  tierBtnActive: { backgroundColor: "#0F172A", borderColor: "#0F172A" },
  tierBtnText: { color: "#64748B", fontSize: 11, fontWeight: "800" },
  primaryActionBtn: { backgroundColor: "#0F172A", borderRadius: 16, padding: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 12 },
  primaryActionBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  
  // Custom Bulletized Split Preview Cards Sizing
  timelineCard: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 20, marginBottom: 14, borderWidth: 1, borderColor: "#E2E8F0" },
  timelineCardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  monthLabel: { color: "#0F172A", fontSize: 15, fontWeight: "900" },
  monthPacingSubText: { color: "#2563EB", fontSize: 11, fontWeight: "700", marginTop: 2 },
  cycleBadge: { backgroundColor: "#F1F5F9", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: "#E2E8F0" },
  cycleBadgeText: { color: "#334155", fontSize: 10, fontWeight: "900" },
  
  inlineTopicSummaryPreviewRow: { marginTop: 14, backgroundColor: "#F8FAFC", borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "#E2E8F0" },
  inlineTopicCountHeader: { color: "#64748B", fontSize: 12, fontWeight: "800" },
  bulletListContainer: { marginTop: 6, paddingLeft: 4 },
  bulletItemText: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 3, lineHeight: 18 },
  noneText: { fontSize: 12, color: "#94A3B8", fontStyle: "italic", marginTop: 2 },
  
  expandDrilldownRowBtn: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", marginTop: 14, paddingHorizontal: 2 },
  expandDrilldownRowBtnText: { color: "#2563EB", fontSize: 11, fontWeight: "900" },
  dualActionRow: { flexDirection: "row", gap: 10, marginTop: 20 },
  backBtn: { paddingVertical: 16, paddingHorizontal: 20, borderRadius: 14, borderWidth: 1, borderColor: "#CBD5E1", backgroundColor: "#FFFFFF" },
  backBtnText: { color: "#475569", fontSize: 14, fontWeight: "800" },
  finalizeBtn: { flex: 1, backgroundColor: "#059669", borderRadius: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  finalizeBtnText: { color: "#FFFFFF", fontSize: 13, fontWeight: "900" },
  modalBackdropShadow: { flex: 1, backgroundColor: "rgba(15,23,42,0.4)", justifyContent: "flex-end" },
  customizationDetailsSheet: { backgroundColor: "#FFFFFF", borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, maxHeight: height * 0.88 },
  modalMetaLabelText: { color: "#2563EB", fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  modalMainTitleText: { color: "#0F172A", fontSize: 22, fontWeight: "900", marginTop: 2 },
  modalCloseCircle: { backgroundColor: "#F1F5F9", padding: 6, borderRadius: 20 },
  sheetSectionHeading: { color: "#0F172A", fontSize: 13, fontWeight: "900", marginTop: 20, marginBottom: 10 },
  emptyListFallbackText: { color: "#94A3B8", fontSize: 12, textAlign: "center", paddingVertical: 12, fontWeight: "600" },
  activeCustomRowCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#F8FAFC", borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "#E2E8F0", marginBottom: 8 },
  customRowTopicTitle: { color: "#1E293B", fontSize: 14, fontWeight: "800" },
  customRowTopicAccuracyText: { fontSize: 11, fontWeight: "700", marginTop: 2 },
  pruneTopicItemBtn: { padding: 6 },
  injectionSearchWrapperBlock: { marginTop: 15, borderTopWidth: 1, borderTopColor: "#F1F5F9", paddingTop: 18 },
  searchBarContainerBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#F1F5F9", borderRadius: 14, borderWidth: 1, borderColor: "#E2E8F0", height: 46 },
  searchBarInputField: { flex: 1, paddingLeft: 8, color: "#0F172A", fontSize: 13, fontWeight: "600" },
  searchPoolResultsListWrapper: { marginTop: 10, maxHeight: 180 },
  poolOptionRowItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  poolItemTitleText: { color: "#1E293B", fontSize: 13, fontWeight: "700" },
  poolItemAccuracyText: { color: "#64748B", fontSize: 11, marginTop: 2, fontWeight: "600" },
  modalDismissConfirmationBtnAction: { backgroundColor: "#0F172A", padding: 16, borderRadius: 16, alignItems: "center", marginTop: 20 },
  modalDismissConfirmationBtnActionText: { color: "#FFFFFF", fontSize: 13, fontWeight: "900", letterSpacing: 0.5 }
});