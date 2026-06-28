import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NeuralCurrentAffairs from "@/components/ActiveHub";

const { width, height } = Dimensions.get("window");

const SUBJECT_CATALOG = [
  {
    id: "QA",
    name: "Quantitative Aptitude",
    desc: "Time & Work, DI, Percentages",
    icon: "calculator-outline",
  },
  {
    id: "LR",
    name: "Logical Reasoning",
    desc: "Syllogisms, Seating, Matrices",
    icon: "git-branch-outline",
  },
  {
    id: "VA",
    name: "Verbal Ability",
    desc: "Reading Comprehension, Grammar",
    icon: "book-outline",
  },
];

const GLOBAL_SUBTOPIC_POOL = [
  { id: "ST_101", name: "Time and Work Pro", accuracy: "42%" },
  { id: "ST_102", name: "Permutations & Combinations", accuracy: "31%" },
  { id: "ST_103", name: "Data Interpretation (Pie Charts)", accuracy: "58%" },
  { id: "ST_104", name: "Syllogism Diagram Chains", accuracy: "74%" },
  { id: "ST_105", name: "Circular Seating Arrangements", accuracy: "39%" },
  { id: "ST_106", name: "Blood Relation Matrix", accuracy: "82%" },
  { id: "ST_107", name: "Reading Comprehension Traps", accuracy: "65%" },
];

