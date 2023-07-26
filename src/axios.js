import axios from 'axios';

const axiosBD = axios.create({
    baseUrl:"http://localhost:8080/login"
});
export default axiosBD;