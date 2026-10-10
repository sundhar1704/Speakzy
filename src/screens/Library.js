import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import Icon from '../components/Icon';
import { Screen, T } from '../components/ui';
import { CATEGORIES, COURSES } from '../data/content';
import { C } from '../theme';
import { useStore } from '../store';
import { useNav } from '../nav';

export default function Library() {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const pick = (id) => {
    dispatch({ type: 'setCourse', courseId: id });
    nav.reset('home');
  };
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <T w="b" s={22} c={C.navy} style={{ paddingTop: 14, paddingBottom: 8 }}>Library</T>
        {CATEGORIES.map((cat) => (
          <View key={cat.id}>
            <T w="b" s={13} c={C.muted} style={{ paddingTop: 18, paddingBottom: 6, paddingHorizontal: 4 }}>{cat.label}</T>
            <View style={{ backgroundColor: '#fff', borderRadius: 16, borderWidth: 0.8, borderColor: '#EAF0F8', overflow: 'hidden' }}>
              {COURSES.filter((c) => c.category === cat.id).map((c, idx, arr) => {
                const on = c.id === state.courseId;
                return (
                  <Pressable
                    key={c.id}
                    accessibilityRole="button"
                    accessibilityLabel={c.name}
                    accessibilityState={{ selected: on }}
                    onPress={() => pick(c.id)}
                    style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, paddingHorizontal: 16, backgroundColor: pressed ? '#F7FAFF' : '#fff', borderBottomWidth: idx === arr.length - 1 ? 0 : 1, borderBottomColor: '#F1F5F9' })}
                  >
                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#EAF1FF', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={cat.id === 'code' ? 'code' : 'globe'} size={22} color={C.blue} />
                    </View>
                    <View style={{ flex: 1, gap: 2 }}>
                      <T w="m" s={15}>{c.name}</T>
                      <T s={13} c={C.muted}>{on ? 'Current course' : 'Vocabulary · Speaking · Grammar'}</T>
                    </View>
                    {on ? <Icon name="check" size={20} color={C.blue} strokeWidth={2.6} /> : <Icon name="chevronRight" size={18} color={C.muted} />}
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
      <BottomNav />
    </Screen>
  );
}
