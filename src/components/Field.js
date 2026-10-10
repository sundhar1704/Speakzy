import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import Icon from './Icon';
import { T } from './ui';
import { C, F } from '../theme';

// Input box from the Figma Auth frame (+ label-free error text underneath).
export default function Field({ icon, error, secure, ...input }) {
  const [focus, setFocus] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          height: 54,
          paddingHorizontal: 16,
          backgroundColor: '#EDF2F7',
          borderRadius: 16,
          borderWidth: focus || error ? 1.5 : 0.8,
          borderColor: error ? C.red : focus ? C.blue : '#000',
        }}
      >
        <Icon name={icon} size={20} color={C.muted} />
        <TextInput
          {...input}
          secureTextEntry={secure && !show}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholderTextColor="#8E949D"
          autoCapitalize={input.autoCapitalize ?? 'none'}
          autoCorrect={false}
          style={{ flex: 1, fontFamily: F.r, fontSize: 15, color: C.ink, paddingVertical: 0 }}
        />
        {secure && (
          <Pressable accessibilityRole="button" accessibilityLabel={show ? 'Hide password' : 'Show password'} onPress={() => setShow((s) => !s)} hitSlop={8}>
            <Icon name={show ? 'eyeOff' : 'eye'} size={20} color={C.muted} />
          </Pressable>
        )}
      </View>
      {!!error && <T s={13} c={C.red} style={{ paddingTop: 6, paddingHorizontal: 4, lineHeight: 18 }}>{error}</T>}
    </View>
  );
}
