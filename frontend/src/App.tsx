import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import CurrentExchangeRates from './components/CurrentExchangeRates'
import HistoricExchangeRates from './components/HistoricExchangeRates'

import { mockExchangeRates } from './utils/mockData'

import './css/main.css'

import { ExchangeRates } from '../../types'

// Add __INITIAL__DATA__ to the global window object
declare global {
  interface Window {
    __INITIAL__DATA__: { exchangeRates: ExchangeRates; API_URL: string; URL_PREFIX: string }
  }
}

const URL_PREFIX = process.env.NODE_ENV === 'development' ? '/dev' : window.__INITIAL__DATA__.URL_PREFIX
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/dev' : window.__INITIAL__DATA__.API_URL
const exchangeRates =
  process.env.NODE_ENV === 'development' ? mockExchangeRates : window.__INITIAL__DATA__.exchangeRates

export default ReactDOM.hydrate(
  <Router>
    <React.Fragment>
      <h1>Exchange Rates</h1>
      <Switch>
        <Route exact path={`${URL_PREFIX}/historic`} render={() => <HistoricExchangeRates API_URL={API_URL} />} />
        <Route
          path='/'
          render={() => (
            <React.Fragment>
              <Link to={`${URL_PREFIX}/historic`}>Show historic data</Link>
              <CurrentExchangeRates exchangeRates={exchangeRates} />
            </React.Fragment>
          )}
        />
      </Switch>
    </React.Fragment>
  </Router>,
  document.getElementById('root')
)
