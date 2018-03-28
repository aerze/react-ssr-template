import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { canUseDOM } from 'exenv'
import logo from 'images/logo.svg'
import './App.css'

import SharedTournament from 'views/Shared/Tournament'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          {canUseDOM && <img src={logo} className='App-logo' alt='logo' />}
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <Link to='/tournament'>
          <h3> View Tournament </h3>
        </Link>
        <Switch>
          <Route path='/tournament' component={SharedTournament} />
        </Switch>
      </div>
    )
  }
}

export default App
