import fs from 'fs'
import getList, {User} from './getUser'

export default function deleteUser(id: number): void {

    if (Number.isNaN(id)) {
        throw "The ID should be a numeric value. Please ensure that you provide a valid numerical ID and try again."
    }

    let parsedData = getList()

    let filtered: User[] = parsedData.filter((user) => user.id != id)

    if (parsedData.length == filtered.length) {
        throw `The user with ID ${id} does not exist in records. Please verify the ID and try again. `
    } else {
        fs.writeFileSync('./users.json', JSON.stringify(filtered))
    }
}