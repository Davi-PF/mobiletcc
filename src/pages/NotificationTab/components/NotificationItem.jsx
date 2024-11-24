import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const NotificationItem = ({ notification, onDelete }) => {
  const renderRightActions = () => (
    <RectButton
      style={styles.deleteButton}
      onPress={() => onDelete(notification.id_notificacao)}>
      <FontAwesomeIcon icon={faTrash} color="#fff" size={20} />
    </RectButton>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <FontAwesomeIcon
          icon={faBell}
          size={24}
          color="#4CAF50"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{notification.titulo}</Text>
          <Text style={styles.message}>{notification.mensagem}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

// Definir validações de tipo para as props
NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id_notificacao: PropTypes.number.isRequired, // `id_notificacao` deve ser obrigatório e numérico
    titulo: PropTypes.string.isRequired, // `titulo` deve ser obrigatório e uma string
    mensagem: PropTypes.string.isRequired, // `mensagem` deve ser obrigatório e uma string
  }).isRequired,
  onDelete: PropTypes.func.isRequired, // `onDelete` deve ser uma função e obrigatório
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#FF5252',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
  },
});
