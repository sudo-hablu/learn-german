import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { Flame } from 'lucide-react-native';

type StreakBadgeProps = {
  streak: number;
};

export default function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <View style={styles.container}>
      <Flame size={18} color={theme.colors.white} style={styles.flameIcon} />
      <Text style={styles.streakText}>{streak}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warning,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.sm,
  },
  flameIcon: {
    marginRight: 4,
  },
  streakText: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.typography.sizes.md,
    color: theme.colors.white,
  },
});