import { Client, Databases } from 'appwrite'; 

export const PROJECT_ID = '6541f43f021e7bf2ac16';
export const DATABASE_ID = '6541f61dc2b04683b994';
export const COLLECTION_ID_MESSAGES = '6541f6292d9fcbfb742d';


const client = new Client();



client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6541f43f021e7bf2ac16');
    
export const databases = new Databases(client);

export default client;