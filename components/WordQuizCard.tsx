import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { Word } from '@/data/germanWords';
import { ChevronDown, Volume2, CircleCheck as CheckCircle2, Circle as XCircle } from 'lucide-react-native';

type WordQuizCardProps = {
  word: Word;
  showingAnswer: boolean;
  onShowAnswer: () => void;
  onAnswer: (correct: boolean) => void;
};

export const WordQuizCard = ({ 
  word, 
  showingAnswer, 
  onShowAnswer, 
  onAnswer 
}: WordQuizCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{word.category}</Text>
        </View>
        <TouchableOpacity style={styles.speakerButton}>
          <Volume2 size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.wordContainer}>
        <Text style={styles.wordText}>{word.original}</Text>
      </View>
      
      {!showingAnswer ? (
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>Do you know what this means?</Text>
          <TouchableOpacity 
            style={styles.showAnswerButton}
            onPress={onShowAnswer}
          >
            <Text style={styles.showAnswerText}>Show Answer</Text>
            <ChevronDown size={16} color={theme.colors.gray[600]} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.answerContainer}>
          <View style={styles.translationContainer}>
            <Text style={styles.translationLabel}>Translation:</Text>
            <Text style={styles.translationText}>{word.translation}</Text>
          </View>
          
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleLabel}>Example:</Text>
            <Text style={styles.exampleText}>{word.example}</Text>
            <Text style={styles.exampleTranslation}>{word.exampleTranslation}</Text>
          </View>
          
          <View style={styles.responseButtons}>
            <TouchableOpacity 
              style={[styles.responseButton, styles.incorrectButton]}
              onPress={() => onAnswer(false)}
            >
              <XCircle size={20} color={theme.colors.white} />
              <Text style={styles.responseButtonText}>I was wrong</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.responseButton, styles.correctButton]}
              onPress={() => onAnswer(true)}
            >
              <CheckCircle2 size={20} color={theme.colors.white} />
              <Text style={styles.responseButtonText}>I knew it</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  categoryBadge: {
    backgroundColor: theme.colors.secondary + '20', // 20% opacity
    paddingVertical: 4,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.secondary,
    textTransform: 'capitalize',
  },
  speakerButton: {
    padding: theme.spacing.xs,
  },
  wordContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  wordText: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.typography.sizes.xxxl,
    color: theme.colors.gray[800],
  },
  promptContainer: {
    alignItems: 'center',
  },
  promptText: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.md,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.md,
  },
  showAnswerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  showAnswerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.md,
    color: theme.colors.gray[600],
    marginRight: theme.spacing.xs,
  },
  answerContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    paddingTop: theme.spacing.md,
  },
  translationContainer: {
    marginBottom: theme.spacing.md,
  },
  translationLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
    marginBottom: 4,
  },
  translationText: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.typography.sizes.xl,
    color: theme.colors.gray[800],
  },
  exampleContainer: {
    marginBottom: theme.spacing.lg,
  },
  exampleLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
    marginBottom: 4,
  },
  exampleText: {
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
  responseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  responseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    flex: 1,
    marginHorizontal: 4,
  },
  incorrectButton: {
    backgroundColor: theme.colors.error,
  },
  correctButton: {
    backgroundColor: theme.colors.success,
  },
  responseButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.white,
    marginLeft: 6,
  },
});