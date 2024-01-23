import React, { Component } from 'react';
import events from './events';

import './Cards.css';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomCards: [],
      chosenCard: null,
      title: '',
    };
  }

  componentDidMount() {
    // rnadom 2 cards
    const randomEvents = [];
    while (randomEvents.length < 2) {
      let num = Math.floor(Math.random() * 6) + 1;
      if (!randomEvents.includes(num) && !(num === 6 && events.isBorderLess)) {
        randomEvents.push(num);
      }
    }
    this.setState({ randomCards: randomEvents });
  }

  componentWillUnmount() {
    this.setState({ randomCards: [] });
  }

  choseRandomCard = (num) => {
    events.chooseEvent(num);
    this.setState({ chosenCard: num, title: events.getTitle(num) });
  };

  render() {
    return (
      <div className="Cards">
        {!this.state.chosenCard &&
          this.state.randomCards.map((card) => (
            <div key={card} className="Card">
              <button
                className="CardButton"
                onClick={() => this.choseRandomCard(card)}
              >
                <h2>?</h2>
              </button>
            </div>
          ))}
        {this.state.chosenCard !== null && (
          <div
            className="CardButton"
            onClick={() => {
              this.props.randomEventsChosen();
            }}
          >
            <h2>{this.state.title}</h2>
          </div>
        )}
      </div>
    );
  }
}

export default Cards;
