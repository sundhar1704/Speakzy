import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// CHANGED: Bumping to v2 forces the app to wipe the old dummy memory and start fresh!
const KEY = 'speakzy:v2'; 

export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const yesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d);
};

// FIXED: Set default initial progress to 0% for everything
export const SEED_PROGRESS = { vocabulary: 0, speaking: 0, grammar: 0 };
export const DAILY_GOAL = 100;
export const CHALLENGE_LESSONS = 3;
export const CHALLENGE_BONUS = 50;

export function initialState() {
  const today = dayKey();
  return {
    seenSplash: false,
    user: null,
    courseId: null,
    progress: {},
    lessonHistory: [],
    xpTotal: 0,        // FIXED: Was 50
    xpToday: 0,        // FIXED: Was 50
    xpDate: today,
    streak: 0,         // FIXED: Was 7
    lastActive: today,
    lessonsToday: 0,
    lessonsTotal: 0,
    bonusClaimed: false,
    perfectCount: 0,
    lastMode: 'vocabulary',
    settings: { sound: true, reminder: true },
  };
}

export function rollDay(s) {
  const today = dayKey();
  let next = s;
  if (s.xpDate !== today) {
    next = { ...next, xpToday: 0, lessonsToday: 0, bonusClaimed: false, xpDate: today };
  }
  if (s.lastActive !== today && s.lastActive !== yesterdayKey() && s.streak !== 0) {
    next = { ...next, streak: 0 };
  }
  return next;
}

// FIXED: Return 0 if no progress is found
export const getProgress = (state, courseId, mode) =>
  state.progress?.[courseId]?.[mode] ?? 0; 

function reducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return action.state;
    case 'splashDone':
      return { ...state, seenSplash: true };
    case 'login':
      return { ...state, user: action.user };
    case 'logout':
      return { ...state, user: null };
    case 'setCourse':
      return { ...state, courseId: action.courseId };
    case 'setSetting':
      return { ...state, settings: { ...state.settings, [action.key]: action.value } };
    case 'completeLesson': {
      const s = rollDay(state);
      const { courseId, mode, correct, total } = action;
      const today = dayKey();
      let xp = correct * 10;
      const lessonsToday = s.lessonsToday + 1;
      let bonusClaimed = s.bonusClaimed;
      
      if (!bonusClaimed && lessonsToday >= CHALLENGE_LESSONS) {
        xp += CHALLENGE_BONUS;
        bonusClaimed = true;
      }
      
      let streak = s.streak;
      if (s.lastActive !== today) {
        streak = (s.lastActive === yesterdayKey() ? s.streak : 0) + 1;
      }
      
      const prev = getProgress(s, courseId, mode);
      const progress = {
        ...s.progress,
        [courseId]: { ...(s.progress[courseId] || {}), [mode]: Math.min(100, prev + correct * 3) },
      };

      const stars = correct === total && total > 0 ? 3 : (correct >= Math.ceil(total / 2) ? 2 : 1);
      const newHistoryItem = {
        id: Date.now().toString(),
        title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Practice`,
        mode: mode,
        date: 'Today',
        stars: stars,
        xp: xp
      };
      const updatedHistory = [newHistoryItem, ...(s.lessonHistory || [])].slice(0, 50);

      return {
        ...s,
        progress,
        lessonHistory: updatedHistory,
        xpToday: s.xpToday + xp,
        xpTotal: s.xpTotal + xp,
        lessonsToday,
        lessonsTotal: s.lessonsTotal + 1,
        bonusClaimed,
        streak,
        lastActive: today,
        perfectCount: s.perfectCount + (correct === total && total > 0 ? 1 : 0),
        lastMode: mode,
      };
    }
    default:
      return state;
  }
}

async function load() {
  const base = initialState();
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw);
    return rollDay({ ...base, ...saved, settings: { ...base.settings, ...(saved.settings || {}) } });
  } catch {
    return base;
  }
}

const Ctx = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    load().then((s) => {
      if (!alive) return;
      dispatch({ type: 'hydrate', state: s });
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {});
  }, [state, ready]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  if (!ready) return null;
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore must be used inside <StoreProvider>');
  return v;
};