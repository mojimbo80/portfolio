import * as contentful from 'contentful'

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const API_SPACE_ID = process.env.REACT_APP_API_SPACE_ID;
export const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const client = contentful.createClient({
    space: API_SPACE_ID,
    accessToken: API_TOKEN,
})