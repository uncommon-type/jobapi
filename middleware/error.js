import { NotFoundError } from '../config/problem-types.js';

export function notFound(req, res, next) {
  throw new NotFoundError('not found', 'page');
}
