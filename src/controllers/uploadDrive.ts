import { createClient, searchFolder, sendFileFromDrive } from "../drive";
import * as dotenv from "dotenv";


dotenv.config();

const GOOGLE_DRIVE_CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID
const GOOGLE_DRIVE_CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET
const GOOGLE_DRIVE_REDIRECT_URI = process.env.GOOGLE_DRIVE_REDIRECT_URI
const GOOGLE_DRIVE_REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN

const client = createClient(GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REDIRECT_URI, GOOGLE_DRIVE_REFRESH_TOKEN)

const uplaodFileFromDrive = async (req, res) => {
    try{
        const folder = await searchFolder('teste-upload', client)
        const folderId = folder.data.files[0].id;
        const file = req.file;
        const [,ext] = file.originalname.split('.');
        const fileName = Date.now() + '.' + ext;
        const mimeType = file.mimetype;
        const fileContent = file.buffer;
        const response = await sendFileFromDrive(client, fileName, mimeType, fileContent, folderId)
        res.json({id:"id do arquivo inserido no drive: " + response.data.id, name:response.data.name})
    }catch(error){
        console.log(error)
        res.json(error)
    }
}

export { uplaodFileFromDrive };