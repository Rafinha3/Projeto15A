//variáveis globais
var rua, ruaImg, runner, runnerImg;
var edges;
var dinheiro,dinheiroImg, diamantesImg, colarImg, espadasImg;
var grupoDinheiro,grupoDiamantes,grupoColar,grupoEspadas;
var score = 0;
var fimImg;
var PLAY = 1;
var END = 0;
var estadoJogo = PLAY;

//carregamento de arquivos
function preload(){
    ruaImg = loadImage("Road.png");
    runnerImg = loadAnimation("Runner-1.png","Runner-2.png");
    dinheiroImg = loadImage("cash.png");
    diamantesImg = loadImage("diamonds.png");
    colarImg = loadImage("jwell.png");
    espadasImg = loadImage("sword.png");
    fimImg = loadImage("fimdeJogo.png");
}

//sprites e suas propriedades
function setup(){
    createCanvas(400,900);
    rua = createSprite(200,300);
    rua.addImage(ruaImg);
    rua.scale = 0.4;
    rua.velocityY = 4;

    runner = createSprite(200,900);
    runner.addAnimation("run",runnerImg);
    runner.scale = 0.1;
    
    grupoDinheiro = createGroup();
    grupoDiamantes = createGroup();
    grupoColar = createGroup();
    grupoEspadas = createGroup();

    edges = createEdgeSprites();
    
}

//desenha
function draw(){
    background("lightgreen");
    runner.x = mouseX;
    runner.bounceOff(edges);
    
    if(rua.y > 1000){
        rua.y = height/3;
    }
    if(estadoJogo == PLAY){
        gerarDinheiro();
        gerarDiamantes();
        gerarColar();
        gerarEspadas();
    }
    

    if(runner.isTouching(grupoDinheiro)){
        grupoDinheiro.destroyEach();
        score = score +150;
    }else if(runner.isTouching(grupoDiamantes)){
        grupoDiamantes.destroyEach();
        score = score +150;
    }else if(runner.isTouching(grupoColar)){
        grupoColar.destroyEach();
        score = score +150;
    }else if(runner.isTouching(grupoEspadas)){
        grupoEspadas.destroyEach();
        grupoDinheiro.destroyEach();
        grupoColar.destroyEach();
        grupoDiamantes.destroyEach();
        runner.destroy();
        rua.velocityY = 0;
        estadoJogo = END;
        var fim = createSprite(200, 300);
        fim.addImage(fimImg);
        fim.scale = 0.8;
    }

    drawSprites();
    textSize(30);
    fill("white");
    text("Ganhou: " + score, 20, 40);
}

function gerarDinheiro(){
    if(frameCount%200 === 0){
        dinheiro = createSprite(random(50,350),10,40,40);
        dinheiro.velocityY = 4;
        dinheiro.scale = 0.15;
        //dinheiro.debug = true;
        dinheiro.addImage(dinheiroImg);
        grupoDinheiro.add(dinheiro);
        dinheiro.lifetime = 225;   
    }
}

function gerarDiamantes(){
    if(frameCount%320 === 0){
        var diamantes = createSprite(random(50,350),10,40,40);
        diamantes.velocityY = 4;
        diamantes.scale = 0.04;
        diamantes.addImage(diamantesImg);
        grupoDiamantes.add(diamantes);
        diamantes.lifetime = 225;
        
    }
}

function gerarColar(){
    if(frameCount%410 === 0){
        var colar = createSprite(random(50,350),10,40,40);
        colar.velocityY = 4;
        colar.scale = 0.15;
        colar.addImage(colarImg);
        grupoColar.add(colar);
        colar.lifetime = 225;
    }
}

function gerarEspadas(){
    if(frameCount%530 === 0){
        var espadas = createSprite(random(50,350),10,40,40);
        espadas.velocityY = 4;
        espadas.scale = 0.15;
        espadas.addImage(espadasImg);
        grupoEspadas.add(espadas);
        espadas.lifetime = 225;
    }
}
