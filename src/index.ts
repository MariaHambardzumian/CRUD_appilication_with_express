import express, { Request, Response, NextFunction } from 'express'
import userRoutes from './routes/UserRoutes';
import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/../.env' })

const app = express()
app.use(express.json());

const authorizeWithKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.get('api-key');

    if (apiKey !== process.env.API_KEY) {
        return res.status(401).send("Uh-oh! It seems the key you entered is incorrect. Please make sure you've entered the correct api-key and try again. ");
    }

    next();
};

app.use('/users', authorizeWithKey, userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
