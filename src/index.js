import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'

import { reducers, enhancers, history } from 'store'
import App from 'views/App'
import './index.css'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__
const script = document.getElementById('state')
if (script) document.body.removeChild(script)

const store = createStore(reducers, preloadedState, enhancers)
const render = script ? ReactDOM.hydrate : ReactDOM.render

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
