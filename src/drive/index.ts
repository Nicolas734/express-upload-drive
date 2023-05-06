import {google} from "googleapis";
import { OAuth2Client } from 'google-auth-library';
import fs from "fs"
import {Readable } from "stream"
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


export const searchFolder = async (folderName, client) => {
    try {
    const folders =
        client.files.list({
            q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
            fields: 'files(id, name, createdTime)',
    });
    
    return folders;
    } catch (err) {
        console.error(`Erro ao buscar pasta ${folderName}:`, err);
        throw err;
    }
};



export const sendFileFromDrive = async (client, filename, mimetype, fileContent, folderId) => {
    const fileMetadata = {
        name: filename,
        parents: [folderId] // ID da pasta onde o arquivo será salvo
    };
    const media = {
        mimeType: mimetype,
        body: Readable.from(fileContent)
    };
    try {
        const response = await client.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, name'
        });
        return response
    }catch(error){
        console.error(error)
    }
}