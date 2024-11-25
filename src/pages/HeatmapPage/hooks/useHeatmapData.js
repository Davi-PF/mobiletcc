import {useState, useEffect} from 'react';
import axios from 'axios';

const BASE_URL = 'http://192.168.0.200:5000/api/scanHistory';

const authToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYXZpcHJ1ZmVyQGdtYWlsLmNvbSIsInJvbGVzIjoiUk9MRV9SRVNQT05Tw4FWRUwiLCJpYXQiOjE3MzI0OTE0MDcsImV4cCI6MTczMjU3NzgwN30.R4jVjo_hlsiImIEPUctdfC6_K37mvjnHCQwmDpAQnnDET6X9tzzPXP76e0iwZM8JZzONmaFIf8NbUF_-Su0NiQ';
export const useHeatmapData = cpf => {
  const [originalPoints, setOriginalPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/dependente/${cpf}`, {
          headers: {Authorization: `Bearer ${authToken}`},
        });
        // src/hooks/useHeatmapData.js

        if (response.data.isOk) {
          const rawCoordinates = response.data.contentResponse;

          // Validação adicional
          const validatedPoints = rawCoordinates.filter(
            point =>
              typeof point.latitude === 'number' &&
              typeof point.longitude === 'number',
          );

          // Ordenar os pontos do mais recente para o menos recente
          const sortedPoints = validatedPoints.sort(
            (a, b) => b.scanDateTime - a.scanDateTime,
          );

          setOriginalPoints(sortedPoints);
        } else {
          setError('Dados inválidos recebidos da API.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmapData();
  }, [cpf]);

  return {originalPoints, loading, error};
};
