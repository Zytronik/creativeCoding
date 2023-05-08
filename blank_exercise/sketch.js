let fColor = 0;
let rotation = 0;
let scale;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(51);
  rectMode(CENTER);
  colorMode(HSB);
}

let opacity = 0.2;
let colorValue = [0,0,0];
window.onload = function () {
  let slider = document.querySelector("#opacityRange");
  slider.oninput = function () {
      opacity = this.value;
  }
  let colorPicker = document.querySelector("#colorPicker");
  colorPicker.addEventListener("change", (e)=>{
    colorValue = hexTorgb(e.target.value);
  }); 
};

function hexTorgb(hex) {
  return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}

function draw() {
  background('rgba('+colorValue[0]+', '+colorValue[1]+', '+colorValue[2]+', '+opacity+')');
  if (fColor < 255) {
    fColor++;
  } else {
    fColor = 0;
  }
  fill(fColor, 255, 255);

  let x = mouseX;
  let y = mouseY;

  if(rotation < 360){
    rotation = rotation + 0.1;
  }else{
    rotation = 0;
  }

  translate(x, y);
  push();
  rotate(rotation);
  scale = random(75, 115)
  rect(0, 0, scale, scale);
  pop();
}