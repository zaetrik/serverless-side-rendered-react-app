import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { HistoricExchangeRate } from '../../../types'

const HistoricExchangeRatesListItem = ({ historicExchangeRate }: { historicExchangeRate: HistoricExchangeRate }) => (
  <li>
    <p>
      <strong>
        {historicExchangeRate.rate} {historicExchangeRate.currency}
      </strong>
      <span> on the </span>
      <strong>{new Date(historicExchangeRate.createdAt).toUTCString()}</strong>
    </p>
  </li>
)

const HistoricExchangeRates = ({ API_URL }: { API_URL: string }) => {
  const [historicExchangeRates, setHistoricExchangeRates] = useState<HistoricExchangeRate[]>([])

  useEffect(() => {
    axios
      .get(`${API_URL}/api/historic`)
      .then((res) => setHistoricExchangeRates(res.data))
      .catch(console.log)
  }, [])

  return (
    <React.Fragment>
      <h2>Historic Data</h2>
      {historicExchangeRates.length > 0 ? (
        <React.Fragment>
          <p>
            For <strong>1 {historicExchangeRates[0].base}</strong> you could have gotten
          </p>
          <ul>
            {historicExchangeRates.map((rate, index) => (
              <HistoricExchangeRatesListItem key={index} historicExchangeRate={rate} />
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <p>No data available</p>
      )}
    </React.Fragment>
  )
}

export default HistoricExchangeRates
