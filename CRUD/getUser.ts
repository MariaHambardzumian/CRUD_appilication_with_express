import fs from 'fs'

export interface User {
    id: number,
    name: string,
    age: number,
    gender: 'female' | 'male' | 'other',
    status: boolean,
    creation_timestamp: number,
    modification_timestamp: number | null
}

export default function getList(): User[] {

    if (!fs.existsSync('./users.json')) {
        throw "users list is empty"
    }
    let data: string = fs.readFileSync('./users.json', 'utf-8');

    if (!data || data == '{}' || data == '[]') {
        throw "users list is empty"
    }
    return JSON.parse(data)
}

export function getUser(id: number): User {
    if (Number.isNaN(id)) {
        throw "The ID should be a numeric value. Please ensure that you provide a valid numerical ID and try again."
    }
    let parsedData = getList()

    let finded: User | undefined = parsedData.find((user) => user.id == id)
    if (!finded) {
        throw `The user with ID ${id} does not exist in records. Please verify the ID and try again. `
    } else {
        return finded
    }
}