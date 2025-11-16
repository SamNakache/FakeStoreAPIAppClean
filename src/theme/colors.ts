// src/theme/colors.ts
import {useColorScheme} from 'react-native';

export type ThemeColors = {
  background: string;
  surface: string;
  headerBackground: string;
  headerSubtitle: string;
  text: string;
  textMuted: string;
  cardBorder: string;
  primaryButton: string;
  favorite: string;
};

const lightColors: ThemeColors = {
  background: '#f3f4f6',
  surface: '#ffffff',
  headerBackground: '#111827',
  headerSubtitle: '#9ca3af',
  text: '#111827',
  textMuted: '#6b7280',
  cardBorder: '#e5e7eb',
  primaryButton: '#1f2937',
  favorite: '#b91c1c',
};

const darkColors: ThemeColors = {
  background: '#020617',
  surface: '#111827',
  headerBackground: '#020617',
  headerSubtitle: '#6b7280',
  text: '#f9fafb',
  textMuted: '#9ca3af',
  cardBorder: '#1f2937',
  primaryButton: '#1f2937',
  favorite: '#f97373',
};

export function useThemeColors(): ThemeColors {
  const scheme = useColorScheme(); 
  return scheme === 'dark' ? darkColors : lightColors;
}