export type WordCategory = 
  | 'greetings'
  | 'basics'
  | 'food'
  | 'travel'
  | 'shopping'
  | 'numbers'
  | 'time'
  | 'people'
  | 'home'
  | 'work';

export type Word = {
  id: string;
  original: string;
  translation: string;
  example: string;
  exampleTranslation: string;
  category: WordCategory;
  difficulty: 1 | 2 | 3; // 1 = easy, 2 = medium, 3 = hard
};

// This is just a sample of words - in a real application, there would be 2000 words
export const germanWords: Word[] = [
  {
    id: '1',
    original: 'Hallo',
    translation: 'Hello',
    example: 'Hallo, wie geht es dir?',
    exampleTranslation: 'Hello, how are you?',
    category: 'greetings',
    difficulty: 1,
  },
  {
    id: '2',
    original: 'Tschüss',
    translation: 'Goodbye',
    example: 'Tschüss, bis morgen!',
    exampleTranslation: 'Goodbye, see you tomorrow!',
    category: 'greetings',
    difficulty: 1,
  },
  {
    id: '3',
    original: 'Danke',
    translation: 'Thank you',
    example: 'Danke für deine Hilfe.',
    exampleTranslation: 'Thank you for your help.',
    category: 'basics',
    difficulty: 1,
  },
  {
    id: '4',
    original: 'Bitte',
    translation: 'Please / You\'re welcome',
    example: 'Bitte schön!',
    exampleTranslation: 'You\'re welcome!',
    category: 'basics',
    difficulty: 1,
  },
  {
    id: '5',
    original: 'Ja',
    translation: 'Yes',
    example: 'Ja, ich verstehe.',
    exampleTranslation: 'Yes, I understand.',
    category: 'basics',
    difficulty: 1,
  },
  {
    id: '6',
    original: 'Nein',
    translation: 'No',
    example: 'Nein, das stimmt nicht.',
    exampleTranslation: 'No, that\'s not right.',
    category: 'basics',
    difficulty: 1,
  },
  {
    id: '7',
    original: 'Wasser',
    translation: 'Water',
    example: 'Ich möchte ein Glas Wasser, bitte.',
    exampleTranslation: 'I would like a glass of water, please.',
    category: 'food',
    difficulty: 1,
  },
  {
    id: '8',
    original: 'Brot',
    translation: 'Bread',
    example: 'Das Brot ist frisch gebacken.',
    exampleTranslation: 'The bread is freshly baked.',
    category: 'food',
    difficulty: 1,
  },
  {
    id: '9',
    original: 'Bahnhof',
    translation: 'Train station',
    example: 'Der Bahnhof ist nicht weit von hier.',
    exampleTranslation: 'The train station is not far from here.',
    category: 'travel',
    difficulty: 2,
  },
  {
    id: '10',
    original: 'Flughafen',
    translation: 'Airport',
    example: 'Wir fahren zum Flughafen.',
    exampleTranslation: 'We are driving to the airport.',
    category: 'travel',
    difficulty: 2,
  },
  {
    id: '11',
    original: 'Supermarkt',
    translation: 'Supermarket',
    example: 'Der Supermarkt schließt um 20 Uhr.',
    exampleTranslation: 'The supermarket closes at 8 PM.',
    category: 'shopping',
    difficulty: 2,
  },
  {
    id: '12',
    original: 'Kleidung',
    translation: 'Clothing',
    example: 'Diese Kleidung ist sehr modisch.',
    exampleTranslation: 'These clothes are very fashionable.',
    category: 'shopping',
    difficulty: 2,
  },
  {
    id: '13',
    original: 'eins',
    translation: 'one',
    example: 'Ich habe nur eins.',
    exampleTranslation: 'I have only one.',
    category: 'numbers',
    difficulty: 1,
  },
  {
    id: '14',
    original: 'zwei',
    translation: 'two',
    example: 'Ich brauche zwei Tickets.',
    exampleTranslation: 'I need two tickets.',
    category: 'numbers',
    difficulty: 1,
  },
  {
    id: '15',
    original: 'Uhr',
    translation: 'Clock/watch/o\'clock',
    example: 'Es ist drei Uhr.',
    exampleTranslation: 'It\'s three o\'clock.',
    category: 'time',
    difficulty: 1,
  },
];

export const getWordsByCategory = (category: WordCategory): Word[] => {
  return germanWords.filter(word => word.category === category);
};

export const getWordById = (id: string): Word | undefined => {
  return germanWords.find(word => word.id === id);
};

export const categories: { id: WordCategory; name: string; icon: string }[] = [
  { id: 'greetings', name: 'Greetings', icon: '👋' },
  { id: 'basics', name: 'Basics', icon: '🔤' },
  { id: 'food', name: 'Food', icon: '🍔' },
  { id: 'travel', name: 'Travel', icon: '✈️' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'numbers', name: 'Numbers', icon: '🔢' },
  { id: 'time', name: 'Time', icon: '⏰' },
  { id: 'people', name: 'People', icon: '👨‍👩‍👧‍👦' },
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'work', name: 'Work', icon: '💼' },
];