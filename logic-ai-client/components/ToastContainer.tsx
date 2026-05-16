import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ToastCard } from './ToastCard';
import { useToast } from '@/app/context/ToastContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <View style={styles.globalOverlay} pointerEvents="box-none">
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  globalOverlay: {
    position: 'absolute',
    top: 50, // Floating nicely below the system status bar
    right: 12, // Locked close to the right edge
    zIndex: 999999,
    alignItems: 'flex-end',
  },
});