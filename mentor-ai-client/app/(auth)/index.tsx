import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

// --- COMPONENT: THE LOGO PULSE (REACTION NATIVE NATIVE DRIVER) ---
const NeuralPulse = () => {
  const pulseValue = new Animated.Value(1);

  useEffect(() => {
    // Rhythmic, expanding pulse loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.25, // Expand size
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1, // Contract size
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const animatedStyle = {
    transform: [{ scale: pulseValue }],
  };

  return (
    <View style={styles.logoPosition}>
      {/* Expanding Ring 1 */}
      <Animated.View
        style={[styles.pulseRing, animatedStyle, { opacity: 0.15 }]}
      />
      {/* Expanding Ring 2 (Slightly smaller, staggered) */}
      <Animated.View
        style={[
          styles.pulseRing,
          animatedStyle,
          { width: 130, height: 130, borderRadius: 65, opacity: 0.1 },
        ]}
      />

      {/* Central Hexagon Logo Box */}
      <View style={styles.coreHexagon}>
        <Text style={styles.hexText}>
          <Ionicons name="hardware-chip" size={42} color="#13f7e7" />
        </Text>
      </View>
    </View>
  );
};

// --- COMPONENT: SYSTEM BOOT STATUS LOG (ANTI-BOREDOM) ---
const StatusBootLog = () => {
  const logSteps = [
    "AI: INITIALIZING",
    "ADI_CORE: ONLINE [Protocol]",
    "MAPPING_SKILL_GEOMETRY...",
    "CALIBRATING_DECISION_ENGINE...",
    "SYSTEM_READY.",
  ];

  return (
    <View style={styles.bootLogContainer}>
      {logSteps.map((step, index) => (
        <Animatable.View
          key={index}
          animation="fadeInLeft"
          delay={500 + index * 600}
          style={styles.logRow}
        >
          <Ionicons
            name={index === logSteps.length - 1 ? "checkmark-circle" : "sync"}
            size={12}
            color={index === logSteps.length - 1 ? "#4ADE80" : "#94A3B8"}
            style={index !== logSteps.length - 1 && styles.spinningIcon} // Optional spinning logic
          />
          <Text
            style={[
              styles.logText,
              index === logSteps.length - 1 && styles.activeLog,
            ]}
          >
            {step}
          </Text>
        </Animatable.View>
      ))}
    </View>
  );
};

export default function InitializationScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkStatus = async () => {
      // We wait 4.5 seconds to let your "Generating Identity" animation finish
      setTimeout(async () => {
        try {
          const hasCompleted = await AsyncStorage.getItem(
            "hasCompletedEvolution",
          );

          if (hasCompleted !== "true") {
            // User already has an identity, go home
            router.replace("/auth");
          } else {
            // New user, send to onboarding flow
            router.replace("/onboarding");
          }
        } catch (error) {
          console.error("Error reading storage", error);
          router.replace("/onboarding"); // Fallback
        }
      }, 5000);
    };

    checkStatus();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0F172A", "#1A237E"]} style={styles.gradient}>
        {/* TOP: System Status indicator */}
        <View style={styles.statusBar}>
          <Text style={styles.statusLabel}>SECURE CONNECTION: ESTABLISHED</Text>
          <View style={styles.dot} />
        </View>

        {/* CENTER: Logo, Name, and Tagline */}
        <View style={styles.centerHub}>
          <NeuralPulse />

          <Animatable.View
            animation="fadeInUp"
            delay={800}
            style={styles.textStack}
          >
            <View style={styles.nameRow}>
              <Text style={styles.brandName}>Mentor</Text>
              <Text style={styles.brandAI}>.ai</Text>
            </View>

            {/* TAGLINE: Elite Professional feel */}
            <Text style={styles.tagline}>ADAPTIVE DECISION INTELLIGENCE</Text>
          </Animatable.View>
        </View>

        {/* BOTTOM: Simulated Boot Log (Confidence builder) */}
        <Animatable.View animation="fadeIn" delay={1500} style={styles.footer}>
          <StatusBootLog />
        </Animatable.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, paddingHorizontal: 30 },

  // Status Bar
  statusBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  statusLabel: {
    fontSize: 9,
    fontWeight: "900",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 1.5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4ADE80",
    marginLeft: 8,
  },

  // Center Hub
  centerHub: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -120,
  },

  // Logo & Pulse
  logoPosition: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  pulseRing: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#4ADE80",
    borderWidth: 2,
    borderColor: "rgba(74, 222, 128, 0.3)",
  },
  coreHexagon: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#1A237E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4ADE80",
    elevation: 20,
    shadowColor: "#4ADE80",
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  hexText: { fontSize: 36, fontWeight: "900", color: "#FFF", letterSpacing: 1 },

  // Brand Text
  textStack: { alignItems: "center" },
  nameRow: { flexDirection: "row", alignItems: "flex-end" },
  brandName: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 4,
  },
  brandAI: {
    fontSize: 24,
    fontWeight: "900",
    color: "#13f7e7",
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "800",
    marginTop: 12,
    letterSpacing: 2,
    textAlign: "center",
  },

  // Footer Boot Log
  footer: {
    position: "absolute",
    bottom: 90,
    width: "100%",
    alignItems: "center",
  },
  bootLogContainer: { width: "80%", paddingLeft: 20 },
  logRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  logText: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 12,
    letterSpacing: 1,
  },
  activeLog: { color: "#FFF", fontWeight: "900" },
  spinningIcon: { opacity: 0.6 }, // For animation extension
});
