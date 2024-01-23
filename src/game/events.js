class events {
  static isEventChosen = false;
  static chosenEventNumber = 0;
  static isBorderLess = false;
  static events = [
    {
      id: 1,
      name: 'speedUp',
      isActive: false,
      title: 'Speed Up',
    },
    {
      id: 2,
      name: 'shorterInterval',
      isActive: false,
      title: 'no time to rest',
    },
    {
      id: 3,
      name: 'increaseSize',
      isActive: false,
      title: 'gained weight?',
    },
    {
      id: 4,
      name: 'decreaseSize',
      isActive: false,
      title: 'is it getting crowded in here?',
    },
    {
      id: 5,
      name: 'colorParty',
      isActive: false,
      title: 'get ready to party',
    },
    {
      id: 6,
      name: 'borderLess',
      isActive: false,
      title: 'border me not',
    },
    {
      id: 7,
      name: 'growHands',
      isActive: false,
      title: 'you have more hands now',
    },
  ];

  static setEventChosen = (bool) => {
    events.isEventChosen = bool;
  };

  static chooseEvent = (event) => {
    events.chosenEventNumber = event;
  };

  static getEvent = () => {
    return events.chosenEventNumber !== 0
      ? this.events[events.chosenEventNumber - 1].name
      : null;
  };

  static getTitle = (id) => {
    return events.events[id - 1].title;
  };

  static resetEvents = () => {
    events.events.forEach((event) => {
      event.isActive = false;
    });
    this.isBorderLess = false;
    this.isEventChosen = false;
    this.chosenEventNumber = 0;
  };
}

export default events;
