import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  SafeAreaView, 
  Dimensions,
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const ConfigModule = ({ icon, title, sub, value, onValueChange, color = '#1A237E', isLast = false }) => (
  <View style={[styles.moduleRow, isLast && { borderBottomWidth: 0 }]}>
    <View style={styles.moduleIconContainer}>
      <LinearGradient 
        colors={[`${color}20`, `${color}05`]} 
        style={styles.iconGlow}
      >
        <Ionicons name={icon} size={20} color={color} />
      </LinearGradient>
    </View>
    
    <View style={styles.moduleTextContainer}>
      <Text style={styles.moduleTitle}>{title}</Text>
      <Text style={styles.moduleSub}>{sub}</Text>
    </View>

    <Switch 
      value={value} 
      onValueChange={onValueChange}
      trackColor={{ false: "#E2E8F0", true: "#1A237E" }}
      thumbColor="#FFF"
      ios_backgroundColor="#E2E8F0"
    />
  </View>
);

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [negMark, setNegMark] = useState(true);
  const [timer, setTimer] = useState(true);
  const [faceLock, setFaceLock] = useState(true);
  const [privacyMask, setPrivacyMask] = useState(false);
  const [haptics, setHaptics] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 1. TACTICAL OVERLAY HEADER */}
        <View style={styles.headerWrapper}>
          <LinearGradient colors={['#1A237E', '#3949AB']} style={styles.headerGradient}>
            <View style={styles.headerTop}>
              <View style={styles.statusChip}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>ENCRYPTED_LINK</Text>
              </View>
              <Text style={styles.versionText}>V1.1.2</Text>
            </View>
            <Text style={styles.headerMainTitle}>System Config</Text>
            <Text style={styles.headerSubtitle}>Operative: Kanha • Command Console</Text>
          </LinearGradient>
        </View>

        {/* 2. SECURITY & BIOMETRIC PROTOCOLS */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SECURITY PROTOCOLS</Text>
          <View style={styles.glassCard}>
            <ConfigModule 
              icon="scan-outline" 
              title="FaceLock Access" 
              sub="Biometric app entry verification" 
              value={faceLock} 
              onValueChange={setFaceLock} 
              color="#6366F1"
            />
            <ConfigModule 
              icon="eye-off-outline" 
              title="Privacy Masking" 
              sub="Hide logs in app switcher" 
              value={privacyMask} 
              onValueChange={setPrivacyMask} 
              color="#1A237E"
            />
            <TouchableOpacity style={[styles.moduleRow, { borderBottomWidth: 0 }]}>
              <View style={styles.moduleIconContainer}>
                <View style={[styles.iconGlow, {backgroundColor: '#F1F5F9'}]}>
                  <Ionicons name="key-outline" size={20} color="#64748B" />
                </View>
              </View>
              <View style={styles.moduleTextContainer}>
                <Text style={styles.moduleTitle}>Auto-Lock Timeout</Text>
                <Text style={styles.moduleSub}>Lock immediately on background</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. MISSION PARAMETERS (Test Specific) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MISSION PARAMETERS</Text>
          <View style={styles.glassCard}>
            <ConfigModule 
              icon="skull-outline" 
              title="Negative Marking" 
              sub="Deduct points for inaccuracies" 
              value={negMark} 
              onValueChange={setNegMark} 
              color="#EF4444"
            />
            <ConfigModule 
              icon="timer-outline" 
              title="Tactical Timer" 
              sub="Enforce strict session limits" 
              value={timer} 
              onValueChange={setTimer} 
              color="#F59E0B"
              isLast={true}
            />
          </View>
        </View>

        {/* 4. OPERATIONAL PREFERENCES */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>OPERATIONAL PREFERENCES</Text>
          <View style={styles.glassCard}>
            <ConfigModule 
              icon="notifications-outline" 
              title="Tactical Alerts" 
              sub="Receive session reminders" 
              value={notifications} 
              onValueChange={setNotifications} 
              color="#FBC02D"
            />
            <ConfigModule 
              icon="flash-outline" 
              title="Haptic Response" 
              sub="Physical feedback on interaction" 
              value={haptics} 
              onValueChange={setHaptics} 
              color="#10B981"
            />
            <ConfigModule 
              icon="moon-outline" 
              title="Stealth Mode" 
              sub="Dark tactical interface" 
              value={isDarkMode} 
              onValueChange={setIsDarkMode} 
              color="#7B1FA2"
              isLast={true}
            />
          </View>
        </View>

        {/* 5. DATA MANAGEMENT */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SYSTEM MAINTENANCE</Text>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIconBg}><Ionicons name="cloud-download-outline" size={18} color="#1A237E" /></View>
            <Text style={styles.actionText}>Sync Operative Logs</Text>
            <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionItem, { borderBottomWidth: 0, marginBottom: 0 }]}>
            <View style={[styles.actionIconBg, { backgroundColor: '#FFEBEE' }]}><Ionicons name="trash-outline" size={18} color="#EF4444" /></View>
            <Text style={[styles.actionText, { color: '#EF4444' }]}>Purge System Cache</Text>
            <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
          </TouchableOpacity>

           {/* 6. LOGOUT */}
         <TouchableOpacity style={styles.logoutBtn}>
                  <Ionicons name="power" size={20} color="#EF4444" />
                  <Text style={styles.logoutText}>TERMINATE CURRENT SESSION</Text>
                </TouchableOpacity>
        </View>

       
        

        <Text style={styles.footerInfo}>Protocol 882-K • Kanha Secure Node • v1.1.2</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F9' },
  scrollContent: { paddingBottom: 40 },

  // Header 
  headerWrapper: { borderBottomLeftRadius: 40, borderBottomRightRadius: 40, overflow: 'hidden', elevation: 15 },
  headerGradient: { paddingHorizontal: 25, paddingTop: 50, paddingBottom: 45 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  statusChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4ADE80', marginRight: 8 },
  statusText: { color: '#FFF', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  versionText: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '800' },
  headerMainTitle: { fontSize: 28, fontWeight: '900', color: '#FFF' },
  headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '700', marginTop: 4 },

  // Sections
  section: { paddingHorizontal: 20, marginTop: 30 },
  sectionLabel: { fontSize: 11, fontWeight: '900', color: '#94A3B8', letterSpacing: 2, marginBottom: 15, marginLeft: 5 },
  
  // Glass Card Styling
  glassCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 28, 
    paddingHorizontal: 15, 
    elevation: 4, 
    shadowColor: '#1A237E', 
    shadowOpacity: 0.05,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  moduleRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  moduleIconContainer: { marginRight: 15 },
  iconGlow: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  moduleTextContainer: { flex: 1 },
  moduleTitle: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  moduleSub: { fontSize: 11, color: '#94A3B8', fontWeight: '600', marginTop: 2 },

  // Action Items
  actionItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    padding: 18, 
    borderRadius: 22, 
    marginBottom: 10, 
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  actionIconBg: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F1F3F9', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  actionText: { flex: 1, fontSize: 14, fontWeight: '700', color: '#1E293B' },

  // Logout
  logoutWrapper: { marginTop: 30, paddingHorizontal: 20 },
 logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    paddingVertical: 18,
    borderRadius: 20,
    marginTop: 10
  },
  logoutText: { 
    color: '#EF4444', 
    fontSize: 12, 
    fontWeight: '900', 
    marginLeft: 10,
    letterSpacing: 0.5
  },
  footerInfo: { textAlign: 'center', fontSize: 10, color: '#CBD5E1', marginTop: 25, fontWeight: '800' }
});