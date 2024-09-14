import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './config/connection';
import routes from './routes';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3001', 10);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        // Log where we can go to test our API
    });
});
