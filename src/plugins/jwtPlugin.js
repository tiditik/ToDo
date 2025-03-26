import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

const jwtPlugin = fastifyPlugin(async function (fastify, opts) {
  fastify.register(fastifyJwt, { secret: Bun.env.JWT_ACCESS_TOKEN_SECRET });

  fastify.decorate("jwtAuth", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({ message: "Unauthorized" });
    }
  });
});

export default jwtPlugin;
