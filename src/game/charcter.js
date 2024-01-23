import events from './events';

class Character {
  constructor(x, y, size, color, speed, ctx, mouse) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = speed;
    this.ctx = ctx;
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
    this.inJump = false;
    this.intervalTime = 1500;
    this.isOver = false;
    this.mouseX = mouse.x;
    this.mouseY = mouse.y;
  }

  setMousePosition = (mouseX, mouseY) => {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    if (this.score === 0) {
      this.jumpTowardsMouse();
    }
  };

  jumpTowardsMouse = () => {
    if (this.isPaused) {
      return;
    }
    if (!this.inJump) {
      this.score++;
      let angle = Math.atan2(this.mouseY - this.y, this.mouseX - this.x);
      this.dx = Math.cos(angle) * this.speed;
      this.dy = Math.sin(angle) * this.speed;
      this.implyEvent(events.getEvent());
      this.inJump = true;
    }
  };

  move = () => {
    if (this.inJump) {
      this.x += this.dx;
      this.y += this.dy;
    }
    this.handleCollision();
  };

  handleCollision = () => {
    if (
      this.x < 0 ||
      this.x + this.size > this.ctx.canvas.width ||
      this.y < 0 ||
      this.y + this.size > this.ctx.canvas.height
    ) {
      this.dx = 0;
      this.dy = 0;
      this.inJump = false;
      this.x = Math.max(0, Math.min(this.x, this.ctx.canvas.width - this.size));
      this.y = Math.max(
        0,
        Math.min(this.y, this.ctx.canvas.height - this.size)
      );

      setTimeout(this.jumpTowardsMouse, this.intervalTime);
    }

    if (
      (this.mouseX > this.x &&
        this.mouseX < this.x + this.size &&
        this.mouseY > this.y &&
        this.mouseY < this.y + this.size) ||
      (this.x === this.mouseX && this.y === this.mouseY)
    ) {
      this.collision();
    }
  };

  collision = () => {
    this.charcterPause();
    this.isOver = true;
  };

  update = () => {
    this.move();
    this.draw();
  };

  draw = () => {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    !events.isBorderLess &&
      this.ctx.strokeRect(this.x, this.y, this.size, this.size);
  };

  charcterPause = () => {
    this.inJump = false;
    this.isPaused = true;
  };

  charcterResume = () => {
    this.isPaused = false;
    this.dx = 0;
    this.dy = 0;
    this.inJump = false;
    this.jumpTowardsMouse();
  };

  implyEvent = (event) => {
    switch (event) {
      case 'speedUp':
        this.speedUp();
        break;
      case 'shorterInterval':
        this.shorterInterval();
        break;
      case 'increaseSize':
        this.increaseSize();
        break;
      case 'decreaseSize':
        this.decreaseSize();
        break;
      case 'colorParty':
        this.colorParty2();
        break;
      case 'growHands':
        this.growHands();
        break;
      case 'borderLess':
        this.borderLess();
        break;
      default:
        break;
    }
  };

  speedUp = () => {
    this.speed += 1.5;
  };

  shorterInterval = () => {
    if (this.intervalTime <= 100) {
      return;
    }
    this.intervalTime -= 100;
  };

  increaseSize = () => {
    this.size += 5;
  };

  decreaseSize = () => {
    this.ctx.canvas.width -= 5;
  };

  colorParty = () => {
    this.color = this.getRandomColor();
  };

  growHands = () => {
    this.size += 1;
  };

  borderLess = () => {
    this.isBorderLess = true;
    events.isBorderLess = true;
  };

  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i <= 5; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  colorParty2 = () => {
    this.color = this.getRandomColor();
    this.ctx.canvas.style.backgroundColor = this.getRandomColor();
  };
}

export default Character;
