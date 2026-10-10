// Text-to-speech via expo-speech (works in Expo Go).
import * as Speech from 'expo-speech';

export function speak(text, lang = 'en-US', { rate = 0.9, onError } = {}) {
  try {
    Speech.stop();
    Speech.speak(text, { language: lang, rate, onError: () => onError?.() });
    return true;
  } catch {
    onError?.();
    return false;
  }
}

export function stopSpeaking() {
  try {
    Speech.stop();
  } catch {
    /* ignore */
  }
}
