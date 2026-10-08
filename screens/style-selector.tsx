import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView, Image,  ImageSourcePropType} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { SafeScreen } from '@/components/safe-screen';

interface Estilo {
  id: number;
  name: string;
  image: ImageSourcePropType;
}

const EstilosSelect: React.FC = () => {
  const [selectedEstilos, setSelectedEstilos] = useState<number[]>([]);
  const maxSelections = 3;


  const estilos: Estilo[] = [
    { id: 1, name: 'Clásico', image: require('../assets/images/classic.jpg') },
    { id: 2, name: 'Boho', image: require('../assets/images/boho.jpg') },
    { id: 3, name: 'Minimalista', image: require('../assets/images/minimal.jpg') },
    { id: 4, name: 'Sporty', image: require('../assets/images/sporty.jpg') },
    { id: 5, name: 'Retro', image: require('../assets/images/retro.jpg') },
    { id: 6, name: 'Preppy', image: require('../assets/images/preppy.jpg') },
    { id: 7, name: 'Old money', image: require('../assets/images/oldmoney.jpg') },
    { id: 8, name: 'Grunge', image: require('../assets/images/grunge.jpg') },
    { id: 9, name: 'Comfy', image: require('../assets/images/comfy.jpg') },
    { id: 10, name: 'Gótico', image: require('../assets/images/gotico.jpg') },
  ];

  const handleEstiloSelect = (estilo: Estilo): void => {
    if (selectedEstilos.includes(estilo.id)) {
      setSelectedEstilos(selectedEstilos.filter(id => id !== estilo.id));
      return;
    }

    if (selectedEstilos.length >= maxSelections) {
      Alert.alert(
        'Límite alcanzado',
        `Solo puedes seleccionar ${maxSelections} estilos`,
        [{ text: 'OK' }]
      );
      return;
    }

    setSelectedEstilos([...selectedEstilos, estilo.id]);
  };

  const isSelected = (estiloId: number): boolean => {
    return selectedEstilos.includes(estiloId);
  };

  const getSelectedEstiloNames = (): string[] => {
    return selectedEstilos.map(id => {
      const estilo = estilos.find(s => s.id === id);
      return estilo ? estilo.name : '';
    });
  };

  const resetSelection = (): void => {
    setSelectedEstilos([]);
  };

  return (
    <SafeScreen style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>🎨 Selecciona tus 3 estilos favoritos</Text>
          <Text style={styles.subtitle}>
            Toca los estilos que más te gusten (Máximo {maxSelections})
          </Text>
          
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>
              Seleccionados: {selectedEstilos.length}/{maxSelections}
            </Text>
          </View>
        </View>

        <View style={styles.estilosGrid}>
          {estilos.map((estilo) => (
            <TouchableOpacity
              key={estilo.id}
                style={[
                  styles.estiloItem,
                  {
                    borderColor: isSelected(estilo.id) ? '#333' : 'transparent',
                  },
                ]}
                onPress={() => handleEstiloSelect(estilo)}
                activeOpacity={0.7}
              >

                <View style={styles.imageContainer}>
                  <Image 
                    source={estilo.image}
                    style={styles.estiloImage}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.imageOverlay} />
                
                {isSelected(estilo.id) && (
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.selectedIcon}>✓</Text>
                  </View>
                )}
                
                <View style={styles.estiloInfo}>
                  <Text style={styles.estiloName}>
                    {estilo.name}
                  </Text>
                </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Información de selección */}
        {selectedEstilos.length > 0 && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionTitle}>Tus estilos seleccionados:</Text>
            <View style={styles.selectedList}>
              {getSelectedEstiloNames().map((name, index) => (
                <View key={index} style={styles.selectedTag}>
                  {/* Mini preview de la imagen */}
                  <Image 
                    source={estilos.find(e => e.name === name)?.image || estilos[0].image}
                    style={styles.selectedImagePreview}
                    resizeMode="cover"
                  />
                  <Text style={styles.selectedTagText}>{name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Botones de acción */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetSelection}
            disabled={selectedEstilos.length === 0}
          >
            <Text style={[
              styles.resetButtonText,
              selectedEstilos.length === 0 && styles.disabledText
            ]}>
              Reiniciar selección
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.confirmButton,
              selectedEstilos.length === 0 && styles.disabledButton
            ]}
            onPress={() => {
              Alert.alert(
                'Selección guardada',
                `Has seleccionado ${selectedEstilos.length} estilo(s)`,
                [{ text: 'OK' }]
              );
            }}
            disabled={selectedEstilos.length === 0}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
   imageContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    borderRadius: 12, 
  },
  estiloImage: {
      width: '100%',
      height: '100%',
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
  estilosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  estiloItem: {
    width: '48%',
    height: 120,
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    justifyContent: 'space-between',
    borderWidth: 3,
    overflow: 'hidden', 
    position: 'relative',
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
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
    zIndex: 10, 
  },
  selectedIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  estiloInfo: {
    zIndex: 5, 
  },
  estiloName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white', 
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
  selectedImagePreview: {
    width: 20,
    height: 20,
    borderRadius: 10,
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

export default EstilosSelect;
