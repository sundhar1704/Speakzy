import React from 'react';
import { ScrollView, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import { Screen, T } from '../components/ui';
import { C } from '../theme';
import { useStore } from '../store';

const SAMPLE = [
  { name: 'Aarav', xp: 420 },
  { name: 'Lucía', xp: 365 },
  { name: 'Camille', xp: 310 },
  { name: 'Noah', xp: 190 },
];

export default function Group() {
  const { state } = useStore();
  const rows = [...SAMPLE, { name: 'You', xp: state.xpTotal, me: true }].sort((a, b) => b.xp - a.xp);
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <T w="b" s={22} c={C.navy} style={{ paddingTop: 14, paddingBottom: 8 }}>Group</T>
        <T w="b" s={13} c={C.muted} style={{ paddingTop: 10, paddingBottom: 6, paddingHorizontal: 4 }}>Weekly leaderboard</T>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, borderWidth: 0.8, borderColor: '#EAF0F8', overflow: 'hidden' }}>
          {rows.map((r, idx) => (
            <View key={r.name} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, paddingHorizontal: 16, backgroundColor: r.me ? '#EAF1FF' : '#fff', borderBottomWidth: idx === rows.length - 1 ? 0 : 1, borderBottomColor: '#F1F5F9' }}>
              <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#EEF2F7', alignItems: 'center', justifyContent: 'center' }}>
                <T w="b" s={13} c={C.navy}>{idx + 1}</T>
              </View>
              <T w="m" s={15} style={{ flex: 1 }}>{r.name}</T>
              <T w="b" s={14} c={C.navy}>{r.xp} XP</T>
            </View>
          ))}
        </View>
        <T s={13} c={C.muted} style={{ paddingTop: 12, paddingHorizontal: 4, lineHeight: 19 }}>
          Sample friends shown. Connect a backend to compete with real learners.
        </T>
      </ScrollView>
      <BottomNav />
    </Screen>
  );
}
