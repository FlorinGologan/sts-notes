import * as uuid from "uuid"
import AWS from "aws-sdk"

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export const main = async (event) => {
    const data = JSON.parse(event.body)

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            userId: '-me-',
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    }

    try {
        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message })
        }
    }
}