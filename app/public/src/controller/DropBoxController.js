class DropBoxController{

    constructor(){
        this.btnSendFileEl = document.querySelector("#btn-send-file");
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root')

        //incia o evento click
        this.initEvents();

    }


    initEvents(){
       
        //Quando ocorre o evento click no botão btnSendFileEl, esse botão chamo input file e abre o explore para enviar o arquivo
        this.btnSendFileEl.addEventListener('click', event=> {

            this.inputFilesEl.click()

        });


        //esse evento altera o modal de carregamento
        this.inputFilesEl.addEventListener('change', event=>{
            //(event.target.files) -> coleção do arquivo enviado
            
            this.uploadTask(event.target.files);
            this.snackModalEl.style.display = 'block';



        
        });

    }

    //metodo para receber os arquivos
    // file não é um array e sim uma coleção e para converta, utiliza-se o spreatch linha 44
    //para cada solicitação vamos utilizar o ajax
    uploadTask(files){

        let promises = [];
        [...files].forEach(file =>{

            promises.push(new Promise((resolve,reject)=>{

                let ajax = new XMLHttpRequest();

                //abrir a conecção via post na posta /upload   
                ajax.open('POST', '/upload');
                //.onload é onde o funcionamento ocorre
                ajax.onload = event =>{

                    try{

                        resolve(JSON.parse(ajax.responseText));

                    }catch(e){

                        reject(e);
                    }

                };

                //caso tenha erro no envio
                ajax.onerror = event =>{

                    reject(event);

                };
                // como é leitura de arquivo, para se lê, utiliza o FormData
                let formData = new FormData();
                //1) nome do campo que o post receba - 2) qual é o arquivo que será enviado (file do forEach)
                formData.append('input-file', file);


                //envia as informações via AJAX
                ajax.send(formData);               

            }));
        });
        //verifica todo mundo, e os resolve da colection
        return Promise.all(promises)

    }
}