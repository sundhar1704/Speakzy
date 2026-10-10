import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { C } from '../theme';
import { T } from './ui';

export default function ProgressRing({ percent = 0, size = 112, stroke = 10 }) {
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const mid = size / 2;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }} accessibilityLabel={`Daily goal ${p}% complete`}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle cx={mid} cy={mid} r={r} fill="none" stroke={C.line} strokeWidth={stroke} />
        <Circle
          cx={mid}
          cy={mid}
          r={r}
          fill="none"
          stroke={C.blue}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={c * (1 - p / 100)}
          rotation="-90"
          origin={`${mid}, ${mid}`}
        />
      </Svg>
      <T s={20} c={C.navy}>{p}%</T>
    </View>
  );
}
