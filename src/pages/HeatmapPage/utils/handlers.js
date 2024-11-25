// src/utils/handlers.js

export const handleItemPress = (coordinate, toggleMenu, mapRef) => {
  // Fechar o menu
  toggleMenu();
  // Animar para a região específica
  if (mapRef.current) {
    mapRef.current.animateToRegion(
      {
        ...coordinate,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000 // Duração da animação em milissegundos
    );
  }
};

export const handleMarkerPress = (coordinate, mapRef) => {
  if (mapRef.current) {
    mapRef.current.animateToRegion(
      {
        ...coordinate,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  }
};
