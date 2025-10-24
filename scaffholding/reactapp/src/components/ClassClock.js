import React, { Component } from 'react';

class ClassClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString('en-US', { hour12: false })
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: new Date().toLocaleTimeString('en-US', { hour12: false })
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="clock-display">
        <h2>Class Component Clock</h2>
        <div className="time" data-testid="class-clock-time">
          {this.state.time}
        </div>
      </div>
    );
  }
}

export default ClassClock;