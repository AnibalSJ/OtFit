import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * A partir de React Native 0.86 `useColorScheme()` devuelve 'light' | 'dark' | 'unspecified'.
 * Normalizamos a los dos únicos valores que existen en `Colors` (constants/theme.ts).
 */
export function useColorScheme(): 'light' | 'dark' {
  return useRNColorScheme() === 'dark' ? 'dark' : 'light';
}
