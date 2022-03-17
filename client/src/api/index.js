import axios from 'axios';

const base_url='http://localhost:5000/'
const produc_server_url='https://moviewatchlistapi.herokuapp.com/'
const API = axios.create({ baseURL: produc_server_url });

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
export const getWatchList = () => API.get('/movies/watchlist');
export const updateWatchList = (updateData) => API.patch('/movies/', updateData);
export const addMovie = (movieData) => API.post('/movies/', movieData);
export const deleteMovie = (id) => API.delete(`/movies/?id=${id}`);