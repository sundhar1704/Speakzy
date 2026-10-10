import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Icon from '../components/Icon';
import Field from '../components/Field';
import Logo from '../components/Logo';
import { Button, IconButton, Screen, T } from '../components/ui';
import { EMAIL_RE, hasAccount } from '../accounts';
import { C } from '../theme';
import { useNav } from '../nav';

// ── PAGE 2 of the reset flow: enter your email ──
export default function ForgotPassword() {
  const nav = useNav();
  const [email, setEmail] = useState(nav.route.params?.email || '');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (busy) return;
    if (!EMAIL_RE.test(email.trim())) return setError('Enter a valid email address.');
    setBusy(true);
    const exists = await hasAccount(email);
    setBusy(false);
    if (!exists) return setError('No account found for this email. Go back and tap “Sign up”.');
    setError('');
    nav.push('reset', { email: email.trim().toLowerCase() });
  };

  return (
    <Screen bg="#fff">
      <View style={{ paddingHorizontal: 12, paddingTop: 8 }}>
        <IconButton label="Go back" onPress={nav.back}>
          <Icon name="arrowLeft" size={22} />
        </IconButton>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center', gap: 12 }}>
            <Logo size={72} radius={16} />
            <T w="b" s={26} c={C.navy} style={{ textAlign: 'center' }}>Forgot Password?</T>
            <T s={14} c={C.muted} style={{ textAlign: 'center', lineHeight: 20, paddingHorizontal: 12 }}>
              Enter your email and we’ll let you set a new password.
            </T>
          </View>

          <Field icon="mail" placeholder="Enter your Email" accessibilityLabel="Email" keyboardType="email-address" autoComplete="email" value={email} onChangeText={(t) => { setEmail(t); setError(''); }} onSubmitEditing={submit} error={error} />

          <View style={{ alignItems: 'center', gap: 14 }}>
            <Button title={busy ? 'Please wait…' : 'Continue'} disabled={busy} onPress={submit} style={{ width: 180, height: 46.5, borderRadius: 9999 }} />
            <Button variant="ghost" title="Back to Log in" onPress={nav.back} style={{ width: 180, height: 46.5, borderRadius: 9999 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
