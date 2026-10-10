import React, { useState } from 'react';
import { View } from 'react-native';
import { AppleIcon, FacebookIcon, GoogleIcon } from './Icon';
import { Button, T } from './ui';
import { DEMO_SOCIAL_LOGIN } from '../config';
import { C } from '../theme';

// Google / Facebook / Apple buttons from the Figma Auth frame.
// Real social login needs OAuth keys + a development build (it cannot run inside Expo Go),
// so until that is set up the buttons say so instead of faking a login.
export default function SocialButtons({ onDemoLogin }) {
  const [notice, setNotice] = useState('');

  const press = (provider) => {
    if (DEMO_SOCIAL_LOGIN) {
      setNotice('');
      onDemoLogin({
        email: `${provider.toLowerCase()}.learner@speakzy.app`,
        name: `${provider} Learner`,
        provider,
      });
    } else {
      setNotice(`${provider} sign-in isn’t set up yet. Please use your email and password.`);
    }
  };

  return (
    <View style={{ gap: 12 }}>
      <Button variant="social" title="Continue with Google" left={<GoogleIcon />} onPress={() => press('Google')} style={{ height: 45, gap: 14 }} />
      <Button variant="social" title="Continue with Facebook" left={<FacebookIcon />} onPress={() => press('Facebook')} style={{ height: 45, gap: 14 }} />
      <Button variant="social" title="Continue with Apple" left={<AppleIcon />} onPress={() => press('Apple')} style={{ height: 45, gap: 14 }} />
      {!!notice && <T w="m" s={13} c={C.red} style={{ textAlign: 'center', lineHeight: 19 }}>{notice}</T>}
    </View>
  );
}
