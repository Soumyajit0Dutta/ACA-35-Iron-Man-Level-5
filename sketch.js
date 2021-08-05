score=0;
var bg, backgroundImg;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  playerImg = loadImage("images/iron.png");
  stoneImg = loadImage("images/stone.png");
  diamondImg= loadImage("images/diamond.png");
  spikesImg=loadImage("images/spikes.png")
  stoneGroup=new Group();
  diamondGroup=new Group();
  spikesGroup=new Group();
}

function setup() {
  //creating canvas
  createCanvas(1000, 600);
  //creating background & giving velocity to background
  bg = createSprite(1000,300);
  bg.addImage(backgroundImg);
  bg.velocityX=-5;
  bg.scale=2;
  //creating player & giving velocity to player
  player=createSprite(500,500,20,40);
  player.addImage(playerImg);
  player.scale=0.3;
  player.debug=true;
  //creating ground
  ground=createSprite(500,600,1000,10)
}

function draw() {
  
  //not leeting palyer to fall down
  player.collide(ground);
  //moving player with the help of arrow keys 
  if(keyDown("up")){
    player.velocityY=-10;
  }
  if(keyDown("left")){
    player.x=player.x-5;
  }
  if(keyDown("right")){
    player.x=player.x+5;
  }
  //giving gravity to player
  player.velocityY=player.velocityY+0.5;

  if(bg.x<100)
  {
      bg.x=800;
  }
  //generating Stones
  genreateStones();
  for(var i = 0 ; i< (stoneGroup).length ;i++){
    var temp = (stoneGroup).get(i) ;
    if (player.isTouching(temp)) {
        player.collide(temp);
        temp=null;
      }   
    }
  
  //generating Diamonds 
  generateDiamonds();
  for(var i = 0 ; i< (diamondGroup).length ;i++){
    var temp = (diamondGroup).get(i) ;
    if (player.isTouching(temp)) {
      temp.destroy();  
      temp=null;
      score=score+1;
      }   
    }
  
  //generating Spikes
  generateSpikes();
  for(var i=0 ; i<(spikesGroup).length ;i++){
    var temp = (spikesGroup).get(i) ;
    if (player.isTouching(temp)) {
      temp.destroy();  
      temp=null;
      score=score-5;
      }   
  }
    drawSprites();
    //score board 
    textSize(20);
    fill("green")
    text("Your score is"+score,500,100);
}

//creating stones and giving properties
function genreateStones(){
  if (frameCount% 60 == 0){
    stone=createSprite(random(100,800),50,40,20);
    stone.velocityY=6;
    stone.addImage(stoneImg);
    stoneGroup.add(stone);
    stone.lifetime=250;
  }
}
//creating diamonds and giving properties
function generateDiamonds(){
  if(frameCount%35 == 0){
     diamond=createSprite(random(100,800),50,50,50);
     diamond.scale=0.7;
     diamond.velocityY=random(5,7);
     diamond.addImage(diamondImg);
     diamondGroup.add(diamond);
     diamond.lifetime=250;
  }
}
//creating spikes and giving properties
function generateSpikes(){
  if(frameCount%40== 0){
    spikes=createSprite(random(100,800),50,50,50);
    spikes.scale=0.6;
    spikes.velocityY=random(4,9);
    spikes.addImage(spikesImg);
    spikesGroup.add(spikes);
    spikes.lifetime=250;
  }
}