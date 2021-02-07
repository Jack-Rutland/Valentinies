//ENUMERATED TYPE
var stamp = {
  GLITTER: -3,
  STICKER: -2,
  BRUSH: -1,
  RECTANGLE: 0,
  CIRCLE: 1,
  HEART: 2
};

//GOBAL VARIABLES
var cardNum = 0;
var col = "#000000";
var id = stamp.HEART;
var storeId = 2;
var textId = 0;
var cnv = [];
var brush_active = 1;
var current_stroke = [];
var stickers = [];
var sticker_index = 0;
const GLITTER_RADIUS = 50



//PROTOTYPES
function Stamp(xPos, yPos, type, color) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.type = type;
  this.color = color;
}

function Point(xPos, yPos) {
  this.xPos = xPos;
  this.yPos = yPos;
}

//Regenerates the places objects on the canvas
function regenCNV() {
  var arrayLength = cnv.length;
  for (var i = 0; i < arrayLength; i++) {
    fill(cnv[i].color);
    switch (cnv[i].type) {
      case stamp.RECTANGLE:
        rect(cnv[i].xPos, cnv[i].yPos, 20, 20);
        break;
      case stamp.CIRCLE:
        ellipse(cnv[i].xPos, cnv[i].yPos, 20, 20);
        break;
      case stamp.HEART:
        heart(cnv[i].xPos, cnv[i].yPos - 7, 20);
        break;
      case stamp.STICKER:
        console.log(cnv[i]);
        image(
          stickers[cnv[i].image_id],
          cnv[i].xPos,
          cnv[i].yPos,
          stickers[cnv[i].image_id].width * 0.2,
          stickers[cnv[i].image_id].height * 0.2
        );
        
        break;
        
        case stamp.GLITTER:
        this_color = color(cnv[i].color);
          fill(this_color);
            for (var j = 0; j < cnv[i].cluster.length; j++) {
              if(Math.floor(Math.random() * 100) > 95) {
              this_color.setAlpha(Math.floor(Math.random() * 255));
              }
              fill(this_color);
            ellipse(cnv[i].xPos+cnv[i].cluster[j].xPos, cnv[i].yPos+cnv[i].cluster[j].yPos, 5 ,5);
              this_color.setAlpha(255);
            }
            fill("#000000");
            break;
        
      case stamp.BRUSH:
        stroke(cnv[i].color);
        if (cnv[i].stroke.length < 1) {
          break;
        }
        var px = cnv[i].stroke[0].xPos;
        var py = cnv[i].stroke[0].yPos;

        for (var j = 1; j < cnv[i].stroke.length; j++) {
          var x = cnv[i].stroke[j].xPos;
          var y = cnv[i].stroke[j].yPos;

          strokeWeight(15);
          line(x, y, px, py);

          px = x;
          py = y;
        }
        strokeWeight(1);
        stroke("#000000");

        break;
      default:
        console.log("Joe Time");
    }
    fill(col);
  }
  if (brush_active == 1 && current_stroke.length > 1 && id == -1) {
    //RENDER CURRENT STROKE
    stroke(col);
    var px = current_stroke[0].xPos;
    var py = current_stroke[0].yPos;

    for (var j = 1; j < current_stroke.length; j++) {
      var x = current_stroke[j].xPos;
      var y = current_stroke[j].yPos;

      strokeWeight(15);
      line(x, y, px, py);

      px = x;
      py = y;
    }
    strokeWeight(1);
    stroke("#000000");
  }
  /*switch(obj.type) {
      case stamp.RECTANGLE :
        rect(obj.xPos, obj.yPos, 100, 100);
        break;
      default :
        console.log("ERROR : CONTACT JOE");
        console.log(obj.type);
      }
      */
}


function setup() {
  
  loveisawesome = loadFont("https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2FLove%20is%20Awesome%202%20-%20TTF.ttf?v=1612685050885");
  ladybuglove = loadFont("https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2FLadybug%20Love%20-%20TTF.ttf?v=1612685274034");
  sunflower = loadFont("https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2FMADE%20Sunflower%20PERSONAL%20USE.otf?v=1612691673870");
  var audio = new Audio(
    "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2FAirpod%20shoty.mp3?v=1612671204361"
  );
  //audio.play();
  stickerDino = loadImage(
    "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fdino_sticker.png?v=1612670923327"
  );
  stickers.push(stickerDino);
  stickerBee = loadImage(
    "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fbee_sticker.png?v=1612678228394"
  );
  stickers.push(stickerBee);
  
  stickerCat = loadImage(
    "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fclipart-cat-valentine.png?v=1612707584288"
  );
  stickers.push(stickerCat);
  
  stickerSweet = loadImage(
    "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fsweetheart.png?v=1612682340280"
  );
  stickers.push(stickerSweet);
  
  stickerTeddy = loadImage(
    "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fteddy-bear.png?v=1612682585574"
  );
  stickers.push(stickerTeddy);
  
  card0 = loadImage(
    "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fcard2.2.png?v=1612707244693"
  );
  card1 = loadImage(
    "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fcard%203.png?v=1612669439705"
  );
  card2 = loadImage(
    "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fanotherone.2.png?v=1612707281193"
  );
  canvas = createCanvas(windowWidth - 400, windowHeight - 150);
  canvas.mouseClicked(canvasClicked);
  canvas.mouseReleased(canvasReleased);
  refreshShapeIMG(id);
  refreshStickerIMG(sticker_index);
  rectMode(CENTER);
  noCursor();
  //background(220);
  //ENVIRONMENT VARIABLES
INNIT_WIDTH = windowWidth;
INNIT_HEIGHT = windowHeight;
}

