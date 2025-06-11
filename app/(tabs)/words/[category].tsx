import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { getWordsByCategory } from '@/data/germanWords';
import { WordCard } from '@/components/WordCard';
import { useTheme } from '@/context/ThemeContext';

export default function WordsScreen() {
  const router = useRouter();
  const { theme: currentTheme } = useTheme();
  const category = router.params?.category as string;
  const words = getWordsByCategory(category as any);
  
  // Create a safe title that handles undefined category
  const getTitle = (category: string | undefined): string => {
    if (!category || typeof category !== 'string') {
      return 'Words';
    }
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.white }]}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: getTitle(category),
          headerStyle: { backgroundColor: currentTheme.colors.primary },
          headerTintColor: currentTheme.colors.white,
          headerTitleStyle: { fontFamily: theme.typography.headingFont },
          headerLeft: () => null,
        }} 
      />
      
      <FlatList
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WordCard word={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: theme.spacing.lg,
  },
});