import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import { categories } from '@/data/germanWords';
import { useUserProgress } from '@/context/UserProgressContext';
import CategoryCard from '@/components/CategoryCard';
import StreakBadge from '@/components/StreakBadge';
import { Siren as Fire } from 'lucide-react-native';

export default function LearnScreen() {
  const { streak, totalWordsLearned } = useUserProgress();
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Guten Tag!</Text>
          <Text style={styles.subtitle}>Ready to learn German?</Text>
        </View>
        <StreakBadge streak={streak} />
      </View>
      
      {/* Progress Summary */}
      <View style={styles.progressSummary}>
        <View style={styles.progressItem}>
          <Text style={styles.progressNumber}>{totalWordsLearned || 0}</Text>
          <Text style={styles.progressLabel}>Words</Text>
        </View>
        <View style={styles.progressDivider} />
        <View style={styles.progressItem}>
          <Text style={styles.progressNumber}>{streak || 0}</Text>
          <Text style={styles.progressLabel}>Day Streak</Text>
        </View>
        <View style={styles.progressDivider} />
        <View style={styles.progressItem}>
          <Text style={styles.progressNumber}>
            {String(Math.round(((totalWordsLearned || 0) / 2000) * 100) || 0)}%
          </Text>
          <Text style={styles.progressLabel}>Complete</Text>
        </View>
      </View>
      
      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView 
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  welcomeText: {
    fontFamily: theme.typography.headingFont,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.gray[800],
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.gray[500],
  },
  progressSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.gray[100],
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  progressItem: {
    flex: 1,
    alignItems: 'center',
  },
  progressNumber: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.primary,
  },
  progressLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
  },
  progressDivider: {
    width: 1,
    backgroundColor: theme.colors.gray[300],
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.gray[800],
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  categoriesContainer: {
    flex: 1,
  },
  categoriesContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
});