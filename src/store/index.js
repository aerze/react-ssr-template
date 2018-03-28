import { canUseDOM } from 'exenv'
import { combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

import user from './user/reducer'

const reduxDevtoolCompose = canUseDOM && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = reduxDevtoolCompose || compose

const history = canUseDOM ? createBrowserHistory() : createMemoryHistory()
const historyMiddleware = routerMiddleware(history)

const enhancers = composeEnhancers(applyMiddleware(historyMiddleware, promiseMiddleware()))
const reducers = combineReducers({
  user,
  router: routerReducer
})

export { reducers, enhancers, history }
