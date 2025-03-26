const getUserByIdSchemaQuery = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
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

const deleteUserByIdSchemaQuery = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
};

const updateUserByIdSchemaQuery = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
};

const updateUserByIdSchemaBody = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string",
      format: "email",
    },
  },
};

export default {
  deleteUserByIdSchemaQuery,
  updateUserByIdSchemaQuery,
  getUserByIdSchemaQuery,
  updateUserByIdSchemaBody,
  createUserSchemaBody,
  loginUserSchemaBody,
};
