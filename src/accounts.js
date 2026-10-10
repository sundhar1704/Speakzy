// Local accounts stored on the phone (AsyncStorage). Passwords are salted + hashed, never stored as plain text.
// This is a front-end demo: replace these 4 functions with Firebase / Supabase calls for real accounts.
import AsyncStorage from '@react-native-async-storage/async-storage';
import sha256 from './sha256';

const KEY = 'speakzy:accounts';

export const normEmail = (e) => String(e || '').trim().toLowerCase();
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function nameFromEmail(email) {
  const local = (email.split('@')[0] || 'Learner').replace(/[._-]+/g, ' ').trim();
  return local.replace(/\b\w/g, (c) => c.toUpperCase()) || 'Learner';
}

async function readAll() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const obj = raw ? JSON.parse(raw) : {};
    return obj && typeof obj === 'object' ? obj : {};
  } catch {
    return {};
  }
}
const writeAll = (obj) => AsyncStorage.setItem(KEY, JSON.stringify(obj));

const newSalt = () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 0xffffffff).toString(16)).join('');
const hash = (salt, password) => sha256(`${salt}:${password}`);

export async function hasAccount(email) {
  const all = await readAll();
  return !!all[normEmail(email)];
}

export async function createAccount({ name, email, password }) {
  const all = await readAll();
  const key = normEmail(email);
  if (all[key]) return { ok: false, error: 'exists' };
  const salt = newSalt();
  all[key] = { name: name.trim() || nameFromEmail(key), salt, hash: hash(salt, password) };
  await writeAll(all);
  return { ok: true, user: { email: key, name: all[key].name, provider: 'email' } };
}

export async function verifyLogin(email, password) {
  const all = await readAll();
  const acc = all[normEmail(email)];
  if (!acc) return { ok: false, error: 'no-account' };
  if (acc.hash !== hash(acc.salt, password)) return { ok: false, error: 'wrong-password' };
  return { ok: true, user: { email: normEmail(email), name: acc.name, provider: 'email' } };
}

export async function resetPassword(email, newPassword) {
  const all = await readAll();
  const key = normEmail(email);
  if (!all[key]) return { ok: false, error: 'no-account' };
  const salt = newSalt();
  all[key] = { ...all[key], salt, hash: hash(salt, newPassword) };
  await writeAll(all);
  return { ok: true };
}
