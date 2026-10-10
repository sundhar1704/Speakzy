import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import Field from '../components/Field';
import Logo from '../components/Logo';
import SocialButtons from '../components/SocialButtons';
import { Button, Screen, Segmented, T } from '../components/ui';
import { EMAIL_RE, createAccount } from '../accounts';
import { C } from '../theme';
import { useStore } from '../store';
import { useNav } from '../nav';

// ── SIGN UP page (creates the account, then logs in) ──
export default function SignUp() {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const enter = (user) => {
    dispatch({ type: 'login', user });
    nav.reset(state.courseId ? 'home' : 'choose');
  };

  const submit = async () => {
    if (busy) return;
    const errs = {};
    if (!name.trim()) errs.name = 'Enter your name.';
    if (!EMAIL_RE.test(email.trim())) errs.email = 'Enter a valid email address.';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (confirm !== password) errs.confirm = 'Passwords do not match.';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    const res = await createAccount({ name, email, password });
    setBusy(false);
    if (res.ok) return enter(res.user);
    setErrors({ email: 'An account with this email already exists. Tap “Log in” to sign in.' });
  };


  return (
    <Screen bg="#fff">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 20, gap: 24 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center', gap: 12 }}>
            <Logo size={72} radius={16} />
            <T w="b" s={26} c={C.navy} style={{ textAlign: 'center' }}>Welcome to Speakzy</T>
            <T s={14} c={C.muted} style={{ textAlign: 'center' }}>Create your account to start learning</T>
          </View>

          <Segmented
            value="signup"
            onChange={(id) => id === 'login' && nav.replace('auth')}
            activeBg="#5E728B"
            options={[
              { id: 'login', label: 'Log in' },
              { id: 'signup', label: 'Sign up' },
            ]}
          />

          <View style={{ gap: 14 }}>
            <Field icon="user" autoCapitalize="words" placeholder="Enter your Name" accessibilityLabel="Name" autoComplete="name" value={name} onChangeText={setName} error={errors.name} />
            <Field icon="mail" placeholder="Enter your Email" accessibilityLabel="Email" keyboardType="email-address" autoComplete="email" value={email} onChangeText={setEmail} error={errors.email} />
            <Field icon="lock" secure placeholder="Create a Password" accessibilityLabel="Password" value={password} onChangeText={setPassword} error={errors.password} />
            <Field icon="lock" secure placeholder="Confirm your Password" accessibilityLabel="Confirm password" value={confirm} onChangeText={setConfirm} onSubmitEditing={submit} error={errors.confirm} />

            <View style={{ alignItems: 'center', paddingTop: 8 }}>
              <Button title={busy ? 'Please wait…' : 'Sign up'} disabled={busy} onPress={submit} style={{ width: 180, height: 46.5, borderRadius: 9999 }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
              <T s={14} c={C.muted}>Already have an account?</T>
              <Pressable accessibilityRole="button" accessibilityLabel="Go to log in" onPress={() => nav.replace('auth')} hitSlop={8}>
                <T w="m" s={14} c="#0047BA">Log in</T>
              </Pressable>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 4 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#CBD5E1' }} />
            <T s={13} c={C.muted}>or continue with</T>
            <View style={{ flex: 1, height: 1, backgroundColor: '#CBD5E1' }} />
          </View>

          <SocialButtons onDemoLogin={enter} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
