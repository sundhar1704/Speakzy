import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from './Icon';

const COLORS = {
  primaryDark: '#001A4D',
  background: '#F5F9FF',
  primaryBlue: '#2463EB',
  dangerRed: '#C92020',
  successGreen: '#43A047',
  white: '#FFFFFF',
  lightYellow: '#FDF1CD',
  grayText: '#757575',
};

export default function CompletionNotification({ mode, correct, total, xp, bonus }) {
  // Format the mode name (e.g., 'speaking' -> 'Speaking')
  const displayMode = mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : 'Practice';

  return (
    <View style={styles.notificationCard}>
      <View style={styles.header}>
        <Icon name="star" size={16} color={COLORS.primaryDark} style={{ marginRight: 6 }} />
        <Text style={styles.appName}>Speakzy</Text>
      </View>
      
      <Text style={styles.notificationText}>
        You Completed Your {displayMode} Lesson 🎉
      </Text>

      <View style={styles.statsContainer}>
        <Text style={styles.scoreText}>
          {correct} / {total} Correct
        </Text>
        <View style={styles.xpBadge}>
          <Icon name="bolt" size={16} color="#785112" />
          <Text style={styles.xpText}>+{xp} XP</Text>
        </View>
      </View>

      {bonus && (
        <Text style={styles.bonusText}>Challenge complete — +50 bonus XP!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  notificationCard: { 
    backgroundColor: COLORS.white, 
    padding: 20, 
    borderRadius: 16, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, 
    shadowRadius: 8, 
    elevation: 5, 
    marginVertical: 20,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  appName: { 
    color: COLORS.primaryDark, 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  notificationText: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  scoreText: {
    fontSize: 16,
    color: COLORS.grayText,
    fontWeight: '600',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightYellow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  xpText: {
    color: '#785112',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  bonusText: {
    color: COLORS.successGreen,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  }
});