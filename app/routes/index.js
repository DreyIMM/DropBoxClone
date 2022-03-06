var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.delete('/file', (req, res) => {
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  })

  form.parse(req, (err, fields, files) => {
    
    
    
    if(fs.existsSync(fields.path)){
      fs.unlink(fields.path, err=>{
        if(err){
          res.status(400).json({
            err
          });
        }else{
          res.json({
            fields
          })
        }
      });
    }
    
  })
})


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
