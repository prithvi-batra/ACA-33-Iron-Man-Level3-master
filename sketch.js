var bg, backgroundImg ;
var stone ;
var stoneGroup;
var diamondGroup;
var diamondCollected = 0;
function preload() {
  bgAnimation  = loadAnimation("images/bg.jpg","images/bg.jpg","images/bg.jpg");
  ironImg      = loadImage("images/iron.png");
  stoneImage   = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
}

function setup() {
  createCanvas(1000, 500);
  bg   = createSprite(300,300,300,300);
  iron = createSprite(100,450);
  bg.addAnimation("bgAnimation",bgAnimation);
  bg.scale = 2;
  iron.addImage(ironImg);
  iron.scale = 0.3;
  bg.velocityY = 4;
  edges=createEdgeSprites();
  stoneGroup   = new Group();
  diamondGroup = new Group();
}

function draw() {
  background('black');  
  iron.bounceOff(edges[0]);
  iron.bounceOff(edges[1]);
  iron.bounceOff(edges[2]);
  iron.bounceOff(edges[3]);
  iron.debug = true;
  if(bg.y > 750 ){
    bg.y = 0;
  }
  if (keyDown("up")){
    iron.y = iron.y -18 ;
  }
  if (keyDown("down")){
    iron.y = iron.y +18 ;
  }
  if (keyDown("left")){
    iron.x = iron.x -18 ;
  }
  if (keyDown("right")){
    iron.x = iron.x +18 ;
  }
  for( var i = 0 ; i<stoneGroup.length; i++){
    var temp = (stoneGroup).get(i);
    if(temp.isTouching(iron)){
        iron.collide(temp);
    }
}
  iron.setCollider("rectangle",100,-60,180,400);
  for(var i = 0 ; i<diamondGroup.length ; i++){
    var temp = (diamondGroup).get(i);
    if(temp.isTouching(iron)){
      diamondCollected ++;
      temp.destroy();
    }
  }
  generateDiamonds();
  generateStones();
  drawSprites();   
  textSize(20);
  stroke("#fff");
  text("diamonds Collected : " + diamondCollected,730,50);
}
function generateStones(){
  if(frameCount%100 == 0){
    stone = createSprite(random(150,1000),0,40,10);
    stone.addImage(stoneImage)
    stone.scale = 0.6;
    stone.velocityY = 4;
    stone.lifetime = 350;
    stoneGroup.add(stone);
  }
}
function generateDiamonds(){
  if(frameCount%40 == 0){
    diamond = createSprite(random(150,1000),0,40,10);
    diamond.addImage(diamondImage);
    diamond.scale = 0.5;
    diamond.velocityY = 4;
    diamond.lifetime = 350;
    diamondGroup.add(diamond);
  }
} 
