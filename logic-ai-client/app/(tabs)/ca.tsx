import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function NeuralCurrentAffairs() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedDate, setSelectedDate] = useState(1); // Default to current day
  const [selectedItem, setSelectedItem] = useState(null); // For Modal

  const categories = ["ALL", "IT", "ECONOMY", "DEFENSE", "SCIENCE"];

  const days = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    active: i < 1, 
    isToday: i === 0,
  }));

  const CURRENT_AFFAIRS_DATA = [
    {
      id: "CA_001",
      category: "IT",
      title: "Global Neural Governance Accord (GNGA) 2026",
      date: `May ${selectedDate < 10 ? '0'+selectedDate : selectedDate}, 2026`,
      color: "#3B82F6",
      summary: "A landmark treaty signed by 120 nations to regulate autonomous AI reasoning.",
      details: "The GNGA 2026 establishes a 'Universal AI Safety Label' and mandates that all models with over 10^26 parameters must undergo third-party auditing. It specifically targets 'Sovereign AI' models to prevent regional data monopolies while ensuring ethical alignment in automated decision-making.",
      strategicPoints: [
        "10^26 Parameter threshold for mandatory audits.",
        "Creation of the Universal AI Safety Label (UASL).",
        "Mandatory 3rd party auditing for Sovereign AI.",
        "120 Nations consensus on neural data flow.",
        "Strict penalties for non-aligned autonomous reasoning.",
        "Preventing regional data monopolies.",
        "Ethical alignment framework for decision-making.",
        "Impact on cross-border data transfer protocols.",
        "New compliance standards for Tier-1 Tech hubs.",
        "Framework for liability in AI-generated outcomes."
      ],
    },
    {
        id: "CA_002",
        category: "ECONOMY",
        title: "The Digital Rupee (e₹) Phase 4 Expansion",
        date: `May ${selectedDate < 10 ? '0'+selectedDate : selectedDate}, 2026`,
        color: "#10B981",
        summary: "RBI announces offline programmable features for the CBDC.",
        details: "The latest update allows the e-Rupee to be 'earmarked' for specific purposes (like fuel or education) and enables peer-to-peer transfers without active internet connectivity.",
        strategicPoints: [
          "Programmability added to CBDC (e-Rupee).",
          "Purpose-linked earmarking (Education/Subsidies).",
          "Offline P2P transaction capability via NFC.",
          "Reduction in cash handling costs for rural banks.",
          "Enhanced security through quantum-resistant encryption.",
          "Direct Benefit Transfer (DBT) integration.",
          "Anonymity thresholds for small micro-transactions.",
          "Interoperability with existing UPI QR codes.",
          "Real-time settlement for merchants.",
          "Targeting 100 million active users by Q4 2026."
        ],
      },
  ];

  // Helper to count items per category
  const getCount = (cat) => {
    if (cat === "ALL") return CURRENT_AFFAIRS_DATA.length;
    return CURRENT_AFFAIRS_DATA.filter(i => i.category === cat).length;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F8FAFC'}}>
    <ScrollView style={styles.section} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.sectionLabel}>AI CURATED INTELLIGENCE</Text>
          <Text style={styles.mainTitle}>Current Affairs Feed</Text>
        </View>
        <TouchableOpacity style={styles.aiRefresh}>
          <Ionicons name="sparkles" size={16} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* Calendar Section */}
      <View style={styles.sectionCalendar}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionLabel}>MAY 2026 CALENDAR</Text>
          <View style={styles.streakBadge}>
            <Ionicons name="calendar" size={12} color="#D97706" />
            <Text style={styles.streakText}>SELECTED: {selectedDate} MAY</Text>
          </View>
        </View>

        <View style={styles.calendarGrid}>
          {days.map((day) => (
            <TouchableOpacity
              key={day.id}
              onPress={() => setSelectedDate(day.id)}
              style={[
                styles.dayBox,
                day.active && styles.dayActive,
                day.id === selectedDate && styles.daySelected,
                day.isToday && styles.dayToday,
              ]}
            >
              <Text style={[
                  styles.dayNumber,
                  (day.active || day.id === selectedDate) && { color: "#FFF" },
                  day.isToday && day.id !== selectedDate && { color: "#1A237E" }
              ]}>
                {day.id}
              </Text>
              {day.isToday && <View style={[styles.todayIndicator, day.id === selectedDate && {backgroundColor: '#FFF'}]} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Category Pills with Counts */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[
              styles.catPill,
              activeCategory === cat && styles.catPillActive,
            ]}
          >
            <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>
              {cat} ({getCount(cat)})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Top 10 List */}
      <View style={styles.caContainer}>
        {CURRENT_AFFAIRS_DATA.filter(i => activeCategory === "ALL" || i.category === activeCategory).map((item, index) => (
          <View key={item.id} style={styles.caCard}>
            <View style={styles.caLeft}>
              <View style={[styles.categoryIndicator, { backgroundColor: item.color }]} />
              <Text style={styles.caIndex}>{index + 1}</Text>
            </View>

            <View style={styles.caRight}>
              <View style={styles.caMeta}>
                <Text style={[styles.caCategoryText, { color: item.color }]}>{item.category}</Text>
                <Text style={styles.caDate}>{item.date}</Text>
              </View>
              <Text style={styles.caTitle}>{item.title}</Text>

              <TouchableOpacity 
                style={styles.detailsBtn} 
                activeOpacity={0.7}
                onPress={() => setSelectedItem(item)}
              >
                <Text style={styles.detailsBtnText}>DECRYPT DETAILS</Text>
                <Ionicons name="chevron-forward" size={14} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Modal for Details */}
      <Modal visible={!!selectedItem} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeModal} onPress={() => setSelectedItem(null)}>
                    <Ionicons name="close-circle" size={32} color="#94A3B8" />
                </TouchableOpacity>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[styles.modalIndicator, {backgroundColor: selectedItem?.color}]} />
                    <Text style={styles.modalCategory}>{selectedItem?.category}</Text>
                    <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
                    <Text style={styles.modalDate}>{selectedItem?.date}</Text>

                    <Text style={styles.modalHeading}>EXECUTIVE BRIEFING</Text>
                    <Text style={styles.modalDetails}>{selectedItem?.details}</Text>

                    <Text style={styles.modalHeading}>STRATEGIC POINTS (TOP 10)</Text>
                    <View style={styles.pointsList}>
                        {selectedItem?.strategicPoints.map((point, i) => (
                            <View key={i} style={styles.pointRow}>
                                <View style={[styles.pointDot, {backgroundColor: selectedItem?.color}]} />
                                <Text style={styles.pointText}>{point}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
      </Modal>
      <View style={{height: 100}} />
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
  caTitle: { fontSize: 14, fontWeight: "800", color: "#1E293B", lineHeight: 20, marginBottom: 12 },
  detailsBtn: { flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start", backgroundColor: "#F0F7FF", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  detailsBtnText: { fontSize: 9, fontWeight: "900", color: "#3B82F6" },

  sectionCalendar: { marginBottom: 30 },
  streakBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#FEF3C7", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  streakText: { fontSize: 10, fontWeight: "900", color: "#D97706", marginLeft: 4 },
  calendarGrid: { flexDirection: "row", flexWrap: "wrap", backgroundColor: "#FFF", padding: 15, borderRadius: 28, borderWidth: 1, borderColor: "#F1F5F9", justifyContent: "space-between" },
  dayBox: { width: (width - 110) / 6, height: (width - 110) / 6, borderRadius: 12, backgroundColor: "#F1F5F9", justifyContent: "center", alignItems: "center", marginBottom: 10, marginHorizontal: 2 },
  dayActive: { backgroundColor: "#CBD5E1" }, // History days
  daySelected: { backgroundColor: "#1A237E" }, // Highlighted day
  dayToday: { borderWidth: 2, borderColor: "#1A237E" },
  dayNumber: { fontSize: 11, fontWeight: "800", color: "#64748B" },
  todayIndicator: { position: "absolute", bottom: 4, width: 4, height: 4, borderRadius: 2, backgroundColor: "#1A237E" },
  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  calendarFooter: { textAlign: "center", fontSize: 10, color: "#94A3B8", fontWeight: "700", marginTop: 12 },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', height: height * 0.85, borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 30 },
  closeModal: { alignSelf: 'flex-end', marginBottom: 10 },
  modalIndicator: { width: 40, height: 6, borderRadius: 3, marginBottom: 20 },
  modalCategory: { fontSize: 10, fontWeight: '900', color: '#64748B', letterSpacing: 2 },
  modalTitle: { fontSize: 24, fontWeight: '900', color: '#1E293B', marginTop: 10 },
  modalDate: { fontSize: 12, fontWeight: '700', color: '#94A3B8', marginTop: 5 },
  modalHeading: { fontSize: 12, fontWeight: '900', color: '#1E293B', letterSpacing: 1.5, marginTop: 30, marginBottom: 15, textDecorationLine: 'underline' },
  modalDetails: { fontSize: 15, color: '#475569', lineHeight: 24, fontWeight: '500' },
  pointsList: { marginTop: 10 },
  pointRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  pointDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6, marginRight: 12 },
  pointText: { flex: 1, fontSize: 14, color: '#1E293B', fontWeight: '600', lineHeight: 20 },
});

