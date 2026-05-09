import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

export default function PracticeLab() {
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
          <EntryMode 
            title="Revision Practice" 
            sub="Memory-based reinforcement cycles" 
            icon="refresh-outline" 
            color="#10B981" 
          />
        </View>

        {/* GOAL DRIVEN MODES */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>GOAL-DRIVEN PROTOCOLS</Text>
          <View style={styles.goalGrid}>
            {[
              { t: 'Improve Speed', i: 'flash-outline', c: '#F59E0B' },
              { t: 'Improve Accuracy', i: 'target-outline', c: '#10B981' },
              { t: 'Reduce Skips', i: 'play-skip-forward-outline', c: '#6366F1' },
              { t: 'Manual Mode', i: 'options-outline', c: '#94A3B8' }
            ].map((item, i) => (
              <TouchableOpacity key={i} style={styles.goalTile}>
                <Ionicons name={item.i as any} size={22} color={item.c} />
                <Text style={styles.goalTileText}>{item.t}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  goalTileText: { fontSize: 12, fontWeight: '800', color: '#475569', marginTop: 10 }
});