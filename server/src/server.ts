import Fastify, { type FastifyError } from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import cors from "@fastify/cors";
import walletRoutes from "./routes/wallet";
import { config } from "./config";
import exchangeRateRoutes from "./routes/exchangeRate";

const fastify = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

// Register Zod compilers for validation and serialization
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

// Register plugins
fastify.register(cors, {
  origin: config.frontEndUrl,
});

// Register routes
fastify.register(walletRoutes, { prefix: "/api/wallet" });
fastify.register(exchangeRateRoutes, { prefix: "/api/exchange-rate" });

// Health check route
fastify.get("/health", () => {
  return { status: "ok", message: "Server is running" };
});

// Global error handler
fastify.setErrorHandler((error: FastifyError, _request, reply) => {
  if (error.validation) {
    return reply.status(400).send({
      statusCode: 400,
      message: error.message,
    });
  }

  // Log unexpected errors
  fastify.log.error(error);

  return reply.status(500).send({
    statusCode: 500,
    message: "Internal Server Error",
  });
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: config.port, host: "0.0.0.0" });
    console.log(`🚀 Server is running on http://localhost:${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

await start();
