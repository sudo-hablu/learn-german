export type Language = {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  isAvailable: boolean;
};

export const languages: Language[] = [
  {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    isAvailable: true,
  },
  {
    id: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    isAvailable: false,
  },
  {
    id: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    isAvailable: false,
  },
  {
    id: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    isAvailable: false,
  },
  {
    id: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    isAvailable: false,
  },
  {
    id: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    isAvailable: false,
  },
  {
    id: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    isAvailable: false,
  },
  {
    id: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    isAvailable: false,
  },
];

export const getLanguageById = (id: string): Language | undefined => {
  return languages.find(lang => lang.id === id);
};