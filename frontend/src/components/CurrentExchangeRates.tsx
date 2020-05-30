import React from 'react'
import { ExchangeRates, Currency, ExchangeRate } from '../../../types'

const CurrentExchangeRatesListItem = ({ currency, rate }: { currency: Currency; rate: ExchangeRate }) => (
  <li>
    <strong>
      {rate} {currency}
    </strong>
  </li>
)

const CurrentExchangeRates = ({ exchangeRates }: { exchangeRates: ExchangeRates }) => {
  return (
    <React.Fragment>
      <h2>Current Exchange Rates</h2>
      <p>
        For <strong>1 {exchangeRates.base}</strong> you currently get
      </p>
      <ul>
        {Object.keys(exchangeRates.rates).map((currency: Currency, index) => (
          <CurrentExchangeRatesListItem
            key={index}
            currency={currency}
            rate={exchangeRates.rates[currency] as ExchangeRate}
          />
        ))}
      </ul>
    </React.Fragment>
  )
}

export default CurrentExchangeRates
