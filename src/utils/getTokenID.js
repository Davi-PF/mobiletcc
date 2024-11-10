import messaging from '@react-native-firebase/messaging';

const getToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // console.log('Token FCM:', fcmToken);
      // Envie o token para o seu backend aqui
      // ...
    } else {
      // console.log('Failed to get token');
    }
  } catch (error) {
    console.error('Error getting token', error);
  }
};

export default getToken;