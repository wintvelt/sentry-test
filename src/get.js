// handler for GET route
import Sentry from "@sentry/serverless"
import sentryErrorHandler from '@joblocal/middy-sentry-error-handler'
import middy from '@middy/core'
import errorLogger from '@middy/error-logger'
import httpErrorHandler from '@middy/http-error-handler'
import cors from '@middy/http-cors'

const dsn = "https://fc657387286e49cb85c73e841794f225@o1071755.ingest.sentry.io/6071342"

Sentry.AWSLambda.init({
    dsn,
    tracesSampleRate: 1.0,
    environment: process.env.STAGE
});

const baseHandler = async (event) => {
    const id = event.queryStringParameters?.id // decoding already done

    let result
    try {
        if (id) {
            throw new Error('We created an error')
        } else {
            result = 'We have a winner'
        }

    } catch (error) {
        throw new Error(error.message)
    }

    return { statusCode: 200, body: JSON.stringify(result) }
}

// export const handler = Sentry.AWSLambda.wrapHandler(baseHandler)
export const handler =
    // middy(Sentry.AWSLambda.wrapHandler(baseHandler))
    middy(baseHandler)
        .use(errorLogger())
        .use(sentryErrorHandler({
            dsn,
        }))
        .use(httpErrorHandler({ fallbackMessage: 'server error' }))
        .use(cors())

