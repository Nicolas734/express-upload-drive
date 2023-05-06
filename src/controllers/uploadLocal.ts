
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

export { uploadFile };