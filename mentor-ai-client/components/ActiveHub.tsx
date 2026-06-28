import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  SafeAreaView,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const BLUEPRINT_PLAN_DATABASE = {
  "JUN": [
    { id: "T1_W1_D1", week: "WEEK 1", dayLabel: "DAY 1", zone: "NORMAL", zoneColor: "#3B82F6", name: "Time and Work Pro", accuracy: "54%", ruleShortcut: "Total Work = LCM of Pacing Deadlines. Efficiency = Total Work / Individual Days.", spottingCues: "Look for parameters stating 'alternating shifts or sharing tasks' to instantly bypass core fraction layers.", taskDescription: "Convert to Best Zone: Targeted speed drill run on efficiency shortcuts." },
    { id: "T1_W1_D2", week: "WEEK 1", dayLabel: "DAY 2", zone: "NORMAL", zoneColor: "#3B82F6", name: "Data Interpretation (Pie Charts)", accuracy: "58%", ruleShortcut: "Degree to % Conversion: Multiply degrees by 5/18 context multipliers.", spottingCues: "Isolate abstract degree metrics directly to absolute calculated values to stop drag.", taskDescription: "Convert to Best Zone: Calculation tracking acceleration sprint." },
    { id: "T1_W1_D3", week: "WEEK 1", dayLabel: "DAY 3", zone: "BEST", zoneColor: "#10B981", name: "Syllogism Diagram Chains", accuracy: "82%", ruleShortcut: "All A are B + No B are C => Immediate valid deduction: No A are C.", spottingCues: "Draw clean dual overlapping boundary sets to visualize intersection closures rapidly.", taskDescription: "Maintenance Review: Quick check shortcut verification run." },
    { id: "T1_W1_D4", week: "WEEK 1", dayLabel: "DAY 4", zone: "CRITICAL", zoneColor: "#a40b0b", name: "Circular Seating Arrangements", accuracy: "31%", ruleShortcut: "Radial Symmetry: Anchor the absolute certain position parameter first.", spottingCues: "Bypass relative ambiguous positions until the absolute center-facing tags are set.", taskDescription: "Controlled Exposure: Slow pacing insulated diagram setup drill." },
    { id: "T1_W1_D5", week: "WEEK 1", dayLabel: "DAY 5", zone: "CRITICAL", zoneColor: "#a40b0b", name: "Permutations & Combinations Base", accuracy: "24%", ruleShortcut: "Slot Method: Fill constrained positions first, then apply standard factorial cascades.", spottingCues: "Spot keywords like 'at least' or 'together' to establish baseline sub-groups rapidly.", taskDescription: "Controlled Exposure: Condition profiling constraint drills." },
    { id: "T1_W1_D6", week: "WEEK 1", dayLabel: "DAY 6", zone: "REVISION", zoneColor: "#64748B", name: "All-Zone Mixed Synthesis Mock", accuracy: "Mixed Grid", ruleShortcut: "Rapid Context Switching: Cycle formula retrieval instantly across all three zones.", spottingCues: "Time Management Check: Skip any item taking more than 45 seconds to establish context.", taskDescription: "Weekly Milestone Challenge: Mixed verification diagnostic block." },
    { id: "T1_W1_D7", week: "WEEK 1", dayLabel: "DAY 7", zone: "REVISION", zoneColor: "#64748B", name: "Vulnerability Audit Profile Run", accuracy: "Recalc Run", ruleShortcut: "Dynamic Recalibration: Isolate exact question triggers from your past failed attempts.", spottingCues: "Look for semantic cues in question phrasing where calculation patterns repeat.", taskDescription: "Weekly Evaluation: Diagnostic evaluation test to dynamically recalculate proficiency map." },
    
    { id: "T1_W2_D1", week: "WEEK 2", dayLabel: "DAY 1", zone: "NORMAL", zoneColor: "#3B82F6", name: "Ratios & Mixtures", accuracy: "48%", ruleShortcut: "Allegation Cross-Subtraction Matrix rule blocks.", spottingCues: "Use cheap matrix differences instead of balancing weighted fraction averages.", taskDescription: "Targeted Acceleration: Pushing baseline scores up to mastery bounds." }
  ],
  "JUL": [], "AUG": [], "SEP": [], "OCT": [], "NOV": [], "DEC": []
};

