import taskController from "./taskController.js";
import userValidationSchemas from "../validationSchemas/userValidation.js";

async function routes(fastify, options) {
    fastify.get('/', taskController.getTasks);
    fastify.get('/:id', {
        schema: {
            params: userValidationSchemas.getTaskByIdSchemaQuery
        }
    }, taskController.getTaskById);
    fastify.post('/', {
        onRequest: [fastify.jwtAuth],
        schema: {
            body: userValidationSchemas.createTaskSchemaBody
        }
    }, taskController.createTask);
    fastify.put('/:id', {
        schema: {
            params: userValidationSchemas.updateTaskByIdSchemaQuery,
            body: userValidationSchemas.updateTaskByIdSchemaBody,
        }
    }, taskController.updateTask);
    fastify.delete('/:id', {
        schema: {
            params: userValidationSchemas.deleteTaskByIdSchemaQuery,
        }
    }, taskController.deleteTask);
}

export default routes;