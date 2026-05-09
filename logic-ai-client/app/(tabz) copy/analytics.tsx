import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

export default function AnalyticsPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const currentStreak = 14;
  const days = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    active: i < currentStreak, // Days completed
    isToday: i === currentStreak,
  }));

  // DATA: Last 5 Attempts (Reasoning, Arithmetic, Computer, Odisha GK, GA)
  const lastFiveAttempts = [
    { id: "#124", score: 45, date: "18 Apr" },
    { id: "#125", score: 58, date: "20 Apr" },
    { id: "#126", score: 52, date: "22 Apr" },
    { id: "#127", score: 76, date: "24 Apr" },
    { id: "#128", score: 88, date: "26 Apr" }, // Most recent
  ];

  const openSummary = (log) => {
    setSelectedLog(log);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. TACTICAL HEADER & GLOBAL DOWNLOAD */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>INTELLIGENCE HUB</Text>
            <Text style={styles.headerSub}>
              Operative: Kanha • Protocol K-004
            </Text>
          </View>
          <TouchableOpacity style={styles.globalDownload}>
            <Ionicons name="cloud-download" size={20} color="#FFF" />
            <Text style={styles.globalDownloadText}>ALL REPORTS</Text>
          </TouchableOpacity>
        </View>

        {/* 2. PROGRESS VISUALIZER (Last 5 Attempts) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            LIFETIME PROGRESS CURVE (LAST 5)
          </Text>
          <View style={styles.chartCard}>
            <View style={styles.chartYAxis}>
              {[100, 75, 50, 25, 0].map((v) => (
                <Text key={v} style={styles.yText}>
                  {v}
                </Text>
              ))}
            </View>
            <View style={styles.chartMain}>
              {lastFiveAttempts.map((item, i) => (
                <View key={i} style={styles.barWrapper}>
                  <View style={styles.barTrack}>
                    <LinearGradient
                      colors={
                        i === 4
                          ? ["#10B981", "#34D399"]
                          : ["#1A237E", "#3949AB"]
                      }
                      style={[styles.barFill, { height: `${item.score}%` }]}
                    />
                  </View>
                  <Text style={styles.xText}>{item.date}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>30-DAY CONSISTENCY STRIKE</Text>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={12} color="#F59E0B" />
              <Text style={styles.streakText}>{currentStreak} DAY STREAK</Text>
            </View>
          </View>

          <View style={styles.calendarGrid}>
            {days.map((day) => (
              <View
                key={day.id}
                style={[
                  styles.dayBox,
                  day.active && styles.dayActive,
                  day.isToday && styles.dayToday,
                ]}
              >
                {day.active ? (
                  <Ionicons name="checkmark" size={14} color="#FFF" />
                ) : (
                  <Text
                    style={[
                      styles.dayNumber,
                      day.isToday && { color: "#1A237E" },
                    ]}
                  >
                    {day.id}
                  </Text>
                )}
                {day.isToday && <View style={styles.todayIndicator} />}
              </View>
            ))}
          </View>
          <Text style={styles.calendarFooter}>
            Maintain your strike to optimize memory retention.
          </Text>
        </View>

        {/* 3. CATEGORY MASTERY (Syllabus Specific) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CATEGORY-WISE IMPROVEMENT</Text>
          <View style={styles.masteryGrid}>
            {[
              { cat: "Reasoning", perc: 92, trend: "+4%", col: "#10B981" },
              { cat: "Arithmetic", perc: 85, trend: "+12%", col: "#6366F1" },
              { cat: "Computer", perc: 78, trend: "+2%", col: "#F59E0B" },
              { cat: "Odisha GK", perc: 45, trend: "+18%", col: "#EF4444" },
            ].map((item, i) => (
              <View key={i} style={styles.masteryItem}>
                <View style={styles.masteryHeader}>
                  <Text style={styles.masteryTitle}>{item.cat}</Text>
                  <Text style={[styles.masteryTrend, { color: item.col }]}>
                    {item.trend}
                  </Text>
                </View>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${item.perc}%`, backgroundColor: item.col },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 4. ATTEMPT LOGS & PDF DOWNLOADS */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>RECENT MISSION LOGS</Text>
          {lastFiveAttempts.reverse().map((log, i) => (
            <TouchableOpacity
              key={i}
              style={styles.logCard}
              onPress={() => openSummary(log)}
            >
              <View style={styles.logLeft}>
                <View style={styles.logIcon}>
                  <Ionicons name="document-text" size={20} color="#1A237E" />
                </View>
                <View>
                  <Text style={styles.logTitle}>Attempt {log.id}</Text>
                  <Text style={styles.logMeta}>
                    {log.date} • Score: {log.score}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.pdfAction}>
                <Ionicons name="download-outline" size={18} color="#1A237E" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* 5. MODAL: ANALYSIS POPUP */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <Animatable.View
              animation="slideInUp"
              duration={400}
              style={styles.modalBody}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Mission Summary {selectedLog?.id}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-circle" size={28} color="#CBD5E1" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBento}>
                <View style={styles.bentoBox}>
                  <Text style={styles.bLab}>ACCURACY</Text>
                  <Text style={styles.bVal}>88%</Text>
                </View>
                <View style={styles.bentoBox}>
                  <Text style={styles.bLab}>NET SCORE</Text>
                  <Text style={[styles.bVal, { color: "#10B981" }]}>
                    {selectedLog?.score}
                  </Text>
                </View>
              </View>

              <Text style={styles.intelLab}>STRATEGIC ADVICE</Text>
              <Text style={styles.intelText}>
                Your speed in Arithmetic has improved by 12%. Focusing on Odisha
                GK accuracy will push your net score above the 90-point
                threshold.
              </Text>

              <TouchableOpacity style={styles.fullReportBtn}>
                <Text style={styles.fullReportText}>GENERATE DETAILED PDF</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </Modal>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingBottom: 20 },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1A237E",
    letterSpacing: 1.5,
  },
  headerSub: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "800",
    marginTop: 4,
  },
  globalDownload: {
    backgroundColor: "#1A237E",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  globalDownloadText: {
    color: "#FFF",
    fontSize: 9,
    fontWeight: "900",
    marginLeft: 6,
  },

  // Progress Chart
  section: { paddingHorizontal: 20, marginTop: 30 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94A3B8",
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  chartCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    height: 220,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  chartYAxis: {
    justifyContent: "space-between",
    paddingRight: 10,
    paddingVertical: 10,
  },
  yText: { fontSize: 9, color: "#CBD5E1", fontWeight: "700" },
  chartMain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  barWrapper: { alignItems: "center", width: 30 },
  barTrack: {
    width: 15,
    height: 140,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: { width: "100%", borderRadius: 10 },
  xText: { fontSize: 9, fontWeight: "900", color: "#94A3B8", marginTop: 10 },

  // Mastery Grid
  masteryGrid: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  masteryItem: { marginBottom: 18 },
  masteryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  masteryTitle: { fontSize: 12, fontWeight: "800", color: "#1A237E" },
  masteryTrend: { fontSize: 10, fontWeight: "900" },
  track: { height:15, backgroundColor: "#F1F5F9", borderRadius: 3 },
  fill: { height: "100%", borderRadius: 3 },

  // Log Cards
  logCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  logLeft: { flexDirection: "row", alignItems: "center" },
  logIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F1F3F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  logTitle: { fontSize: 14, fontWeight: "800", color: "#1A237E" },
  logMeta: { fontSize: 11, color: "#94A3B8", fontWeight: "600", marginTop: 2 },
  pdfAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    justifyContent: "flex-end",
  },
  modalBody: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingBottom: 50,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  modalTitle: { fontSize: 18, fontWeight: "900", color: "#1A237E" },
  modalBento: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  bentoBox: { flex: 1, alignItems: "center" },
  bLab: { fontSize: 9, fontWeight: "900", color: "#94A3B8", marginBottom: 6 },
  bVal: { fontSize: 20, fontWeight: "900", color: "#1A237E" },
  intelLab: {
    fontSize: 10,
    fontWeight: "900",
    color: "#1A237E",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  intelText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 30,
  },
  fullReportBtn: {
    backgroundColor: "#1A237E",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  fullReportText: { color: "#FFF", fontWeight: "900", fontSize: 13 },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    justifyContent: "space-between",
  },
  dayBox: {
    width: (width - 110) / 6,
    height: (width - 110) / 6,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 2,
    position: "relative",
  },
  dayActive: { backgroundColor: "#1A237E" },
  dayToday: { backgroundColor: "#FFF", borderWidth: 2, borderColor: "#1A237E" },
  dayNumber: { fontSize: 11, fontWeight: "800", color: "#CBD5E1" },
  todayIndicator: {
    position: "absolute",
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#1A237E",
  },
  calendarFooter: {
    textAlign: "center",
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "700",
    marginTop: 12,
  },
  
  // Countdown Card
  countdownSection: { paddingHorizontal: 20, marginTop: 20 },
  countdownCard: { 
    borderRadius: 24, padding: 25, flexDirection: 'row', 
    justifyContent: 'space-between', alignItems: 'center', elevation: 8 
  },
  countdownLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  targetDate: { color: '#FFF', fontSize: 18, fontWeight: '900', marginTop: 5 },
  daysBox: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', padding: 12, borderRadius: 18, width: 80 },
  daysRemaining: { color: '#FFF', fontSize: 24, fontWeight: '900' },
  daysText: { color: '#FFF', fontSize: 8, fontWeight: '800' },

  // Strike Calendar
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  streakText: { fontSize: 10, fontWeight: '900', color: '#D97706', marginLeft: 4 },
  
});
