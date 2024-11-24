import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://192.168.0.200:5000/api/notifications';
const authToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpcHJ1ZmVyQGdtYWlsLmNvbSIsInJvbGVzIjoiUk9MRV9SRVNQT05Tw4FWRUwiLCJpYXQiOjE3MzI0OTE0MDcsImV4cCI6MTczMjU3NzgwN30.R4jVjo_hlsiImIEPUctdfC6_K37mvjnHCQwmDpAQnnDET6X9tzzPXP76e0iwZM8JZzONmaFIf8NbUF_-Su0NiQ"

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
