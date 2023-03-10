import { Api, use } from '@serverless-stack/resources'
import { StorageStack } from './StorageStack'

export function ApiStack({ stack, app }) {

    const { table } = use(StorageStack)

    const api = new Api(stack, "api", {
        defaults: {
            authorizer: "iam",
            function: {
                permissions: [table],
                environment: {
                    TABLE_NAME: table.tableName,
                }
            }
        },
        cors: {
            allowMethods: ["GET"],
        },
        routes: {
            "POST /notes": "functions/create.main",
            "GET /notes/{id}": "functions/get.main",
            "GET /notes": "functions/list.main",
            "PUT /notes/{id}": "functions/update.main",
            "DELETE /notes/{id}": "functions/delete.main",
        }
    })

    stack.addOutputs({
        ApisEndpoint: api.url
    })

    return {
        api
    }
}