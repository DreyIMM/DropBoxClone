var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/file', (req,res)=>{
  
  let path = req.query.path

  if(fs.existsSync(path)){
    //1) caso ocorra erro - 2) dados do arquvio 
    fs.readFile(path, (err, data)=>{
      if(err){
        console.error(err);
        res.status(400).json({
          error: err
        });
      }else{
        res.end(data)
      }
    })


  }else{
    res.status(404).json({
      error: 'File not found :)'
    })
  }


})


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
    }else{

      res.status(404).json({
        error: 'File not found :)'
      })

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
