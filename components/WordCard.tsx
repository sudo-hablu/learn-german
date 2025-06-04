import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { Word } from '@/data/germanWords';
import { Volume2 } from 'lucide-react-native';

type WordCardProps = {
  word: Word;
};

export function WordCard({ word }: WordCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>
            {word.difficulty === 1 ? 'Easy' : word.difficulty === 2 ? 'Medium' : 'Hard'}
          </Text>
        </View>
        <TouchableOpacity style={styles.speakerButton}>
          <Volume2 size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.wordContainer}>
        <Text style={styles.germanWord}>{word.original}</Text>
        <Text style={styles.translation}>{word.translation}</Text>
      </View>
      
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleLabel}>Example:</Text>
        <Text style={styles.example}>{word.example}</Text>
        <Text style={styles.exampleTranslation}>{word.exampleTranslation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  difficultyBadge: {
    backgroundColor: theme.colors.gray[100],
    paddingVertical: 4,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  difficultyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.gray[600],
  },
  speakerButton: {
    padding: theme.spacing.xs,
  },
  wordContainer: {
    marginBottom: theme.spacing.md,
  },
  germanWord: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.gray[800],
    marginBottom: 4,
  },
  translation: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.typography.sizes.md,
    color: theme.colors.gray[600],
  },
  exampleContainer: {
    backgroundColor: theme.colors.gray[50],
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  exampleLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
    marginBottom: 4,
  },
  example: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.md,
    color: theme.colors.gray[800],
    marginBottom: 2,
  },
  exampleTranslation: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
    fontStyle: 'italic',
  },
});