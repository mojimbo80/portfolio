import axios from "axios";
import {API_BASE_URL, API_SPACE_ID, API_TOKEN} from "./contentful-settings";

export const getDataPageInformations = (id) => axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/environments/master/entries/${id}?access_token=${API_TOKEN}`)
export const getAsset = (id) => axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/environments/master/assets/${id}?access_token=${API_TOKEN}`)
export const fetchData = (value) => axios(
    `${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=${value}`,
);

export function getClients(value) {
    return fetch(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=${value}`)
        .then(response => response.json())
}
