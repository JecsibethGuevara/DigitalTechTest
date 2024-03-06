import {Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    projectId : import.meta.env.VITE_PROJECT_ID,
    url: import.meta.env.VITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVE_COLLECTION_ID,
}

export const client = new Client();
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

client.setProject('65a2d87881700798571f')
client.setEndpoint('https://cloud.appwrite.io/v1') // figure out why it does not work form env