import {google} from "googleapis";
import { OAuth2Client } from 'google-auth-library';

export const createClient = (client_id, client_secret, redirect_id, refresh_token) => {
    const client = new OAuth2Client(client_id, client_secret, redirect_id);
    client.setCredentials({ refresh_token: refresh_token });
    return google.drive({ version: 'v3', auth: client })
}




export const createFolder = async (folderName, client) => {
    return client.files.create({
        resource: {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
        },
        fields: 'id, name',
    })
}


const searchFolder = async (folderName) => {

}