import fs from 'fs'
import { User } from './getUser'


export default function createUpdateUser(obj: any, id: number | null = null): void {

    if (Number.isNaN(id)) {
        throw "The ID should be a numeric value. Please ensure that you provide a valid numerical ID and try again."
    }

    if (!fs.existsSync('./users.json')) fs.writeFileSync('./users.json', '[]')

    isValid(obj)

    let data: User[] = JSON.parse(fs.readFileSync('./users.json', 'utf-8'))
    let finded: number = data.findIndex(user => user.id == id ?? obj.id)
    /////creating
    if (id == null) {
        if (finded != -1) {
            throw `Creating a user with the ID ${obj.id} is not possible as there is already an existing user with the same ID. Please choose a different ID for the new user and try again. `
        }

        let newUser: User = { ...obj, status: false, creation_timestamp: Date.now(), modification_timestamp: null }
        data.push(newUser)
        fs.writeFileSync('./users.json', JSON.stringify(data))
    }

    ///updating
    else if (id != null && finded != -1) {
        let existingIds = data.map(user => user.id)
        if (id != obj.id && existingIds.includes(obj.id)) {
            throw `Updating the user with ID ${id} to ${obj.id} is not possible due to an existing user with the same ID. Please choose a different ID for the update and try again.`
        }
        data[finded] = { ...data[finded], ...obj, modification_timestamp: Date.now() }

        fs.writeFileSync('./users.json', JSON.stringify(data))
    }
    else {
        throw `The user with ID ${id} does not exist in records to update. Please verify the ID and try again. `
    }


}


function isValid(obj: any): boolean {
    if (!obj) {
        throw 'Please provide the ID, name, age, and gender as required information to create a user'
    }
    if (!obj.id || typeof (obj.id) != 'number') {
        throw 'The ID is an essential field and should be provided as a numerical value when creating a user.'
    }
    if (!obj.age || typeof (obj.age) != 'number') {
        throw 'The age is an essential field and should be provided as a numerical value when creating a user.'
    }
    if (!obj.name || typeof (obj.name) != 'string') {
        throw 'The name is an essential field and should be provided as a string value (text) when creating a user.'
    }
    if (!['female', 'male', 'other'].includes(obj.gender)) {
        throw 'The gender is an essential field and should be provided as one of the following options: "female," "male," or "other" when creating a user.';
    }

    return true
}