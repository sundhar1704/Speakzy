import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import BottomNav from '../components/BottomNav';
import Icon from '../components/Icon';
import { IconButton, Screen, shadow, T } from '../components/ui';
import { useStore } from '../store';
import { useNav } from '../nav';
import { getCourse } from '../data/content'; // <-- ADDED: Needed to check course category

const COLORS = {
  primaryDark: '#001A4D',
  background: '#F5F9FF',
  primaryBlue: '#2463EB',
  dangerRed: '#C92020',
  successGreen: '#43A047',
  white: '#FFFFFF',
  grayText: '#757575',
};

export default function Profile() {
  const { state } = useStore();
  const nav = useNav();
  
  // 1. Get the current course to know if it's programming or language
  const course = getCourse(state.courseId);
  const courseIdStr = String(state.courseId || '').toLowerCase();
  
  // 2. Safely check if the category is 'code' or matches programming keywords
  const isProgramming = course?.category === 'code' || ['python', 'javascript', 'react', 'programming', 'code', 'ai'].some(kw => courseIdStr.includes(kw));

  const name = state.user?.name || (isProgramming ? 'Python Developer' : 'Language Learner');
  
  const [activeFilter, setActiveFilter] = useState(null);

  // 3. Dynamic Badges: Fully split between Programming and Language
  const badges = isProgramming ? [
    { id: 'first', icon: 'check-circle', title: 'First Steps', on: state.lessonsTotal >= 1, color: '#A5D6A7' },
    { id: 'fire', icon: 'flame', title: 'Week Warrior', on: state.streak >= 7, color: '#EF9A9A' },
    { id: 'vocabulary', icon: 'book', title: 'Concept Master', on: state.xpTotal >= 100, color: '#90CAF9' },
    { id: 'grammar', icon: 'code', title: 'Syntax Guru', on: state.lessonsTotal >= 3, color: '#FFF59D' }, // FIXED: Now unlocks after 3 lessons
    { id: 'speaking', icon: 'cpu', title: 'AI Star', on: state.lessonsTotal >= 5, color: '#CE93D8' }, // FIXED: Now unlocks after 5 lessons
    { id: 'perfect', icon: 'award', title: 'Perfect Score', on: state.perfectCount >= 1, color: '#A5D6A7' },
  ] : [
    { id: 'first', icon: 'check-circle', title: 'First Steps', on: state.lessonsTotal >= 1, color: '#A5D6A7' },
    { id: 'fire', icon: 'flame', title: 'Week Warrior', on: state.streak >= 7, color: '#EF9A9A' },
    { id: 'vocabulary', icon: 'book', title: 'Word Master', on: state.xpTotal >= 100, color: '#90CAF9' },
    { id: 'grammar', icon: 'star', title: 'Grammar Guru', on: state.lessonsTotal >= 3, color: '#FFF59D' }, // FIXED
    { id: 'speaking', icon: 'mic', title: 'Speaking Star', on: state.lessonsTotal >= 5, color: '#CE93D8' }, // FIXED
    { id: 'perfect', icon: 'award', title: 'Perfect Score', on: state.perfectCount >= 1, color: '#A5D6A7' },
  ];

  const allCompletedLessons = state.lessonHistory || [];

  const displayedLessons = allCompletedLessons.filter(lesson => {
    if (!activeFilter) return true; 
    if (activeFilter === 'perfect') return lesson.stars === 3;
    if (activeFilter === 'vocabulary') return lesson.mode === 'vocabulary' || lesson.mode === 'words';
    if (activeFilter === 'grammar') return lesson.mode === 'grammar' || lesson.mode === 'syntax';
    if (activeFilter === 'speaking') return lesson.mode === 'speaking' || lesson.mode === 'speak';
    return true;
  });

  const handleTrophyClick = (trophyId) => {
    setActiveFilter(activeFilter === trophyId ? null : trophyId);
  };

  const getLessonsTitle = () => {
    if (activeFilter === 'perfect') return 'Perfect Lessons (3 Stars)';
    if (activeFilter === 'vocabulary') return isProgramming ? 'Concept Lessons' : 'Vocabulary Lessons';
    if (activeFilter === 'grammar') return isProgramming ? 'Syntax Lessons' : 'Grammar Lessons';
    if (activeFilter === 'speaking') return isProgramming ? 'AI Applied Lessons' : 'Speaking Lessons';
    return 'Completed Lessons';
  };

  const formatLessonTitle = (mode) => {
    if (isProgramming) {
      if (mode === 'vocabulary' || mode === 'words') return 'Concepts Practice';
      if (mode === 'grammar' || mode === 'syntax') return 'Syntax Practice';
      if (mode === 'speaking') return 'AI Application Practice';
    } else {
      if (mode === 'vocabulary' || mode === 'words') return 'Vocabulary Practice';
      if (mode === 'grammar' || mode === 'syntax') return 'Grammar Practice';
      if (mode === 'speaking') return 'Speaking Practice';
    }
    return `${mode.charAt(0).toUpperCase() + mode.slice(1)} Practice`;
  };

  const level = Math.floor(state.xpTotal / 500) + 1;
  const currentLevelXP = state.xpTotal % 500;
  const xpToNext = 500 - currentLevelXP;
  const progressPercent = (currentLevelXP / 500) * 100;

  return (
    <Screen style={{ backgroundColor: COLORS.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        <View style={styles.header}>
          <IconButton label="Back" onPress={nav.back}>
            <Icon name="arrow-left" size={24} color="#000" />
          </IconButton>
          <T w="b" s={20} c="#000">Profile & Achievements</T>
          <View style={styles.headerActions}>
            <IconButton label="Notifications" onPress={() => {}}>
              <Icon name="bell" size={24} color={COLORS.grayText} />
            </IconButton>
            <IconButton label="Settings" onPress={() => nav.push('settings')}>
              <Icon name="settings" size={24} color={COLORS.grayText} />
            </IconButton>
          </View>
        </View>

        <View style={[styles.profileCard, shadow]}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Icon name="user" size={32} color={COLORS.white} />
            </View>
            <View style={{ flex: 1 }}>
              <T w="b" s={22} c="#000">{name}</T>
              <View style={styles.levelBadge}>
                <Icon name="award" size={16} color="#FBC02D" />
                <T w="b" s={14} c={COLORS.grayText} style={{ marginLeft: 4 }}>Level {level}</T>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: '#FFF9C4' }]}>
              <Icon name="star" size={18} color="#F57F17" />
              <T w="b" s={18} c="#000" style={{ marginTop: 4 }}>{state.xpTotal || 0}</T>
              <T s={12} c="#F57F17">Total XP</T>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#FFCCBC' }]}>
              <Icon name="flame" size={18} color="#D84315" />
              <T w="b" s={18} c="#000" style={{ marginTop: 4 }}>{state.streak || 0}</T>
              <T s={12} c="#D84315">Day Streak</T>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#BBDEFB' }]}>
              <Icon name="target" size={18} color="#1565C0" />
              <T w="b" s={18} c="#000" style={{ marginTop: 4 }}>{state.xpToday || 0}</T>
              <T s={12} c="#1565C0">Today's XP</T>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <T s={14} c={COLORS.grayText}>Progress to Level {level + 1}</T>
              <T w="b" s={14} c={COLORS.primaryDark}>{xpToNext} XP to go</T>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Icon name="award" size={24} color="#8D6E63" />
          <T w="b" s={18} c="#000" style={{ marginLeft: 8 }}>Trophy Shelf</T>
          {activeFilter && (
            <TouchableOpacity onPress={() => setActiveFilter(null)} style={{ marginLeft: 'auto' }}>
              <T w="b" s={12} c={COLORS.dangerRed}>Clear Filter ✖</T>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.trophyGrid}>
          {badges.map((b) => (
            <TouchableOpacity 
              key={b.id} 
              activeOpacity={0.7}
              onPress={() => handleTrophyClick(b.id)}
              style={[
                styles.trophyCard, 
                { 
                  backgroundColor: b.on || activeFilter === b.id ? b.color : '#F5F5F5', 
                  opacity: b.on || activeFilter === b.id ? 1 : 0.6,
                  borderWidth: activeFilter === b.id ? 2 : 0,
                  borderColor: COLORS.primaryDark
                }
              ]}
            >
              <Icon name={b.icon} size={28} color={b.on || activeFilter === b.id ? '#000' : '#BDBDBD'} style={{ marginBottom: 8 }} />
              <T w="b" s={13} c={b.on || activeFilter === b.id ? '#000' : '#9E9E9E'} style={{ textAlign: 'center' }}>
                {b.title}
              </T>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Icon name="star" size={24} color="#FBC02D" />
          <T w="b" s={18} c="#000" style={{ marginLeft: 8 }}>
            {getLessonsTitle()}
          </T>
        </View>

        <View style={styles.lessonsList}>
          {displayedLessons.map((lesson, idx) => (
            <View key={lesson.id || idx} style={[styles.lessonCard, shadow]}>
              <View style={{ flex: 1 }}>
                <T w="b" s={16} c="#000">{formatLessonTitle(lesson.mode)}</T>
                <T s={14} c={COLORS.grayText}>{lesson.date}</T>
              </View>
              <View style={styles.lessonStars}>
                {[1, 2, 3].map(star => (
                  <Icon 
                    key={star} 
                    name="star" 
                    size={16} 
                    color={star <= lesson.stars ? '#FBC02D' : '#E0E0E0'} 
                    style={{ marginHorizontal: 2 }}
                  />
                ))}
              </View>
              <View style={styles.xpTag}>
                <T w="b" s={12} c={COLORS.successGreen}>+{lesson.xp} XP</T>
              </View>
            </View>
          ))}
          {displayedLessons.length === 0 && (
            <T s={14} c={COLORS.grayText} style={{ textAlign: 'center', marginTop: 10 }}>
              {allCompletedLessons.length === 0 ? "You haven't completed any lessons yet. Start practicing!" : "No lessons found for this filter."}
            </T>
          )}
        </View>

      </ScrollView>
      <BottomNav />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 10, paddingBottom: 15 },
  headerActions: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0E0E0', borderRadius: 25, paddingHorizontal: 5 },
  profileCard: { backgroundColor: COLORS.white, marginHorizontal: 20, borderRadius: 24, padding: 20, marginBottom: 20 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: COLORS.primaryDark, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  levelBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 15, borderRadius: 16, marginHorizontal: 5 },
  progressContainer: { marginTop: 5 },
  progressBarBg: { height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, overflow: 'hidden' },
  progressBarFill: { height: 10, backgroundColor: COLORS.primaryDark, borderRadius: 5 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  trophyGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, justifyContent: 'space-between', marginBottom: 20 },
  trophyCard: { width: '30%', aspectRatio: 1, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 15, padding: 10 },
  lessonsList: { paddingHorizontal: 20, gap: 12 },
  lessonCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, padding: 16, borderRadius: 16 },
  lessonStars: { flexDirection: 'row', marginRight: 15 },
  xpTag: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
});