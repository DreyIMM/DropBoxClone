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
            // console.log(event.target.files); -> coleção do arquivo enviado
            this.snackModalEl.style.display = 'block';
        
        });

    }

}