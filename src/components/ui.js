import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, F } from '../theme';

// Text with Inter weight: w = 'r' regular | 'm' medium | 'b' bold
export function T({ w = 'r', s = 14, c = C.ink, style, children, ...rest }) {
  return (
    <Text {...rest} style={[{ fontFamily: F[w], fontSize: s, color: c }, style]}>
      {children}
    </Text>
  );
}

export function Screen({ children, bg = C.bg, style }) {
  const insets = useSafeAreaInsets();
  return <View style={[{ flex: 1, backgroundColor: bg, paddingTop: insets.top }, style]}>{children}</View>;
}

const VARIANTS = {
  primary: { bg: C.navy, fg: '#fff', border: null },
  ok: { bg: C.green, fg: '#fff', border: null },
  bad: { bg: C.red, fg: '#fff', border: null },
  ghost: { bg: '#fff', fg: C.navy, border: C.line },
  social: { bg: '#F1F4F9', fg: '#334155', border: null },
};

export function Button({ title, onPress, disabled, variant = 'primary', left, style, size = 'md', weight = 'm', accessibilityLabel }) {
  const v = VARIANTS[variant];
  const h = size === 'lg' ? 56 : size === 'sm' ? 44 : 50;
  const fs = size === 'lg' ? 16 : 15;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: h,
          borderRadius: 16,
          backgroundColor: v.bg,
          borderWidth: v.border ? 1 : 0,
          borderColor: v.border || 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 18,
          gap: 10,
          opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {left}
      <T w={weight} s={fs} c={v.fg}>{title}</T>
    </Pressable>
  );
}

export function IconButton({ children, onPress, label, size = 44, bg, style }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        { width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center', backgroundColor: bg || (pressed ? 'rgba(15,23,42,0.06)' : 'transparent') },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

export function Segmented({ options, value, onChange, activeBg = C.navy }) {
  return (
    <View style={seg.wrap} accessibilityRole="tablist">
      {options.map((o) => {
        const on = o.id === value;
        return (
          <Pressable
            key={o.id}
            accessibilityRole="tab"
            accessibilityLabel={o.label}
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o.id)}
            style={[seg.btn, on && { backgroundColor: activeBg }]}
          >
            <T w="m" s={15} c={on ? '#fff' : '#475569'}>{o.label}</T>
          </Pressable>
        );
      })}
    </View>
  );
}
const seg = StyleSheet.create({
  wrap: { flexDirection: 'row', padding: 4, borderRadius: 16, backgroundColor: '#EFF2F6' },
  btn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 12 },
});

export const shadow = {
  shadowColor: '#0F172A',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 1 },
  elevation: 1,
};
