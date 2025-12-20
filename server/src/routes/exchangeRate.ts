import type { FastifyInstance } from "fastify";
import { exchangeRateSchema } from "../schemas/exchangeRate.schema";
import { getEthereumExchangeRate } from "../controllers/exchangeRate";

export default function exchangeRateRoutes(fastify: FastifyInstance) {
  fastify.get("/", { schema: exchangeRateSchema }, getEthereumExchangeRate);
}
