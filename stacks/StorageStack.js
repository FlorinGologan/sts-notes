import { Bucket, Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
    const table = new Table(stack, "notes", {
        fields: {
            userId: "string",
            noteId: "string",
        },
        primaryIndex: {
            partitionKey: "userId",
            sortKey: "noteId"
        }
    });

    const bucket = new Bucket(stack, "Uploads", {
        name: "sts-notes",
    });

    return {
        table,
        bucket,
    }
}