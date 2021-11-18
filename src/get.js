// handler for GET route
import middy from '@middy/core'
import errorLogger from '@middy/error-logger'
import httpErrorHandler from '@middy/http-error-handler'
import cors from '@middy/http-cors'
import * as Sentry from "@sentry/node"

Sentry.init({
    dsn: "https://fc657387286e49cb85c73e841794f225@o1071755.ingest.sentry.io/6071342",
})

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
        Sentry.captureException(error)
        throw new Error(error.message)
    }

    return { statusCode: 200, body: JSON.stringify(result) }
}

export const handler = middy(baseHandler)
    .use(errorLogger())
    .use(httpErrorHandler({ fallbackMessage: 'server error' }))
    .use(cors())
