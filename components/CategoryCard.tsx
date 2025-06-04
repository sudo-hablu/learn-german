import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { WordCategory } from '@/data/germanWords';
import { useUserProgress } from '@/context/UserProgressContext';
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

type CategoryCardProps = {
  category: {
    id: WordCategory;
    name: string;
    icon: string;
  };
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const { categoryProgress } = useUserProgress();
  const router = useRouter();
  
  // Find the progress for this category
  const progress = categoryProgress.find(c => c.id === category.id);
  const completionPercentage = progress 
    ? (progress.completed / progress.total) * 100 
    : 0;
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/(tabs)/words/${category.id}`)}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{category.name}</Text>
          <Text style={styles.subtitle}>
            {progress?.completed || 0} of {progress?.total || 0} words
          </Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              {width: `${completionPercentage}%`}
            ]} 
          />
        </View>
      </View>
      
      <ChevronRight size={20} color={theme.colors.gray[400]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  textContainer: {
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.md,
    color: theme.colors.gray[800],
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
});