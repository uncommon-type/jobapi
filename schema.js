export const companySchema = {
  type: 'object',
  required: ['id', 'name', 'description', 'size'],
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

const postJobRequiredFields = [
  'id',
  'status',
  'jobTitle',
  'employmentType',
  'location',
  'company',
  'description',
  'postUrl',
  'dateCreated',
  'salary',
  'salaryBandMin',
  'salaryBandMax',
  'activities',
  'benefits',
  'startDate',
  'probation',
  'pros',
  'cons',
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
        'wished',
        'applied',
        'interviewed',
        'offer received',
        'rejected',
        'closed',
      ],
    },
    jobTitle: {
      type: 'string',
      minLength: 1,
    },
    employmentType: {
      type: 'string',
      enum: [
        'full-time',
        'part-time',
        'temporary',
        'internship',
        'apprenticeship',
        'contractor',
      ],
    },
    location: {
      type: 'string',
      enum: ['hybrid', 'in-office', 'remote'],
    },
    company: companySchema,
    description: {
      type: 'string',
      minLength: 1,
    },
    postUrl: {
      type: 'string',
      format: 'uri',
    },
    dateCreated: {
      type: 'string',
      format: 'date-time',
    },
    salary: {
      anyOf: [
        { type: 'string', pattern: '[-+]?[0-9]*.?[0-9]+' },
        { type: 'number' },
      ],
    },
    salaryBandMin: {
      anyOf: [
        { type: 'string', pattern: '[-+]?[0-9]*.?[0-9]+' },
        { type: 'number' },
      ],
    },
    salaryBandMax: {
      anyOf: [
        { type: 'string', pattern: '[-+]?[0-9]*.?[0-9]+' },
        { type: 'number' },
      ],
    },
    activities: {
      type: 'array',
      items: activitySchema,
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
    notes: {
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
