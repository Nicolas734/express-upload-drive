import multer from "multer";


const diretorio = 'uploads/';

const storage = {
    local: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, diretorio)                        // indica qual o diretorio sera salvo os arquivos
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.jpg')               // salvo o arquivo com o unixtime para que o arquivo possua o nome unico
        }
    }),
    drive: multer.memoryStorage()
}

export const upload = multer({ storage: storage.local});
export const uploadDrive = multer({storage:storage.drive})