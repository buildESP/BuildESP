import axios from 'axios';

// Utilisation de l'IP privée du backend
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://172.31.33.98:3000';

const api = axios.create({
  baseURL: backendUrl,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchToken = async (login, password) => {
  try {
    const response = await api.post('/api/access-token', { login, password });
    return response.data;
  } catch (error) {
    console.error('Erreur dans la récupération du token:', error);
  }
};
