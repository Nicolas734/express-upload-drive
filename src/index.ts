import express from "express";
import cors from "cors";
import fs from "fs";
import * as dotenv from "dotenv";
import routes from "./routes"


dotenv.config();

const PORT = process.env.PORT || 3000

// const folder = async () => {const teste = await createFolder('teste-upload', client); console.log(teste)}

const diretorio = 'uploads/';

if(!fs.existsSync(diretorio)){
    console.log("diretorio criado");
    fs.mkdirSync(diretorio)
}

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, () => {
    console.log(`server rodando na porta ${PORT}`)
})