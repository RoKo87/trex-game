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
  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
  trex = createSprite((50/600)*width,(160/200)*height);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("youdied", trexoof)
  trex.scale = 0.5;
  pt = 1;
  
  //create a ground sprite
  ground = createSprite((1/3)*width,(9/10)*height,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  
  
  //creating invisible ground
  invisibleGround = createSprite(0,(9/10)*height,width,10);
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
    if((keyDown("space") || touches.length > 0) && trex.y >= 0.8 * height) {
      trex.velocityY = -10;
      jump.play();
      touches = []
    }
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();
    obs();
    if(og.isTouching(trex)) {
      gameState = END; 
      lose.play();
    }
    fill("white")
    textSize((12.5/200)*height)
    text("Score: " + Math.round(pt), 45, (40/200)*height);
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
    textSize((12.5/200)*height)
    text("Score: " + Math.round(pt), 45, (40/200)*height);
    cg.setLifetimeEach(14292);
    og.setLifetimeEach(12044);
    text("Game over!", 400, (60/200)*height);
    textSize((15/200)*height);
    text("Press r to restart", 350, (80/200)*height);
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
  textSize((7.5/200)*height);
  text("High score: " + Math.round(hs), 45, (25/200)*height);
  textSize((5/200)*height);
  text("Press h to reset high score", 50, (15/200)*height);
}
 
  
  


//function to spawn the clouds
function spawnClouds(){
  background("green")
  if (frameCount % 88 === 0) {
    cloud = createSprite(655,64,56,6);
    cloud.addImage(cloudi)
    cloud.velocityX = -2;
    cloud.lifetime = 327.5;
    cloud.y = Math.round(random((1/4)*height), (1/2)*height);
    cloud.depth = trex.depth;
    cg.add(cloud);
    trex.depth = trex.depth + 1;
  
  }
}

function obs() {
  if (frameCount % 92 === 0) {
    obstacle = createSprite(width,(9/10)*height,75,43)
    obstacle.velocityX = -6;
    obstacle.y = 0.87*height;
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
    obstacle.lifetime = (width/6)+10;
    og.add(obstacle);
  }
}
