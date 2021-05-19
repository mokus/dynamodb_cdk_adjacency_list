import {testDataConfig} from "./testData";
import {generateName} from "fantasy-name-generator/dist/util/nameGenerator";
import {User} from "../data/user";
import {Room} from "../data/room";
import {batchPutAll, database} from "../db/database";

populate();


async function populate() {
    const users = Array.from(getUsers());
    await batchPutAll(database, users);

    const rooms = getRooms();

    for (const room of rooms) {
        const usersCopy = users.slice();
        for (let i = 0; i < testDataConfig.usersInRoom; i++) {
            const user = removeRandomItem(usersCopy);
            room.users.push(user);
        }
        await room.save();
    }
}

function removeRandomItem<T>(list: T[]) {
    return list.splice(Math.floor(Math.random() * list.length), 1)[0];
}

function getRandomName() {
    return generateName("elf", {gender: "female", allowMultipleNames: false});
}

function* getRooms() {
    for (let i = 0; i < testDataConfig.rooms; i++) {
        const name = getRandomName() as string;
        yield  Room.create(name);
    }
}

function* getUsers() {
    for (let i = 0; i < testDataConfig.users; i++) {
        const name = getRandomName() as string;
        const email = `${getRandomName()}@gmail.com`.toLowerCase();

        yield  User.create(name, email);
    }
}
