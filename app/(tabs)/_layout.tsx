import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Book, ChartBar as BarChart3, Trophy, Settings } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { theme: currentTheme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarInactiveTintColor: currentTheme.colors.gray[400],
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: currentTheme.colors.white,
            borderTopColor: currentTheme.colors.gray[200],
            height: 60 + insets.bottom,
            paddingBottom: 8 + insets.bottom,
          }
        ],
        tabBarLabelStyle: [
          styles.tabBarLabel,
          { color: isDark ? currentTheme.colors.gray[400] : currentTheme.colors.gray[600] }
        ],
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => (
            <Book size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, size }) => (
            <Trophy size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <BarChart3 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    borderTopWidth: 1,
  },
  tabBarLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
});