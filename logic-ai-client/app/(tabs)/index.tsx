// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import * as Animatable from 'react-native-animatable';
// import { COLORS } from '../theme/colors';

// export default function HomeTab() {
//   // MOCK DATA: To be replaced by your /home API endpoint
//   const userData = {
//     level: 23,
//     rank: "Elite Tactician",
//     marksToCapture: 5,
//     streak: 3,
//     potentialScore: 96,
//     currentScore: 78,
//   };

//   const insights = [
//     { id: 1, type: 'gain', text: 'Profit & Loss Accuracy Up 12%', color: '#10B981' },
//     { id: 2, type: 'alert', text: 'Speed Drop in Ratios (Need Trick)', color: '#EF4444' },
//     { id: 3, type: 'tip', text: 'New Smart Method unlocked for Puzzles', color: '#3B82F6' },
//   ];

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       {/* 1. HEADER SECTION: Identity & Streak */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.welcomeText}>System Online</Text>
//           <Text style={styles.rankText}>{userData.rank} • Lvl {userData.level}</Text>
//         </View>
//         <View style={styles.streakBadge}>
//           <Ionicons name="flame" size={20} color={COLORS.accent} />
//           <Text style={styles.streakText}>{userData.streak}</Text>
//         </View>
//       </View>

//       {/* 2. MAIN ACTION: Mark Capture Card */}
//       <Animatable.View animation="fadeInUp" duration={1000} style={styles.mainCardContainer}>
//         <TouchableOpacity activeOpacity={0.9}>
//           <LinearGradient colors={[COLORS.primary, '#1D4ED8']} style={styles.captureCard}>
//             <View style={styles.cardHeader}>
//               <Text style={styles.cardLabel}>TODAY'S MISSION</Text>
//               <Ionicons name="flash" size={24} color="#FFF" />
//             </View>
//             <Text style={styles.captureTitle}>Capture +{userData.marksToCapture} Marks</Text>
//             <Text style={styles.captureDesc}>Focusing on: Ratios & Seating (40% Accuracy Zone)</Text>
//             <View style={styles.startButton}>
//               <Text style={styles.startBtnText}>START PRACTICE</Text>
//               <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
//             </View>
//           </LinearGradient>
//         </TouchableOpacity>
//       </Animatable.View>

//       {/* 3. PERFORMANCE BAR: Potential vs Current */}
//       <View style={styles.scoreSection}>
//         <View style={styles.scoreInfo}>
//           <Text style={styles.scoreLabel}>Exam Readiness</Text>
//           <Text style={styles.scoreValue}>{userData.currentScore}%</Text>
//         </View>
//         <View style={styles.progressBarBg}>
//           <LinearGradient 
//             colors={[COLORS.primaryLight, COLORS.primary]} 
//             start={{x: 0, y: 0}} end={{x: 1, y: 0}}
//             style={[styles.progressFill, { width: `${userData.currentScore}%` }]} 
//           />
//           <View style={[styles.potentialMarker, { left: `${userData.potentialScore}%` }]} />
//         </View>
//         <Text style={styles.potentialText}>Capture today's marks to reach {userData.potentialScore}%</Text>
//       </View>

//       {/* 4. COACH FEED: Passive AI Insights */}
//       <View style={styles.insightSection}>
//         <Text style={styles.sectionTitle}>Coach Insights</Text>
//         {insights.map((insight, index) => (
//           <Animatable.View key={insight.id} animation="fadeInRight" delay={index * 200} style={styles.insightCard}>
//             <View style={[styles.indicator, { backgroundColor: insight.color }]} />
//             <Text style={styles.insightText}>{insight.text}</Text>
//             <Ionicons name="chevron-forward" size={16} color={COLORS.textDim} />
//           </Animatable.View>
//         ))}
//       </View>

//       <View style={{ height: 100 }} /> 
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
//   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60, marginBottom: 30 },
//   welcomeText: { color: COLORS.textDim, fontSize: 14, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase' },
//   rankText: { color: COLORS.text, fontSize: 24, fontWeight: '900' },
//   streakBadge: { backgroundColor: 'rgba(245, 158, 11, 0.1)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: COLORS.accent },
//   streakText: { color: COLORS.accent, fontWeight: '800', marginLeft: 5, fontSize: 16 },
  
//   mainCardContainer: { marginBottom: 35 },
//   captureCard: { padding: 25, borderRadius: 32, elevation: 15, shadowColor: COLORS.primary, shadowRadius: 20, shadowOpacity: 0.4 },
//   cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
//   cardLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '900', letterSpacing: 2 },
//   captureTitle: { color: '#FFF', fontSize: 32, fontWeight: '900', marginBottom: 5 },
//   captureDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '500', marginBottom: 25 },
//   startButton: { backgroundColor: '#FFF', alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, flexDirection: 'row', alignItems: 'center' },
//   startBtnText: { color: COLORS.primary, fontWeight: '900', fontSize: 14, marginRight: 8 },

//   scoreSection: { marginBottom: 35, backgroundColor: COLORS.surface, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border },
//   scoreInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
//   scoreLabel: { color: COLORS.textDim, fontWeight: '700', fontSize: 14 },
//   scoreValue: { color: COLORS.text, fontSize: 22, fontWeight: '900' },
//   progressBarBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'visible' },
//   progressFill: { height: '100%', borderRadius: 4 },
//   potentialMarker: { position: 'absolute', top: -4, width: 2, height: 16, backgroundColor: COLORS.accent },
//   potentialText: { color: COLORS.textDim, fontSize: 12, marginTop: 15, fontWeight: '500' },

//   insightSection: { marginBottom: 20 },
//   sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: '800', marginBottom: 15 },
//   insightCard: { backgroundColor: COLORS.surface, flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
//   indicator: { width: 4, height: 20, borderRadius: 2, marginRight: 15 },
//   insightText: { flex: 1, color: COLORS.text, fontSize: 15, fontWeight: '500' },
// });