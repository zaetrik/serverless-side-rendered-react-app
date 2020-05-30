# serverless-side-rendered-react-app

A full stack app with a `serverless-side-rendered` `React` frontend, `AWS Lambda` functions as API endpoints, a `AWS DynamoDB` database for data storage and an `AWS S3` bucket to store the static assets of the `React` app.

You can deploy the complete app with just one command => `npm run deploy`.

You can also run the app offline => `npm run offline`.

We use the `serverlesss framework` to spin up all our `AWS` services. With the help of multiple `serverless-offline-plugins` we can also run our app completely offline.

We have two `AWS Lambda` functions. One function handles the `serverless-side-rendering` of the `React` app. The other function retrieves data from our `DynamoDB` database.

## Usage

Install the dependencies:

```
npm i
npm run setup
```

To start all services locally run these commands:

```
npm run offline
```

To deploy the services to AWS run the following command:

```
npm run deploy
```

To remove all services from AWS run the following command:

```
npm run remove
```
