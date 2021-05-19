import {ChatRoomsTable} from "../constants/chatRoomsTable";
import {attribute, table} from "@aws/dynamodb-data-mapper-annotations";
import {BaseData, IBaseData} from "./baseData";
import * as shortUUID from "short-uuid";


export interface IUser extends IBaseData {
    userId: string,
    name: string,
    email: string,
}

@table(ChatRoomsTable.TableName)
export class User extends BaseData implements IUser {

    static create(name: string, email: string): User {
        const result = new User();
        result.name = name;
        result.email = email;
        result.userId = `user_${shortUUID.generate()}`;
        return result;
    }

    @attribute({
        attributeName: ChatRoomsTable.Email
    })
    email: string;

    @attribute({
        attributeName: ChatRoomsTable.Name
    })
    name: string;


    get userId(): string {
        return this.partitionKey;
    }

    set userId(value: string) {
        this.partitionKey = value;
        this.sortKey = value;
    }


}