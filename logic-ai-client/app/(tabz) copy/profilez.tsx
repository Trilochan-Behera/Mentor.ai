import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* USER IDENTITY */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarBox}>
             <Text style={styles.avatarTxt}>K</Text>
             <View style={styles.badgeIcon}><Ionicons name="ribbon" size={14} color="#FFF" /></View>
          </View>
          <Text style={styles.userName}>Kanha Operative</Text>
          <Text style={styles.userRank}>Rank: Senior Strategist • Level 42</Text>
        </View>

        {/* ACHIEVEMENTS (From your PRD) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACHIEVEMENTS & BADGES</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgeRow}>
            {['King 👑', 'Sharp ⚡', 'Constant 💎', 'Speedster 🚀'].map((b, i) => (
              <View key={i} style={styles.badge}>
                <Text style={styles.badgeText}>{b}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* PERFORMANCE STATS */}
        <View style={styles.section}>
          <View style={styles.statsContainer}>
            <View style={styles.statLine}>
              <Text style={styles.statLabel}>Battle Wins</Text>
              <Text style={styles.statValue}>128</Text>
            </View>
            <View style={styles.statLine}>
              <Text style={styles.statLabel}>Topics Mastered</Text>
              <Text style={styles.statValue}>42</Text>
            </View>
            <View style={styles.statLine}>
              <Text style={styles.statLabel}>Global Percentile</Text>
              <Text style={styles.statValue}>98.4</Text>
            </View>
          </View>
        </View>

        {/* SETTINGS / LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>TERMINATE SESSION</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  profileHeader: { alignItems: 'center', padding: 40 },
  avatarBox: { width: 100, height: 100, borderRadius: 35, backgroundColor: '#1A237E', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  avatarTxt: { color: '#FFF', fontSize: 36, fontWeight: '900' },
  badgeIcon: { position: 'absolute', bottom: -5, right: -5, width: 30, height: 30, borderRadius: 15, backgroundColor: '#F59E0B', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#F8FAFC' },
  userName: { fontSize: 20, fontWeight: '900', color: '#1A237E', marginTop: 20 },
  userRank: { fontSize: 12, fontWeight: '800', color: '#94A3B8', marginTop: 5 },

  section: { paddingHorizontal: 25, marginTop: 30 },
  sectionLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 2, marginBottom: 15 },
  
  badgeRow: { flexDirection: 'row' },
  badge: { backgroundColor: '#EEF2FF', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15, marginRight: 10, borderWidth: 1, borderColor: '#E0E7FF' },
  badgeText: { fontSize: 12, fontWeight: '900', color: '#6366F1' },

  statsContainer: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#F1F5F9' },
  statLine: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  statLabel: { fontSize: 14, fontWeight: '700', color: '#64748B' },
  statValue: { fontSize: 14, fontWeight: '900', color: '#1A237E' },

  logoutBtn: { marginTop: 40, marginHorizontal: 25, padding: 20, alignItems: 'center', borderRadius: 20, backgroundColor: '#FEE2E2' },
  logoutText: { color: '#EF4444', fontWeight: '900', fontSize: 12, letterSpacing: 1 }
});