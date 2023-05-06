import { Router } from "express"
import { upload } from "../middlewares";
import { uploadFile } from "../controllers/uploadLocal";


const routes = Router();


// ao chamar está rota será chamada o middleware que seria o upload.single
// este middleware é o responsavel por salvar o arquivo no diretorio especificado e renomear o arquivo adicionando a sua extensão
// logo após o middleware salvar o arquivo, é chamado a função uploadFile que é responsavel por devolver o nome do arquivo ao front-end
// e é nesta função onde se pode receber o nome do arquivo ou até a sua url, caso esteja salvo em algum lugar, sendo possivel salvar estar informações no banco de dados
routes.post('/upload', upload.single('foto'), uploadFile);

export default routes;