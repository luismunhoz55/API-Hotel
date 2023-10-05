import fastify from "fastify";

export const app = fastify()

app.get('/test', async (request, reply) => {
    return "rararar"
})
