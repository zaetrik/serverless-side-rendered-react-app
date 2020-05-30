import { DynamoDB as AWSDynamoDB, S3 as AWSS3 } from 'aws-sdk'
import { getUrlFromBucket, getExchangeRates, addExchangeRatesToDB } from './utils'
import React from 'react'
import { StaticRouter as Router } from 'react-router-dom'
import CurrentExchangeRates from '../frontend/src/components/CurrentExchangeRates'
import ReactDOMServer from 'react-dom/server'

const docClient = new AWSDynamoDB.DocumentClient(
  process.env.NODE_ENV === 'development'
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY',
        secretAccessKey: 'DEFAULT_SECRET',
      }
    : {}
)

const S3 = new AWSS3(
  process.env.NODE_ENV === 'development'
    ? {
        s3ForcePathStyle: true,
        accessKeyId: 'S3RVER', // This specific key is required when working offline
        secretAccessKey: 'S3RVER',
        endpoint: 'http://localhost:5000',
      }
    : {}
)

export const sendHtml: AWSLambda.APIGatewayProxyHandler = async (event) => {
  // Fetch the data we want to implement in our HTML
  const exchangeRates = await getExchangeRates()

  // Store the data in the DB
  await addExchangeRatesToDB(docClient)(exchangeRates)

  // Render our React components
  const CurrentExchangeRatesComponent = React.createElement(CurrentExchangeRates, { exchangeRates })
  const RouterComponent = ReactDOMServer.renderToString(
    React.createElement(Router, { location: event.path, context: {} }, CurrentExchangeRatesComponent)
  )

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Exchange Rates</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="stylesheet" href="${getUrlFromBucket(S3, 'css/bundle.css')}" />
        <meta name="theme-color" content="#ffffff" />
        <script>window.__INITIAL__DATA__ = ${JSON.stringify({
          exchangeRates,
          API_URL: process.env.NODE_ENV === 'production' ? process.env.PROD_API_URL : process.env.DEV_API_URL + 'dev',
          URL_PREFIX: process.env.NODE_ENV === 'production' ? '/prod' : '/dev',
        })}</script>
      </head>
      <body>
        <noscript>Please activate JavaScript</noscript>
        <div id="root">
          ${RouterComponent}
        </div>
        <script src="${getUrlFromBucket(S3, 'js/bundle.js')}"></script>
      </body>
    </html>
    `,
  }
}

export const getHistoricExchangeRates: AWSLambda.APIGatewayProxyHandler = async () => {
  const params = {
    TableName: process.env.tableName as string,
    Select: 'ALL_ATTRIBUTES',
  }
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  try {
    const data = await docClient.scan(params).promise()
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(data.Items),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify([]),
    }
  }
}
