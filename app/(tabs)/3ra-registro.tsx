import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function TercerRegistroScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? 'light'].background,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: Colors[colorScheme ?? 'light'].text,
            }}
          >
            3ra Registro
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors[colorScheme ?? 'light'].text,
              marginTop: 10,
            }}
          >
            Contenido de la pantalla de registro
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
