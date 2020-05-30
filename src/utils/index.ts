import axios from 'axios'
import { ExchangeRates, Currency, HistoricExchangeRate } from '../../types'

export const getExchangeRates = async (): Promise<ExchangeRates> => {
  const { data } = await axios.get('https://api.exchangeratesapi.io/latest')
  return data as ExchangeRates
}

export const getUrlFromBucket = (s3Bucket: AWS.S3, fileName: string) => {
  return process.env.NODE_ENV === 'development'
    ? `${s3Bucket.config.endpoint}/${process.env.bucketName}/${fileName}`
    : 'https://' + process.env.bucketName + '.s3.amazonaws.com/' + fileName
}

export const addExchangeRatesToDB = (docClient: AWS.DynamoDB.DocumentClient) => async (
  exchangeRates: ExchangeRates
): Promise<void> => {
  const paramsForCountry = Object.keys(exchangeRates.rates).map((currency: Currency) => ({
    TableName: process.env.tableName as string,
    Item: {
      base: exchangeRates.base,
      currency: currency,
      rate: exchangeRates.rates[currency],
      createdAt: Date.now(),
    } as HistoricExchangeRate,
  }))

  try {
    await Promise.all(paramsForCountry.map(async (params) => await docClient.put(params).promise()))
    return
  } catch (error) {
    console.log(error)
    return
  }
}
