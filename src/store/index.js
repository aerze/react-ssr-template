import { canUseDOM } from 'exenv'
import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

import user from './user/reducer'

/**
 * @param {{}} preloadedState
 * @param {{ path: string }} options
 */
export default function (preloadedState, options) {
  const reduxDevtoolCompose = canUseDOM && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  const composeEnhancers = reduxDevtoolCompose || compose

  const history = canUseDOM
    ? createBrowserHistory()
    : createMemoryHistory({
      initialEntries: [options.path]
    })

  const historyMiddleware = routerMiddleware(history)

  const enhancers = composeEnhancers(applyMiddleware(historyMiddleware, promiseMiddleware()))
  const reducers = combineReducers({
    user,
    router: routerReducer
  })

  return {
    store: createStore(reducers, preloadedState, enhancers),
    history
  }
}
