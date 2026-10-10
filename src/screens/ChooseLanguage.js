import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import Logo from '../components/Logo';
import { Button, IconButton, Screen, Segmented, T } from '../components/ui';
import { CATEGORIES, COURSES, getCourse } from '../data/content';
import { C } from '../theme';
import { useStore } from '../store';
import { useNav } from '../nav';

export default function ChooseLanguage({ fromApp = false }) {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const insets = useSafeAreaInsets();
  const current = getCourse(state.courseId);
  const [category, setCategory] = useState(current?.category || 'spoken');
  const [selected, setSelected] = useState(state.courseId);
  const list = COURSES.filter((c) => c.category === category);

  const next = () => {
    if (!selected) return;
    dispatch({ type: 'setCourse', courseId: selected });
    nav.reset('home');
  };

  return (
    <Screen>
      {fromApp && (
        <View style={{ paddingHorizontal: 12, paddingTop: 8 }}>
          <IconButton label="Go back" onPress={nav.back}>
            <Icon name="arrowLeft" size={22} />
          </IconButton>
        </View>
      )}
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', gap: 28, paddingHorizontal: 32, paddingTop: fromApp ? 12 : 40, paddingBottom: 28 + insets.bottom }} showsVerticalScrollIndicator={false}>
        <Logo size={64} radius={16} />
        <T w="b" s={24} c="#000" style={{ textAlign: 'center' }}>“ Choose Your Language ”</T>

        <View style={{ alignSelf: 'stretch' }}>
          <Segmented value={category} onChange={setCategory} options={CATEGORIES.map((c) => ({ id: c.id, label: c.label }))} />
        </View>

        <View style={{ alignSelf: 'stretch', gap: 16 }}>
          {list.map((c) => {
            const on = selected === c.id;
            return (
              <Pressable
                key={c.id}
                accessibilityRole="radio"
                accessibilityLabel={c.name}
                accessibilityState={{ checked: on }}
                onPress={() => setSelected(c.id)}
                style={{
                  height: 61.6,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 12,
                  borderWidth: 0.8,
                  borderColor: on ? '#DADDE2' : '#E8E9ED',
                  backgroundColor: on ? '#D4D5D7' : '#fff',
                }}
              >
                <T s={20} c="#000">{c.name}</T>
                {on && <Icon name="check" size={22} color="#000" strokeWidth={2.6} />}
              </Pressable>
            );
          })}
        </View>

        <View style={{ flex: 1, minHeight: 8 }} />
        <Button title="Next" onPress={next} disabled={!selected} size="lg" style={{ width: 250, maxWidth: '100%', height: 56.5 }} />
      </ScrollView>
    </Screen>
  );
}
