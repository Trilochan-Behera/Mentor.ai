import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';

export default function OnboardingTest() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const startTime = useRef(Date.now());
  const [results, setResults] = useState<any[]>([]);

  const mockQuestions = [
    { q: "If A > B and B > C, then A > C?", options: ["True", "False", "Cannot Say"], a: "True" },
    // Add more questions here
  ];

  const handleNext = (choice: string) => {
    const duration = (Date.now() - startTime.current) / 1000; // PASSIVE TIMER
    const currentData = {
      id: index,
      time: duration,
      correct: choice === mockQuestions[index].a
    };

    const updatedResults = [...results, currentData];
    setResults(updatedResults);

    if (index < mockQuestions.length - 1) {
      setIndex(index + 1);
      startTime.current = Date.now();
    } else {
      // API INTEGRATION: await uploadInitialBaseline(updatedResults)
      router.push('/onboarding/result');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>ANALYSIS IN PROGRESS: {index + 1}/{mockQuestions.length}</Text>
        <View style={styles.bar}><View style={[styles.fill, { width: `${((index + 1)/mockQuestions.length)*100}%` }]} /></View>
      </View>

      <View style={styles.questionBox}>
        <Text style={styles.qText}>{mockQuestions[index].q}</Text>
      </View>

      {mockQuestions[index].options.map((opt, i) => (
        <TouchableOpacity key={i} style={styles.option} onPress={() => handleNext(opt)}>
          <Text style={styles.optText}>{opt}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.skip} onPress={() => handleNext('SKIP')}>
        <Text style={styles.skipText}>TACTICAL SKIP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 25, paddingTop: 60 },
  header: { marginBottom: 40 },
  progress: { color: COLORS.textDim, fontSize: 10, fontWeight: '800', letterSpacing: 2, marginBottom: 15 },
  bar: { height: 4, backgroundColor: COLORS.border, borderRadius: 2 },
  fill: { height: 4, backgroundColor: COLORS.primary, borderRadius: 2 },
  questionBox: { backgroundColor: COLORS.surface, padding: 35, borderRadius: 32, marginBottom: 30, borderWidth: 1, borderColor: COLORS.border },
  qText: { color: COLORS.text, fontSize: 22, fontWeight: '600', lineHeight: 32 },
  option: { backgroundColor: 'rgba(255,255,255,0.03)', padding: 22, borderRadius: 20, marginBottom: 15, borderWidth: 1, borderColor: COLORS.border },
  optText: { color: COLORS.text, fontSize: 16, fontWeight: '500' },
  skip: { marginTop: 20, alignSelf: 'center' },
  skipText: { color: COLORS.accent, fontWeight: '900', letterSpacing: 1, fontSize: 13 }
});