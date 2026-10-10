import React, { useState } from 'react';
import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AppleIcon, FacebookIcon, GoogleIcon } from './Icon';
import { Button, T } from './ui';
import { DEMO_SOCIAL_LOGIN } from '../config';
import { C } from '../theme';

// Required so the popup closes automatically after a successful login
WebBrowser.maybeCompleteAuthSession();

// Google / Facebook / Apple buttons from the Figma Auth frame.
export default function SocialButtons({ onDemoLogin, onGoogleLogin, onFacebookLogin }) {
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
      <Button 
        variant="social" 
        title="Continue with Google" 
        left={<GoogleIcon />} 
        onPress={() => onGoogleLogin ? onGoogleLogin() : press('Google')} 
        style={{ height: 45, gap: 14 }} 
      />
      <Button 
        variant="social" 
        title="Continue with Facebook" 
        left={<FacebookIcon />} 
        onPress={() => onFacebookLogin ? onFacebookLogin() : press('Facebook')} 
        style={{ height: 45, gap: 14 }} 
      />
      <Button 
        variant="social" 
        title="Continue with Apple" 
        left={<AppleIcon />} 
        onPress={() => press('Apple')} 
        style={{ height: 45, gap: 14 }} 
      />
      {!!notice && <T w="m" s={13} c={C.red} style={{ textAlign: 'center', lineHeight: 19 }}>{notice}</T>}
    </View>
  );
}