function draw() {
  background(255);
  displayCard();
  displayText();
  fill(col);
  stroke("black");
  regenCNV();
  switch (id) {
    case stamp.RECTANGLE:
      rect(mouseX, mouseY, 20, 20);
      break;
    case stamp.CIRCLE:
      ellipse(mouseX, mouseY, 20, 20);
      break;
    case stamp.HEART:
      heart(mouseX, mouseY - 7, 20);
      break;
    case stamp.STICKER:
      image(stickers[sticker_index], mouseX, mouseY,stickers[sticker_index].width * 0.2, stickers[sticker_index].height * 0.2);
      break;
    case stamp.BRUSH:
      fill("#000000");
      ellipse(mouseX, mouseY, 10, 10);
      fill("#ffffff");
      break;
    case stamp.GLITTER:
      indicate = color("#000000");
      indicate.setAlpha(0);
      fill(indicate);
      ellipse(mouseX, mouseY, GLITTER_RADIUS*2, GLITTER_RADIUS*2);
    default:
      console.log("call joe");
  }
}

function canvasClicked() {
  
  if (id == stamp.BRUSH) {
    //IF brush, set brush to being active
    brush_active = 1;
  } 
  else if (id == stamp.STICKER) {
    //Push an object where color is equal to the sticker_index
    let obj = new Stamp(mouseX, mouseY, id, sticker_index);
    obj.image_id = sticker_index;
    cnv.push(obj);
    console.log(obj.image_id);
  } 
  else if(id == stamp.GLITTER) {
    let obj = new Stamp(mouseX, mouseY, id, col);
    obj.cluster = generateCluster();
    cnv.push(obj);
  }
  else {
    let obj = new Stamp(mouseX, mouseY, id, col);
    cnv.push(obj);
  }
}

function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function shapeLeft() {
  if (storeId > 0) {
    storeId--;
    id = storeId;
  } else {
    id = 2;
    storeId = 2;
  }
  refreshShapeIMG(id);
}

function shapeRight() {
  if (storeId < 2) {
    storeId++;
    id = storeId;
  } else{
    id = 0;
    storeId = 0;
  }
  refreshShapeIMG(id);
}

function shapeStored(){
  id = storeId;
}


function refreshShapeIMG(id) {
  switch (id) {
    case 0:
      document.getElementById("shape-button-main").src =
        "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fsquare2fix.png?v=1612658921210";
      //document.getElementById("shape-button").onclick=changeShape(1);
      break;
    case 1:
      document.getElementById("shape-button-main").src =
        "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fcircle2fix.png?v=1612658830130";
      break;
    case 2:
      document.getElementById("shape-button-main").src =
        "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fheart2fix.png?v=1612658591865)";
      break;
    default:
  }
}

function colorPick(x) {
  col = x;
  current_stroke = [];
}

function cardPick(x) {
  cardNum = x;
}

function textLeft(){
  if(textId > 0)
    textId--;
  else textId = 3;
}

function textRight(){
  if(textId < 3)
    textId++;
  else textId = 0;
}

function displayCard() {
  imageMode(CENTER);
  switch (cardNum) {
    case 0:
      image(
        card0,
        width / 2,
        height / 2,
        card0.width / 1.1,
        card0.height / 1.1
      );
      break;
    case 1:
      image(
        card1,
        width / 2,
        height / 2,
        card1.width / 1.25,
        card1.height / 1.25
      );
      break;
    case 2:
      image(
        card2,
        width / 2,
        height / 2,
        card1.width / 1.25,
        card1.height / 1.25
      );
      break;
    default:
  }
}

