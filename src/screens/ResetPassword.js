import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Icon from '../components/Icon';
import Field from '../components/Field';
import Logo from '../components/Logo';
import { Button, IconButton, Screen, T } from '../components/ui';
import { resetPassword } from '../accounts';
import { C } from '../theme';
import { useNav } from '../nav';

// ── PAGE 3 of the reset flow: new password + confirm password, then back to Log in ──
export default function ResetPassword() {
  const nav = useNav();
  const email = nav.route.params?.email || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (busy) return;
    const errs = {};
    if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (confirm !== password) errs.confirm = 'Passwords do not match.';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    const res = await resetPassword(email, password);
    setBusy(false);
    if (!res.ok) return setErrors({ password: 'Something went wrong. Go back and enter your email again.' });
    nav.reset('auth', { email, notice: 'Password changed. Log in with your new password.' });
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
            <T w="b" s={26} c={C.navy} style={{ textAlign: 'center' }}>New Password</T>
            <T s={14} c={C.muted} style={{ textAlign: 'center', lineHeight: 20, paddingHorizontal: 12 }}>
              Create a new password for {email}
            </T>
          </View>

          <View style={{ gap: 14 }}>
            <Field icon="lock" secure placeholder="Enter new Password" accessibilityLabel="New password" value={password} onChangeText={setPassword} error={errors.password} />
            <Field icon="lock" secure placeholder="Confirm new Password" accessibilityLabel="Confirm new password" value={confirm} onChangeText={setConfirm} onSubmitEditing={submit} error={errors.confirm} />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Button title={busy ? 'Please wait…' : 'Change password'} disabled={busy} onPress={submit} style={{ width: 200, height: 46.5, borderRadius: 9999 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
