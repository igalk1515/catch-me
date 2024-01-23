import React, { Component } from 'react';
import Character from './charcter';

import './Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');
    this.charcter = new Character(
      0,
      0,
      50,
      'red',
      15,
      this.ctx,
      this.props.mouse
    );
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.charcter.jumpTowardsMouse();
    this.updateCanvas();
  }

  componentDidUpdate(prevProps) {
    if (this.props.gamePaused !== prevProps.gamePaused) {
      if (this.props.gamePaused) {
        this.charcter.charcterPause();
      } else if (!this.props.gamePaused) {
        this.charcter.charcterResume();
      }
    }
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.charcter = null;
  }

  handleMouseMove = (event) => {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    this.charcter.setMousePosition(mouseX, mouseY);
  };

  updateCanvas = () => {
    if (this.charcter === null || this.charcter.isOver) {
      this.props.endGame();
    } else {
      requestAnimationFrame(this.updateCanvas);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.charcter.update();
    }
  };

  render() {
    return (
      <div>
        <canvas
          className="canvas"
          ref={this.canvasRef}
          width={600}
          height={600}
        />
      </div>
    );
  }
}

export default Canvas;
