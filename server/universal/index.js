import path from 'path'
import fs from 'fs'

import serialize from 'serialize-javascript'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'

import createStore from '../../src/store'
import App from '../../src/views/App'

const prepHTML = (data, { html, head, body, state }) => {
  data = data.replace('<html lang="en">', `<html ${html}`)
  data = data.replace('</head>', `${head}</head>`)
  data = data.replace(
    '<div id="root"></div>',
    `
    <div id="root">${body}</div>
    <script id="state">
      window.__PRELOADED_STATE__ = ${serialize(state)}
    </script>
  `
  )

  return data
}

const universalLoader = (req, res) => {
  // Load in our HTML file from our build
  const filePath = path.resolve(__dirname, '../../build/index.html')
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    // If there's an error... serve up something nasty
    if (err) {
      console.error('Read error', err)
      return res.status(404).end()
    }

    // Create a store and sense of history based on the current path
    const { store, history } = createStore({}, { path: req.url })
    const context = {}

    // Render App in React
    const body = ReactDOM.renderToString(
      <Provider store={store}>
        <ConnectedRouter history={history} context={context}>
          <Route component={App} />
        </ConnectedRouter>
      </Provider>
    )

    if (context.url) {
      res.redirect(301, context.url)
    } else {
      const state = store.getState()
      const helmet = Helmet.renderStatic()

      // Form the final HTML response
      const html = prepHTML(htmlData, {
        html: helmet.htmlAttributes.toString(),
        head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
        body,
        state
      })

      res.send(html)
    }
  })
}

export default universalLoader
