import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { AuthenticationError } from '../config/problem-types.js';

export const secretKey = process.env.SECRET_KEY;

export const validateJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AuthenticationError();
    }

    jwt.verify(token, secretKey, (err) => {
      if (err) {
        throw new AuthenticationError();
      }
    });

    next();
  } catch (err) {
    next(err);
  }
};
