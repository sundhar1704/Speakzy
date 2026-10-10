import React from 'react';
import { Pressable, ScrollView, Switch, View } from 'react-native';
import Icon from '../components/Icon';
import { IconButton, Screen, T } from '../components/ui';
import { getCourse } from '../data/content';
import { C } from '../theme';
import { useStore } from '../store';
import { useNav } from '../nav';

function Row({ icon, title, sub, right, onPress, danger, last }) {
  const Wrap = onPress ? Pressable : View;
  return (
    <Wrap
      {...(onPress ? { accessibilityRole: 'button', accessibilityLabel: title, onPress } : {})}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: last ? 0 : 1, borderBottomColor: '#F1F5F9' }}
    >
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: danger ? '#FBEAEA' : '#EAF1FF', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={22} color={danger ? C.red : C.blue} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <T w="m" s={15} c={danger ? C.red : C.ink}>{title}</T>
        {!!sub && <T s={13} c={C.muted}>{sub}</T>}
      </View>
      {right}
    </Wrap>
  );
}

const Group = ({ children }) => (
  <View style={{ backgroundColor: '#fff', borderRadius: 16, borderWidth: 0.8, borderColor: '#EAF0F8', overflow: 'hidden' }}>{children}</View>
);
const H = ({ children }) => <T w="b" s={13} c={C.muted} style={{ paddingTop: 18, paddingBottom: 6, paddingHorizontal: 4 }}>{children}</T>;

export default function Settings() {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const set = (key, value) => dispatch({ type: 'setSetting', key, value });
  const course = getCourse(state.courseId);

  const sw = (label, key) => (
    <Switch
      accessibilityLabel={label}
      value={!!state.settings[key]}
      onValueChange={(v) => set(key, v)}
      trackColor={{ false: '#CBD5E1', true: C.blue }}
      thumbColor="#fff"
    />
  );

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 8, paddingBottom: 4 }}>
        <IconButton label="Go back" onPress={nav.back}>
          <Icon name="arrowLeft" size={22} />
        </IconButton>
        <T w="b" s={22} c={C.navy}>Settings</T>
        <View style={{ width: 44 }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
        <H>Preferences</H>
        <Group>
          <Row icon="volume" title="Sound" sub="Play the answer after speaking questions" right={sw('Sound', 'sound')} />
          <Row icon="clock" title="Daily reminder" sub="Keep your streak alive" right={sw('Daily reminder', 'reminder')} last />
        </Group>

        <H>Learning</H>
        <Group>
          <Row
            icon={course?.category === 'code' ? 'code' : 'globe'}
            title="Current course"
            sub={course?.name}
            onPress={() => nav.push('choose', { fromApp: true })}
            right={<Icon name="chevronRight" size={18} color={C.muted} />}
            last
          />
        </Group>

        <H>Account</H>
        <Group>
          <Row icon="mail" title="Signed in as" sub={state.user?.email} />
          <Row
            icon="logout"
            title="Log out"
            danger
            last
            onPress={() => {
              dispatch({ type: 'logout' });
              nav.reset('auth');
            }}
          />
        </Group>
      </ScrollView>
    </Screen>
  );
}
