var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var bars = document.getElementById("barNums").value;
var speed = document.getElementById("AleguasIV").value;
if (bars == 0 || bars == null) bars = 10;
if (speed < 20 || speed == null) speed = 20;

var arr = new Array(bars);
var sorted = new Array(bars);
for (let x = 0; x < bars; x++) {
  arr[x] = Math.floor(Math.random() * 50);
}
var winLen = 500;
var winWidth = 500;
var determinentX = ~~(winLen / arr.length);
var determinentY = ~~(winWidth / Math.max.apply(null, arr));
var run = false;
var c = arr.length;
var done = false;
var increment = ~~(255/arr.length);

function setup() {
  bars = document.getElementById("barNums").value;
  speed = document.getElementById("AleguasIV").value;
  if (bars == 0 || bars == null) bars = 10;
  if (speed < 20 || speed == null) speed = 20;
  arr = new Array(bars);
  sorted = new Array(bars);
  for (let x = 0; x < bars; x++) {
    arr[x] = Math.floor(Math.random() * 250);
    sorted[x] = arr[x];
  }
  sorted.sort();
  winLen = 500;
  winWidth = 500;
  determinentX = ~~(winLen / arr.length);
  determinentY = ~~(winWidth / Math.max.apply(null, arr));
  run = true; 
  done = false;
  c = arr.length * arr.length;
  
}

function goBubble() {
  if (!run) setup();
  speed = document.getElementById("AleguasIV").value;
  if (speed < 20 || speed == null) speed = 20;
  startDraw();
  bubbleSort();
  if (!done)
  {
    setTimeout(goBubble, 5000000/(speed*speed*arr.length));
    buttonsHidden("hidden");
  }
  else
  {
    buttonsHidden("visible");
  }
}
function buttonsHidden(status)
{
  var i = document.getElementsByClassName("goaway");
  if(status == i[0].style.visibility)
    return;
  for(var n in i)
    i[n].style.visibility = status;
  buttonChecker = false;
}

function goSelection() {
  if (!run) setup();
  speed = document.getElementById("AleguasIV").value;
  if (speed < 20 || speed == null) speed = 20;
  startDraw();
  selectionSort();
  if (!done)
  {
    setTimeout(goBubble, 5000000/(speed*speed*arr.length));
    buttonsHidden("hidden");
  }
  else
  {
    buttonsHidden("visible");
  }
}

function startDraw() { 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < arr.length; i++)
  {
    ctx.beginPath();
    ctx.moveTo(i * determinentX, winWidth - arr[i] * determinentY); //top left
    ctx.lineTo((i + 1) * determinentX, winWidth - arr[i] * determinentY); // top right
    ctx.lineTo((i + 1) * determinentX, winWidth);// bottom right
    ctx.lineTo(i * determinentX, winWidth);// bottom left
    ctx.lineTo(i * determinentX, winWidth - arr[i] * determinentY); // top left :( :( :(


    let determinentColor = 765 / Math.max.apply(null, arr);
    let blue = 0;
    let green = 0;
    let red = 0;
    let currentColVal = arr[i] * determinentColor;
    if(currentColVal >= 255)
    {
      blue = 255;
      currentColVal -= 255;
    }
    else
    {
      blue = currentColVal;
      currentColVal = 0;
    }
    if(currentColVal >= 255)
    {
      green = 255;
      currentColVal -= 255;
    }
    else
    {
      green = Math.max(0, currentColVal);
      currentColVal = 0;
    }
    red = Math.max(0, currentColVal);
    let armand = "rgb(" + red + ", " + green + ", " + blue + ")";
    ctx.fillStyle = armand;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "cyan";
    ctx.closePath();
    ctx.fill();
  }
}

function position(x) {
  for (let i = 0; i < arr.length; i++) {
    if (sorted[i] == x) return i;
  }
  return -1;
}

function bubbleSort(){
  let len = arr.length;
  for (let i = len-1; i>=0; i--){
    for(let j = 1; j<=i; j++){
      if(arr[j-1]>arr[j]){
          let temp = arr[j-1];
          arr[j-1] = arr[j];
          arr[j] = temp;
          return;
      }
    }
  }
  run = false;
  done = true;
}

function selectionSort() {
  for(var i = 0; i < arr.length; i++) {
    var min = i;
    for(var j = i + 1; j < arr.length; j++) {
      if(arr[j] < arr[min]) {
        min = j;
      }
    }
    if(i !== min) {
      let temp = arr[min];
      arr[min] = arr[i];
      arr[i] = temp;
      return;
    }
  }
  run = false;
  done = true;
}

