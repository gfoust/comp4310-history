import React, { Component, MouseEvent } from 'react';
import './App.css';

interface AppState {
  day: string|null;
}

const schedule: { [day: string]: string[] } = {
  Sunday: ['9:00 - Church', '17:30 - Homework'],
  Monday: ['9:00 - Chapel', '13:00 - COMP 4310'],
  Tuesday: ['9:00 - Chapel'],
  Wednesday: ['9:00 - Chapel, 13:00 - Comp 4310', '21:00 - Devo'],
  Thursday: ['9:00 - Chapel', '18:00 - Soccer practice'],
  Friday: ['9:00 - Chapel', '13:00 - Comp 4310', '20:00 - Deserts @ SC'],
  Saturday: [],
};

const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

function EventList({ day }: { day: string }) {
  if (!(day in schedule) || schedule[day].length == 0) {
    return <h4>No events found</h4>;
  }
  else {
    return (
      <ul>
        { schedule[day].map(event => <li>{event}</li>) }
      </ul>
    );
  }
}

class App extends Component<{}, AppState> {

  state = { day: null };

  setDay = () => {
    let match = window.location.pathname.match(/\/(\S+)$/);
    if (match) {
      this.setState({ day: match[1] });
    }
    else {
      this.setState({ day: null });
    }
  }

  goToDay(day: string) {
    return (evt: MouseEvent) => {
      evt.preventDefault();
      window.history.pushState(null, '', '/' + day);
      this.setState({ day });
    }
  }

  goToRoot = (evt: MouseEvent) => {
    evt.preventDefault();
    window.history.pushState(null, '', '/');
    this.setState({ day: null });
  }

  override componentDidMount() {
    window.addEventListener('popstate', this.setDay);
    this.setDay();
  }

  override componentWillUnmount() {
    window.removeEventListener('popstate', this.setDay);
  }

  override render() {
    if (this.state.day) {
      return (
        <div className="App">
          <h1>Schedule For {this.state.day}</h1>
          <EventList day={this.state.day}/>
          <a href="/" onClick={this.goToRoot}>Week</a>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <h1>Weekly Schedule</h1>
          <ul>
            { days.map(day =>
                <li key={day}>
                  <a href={'/' + day} onClick={this.goToDay(day)}>{day}</a>
                </li>
              )
            }
          </ul>
        </div>
      )
    }
  }
}

export default App;
