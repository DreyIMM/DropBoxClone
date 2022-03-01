var express = require('express');
const formidable = require('formidable');
var router = express.Router();
var fomidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload', (req,res) =>{

  //metodo Incomingo form(recuperando o formulario)
  //parametros (1- ./upload (raiz vai na pasta upload) 2 mantém a extensão do arquivo
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });
  //Faz o parse dos dados que estão chegando (interpreta) ulti parans são os arquivos, filds
  form.parse(req,(err,fields, files)=>{

    res.json({
      files
    });

  });


 
})

module.exports = router;
