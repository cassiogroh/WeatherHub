import 'reflect-metadata';

import express from 'express';
import cors from 'cors';

import routes from './routes/index';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server running on port ${port}`));


