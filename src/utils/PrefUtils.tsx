import AsyncStorage from '@react-native-async-storage/async-storage';
export const KEY_LANGUAGE_ID = "languageId";
export const KEY_LANGUAGES = "languages";
export const KEY_LANGUAGE_CONTENT = "language_content";
export const getItem = (key: string) => AsyncStorage.getItem(key);
export const setItem = (key: string, value: string) => AsyncStorage.setItem(key, value);
