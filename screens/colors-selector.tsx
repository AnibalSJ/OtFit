import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { SafeScreen } from '@/components/safe-screen';

const colorScheme = useColorScheme();

const ColorsSelect = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const maxSelections = 3;
  
  const colors = [
    { id: 1, name: 'Rojo Pasión', hex: '#FF6B6B' },
    { id: 2, name: 'Azul Profundo', hex: '#4ECDC4' },
    { id: 3, name: 'Verde Esmeralda', hex: '#1DD1A1' },
    { id: 4, name: 'Amarillo Sol', hex: '#FECA57' },
    { id: 5, name: 'Morado Real', hex: '#5F27CD' },
    { id: 6, name: 'Rosa Chicle', hex: '#FF9FF3' },
    { id: 7, name: 'Naranja Vibrante', hex: '#FF9F43' },
    { id: 8, name: 'Turquesa', hex: '#54A0FF' },
    { id: 9, name: 'Lila Suave', hex: '#C8D6E5' },
    { id: 10, name: 'Verde Mentha', hex: '#00D2D3' },
  ];

  const handleColorSelect = (color) => {
    if (selectedColors.includes(color.id)) {
      setSelectedColors(selectedColors.filter(id => id !== color.id));
      return;
    }

    if (selectedColors.length >= maxSelections) {
      Alert.alert(
        'Límite alcanzado',
        `Solo puedes seleccionar ${maxSelections} colores`,
        [{ text: 'OK' }]
      );
      return;
    }

    setSelectedColors([...selectedColors, color.id]);
  };

  const isSelected = (colorId) => selectedColors.includes(colorId);

  const getSelectedColorNames = () => {
    return selectedColors.map(id => {
      const color = colors.find(c => c.id === id);
      return color ? color.name : '';
    });
  };

  const resetSelection = () => {
    setSelectedColors([]);
  };

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}> Selecciona tus 3 colores favoritos</Text>
          <Text style={styles.subtitle}>
            Toca los colores que más te gusten (Máximo {maxSelections})
          </Text>
          
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>
              Seleccionados: {selectedColors.length}/{maxSelections}
            </Text>
          </View>
        </View>

        <View style={styles.colorsGrid}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color.id}
              style={[
                styles.colorItem,
                {
                  backgroundColor: color.hex,
                  borderColor: isSelected(color.id) ? '#333' : 'transparent',
                },
              ]}
              onPress={() => handleColorSelect(color)}
              activeOpacity={0.7}
            >
              {isSelected(color.id) && (
                <View style={styles.selectedIndicator}>
                  <Text style={styles.selectedIcon}>✓</Text>
                </View>
              )}
              <View style={styles.colorInfo}>
                <Text style={[
                  styles.colorName,
                  { color: getTextColor(color.hex) }
                ]}>
                  {color.name}
                </Text>
                <Text style={[
                  styles.colorHex,
                  { color: getTextColor(color.hex) }
                ]}>
                  {color.hex}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {selectedColors.length > 0 && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionTitle}>Tus colores seleccionados:</Text>
            <View style={styles.selectedList}>
              {getSelectedColorNames().map((name, index) => (
                <View key={index} style={styles.selectedTag}>
                  <View 
                    style={[
                      styles.selectedColorDot, 
                      { backgroundColor: colors.find(c => c.name === name)?.hex }
                    ]} 
                  />
                  <Text style={styles.selectedTagText}>{name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetSelection}
            disabled={selectedColors.length === 0}
          >
            <Text style={[
              styles.resetButtonText,
              selectedColors.length === 0 && styles.disabledText
            ]}>
              Reiniciar selección
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.confirmButton,
              selectedColors.length === 0 && styles.disabledButton
            ]}
            onPress={() => {
              Alert.alert(
                'Selección guardada',
                `Has seleccionado ${selectedColors.length} color(es)`,
                [{ text: 'OK' }]
              );
            }}
            disabled={selectedColors.length === 0}
          >
            <Text style={styles.confirmButtonText}>
              Confirmar selección
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const getTextColor = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  counterContainer: {
    backgroundColor: '#E9ECEF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  counterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  colorItem: {
    width: '48%', 
    height: 120,
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    justifyContent: 'space-between',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  colorInfo: {
    marginTop: 'auto',
  },
  colorName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  colorHex: {
    fontSize: 12,
    opacity: 0.9,
  },
  selectionInfo: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  selectedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  selectedTagText: {
    fontSize: 14,
    color: '#495057',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#E9ECEF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '600',
  },
  confirmButton: {
    flex: 2,
    backgroundColor: '#5F27CD',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  confirmButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  disabledText: {
    color: '#999',
  },
});

export default ColorsSelect;