export default function NeuralCurrentAffairs({timeHorizon, onBackToLedger}) {
  const [activeMonth, setActiveMonth] = useState("JUN");
  const [activeWeek, setActiveWeek] = useState("WEEK 1");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isMonthDropdownOpen, setIsMonthDropdownVisible] = useState(false);

  const monthsConfig = [
    { key: "JUN", full: "June 2026" },
    { key: "JUL", full: "July 2026" },
    { key: "AUG", full: "August 2026" },
    { key: "SEP", full: "September 2026" },
    { key: "OCT", full: "October 2026" },
    { key: "NOV", full: "November 2026" },
    { key: "DEC", full: "December 2026" },
  ];

  const weeksList = ["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4"];

  const currentMonthLabel = useMemo(() => {
    return monthsConfig.find(m => m.key === activeMonth)?.full || "Select Month";
  }, [activeMonth]);

  const filteredSyllabusFeed = useMemo(() => {
    const monthData = BLUEPRINT_PLAN_DATABASE[activeMonth as keyof typeof BLUEPRINT_PLAN_DATABASE] || [];
    return monthData.filter(item => item.week === activeWeek);
  }, [activeMonth, activeWeek]);

  const getCount = (weekStr: string) => {
    const monthData = BLUEPRINT_PLAN_DATABASE[activeMonth as keyof typeof BLUEPRINT_PLAN_DATABASE] || [];
    return monthData.filter(i => i.week === weekStr).length;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <ScrollView style={styles.section} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.sectionLabel}>DYNAMIC SYLLABUS ALLOCATION FEED</Text>
            <Text style={styles.mainTitle}>Curriculum Cockpit</Text>
          </View>
          <TouchableOpacity style={styles.aiRefresh} onPress={() => Alert.alert("Recalculation Scan", "Re-verifying accuracy profiles across database leaves.")}>
            <Ionicons name="sparkles" size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* 📅 1. RE-ENGINEERED OPTION SELECT DROPDOWN BUTTON FOR MONTH SELECTION */}
        <View style={styles.sectionCalendar}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>TARGET STUDY HORIZON TIMELINE</Text>
            <View style={styles.streakBadge}>
              <Ionicons name="time" size={12} color="#D97706" />
              <Text style={styles.streakText}>DYNAMIC HORIZON</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.dropdownSelectorCard}
            activeOpacity={0.8}
            onPress={() => setIsMonthDropdownVisible(true)}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Ionicons name="calendar-outline" size={16} color="#1E293B" />
              <View>
                <Text style={styles.dropdownSelectorMetaLabel}>SELECT ACTIVE PLAN MONTH</Text>
                <Text style={styles.dropdownSelectorMainValue}>{currentMonthLabel}</Text>
              </View>
            </View>
            <Ionicons name="chevron-down" size={16} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* 🎛️ 2. HORIZONTAL WEEKLY DRILL CADENCE SWITCHER */}
        <View style={{ marginBottom: 15 }}>
          <Text style={[styles.sectionLabel, { marginBottom: 10 }]}>ACTIVE WEEKLY CADENCE FILTER</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {weeksList.map((week) => {
              const isWeekActive = week === activeWeek;
              return (
                <TouchableOpacity
                  key={week}
                  onPress={() => setActiveWeek(week)}
                  style={[
                    styles.catPill,
                    isWeekActive && styles.catPillActive,
                  ]}
                >
                  <Text style={[styles.catText, isWeekActive && styles.catTextActive]}>
                    {week} ({getCount(week)})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* 🎯 3. SUBTOPIC DATA FEED DECK */}
        <Text style={[styles.sectionLabel, { marginBottom: 12 }]}>ASSIGNED TARGET SUBTOPICS ({filteredSyllabusFeed.length})</Text>
        <View style={styles.caContainer}>
          {filteredSyllabusFeed.length === 0 ? (
            <View style={styles.caCard}>
              <Text style={[styles.caTitle, { color: "#94A3B8", textAlign: "center", width: "100%", fontStyle: "italic", fontSize: 13 }]}>
                No subtopic loads assigned to this weekly block horizon.
              </Text>
            </View>
          ) : (
            filteredSyllabusFeed.map((item) => (
              <View key={item.id} style={styles.caCard}>
                <View style={styles.caLeft}>
                  <View style={[styles.categoryIndicator, { backgroundColor: item.zoneColor }]} />
                  <Text style={styles.caIndex}>{item.dayLabel.split(" ")[1]}</Text>
                </View>

                <View style={styles.caRight}>
                  <View style={styles.caMeta}>
                    <Text style={[styles.caCategoryText, { color: item.zoneColor }]}>{item.dayLabel} • {item.zone}</Text>
                    <Text style={styles.caDate}>Accuracy: {item.accuracy}</Text>
                  </View>
                  <Text style={styles.caTitle}>{item.name}</Text>
                  <Text style={[styles.caDate, { color: "#64748B", marginBottom: 12, fontSize: 11 }]}>
                    {item.taskDescription}
                  </Text>

                  <View style={styles.actionSplitRow}>
                    <TouchableOpacity 
                      style={styles.detailsBtn} 
                      activeOpacity={0.7}
                      onPress={() => setSelectedItem(item)}
                    >
                      <Text style={styles.detailsBtnText}>TRICKS TO SOLVE</Text>
                      <Ionicons name="chevron-forward" size={12} color="#3B82F6" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.launchTestRowBtn} 
                      activeOpacity={0.8}
                      onPress={() => Alert.alert("Initializing Practice Mode", `Loading high-yield verification questions matching ${item.name}.`)}
                    >
                      <Text style={styles.launchTestRowBtnText}>STARTS TEST</Text>
                      <Ionicons name="flash-sharp" size={11} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* ── 📝 MONTH SELECTION SELECT OPTIONS SHEET DRAWER ── */}
        <Modal visible={isMonthDropdownOpen} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { height: height * 0.55 }]}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <Text style={[styles.sectionLabel, { fontSize: 10 }]}>CHOOSE PREPARATION TARGET PERIOD</Text>
                <TouchableOpacity onPress={() => setIsMonthDropdownVisible(false)}>
                  <Ionicons name="close-circle" size={26} color="#94A3B8" />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {monthsConfig.map((m) => {
                  const isCurrent = m.key === activeMonth;
                  return (
                    <TouchableOpacity
                      key={m.key}
                      style={[styles.dropdownSelectOptionRow, isCurrent && styles.dropdownSelectOptionRowActive]}
                      onPress={() => {
                        setActiveMonth(m.key);
                        setActiveWeek("WEEK 1");
                        setIsMonthDropdownVisible(false);
                      }}
                    >
                      <Text style={[styles.dropdownOptionTextText, isCurrent && { color: "#1A237E", fontWeight: "900" }]}>
                        {m.full}
                      </Text>
                      {isCurrent && <Ionicons name="checkmark-circle" size={18} color="#1A237E" />}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* ── 📝 STRATEGIC TRICK SPEC SHEET MODAL DRAWER ── */}
        <Modal visible={!!selectedItem} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeModal} onPress={() => setSelectedItem(null)}>
                <Ionicons name="close-circle" size={32} color="#94A3B8" />
              </TouchableOpacity>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.modalIndicator, { backgroundColor: selectedItem?.zoneColor }]} />
                <Text style={styles.modalCategory}>{selectedItem?.dayLabel} • {selectedItem?.zone} PRIORITY LEVEL</Text>
                <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
                <Text style={styles.modalDate}>Your Live Metric Diagnostic Standing Accuracy: {selectedItem?.accuracy}</Text>

                <Text style={styles.modalHeading}>STRATEGIC DIRECTION DETAILS</Text>
                <Text style={styles.modalDetails}>{selectedItem?.taskDescription}</Text>

                <Text style={styles.modalHeading}>HIGH-YIELD SHORTCUT TRICK FORMULA</Text>
                <View style={styles.formulaWrapperBox}>
                  <Text style={styles.formulaMonospaceText}>{selectedItem?.ruleShortcut}</Text>
                </View>

                <Text style={styles.modalHeading}>TRAP DETECTION RADAR SIGNALS</Text>
                <View style={styles.pointsList}>
                  <View style={styles.pointRow}>
                    <View style={[styles.pointDot, { backgroundColor: selectedItem?.zoneColor }]} />
                    <Text style={styles.pointText}>{selectedItem?.spottingCues}</Text>
                  </View>
                  <View style={styles.pointRow}>
                    <View style={[styles.pointDot, { backgroundColor: selectedItem?.zoneColor }]} />
                    <Text style={styles.pointText}>Practice priority bounds match chosen platform challenge settings perfectly.</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

            <View style={styles.actionGridFooter}>
                  <TouchableOpacity
                    style={styles.modifySettingsButton}
                    onPress={() => onBackToLedger()}
                  >
                    <Ionicons name="options-outline" size={16} color="#475569" />
                    <Text style={styles.modifySettingsButtonText}>Reset Plan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.refreshReSyncButton}
                    onPress={() =>
                      Alert.alert(
                        "Adaptive Re-Sync Triggered",
                        "Outstanding tasks distributed smoothly into remaining windows.",
                      )
                    }
                  >
                    <Ionicons name="sync-outline" size={16} color="#2563EB" />
                    <Text style={styles.refreshReSyncButtonText}>Re-Sync Matrix</Text>
                  </TouchableOpacity>
                </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 25, marginTop: 30, flex: 1 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  sectionLabel: { fontSize: 8, fontWeight: "900", color: "#94A3B8", letterSpacing: 2 },
  mainTitle: { fontSize: 22, fontWeight: "900", color: "#1E293B" },
  aiRefresh: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#EFF6FF", justifyContent: "center", alignItems: "center" },

  sectionCalendar: { marginBottom: 20 },
  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  streakBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#FEF3C7", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  streakText: { fontSize: 10, fontWeight: "900", color: "#D97706", marginLeft: 4 },
  
  // Custom Option Dropdown Field Setup
  dropdownSelectorCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFF", borderRadius: 20, padding: 15, borderWidth: 1, borderColor: "#F1F5F9" },
  dropdownSelectorMetaLabel: { fontSize: 8, fontWeight: "900", color: "#94A3B8", letterSpacing: 0.5 },
  dropdownSelectorMainValue: { fontSize: 14, fontWeight: "800", color: "#1E293B", marginTop: 2 },
  
  dropdownSelectOptionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 14, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  dropdownSelectOptionRowActive: { backgroundColor: "#F0F6FF", borderRadius: 12 },
  dropdownOptionTextText: { fontSize: 14, color: "#475569", fontWeight: "700" },

  catScroll: { marginBottom: 20 },
  catPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, backgroundColor: "#FFF", marginRight: 10, borderWidth: 1, borderColor: "#F1F5F9" },
  catPillActive: { backgroundColor: "#1E293B", borderColor: "#1E293B" },
  catText: { fontSize: 10, fontWeight: "800", color: "#64748B" },
  catTextActive: { color: "#FFF" },

  caContainer: { gap: 12 },
  caCard: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 20, padding: 15, borderWidth: 1, borderColor: "#F1F5F9" },
  caLeft: { alignItems: "center", marginRight: 15, width: 25 },
  categoryIndicator: { width: 3, height: 20, borderRadius: 2, marginBottom: 8 },
  caIndex: { fontSize: 14, fontWeight: "900", color: "#CBD5E1" },
  caRight: { flex: 1 },
  caMeta: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  caCategoryText: { fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  caDate: { fontSize: 9, color: "#94A3B8", fontWeight: "700" },
  caTitle: { fontSize: 14, fontWeight: "800", color: "#1E293B", lineHeight: 20, marginBottom: 4 },
  
  actionSplitRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8, marginTop: 4 },
  detailsBtn: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "#F0F7FF", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  detailsBtnText: { fontSize: 9, fontWeight: "900", color: "#3B82F6" },
  launchTestRowBtn: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#1E293B", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  launchTestRowBtnText: { fontSize: 9, fontWeight: "900", color: "#FFF", letterSpacing: 0.3 },

  modalOverlay: { flex: 1, backgroundColor: "rgba(15, 23, 42, 0.6)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#FFF", height: height * 0.85, borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 30 },
  closeModal: { alignSelf: "flex-end", marginBottom: 10 },
  modalIndicator: { width: 40, height: 6, borderRadius: 3, marginBottom: 20 },
  modalCategory: { fontSize: 10, fontWeight: "900", color: "#64748B", letterSpacing: 2 },
  modalTitle: { fontSize: 24, fontWeight: "900", color: "#1E293B", marginTop: 10 },
  modalDate: { fontSize: 12, fontWeight: "700", color: "#94A3B8", marginTop: 5 },
  modalHeading: { fontSize: 12, fontWeight: "900", color: "#1E293B", letterSpacing: 1.5, marginTop: 24, marginBottom: 12, textDecorationLine: "underline" },
  modalDetails: { fontSize: 14, color: "#475569", lineHeight: 22, fontWeight: "500" },
  formulaWrapperBox: { backgroundColor: "#F8FAFC", padding: 14, borderRadius: 14, borderWidth: 1, borderColor: "#F1F5F9", marginTop: 4 },
  formulaMonospaceText: { color: "#1E293B", fontSize: 12, fontWeight: "700", fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", lineHeight: 18 },
  
  pointsList: { marginTop: 10 },
  pointRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12 },
  pointDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6, marginRight: 12 },
  pointText: { flex: 1, fontSize: 14, color: "#1E293B", fontWeight: "600", lineHeight: 20 },

   // Execution Active Hub Footers
  actionGridFooter: {
    flexDirection: "row",
    gap: 8,
    marginTop: 40,
    backgroundColor: "#F8FAFC",
  },
  modifySettingsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  modifySettingsButtonText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "800",
  },
  refreshReSyncButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  refreshReSyncButtonText: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "800",
  },
});