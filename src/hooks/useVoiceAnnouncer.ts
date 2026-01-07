import { useState, useEffect, useCallback, useRef } from 'react';
import { InstantFineResult, formatFineForVoice } from '@/lib/calculateInstantFine';

export interface VoiceAnnouncerState {
  isSupported: boolean;
  isMuted: boolean;
  isSpeaking: boolean;
  lastAnnouncement: string | null;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
}

interface UseVoiceAnnouncerOptions {
  cooldownMs?: number; // Minimum time between announcements
  language?: string; // Preferred language (e.g., 'de-DE')
  rate?: number; // Speech rate (0.1 to 10)
  pitch?: number; // Speech pitch (0 to 2)
}

const DEFAULT_OPTIONS: UseVoiceAnnouncerOptions = {
  cooldownMs: 10000, // 10 seconds between announcements
  language: 'de-DE',
  rate: 1.0,
  pitch: 1.0,
};

// Language code mappings for voice selection
const LANGUAGE_TO_VOICE_LANG: Record<string, string[]> = {
  de: ['de-DE', 'de-AT', 'de-CH', 'de'],
  en: ['en-US', 'en-GB', 'en-AU', 'en'],
  tr: ['tr-TR', 'tr'],
  es: ['es-ES', 'es-MX', 'es'],
  fr: ['fr-FR', 'fr-CA', 'fr'],
  ru: ['ru-RU', 'ru'],
  pl: ['pl-PL', 'pl'],
  ar: ['ar-SA', 'ar-EG', 'ar'],
  ur: ['ur-PK', 'ur'],
};

/**
 * Hook for text-to-speech voice announcements
 * Announces speeding fines with cooldown to prevent spam
 */
export function useVoiceAnnouncer(options: UseVoiceAnnouncerOptions = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const [state, setState] = useState<VoiceAnnouncerState>({
    isSupported: false,
    isMuted: false,
    isSpeaking: false,
    lastAnnouncement: null,
    voices: [],
    selectedVoice: null,
  });

  const lastAnnouncementTimeRef = useRef<number>(0);
  const lastFineTierRef = useRef<number | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setState(prev => ({ ...prev, isSupported: false }));
      return;
    }

    synthRef.current = window.speechSynthesis;
    setState(prev => ({ ...prev, isSupported: true }));

    // Load voices (may be async)
    const loadVoices = () => {
      const voices = synthRef.current?.getVoices() || [];
      const preferredVoice = findBestVoice(voices, opts.language!);

      setState(prev => ({
        ...prev,
        voices,
        selectedVoice: preferredVoice,
      }));
    };

    loadVoices();

    // Chrome loads voices asynchronously
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = loadVoices;
    }

    return () => {
      // Cancel any ongoing speech
      synthRef.current?.cancel();
    };
  }, [opts.language]);

  /**
   * Find the best voice for the given language
   */
  const findBestVoice = (
    voices: SpeechSynthesisVoice[],
    language: string
  ): SpeechSynthesisVoice | null => {
    const langCode = language.split('-')[0];
    const preferredLangs = LANGUAGE_TO_VOICE_LANG[langCode] || [language];

    // Try to find a voice matching preferred languages (in order)
    for (const lang of preferredLangs) {
      const voice = voices.find(
        v => v.lang === lang || v.lang.startsWith(lang + '-')
      );
      if (voice) {
        return voice;
      }
    }

    // Fallback to any voice with matching language code
    const fallback = voices.find(v => v.lang.startsWith(langCode));
    if (fallback) {
      return fallback;
    }

    // Last resort: default voice
    return voices.find(v => v.default) || voices[0] || null;
  };

  /**
   * Speak a message
   */
  const speak = useCallback(
    (text: string) => {
      if (!synthRef.current || !state.isSupported || state.isMuted) {
        return;
      }

      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      if (state.selectedVoice) {
        utterance.voice = state.selectedVoice;
      }

      utterance.lang = opts.language!;
      utterance.rate = opts.rate!;
      utterance.pitch = opts.pitch!;

      utterance.onstart = () => {
        setState(prev => ({ ...prev, isSpeaking: true }));
      };

      utterance.onend = () => {
        setState(prev => ({ ...prev, isSpeaking: false }));
      };

      utterance.onerror = () => {
        setState(prev => ({ ...prev, isSpeaking: false }));
      };

      synthRef.current.speak(utterance);
      setState(prev => ({ ...prev, lastAnnouncement: text }));
    },
    [state.isSupported, state.isMuted, state.selectedVoice, opts.language, opts.rate, opts.pitch]
  );

  /**
   * Announce a fine result (with cooldown and tier change detection)
   */
  const announceFine = useCallback(
    (fineResult: InstantFineResult, language: string = 'de') => {
      if (!state.isSupported || state.isMuted) {
        return;
      }

      const now = Date.now();
      const timeSinceLastAnnouncement = now - lastAnnouncementTimeRef.current;

      // Check if cooldown has passed
      if (timeSinceLastAnnouncement < opts.cooldownMs!) {
        // Only announce if fine tier changed significantly
        const currentTier = fineResult.fine;
        if (lastFineTierRef.current === currentTier) {
          return; // Same tier, skip announcement
        }
      }

      // Don't announce if not speeding
      if (!fineResult.isOverLimit) {
        // Only announce once when returning to safe speed
        if (lastFineTierRef.current !== null && lastFineTierRef.current > 0) {
          // Speed is now fine after being over
          lastFineTierRef.current = 0;
          // Optionally announce that speed is okay
          // speak(language === 'de' ? 'Geschwindigkeit in Ordnung' : 'Speed is fine');
        }
        return;
      }

      // Format and announce
      const message = formatFineForVoice(fineResult, language);
      speak(message);

      lastAnnouncementTimeRef.current = now;
      lastFineTierRef.current = fineResult.fine;
    },
    [state.isSupported, state.isMuted, opts.cooldownMs, speak]
  );

  /**
   * Toggle mute state
   */
  const toggleMute = useCallback(() => {
    setState(prev => {
      const newMuted = !prev.isMuted;

      // Cancel any ongoing speech when muting
      if (newMuted && synthRef.current) {
        synthRef.current.cancel();
      }

      return { ...prev, isMuted: newMuted, isSpeaking: newMuted ? false : prev.isSpeaking };
    });
  }, []);

  /**
   * Set mute state explicitly
   */
  const setMuted = useCallback((muted: boolean) => {
    setState(prev => {
      if (muted && synthRef.current) {
        synthRef.current.cancel();
      }
      return { ...prev, isMuted: muted, isSpeaking: muted ? false : prev.isSpeaking };
    });
  }, []);

  /**
   * Select a specific voice
   */
  const selectVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setState(prev => ({ ...prev, selectedVoice: voice }));
  }, []);

  /**
   * Set language and update voice accordingly
   */
  const setLanguage = useCallback(
    (language: string) => {
      const preferredVoice = findBestVoice(state.voices, language);
      setState(prev => ({ ...prev, selectedVoice: preferredVoice }));
    },
    [state.voices]
  );

  /**
   * Cancel any ongoing speech
   */
  const cancel = useCallback(() => {
    synthRef.current?.cancel();
    setState(prev => ({ ...prev, isSpeaking: false }));
  }, []);

  /**
   * Reset the announcement cooldown (force next announcement)
   */
  const resetCooldown = useCallback(() => {
    lastAnnouncementTimeRef.current = 0;
    lastFineTierRef.current = null;
  }, []);

  return {
    ...state,
    speak,
    announceFine,
    toggleMute,
    setMuted,
    selectVoice,
    setLanguage,
    cancel,
    resetCooldown,
  };
}
