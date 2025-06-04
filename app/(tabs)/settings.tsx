import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import { languages } from '@/constants/languages';
import { Bell, Volume2, Sun, Moon, Globe, CircleHelp as HelpCircle, FileQuestion, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const [dailyReminders, setDailyReminders] = React.useState(true);
  const [soundEffects, setSoundEffects] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* App Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Bell size={20} color={theme.colors.gray[600]} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Daily Reminders</Text>
            </View>
            <Switch
              value={dailyReminders}
              onValueChange={setDailyReminders}
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary }}
              thumbColor={theme.colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Volume2 size={20} color={theme.colors.gray[600]} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Sound Effects</Text>
            </View>
            <Switch
              value={soundEffects}
              onValueChange={setSoundEffects}
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary }}
              thumbColor={theme.colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              {darkMode ? (
                <Moon size={20} color={theme.colors.gray[600]} style={styles.settingIcon} />
              ) : (
                <Sun size={20} color={theme.colors.gray[600]} style={styles.settingIcon} />
              )}
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary }}
              thumbColor={theme.colors.white}
            />
          </View>
        </View>
        
        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          
          <Text style={styles.sectionSubtitle}>Current Language:</Text>
          <View style={styles.currentLanguage}>
            <Text style={styles.languageFlag}>🇩🇪</Text>
            <View style={styles.languageInfo}>
              <Text style={styles.languageName}>German</Text>
              <Text style={styles.languageNative}>Deutsch</Text>
            </View>
          </View>
          
          <Text style={styles.sectionSubtitle}>Available Languages:</Text>
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
                  !language.isAvailable && styles.languageNameDisabled
                ]}>
                  {language.name}
                </Text>
                <Text style={[
                  styles.languageNative,
                  !language.isAvailable && styles.languageNativeDisabled
                ]}>
                  {language.nativeName}
                </Text>
              </View>
              {!language.isAvailable && (
                <View style={styles.comingSoonBadge}>
                  <Text style={styles.comingSoonText}>Coming Soon</Text>
                </View>
              )}
            </View>
          ))}
        </View>
        
        {/* Help & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>
          
          <TouchableOpacity style={styles.supportItem}>
            <HelpCircle size={20} color={theme.colors.gray[600]} style={styles.supportIcon} />
            <Text style={styles.supportLabel}>Help Center</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportItem}>
            <FileQuestion size={20} color={theme.colors.gray[600]} style={styles.supportIcon} />
            <Text style={styles.supportLabel}>FAQ</Text>
          </TouchableOpacity>
        </View>
        
        {/* Account */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color={theme.colors.error} style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
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
    backgroundColor: theme.colors.gray[100],
  },
  headerTitle: {
    fontFamily: theme.typography.headingFont,
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.gray[800],
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
    color: theme.colors.gray[800],
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  sectionSubtitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
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
    color: theme.colors.gray[800],
  },
  currentLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary + '10', // 10% opacity
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
    color: theme.colors.gray[800],
  },
  languageNameDisabled: {
    color: theme.colors.gray[500],
  },
  languageNative: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[500],
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
    color: theme.colors.gray[600],
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
    color: theme.colors.gray[800],
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
    color: theme.colors.error,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  versionText: {
    fontFamily: theme.typography.bodyFont,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[400],
  },
});