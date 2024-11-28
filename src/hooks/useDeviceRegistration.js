import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {useUser} from './UserContext';
import {Platform, PermissionsAndroid} from 'react-native';

const SERVER_URL = 'http://192.168.0.200:5000/api/devicestorage';
const TOKEN_VALIDITY_DAYS = 30;
const authToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpcHJ1ZmVyQGdtYWlsLmNvbSIsInJvbGVzIjoiUk9MRV9SRVNQT05Tw4FWRUwiLCJpYXQiOjE3MzI2ODA3MjMsImV4cCI6MTczMjc2NzEyM30.ms3FsOTxfripBR0CRMdBRywEWnbaYWZYurZYCwhuF2VnzpgioQjNQolmGOSad4HMVVtu-Kjq8j3NGdk0wDrSeg';
const useDeviceRegistration = cpf => {
  // const { authToken } = useUser();

  useEffect(() => {
    if (!authToken) {
      console.error('Authentication token is missing.');
      return;
    }

    // const createNotificationChannel = async () => {
    //   if (Platform.OS === 'android') {
    //     const channel = new messaging.Android.Channel(
    //       'zlo-app-notification-channel',
    //       'Zlo Channel',
    //       messaging.Android.Importance.HIGH,
    //     ).setDescription('Canal de notificações do projeto');
    //     await messaging().android.createChannel(channel);
    //   }
    // };

    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        // Android 13+
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Permissão para Notificações',
              message: 'Este aplicativo precisa enviar notificações para você.',
              buttonNeutral: 'Perguntar depois',
              buttonNegative: 'Não permitir',
              buttonPositive: 'Permitir',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permissão de notificações concedida');
            return true;
          } else {
            console.log('Permissão de notificações negada');
            return false;
          }
        } catch (err) {
          console.warn('Erro ao solicitar permissões de notificações:', err);
          return false;
        }
      }
      // Para Android <33 e outras plataformas, consider as permissões como concedidas
      return true;
    };

    const getAndRegisterToken = async () => {
      try {
        // Criar canal de notificações no Android
        // await createNotificationChannel();

        // Obter o token atual do dispositivo
        const currentToken = await messaging().getToken();
        console.log('Current Device Token:', currentToken);

        if (!currentToken) {
          console.warn('No device token available.');
          return;
        }

        // Buscar tokens registrados no backend para este CPF
        const response = await axios.get(`${SERVER_URL}/${cpf}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 200 && response.data.isOk) {
          const serverTokens = response.data.contentResponse.map(
            device => device.tokenDispositivo,
          );

          // Verificar se o token atual já está registrado
          if (serverTokens.includes(currentToken)) {
            console.log('Device token is already registered.');
            return;
          } else {
            console.log('Device token not found on server. Registering...');
            // Registrar o token
            await sendDeviceTokenToServer(cpf, currentToken);
          }
        } else {
          console.error('Failed to fetch device tokens:', response.data);
          // Tentar registrar o token mesmo que a requisição falhe
          await sendDeviceTokenToServer(cpf, currentToken);
        }
      } catch (error) {
        console.error(
          'Error during device registration initialization:',
          error,
        );
      }
    };

    const sendDeviceTokenToServer = async (cpf, deviceToken) => {
      try {
        const response = await axios.post(
          SERVER_URL,
          {
            tokenDispositivo: deviceToken,
            cpfResponsavel: cpf,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.status === 200 || response.status === 201) {
          console.log('Device token registrado com sucesso.');
        } else {
          console.error('Falha ao registrar device token:', response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Token já está registrado, atualizar dataCadastro
          console.warn('Device token já está registrado.');
        } else {
          console.error('Erro ao enviar device token para o servidor:', error);
        }
      }
    };

    const initialize = async () => {
      const permissionGranted = await requestNotificationPermission();

      if (permissionGranted) {
        await getAndRegisterToken();
      } else {
        console.log(
          'Permissão de notificações não concedida. Não registrando o token.',
        );
      }
    };

    initialize();

    // Ouvir eventos de refresh de token
    const unsubscribe = messaging().onTokenRefresh(async newToken => {
      console.log('Device token refreshed:', newToken);
      await sendDeviceTokenToServer(cpf, newToken);
    });

    return () => {
      unsubscribe();
    };
  }, [authToken, cpf]);
};

export default useDeviceRegistration;
