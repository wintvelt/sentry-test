// apiEndpoints.js
import devStageOutput from './dev-stack-output.json'
import prodStageOutput from './dev-stack-output.json'

export default {
    get: {
        dev: devStageOutput['dev-sentry-test-api']?.url,
        prod: prodStageOutput['prod-sentry-test-api']?.url,
    }
}
