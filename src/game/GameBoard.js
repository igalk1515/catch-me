import React, { Component } from 'react';
import Canvas from './Canvas';
import Cards from './Cards';
import events from './events';

import './GameBoard.css';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.randomEventsTime = 7;
    this.state = {
      isGameStarted: false,
      isGameOver: false,
      time: 0,
      score: 0,
      topScore: 0,
      gamePaused: false,
      randomEvents: false,
      randomNumbers: [],
    };
  }

  startGame = (event) => {
    this.mouse = {
      x: event.clientX,
      y: event.clientY,
    };
    this.setState({ isGameStarted: true, time: 0, score: 0 }, () => {
      this.timerInterval = setInterval(this.updateTime, 1000); // Timer logic
    });
  };

  updateTime = () => {
    this.setState((prevState) => ({ time: prevState.time + 1 }));
    if (
      this.state.time !== 0 &&
      this.state.time % this.randomEventsTime === 0
    ) {
      this.genrateRandomEvents();
    }
  };

  endGame = () => {
    clearInterval(this.gameInterval);
    clearInterval(this.timerInterval);
    this.setState({
      isGameStarted: false,
      isGameOver: true,
      topScore: Math.max(this.state.topScore, this.state.time),
      time: 0,
    });
    this.randomEventsTime = 10;
    events.resetEvents();
  };

  genrateRandomEvents = () => {
    this.pauseGame();
    this.setState({ randomEvents: true });
  };

  pauseGame = () => {
    clearInterval(this.gameInterval);
    clearInterval(this.timerInterval);
    this.setState({ gamePaused: true });
  };

  resumeGame = () => {
    this.gameInterval = setInterval(this.updateGame, 1000 / 60);
    this.timerInterval = setInterval(this.updateTime, 1000);
    this.setState({ gamePaused: false });
  };

  choosenCard = (card) => {
    this.setState({ randomEvents: false });
    this.resumeGame();
  };

  render() {
    return (
      <div className="game-board">
        {!this.state.isGameStarted && (
          <div className="backGroundCanva">
            <button className="startGame" onClick={this.startGame}>
              Start Game
            </button>
            {this.state.isGameOver && <h2 className="GameOver">Game Over</h2>}
            <div className="TopScore">Top Score: {this.state.topScore}</div>
          </div>
        )}
        {this.state.isGameStarted && (
          <div>
            {this.state.randomEvents && (
              <Cards randomEventsChosen={this.choosenCard} />
            )}
            <div className="TopScore">Time: {this.state.time}</div>
            <Canvas
              gamePaused={this.state.gamePaused}
              time={this.state.time}
              mouse={this.mouse}
              endGame={this.endGame}
            />
          </div>
        )}
      </div>
    );
  }
}

export default GameBoard;
