const idSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
  required: ["id"],
  additionalProperties: false,
};

const createUserSchemaBody = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 5,
    },
  },
};

const loginUserSchemaBody = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 5,
    },
  },
};

const getUserByIdSchemaQuery = idSchema;

const deleteUserByIdSchemaQuery = idSchema;

const deleteTaskByIdSchemaQuery = idSchema;

const updateUserByIdSchemaQuery = idSchema;

const updateTaskByIdSchemaQuery = idSchema;

const getTaskByIdSchemaQuery = idSchema;

const updateUserByIdSchemaBody = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string",
      format: "email",
    },
  },
  additionalProperties: false,
};

const createTaskSchemaBody = {
  type: "object",
  required: ["title"],
  properties: {
    title: {
      type: "string",
      minLength: 10
    },
    description: {
      type: "string",
      minLength: 20
    }
  }
}

const updateTaskByIdSchemaBody = {
  type: "object",
  required: ["title", "status"],
  properties: {
    title: {
      type: "string",
      minLength: 10
    },
    description: {
      type: "string",
      minLength: 20
    },
    status: {
      type: "string",
      enum: [
        "PENDING",
        "IN_PROGESS",
        "COMPLETED",
        "CANCELLED",
        "FAILED",
      ]
    }
  }
}

export default {
  deleteUserByIdSchemaQuery,
  deleteTaskByIdSchemaQuery,
  updateUserByIdSchemaQuery,
  updateTaskByIdSchemaQuery,
  getUserByIdSchemaQuery,
  updateUserByIdSchemaBody,
  updateTaskByIdSchemaBody,
  createUserSchemaBody,
  loginUserSchemaBody,
  getTaskByIdSchemaQuery,
  createTaskSchemaBody,
};
