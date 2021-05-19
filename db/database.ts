import {DataMapper} from "@aws/dynamodb-data-mapper";
import {DynamoDB} from "aws-sdk";
import {AppConstants} from "../constants/appConstants";
import {SyncOrAsyncIterable} from "@aws/dynamodb-data-mapper/build/constants";

export const database = new DataMapper({
    client: new DynamoDB({
        region: AppConstants.Region
    }),
});


export async function batchPutAll<T>(database: DataMapper, items: SyncOrAsyncIterable<T>) {
    for await (const persisted of database.batchPut(items)) {
    }
}