function displayText(){
  if(cardNum == 2){
    displayTextWeird();
    return;
  }
  switch(textId){
    case 0:
      break;
    case 1:
      fill('#ffffff');
      textFont(loveisawesome);
      textAlign(CENTER);
      textSize(100);
      text('Be\nMine', width/2 - 7, height/2 - 25);
      break;
    case 2:
      fill('#ffffff');
      textFont(ladybuglove);
      textAlign(CENTER);
      textSize(100);
      text('I\nLove\nYou', width/2, height/2 - 80);
      break;
    case 3:
      fill('#ffffff');
      textFont(sunflower);
      textAlign(CENTER);
      textSize(100);
      text('XOXO', width/2, height/2 + 20);
      break;
    default:
      console.log("who's joe?");
  }
}

function displayTextWeird(){
  switch(textId){
    case 0:
      break;
    case 1:
      fill('#ffffff');
      textFont(loveisawesome);
      textAlign(CENTER);
      textSize(75);
      rotate(PI / 6.3);
      text('Be\nMine', 1120, -18);
      rotate(-PI / 6.3);
      break;
    case 2:
      fill('#ffffff');
      textFont(ladybuglove);
      textAlign(CENTER);
      textSize(50);
      rotate(PI / 6.3);
      text('I\nLove\nYou', 1126, -38);
      rotate(-PI / 6.3);
      break;
    case 3:
      fill('#ffffff');
      textFont(sunflower);
      textAlign(CENTER);
      textSize(75);
      rotate(PI / 6.3);
      text('XOXO', 1132, +15);
      rotate(-PI / 6.3);
      break;
    default:
      console.log("who's joe?");
  }
}

//Some stuff that doesn't affect the p5

function saveToFile() {
  save("Valentine.png");
  console.log(INNIT_WIDTH);
  resizeCanvas(INNIT_WIDTH - 425, INNIT_HEIGHT - 150);
}

function mouseWheel() {
  var audio = new Audio(
    "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fvoice_sans.mp3?v=1612653079173"
  );
  audio.play();
}

function undoLast() {
  var prev_len = cnv.length;
  cnv.pop();
  current_stroke = [];
}

function windowResized() {
  resizeCanvas(INNIT_WIDTH - 425, INNIT_HEIGHT - 150);
}

function brushSelect() {
  id = stamp.BRUSH;
  brush_active = 1;
  current_stroke = [];
}

function mouseDragged() {
  if (brush_active == 1) {
    let obj = new Point(mouseX, mouseY);
    current_stroke.push(obj);
  }
}

function canvasReleased() {
  if (brush_active == 1) {
    brush_active = 0;
    let obj = new Stamp(mouseX, mouseY, id, col);
    obj.stroke = current_stroke;
    cnv.push(obj);

    current_stroke = [];
  }
}

function mouseReleased() {
  current_stroke = [];
}

/*
function mousePressed() {
  if(id==-1) {
    brush_active = 1
  }
}
*/

function clearCanvas() {
  cnv = [];
  current_stroke = [];
}

function changeSticker() {
  id = stamp.STICKER;
  brush_active = 0;
}

function stickerLeft() {
  if (sticker_index <= 0) {
    sticker_index = stickers.length - 1;
  } else {
    sticker_index--;
  }
  id = -2;
  refreshStickerIMG(sticker_index);
  brush_active = 0;
}

function stickerRight() {
  if (sticker_index >= stickers.length - 1) {
    sticker_index = 0;
  } else {
    sticker_index++;
  }
  id = -2;
  refreshStickerIMG(sticker_index);
  brush_active = 0;
}

function refreshStickerIMG(sticker_index) {
  
  switch (sticker_index) {
    case 0:
      document.getElementById("stickerIMG").src =
        "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fdino_sticker.png?v=1612670923327";
      break;
    case 1:
      document.getElementById("stickerIMG").src =
        "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fbee_sticker.png?v=1612678228394";
      break;
    case 2:
      document.getElementById("stickerIMG").src =
        "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fclipart-cat-valentine.png?v=1612707584288";
      break;
    case 3:
    document.getElementById("stickerIMG").src =
      "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fsweetheart.png?v=1612682340280";
    break;
    case 4:
    document.getElementById("stickerIMG").src =
      "https://cdn.glitch.com/a6bf3e63-d142-445c-a955-2201d478e4cf%2Fteddy-bear.png?v=1612682585574";
    break;
    default:
  }
}


function activateGlitter() {
  id = stamp.GLITTER;
  brush_active = 0;
}

function generateCluster() {
  var cluster = [];
  
  for(var i = 0; i < 15; i++) {
    let x = Math.floor(Math.random() * GLITTER_RADIUS * 2) - GLITTER_RADIUS;
    yMax = Math.sqrt((GLITTER_RADIUS*GLITTER_RADIUS) - (x*x));
    let y = Math.floor(Math.random() * yMax * 2) - yMax;
    cluster.push(new Point(x,y));
  }
  
  
  return cluster;
}