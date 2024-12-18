import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  // baseURL: 'http://13.202.98.144:2000/api/',
  baseURL: 'http://13.202.98.144:2000/api/',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'},
});

export const setAuthToken = async () => {
  const userData = await AsyncStorage.getItem('user');
  console.log('userData', userData);
  if (userData) {
    try {
      const user = JSON.parse(userData);
      const {access_token} = user[0];

      if (access_token) {
        const headers = {
          ...api.defaults.headers.common,
          Authorization: `Bearer ${access_token}`,
        };
        api.defaults.headers.common = headers;
      } else {
        delete api.defaults.headers.common['Authorization'];
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      delete api.defaults.headers.common['Authorization'];
    }
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Call setAuthToken to set initial token
setAuthToken();
