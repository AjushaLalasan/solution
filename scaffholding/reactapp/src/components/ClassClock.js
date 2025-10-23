import React, { Component } from 'react';

class ClassClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
      cities: [
        { name: 'New York', offset: -5 },
        { name: 'London', offset: 0 },
        { name: 'Tokyo', offset: 9 }
      ],
      newCityName: '',
      newCityOffset: ''
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getTimeForCity = (offset) => {
    const utc = this.state.currentTime.getTime() + (this.state.currentTime.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (offset * 3600000));
    return cityTime.toLocaleTimeString('en-US', { hour12: false });
  };

  addCity = () => {
    const { newCityName, newCityOffset, cities } = this.state;
    if (newCityName && newCityOffset !== '') {
      this.setState({
        cities: [...cities, { name: newCityName, offset: parseFloat(newCityOffset) }],
        newCityName: '',
        newCityOffset: ''
      });
    }
  };

  render() {
    const { cities, newCityName, newCityOffset } = this.state;

    return (
      <div className="clock-container">
        <h2>Class Component Clock</h2>
        <div className="time-display">
          {cities.map((city, index) => (
            <div key={index} className="city-time">
              <span className="city-name">{city.name}:</span>
              <span className="time">{this.getTimeForCity(city.offset)}</span>
            </div>
          ))}
        </div>
        <div className="add-city">
          <input
            type="text"
            placeholder="City name"
            value={newCityName}
            onChange={(e) => this.setState({ newCityName: e.target.value })}
            data-testid="city-name-input"
          />
          <input
            type="number"
            placeholder="UTC offset"
            value={newCityOffset}
            onChange={(e) => this.setState({ newCityOffset: e.target.value })}
            data-testid="city-offset-input"
          />
          <button onClick={this.addCity} data-testid="add-city-btn">Add City</button>
        </div>
      </div>
    );
  }
}

export default ClassClock;