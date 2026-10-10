import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNav from '../components/BottomNav';
import Icon from '../components/Icon';
import ProgressRing from '../components/ProgressRing';
import { Button, IconButton, Screen, shadow, T } from '../components/ui';
import { MODES, getCourse, modeMeta } from '../data/content';
import { C } from '../theme';
import { CHALLENGE_BONUS, CHALLENGE_LESSONS, DAILY_GOAL, useStore } from '../store';
import { useNav } from '../nav';

const MODE_ICON = { vocabulary: 'book', speaking: 'mic', grammar: 'type' };

export default function Home() {
  const { state } = useStore();
  const nav = useNav();
  const [bell, setBell] = useState(false);
  const course = getCourse(state.courseId);
  const meta = modeMeta(course);
  
  // Enforce true 0 if xpToday is missing or corrupted
  const pct = Math.min(100, Math.round(((state.xpToday || 0) / DAILY_GOAL) * 100));
  const remaining = Math.max(0, CHALLENGE_LESSONS - (state.lessonsToday || 0));

  // Dynamic Profile Check: Are we learning programming or a language?
  const courseNameStr = String(course?.name || course?.id || '').toLowerCase();
  const isProgramming = ['python', 'javascript', 'react', 'programming', 'code', 'ai'].some(kw => courseNameStr.includes(kw));

  // Dynamically swap labels if it is a programming course
  const getDynamicMeta = (modeKey) => {
    const baseMeta = meta[modeKey] || {};
    if (isProgramming) {
      if (modeKey === 'vocabulary') return { ...baseMeta, label: 'Concepts', sub: 'Learn core logic' };
      if (modeKey === 'grammar') return { ...baseMeta, label: 'Syntax', sub: 'Master the rules' };
      if (modeKey === 'speaking') return { ...baseMeta, label: 'AI Practice', sub: 'Apply generative AI' };
    }
    return baseMeta;
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12, minHeight: 72 }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Settings" onPress={() => nav.push('settings')} style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: C.navy, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="sliders" size={24} color="#fff" />
          </Pressable>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, height: 40, paddingHorizontal: 18, borderRadius: 20, backgroundColor: C.navy }}>
            <Icon name="flame" size={20} color="#FFB300" />
            <T s={14} c="#fff">{state.streak || 0}-Day Streak</T>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <IconButton label="Notifications" size={40} onPress={() => setBell((b) => !b)}>
              <Icon name="bell" size={24} />
              {!state.bonusClaimed && <View style={{ position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderRadius: 5, backgroundColor: C.red, borderWidth: 1.6, borderColor: '#fff' }} />}
            </IconButton>
            <IconButton label="Profile" bg="#E8EDF3" onPress={() => nav.reset('profile')}>
              <Icon name="user" size={24} />
            </IconButton>
          </View>
        </View>

        {bell && (
          <View style={{ marginHorizontal: 20, padding: 14, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: C.line }}>
            <T s={14} style={{ lineHeight: 20 }}>
              {state.bonusClaimed
                ? 'You’re all caught up. Nice work today!'
                : `Finish ${remaining} more lesson${remaining === 1 ? '' : 's'} to earn ${CHALLENGE_BONUS} bonus XP.`}
            </T>
          </View>
        )}

        <View style={{ gap: 16, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20 }}>
          {/* Daily goal */}
          <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: 20, borderRadius: 24, backgroundColor: '#fff', borderWidth: 0.8, borderColor: '#F1F5FB' }, shadow]}>
            <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'space-between', gap: 16 }}>
              <View>
                <T w="b" s={20}>Daily Goal</T>
                <T s={18} c={C.muted} style={{ marginTop: 4 }}>{Math.min(state.xpToday || 0, DAILY_GOAL)} / {DAILY_GOAL} XP</T>
              </View>
              <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, height: 40, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#FDF0D0' }}>
                <Icon name="bolt" size={16} color="#785112" />
                <T w="b" s={14} c="#785112">+{state.xpToday || 0} XP Today</T>
              </View>
            </View>
            <ProgressRing percent={pct} />
          </View>

          {/* Today's challenge */}
          <LinearGradient colors={[C.blue, C.navy]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 16, padding: 20, overflow: 'hidden' }}>
            <View style={{ position: 'absolute', right: -18, bottom: -34, opacity: 0.14 }}>
              <Icon name="trophy" size={144} color="#fff" strokeWidth={1.2} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Icon name="trophy" size={16} color="#DBEAFE" />
              <T w="b" s={12} c="#DBEAFE">Today's Challenge</T>
            </View>
            <T w="b" s={20} c="#fff" style={{ marginTop: 6 }}>Complete {CHALLENGE_LESSONS} Lessons</T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <T s={14} c="#EFF6FF">{state.bonusClaimed ? `${CHALLENGE_BONUS} bonus XP earned` : `Earn ${CHALLENGE_BONUS} bonus XP`}</T>
              <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: C.red, borderWidth: 0.8, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                <T s={10} c="#fff" style={{ lineHeight: 12 }}>★</T>
              </View>
              <T w="b" s={13} c="#fff" style={{ marginLeft: 'auto' }}>{Math.min(state.lessonsToday || 0, CHALLENGE_LESSONS)}/{CHALLENGE_LESSONS}</T>
            </View>
          </LinearGradient>

          <T s={20} style={{ paddingTop: 8 }}>Continue Learning</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: -8 }}>
            <Icon name={course?.category === 'code' ? 'code' : 'globe'} size={14} color={C.muted} />
            <T s={13} c={C.muted}>{course?.name}</T>
            <Pressable accessibilityRole="button" accessibilityLabel="Change course" onPress={() => nav.push('choose', { fromApp: true })} hitSlop={8}>
              <T w="m" s={13} c="#0047BA">Change</T>
            </Pressable>
          </View>

          <View style={{ gap: 14, paddingBottom: 8 }}>
            {MODES.map((m) => {
              // STRICTLY force 0% if there is no real progress logged yet
              const p = state.progress?.[course?.id]?.[m] || 0;
              const dynamicMeta = getDynamicMeta(m);

              return (
                <Pressable
                  key={m}
                  accessibilityRole="button"
                  accessibilityLabel={`${dynamicMeta.label}, ${p}% completed`}
                  onPress={() => nav.push('practice', { mode: m })}
                  style={({ pressed }) => [{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, borderRadius: 16, backgroundColor: '#fff', borderWidth: 0.8, borderColor: '#F4F8FE', opacity: pressed ? 0.9 : 1 }, shadow]}
                >
                  <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: dynamicMeta.iconBg || C.blue, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={MODE_ICON[m]} size={36} color="#fff" strokeWidth={1.8} />
                  </View>
                  <View style={{ flex: 1, gap: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <T w="b" s={18}>{dynamicMeta.label}</T>
                      <Icon name="chevronRight" size={16} color={C.muted} />
                    </View>
                    <T w="m" s={14} c={C.muted}>{dynamicMeta.sub}</T>
                    <View style={{ height: 6, borderRadius: 3, backgroundColor: C.line, overflow: 'hidden' }}>
                      <View style={{ width: `${p}%`, height: 6, borderRadius: 3, backgroundColor: dynamicMeta.bar || C.blue }} />
                    </View>
                    <T s={11} c={C.muted}>{p}% Completed</T>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Button title="Continue Lesson" size="lg" weight="r" onPress={() => nav.push('practice', { mode: state.lastMode })} />
        </View>
      </ScrollView>
      <BottomNav />
    </Screen>
  );
}