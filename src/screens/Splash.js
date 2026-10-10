import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import Logo from '../components/Logo';
import { Button, Screen, T } from '../components/ui';
import { C } from '../theme';
import { useStore } from '../store';
import { useNav } from '../nav';

const SLIDES = [
  { lines: ['Learn Anytime.', 'Learn Fun.'], art: 'logo' },
  { lines: ['Fun & Easy', 'Lessons'], art: 'smile' },
  { lines: ['Build Your', 'Streak'], art: 'flame' },
  { lines: ['Track Your', 'Progress'], art: 'chart' },
];

export default function Splash() {
  const [i, setI] = useState(0);
  const { dispatch } = useStore();
  const nav = useNav();
  const insets = useSafeAreaInsets();
  const last = i === SLIDES.length - 1;
  const slide = SLIDES[i];

  const finish = () => {
    dispatch({ type: 'splashDone' });
    nav.reset('auth');
  };

  return (
    <Screen>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingBottom: 24 + insets.bottom }}>
        <View style={{ height: 48, alignItems: 'flex-end', justifyContent: 'center' }}>
          {!last && (
            <Pressable accessibilityRole="button" accessibilityLabel="Skip intro" onPress={finish} hitSlop={10}>
              <T w="m" s={14} c={C.muted}>Skip</T>
            </Pressable>
          )}
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 40 }}>
          {slide.art === 'logo' ? (
            <Logo size={160} radius={24} />
          ) : (
            <View style={{ width: 160, height: 160, borderRadius: 24, backgroundColor: '#F1F4FD', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={slide.art} size={72} color={C.blue} strokeWidth={1.8} />
            </View>
          )}
          <View style={{ alignItems: 'center' }}>
            {slide.lines.map((l) => (
              <T key={l} s={26} c="#050B20" style={{ textAlign: 'center', lineHeight: 33 }}>{l}</T>
            ))}
          </View>
        </View>

        <View style={{ alignItems: 'center', gap: 20 }}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            {SLIDES.map((_, n) => (
              <View key={n} style={{ height: 8, width: n === i ? 24 : 8, borderRadius: 8, backgroundColor: n === i ? C.navy : '#CBD5E1' }} />
            ))}
          </View>
          <Button title={last ? 'Get started' : 'Next'} onPress={() => (last ? finish() : setI(i + 1))} style={{ alignSelf: 'stretch' }} />
        </View>
      </View>
    </Screen>
  );
}
