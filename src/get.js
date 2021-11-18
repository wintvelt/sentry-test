// handler for GET route
import middy from '@middy/core'
import errorLogger from '@middy/error-logger'
import httpErrorHandler from '@middy/http-error-handler'
import cors from '@middy/http-cors'

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

export const handler = middy(baseHandler)
    .use(errorLogger())
    .use(httpErrorHandler({ fallbackMessage: 'server error' }))
    .use(cors())
