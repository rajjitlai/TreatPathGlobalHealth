import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

// Initialize SDK services. For Appwrite JS v17, constructors take only the client.
export const database = new Databases(client);
export const account = new Account(client);
export const prodBuck = new Storage(client);

client
    .setEndpoint(import.meta.env.VITE_APP_ENDPOINT)
    .setProject(import.meta.env.VITE_APP_ID);

export { ID } from "appwrite";

export default client;