export default function AdaptiveCommandCenterScreen() {
  const [hasActivePlan, setHasActivePlan] = useState(false);
  const [editingMonthId, setEditingMonthId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const today = useMemo(() => {
    const d = new Date("2026-06-28");
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const defaultEndDate = useMemo(() => {
    const d = new Date("2026-06-28");
    d.setDate(d.getDate() + 90);
    return d;
  }, []);

  const [startDateObj, setStartDateObj] = useState<Date>(today);
  const [endDateObj, setEndDateObj] = useState<Date>(defaultEndDate);
  const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
  const [isEndPickerVisible, setEndPickerVisibility] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["QA", "LR"]);

  const [timelineBlueprint, setTimelineBlueprint] = useState([
    {
      id: 1,
      label: "Month 1: June 2026",
      macroSubjects: "QA, Reasoning, Verbal Ability",
      allocatedTopics: [
        { id: "ST_101", name: "Time and Work Pro", accuracy: "42%" },
        {
          id: "ST_103",
          name: "Data Interpretation (Pie Charts)",
          accuracy: "58%",
        },
      ],
    },
    {
      id: 2,
      label: "Month 2: July 2026",
      macroSubjects: "QA, Reasoning",
      allocatedTopics: [
        { id: "ST_104", name: "Syllogism Diagram Chains", accuracy: "74%" },
        {
          id: "ST_105",
          name: "Circular Seating Arrangements",
          accuracy: "39%",
        },
      ],
    },
  ]);

  const calculatedDaysRunwayCount = useMemo(() => {
    const diffTime = endDateObj.getTime() - startDateObj.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [startDateObj, endDateObj]);

  const formatDisplayDate = (dateInstance: Date) => {
    try {
      return dateInstance.toISOString().split("T")[0];
    } catch (e) {
      return "2026-06-28";
    }
  };

  const toggleSubject = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleRemoveTopicFromMonth = (topicId: string) => {
    if (editingMonthId === null) return;
    setTimelineBlueprint((prev) =>
      prev.map((m) =>
        m.id === editingMonthId
          ? {
              ...m,
              allocatedTopics: m.allocatedTopics.filter(
                (t) => t.id !== topicId,
              ),
            }
          : m,
      ),
    );
  };

  const handleAddTopicToMonth = (
    poolItem: (typeof GLOBAL_SUBTOPIC_POOL)[0],
  ) => {
    if (editingMonthId === null) return;
    setTimelineBlueprint((prev) =>
      prev.map((m) => {
        if (m.id !== editingMonthId) return m;
        if (m.allocatedTopics.some((t) => t.id === poolItem.id)) return m;
        return { ...m, allocatedTopics: [...m.allocatedTopics, poolItem] };
      }),
    );
  };

  const handleResetMonth = (monthId: number) => {
    Alert.alert(
      "Reset Subtopics",
      "Reset modifications back to baseline configurations?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          onPress: () => {
            setTimelineBlueprint((prev) =>
              prev.map((m) =>
                m.id === monthId
                  ? {
                      ...m,
                      allocatedTopics: [
                        GLOBAL_SUBTOPIC_POOL[0],
                        GLOBAL_SUBTOPIC_POOL[2],
                      ],
                    }
                  : m,
              ),
            );
            setEditingMonthId(null);
          },
        },
      ],
    );
  };

  const editingMonth = useMemo(() => {
    return timelineBlueprint.find((m) => m.id === editingMonthId) || null;
  }, [editingMonthId, timelineBlueprint]);

  const filteredPoolOptions = useMemo(() => {
    return GLOBAL_SUBTOPIC_POOL.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  if (hasActivePlan) {
    return (
        <NeuralCurrentAffairs
          timeHorizon={String(calculatedDaysRunwayCount)}
          onBackToLedger={() => setHasActivePlan(false)}
        />
    );
  }

    const masterFormTopics = [
    { id: "1", title: "Quantitative Aptitude", sub: "Calculations, Math, and DI", icon: "calculator", color: "#3B82F6" },
    { id: "2", title: "Logical Reasoning", sub: "Syllogisms, Puzzles, Sequences", icon: "git-branch", color: "#10B981" },
    { id: "3", title: "Verbal Ability", sub: "Grammar & Reading Comprehension", icon: "book", color: "#8B5CF6" },
  ];

  return (
    <SafeAreaView style={styles.masterSafeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <ScrollView style={styles.section} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.sectionLabel}>PREPARATION CORE WORKSPACE</Text>
            <Text style={styles.mainTitle}>Setup Strategy Plan</Text>
          </View>
          <View style={styles.aiRefresh}>
            <Ionicons name="sparkles" size={16} color="#3B82F6" />
          </View>
        </View>

        {/* 📅 SECTION 1: TIMELINE RUNWAY SELECTOR */}
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionLabel}>1. TIME HORIZON TARGETS</Text>
        </View>

        <View style={styles.caCard}>
          <View style={styles.splitInputRow}>
            <TouchableOpacity
              style={styles.dateSelectorField}
              onPress={() => setStartPickerVisibility(true)}
            >
              <Text style={styles.fieldLabelMicro}>START WINDOW</Text>
              <View style={styles.innerValueFlex}>
                <Ionicons name="calendar-outline" size={14} color="#64748B" />
                <Text style={styles.fieldValueString}>
                  {formatDisplayDate(startDateObj)}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.inlineDividerLine} />

            <TouchableOpacity
              style={styles.dateSelectorField}
              onPress={() => setEndPickerVisibility(true)}
            >
              <Text style={styles.fieldLabelMicro}>TARGET END</Text>
              <View style={styles.innerValueFlex}>
                <Ionicons name="flag-outline" size={14} color="#64748B" />
                <Text style={styles.fieldValueString}>
                  {formatDisplayDate(endDateObj)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.streakBadge}>
            <Ionicons name="time" size={12} color="#D97706" />
            <Text style={styles.streakText}>
              Calculated Window Allocation: {calculatedDaysRunwayCount} Days
            </Text>
          </View>
        </View>

        {/* 📚 SECTION 2: BASELINE SUBJECT SELECTION CHIPS */}
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionLabel}>2. CORE TARGET SUBJECTS</Text>
        </View>

        <View style={styles.topicsGridColumn}>
          {SUBJECT_CATALOG.map((sub) => {
            const isChecked = selectedTopics.includes(sub?.id);
            return (
              <TouchableOpacity
                key={sub?.id}
                activeOpacity={0.9}
                style={[
                  styles.subjectRowCard,
                  isChecked && styles.subjectRowCardActive,
                ]}
                onPress={() => toggleSubject(sub?.id)}
              >
                <View
                  style={[
                    styles.iconIconBuffer,
                    isChecked && { backgroundColor: "rgba(255,255,255,0.15)" },
                  ]}
                >
                  <Ionicons
                    name={sub.icon as any}
                    size={18}
                    color={isChecked ? "#FFF" : "#3B82F6"}
                  />
                </View>
                <View style={{ flex: 1, paddingLeft: 12 }}>
                  <Text
                    style={[styles.pointText, isChecked && { color: "#FFF" }]}
                  >
                    {sub.name}
                  </Text>
                  <Text
                    style={[styles.caDate, isChecked && { color: "#CBD5E1" }]}
                  >
                    {sub.desc}
                  </Text>
                </View>
                <View
                  style={[
                    styles.customRadioCircle,
                    isChecked && styles.customRadioCircleActive,
                  ]}
                >
                  {isChecked && (
                    <Ionicons name="checkmark" size={10} color="#1E293B" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 🛠️ SECTION 3: MONTHLY SYLLABUS LAYOUT PREVIEW CHIPS */}
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionLabel}>
            3. MONTHLY LOAD STABILIZATION SCOPE
          </Text>
        </View>

        {timelineBlueprint.map((month) => (
          <View key={month?.id} style={styles.scandiMonthlyCard}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.scandiMonthHeaderLabel}>
                {month?.label?.toUpperCase()}
              </Text>
              <Text style={styles.scandiMonthValueString} numberOfLines={1}>
                {month.macroSubjects}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.eyeIconWrapperPlate}
              activeOpacity={0.7}
              onPress={() => setEditingMonthId(month?.id)}
            >
              <Ionicons name="eye-outline" size={15} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        ))}

        {/* STRATEGY ROUTINE ACTIVATOR CTA */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.heroButton}
          onPress={() => {
            if (selectedTopics.length === 0)
              return Alert.alert(
                "Required",
                "Select subject criteria frameworks.",
              );
            if (calculatedDaysRunwayCount < 7)
              return Alert.alert(
                "Horizon Low",
                "Window span must target at minimum 7 days.",
              );
            setHasActivePlan(true);
          }}
        >
          <Text style={styles.heroButtonText}>ACTIVATE TIMETABLE LOCK</Text>
          <Ionicons
            name="lock-closed"
            size={13}
            color="#FFF"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isStartPickerVisible}
          mode="date"
          date={startDateObj}
          minimumDate={today}
          onConfirm={(d) => {
            setStartPickerVisibility(false);
            setStartDateObj(d);
          }}
          onCancel={() => setStartPickerVisibility(false)}
        />
        <DateTimePickerModal
          isVisible={isEndPickerVisible}
          mode="date"
          date={endDateObj}
          minimumDate={
            new Date(startDateObj.getTime() + 7 * 24 * 60 * 60 * 1000)
          }
          onConfirm={(d) => {
            setEndPickerVisibility(false);
            setEndDateObj(d);
          }}
          onCancel={() => setEndPickerVisibility(false)}
        />

        {/* ── 📝 UPDATED SPEC WORKSPACE DRAWER ADJUSTMENT MODAL SHEET ── */}
        {/* ── DETAIL DRAWER ADJUSTMENT COMPONENT MODAL SHEET ── */}
        <Modal
          visible={editingMonthId !== null}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalBackdropShadow}>
            <View style={styles.customizationDetailsSheet}>
              <View style={styles.modalHeaderRow}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  {/* 🟢 FIXED: Safe optional string evaluation fallback mapping */}
                  <Text style={styles.modalMetaLabelText}>
                    {(editingMonth?.label || "MONTH").toUpperCase()}
                  </Text>
                  <Text style={styles.modalMainTitleText}>
                    Review & Modify Plan
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ marginRight: 12, marginTop: 4 }}
                  onPress={() =>
                    editingMonth && handleResetMonth(editingMonth.id)
                  }
                >
                  <Ionicons name="refresh-outline" size={20} color="#64748B" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCloseCircle}
                  onPress={() => {
                    setEditingMonthId(null);
                    setSearchQuery("");
                  }}
                >
                  <Ionicons name="close" size={18} color="#475569" />
                </TouchableOpacity>
              </View>

              <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.sheetSectionHeading}>
                  Active Suggestions List (Deselect as needed)
                </Text>
                {editingMonth?.allocatedTopics?.length === 0 ? (
                  <Text style={styles.emptyListFallbackText}>
                    All suggested items cleared. Please lookup and add modules
                    below.
                  </Text>
                ) : (
                  editingMonth?.allocatedTopics?.map((topic) => (
                    <View key={topic.id} style={styles.activeCustomRowCard}>
                      <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text style={styles.customRowTopicTitle}>
                          {topic.name}
                        </Text>
                        <Text
                          style={[
                            styles.customRowTopicAccuracyText,
                            parseFloat(topic.accuracy) < 50
                              ? { color: "#DC2626" }
                              : { color: "#059669" },
                          ]}
                        >
                          Your Current Accuracy: {topic.accuracy}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.pruneTopicItemBtn}
                        onPress={() => handleRemoveTopicFromMonth(topic.id)}
                      >
                        <Ionicons
                          name="close-circle-outline"
                          size={18}
                          color="#EF4444"
                        />
                      </TouchableOpacity>
                    </View>
                  ))
                )}

                <View style={styles.injectionSearchWrapperBlock}>
                  <Text style={styles.sheetSectionHeading}>
                    Search & Add Further Subtopics
                  </Text>
                  <View style={styles.searchBarContainerBox}>
                    <Ionicons
                      name="search"
                      size={14}
                      color="#94A3B8"
                      style={{ marginLeft: 12 }}
                    />
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
                      const isAlreadyAssigned =
                        editingMonth?.allocatedTopics?.some(
                          (t) => t.id === poolItem.id,
                        );
                      return (
                        <TouchableOpacity
                          key={poolItem.id}
                          disabled={isAlreadyAssigned}
                          style={[
                            styles.poolOptionRowItem,
                            isAlreadyAssigned && { opacity: 0.4 },
                          ]}
                          onPress={() => handleAddTopicToMonth(poolItem)}
                        >
                          <View style={{ flex: 1, paddingRight: 8 }}>
                            <Text style={styles.poolItemTitleText}>
                              {poolItem.name}
                            </Text>
                            <Text style={styles.poolItemAccuracyText}>
                              Current Score Accuracy: {poolItem.accuracy}
                            </Text>
                          </View>
                          <Ionicons
                            name={
                              isAlreadyAssigned
                                ? "checkmark-circle"
                                : "add-circle-outline"
                            }
                            size={18}
                            color={isAlreadyAssigned ? "#059669" : "#2563EB"}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>

              <TouchableOpacity
                style={styles.modalDismissConfirmationBtnAction}
                onPress={() => {
                  setEditingMonthId(null);
                  setSearchQuery("");
                }}
              >
                <Text style={styles.modalDismissConfirmationBtnActionText}>
                  SAVE CONFIGURATIONS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  masterSafeContainer: { flex: 1, backgroundColor: "#F8FAFC" },
  section: { paddingHorizontal: 25, marginTop: 30, flex: 1 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 8,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 1.5,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1E293B",
    marginTop: 2,
  },
  aiRefresh: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },

  sectionHeaderContainer: {
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  caCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 1,
  },
  caDate: { fontSize: 9, color: "#94A3B8", fontWeight: "700" },

  splitInputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  dateSelectorField: { flex: 1, paddingVertical: 2 },
  fieldLabelMicro: {
    fontSize: 8,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  innerValueFlex: { flexDirection: "row", alignItems: "center", gap: 6 },
  fieldValueString: { fontSize: 14, fontWeight: "800", color: "#1E293B" },
  inlineDividerLine: {
    width: 1,
    height: 32,
    backgroundColor: "#F1F5F9",
    marginHorizontal: 16,
  },

  detailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailsBtnText: { fontSize: 9, fontWeight: "900", color: "#3B82F6" },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 14,
  },
  streakText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#B45309",
    marginLeft: 4,
  },

  topicsGridColumn: { gap: 10, marginBottom: 14 },
  subjectRowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 1,
  },
  subjectRowCardActive: { backgroundColor: "#0a3781", borderColor: "#1E293B" },
  iconIconBuffer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  customRadioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
  },
  customRadioCircleActive: { backgroundColor: "#FFF", borderColor: "#FFF" },

  scandiMonthlyCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 10,
  },
  scandiMonthHeaderLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
  scandiMonthValueString: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1E293B",
    marginTop: 2,
  },
  eyeIconWrapperPlate: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
  },

  heroButton: {
    backgroundColor: "#1d427d",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  heroButtonText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },

  pointText: { fontSize: 13, color: "#1E293B", fontWeight: "700" },

  // Upgraded Dynamic Adjust Drawer Component Layouts
  modalBackdropShadow: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.5)",
    justifyContent: "flex-end",
  },
  customizationDetailsSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    maxHeight: height * 0.8,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  modalMetaLabelText: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  modalMainTitleText: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 2,
  },
  modalCloseCircle: {
    backgroundColor: "#F1F5F9",
    padding: 6,
    borderRadius: 20,
  },
  sheetSectionHeading: {
    color: "#0F172A",
    fontSize: 11,
    fontWeight: "900",
    marginTop: 20,
    marginBottom: 12,
    textDecorationLine: "underline",
    letterSpacing: 0.5,
  },
  emptyListFallbackText: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
    paddingVertical: 12,
    fontWeight: "600",
  },
  activeCustomRowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginBottom: 8,
  },
  customRowTopicTitle: { color: "#1E293B", fontSize: 13, fontWeight: "700" },
  customRowTopicAccuracyText: { fontSize: 11, fontWeight: "700", marginTop: 2 },
  pruneTopicItemBtn: { padding: 6 },
  injectionSearchWrapperBlock: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 18,
  },
  searchBarContainerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    height: 46,
  },
  searchBarInputField: {
    flex: 1,
    paddingLeft: 8,
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "600",
  },
  searchPoolResultsListWrapper: { marginTop: 10, maxHeight: 150 },
  poolOptionRowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  poolItemTitleText: { color: "#1E293B", fontSize: 13, fontWeight: "700" },
  poolItemAccuracyText: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 2,
    fontWeight: "600",
  },
  modalDismissConfirmationBtnAction: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },
  modalDismissConfirmationBtnActionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  topicRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 14, borderRadius: 16, backgroundColor: "#F8FAFC", marginBottom: 10, borderWidth: 1, borderColor: "#E2E8F0" },
  topicRowActive: { backgroundColor: "#F0F6FF", borderColor: "#BFDBFE" },
  topicLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  iconFrame: { width: 38, height: 38, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  topicTitle: { color: "#475569", fontSize: 14, fontWeight: "700" },
  topicSub: { color: "#94A3B8", fontSize: 11, marginTop: 2 },
});
