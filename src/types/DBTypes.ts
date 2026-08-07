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
  meaning_ko: string[];
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

export interface MyWord {
  saved_at: string;
  hsk_words: Pick<HskWord, "id" | "word" | "pinyin" | "meanings" | "hsk_level">;
}

export interface MyWordResponse {
  items: MyWord[];
  totalCount: number;
  page: number;
  pageSize: number;
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
export type MySentenceWord = Pick<
  HskWord,
  "id" | "word" | "pinyin" | "meanings" | "hsk_level"
>;

export interface MySentence extends Pick<
  UserExample,
  "id" | "created_at" | "sentence" | "sentence_pinyin" | "meaning"
> {
  hsk_words: Pick<HskWord, "id" | "word" | "pinyin" | "meanings" | "hsk_level">;
}

export interface MySentenceResponse {
  items: MySentence[];
  totalCount: number;
  page: number;
  pageSize: number;
}
