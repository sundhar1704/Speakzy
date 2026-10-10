import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import { Button, IconButton, Screen, T } from '../components/ui';
import { QUESTIONS, getCourse, spokenForm } from '../data/content';
import { hashStr, shuffled } from '../data/util';
import { speak, stopSpeaking } from '../speech';
import { CHALLENGE_LESSONS, useStore } from '../store';
import { useNav } from '../nav';
import CompletionNotification from '../components/CompletionNotification';

const COLORS = {
  primaryDark: '#001A4D',
  background: '#F5F9FF',
  primaryBlue: '#2463EB',
  dangerRed: '#C92020',
  successGreen: '#43A047',
  white: '#FFFFFF',
  lightGreen: '#E8F5E9',
  lightYellow: '#FDF1CD',
  grayText: '#757575',
  grayBorder: '#E0E0E0',
};

function Prompt({ text, mode }) {
  const prefix = mode === 'speaking' ? 'Pronounce: ' : 'Complete: ';
  
  return (
    <View style={styles.promptContainer}>
      <Icon name="volume-2" size={24} color={COLORS.primaryBlue} />
      <T w="b" s={20} c="#000" style={styles.promptText}>
        {prefix} "{text}"
      </T>
    </View>
  );
}

function HintBox({ target, translation }) {
  return (
    <View style={styles.hintBox}>
      <T w="b" s={16} c="#D4A017">💡 {target} = </T>
      <T w="b" s={16} c={COLORS.dangerRed}>{translation}</T>
    </View>
  );
}

function Session({ course, mode, onRestart }) {
  const { state, dispatch } = useStore();
  const nav = useNav();
  const insets = useSafeAreaInsets();
  const questions = QUESTIONS[course.id]?.[mode] || [];
  const seed = useMemo(() => Math.floor(Math.random() * 1e9), []);

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [bonus, setBonus] = useState(false);

  useEffect(() => () => stopSpeaking(), []);

  if (!questions.length) return null;

  const q = questions[i];
  const options = useMemo(() => shuffled([q.answer, ...q.wrong], seed + hashStr(q.prompt)), [q, seed]);
  const right = picked === q.answer;
  const target = spokenForm(q.answer);

  const check = () => {
    if (picked == null || checked) return;
    setChecked(true);
    if (right) setCorrect((c) => c + 1);
    if (mode === 'speaking' && state.settings.sound) speak(target, course.speechLang);
  };

  const next = () => {
    if (done) return;
    stopSpeaking();
    if (i + 1 >= questions.length) {
      setBonus(!state.bonusClaimed && state.lessonsToday + 1 >= CHALLENGE_LESSONS);
      dispatch({ type: 'completeLesson', courseId: course.id, mode, correct, total: questions.length });
      setDone(true);
    } else {
      setI(i + 1);
      setPicked(null);
      setChecked(false);
    }
  };

  if (done) {
    const total = questions.length;
    return (
      <Screen style={{ backgroundColor: '#F5F9FF' }}>
        <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
          <CompletionNotification mode={mode} correct={correct} total={total} xp={correct * 10} bonus={bonus} />
        </View>
        <View style={{ gap: 10, paddingHorizontal: 20, paddingBottom: 16 + insets.bottom }}>
          <Button 
            title="Continue" 
            size="lg" 
            onPress={() => nav.reset('home')} 
            style={{ backgroundColor: '#001A4D', borderRadius: 12 }} 
          />
          <Button 
            variant="ghost" 
            title="Practice again" 
            left={<Icon name="refresh" size={18} color="#001A4D" />} 
            onPress={onRestart} 
          />
        </View>
      </Screen>
    );
  }

  const progress = ((i + (checked ? 1 : 0)) / questions.length) * 100;

  const getHeaderDetails = () => {
    if (mode === 'vocabulary' || mode === 'words') {
      return {
        title: 'Vocabulary Practice',
        icon: (
          <View style={styles.bookIconWrap}>
            <Icon name="book" size={36} color="#FFF" />
          </View>
        )
      };
    } else if (mode === 'grammar' || mode === 'syntax') {
      return {
        title: 'Syntax Practice',
        icon: <Icon name="star" size={80} color="#F2C94C" />
      };
    } else {
      return {
        title: 'Speaking Practice',
        icon: <Icon name="mic" size={80} color="#888" />
      };
    }
  };

  const headerMeta = getHeaderDetails();

  return (
    <Screen style={{ backgroundColor: COLORS.background }}>
      <View style={styles.header}>
        <View style={styles.backButtonWrap}>
          <IconButton label="Close lesson" onPress={nav.back}>
            <Icon name="arrow-left" size={24} color="#000" />
          </IconButton>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <T w="b" s={16} c={COLORS.grayText} style={{ minWidth: 35, textAlign: 'right' }}>
          {i + (checked ? 1 : 0)}/{questions.length}
        </T>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.logoContainer}>
          {headerMeta.icon}
          <T w="b" s={26} c="#000" style={{ marginTop: 20 }}>
            {headerMeta.title}
          </T>
        </View>

        <Prompt text={q.prompt} mode={mode} />

        <View style={styles.optionsContainer}>
          {options.map((o) => {
            const isPicked = picked === o;
            const isAnswer = o === q.answer;
            
            let cardStyle = [styles.optionCard];
            let textStyle = { color: '#000' };

            if (!checked && isPicked) { 
              cardStyle.push(styles.optionPicked); 
            }
            if (checked && isAnswer) { 
              cardStyle.push(styles.optionCorrect); 
            }
            if (checked && isPicked && !isAnswer) { 
              cardStyle.push(styles.optionWrong); 
              textStyle.color = COLORS.dangerRed; 
            }

            return (
              <Pressable
                key={o}
                accessibilityRole="radio"
                accessibilityState={{ checked: isPicked, disabled: checked }}
                disabled={checked}
                onPress={() => setPicked(o)}
                style={cardStyle}
              >
                <T w="m" s={18} style={textStyle}>{o}</T>
                {checked && isAnswer && <Icon name="check" size={24} color={COLORS.successGreen} />}
                {checked && isPicked && !isAnswer && <Icon name="x" size={24} color={COLORS.dangerRed} />}
              </Pressable>
            );
          })}
        </View>

        {mode === 'speaking' && <HintBox target={q.prompt} translation={q.answer} />}

      </ScrollView>

      <View style={[styles.bottomNav, { paddingBottom: 16 + insets.bottom }]}>
        {!checked ? (
          // GUARANTEED COLOR CHANGE FIX USING NATIVE TOUCHABLE OPACITY
          <TouchableOpacity 
            activeOpacity={0.8}
            disabled={picked == null} 
            onPress={check} 
            style={[
              styles.guaranteedButton, 
              { backgroundColor: picked != null ? COLORS.primaryBlue : '#E0E0E0' }
            ]} 
          >
            <Text style={{ 
              color: picked != null ? COLORS.white : '#9E9E9E', 
              fontSize: 18, 
              fontWeight: 'bold', 
              textAlign: 'center' 
            }}>
              Submit
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={next} 
            style={[styles.guaranteedButton, { backgroundColor: COLORS.primaryBlue }]} 
          >
            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
              {i + 1 >= questions.length ? 'Complete Lesson' : 'Next Question'}
            </Text>
          </TouchableOpacity>
        )}
        
        {checked && <Text style={styles.keepPracticing}>Keep Practicing!</Text>}
      </View>
    </Screen>
  );
}

