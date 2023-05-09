let myImage;
let aspectRatio;
let pixels;

function preload() {
  myImage = loadImage('test.jpg');
}

function setup() {
  pixelDensity(1);
  createCanvas(window.innerHeight / 2, window.innerHeight / 2);
  aspectRatio = myImage.width / myImage.height;  
}

function draw() {
  myImage.loadPixels();
  let r = Math.floor(random(3) + 1);
  console.log(r);
  for (let i = 0; i < myImage.pixels.length; i+=r) {
    myImage.pixels[i] = random(255);
  }
  myImage.updatePixels();
  image(myImage, 0, 0, width * aspectRatio, height);
}