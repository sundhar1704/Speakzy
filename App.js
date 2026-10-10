import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { NavProvider, useNav } from './src/nav';
import { StoreProvider, useStore } from './src/store';
import { C } from './src/theme';
import Splash from './src/screens/Splash';
import Auth from './src/screens/Auth';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import ResetPassword from './src/screens/ResetPassword';
import ChooseLanguage from './src/screens/ChooseLanguage';
import Home from './src/screens/Home';
import Practice from './src/screens/Practice';
import Profile from './src/screens/Profile';
import Settings from './src/screens/Settings';
import Library from './src/screens/Library';
import Group from './src/screens/Group';

const PUBLIC = ['splash', 'auth', 'signup', 'forgot', 'reset'];
const NEEDS_COURSE = ['home', 'profile', 'group', 'library', 'practice'];

function pickInitial(state) {
  if (!state.seenSplash) return { name: 'splash', params: {} };
  if (!state.user) return { name: 'auth', params: {} };
  if (!state.courseId) return { name: 'choose', params: {} };
  return { name: 'home', params: {} };
}

function Router() {
  const nav = useNav();
  const { state } = useStore();
  const { name, params = {} } = nav.route;

  // Android hardware back button: go back inside the app, exit only from a root screen.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (nav.canGoBack) {
        nav.back();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [nav]);

  // Guards: never show a signed-in screen without a user, or a course screen without a course.
  if (!PUBLIC.includes(name) && !state.user) return <Auth />;
  if (NEEDS_COURSE.includes(name) && !state.courseId) return <ChooseLanguage />;

  switch (name) {
    case 'splash': return <Splash />;
    case 'auth': return <Auth />;
    case 'signup': return <SignUp />;
    case 'forgot': return <ForgotPassword />;
    case 'reset': return <ResetPassword />;
    case 'choose': return <ChooseLanguage fromApp={!!params.fromApp} />;
    case 'home': return <Home />;
    case 'practice': return <Practice mode={params.mode} />;
    case 'profile': return <Profile />;
    case 'settings': return <Settings />;
    case 'library': return <Library />;
    case 'group': return <Group />;
    default: return <Home />;
  }
}

function Shell() {
  const { state } = useStore();
  const [initial] = useState(() => pickInitial(state));
  return (
    <NavProvider initial={initial}>
      <Router />
    </NavProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_700Bold });
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg }}>
        <ActivityIndicator color={C.navy} />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <StoreProvider>
        <Shell />
      </StoreProvider>
    </SafeAreaProvider>
  );
}
