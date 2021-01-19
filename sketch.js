var tower, tower_img, door, door_img, climber, climber_img,invisible,invisibleGroup,score = 0, sound;
var ghost, ghostImg;

var climberGroup;

var gameState = "play";

function preload(){
  tower_img =loadImage("tower.png");
  door_img = loadImage("door.png");
  climber_img = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  sound = loadSound("spooky.wav")
}
function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,600,600);
  tower.addImage(tower_img);
  tower.velocityY = 1;
  
    ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  
  climberGroup = new Group();
  invisibleGroup = new Group();
}
function draw(){
  background("black");
  
 // sound.loop(); 
  
  if(gameState === "play"){
     if(tower.y > 400){
     tower.y = 300;
  }
    
    score = score + 0.1
  
  if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8  
    
     doorF();
 
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(ghost.isTouching(invisibleGroup) || ghost.y >600){
    ghost.destroy();
    gameState = "end";
  }
  
  drawSprites();
  }
  
 if(gameState === "end"){
   fill("red")
   stroke("yellow")
   textSize(30)
  text("Game Over",230,250)
   
   textSize(20);
   text("Score:"+Math.round(score), 500,50)

 }
 
 
  
}

function doorF(){
  if(frameCount % 250 === 0){
    door = createSprite(Math.round(random(100,400)),-50,50,50)
    door.addImage(door_img);
    door.velocityY = 2;
    door.lifetime = 300;
    
     
  ghost.depth = door.depth;
  ghost.depth = door.depth + 1;       
    
    climber = createSprite(door.x,10,50,50);
      climber.addImage(climber_img);
    climber.velocityY = 2;
    climber.lifetime = 300;
    climberGroup.add(climber);
    
     invisible = createSprite(door.x,15,climber.width,3 );
    invisible.velocityY = 2;
    invisible.lifetime = 300;
    invisibleGroup.add(invisible);   
    invisibleGroup.setVisibleEach(false);
  }
  
}

                  