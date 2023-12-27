import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [(data) => {
    // 객체를 쿼리 문자열로 변환
    const formData = new URLSearchParams();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData.toString();
  }],
});

// Axios 인터셉터를 사용하여 모든 요청에 토큰 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
