import axios from 'axios';
import {Boat} from '../model/Boat';
import keycloak from "../config/Keycloak";


const API_URL = process.env.REACT_APP_API_URL as string;

axios.interceptors.request.use(
    async (config) => {
        const token = keycloak.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getBoats = async (): Promise<Boat[]> => {
    const response = await axios.get<Boat[]>(API_URL);
    return response.data;
};


export const deleteBoat = async (boatId: string): Promise<void> => {
    await axios.delete(`${API_URL}/${boatId}`);
};


export const updateBoat = async (boat: Boat): Promise<Boat> => {
    const response = await axios.put<Boat>(`${API_URL}/${boat.id}`, boat);
    return response.data;
};


export const createBoat = async (boat: Boat): Promise<Boat> => {
    const response = await axios.post<Boat>(`${API_URL}`, boat);
    return response.data;
};

