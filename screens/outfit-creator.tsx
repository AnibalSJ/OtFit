import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { SafeScreen } from '@/components/safe-screen';

export default function OutfitCreator() {
  const [outfit, setOutfit] = useState({
    base: null,
    middle: null,
    top: null,
    bottom: null
  });

  const clothingOptions = [
    { id: 1, type: 'top', layer: 'base', source: require('../assets/images/t-shirt.png'), name: 'T-shirt' },
    { id: 2, type: 'top', layer: 'base', source: require('../assets/images/crop-top.png'), name: 'Crop-Top' },
    { id: 3, type: 'top', layer: 'base', source: require('../assets/images/tank-top.png'), name: 'Tank-Top' },
    
    { id: 4, type: 'top', layer: 'middle', source: require('../assets/images/hoodie.png'), name: 'Hoodie' },
    { id: 5, type: 'top', layer: 'middle', source: require('../assets/images/sweater.png'), name: 'Sweater' },
    
    { id: 6, type: 'top', layer: 'top', source: require('../assets/images/jacket.png'), name: 'Jacket' },
    
    { id: 7, type: 'bottom', layer: 'base', source: require('../assets/images/mini-skirt.png'), name: 'Mini-skirt' },
    { id: 8, type: 'bottom', layer: 'base', source: require('../assets/images/overall.png'), name: 'Overall' },
    { id: 9, type: 'bottom', layer: 'base', source: require('../assets/images/pants.png'), name: 'Pants' },
    { id: 10, type: 'bottom', layer: 'base', source: require('../assets/images/skirt.png'), name: 'Skirt' },
  ];

  const handleClothingSelect = (item) => {
    setOutfit(prev => ({
      ...prev,
      [item.layer]: item.type === 'top' ? item : prev[item.layer],
      [item.type]: item.type === 'bottom' ? item : prev[item.type]
    }));
  };

  const resetOutfit = () => {
    setOutfit({ base: null, middle: null, top: null, bottom: null });
  };

  return (
  <SafeScreen>
  
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Creador de OtFit</Text>
      
        
        {outfit.base && (
          <Image source={outfit.base.source} style={styles.clothingItem} />
        )}
        
        {outfit.middle && (
          <Image source={outfit.middle.source} style={styles.clothingItem} />
        )}
        
        {outfit.top && (
          <Image source={outfit.top.source} style={styles.clothingItem} />
        )}
        
        {outfit.bottom && (
          <Image source={outfit.bottom.source} style={styles.clothingItem} />
        )}
      </View>
      
      <View style={styles.optionsContainer}>
        {clothingOptions.map(item => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.option}
            onPress={() => handleClothingSelect(item)}
          >
            <Image source={item.source} style={styles.optionImage} />
            <Text style={styles.optionText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity style={styles.resetButton} onPress={resetOutfit}>
        <Text style={styles.resetText}>Reset Outfit</Text>
      </TouchableOpacity>
    </ScrollView>
   </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  clothingItem: {
    width: '100%',
    height: '92%',
    position: 'absolute',
    resizeMode: 'contain',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  option: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 8,
  },
  optionImage: {
    resizeMode: 'contain',
  },
  optionText: {
    textAlign: 'center',
    marginTop: 4,
  },
  resetButton: {
    backgroundColor: '#ff66b2',
    borderRadius: 8,
  },
  resetText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
