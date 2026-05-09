import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

export default function EvolutionOnboarding() {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const topics = [
    { id: '1', name: 'Quant Analysis', icon: 'stats-chart' },
    { id: '2', name: 'Logical Reasoning', icon: 'git-network' },
    { id: '3', name: 'Verbal Ability', icon: 'text' },
    { id: '4', name: 'General Awareness', icon: 'earth' },
    { id: '5', name: 'Data Interpretation', icon: 'pie-chart' },
    { id: '6', name: 'Abstract Logic', icon: 'infinite' },
  ];

  const toggleTopic = (name: string) => {
    setSelectedTopics(prev => 
      prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]
    );
  };

  const getCalibrationMessage = () => {
    if (selectedTopics.length === 0) return "Select your focus areas to begin calibration.";
    if (selectedTopics.length < 3) return "Baseline established. Add more for a deeper analysis.";
    return "Optimal data points reached. Ready for evolution.";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <Animatable.View animation="fadeIn" duration={1200} style={styles.header}>
          <Text style={styles.evolutionText}>EVOLUTION STEP 01</Text>
          <Text style={styles.title}>Map Your{"\n"}Intellect</Text>
          
          <View style={styles.messageBox}>
            <Animatable.Text 
              key={selectedTopics.length} 
              animation="fadeInLeft" 
              duration={500} 
              style={styles.messageText}
            >
              {getCalibrationMessage()}
            </Animatable.Text>
          </View>
        </Animatable.View>

        <View style={styles.grid}>
          {topics.map((item, index) => {
            const isActive = selectedTopics.includes(item.name);
            return (
              <Animatable.View 
                key={item.id} 
                animation="fadeInUp" 
                delay={index * 100}
                style={{ width: '48%', marginBottom: 15 }}
              >
                <TouchableOpacity 
                  onPress={() => toggleTopic(item.name)}
                  activeOpacity={0.9}
                  style={[styles.topicCard, isActive && styles.topicCardActive]}
                >
                  <View style={[styles.iconBox, isActive && { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                    <Ionicons 
                      name={item.icon as any} 
                      size={24} 
                      color={isActive ? '#FFF' : '#3949AB'} 
                    />
                  </View>
                  <Text style={[styles.topicName, isActive && { color: '#FFF' }]}>
                    {item.name}
                  </Text>
                  {isActive && (
                    <Ionicons name="checkmark-circle" size={20} color="#FFF" style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              </Animatable.View>
            );
          })}
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          disabled={selectedTopics.length === 0}
          onPress={() => router.push('/diagnostic')}
          style={[styles.mainBtn, selectedTopics.length === 0 && { opacity: 0.5 }]}
        >
          <LinearGradient
            colors={['#1A237E', '#3F51B5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btnGradient}
          >
            <Text style={styles.btnText}>BEGIN EVOLUTION</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { padding: 25, paddingTop: 50 },
  header: { marginBottom: 40 },
  evolutionText: { fontSize: 12, fontWeight: '800', color: '#C5CAE9', letterSpacing: 4, marginBottom: 8 },
  title: { fontSize: 40, fontWeight: '900', color: '#1A237E', lineHeight: 45 },
  
  messageBox: { 
    marginTop: 20, 
    paddingLeft: 15, 
    borderLeftWidth: 3, 
    borderLeftColor: '#3949AB' 
  },
  messageText: { fontSize: 15, color: '#5C6BC0', fontStyle: 'italic', lineHeight: 22 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  topicCard: { 
    backgroundColor: '#F5F7FF', 
    padding: 20, 
    borderRadius: 30, 
    height: 160, 
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8EAF6'
  },
  topicCardActive: { backgroundColor: '#3949AB', borderColor: '#1A237E', elevation: 10, shadowColor: '#3949AB', shadowOpacity: 0.3, shadowRadius: 10 },
  iconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  topicName: { fontSize: 16, fontWeight: '700', color: '#1A237E' },
  checkIcon: { position: 'absolute', top: 15, right: 15 },

  footer: { padding: 25, backgroundColor: '#FFF' },
  mainBtn: { height: 65, borderRadius: 20, overflow: 'hidden', elevation: 5 },
  btnGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 1, marginRight: 10 }
});