import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  TextInput, SafeAreaView, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard, ScrollView
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

export default function SetupScreen() {
  const { topic } = useLocalSearchParams();
  const router = useRouter();

  const [qCount, setQCount] = useState<string>('20');
  const [level, setLevel] = useState<'Easy' | 'Moderate' | 'Hard'>('Moderate');

  const quickCounts = ['10', '20', '30', '50'];
  const levels = [
    { name: 'Easy', icon: 'leaf', color: '#4ADE80', desc: 'Basics' },
    { name: 'Moderate', icon: 'fitness', color: '#F59E0B', desc: 'Exam' },
    { name: 'Hard', icon: 'flame', color: '#FF5252', desc: 'Elite' },
  ];

  const handleStart = () => {
    const finalCount = parseInt(qCount);
    if (isNaN(finalCount) || finalCount <= 0 || finalCount > 100) {
      alert("Enter a range between 1 - 100");
      return;
    }
    router.push({ 
      pathname: '/quiz/engine', 
      params: { topic, count: finalCount, level } 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        title: "",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#F8F9FE' },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={styles.backCircle}>
            <Ionicons name="chevron-back" size={24} color="#1A237E" />
          </TouchableOpacity>
        ),
      }} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animatable.View animation="fadeIn" style={styles.header}>
              <Text style={styles.subjectTag}>CONFIGURATION</Text>
              <Text style={styles.topicName}>{topic}</Text>
              <Text style={styles.subTitle}>Adjust the parameters for your diagnostic session.</Text>
            </Animatable.View>

            {/* 1. Question Count Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Question Volume</Text>
                <Text style={styles.badgeText}>{qCount} Qs</Text>
              </View>
              
              <View style={styles.quickCountRow}>
                {quickCounts.map((num) => (
                  <TouchableOpacity 
                    key={num} 
                    onPress={() => { setQCount(num); Keyboard.dismiss(); }}
                    style={[styles.countChip, qCount === num && styles.activeCountChip]}
                  >
                    <Text style={[styles.countChipText, qCount === num && styles.activeCountText]}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.inputWrapper}>
                <Ionicons name="options-outline" size={20} color="#1A237E" style={styles.inputIcon} />
                <TextInput 
                  style={styles.customInput}
                  placeholder="Enter custom count (1-100)"
                  keyboardType="number-pad"
                  value={qCount}
                  onChangeText={setQCount}
                  maxLength={3}
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>

            {/* 2. Difficulty Level Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Difficulty Mode</Text>
              <View style={styles.levelContainer}>
                {levels.map((item) => {
                  const isSelected = level === item.name;
                  return (
                    <TouchableOpacity 
                      key={item.name}
                      activeOpacity={0.9}
                      onPress={() => { setLevel(item.name as any); Keyboard.dismiss(); }}
                      style={[
                        styles.levelCard, 
                        isSelected && { borderColor: item.color, backgroundColor: '#FFF' }
                      ]}
                    >
                      <View style={[styles.levelIcon, { backgroundColor: isSelected ? item.color : '#F1F3F9' }]}>
                        <Ionicons name={item.icon as any} size={20} color={isSelected ? "#FFF" : "#94A3B8"} />
                      </View>
                      <Text style={[styles.levelName, isSelected && { color: item.color }]}>{item.name}</Text>
                      <Text style={styles.levelDesc}>{item.desc}</Text>
                      {isSelected && <View style={[styles.activeDot, { backgroundColor: item.color }]} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* 3. Action Button */}
            <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
              <LinearGradient 
                colors={["#1A237E", "#3949AB"]} 
                start={{x:0, y:0}} end={{x:1, y:0}}
                style={styles.gradientBtn}
              >
                <Text style={styles.startBtnText}>Initialize Session</Text>
                <Ionicons name="flash" size={20} color="#FFD700" />
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE' },
  scrollContent: { padding: 24, paddingBottom: 40 },
  backCircle: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginLeft: 10, borderWidth: 1, borderColor: '#E8EAF6' },
  header: { marginBottom: 35 },
  subjectTag: { color: '#3F51B5', fontWeight: '800', fontSize: 11, letterSpacing: 1.5, marginBottom: 8 },
  topicName: { fontSize: 32, fontWeight: '900', color: '#1A237E', letterSpacing: -1 },
  subTitle: { fontSize: 12, color: '#94A3B8', marginTop: 8, fontWeight: '600' },
  
  section: { marginBottom: 35 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A237E' },
  badgeText: { backgroundColor: '#E8EAF6', color: '#1A237E', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, fontSize: 12, fontWeight: '800' },
  
  quickCountRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  countChip: { width: '22%', height: 55, borderRadius: 18, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8EAF6', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05 },
  activeCountChip: { backgroundColor: '#1A237E', borderColor: '#1A237E' },
  countChipText: { fontSize: 16, fontWeight: '800', color: '#1A237E' },
  activeCountText: { color: '#FFF' },
  
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 18, paddingHorizontal: 18, height: 60, borderWidth: 1, borderColor: '#E8EAF6' },
  inputIcon: { marginRight: 12 },
  customInput: { flex: 1, fontSize: 16, color: '#1A237E', fontWeight: '700' },

  levelContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  levelCard: { width: '31%', backgroundColor: '#FFF', paddingVertical: 20, paddingHorizontal: 10, borderRadius: 24, alignItems: 'center', borderWidth: 2, borderColor: 'transparent', elevation: 4, shadowColor: '#1A237E', shadowOpacity: 0.08, shadowRadius: 10 },
  levelIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  levelName: { fontSize: 14, fontWeight: '900', color: '#1A237E' },
  levelDesc: { fontSize: 9, color: '#94A3B8', marginTop: 4, fontWeight: '800', textTransform: 'uppercase' },
  activeDot: { position: 'absolute', top: 12, right: 12, width: 6, height: 6, borderRadius: 3 },

  startBtn: { marginTop: 20, borderRadius: 22, overflow: 'hidden', elevation: 10, shadowColor: '#1A237E', shadowOpacity: 0.3 },
  gradientBtn: { height: 65, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  startBtnText: { color: '#FFF', fontSize: 18, fontWeight: '900', marginRight: 10 }
});