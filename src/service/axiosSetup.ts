import axios, { AxiosInstance } from 'axios';

const SWAPI_BASE_URL = 'https://swapi.dev/api/';

class AxiosService {
    protected instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: SWAPI_BASE_URL,
            timeout: 50000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.instance.interceptors.response.use(
            (response) => response.data,
            (error) => {
                console.error('Request failed:', error);
                throw error;
            }
        );
    }
}

export default AxiosService;
