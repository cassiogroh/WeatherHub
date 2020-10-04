import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import AppError from '@shared/errors/AppError';
import routes from './routes/index';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  };

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server running on port ${port}`));


