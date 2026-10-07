import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isFloating = insets.bottom > 0;

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: '#000000',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarItemStyle: {
          borderRadius: 30,
          height: 50,
          alignSelf: 'center',
        },
        tabBarActiveBackgroundColor: '#330C2F',
        tabBarStyle: {
          position: 'absolute',
          bottom: isFloating ? insets.bottom : 10,
          left: isFloating ? 20 : 0,
          right: isFloating ? 20 : 0,
          backgroundColor: colorScheme === 'dark' ? '#e8d6e2' : '#ffffff',
          borderTopColor: colorScheme === 'dark' ? '#e6d5e1' : '#e0e0e0',
          height: 50,
          elevation: isFloating ? 10 : 0,           // Android
          shadowColor: '#000',     // iOS
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: isFloating ? 0.1 : 0,
          shadowRadius: 10,
          
          borderTopWidth: 0,       // Quita la línea gris fea de arriba
          paddingBottom: 0,
        },
        tabBarIconStyle:{
          marginTop: 0,
        },
        tabBarBackground: () => (
          <View
            style={{
              position: 'absolute',
              top: 50,
              right: 0,
              bottom: -100,
              left: 0,
              backgroundColor: colorScheme === 'dark' ? '#ddcbd7' : '#ffffff',
            }}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="armario"
        options={{
          title: 'Armario',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="hanger" color={color} />,
        }}
      />
      <Tabs.Screen
        name="outfit-tool"
        options={{
          title: 'Outfit Tool',
          tabBarIcon: ({ color }) => <IconSymbol size={34} name="sparkles" color={color} />,
        }}
      />
      <Tabs.Screen
        name="buscar"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="magnifyingglass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="person.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="3ra-registro"
        options={{
          title: '3ra Registro',
          tabBarIcon: ({ color }) => <IconSymbol size={34} name="sparkles" color={color} />,
        }}
      />
    </Tabs>
  );
}
