import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import { useUserProgress } from '@/context/UserProgressContext';
import { categories } from '@/data/germanWords';
import StreakBadge from '@/components/StreakBadge';

export default function ProgressScreen() {
  const { streak, totalWordsLearned, categoryProgress } = useUserProgress();
  
  // Calculate total progress percentage with fallback
  const totalProgress = ((totalWordsLearned || 0) / 2000) * 100;
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Progress</Text>
        <Text style={styles.headerSubtitle}>Keep up the good work!</Text>
      </View>
      
      {/* Progress Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>German</Text>
          <StreakBadge streak={streak} />
        </View>
        
        <View style={styles.overallProgressContainer}>
          <View style={styles.progressCircleContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercentage}>{String(Math.round(totalProgress) || 0)}%</Text>
            </View>
          </View>
          
          <View style={styles.progressStatsContainer}>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatNumber}>{totalWordsLearned || 0}</Text>
              <Text style={styles.progressStatLabel}>Words Learned</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatNumber}>{String(2000 - (totalWordsLearned || 0))}</Text>
              <Text style={styles.progressStatLabel}>Words Remaining</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatNumber}>{streak || 0}</Text>
              <Text style={styles.progressStatLabel}>Day Streak</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Categories Progress */}
      <Text style={styles.sectionTitle}>Categories Progress</Text>
      
      <ScrollView style={styles.categoriesContainer}>
        {categories.map((category) => {
          const catProgress = categoryProgress.find(cp => cp.id === category.id);
          const completionPercentage = catProgress 
            ? (catProgress.completed / catProgress.total) * 100 
            : 0;
            
          return (
            <View key={category.id} style={styles.categoryItem}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>
                    {catProgress?.completed || 0} of {catProgress?.total || 0} words
                  </Text>
                </View>
              </View>
              
              <View style={styles.categoryProgressBar}>
                <View 
                  style={[
                    styles.categoryProgressFill, 
                    {width: `${String(completionPercentage || 0)}%`}
                  ]} 
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.accent,
  },
  headerTitle: {
    fontFamily: theme.typography.headingFont,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.white,
  },
  headerSubtitle: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.white,
    opacity: 0.8,
  },
  summaryCard: {
    margin: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  summaryTitle: {
    fontFamily: theme.typography.headingFont,
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.gray[800],
  },
  overallProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircleContainer: {
    marginRight: theme.spacing.lg,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.primary,
  },
  progressStatsContainer: {
    flex: 1,
  },
  progressStat: {
    marginBottom: theme.spacing.sm,
  },
  progressStatNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.md,
    color: theme.colors.gray[800],
  },
  progressStatLabel: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
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
    paddingHorizontal: theme.spacing.lg,
  },
  categoryItem: {
    marginBottom: theme.spacing.md,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  categoryName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.md,
    color: theme.colors.gray[800],
  },
  categoryCount: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
  },
  categoryProgressBar: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.full,
  },
  categoryProgressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
});