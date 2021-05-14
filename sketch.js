var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImg,cloudGroup
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
  var obstacle,obstacleGroup
var score
var gamestate="play"
var gameOver ,goImage,restart,rImage,soundDie,soundJump,soundScore
function preload() 
{
  
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png")
  cloudImg = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  goImage = loadImage("gameOver.png")
  rImage  = loadImage("restart.png")
  soundDie = loadSound("die.mp3")
   soundScore= loadSound("checkPoint.mp3")
   soundJump = loadSound("jump.mp3")

}

function setup() 
{
  createCanvas(windowWidth , windowHeight);

  //create a trex sprite
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  //trex.debug=true
  trex.setCollider("rectangle",0,0,300,trex.height)

  //create a ground sprite
  ground = createSprite(width/2,height-70,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(width/2,height-50,600,10);
  invisibleGround.visible = false
  score=0
  cloudGroup=createGroup()
  obstacleGroup=createGroup()
  gameOver=createSprite(300,100)
  gameOver.addImage(goImage)
  gameOver.visible= false 
  gameOver.scale=0.5
  restart=createSprite(300,150)
  restart.addImage(rImage)
  restart.visible=false
  restart.scale=0.5
}

function draw() 
{
  background(160);
  text("score"+score,500,50)
 
  if(gamestate==="play")
  {
      score=score+Math.round(frameRate()/60)
    ground.velocityX = -(4+3*score/100);

         if ((keyDown("UP_ARROW")||touches.length>0)&&trex.y>=161) 
      {
        trex.velocityY = -10;
        touches=[]
       soundJump.play()
      }

      trex.velocityY = trex.velocityY + 0.8
       

      if (ground.x < 0) 
      {
        ground.x = ground.width / 2;

      }
      spawnCloud()
    spawnObstacle()
    if(trex.isTouching(obstacleGroup)) 
      {
       // gamestate="end"
       // soundDie.play()
        trex.velocityY = -10;
       soundJump.play()
      }
     if(score%100===0&&score>0){
         soundScore.play()
      }
     /* if(score%100===0&&score>0) {
        ground.velocityX=ground.velocityX-1
      }*/
  }
  if(gamestate==="end")
  {
     trex.changeAnimation("collided", trex_collided);
    ground.velocityX=0
    trex.velocityY=0
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    cloudGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    gameOver.visible= true
     restart.visible=true
    
 
  }
  if(mousePressedOver(restart)){
  reset()  
  }
  

  trex.collide(invisibleGround);

  drawSprites();
}
function reset(){
  gamestate="play"
  gameOver.visible= false
     restart.visible=false
    obstacleGroup.destroyEach()
 cloudGroup.destroyEach()
 trex.changeAnimation("running", trex_running);
  score = 0 
  
}
function spawnCloud(){
  if(frameCount%80===0){
  cloud =createSprite(width,200,30,50)
    cloud.y= Math.round(random(100,200))
  cloud.addImage(cloudImg)
  cloud.scale = 0.5
  cloud.velocityX = -2
  console.log(cloud.depth)
    cloud.depth=trex.depth
    trex.depth+=1
    cloud.lifetime = width/cloud.velocityX
    cloudGroup.add(cloud)
  }
  
}

function spawnObstacle(){
  if(frameCount%80===0){
 obstacle =createSprite(width,height-40,30,50) 
    var r = Math.round(random(1,6))
    switch(r){               
      case 1:obstacle.addImage(obstacle1);
        break;
         case 2:obstacle.addImage(obstacle2);
        break;
         case 3:obstacle.addImage(obstacle3);
        break;
         case 4:obstacle.addImage(obstacle4);
        break;
         case 5:obstacle.addImage(obstacle5);
        break;
         case 6:obstacle.addImage(obstacle6);
       break;
        default:break;
        
    }
    obstacle.scale=0.5
  obstacle.velocityX = -(4+3*score/100);            
     obstacle.lifetime = width/obstacle.velocityX
    obstacleGroup.add(obstacle)
  
  }
  
}

