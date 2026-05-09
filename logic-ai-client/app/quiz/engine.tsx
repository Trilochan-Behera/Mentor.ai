import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Modal, 
  Dimensions, 
  Platform 
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function QuizEngine() {
  const { topic, count, level } = useLocalSearchParams();
  const router = useRouter();

  // --- STATE ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [showPalette, setShowPalette] = useState(false);
  const [showError, setShowError] = useState(false); // For the selection warning
  
  const totalQuestions = parseInt(count as string) || 20;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // --- MOCK DATA ---
  const MOCK_QUESTIONS = Array(totalQuestions).fill(null).map((_, i) => ({
    id: i,
    text: `Practice Question #${i + 1} for ${topic}. Given the current OPSC patterns, which logic follows the sequence correctly?`,
    options: ["Linear Progression", "Exponential Variance", "Cyclical Adjustment", "Structural Deviation"],
  }));

  // --- TIMER ---
  useEffect(() => {
    const timer = setInterval(() => setTotalSeconds(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- LOGIC HANDLERS ---
  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
    setShowError(false); // Hide error if user selects something
  };

  const handleNext = () => {
    const isAnswered = answers[currentIndex] !== undefined;

    if (!isAnswered) {
      // Trigger warning if no option selected
      setShowError(true);
      setTimeout(() => setShowError(false), 2000); // Auto-hide after 2s
      return;
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/quiz/summary');
    }
  };

  const handleSkip = () => {
    setShowError(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/quiz/summary');
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = MOCK_QUESTIONS[currentIndex];
  const selectedOption = answers[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* TACTICAL ERROR TOAST (Selection Validation) */}
      {showError && (
        <Animatable.View animation="shake" style={styles.errorToast}>
          <Ionicons name="alert-circle" size={18} color="#FFF" />
          <Text style={styles.errorText}>Select an option or click SKIP</Text>
        </Animatable.View>
      )}
      
      {/* 1. TOP NAV & PROGRESS */}
      <View style={styles.topNav}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.exitBtn}>
            <Ionicons name="close" size={24} color="#1A237E" />
          </TouchableOpacity>
          
          <View style={styles.centerBadge}>
            <Ionicons name="timer-outline" size={16} color="#1A237E" />
            <Text style={styles.timerText}>{formatTime(totalSeconds)}</Text>
          </View>

          <TouchableOpacity onPress={() => setShowPalette(true)} style={styles.paletteToggle}>
            <Ionicons name="apps-outline" size={20} color="#FFF" />
            <Text style={styles.paletteLabel}>{currentIndex + 1}/{totalQuestions}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
           <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* 2. QUESTION BODY */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        <View style={styles.metaRow}>
           <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{level?.toString().toUpperCase()} MODE</Text>
           </View>
           <Text style={styles.topicBreadcrumb}>{topic}</Text>
        </View>

        <Text style={styles.questionText}>{currentQuestion.text}</Text>

        <View style={styles.optionsList}>
          {currentQuestion.options.map((option, index) => {
            const label = String.fromCharCode(65 + index); // A, B, C, D
            const isSelected = selectedOption === index;
            return (
              <TouchableOpacity 
                key={index}
                activeOpacity={0.8}
                onPress={() => handleSelectOption(index)}
                style={[styles.optionCard, isSelected && styles.selectedOptionCard]}
              >
                <View style={[styles.optionLabel, isSelected && styles.selectedLabel]}>
                  <Text style={[styles.labelText, isSelected && styles.whiteText]}>{label}</Text>
                </View>
                <Text style={[styles.optionText, isSelected && styles.whiteText]}>
                  {option}
                </Text>
                {isSelected && <Ionicons name="checkmark-circle" size={20} color="#FFF" />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* 3. TACTICAL FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={() => { setCurrentIndex(currentIndex - 1); setShowError(false); }}
          style={[styles.navBtn, currentIndex === 0 && { opacity: 0.3 }]}
          disabled={currentIndex === 0}
        >
          <Ionicons name="chevron-back" size={24} color="#1A237E" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <LinearGradient colors={["#1A237E", "#3949AB"]} style={styles.nextGradient}>
            <Text style={styles.nextText}>
                {currentIndex === totalQuestions - 1 ? "FINISH" : "NEXT"}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 4. GRID PALETTE MODAL */}
      <Modal visible={showPalette} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <Animatable.View animation="slideInUp" duration={400} style={styles.paletteDrawer}>
            <View style={styles.drawerHeader}>
               <View>
                  <Text style={styles.drawerTitle}>Session Progress</Text>
                  <Text style={styles.drawerSub}>Tap to jump to a question</Text>
               </View>
               <TouchableOpacity onPress={() => setShowPalette(false)} style={styles.closeModal}>
                  <Ionicons name="close" size={24} color="#666" />
               </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.paletteGrid} showsVerticalScrollIndicator={false}>
              {MOCK_QUESTIONS.map((_, i) => {
                const isAnswered = answers[i] !== undefined;
                const isCurrent = currentIndex === i;
                return (
                  <TouchableOpacity 
                    key={i}
                    onPress={() => { setCurrentIndex(i); setShowPalette(false); }}
                    style={[styles.gridItem, isAnswered && styles.answeredItem, isCurrent && styles.currentItem]}
                  >
                    <Text style={[styles.gridItemText, isAnswered && styles.whiteText, isCurrent && !isAnswered && { color: '#1A237E' }]}>
                      {i + 1}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animatable.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE' },
  
  // Validation Warning
  errorToast: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: '#FF5252',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 10,
    zIndex: 999
  },
  errorText: { color: '#FFF', fontWeight: '800', fontSize: 13, marginLeft: 8 },

  // Header
  topNav: { backgroundColor: '#FFF', paddingBottom: 15, elevation: 4, shadowColor: '#000', shadowOpacity: 0.05 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, marginBottom: 15 },
  exitBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F0F2F8', justifyContent: 'center', alignItems: 'center' },
  centerBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8EAF6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  timerText: { fontWeight: '800', color: '#1A237E', marginLeft: 6, fontSize: 14, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  paletteToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A237E', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  paletteLabel: { color: '#FFF', fontWeight: '800', marginLeft: 8, fontSize: 12 },
  progressContainer: { height: 4, backgroundColor: '#E0E0E0', width: '100%' },
  progressBar: { height: '100%', backgroundColor: '#1A237E' },

  // Body
  scrollBody: { padding: 25 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  levelBadge: { backgroundColor: '#FFF3E0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  levelText: { color: '#E65100', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  topicBreadcrumb: { color: '#94A3B8', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  questionText: { fontSize: 22, fontWeight: '800', color: '#1A237E', lineHeight: 30, marginBottom: 30 },
  
  optionsList: { gap: 12 },
  optionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 18, borderRadius: 20, borderWidth: 1, borderColor: '#E8EAF6', elevation: 2 },
  selectedOptionCard: { backgroundColor: '#1A237E', borderColor: '#1A237E', elevation: 8 },
  optionLabel: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#F0F2F8', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  selectedLabel: { backgroundColor: 'rgba(255,255,255,0.2)' },
  labelText: { fontWeight: '900', color: '#1A237E', fontSize: 14 },
  optionText: { flex: 1, fontSize: 16, fontWeight: '700', color: '#475569' },
  whiteText: { color: '#FFF' },

  // Footer
  footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#F0F2F8', alignItems: 'center' },
  navBtn: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#F0F2F8', justifyContent: 'center', alignItems: 'center' },
  skipBtn: { paddingHorizontal: 20 },
  skipText: { color: '#94A3B8', fontWeight: '800', letterSpacing: 1 },
  nextBtn: { borderRadius: 15, overflow: 'hidden', elevation: 4 },
  nextGradient: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, paddingVertical: 14 },
  nextText: { color: '#FFF', fontWeight: '900', fontSize: 16, marginRight: 8 },

  // Palette Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(26, 35, 126, 0.4)', justifyContent: 'flex-end' },
  paletteDrawer: { backgroundColor: '#FFF', height: height * 0.65, borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 25, elevation: 20 },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
  drawerTitle: { fontSize: 22, fontWeight: '900', color: '#1A237E' },
  drawerSub: { fontSize: 13, color: '#94A3B8', fontWeight: '600', marginTop: 4 },
  closeModal: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F0F2F8', justifyContent: 'center', alignItems: 'center' },
  paletteGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', paddingBottom: 30 },
  gridItem: { width: (width - 110) / 5, height: 50, borderRadius: 15, backgroundColor: '#F0F2F8', justifyContent: 'center', alignItems: 'center', margin: 6, borderWidth: 1, borderColor: '#E8EAF6' },
  answeredItem: { backgroundColor: '#1A237E', borderColor: '#1A237E' },
  currentItem: { borderColor: '#1A237E', borderWidth: 2, backgroundColor: '#FFF' },
  gridItemText: { fontWeight: '900', color: '#94A3B8' }
});