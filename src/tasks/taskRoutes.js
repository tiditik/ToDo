import taskController from "./taskController.js";
import userValidationSchemas from "../validationSchemas/userValidation.js";

async function routes(fastify, options) {
    fastify.get('/', taskController.getTasks);
    fastify.get('/:id', {
        schema: {
            params: userValidationSchemas.getTaskByIdSchemaQuery
        }
    }, taskController.getTaskById);
    fastify.post('/',{ onRequest: [fastify.jwtAuth], schema: { body: userValidationSchemas.createTaskSchemaBody } }, taskController.createTask);
}

export default routes;