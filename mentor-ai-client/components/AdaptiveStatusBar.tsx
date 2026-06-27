import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SkippedLog {
  date: string;
  topicName: string;
  overallScore: string;
}

interface MonitorProps {
  expanded: boolean;
  onToggle: () => void;
  scopeSummary: string;
  improvements: string;
  skippedLogs: SkippedLog[];
  onLaunchAudit: () => void;
}

export function AdaptiveStatusBar({ expanded, onToggle, scopeSummary, improvements, skippedLogs, onLaunchAudit }: MonitorProps) {
  return (
    <View style={styles.syncStatusCard}>
      <TouchableOpacity style={styles.headerTapTarget} onPress={onToggle} activeOpacity={0.8}>
        <View style={styles.syncTitleBadge}>
          <Ionicons name="scan-circle" size={20} color="#0284C7" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.syncHeaderTitle}>ADAPTIVE SCAN STATUS MONITOR</Text>
            <Text style={styles.previewSubtitle}>{expanded ? "Active diagnosis configuration metrics" : "Tap to expand performance logs & backlogs"}</Text>
          </View>
        </View>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={18} color="#64748B" />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.expandedBlock}>
          <View style={styles.metricRow}>
            <Text style={styles.labelSubText}>Syllabus Coverage Scope:</Text>
            <Text style={styles.valueMainText}>{scopeSummary}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.labelSubText}>Recent Improvements Metrics:</Text>
            <Text style={styles.valueGrowthText}>{improvements}</Text>
          </View>

          <View style={styles.skippedContainer}>
            <Text style={styles.skippedHeadingLabel}>⚠️ Skipped Deadlines Log Ledger</Text>
            {skippedLogs.map((log, i) => (
              <View key={i} style={styles.skippedRowNode}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.skippedDateText}>{log.date} • {log.topicName}</Text>
                  <Text style={styles.skippedMetaText}>Base Score Accuracy: {log.overallScore}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.innerSheetAuditBtn} onPress={onLaunchAudit}>
            <Text style={styles.innerSheetAuditBtnText}>LAUNCH DYNAMIC SYNC AUDIT OVERLAY</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  syncStatusCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#E2E8F0", marginBottom: 16 },
  headerTapTarget: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  syncTitleBadge: { flexDirection: "row", alignItems: "center", flex: 1 },
  syncHeaderTitle: { color: "#0284C7", fontSize: 11, fontWeight: "900", letterSpacing: 0.5 },
  previewSubtitle: { color: "#94A3B8", fontSize: 11, fontWeight: "600", marginTop: 2 },
  expandedBlock: { marginTop: 14, borderTopWidth: 1, borderTopColor: "#F1F5F9", paddingTop: 14 },
  metricRow: { marginBottom: 10 },
  labelSubText: { color: "#64748B", fontSize: 9, fontWeight: "800" },
  valueMainText: { color: "#1E293B", fontSize: 14, fontWeight: "700", marginTop: 2 },
  valueGrowthText: { color: "#059669", fontSize: 13, fontWeight: "700", marginTop: 2 },
  skippedContainer: { marginTop: 6 },
  skippedHeadingLabel: { color: "#475569", fontSize: 11, fontWeight: "800", marginBottom: 8 },
  skippedRowNode: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FEF2F2", padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#FEE2E2", marginBottom: 6 },
  skippedDateText: { color: "#991B1B", fontSize: 12, fontWeight: "700" },
  skippedMetaText: { color: "#EF4444", fontSize: 11, fontWeight: "600", marginTop: 1 },
  innerSheetAuditBtn: { backgroundColor: "#EFF6FF", padding: 12, borderRadius: 10, alignItems: "center", marginTop: 10, borderWidth: 1, borderColor: "#DBEAFE" },
  innerSheetAuditBtnText: { color: "#2563EB", fontSize: 10, fontWeight: "900" }
});