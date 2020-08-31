import { Request, Response } from 'express';

export default function registerRouter( request: Request, response: Response) {
  response.json('registered')
}