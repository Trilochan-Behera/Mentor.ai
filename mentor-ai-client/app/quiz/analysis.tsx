import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';


export default function AnalysisScreen() {
  const [step, setStep] = useState(0);
  const [approach, setApproach] = useState('');

  const sections = [
    { 
      type: 'FAST', color: '#2E7D32', q: 'Q1, 2, 3', time: '2s avg',
      title: 'Expert Speed!', subtitle: 'You solved these in record time. Did you use a shortcut or was it a logic you already mastered?',
      prompt: 'Describe your method (e.g. Used Option elimination)'
    },
    { 
      type: 'SLOW', color: '#EF6C00', q: 'Q4, 5, 6', time: '125s avg',
      title: 'Time Leak Detected', subtitle: 'You got these right, but you took too long. Where did the calculation get stuck?',
      prompt: 'What took so much time? (e.g. Long calculation, re-reading question)'
    },
    { 
      type: 'WRONG', color: '#C62828', q: 'Q7, 8, 9', time: '45s avg',
      title: 'Conceptual Error', subtitle: 'These were incorrect. Let’s re-think the approach to get it right within 40 seconds.',
      prompt: 'What was your logic behind picking the wrong option?'
    },
    { 
      type: 'SKIP', color: '#616161', q: 'Q10', time: '10s spent',
      title: 'Why Skip?', subtitle: 'Skipping is a strategy, but only if the question is "Unsolvable" in time. Why did you skip?',
      prompt: 'Reason for skipping? (e.g. Did not know the formula, too lengthy)'
    }
  ];

  const router = useRouter();
  const { topic } = useLocalSearchParams();

    const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // FINAL CALL: Navigates to the Report Screen
      router.push({
        pathname: '/quiz/report',
        params: { topic }
      });
    }
  };

  const current = sections[step];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: current.color }]}>
        <Text style={styles.headerTitle}>{current.title}</Text>
        <Text style={styles.timeSub}>Avg Time: {current.time}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.questionList}>Questions: {current.q}</Text>
        <Text style={styles.instruction}>{current.subtitle}</Text>
        
        <TextInput 
          style={styles.input}
          placeholder={current.prompt}
          multiline
          value={approach}
          onChangeText={setApproach}
        />

        <TouchableOpacity style={[styles.aiBtn, { backgroundColor: current.color }]}>
          <Ionicons name="sparkles" size={18} color="#FFF" />
          <Text style={styles.aiBtnText}>Generate AI Improvement Plan</Text>
        </TouchableOpacity>

        <View style={styles.aiResult}>
          <Text style={styles.aiLabel}>AI STRATEGY:</Text>
          <Text style={styles.aiText}>
             {/* Dynamic Logic for AI Feedback */}
             {step === 1 ? "Since you took 125s, you likely didn't use the 'Ratio Method'. For this topic, Ratio saves 60% of calculation time compared to the Formula method." : 
              step === 3 ? "If you skipped because you 'didn't know', add this to your 'Week 2 Revision List'. Never skip due to lack of formula—memorize the 5 base cases." :
              "AI will analyze your specific approach above..."}
          </Text>
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={() => handleNextStep()}>
          <Text style={styles.nextText}>{step < 3 ? "Next: Analyze Errors" : "Finish Review"}</Text>
          <Ionicons name="arrow-forward" size={18} color="#1A237E" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { padding: 40, borderBottomRightRadius: 40 },
  headerTitle: { color: '#FFF', fontSize: 24, fontWeight: '900' },
  timeSub: { color: 'rgba(255,255,255,0.8)', fontWeight: '700', marginTop: 5 },
  content: { padding: 25 },
  questionList: { fontSize: 12, fontWeight: '900', color: '#999', textTransform: 'uppercase', marginBottom: 5 },
  instruction: { fontSize: 16, color: '#333', fontWeight: '700', lineHeight: 24, marginBottom: 20 },
  input: { backgroundColor: '#F8F9FE', borderRadius: 15, padding: 15, height: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: '#E8EAF6' },
  aiBtn: { flexDirection: 'row', padding: 18, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 15 },
  aiBtnText: { color: '#FFF', fontWeight: '800', marginLeft: 10 },
  aiResult: { backgroundColor: '#F0F2F5', padding: 20, borderRadius: 20, marginTop: 25, borderLeftWidth: 5, borderLeftColor: '#1A237E' },
  aiLabel: { fontSize: 10, fontWeight: '900', color: '#1A237E', marginBottom: 5 },
  aiText: { fontSize: 15, color: '#444', lineHeight: 22 },
  nextBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 30 },
  nextText: { fontSize: 16, fontWeight: '800', color: '#1A237E', marginRight: 8 }
});