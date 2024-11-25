// src/pages/HeatmapPage.jsx

import React, { useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { HeatmapComponent } from './components/HeatmapComponent';
import { useHeatmapData } from './hooks/useHeatmapData';
import ScanMenu from './components/ScanMenu';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons'; // Substitua pelo ícone desejado
import useMenuAnimation from './hooks/useMenuAnimation';
import { handleItemPress, handleMarkerPress } from './utils/handlers';
import { HEADER_HEIGHT } from './constants';

const HeatmapPage = () => {
  const cpf = '55566677788'; // Substituir pelo valor dinâmico
  const { originalPoints, loading, error } = useHeatmapData(cpf);
  const mapRef = useRef(null); // Usando useRef

  const { menuVisible, toggleMenu, animation, menuHeight } = useMenuAnimation();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (originalPoints.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Nenhum dado disponível para exibir no mapa.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeatmapComponent
        originalPoints={originalPoints}
        onMarkerPress={(coordinate) => handleMarkerPress(coordinate, mapRef)}
        mapRef={mapRef}
      />

      {/* Botão Flutuante para a Legenda */}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleMenu}>
        <FontAwesomeIcon icon={faList} size={24} color="white" />
      </TouchableOpacity>

      {/* Menu Flutuante */}
      {menuVisible && (
        <Animated.View style={[styles.menuContainer, { height: menuHeight, opacity: animation }]}>
          <ScanMenu
            points={originalPoints}
            onItemPress={(coordinate) => handleItemPress(coordinate, toggleMenu, mapRef)}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    top: HEADER_HEIGHT + 20, // Ajuste com base na altura do Header
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 10,
    borderRadius: 8,
    width: 250,
    overflow: 'hidden',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Sombra para iOS
    shadowOpacity: 0.3, // Sombra para iOS
    shadowRadius: 2, // Sombra para iOS
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 16,
  },
  emptyText: {
    color: '#555',
    fontSize: 16,
  },
});

export default HeatmapPage;
