import {hashKey, rangeKey} from "@aws/dynamodb-data-mapper-annotations";
import {ChatRoomsTable} from "../constants/chatRoomsTable";

export interface IBaseData {
    partitionKey: string,
    sortKey: string,
}

export abstract class BaseData implements IBaseData {


    @hashKey({
        attributeName: ChatRoomsTable.PartitionKey
    })
    partitionKey: string;

    @rangeKey({attributeName: ChatRoomsTable.SortKey})
    sortKey: string;

}