import { Client, Account } from 'appwrite';

export const client = new Client();

//const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('653c86b996c69fb5da9c');
export const account = new Account(client);
export { ID } from 'appwrite';
