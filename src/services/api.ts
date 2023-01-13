import axios from 'axios';

export const api = axios.create({
    baseURL: '/api',
    headers:{
        'Allow-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    }
    

})