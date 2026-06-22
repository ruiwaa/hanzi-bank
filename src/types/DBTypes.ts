// users
export interface User {
  id: string;
  created_at: string;
  email: string;
  profile_image: string | null;
  nickname: string;
  level: number;
}

// meaning
export interface Meaning {
  en: string;
  ko: string;
}

// hsk_words
export interface HskWord {
  id: string;
  created_at: string;
  word: string;
  pinyin: string;
  pos: string[];
  meanings: Meaning[];
  hsk_level: number;
  frequency: number;
}

// word_examples
export interface WordExample {
  id: string;
  created_at: string;
  word_id: string;
  sentence: string;
  sentence_pinyin: string;
  meaning: string;
  source: string;
}

// user_words
export interface UserWord {
  id: string;
  user_id: string;
  word_id: string;
  saved_at: string;
}

// user_examples
export interface UserExample {
  id: string;
  user_id: string;
  word_id: string;
  created_at: string;
  updated_at: string;
  sentence: string;
  sentence_pinyin: string;
  meaning: string;
}
