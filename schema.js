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
      type: 'integer',
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

export const activitySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    type: {
      type: 'string',
      enum: ['event', 'task']
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    done: {
      type: 'boolean'
    },
    startDate: {
      type: 'string', format: 'date-time'
    }
  },
  oneOf: [
    {
      properties: {
        type: {
          const: 'event'
        },
        startDate: {
          type: 'string',
          format: 'date-time'
        }
      },
      required: ['startDate']
    },
    {
      properties: {
        type: {
          const: 'task'
        }
      },
      not: {
        required: ['startDate']
      }
    }
  ],
  additionalProperties: false
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
        'Interviewing',
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
