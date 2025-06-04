import React, { createContext, useContext, useState, useEffect } from 'react';
import { WordCategory } from '@/data/germanWords';

// Define progress types
type WordProgress = {
  id: string;
  mastery: number; // 0-100
  lastPracticed: Date | null;
};

type CategoryProgress = {
  id: WordCategory;
  completed: number;
  total: number;
};

type UserProgressContextType = {
  wordProgress: Record<string, WordProgress>;
  categoryProgress: CategoryProgress[];
  streak: number;
  lastActivity: Date | null;
  totalWordsLearned: number;
  updateWordProgress: (wordId: string, mastery: number) => void;
  updateStreak: () => void;
};

// Create the context
const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

// Sample initial data for development
const initialCategoryProgress: CategoryProgress[] = [
  { id: 'greetings', completed: 2, total: 10 },
  { id: 'basics', completed: 4, total: 20 },
  { id: 'food', completed: 2, total: 15 },
  { id: 'travel', completed: 0, total: 15 },
  { id: 'shopping', completed: 0, total: 15 },
  { id: 'numbers', completed: 2, total: 10 },
  { id: 'time', completed: 1, total: 10 },
  { id: 'people', completed: 0, total: 15 },
  { id: 'home', completed: 0, total: 15 },
  { id: 'work', completed: 0, total: 15 },
];

// Initial word progress
const initialWordProgress: Record<string, WordProgress> = {
  '1': { id: '1', mastery: 80, lastPracticed: new Date() },
  '2': { id: '2', mastery: 60, lastPracticed: new Date() },
  '3': { id: '3', mastery: 90, lastPracticed: new Date() },
  '4': { id: '4', mastery: 70, lastPracticed: new Date() },
  '5': { id: '5', mastery: 100, lastPracticed: new Date() },
  '6': { id: '6', mastery: 85, lastPracticed: new Date() },
  '13': { id: '13', mastery: 75, lastPracticed: new Date() },
  '14': { id: '14', mastery: 65, lastPracticed: new Date() },
  '15': { id: '15', mastery: 50, lastPracticed: new Date() },
};

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wordProgress, setWordProgress] = useState<Record<string, WordProgress>>(initialWordProgress);
  const [categoryProgress, setCategoryProgress] = useState<CategoryProgress[]>(initialCategoryProgress);
  const [streak, setStreak] = useState<number>(3);
  const [lastActivity, setLastActivity] = useState<Date | null>(new Date());
  const [totalWordsLearned, setTotalWordsLearned] = useState<number>(Object.keys(initialWordProgress).length);

  // Update word progress
  const updateWordProgress = (wordId: string, mastery: number) => {
    setWordProgress(prev => ({
      ...prev,
      [wordId]: {
        id: wordId,
        mastery,
        lastPracticed: new Date(),
      },
    }));

    // Update last activity
    setLastActivity(new Date());

    // Check if this is a newly learned word
    if (!prev[wordId] || prev[wordId].mastery === 0) {
      setTotalWordsLearned(prev => prev + 1);
    }

    // Would also update category progress here in a full implementation
  };

  // Update streak based on daily activity
  const updateStreak = () => {
    const today = new Date();
    
    if (lastActivity) {
      const lastDate = new Date(lastActivity);
      const isConsecutiveDay = 
        today.getDate() === lastDate.getDate() + 1 && 
        today.getMonth() === lastDate.getMonth() && 
        today.getFullYear() === lastDate.getFullYear();
      
      const isSameDay = 
        today.getDate() === lastDate.getDate() && 
        today.getMonth() === lastDate.getMonth() && 
        today.getFullYear() === lastDate.getFullYear();
      
      if (isConsecutiveDay) {
        setStreak(prev => prev + 1);
      } else if (!isSameDay) {
        // Reset streak if more than one day has passed
        setStreak(1);
      }
    } else {
      // First activity
      setStreak(1);
    }
    
    setLastActivity(today);
  };

  // Provide the context value
  const value = {
    wordProgress,
    categoryProgress,
    streak,
    lastActivity,
    totalWordsLearned,
    updateWordProgress,
    updateStreak,
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};

// Custom hook to use the progress context
export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};