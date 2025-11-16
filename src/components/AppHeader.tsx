import React, {ReactNode, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ThemeColors, useThemeColors} from '../theme/colors';

type Props = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightContent?: ReactNode;
};

export const AppHeader: React.FC<Props> = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightContent,
}) => {
  const colors = useThemeColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            activeOpacity={0.8}>
            <Text style={styles.backIcon}>‹</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? (
            <Text style={styles.subtitle}>{subtitle}</Text>
          ) : null}
        </View>
      </View>

      {rightContent ? <View style={styles.rightSection}>{rightContent}</View> : null}
    </View>
  );
};

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.headerBackground,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 12,
    },
    backIcon: {
      color: colors.headerSubtitle,
      fontSize: 20,
      marginRight: 2,
    },
    backText: {
      color: colors.headerSubtitle,
      fontSize: 14,
    },
    title: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: '700',
    },
    subtitle: {
      color: colors.headerSubtitle,
      fontSize: 12,
      marginTop: 2,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });