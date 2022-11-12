import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
require('dotenv').config();

interface IData {
  data: {
    username: string;
    userId: string;
  };
}

const SECRET = process.env.SECRET || 'secret';

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const generateToken = (username: string, userId: string) =>
  jwt.sign({ data: { username, userId } }, SECRET, jwtConfig);

const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || '';
    const { data } = jwt.verify(token, SECRET) as unknown as IData;
    req.body = Object.assign(req.body, data);
    next();
  } catch (error: any) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: error.message });
  }
};

export default {
  generateToken,
  validateTokenMiddleware,
};
