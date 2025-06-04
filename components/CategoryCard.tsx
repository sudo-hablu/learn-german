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