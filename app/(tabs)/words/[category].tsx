import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { theme } from '@/constants/theme';
import { getWordsByCategory } from '@/data/germanWords';
import { WordCard } from '@/components/WordCard';

export default function WordsScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const words = getWordsByCategory(category as any);
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: category?.charAt(0).toUpperCase() + category?.slice(1),
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.white,
          headerTitleStyle: { fontFamily: theme.typography.headingFont }
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
    backgroundColor: theme.colors.white,
  },
  listContent: {
    padding: theme.spacing.lg,
  },
});