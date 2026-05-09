import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function BattleMode() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1A237E', '#0F172A']} style={styles.gradient}>
        
        {/* BATTLE HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>BATTLE MODE</Text>
          <View style={styles.liveChip}><View style={styles.dot} /><Text style={styles.liveText}>1,402 ONLINE</Text></View>
        </View>

        {/* MATCHMAKING RADAR */}
        <View style={styles.radarContainer}>
          <Animatable.View animation="pulse" iterationCount="infinite" style={styles.radarRing1} />
          <Animatable.View animation="pulse" iterationCount="infinite" delay={500} style={styles.radarRing2} />
          <View style={styles.userAvatar}>
            <Text style={styles.avatarText}>YOU</Text>
          </View>
        </View>

        <Text style={styles.statusText}>SEARCHING FOR OPERATIVES...</Text>

        {/* BATTLE TYPE SELECTION */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.battleTypeBtn}>
            <Ionicons name="flash" size={20} color="#F59E0B" />
            <Text style={styles.btnText}>SPEED BATTLE</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.battleTypeBtn, styles.activeBattle]}>
            <Ionicons name="trophy" size={20} color="#FFF" />
            <Text style={[styles.btnText, {color: '#FFF'}]}>MIXED RANKED</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createBtn}>
            <Text style={styles.createBtnText}>CREATE PRIVATE ROOM</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, padding: 30 },
  header: { alignItems: 'center', marginTop: 20 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#FFF', letterSpacing: 4 },
  liveChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(74, 222, 128, 0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4ADE80', marginRight: 6 },
  liveText: { fontSize: 9, fontWeight: '900', color: '#4ADE80', letterSpacing: 1 },

  radarContainer: { height: 300, justifyContent: 'center', alignItems: 'center', marginVertical: 40 },
  radarRing1: { position: 'absolute', width: 200, height: 200, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  radarRing2: { position: 'absolute', width: 140, height: 140, borderRadius: 70, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  userAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1A237E', borderWidth: 3, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 15 },
  avatarText: { color: '#FFF', fontWeight: '900', fontSize: 14 },

  statusText: { textAlign: 'center', color: '#94A3B8', fontSize: 11, fontWeight: '800', letterSpacing: 2 },

  optionsContainer: { marginTop: 'auto', marginBottom: 20 },
  battleTypeBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginBottom: 12 },
  activeBattle: { backgroundColor: '#3949AB' },
  btnText: { fontSize: 14, fontWeight: '900', color: '#1A237E', marginLeft: 15, letterSpacing: 1 },
  createBtn: { padding: 20, alignItems: 'center' },
  createBtnText: { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '800', letterSpacing: 1 }
});