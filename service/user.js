import {
  getData,
  addData,
  getById,
  updateData,
  removeData,
  getBy,
} from '../models.js';
import { NotFoundError, LoginError } from '../config/problem-types.js';
import { ValidationError } from 'express-json-validator-middleware';

const prefix = 'user';

export const login = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await getBy(prefix, 'email', username);

    if (user) {
      return res.json(user);
    }

    throw new LoginError();
  } catch (err) {
    next(err);
  }
}

export const createUser = async (req, res, next) => {
  try {
    const { body: user } = req;

    const existingUser = await getBy(prefix, 'email', user.email);

    if (existingUser) {
      throw new ValidationError('User already exists');
    }

    const createdUser = await addData(user, prefix);
    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
}

export const listUsers = async (req, res, next) => {
  try {
    const users = await getData(prefix);

    if (Object.keys(users).length === 0) {
      throw new NotFoundError('Users not found', 'users');
    }

    res.json(users);
  } catch (err) {
    next(err);
  }
}

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getById(id, prefix);

    if (!user) {
      throw new NotFoundError('User not found', 'user');
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { body: user } = req;
    const { id } = req.params;

    if (Object.keys(user).length === 0) {
      throw new ValidationError('empty object');
    }

    const updatedUser = await updateData(id, user, prefix);

    if (!updatedUser) {
      throw new NotFoundError('No record to update', 'user');
    }

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await removeData(id, prefix);

    if (!deletedUser) {
      throw new NotFoundError('No record to delete', 'record');
    }

    res.status(204).json(deletedUser);
  } catch (err) {
    next(err);
  }
}
