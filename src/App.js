import React, { Component } from 'react'
import BotUsersList from './components/BotUsersList'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="appContainer">
        <h3>Список пользователей бота SimpsonsBot</h3>
        <BotUsersList />
      </div>
    )
  }
}

export default App
