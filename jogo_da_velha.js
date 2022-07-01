const jogador1 = "x";
const jogador2 = "o";

var jogador_da_vez = jogador1;
var final = false;

atualizaCabecalho();
inicializarEspacos();

function atualizaCabecalho(){
    if (final){
        return;
    }
    if(jogador_da_vez == jogador1){
        var jogador = document.querySelectorAll("div#cabecalho img")[0]; //Retorna, em um array, todas as imagens que estão nessa div
        jogador.setAttribute("src", "imagens/x.png");
    }
    else{
        var jogador = document.querySelectorAll("div#cabecalho img")[0]; 
        jogador.setAttribute("src", "imagens/bolinha.png");
    }
}

function inicializarEspacos(){
    var espacos = document.getElementsByClassName("espacamento"); //reservando em um array todos os elementos das div com a class espacamento
    for (var i = 0 ; i < espacos.length; i++){
        espacos[i].addEventListener("click", function(){
            if (final){
                return;
            }
            if (this.getElementsByClassName("img").length == 0){
                if(jogador_da_vez == jogador1){
                    this.innerHTML = "<img src='imagens/x.png' height='60px'>";
                    this.setAttribute("verificar_jogada", jogador1);
                    jogador_da_vez = jogador2;
                }
                else{
                    this.innerHTML = "<img src='imagens/bolinha.png' height='60px'>";
                    this.setAttribute("verificar_jogada", jogador2);
                    jogador_da_vez = jogador1;
                }
                atualizaCabecalho();
                verificarVencedor();

            }
        }); //
    }
}

async function verificarVencedor(){
    var a1 = document.getElementById("a1").getAttribute("verificar_jogada");
    var a2 = document.getElementById("a2").getAttribute("verificar_jogada");
    var a3 = document.getElementById("a3").getAttribute("verificar_jogada");

    var b1 = document.getElementById("b1").getAttribute("verificar_jogada");
    var b2 = document.getElementById("b2").getAttribute("verificar_jogada");
    var b3 = document.getElementById("b3").getAttribute("verificar_jogada");

    var c1 = document.getElementById("c1").getAttribute("verificar_jogada");
    var c2 = document.getElementById("c2").getAttribute("verificar_jogada");
    var c3 = document.getElementById("c3").getAttribute("verificar_jogada");

    var vencedor = "";

    if ((a1 == b1 && a1 == c1 && a1 != "") || (a1 == a2 && a1 == a3 && a1 != "") || (a1 == b2 && a1 == c3 && a1 != "") ){
        vencedor = a1;
    }
    else if ((b2 == b1 && b2 == b3 && b2 != "") || (b2 == a2 && b2 == c2 && b2 != "") || (b2 == a3 && b2 == c1 && b2 != "")){
        vencedor = b2;
    }
    else if ((c3 == c2 && c3 == c1 && c3 != "") || (c3 == a3 && c3 == b3 && c3 != "")){
        vencedor = c3;
    }

    if (vencedor != ""){
        final = true;

        await sleep(50); //espera o processamento. Dessa forma, o HTML vaia tualizar primeiro que o JS

        alert ("O vencedor foi: " + vencedor);
    }

    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
