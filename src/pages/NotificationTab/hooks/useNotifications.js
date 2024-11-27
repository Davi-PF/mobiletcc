import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://192.168.0.200:5000/api/notifications';
const authToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpcHJ1ZmVyQGdtYWlsLmNvbSIsInJvbGVzIjoiUk9MRV9SRVNQT05Tw4FWRUwiLCJpYXQiOjE3MzI2ODA3MjMsImV4cCI6MTczMjc2NzEyM30.ms3FsOTxfripBR0CRMdBRywEWnbaYWZYurZYCwhuF2VnzpgioQjNQolmGOSad4HMVVtu-Kjq8j3NGdk0wDrSeg"

export const useNotifications = (cpf) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/responsavel/${cpf}`, { headers: { Authorization: `Bearer ${authToken}`}});
        if (response.data.isOk) {
          setNotifications(response.data.contentResponse);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [cpf]);

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, { headers: { Authorization: `Bearer ${authToken}`}});
      setNotifications((prev) => prev.filter((notification) => notification.id_notificacao !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return { notifications, loading, error, deleteNotification };
};