export default function Practice({ mode = 'vocabulary' }) {
  const { state } = useStore();
  const [round, setRound] = useState(0);
  const course = getCourse(state.courseId);
  
  if (!course || !QUESTIONS[course.id]?.[mode]) return null;
  return <Session key={`${course.id}-${mode}-${round}`} course={course} mode={mode} onRestart={() => setRound((r) => r + 1)} />;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15, paddingBottom: 15 },
  backButtonWrap: { backgroundColor: COLORS.white, borderRadius: 20, padding: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  progressBarBg: { flex: 1, marginHorizontal: 15, height: 10, borderRadius: 5, backgroundColor: COLORS.grayBorder, overflow: 'hidden' },
  progressBarFill: { height: 10, borderRadius: 5, backgroundColor: COLORS.primaryDark },
  scrollContent: { padding: 20, gap: 18, paddingBottom: 40 },
  logoContainer: { alignItems: 'center', marginTop: 20, marginBottom: 10 },
  bookIconWrap: { backgroundColor: COLORS.primaryBlue, padding: 18, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  promptContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  promptText: { marginLeft: 10 },
  optionsContainer: { gap: 15 },
  optionCard: { minHeight: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 12, backgroundColor: COLORS.white, borderWidth: 2, borderColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  optionPicked: { borderColor: COLORS.successGreen, backgroundColor: COLORS.lightGreen },
  optionCorrect: { borderColor: COLORS.successGreen, backgroundColor: COLORS.lightGreen, justifyContent: 'space-between' },
  optionWrong: { borderColor: COLORS.dangerRed, backgroundColor: '#FFEBEE', justifyContent: 'space-between' },
  hintBox: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lightYellow, padding: 15, borderRadius: 10, marginTop: 20 },
  bottomNav: { paddingHorizontal: 20, paddingTop: 15, backgroundColor: 'transparent' },
  guaranteedButton: { borderRadius: 15, paddingVertical: 18, justifyContent: 'center', alignItems: 'center' },
  keepPracticing: { color: COLORS.dangerRed, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 15 },
});