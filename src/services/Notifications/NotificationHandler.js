// // src/services/notifications/NotificationHandler.js
// import messaging from '@react-native-firebase/messaging';
// import { displayNotification } from './NotificationService';

// export function setupNotificationHandler() {
//     messaging().onMessage(async remoteMessage => {
//         const { title, body } = remoteMessage.notification;
//         await displayNotification(title, body);
//     });
// }

// // Lida com notificações recebidas quando o app está em primeiro plano
// export function setupForegroundNotificationHandler() {
//     messaging().onMessage(async remoteMessage => {
//         const { title, body } = remoteMessage.notification;
//         await displayNotification(title, body);
//     });
// }

// // Lida com notificações quando o app está em segundo plano ou fechado
// export function setupBackgroundNotificationHandler() {
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//         const { title, body } = remoteMessage.notification;
//         await displayNotification(title, body);
//     });
// }