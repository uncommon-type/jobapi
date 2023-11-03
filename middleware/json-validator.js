import { Validator } from 'express-json-validator-middleware';
import addFormats from 'ajv-formats';
import initAjvErrorsPlugin from 'ajv-errors';

const validator = new Validator({ useDefaults: true, allErrors: true, });
addFormats(validator.ajv);
initAjvErrorsPlugin(validator.ajv, {});

export const validateSchema = validator.validate;
