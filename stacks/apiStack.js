import * as sst from "@serverless-stack/resources";

const routeNames = {
    get: "GET   /",
}

export default class ApiStack extends sst.Stack {
    // Public reference to the API
    api;

    constructor(scope, id, props) {
        super(scope, id, props);

        // Create the API
        this.api = new sst.Api(this, "Api", {
            defaultFunctionProps: {
                environment: {
                    AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1
                },
            },
            defaultThrottlingRateLimit: 2000,
            defaultThrottlingBurstLimit: 500,
            routes: {
                [routeNames.get]: "src/get.handler"
            },
        });

        const outputs = {
            "url": this.api.url,
        }

        // Show the API endpoint in the output
        this.addOutputs(outputs);
    }
}