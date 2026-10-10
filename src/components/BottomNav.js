import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon';
import { T } from './ui';
import { C } from '../theme';
import { useNav } from '../nav';

const ITEMS = [
  { name: 'home', label: 'Home', icon: 'home' },
  { name: 'profile', label: 'Profile', icon: 'user' },
  { name: 'group', label: 'Group', icon: 'users' },
  { name: 'library', label: 'Library', icon: 'book' },
];

export default function BottomNav() {
  const nav = useNav();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 0.8, borderTopColor: '#F1F5F9', paddingTop: 10, paddingBottom: 10 + insets.bottom, paddingHorizontal: 8 }}>
      {ITEMS.map((it) => {
        const active = nav.route.name === it.name;
        const color = active ? C.ink : '#94A3B8';
        return (
          <Pressable
            key={it.name}
            accessibilityRole="button"
            accessibilityLabel={it.label}
            accessibilityState={{ selected: active }}
            onPress={() => !active && nav.reset(it.name)}
            style={{ flex: 1, alignItems: 'center', gap: 4, paddingVertical: 4 }}
          >
            <Icon name={it.icon} size={24} color={color} strokeWidth={active ? 2.4 : 2} />
            <T w={active ? 'b' : 'm'} s={12} c={color}>{it.label}</T>
          </Pressable>
        );
      })}
    </View>
  );
}
