import axios from 'axios';

const base_url='http://localhost:5000/'
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return req;
});
export const register = (formData) => API.post('/user/register', formData);
export const login = (formData) => API.post('/user/login', formData);
export const getUser = () => API.get('/user/');
export const fetchFromAPI=(query)=>API.get(query);
export const addMovie = (movieData) => API.post('/movies/', movieData);
