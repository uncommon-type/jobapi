import { NotFoundError } from '../config/problem-types.js';

export const notFound = (req, res, next) => {
  throw new NotFoundError('not found', 'page');
}
