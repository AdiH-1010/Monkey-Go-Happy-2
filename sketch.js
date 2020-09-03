//creating variables
var backImage,backgr;
var monkey, monkey_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;


function preload(){
  //loading images
  backImage=loadImage("jungle.png");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

 bananaImage = loadImage("banana.png");
 obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  //making the variables
  ground = createSprite(400,377.5,1600,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
 
  backgr = createSprite(325, 200, 800, 400);
  backgr.addImage("background", backImage);
  backgr.scale = 3.25;
  backgr.velocityX = -3;
  backgr.x=backgr.width/2;
  
  monkey = createSprite(100, 315);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
}

function draw() {
  if(backgr.x < 100){
    backgr.x=backgr.width/2;
  }
  
  if(ground.x < 100){
    ground.x=ground.width/2;
  }
  
  if(FoodGroup.isTouching(monkey)){
    score = score + 2;
    FoodGroup.destroyEach();
  } 
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.1;
    score = 0;
  } 
  
  switch(score){
      case 10: monkey.scale = 0.12;
        break;
      case 20: monkey.scale = 0.14;
        break;
      case 30: monkey.scale = 0.16;
        break;
      case 40: monkey.scale = 0.18;
        break;
      default: break;
  }    
      
  monkey.collide(ground);
  
  if(keyDown("space") && monkey.y >= 314){
    monkey.velocityY = -16;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  food();
  obstacle();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score, 500, 50);
}

function food() {
  if(frameCount % 80 === 0){
    var food = createSprite(825, 125, 10, 10);
    food.y = Math.round(random(120, 200));
    food.addImage("banana", bananaImage);
    food.scale = 0.05;
    food.velocityX = -5;
    food.lifetime = 170;
    FoodGroup.add(food);
    } 
} 

function obstacle() {
  if(frameCount % 300 === 0){
    var rock = createSprite(825, 335, 10, 10);
    rock.addImage("rock", obstacle_img);
    rock.scale = 0.15;
    rock.velocityX = -5;
    rock.lifetime = "170";
    rock.setCollider("rectangle", 0, 0, 100, 100);
    obstaclesGroup.add(rock);
  }
}