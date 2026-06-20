import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function EnhancedQuizLoader() {
  return (
    <View style={styles.centerLoadingContainer}>
      
      {/* 1. VISUAL ENGINE STACK */}
      <View style={styles.engineWrapper}>
        
        {/* Outer Tech Pulse Ring */}
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={2000}
          style={styles.pulseRing}
        />

        {/* Orbit Rotating Core Element */}
        <Animatable.View
          animation="rotate"
          iterationCount="infinite"
          duration={2500}
          easing="linear"
          style={styles.rotationOrbital}
        >
          <View style={styles.orbitParticle} />
        </Animatable.View>

        {/* Static Center Master Icon - Swapped to Advanced Neural Networking */}
        <View style={styles.iconNode}>
          <Ionicons name="hardware-chip-outline" size={38} color="#4ADE80" />
        </View>
        
      </View>

      {/* 2. TEXT TELEMETRY METRIC LABELS */}
      <Animatable.Text
        animation="pulse"
        iterationCount="infinite"
        duration={1500}
        style={styles.loadingText}
      >
        CALIBRATING INTELLECT VECTOR
      </Animatable.Text>
      
      <Text style={styles.subLoadingText}>
        Compiling randomized state questions directly from database nodes...
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  centerLoadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#0F172A', // Premium deep obsidian background
    paddingHorizontal: 40
  },
  engineWrapper: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  pulseRing: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: 'rgba(74, 222, 128, 0.15)',
    backgroundColor: 'rgba(74, 222, 128, 0.03)',
  },
  rotationOrbital: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(74, 222, 128, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbitParticle: {
    position: 'absolute',
    top: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4ADE80',
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  iconNode: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
    elevation: 4,
    shadowColor: '#4ADE80',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  loadingText: { 
    color: '#FFF', 
    fontSize: 15, 
    fontWeight: '900', 
    letterSpacing: 3,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  subLoadingText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 18,
  }
});