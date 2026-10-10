import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from 'react-native-svg';

// Speakzy mark: gradient rounded square with an open book, in the pale tile used on Auth / Splash / Choose.
export default function Logo({ size = 72, radius = 16 }) {
  return (
    <View style={{ width: size, height: size, borderRadius: radius, backgroundColor: '#F1F4FD', overflow: 'hidden' }} accessibilityLabel="Speakzy">
      <Svg width={size} height={size} viewBox="0 0 72 72">
        <Defs>
          <LinearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#3FD5F0" />
            <Stop offset="1" stopColor="#2F6BFF" />
          </LinearGradient>
        </Defs>
        <Rect x="14" y="14" width="44" height="44" rx="11" fill="url(#lg)" />
        <Path d="M23.5 28.5c4.2-2.2 9.2-1.9 12.5 1.2 3.3-3.1 8.3-3.4 12.5-1.2v15c-4.2-2.2-9.2-1.9-12.5 1.2-3.3-3.1-8.3-3.4-12.5-1.2z" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        <Path d="M36 29.7v15" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </Svg>
    </View>
  );
}
