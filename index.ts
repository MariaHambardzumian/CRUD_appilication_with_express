import express, { Request, Response, NextFunction } from 'express'
import createUpdateUser from './CRUD/createUser'
import deleteUser from './CRUD/deleteUser';
import { getUser } from './CRUD/getUser';
import activateUser from './CRUD/activateUser';


const app = express()
app.use(express.json());

const authorizeWithKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.get('api-key');

    if (apiKey !== '12345') {
        return res.status(401).send("Uh-oh! It seems the key you entered is incorrect. Please make sure you've entered the correct api-key and try again. ");
    }

    next();
};

app.post('/create', authorizeWithKey, (req: Request, res: Response, next: NextFunction) => {
    try {
        createUpdateUser(req.body)
        res.status(200).send('The user has been successfully created.')
    } catch (error) {
        next(error)
    }
})

app.post('/update/:id', authorizeWithKey, (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        createUpdateUser(req.body, +id)
        res.status(200).send('The update was successfully applied. Your changes have been saved.')
    } catch (error) {
        next(error)
    }
})
app.post('/activate/:id', authorizeWithKey, (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        activateUser( +id)
        res.status(200).send(`The user with ID ${id} has been successfully activated.`)
    } catch (error) {
        next(error)
    }
})

app.delete('/delete/:id', authorizeWithKey, (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        deleteUser(+id)
        res.status(200).send(`The user with ID ${id} has been successfully deleted. `)
        next()
    } catch (error) {
        next(error)
    }
})

app.get('/user/:id', authorizeWithKey, (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        res.status(200).send(getUser(+id))
        next()
    } catch (error) {
        next(error)
    }
})




const PORT = 3000
app.listen(PORT, () => {
    console.log('listening port');

})

let errorHandlerMiddleWAre = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json(err)
}

app.use(errorHandlerMiddleWAre)