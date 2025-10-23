import React, { Component } from 'react';

class ClassGreeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 10
    };
  }

  componentDidMount() {
    console.log('Greeting Mounted');
    this.timer = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timeLeft <= 1) {
          this.props.onTimeout();
          return { timeLeft: 0 };
        }
        return { timeLeft: prevState.timeLeft - 1 };
      });
    }, 1000);
  }

  componentWillUnmount() {
    console.log('Greeting Unmounted');
    clearInterval(this.timer);
  }

  render() {
    const { timeLeft } = this.state;
    
    return (
      <div className="greeting-container">
        <h2>Class Component Greeting</h2>
        <div className="greeting-message">
          <p className="greeting-text">Hello, React! (disappears in 10s)</p>
          <p className="countdown">Time left: {timeLeft} seconds</p>
        </div>
      </div>
    );
  }
}

export default ClassGreeting;