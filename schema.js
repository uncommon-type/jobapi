export const companySchema = {
  type: 'object',
  required: ['id', 'name'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    description: {
      type: 'string',
      minLength: 1,
    },
    size: {
      type: ['integer', 'null'],
      minimum: 1,
    },
  },
};

export const tagSchema = {
  type: 'object',
  required: ['id', 'title'],
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    title: {
      type: 'string',
      minLength: 1,
    },
  },
};

const commonActivitySchema = {
  type: 'object',
  required: ['id', 'type', 'title', 'description', 'done'], //done
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    type: {
      type: 'string',
      enum: ['task', 'event'],
    },
    title: {
      type: 'string',
      minLength: 1,
    },
    description: {
      type: 'string',
      minLength: 1,
    },
  },
};

export const taskSchema = {
  ...commonActivitySchema,
  required: ['done'],
  properties: {
    type: {
      type: 'string',
      const: 'task',
    },
    done: {
      type: 'boolean',
    },
  },
};

export const eventSchema = {
  ...commonActivitySchema,
  required: ['startDate', 'done'],
  properties: {
    type: {
      type: 'string',
      const: 'event',
    },
    startDate: {
      type: 'string',
      format: 'date-time',
    },
  },
};

export const activitySchema = {
  type: 'object',
  oneOf: [taskSchema, eventSchema],
};

export const loginSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 256,
    },
  },
};

const postUserRequiredFields = ['id', 'name', 'email', 'password'];

export const userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    name: {
      type: 'string',
      minLength: 1,
      errorMessage: 'You need to give your name',
    },
    email: {
      type: 'string',
      format: 'email',
      errorMessage: "That doesn't look like a valid email",
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 256,
      errorMessage: "That doesn't look like a valid password",
    },
    role: {
      type: 'string',
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
};

export const userPostSchema = {
  ...userSchema,
  required: postUserRequiredFields,
};

const postJobRequiredFields = [
  'id',
  'jobTitle',
  'company',
  'status'
];

export const jobSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    status: {
      type: 'string',
      enum: [
        'Interested',
        'Applied',
        'Interviewed',
        'Offer received',
        'Rejected',
        'Closed',
      ],
    },
    jobTitle: {
      type: 'string',
      minLength: 1,
    },
    employmentType: {
      type: 'string',
      enum: [
        'Full-time',
        'Part-time',
        'Temporary',
        'Internship',
        'Apprenticeship',
        'Contractor',
      ],
    },
    location: {
      type: 'string',
      enum: ['Hybrid', 'In-office', 'Remote'],
    },
    company: companySchema,
    description: {
      type: 'string',
      minLength: 1,
    },
    salary: {
      type: ['integer', 'null'],
      exclusiveMinimum: 0,
      exclusiveMaximum: 1000000,
    },
    activities: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid'
      }
    },
    benefits: {
      type: 'string',
      minLength: 1,
    },
    startDate: {
      type: 'string',
      format: 'date-time',
    },
    probation: {
      type: 'string',
      minLength: 1,
    },
    pros: {
      type: 'array',
      items: tagSchema,
    },
    cons: {
      type: 'array',
      items: tagSchema,
    },
  },
};

export const jobPostSchema = {
  ...jobSchema,
  required: postJobRequiredFields,
};
