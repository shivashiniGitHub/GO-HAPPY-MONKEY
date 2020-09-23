var PLAY=1;
var END=0;
var gameState = PLAY;

var monkey, monkey_running,monkey_stopped;

var banana, bananaImage;

var stone, stoneImage;

var FoodGroup, stoneGroup;

var score;

var lawn, movingLawn, invisibleLawn;

var score;

var gameover,gameOverImage;

function preload(){
  
    monkey_running =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
    monkey_stopped = loadImage("sprite_8.png");

    bananaImage = loadImage("banana.png");

    stoneImage = loadImage("obstacle.png");

    movingLawn = loadImage("lawn.jpg");
  
    gameOverImage = loadImage("Game_Over.webp");
}

function setup() {
  
  createCanvas(600,600);  

  lawn = createSprite(300,300,600,600);
  lawn.addImage("moving_ground",movingLawn); 
  lawn.scale = 5;  
  lawn.velocityX = -3;
  
  invisibleLawn = createSprite(300,575,600,10);
  invisibleLawn.visible = false;

  monkey = createSprite(50,550,25,25);
  monkey.addAnimation("movingMonkey",monkey_running);
  monkey.addImage("monkey_endState",monkey_stopped);
  monkey.scale = 0.115;
  monkey.debug = false;
  monkey.setCollider("rectangle",0,0,400,500);
  
  gameover = createSprite(300,250,25,25);
  gameover.addImage("games_end",gameOverImage);
  gameover.scale = 0.5
  gameover.visible = false;
  
  score = 0;
  
  foodGroup = new Group; 
  stoneGroup = new Group;
}

function draw() {

  background("white");

  if(gameState === PLAY){

    if(lawn.x < 0){
      lawn.x = lawn.width/2;
    }

    if(keyDown("space")&& monkey.y >= 450) {
      monkey.velocityY = -20;
        } 

    monkey.velocityY = monkey.velocityY + 0.8; 

    score = score + Math.round(getFrameRate()/60);

    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score + 100;
        }

    bananas();
    stones();

    if(stoneGroup.isTouching(monkey)){
      gameState = END;
    }  

  }else if(gameState === END){

    foodGroup.setVelocityXEach(0);

    stoneGroup.setVelocityXEach(0);

    lawn.velocityX = 0;

    monkey.velocityY = 0;  

    monkey.changeAnimation("monkey_endState",monkey_stopped); 

    gameover.visible = true;  

    foodGroup.setLifetimeEach(-1);

    stoneGroup.setLifetimeEach(-1);  

    if(keyDown("space")){
      reset();   
       } 
  
 }
 
  monkey.collide(invisibleLawn);

  drawSprites();

  textSize(20);
  fill("black");
  text("survival Time : "+ score,400,35);

}

function reset(){

  gameState = PLAY;

  monkey.changeAnimation("movingMonkey",monkey_running);

  foodGroup.destroyEach();

  stoneGroup.destroyEach();

  gameover.visible = false; 

  lawn.velocityX = -3;  

  score = 0;  

}

function bananas(){
if(frameCount % 100 === 0){
banana = createSprite(600,150,25,25);
banana.y = Math.round(random(240,500));
banana.addImage("banana",bananaImage);
banana.scale = 0.15;
banana.velocityX = -(6 + 3*score/500);
banana.lifetime = 200;
foodGroup.add(banana);

   }
}

function stones(){
if(frameCount % 200 === 0){
stone = createSprite(600,550,15,15);
stone.addImage("obstacle",stoneImage);
stone.scale = 0.15;
stone.velocityX = -(6 + 3*score/500);
stone.lifetime = 200;
stone.debug = false;
stone.setCollider("rectangle",0,0,400,400);
stoneGroup.add(stone);

   }




}


