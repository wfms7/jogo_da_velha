class main{
    constructor(){
        this._body = document.querySelector("body")
        this._quadrado = document.querySelectorAll('[data-quadrado]');
        this._pecaX = document.querySelector('[data-pecax]');
        this._pecaO= document.querySelector('[data-pacao]');
        this._turno = true;
        this._ItemTarge;
        this._peca = this._pecaX;
        this._alert = document.querySelector('[data-alert]');
        this._btnReset= document.getElementById('button');

    }
    main(){

        this._body.addEventListener("mousemove",(event)=>{
            this.moverPeça(event)
        })

        this._quadrado.forEach((quadrado)=>{

            quadrado.addEventListener('mousedown',(event)=>{

               this.addPecaNoCampo()

            })

        })

        this._btnReset.addEventListener('click',()=>{
            this.Reset()
        })
    }


    moverPeça(event){

        
       

        const xPos = event.clientX -(this._peca.offsetWidth /2) ;
        const yPos = event.clientY -(this._peca.offsetHeight  /2);

        //console.log(xPos , yPos)
       this._peca.style.left  = xPos+"px";
       this._peca.style.top = yPos+"px";

       
        this._ItemTarge = event.target

    }

 async   addPecaNoCampo(evento){

     //   console.log(this._ItemTarge)

        let item = this._ItemTarge
        let temSapn =item.querySelector('span') 
        
      //  console.log(temSapn)

        if(!temSapn)  {

            let span = document.createElement("span");
            
            
            

            this._turno ? span.classList.add("peca-x"):span.classList.add("peca-o");

            item.appendChild(span)

            this._turno =!this._turno;

               this.turno();

        }   

       await   this.checkResultado()

    }

    turno(){
        if (this._turno){
            this._peca = this._pecaX
            this._pecaX.style.display ="block"
            this._pecaO.style.display="none"

        }else{
            this._peca= this._pecaO
            this._pecaO.style.display="block"
            this._pecaX.style.display ="none"

        }
        
    }



   async checkResultado(){
        let quad_0 = this._quadrado[0].querySelector('span')? this._quadrado[0].querySelector('span').className :""
        let quad_1 = this._quadrado[1].querySelector('span')? this._quadrado[1].querySelector('span').className :""
        let quad_2 = this._quadrado[2].querySelector('span')? this._quadrado[2].querySelector('span').className :""
        let quad_3 = this._quadrado[3].querySelector('span')? this._quadrado[3].querySelector('span').className :""
        let quad_4 = this._quadrado[4].querySelector('span')? this._quadrado[4].querySelector('span').className :""
        let quad_5 = this._quadrado[5].querySelector('span')? this._quadrado[5].querySelector('span').className :""
        let quad_6 = this._quadrado[6].querySelector('span')? this._quadrado[6].querySelector('span').className :""
        let quad_7 = this._quadrado[7].querySelector('span')? this._quadrado[7].querySelector('span').className :""
        let quad_8 = this._quadrado[8].querySelector('span')? this._quadrado[8].querySelector('span').className :""

       // console.log(quad_0,quad_1,quad_2)
        //console.log(quad_3,quad_4,quad_5)


        //horizontal
       await this.validacao(quad_0,quad_1,quad_2)? this.FimDojogo(quad_0):null;
       await this.validacao(quad_3,quad_4,quad_5)? this.FimDojogo(quad_3):null;
       await this.validacao(quad_6,quad_7,quad_8)? this.FimDojogo(quad_6):null;

       //vertical


     await this.validacao(quad_0,quad_3,quad_6)? this.FimDojogo(quad_0):null;
     await this.validacao(quad_1,quad_4,quad_7)? this.FimDojogo(quad_1):null;
     await this.validacao(quad_2,quad_5,quad_8)? this.FimDojogo(quad_2):null;

     //cruzado

     await this.validacao(quad_0,quad_4,quad_8)? this.FimDojogo(quad_0):null;
     await this.validacao(quad_2,quad_4,quad_6)? this.FimDojogo(quad_2):null;

     let totalPecaX = (document.querySelectorAll('.peca-x').length)
     let totalPecaO = (document.querySelectorAll('.peca-o').length)

     

     console.log(totalPecaX ,totalPecaO)

     if((parseInt(totalPecaO) +(parseInt(totalPecaX))) ===9){
        this.FimEmpate();
     }


    }

    async validacao(peca1 ,peca2, peca3){

        if(!peca1 || !peca2 || !peca3 ){
            return false
        }  
        

        return(peca1=== peca2 && peca2=== peca3)
    }
    
    FimDojogo(jogador){


        let vendedor = jogador ==="peca-x"? "Jogador 1" : "Jogador 2"

        console.log(`Fim do jogo , O vencedor é ${vendedor}`)


        this._alert.innerHTML =`
        <div class="alert__container show">
        <h1>Fim do jogo , O vencedor é ${vendedor}</h1>
        <button class="button__reset" id="buttonNovo">Jogar Novamente</button>
        </div>
        
        `
        this.novoJogo();


    }

    FimEmpate(){
     console.log("Empate")   

        this._alert.innerHTML =`
        <div class="alert__container show">
        <h1>Empate</h1>
        <button class="button__reset" id="buttonNovo">Jogar Novamente</button>
        </div>
        
        `
        this.novoJogo();


    }

    Reset(){
        location.reload();
    }

    novoJogo(){
        const btn = document.getElementById('buttonNovo')

        btn.addEventListener('click',()=>{
            this.Reset();
        })
    }
    

}

const start = new main();

start.main();