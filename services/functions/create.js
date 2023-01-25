import * as uuid from "uuid"
import handler from "../util/handler"
import dynamodb from "../util/dynamodb"

export const main = handler(async (event) => {
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

    await dynamodb.put(params);

    return params.Item;
})