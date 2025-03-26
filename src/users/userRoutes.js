import userController from "./userController.js";
import userValidationSchemas from "../validationSchemas/userValidation.js";

async function routes(fastify, options) {
  fastify.get(
    "/",
    { onRequest: [fastify.jwtAuth] },
    userController.getAllUsers,
  );
  fastify.get(
    "/:id",
    { schema: { params: userValidationSchemas.getUserByIdSchemaQuery } },
    userController.getUserById,
  );
  fastify.post(
    "/",
    { schema: { body: userValidationSchemas.createUserSchemaBody } },
    userController.craeteUser,
  );
  fastify.put(
    "/:id",
    {
      onRequest: [fastify.jwtAuth],
      schema: {
        params: userValidationSchemas.updateUserByIdSchemaQuery,
        body: userValidationSchemas.updateUserByIdSchemaBody,
      },
    },
    userController.updateUser,
  );
  fastify.delete(
    "/:id",
    {
      onRequest: [fastify.jwtAuth],
      schema: { params: userValidationSchemas.deleteUserByIdSchemaQuery },
    },
    userController.deleteUser,
  );
  fastify.post(
    "/login",
    { schema: { body: userValidationSchemas.loginUserSchemaBody } },
    userController.loginUser,
  );
}

export default routes;
