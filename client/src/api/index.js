import axios from 'axios';
const base_url='http://10.0.0.99:5000/movies/'
export const fetchFromAPI=(query)=>axios.get(base_url+query);