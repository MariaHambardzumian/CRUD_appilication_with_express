import fs from 'fs'
import getList from './getUser'

export default function activateUser(id: number): void {

    if (Number.isNaN(id)) {
        throw "The ID should be a numeric value. Please ensure that you provide a valid numerical ID and try again."
    }

    let data = getList()

    let findedIndex: number = data.findIndex(user => user.id == id)

    if (findedIndex == -1) {
        throw `The user with ID ${id} does not exist in records. Please verify the ID and try again. `
    } 
    else {
        data[findedIndex] = { ...data[findedIndex], status: true, modification_timestamp: Date.now() }
        fs.writeFileSync('./users.json', JSON.stringify(data))
    }

}
