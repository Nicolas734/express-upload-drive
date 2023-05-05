import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import * as dotenv from "dotenv";
import googleapis from "googleapis";
import { createClient, createFolder } from "./drive";




dotenv.config();

const PORT = process.env.PORT || 3000
const GOOGLE_DRIVE_CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID
const GOOGLE_DRIVE_CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET
const GOOGLE_DRIVE_REDIRECT_URI = process.env.GOOGLE_DRIVE_REDIRECT_URI
const GOOGLE_DRIVE_REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN


const client = createClient(GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REDIRECT_URI, GOOGLE_DRIVE_REFRESH_TOKEN)
const folder = async () => {const teste = await createFolder('teste-upload', client); console.log(teste)}

folder()

const diretorio = 'uploads/';

if(!fs.existsSync(diretorio)){
    console.log("diretorio criado");
    fs.mkdirSync(diretorio)
}


const app = express();


const storage = {
    local: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, diretorio)                        // indica qual o diretorio sera salvo os arquivos
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.jpg')               // salvo o arquivo com o unixtime para que o arquivo possua o nome unico
        }
    })
}

const upload = multer({ storage: storage.local});

const uploadFile = (req, res) => {
    const dados =  req.file;             //responsavel por receber as informações dos arquivos 


    // estrutura de retorno do req.file
    /*
    {
        fieldname: 'foto',
        originalname: 'foto.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: 'uploads/',
        filename: '1683319960631.jpg',
        path: 'uploads\\1683319960631.jpg',
        size: 1405186
    }
      */


    res.json(dados.originalname)
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.json("ta funcionando :]")
})



// ao chamar está rota será chamada o middleware que seria o upload.single
// este middleware é o responsavel por salvar o arquivo no diretorio especificado e renomear o arquivo adicionando a sua extensão
// logo após o middleware salvar o arquivo, é chamado a função uploadFile que é responsavel por devolver o nome do arquivo ao front-end
// e é nesta função onde se pode receber o nome do arquivo ou até a sua url, caso esteja salvo em algum lugar, sendo possivel salvar estar informações no banco de dados
app.post('/cadastro', upload.single('foto'), uploadFile);



app.listen(3000, () => {
    console.log("server rodadno na porta 3000")
})