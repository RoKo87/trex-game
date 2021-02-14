var trex, trex_running, trexoof;
var ground, invisibleGround, groundImage;
var cloud, cloudi, cg;
var rn;
var pt;
var obstacle, og;
var i1, i2, i3, i4, i5, i6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jump, lose, wee;
var hs = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trexoof = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudi = loadImage("cloud.png")
  i1 = loadImage("obstacle1.png")
  i2 = loadImage("obstacle2.png")
  i3 = loadImage("obstacle3.png")
  i4 = loadImage("obstacle4.png")
  i5 = loadImage("obstacle5.png")
  i6 = loadImage("obstacle6.png")
  jump = loadSound("Recording (19).mp3")
  lose = loadSound("loose aaaaaaaaaaaaaaaaa.mp3")
  wee = loadSound("jekeiowai.mp3")
 
  
}

function setup() {
  background("green")
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("youdied", trexoof)
  trex.scale = 0.5;
  pt = 1;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cg = new Group();
  og = new Group();
  trex.setCollider("circle", 0, 5, 35);
  trex.debug=false;
  

  

}

function draw() {
  //set background color
  background("green");
 
  
  
  //score
  if (gameState === PLAY) {
    ground.velocityX = -4;
    if (frameCount % 3 === 0) {
      pt = (pt * 1.005) + 1
      //background info
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
      jump.play();
    }
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();
    obs();
    if(og.isTouching(trex)) {
      gameState = END; 
      lose.play();
    }
    fill("white")
    textSize(25)
    text("Score: " + Math.round(pt), 45, 45);
    if (pt % 300 < (pt/200)) {
      wee.play();
    }
  }
  else if (gameState === END) { 
    ground.velocityX = 0;
    trex.changeAnimation("youdied");
    og.setVelocityXEach(0);
    cg.setVelocityXEach(0);
    trex.velocityY=0;
    fill("white")
    textSize(25)
    text("Score: " + Math.round(pt), 45, 45);
    cg.setLifetimeEach(14292);
    og.setLifetimeEach(12044);
    text("Game over!", 400, 50);
    textSize(15);
    text("Press r to restart", 350, 100);
    if(keyDown("r")) {
      gameState = PLAY;
      og.x = 600;
      trex.changeAnimation("running");
      pt = 1;
      cg.setVelocityXEach(-2);
      og.setVelocityXEach(-6);
      trex.y = 0;
      og.destroyEach(); 
    }
  }
  trex.collide(invisibleGround);
  drawSprites();
  if (gameState === PLAY) {
    if (hs < pt) {
    hs = pt;
  }
  }
  if(keyWentDown("h")) {
   hs = 0;
  }
  textSize(15);
  text("High score: " + Math.round(hs), 45, 25);
  textSize(10);
  text("Press h to reset high score", 155, 15);
}
 
  
  


//function to spawn the clouds
function spawnClouds(){
  background("green")
  if (frameCount % 88 === 0) {
    cloud = createSprite(655,64,56,6);
    cloud.addImage(cloudi)
    cloud.velocityX = -2;
    cloud.lifetime = 327.5;
    cloud.y = Math.round(random(1, 100))
    cloud.depth = trex.depth;
    cg.add(cloud);
    trex.depth = trex.depth + 1;
  
  }
}

function obs() {
  if (frameCount % 92 === 0) {
    obstacle = createSprite(600,40,75,43)
    obstacle.velocityX = -6;
    obstacle.y = 160;
    var e = Math.round(random(1, 6));
    switch(e){
      case 1: obstacle.addImage(i1);
              break;
      case 2: obstacle.addImage(i2);
              break;
      case 3: obstacle.addImage(i3);
              break;
      case 4: obstacle.addImage(i4);
              break;
      case 5: obstacle.addImage(i5);
              break;
      case 6: obstacle.addImage(i6);
              break;
              default: break;
        
    }
    obstacle.scale = 0.7;
    obstacle.lifetime = 100;
    og.add(obstacle);
  }
}