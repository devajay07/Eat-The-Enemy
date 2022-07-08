let canvas = document.querySelector('canvas');
canvas.width = this.innerWidth;
canvas.height = this.innerHeight;
let c = canvas.getContext('2d');

const colorArray = [
    "rgb(233, 213, 202)",
    "rgb(130, 115, 151)",
    "rgb(77, 76, 125)",
    "rgb(54, 48, 98)"
  ]
  let pickedColor = Math.floor(Math.random()*4);
let score = document.querySelector(".score");
let sc =-1;
 const distance = (px,py,enemyx,enemyy) => {
    let ex = enemyx;
    let ey = enemyy;
    let xd = ex-px;
    let yd = ey-py;
    return Math.sqrt(Math.pow(xd,2)+ Math.pow(yd,2));
 }

let mouse = {
    x:undefined,
    y:undefined
}

addEventListener('mousemove',(event)=>{
   mouse.x = event.x;
   mouse.y = event.y;
})

function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[pickedColor];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 45, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
      };
    
    this.update = function(){
          


      if(this.x>window.innerWidth){
        this.x = 0;
        this.y = Math.random()*window.innerHeight;
        this.radius = (Math.random()*10)+15;
      }
      else if(this.x<0){
        this.x = window.innerWidth;
        this.radius =  (Math.random()*10)+15;
        this.y = Math.random()*window.innerHeight;
      }
      else if (this.y >window.innerHeight){
        this.y = 0;
        this.x = Math.random()*window.innerWidth;
        this.radius =  (Math.random()*10)+15;
      }
      else if(this.y <0)
      {
        this.y = window.innerHeight;
        this.x = Math.random()*window.innerWidth;
        this.radius =  (Math.random()*10)+15;
      }
     
        this.x += dx;
        this.y += dy;
        
       
    };
}
function Player(x,y,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 45, false);
       c.fillStyle = "black"
        c.fill();
       
        c.closePath();
      };

      this.update = function(){
         this.x = mouse.x;
         this.y = mouse.y;
        
         let originalColor;
         for(let i=0;i<circleArray.length;i++){
          originalColor = circleArray[i].color;
            let calculated = distance(this.x,this.y,circleArray[i].x,circleArray[i].y);
            if(calculated  <= this.radius + circleArray[i].radius)
            {
           
              circleArray[i].color = "red";
              if(circleArray[i].radius > 1)
              circleArray[i].radius--;
              this.radius += .1*0.35;
              if(sc<400)
              score.textContent = `Score : ${sc += 7}`;
              else if(sc>1000)
              score.textContent = `Score : ${sc += 4}`;
              else
              score.textContent = `Score : ${sc += 3}`;
              
            }
            else {
               circleArray[i].color =  colorArray[pickedColor];
            }
            if((circleArray[i].x+circleArray[i].radius - window.innerWidth >=20 || circleArray[i].x-circleArray[i].radius - window.innerWidth <= 20) && circleArray[i].radius>23){
            
             if(score>2000)
             sc -= 5;
             else if(score>10000)
             sc -= 40;
             else
                sc -=4;
                if(this.radius>50)
                this.radius -= 0.06;
                else if(this.radius>15)
                this.radius -= 0.01;
                score.textContent = `Score : ${sc}`;
          
      
              if(sc<-1000)
              {

                window.alert("Game Over");
                init();
                pickedColor = Math.floor(Math.random()*4);
              }
               
               
             }
            
            }
           
         }
         
        
      }

let circleArray;
let player;
function init(){
     circleArray =[];
     sc = 0;
      player = new Player(innerWidth/2,innerHeight/2,30);
    for(var i =0;i<10;i++){
        let radius = (Math.random()*10)+15;
        let x = Math.random() * (this.innerWidth - radius*2) + radius;
        let y = Math.random() * (this.innerHeight - radius*2) + radius;
        let dx = (Math.random() - 0.5)*3;
        let dy = (Math.random() - 0.5)*3 ;
        circleArray.push(new Circle(x,y,dx,dy,radius));
    
    }
}
init();

addEventListener('resize',function(){
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;
   init();
})
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, this.innerWidth, this.innerHeight);
    player.draw();
    player.update();
    for(var i=0;i<10;i++){
     
        circleArray[i].draw();
        circleArray[i].update();
    }
}
animate();