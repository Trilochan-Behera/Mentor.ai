import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Toast, useToast } from '@/app/context/ToastContext';

const { width } = Dimensions.get('window');
const TOAST_WIDTH = width * 0.75; // Made smaller for a cleaner profile

export const ToastCard: React.FC<{ toast: Toast }> = ({ toast }) => {
  const { removeToast, pauseToast, resumeToast } = useToast();
  
  // Animation Nodes
  const slideAnim = useRef(new Animated.Value(width)).current; // Start completely off-screen to the right
  const progressAnim = useRef(new Animated.Value(1)).current;  // Progress goes from 1 to 0

  // Themes
  const getTypeStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success': return { border: '#4CAF50', bg: '#E8F5E9', text: '#2E7D32', icon: 'checkmark-circle' };
      case 'error': return { border: '#F44336', bg: '#FFEBEE', text: '#C62828', icon: 'alert-circle' };
      default: return { border: '#2196F3', bg: '#E3F2FD', text: '#1565C0', icon: 'information-circle' };
    }
  };

  const theme = getTypeStyles(toast.type);

  // Entrance Slide Animation
  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 40,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  // Sync Progress Bar with the internal Pause/Resume lifecycle
  useEffect(() => {
    if (toast.timerId) {
      // If timer is running, animate progress bar down to 0 over remaining time
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: toast.remainingTime,
        useNativeDriver: false, // Layout widths do not support native driver
      }).start();
    } else {
      // If paused, stop the progress bar instantly where it is
      progressAnim.stopAnimation();
    }
  }, [toast.timerId, toast.remainingTime]);

  // Interpolate the countdown value to progress width percentage
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View
      style={[
        styles.toastCard,
        {
          backgroundColor: theme.bg,
          transform: [{ translateX: slideAnim }],
        },
      ]}
      onTouchStart={() => pauseToast(toast.id)}
      onTouchEnd={() => resumeToast(toast.id)}
    >
      <View style={styles.contentContainer}>
        <Ionicons name={theme.icon as any} size={18} color={theme.border} style={styles.iconSpacing} />
        
        <Text style={[styles.messageText, { color: theme.text }]} numberOfLines={2}>
          {toast.message}
        </Text>

        <TouchableOpacity onPress={() => removeToast(toast.id)} style={styles.closeHitbox}>
          <Ionicons name="close" size={16} color="#777" />
        </TouchableOpacity>
      </View>

      {/* Animated Progress Border Line at the absolute bottom */}
      <View style={styles.progressTrack}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { 
              backgroundColor: theme.border,
              width: progressWidth 
            }
          ]} 
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastCard: {
    width: TOAST_WIDTH,
    borderRadius: 10,
    marginBottom: 8,
    overflow: 'hidden', // Ensures the bottom progress bar follows the card border radius
    backgroundColor: '#FFF',
    
    // Premium soft shadow setup
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  iconSpacing: {
    marginRight: 8,
  },
  messageText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 16,
  },
  closeHitbox: {
    padding: 2,
    marginLeft: 6,
  },
  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  progressBar: {
    height: '100%',
  },
});