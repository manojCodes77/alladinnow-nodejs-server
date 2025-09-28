import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

app.get("/something", (req: Request, res: Response) => {
    res.send("This is something else!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});