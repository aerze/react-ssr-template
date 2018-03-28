import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { canUseDOM } from 'exenv'
import logo from 'images/logo.svg'
import './App.css'

import SharedTournament from 'views/Shared/Tournament'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <Helmet>
          <meta charSet='utf-8' />
          <meta name='theme-color' content='#0000FF' />
          <title>Victus.GG</title>
        </Helmet>
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
