import {BaseData, IBaseData} from "./baseData";
import {attribute, table} from "@aws/dynamodb-data-mapper-annotations";
import {ChatRoomsTable} from "../constants/chatRoomsTable";
import {IUser} from "./user";
import {UserInRoom} from "./userInRoom";
import {batchPutAll, database} from "../db/database";
import * as shortUUID from "short-uuid";

export interface IRoom extends IBaseData {
    roomId: string,
    name: string,
}

@table(ChatRoomsTable.TableName)
export class Room extends BaseData implements IRoom {

    static create(name: string): Room {
        const result = new Room();
        result.name = name;
        result.roomId = `room_${shortUUID.generate()}`;
        return result;
    }

    public readonly users: IUser[] = [];

    @attribute({
        attributeName: ChatRoomsTable.Name
    })
    name: string;

    get roomId(): string {
        return this.partitionKey;
    }

    set roomId(value: string) {
        this.partitionKey = value;
        this.sortKey = value;
    }

    public async save(): Promise<void> {
        const items = this.users.map((u) => UserInRoom.create(this.roomId, u.userId, u.name) as BaseData);
        items.push(this);
        await batchPutAll(database, items);
    }


}

