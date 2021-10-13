import {Construct, RemovalPolicy, Stack, StackProps} from "@aws-cdk/core";
import {AttributeType, BillingMode, Table} from "@aws-cdk/aws-dynamodb";
import {ChatRoomsTable} from "../constants/chatRoomsTable";

export class ChatRoomsStack extends Stack {


    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const chatRooms = new Table(
            this, ChatRoomsTable.TableName, {
                tableName: ChatRoomsTable.TableName,
                partitionKey: {
                    name: ChatRoomsTable.PartitionKey,
                    type: AttributeType.STRING
                },
                sortKey: {
                    name: ChatRoomsTable.SortKey,
                    type: AttributeType.STRING
                },
                removalPolicy: RemovalPolicy.DESTROY,
                billingMode: BillingMode.PAY_PER_REQUEST
            }
        );
        this.createIndex(chatRooms, ChatRoomsTable.UserRoomsIndex);


    }

    private createIndex(chatRooms: Table, indexName: string) {
        chatRooms.addGlobalSecondaryIndex({
            indexName: indexName,
            partitionKey: {
                name: ChatRoomsTable.SortKey,
                type: AttributeType.STRING
            },
            sortKey: {
                name: ChatRoomsTable.PartitionKey,
                type: AttributeType.STRING
            }
        })
    }
}