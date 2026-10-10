import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polyline, Polygon } from 'react-native-svg';

const P = {
  mail: <><Rect width="20" height="16" x="2" y="4" rx="2" /><Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
  lock: <><Rect width="18" height="11" x="3" y="11" rx="2" /><Path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  eye: <><Path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" /><Circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><Path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><Path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><Path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><Line x1="2" x2="22" y1="2" y2="22" /></>,
  mic: <><Path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><Path d="M19 10v2a7 7 0 0 1-14 0v-2" /><Line x1="12" x2="12" y1="19" y2="22" /></>,
  volume: <><Polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><Path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><Path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></>,
  flame: <Path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
  bell: <><Path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><Path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>,
  user: <><Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><Circle cx="12" cy="7" r="4" /></>,
  home: <><Path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><Polyline points="9 22 9 12 15 12 15 22" /></>,
  users: <><Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><Circle cx="9" cy="7" r="4" /><Path d="M22 21v-2a4 4 0 0 0-3-3.87" /><Path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  book: <><Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><Path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
  check: <Polyline points="20 6 9 17 4 12" />,
  x: <><Path d="M18 6 6 18" /><Path d="m6 6 12 12" /></>,
  arrowLeft: <><Path d="m12 19-7-7 7-7" /><Path d="M19 12H5" /></>,
  chevronRight: <Path d="m9 18 6-6-6-6" />,
  sliders: <><Line x1="21" x2="14" y1="4" y2="4" /><Line x1="10" x2="3" y1="4" y2="4" /><Line x1="21" x2="12" y1="12" y2="12" /><Line x1="8" x2="3" y1="12" y2="12" /><Line x1="21" x2="16" y1="20" y2="20" /><Line x1="12" x2="3" y1="20" y2="20" /><Line x1="14" x2="14" y1="2" y2="6" /><Line x1="8" x2="8" y1="10" y2="14" /><Line x1="16" x2="16" y1="18" y2="22" /></>,
  trophy: <><Path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><Path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><Path d="M4 22h16" /><Path d="M10 14.66V17c0 .55-.47.98-1.97 1.21C7.85 18.75 7 20.24 7 22" /><Path d="M14 14.66V17c0 .55.47.98 1.97 1.21C16.15 18.75 17 20.24 17 22" /><Path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>,
  star: <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  bolt: <Polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  logout: <><Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><Polyline points="16 17 21 12 16 7" /><Line x1="21" x2="9" y1="12" y2="12" /></>,
  code: <><Polyline points="16 18 22 12 16 6" /><Polyline points="8 6 2 12 8 18" /></>,
  globe: <><Circle cx="12" cy="12" r="10" /><Path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><Path d="M2 12h20" /></>,
  type: <><Polyline points="4 7 4 4 20 4 20 7" /><Line x1="9" x2="15" y1="20" y2="20" /><Line x1="12" x2="12" y1="4" y2="20" /></>,
  target: <><Circle cx="12" cy="12" r="10" /><Circle cx="12" cy="12" r="6" /><Circle cx="12" cy="12" r="2" /></>,
  award: <><Circle cx="12" cy="8" r="6" /><Path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" /></>,
  refresh: <><Path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><Path d="M3 3v5h5" /></>,
  chart: <><Line x1="12" x2="12" y1="20" y2="10" /><Line x1="18" x2="18" y1="20" y2="4" /><Line x1="6" x2="6" y1="20" y2="16" /></>,
  smile: <><Circle cx="12" cy="12" r="10" /><Path d="M8 14s1.5 2 4 2 4-2 4-2" /><Line x1="9" x2="9.01" y1="9" y2="9" /><Line x1="15" x2="15.01" y1="9" y2="9" /></>,
  clock: <><Circle cx="12" cy="12" r="10" /><Polyline points="12 6 12 12 16 14" /></>,
};

export default function Icon({ name, size = 24, color = '#0F172A', strokeWidth = 2 }) {
  const body = P[name];
  if (!body) return null;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {body}
    </Svg>
  );
}

export function GoogleIcon({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </Svg>
  );
}

export function FacebookIcon({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="11" fill="#1877F2" />
      <Path fill="#fff" d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.3-1.4 1.4-1.4h1.5V5.5c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.6v2.2H8.3V14h2.4v7z" />
    </Svg>
  );
}

export function AppleIcon({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill="#000" d="M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9s-1.9-.9-3.1-.8c-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8s1.9.8 3.2.8c1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7 0 0-2.7-1-2.7-4zM14.1 5.5c.6-.8 1.1-1.9.9-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z" />
    </Svg>
  );
}
