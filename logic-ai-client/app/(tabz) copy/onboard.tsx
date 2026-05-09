import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

export default function Onboarding() {
  const router = useRouter();
  const [goal, setGoal] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);

  const toggleSubject = (id: string) => {
    setSubjects(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.header}>
          <Text style={styles.stepText}>PHASE 01: SYSTEM CALIBRATION</Text>
          <Text style={styles.title}>Define Your Target</Text>
        </View>

        {/* GOAL SELECTION */}
        <View style={styles.section}>
          <Text style={styles.label}>OPERATIONAL OBJECTIVE</Text>
          {[
            { id: 'speed', t: 'Speed Improvement', s: 'Optimize response velocity', i: 'flash' },
            { id: 'acc', t: 'Accuracy Growth', s: 'Eliminate careless failures', i: 'target' }
          ].map(item => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => setGoal(item.id)}
              style={[styles.card, goal === item.id && styles.cardActive]}
            >
              <Ionicons name={item.i as any} size={24} color={goal === item.id ? '#FFF' : '#1A237E'} />
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, goal === item.id && {color: '#FFF'}]}>{item.t}</Text>
                <Text style={[styles.cardSub, goal === item.id && {color: 'rgba(255,255,255,0.6)'}]}>{item.s}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* SUBJECT SELECTION */}
        <View style={styles.section}>
          <Text style={styles.label}>SYLLABUS DOMAINS</Text>
          <View style={styles.grid}>
            {['Quant', 'Reasoning', 'English', 'Gen Awareness'].map(sub => (
              <TouchableOpacity 
                key={sub} 
                onPress={() => toggleSubject(sub)}
                style={[styles.tile, subjects.includes(sub) && styles.tileActive]}
              >
                <Text style={[styles.tileText, subjects.includes(sub) && {color: '#FFF'}]}>{sub}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.btn, (!goal || subjects.length === 0) && { opacity: 0.5 }]}
          disabled={!goal || subjects.length === 0}
          onPress={() => router.push('/diagnostic')}
        >
          <LinearGradient colors={['#1A237E', '#3949AB']} style={styles.btnGrad}>
            <Text style={styles.btnText}>INITIALIZE DIAGNOSTIC TEST</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { padding: 25 },
  header: { marginTop: 20, marginBottom: 30 },
  stepText: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 2 },
  title: { fontSize: 32, fontWeight: '900', color: '#1A237E', marginTop: 8 },
  section: { marginBottom: 30 },
  label: { fontSize: 10, fontWeight: '900', color: '#64748B', letterSpacing: 1.5, marginBottom: 15 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  cardActive: { backgroundColor: '#1A237E', borderColor: '#1A237E' },
  cardContent: { marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#1A237E' },
  cardSub: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: { width: '48%', backgroundColor: '#FFF', padding: 18, borderRadius: 15, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9', alignItems: 'center' },
  tileActive: { backgroundColor: '#3949AB', borderColor: '#3949AB' },
  tileText: { fontSize: 13, fontWeight: '800', color: '#64748B' },
  btn: { height: 60, borderRadius: 20, overflow: 'hidden', marginTop: 20 },
  btnGrad: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '900', letterSpacing: 1, marginRight: 10 }
});