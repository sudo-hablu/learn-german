import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import { WordQuizCard } from '@/components/WordQuizCard';
import { germanWords } from '@/data/germanWords';
import { useUserProgress } from '@/context/UserProgressContext';
import { Award, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';

export default function PracticeScreen() {
  const { updateWordProgress } = useUserProgress();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  // Get a subset of words for the quiz
  const quizWords = germanWords.slice(0, 10);
  const currentWord = quizWords[currentWordIndex];
  
  const handleShowAnswer = () => {
    setShowingAnswer(true);
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
      updateWordProgress(currentWord.id, Math.min(100, (currentWord.difficulty * 20) + 20));
    }
    
    setAnswers([...answers, correct]);
    
    // Move to next question or complete quiz
    if (currentWordIndex < quizWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowingAnswer(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setShowingAnswer(false);
    setQuizComplete(false);
    setAnswers([]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Practice German</Text>
        <Text style={styles.headerSubtitle}>Test your knowledge</Text>
      </View>
      
      {!quizComplete ? (
        <View style={styles.quizContainer}>
          {/* Progress indicator */}
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                {width: `${((currentWordIndex) / quizWords.length) * 100}%`}
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            Question {currentWordIndex + 1} of {quizWords.length}
          </Text>
          
          {/* Quiz card */}
          <WordQuizCard 
            word={currentWord}
            showingAnswer={showingAnswer}
            onShowAnswer={handleShowAnswer}
            onAnswer={handleAnswer}
          />
        </View>
      ) : (
        <View style={styles.completedContainer}>
          <View style={styles.resultCard}>
            <Award size={48} color={theme.colors.primary} style={styles.resultIcon} />
            <Text style={styles.resultTitle}>Quiz Complete!</Text>
            <Text style={styles.resultScore}>
              You scored {score} out of {quizWords.length}
            </Text>
            
            {/* Results summary */}
            <ScrollView style={styles.resultsList}>
              {quizWords.map((word, index) => (
                <View key={word.id} style={styles.resultItem}>
                  <View style={styles.resultItemContent}>
                    <Text style={styles.resultItemWord}>{word.original}</Text>
                    <Text style={styles.resultItemTranslation}>{word.translation}</Text>
                  </View>
                  {answers[index] ? (
                    <CheckCircle size={20} color={theme.colors.success} />
                  ) : (
                    <XCircle size={20} color={theme.colors.error} />
                  )}
                </View>
              ))}
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.tryAgainButton}
              onPress={resetQuiz}
            >
              <Text style={styles.tryAgainButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    backgroundColor: theme.colors.secondary,
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
  quizContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
  progressText: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  completedContainer: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  resultCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
    alignItems: 'center',
  },
  resultIcon: {
    marginBottom: theme.spacing.md,
  },
  resultTitle: {
    fontFamily: theme.typography.headingFont,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.sm,
  },
  resultScore: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.lg,
  },
  resultsList: {
    width: '100%',
    maxHeight: 300,
    marginBottom: theme.spacing.lg,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  resultItemContent: {
    flex: 1,
  },
  resultItemWord: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.md,
    color: theme.colors.gray[800],
  },
  resultItemTranslation: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
  },
  tryAgainButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
  },
  tryAgainButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.md,
    color: theme.colors.white,
  },
});