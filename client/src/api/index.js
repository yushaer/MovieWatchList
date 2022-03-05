import axios from 'axios';
const base_url='http://localhost:5000/movies/'
export const fetchFromAPI=(query)=>axios.get(base_url+query);