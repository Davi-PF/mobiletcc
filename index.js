/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Registra a tarefa em segundo plano
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // Aqui você pode processar o conteúdo da notificação, como navegar ou manipular dados
  });
  

AppRegistry.registerComponent(appName, () => App);
