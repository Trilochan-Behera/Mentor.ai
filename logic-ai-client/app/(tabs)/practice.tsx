import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const EntryMode = ({ title, sub, icon, color, tag }) => (
  <TouchableOpacity style={styles.modeCard}>
    <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <View style={styles.modeText}>
      <View style={styles.titleRow}>
        <Text style={styles.modeTitle}>{title}</Text>
        {tag && <View style={[styles.tag, {backgroundColor: color}]}><Text style={styles.tagText}>{tag}</Text></View>}
      </View>
      <Text style={styles.modeSub}>{sub}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
  </TouchableOpacity>
);

const HubTile = ({ title, icon, color, sub }) => (
  <TouchableOpacity style={styles.hubTile}>
    <View style={[styles.tileIconBg, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.tileTitle}>{title}</Text>
    <Text style={styles.tileSub}>{sub}</Text>
  </TouchableOpacity>
);


export default function PracticeLab() {
  const router = useRouter();

   const subjects = [
    {
      id: "QA",
      title: "Quantitative Aptitude",
      subtitle: "Arithmetic, Algebra & Data",
      icon: "calculator",
      colors: ["#E8EAF6", "#C5CAE9"],
      accent: "#3F51B5",
    },
    {
      id: "Reasoning",
      title: "Logical Reasoning",
      subtitle: "Puzzles, Seating & Logic",
      icon: "bulb",
      colors: ["#E1F5FE", "#B3E5FC"],
      accent: "#0288D1",
    },
    {
      id: "English",
      title: "Verbal Ability",
      subtitle: "Grammar, Vocab & RC",
      icon: "book",
      colors: ["#E8F5E9", "#C8E6C9"],
      accent: "#388E3C",
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PRACTICE LAB</Text>
          <Text style={styles.headerSub}>CORE_ENGINE • SELECT ENTRY PROTOCOL</Text>
        </View>

        {/* AI RECOMMENDED MODES */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>AI RECOMMENDED (DEFAULT)</Text>
          <EntryMode 
            title="Weakness Attack" 
            sub="Aggressive focus on high-failure topics" 
            icon="skull-outline" 
            color="#EF4444" 
            tag="PRIORITY"
          />
          <EntryMode
            title="Smart Mix" 
            sub="Adaptive question variety based on level" 
            icon="git-branch-outline" 
            color="#6366F1" 
          />
        </View>

  {/* 1. LEARNING MODULES */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LEARNING & ADAPTATION</Text>
          <View style={styles.hubGrid}>
            <HubTile title="Improve Speed" icon="flash-outline" color="#F59E0B" sub="" />
            <HubTile title="Improve Accuracy" icon="pulse-outline" color="#10B981" sub="" />
            <HubTile title="Reduce Skips" icon="play-skip-forward-outline" color="#6366F1" sub="" />
            <HubTile title="Revise Pratice" icon="refresh-outline" color="#6ad3f6" sub="" />
          </View>
        </View>

        {/* 5. Subjects List */}
        <View style={styles.section}>
              <Text style={styles.sectionLabel}>PREPARE BY TOPIC</Text>
              {subjects.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.cardWrapper}
                  onPress={() =>
                    router.push({
                      pathname: "/quiz/subtopics",
                      params: { subject: item.id },
                    })
                  }
                >
                  <View style={[styles.card, { backgroundColor: item.colors[0] }]}>
                    <View style={styles.cardContent}>
                      <View
                        style={[styles.iconBox, { backgroundColor: item.colors[1] }]}
                      >
                        <Ionicons
                          name={item.icon as any}
                          size={28}
                          color={item.accent}
                        />
                      </View>
                      <View style={styles.textDetails}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSubText}>{item.subtitle}</Text>
                      </View>
                      <View
                        style={[styles.arrowCircle, { backgroundColor: item.accent }]}
                      >
                        <Ionicons name="chevron-forward" size={18} color="#FFF" />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              </View>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingBottom: 40 },
  header: { padding: 25, paddingTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#1A237E', letterSpacing: 2 },
  headerSub: { fontSize: 10, fontWeight: '800', color: '#94A3B8', marginTop: 5 },

  section: { paddingHorizontal: 20, marginTop: 30 },
  sectionLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1.5, marginBottom: 15 },

  modeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 24, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  iconContainer: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  modeText: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  modeTitle: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  tag: { marginLeft: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  tagText: { fontSize: 8, fontWeight: '900', color: '#FFF' },
  modeSub: { fontSize: 11, color: '#94A3B8', fontWeight: '600', marginTop: 4 },

  goalGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  goalTile: { width: '48%', backgroundColor: '#FFF', padding: 20, borderRadius: 22, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  goalTileText: { fontSize: 12, fontWeight: '800', color: '#475569', marginTop: 10 },
    hubGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
     hubTile: { 
    backgroundColor: '#FFF', width: '48%', borderRadius: 24, padding: 20, 
    marginBottom: 15, elevation: 4, shadowColor: '#1A237E', shadowOpacity: 0.1 
  },
  tileIconBg: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  tileTitle: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  tileSub: { fontSize: 9, color: '#94A3B8', fontWeight: '700', marginTop: 4 },
  cardWrapper: { marginBottom: 18 },
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    elevation: 2,
  },
  cardContent: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  textDetails: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 18, fontWeight: "800", color: "#1A237E" },
  cardSubText: {
    fontSize: 13,
    color: "#5C6BC0",
    marginTop: 2,
    fontWeight: "500",
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

});