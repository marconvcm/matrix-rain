const TEXT_SIZE = 32;
const columns = [];

class Letter {
   
   constructor(x, y, speed) {
      this.value = '';
      this.x = x;
      this.y = y;
      this.speed = speed;
   }

   pick() {
      if(frameCount % round(random(2, 20)) == 0) {
         this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
      }
   }

   rain() {
      if(this.y > innerHeight) {
         this.y = -100;
      }
      this.y += this.speed;
   }

   render() {
      textSize(TEXT_SIZE);
      text(this.value, this.x, this.y);
      fill(3, 160, 98);
   }
}

class Stream {

   constructor(x) {
      this.x = x;
      this.letters = [];
      this.total = round(random(5, 30));
      this.speed = random(5, 20);
   }

   setup() {
      let y = 100;
      for (let i = 0; i < this.total; i++) {
         let letter = new Letter(this.x, y, this.speed);
         letter.pick();
         this.letters.push(letter);
         y -= TEXT_SIZE;
      }
   }

   render() {
      for (let i = 0; i < this.total; i++) {
         const letter = this.letters[i];
         letter.pick();
         letter.render();
         letter.rain();
      }
   }
}

function setup() {
   createCanvas(innerWidth, innerHeight);

   const numberOfCols = round(width / TEXT_SIZE);

   for (let i = 0; i < numberOfCols; i++) {
      let stream = new Stream(i * TEXT_SIZE);
      stream.setup();
      columns.push(stream);      
   }
}

function draw() {
   background(0, 80);
   columns.forEach(col => col.render());
}