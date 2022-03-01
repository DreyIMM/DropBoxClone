class DropBoxController{

    constructor(){
        this.btnSendFileEl = document.querySelector("#btn-send-file");
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root')
        this.progessBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');
        this.nameFile = this.snackModalEl.querySelector(".filename")
        this.timeLeftEl = this.snackModalEl.querySelector(".timeleft")
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
            
            this.modalShow()

            this.inputFilesEl.value = '';
                    
        });

    }

    modalShow(show = true){

        this.snackModalEl.style.display = (show) ? 'block' : 'none';

    }


    //metodo para receber os arquivos
    //para cada solicitação vamos utilizar o ajax
    uploadTask(files){

        let promises = [];
        // file não é um array e sim uma coleção e para converta, utiliza-se o spreatch 
        [...files].forEach(file =>{

            promises.push(new Promise((resolve,reject)=>{

                let ajax = new XMLHttpRequest();

                //abrir a conecção via post na posta /upload   
                ajax.open('POST', '/upload');
                //.onload é onde o funcionamento ocorre
                ajax.onload = event =>{
                    this.modalShow(false)
                    try{

                        resolve(JSON.parse(ajax.responseText));

                    }catch(e){

                        reject(e);
                    }

                };

                //caso tenha erro no envio
                ajax.onerror = event =>{
                    this.modalShow(false)
                    reject(event);

                };

                //evento que responde sempre que envia um bit
                ajax.upload.onprogress = event =>{

                    this.uploadProgress(event,file)
                   
                }

                // como é leitura de arquivo, para se lê, utiliza o FormData
                let formData = new FormData();
                //1) nome do campo que o post receba - 2) qual é o arquivo que será enviado (file do forEach)
                formData.append('input-file', file);

                this.startUploadTime = Date.now();
                
                //envia as informações via AJAX
                ajax.send(formData);               

            }));
        });
        //verifica todo mundo, e os resolve da colection
        return Promise.all(promises)

    }


    //função que aumenta a barra de acordo com a porcentagem/ calcula o tempo esperado / adciona o nome do arquivo ao container acionado
    uploadProgress(event,file){

        let timespent = Date.now() - this.startUploadTime;
        let loaded = event.loaded;
        let total = event.total;
        let porcent = parseInt((loaded / total) * 100);
        let timeleft = ((100 - porcent) * timespent ) / porcent ;
        //atualizando a barrinho no css
        this.progessBarEl.style.width = `${porcent}%`

        this.nameFile.innerHTML = file.name;
        this.timeLeftEl.innerHTML = this.formTimeToHuman(timeleft);

        console.log(timespent, timeleft ,porcent);
    }
    
    formTimeToHuman(duration){

        let seconds = parseInt((duration / 100) % 60);
        let minutes = parseInt((duration/ (1000 * 60)) % 60);
        let hours = parseInt((duration/ (1000 * 60 * 60)) % 24);

        if(hours > 0){
            return `${hours} horas, ${minutes} minutos e ${seconds} segundos`
        }
        
        if(minutes > 0){
            return `${minutes} minutos e ${seconds} segundos`
        }

        if(seconds > 0){
            return `${seconds} segundos`
        }

        return '';

    }

}