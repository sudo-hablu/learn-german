import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import { languages } from '@/constants/languages';
import { Bell, Volume2, Sun, Moon, Globe, CircleHelp as HelpCircle, FileQuestion, LogOut } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const [dailyReminders, setDailyReminders] = React.useState(true);
  const [soundEffects, setSoundEffects] = React.useState(true);
  const { isDark, toggleTheme, theme: currentTheme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.white }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: currentTheme.colors.gray[100] }]}>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.gray[800] }]}>Settings</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* App Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.gray[800] }]}>App Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Bell size={20} color={currentTheme.colors.gray[600]} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: currentTheme.colors.gray[800] }]}>Daily Reminders</Text>
            </View>
            <Switch
              value={dailyReminders}
              onValueChange={setDailyReminders}
              trackColor={{ false: currentTheme.colors.gray[300], true: currentTheme.colors.primary }}
              thumbColor={currentTheme.colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Volume2 size={20} color={currentTheme.colors.gray[600]} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: currentTheme.colors.gray[800] }]}>Sound Effects</Text>
            </View>
            <Switch
              value={soundEffects}
              onValueChange={setSoundEffects}
              trackColor={{ false: currentTheme.colors.gray[300], true: currentTheme.colors.primary }}
              thumbColor={currentTheme.colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              {isDark ? (
                <Moon size={20} color={currentTheme.colors.gray[600]} style={styles.settingIcon} />
              ) : (
                <Sun size={20} color={currentTheme.colors.gray[600]} style={styles.settingIcon} />
              )}
              <Text style={[styles.settingLabel, { color: currentTheme.colors.gray[800] }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: currentTheme.colors.gray[300], true: currentTheme.colors.primary }}
              thumbColor={currentTheme.colors.white}
            />
          </View>
        </View>
        
        {/* Languages */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.gray[800] }]}>Languages</Text>
          
          <Text style={[styles.sectionSubtitle, { color: currentTheme.colors.gray[500] }]}>Current Language:</Text>
          <View style={[styles.currentLanguage, { backgroundColor: currentTheme.colors.primary + '10' }]}>
            <Text style={styles.languageFlag}>🇩🇪</Text>
            <View style={styles.languageInfo}>
              <Text style={[styles.languageName, { color: currentTheme.colors.gray[800] }]}>German</Text>
              <Text style={[styles.languageNative, { color: currentTheme.colors.gray[500] }]}>Deutsch</Text>
            </View>
          </View>
          
          <Text style={[styles.sectionSubtitle, { color: currentTheme.colors.gray[500] }]}>Available Languages:</Text>
          {languages.filter(lang => lang.id !== 'de').map(language => (
            <View 
              key={language.id} 
              style={[
                styles.languageItem, 
                !language.isAvailable && styles.languageItemDisabled
              ]}
            >
              <Text style={styles.languageFlag}>{language.flag}</Text>
              <View style={styles.languageInfo}>
                <Text style={[
                  styles.languageName,
                  { color: currentTheme.colors.gray[800] },
                  !language.isAvailable && styles.languageNameDisabled
                ]}>
                  {language.name}
                </Text>
                <Text style={[
                  styles.languageNative,
                  { color: currentTheme.colors.gray[500] },
                  !language.isAvailable && styles.languageNativeDisabled
                ]}>
                  {language.nativeName}
                </Text>
              </View>
              {!language.isAvailable && (
                <View style={styles.comingSoonBadge}>
                  <Text style={[styles.comingSoonText, { color: currentTheme.colors.gray[600] }]}>Coming Soon</Text>
                </View>
              )}
            </View>
          ))}
        </View>
        
        {/* Help & Support */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.colors.gray[800] }]}>Help & Support</Text>
          
          <TouchableOpacity style={styles.supportItem}>
            <HelpCircle size={20} color={currentTheme.colors.gray[600]} style={styles.supportIcon} />
            <Text style={[styles.supportLabel, { color: currentTheme.colors.gray[800] }]}>Help Center</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <FileQuestion size={20} color={currentTheme.colors.gray[600]} style={styles.supportIcon} />
            <Text style={[styles.supportLabel, { color: currentTheme.colors.gray[800] }]}>FAQ</Text>
          </TouchableOpacity>
        </View>
        
        {/* Account */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color={currentTheme.colors.error} style={styles.logoutIcon} />
            <Text style={[styles.logoutText, { color: currentTheme.colors.error }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: currentTheme.colors.gray[400] }]}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontFamily: theme.typography.headingFont,
    fontSize: theme.typography.sizes.xxl,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: theme.typography.sizes.lg,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  sectionSubtitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.sm,
    marginBottom: theme.spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: theme.spacing.md,
  },
  settingLabel: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.md,
  },
  currentLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  languageItemDisabled: {
    opacity: 0.7,
  },
  languageFlag: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.md,
  },
  languageNameDisabled: {
    color: theme.colors.gray[500],
  },
  languageNative: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.sm,
  },
  languageNativeDisabled: {
    color: theme.colors.gray[400],
  },
  comingSoonBadge: {
    backgroundColor: theme.colors.gray[200],
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  comingSoonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.xs,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  supportIcon: {
    marginRight: theme.spacing.md,
  },
  supportLabel: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.error,
    borderRadius: theme.borderRadius.md,
  },
  logoutIcon: {
    marginRight: theme.spacing.sm,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.md,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  versionText: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.sm,
  },
});