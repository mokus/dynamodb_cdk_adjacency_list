import {BaseData} from "./baseData";
import {attribute, table} from "@aws/dynamodb-data-mapper-annotations";
import {ChatRoomsTable} from "../constants/chatRoomsTable";

export interface IUserInRoom {
    userId: string;
    roomId: string;

    nicknameInRoom: string;
}

@table(ChatRoomsTable.TableName)
export class UserInRoom extends BaseData implements IUserInRoom {

    static create(roomId: string, userId: string, nicknameInRoom: string): UserInRoom {
        const result = new UserInRoom();
        result.nicknameInRoom = nicknameInRoom;
        result.roomId = roomId;
        result.userId = userId;
        return result;
    }

    @attribute({
        attributeName: ChatRoomsTable.Name
    })
    nicknameInRoom: string;

    get roomId(): string {
        return this.partitionKey;
    }

    set roomId(value) {
        this.partitionKey = value;
    }

    get userId(): string {
        return this.sortKey;
    }

    set userId(value) {
        this.sortKey = value;
    }
}