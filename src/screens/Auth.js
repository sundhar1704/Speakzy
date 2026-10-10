import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';

import Field from '../components/Field';
import Logo from '../components/Logo';
import SocialButtons from '../components/SocialButtons';
import { Button, Screen, Segmented, T } from '../components/ui';
import { EMAIL_RE, verifyLogin } from '../accounts';
import { C } from '../theme';
import { useStore } from '../store';
import { useNav } from '../nav';

// ── LOG IN page ──
export default function Auth() {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const params = nav.route.params || {};
  const [email, setEmail] = useState(params.email || '');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [wrongPw, setWrongPw] = useState(false);
  const [busy, setBusy] = useState(false);

  // --- GOOGLE AUTHENTICATION SETUP ---
  const [googleRequest, googleResponse, promptGoogleAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  // --- FACEBOOK AUTHENTICATION SETUP ---
  const [fbRequest, fbResponse, promptFbAsync] = Facebook.useAuthRequest({
    clientId: 'YOUR_FACEBOOK_APP_ID',
  });

  const enter = (user) => {
    dispatch({ type: 'login', user });
    nav.reset(state.courseId ? 'home' : 'choose');
  };

  // Handle Google Response
  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { authentication } = googleResponse;
      enter({ name: 'Google User', email: 'user@google.com', token: authentication.accessToken });
    }
  }, [googleResponse]);

  // Handle Facebook Response
  useEffect(() => {
    if (fbResponse?.type === 'success') {
      const { authentication } = fbResponse;
      enter({ name: 'Facebook User', email: 'user@facebook.com', token: authentication.accessToken });
    }
  }, [fbResponse]);

  const submit = async () => {
    if (busy) return;
    const errs = {};
    if (!EMAIL_RE.test(email.trim())) errs.email = 'Enter a valid email address.';
    if (!password) errs.password = 'Enter your password.';
    setErrors(errs);
    setWrongPw(false);
    if (Object.keys(errs).length) return;

    setBusy(true);
    const res = await verifyLogin(email, password);
    setBusy(false);
    if (res.ok) return enter(res.user);
    if (res.error === 'no-account') {
      setErrors({ email: 'No account found for this email. Tap “Sign up” to create one.' });
    } else {
      setWrongPw(true);
      setErrors({ password: 'Wrong password. Tap “Forgot Password?” to reset it.' });
    }
  };

  return (
    <Screen bg="#fff">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 20, gap: 24 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center', gap: 12 }}>
            <Logo size={72} radius={16} />
            <T w="b" s={26} c={C.navy} style={{ textAlign: 'center' }}>Welcome to Speakzy</T>
            <T s={14} c={C.muted} style={{ textAlign: 'center' }}>Sign in to Continue with Us</T>
          </View>

          <Segmented
            value="login"
            onChange={(id) => id === 'signup' && nav.replace('signup')}
            activeBg="#5E728B"
            options={[
              { id: 'login', label: 'Log in' },
              { id: 'signup', label: 'Sign up' },
            ]}
          />

          {!!params.notice && (
            <View style={{ padding: 14, borderRadius: 16, backgroundColor: '#EAF5EB' }}>
              <T w="m" s={14} c="#2E7D32" style={{ lineHeight: 20 }}>{params.notice}</T>
            </View>
          )}

          <View style={{ gap: 14 }}>
            <Field icon="mail" placeholder="Enter your Email" accessibilityLabel="Email" keyboardType="email-address" autoComplete="email" value={email} onChangeText={setEmail} error={errors.email} />
            <Field icon="lock" secure placeholder="Enter your Password" accessibilityLabel="Password" value={password} onChangeText={setPassword} onSubmitEditing={submit} error={errors.password} />

            <View style={{ alignItems: 'flex-end' }}>
              <Pressable accessibilityRole="button" accessibilityLabel="Forgot Password" onPress={() => nav.push('forgot', { email })} hitSlop={8}>
                <T w={wrongPw ? 'b' : 'm'} s={13} c="#0047BA" style={wrongPw ? { textDecorationLine: 'underline' } : null}>Forgot Password?</T>
              </Pressable>
            </View>

            <View style={{ alignItems: 'center', paddingTop: 4 }}>
              <Button title={busy ? 'Please wait…' : 'Log in'} disabled={busy} onPress={submit} style={{ width: 180, height: 46.5, borderRadius: 9999 }} />
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 4 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#CBD5E1' }} />
            <T s={13} c={C.muted}>or continue with</T>
            <View style={{ flex: 1, height: 1, backgroundColor: '#CBD5E1' }} />
          </View>

          <SocialButtons 
            onDemoLogin={enter}
            onGoogleLogin={() => promptGoogleAsync()} 
            onFacebookLogin={() => promptFbAsync()} 
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}