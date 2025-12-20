import type { FastifyInstance } from "fastify";
import { exchangeRateSchema, updateExchangeRateSchema } from "../schemas/exchangeRate.schema";
import { getEthereumExchangeRate, updateEthereumExchangeRate } from "../controllers/exchangeRate";

export default function exchangeRateRoutes(fastify: FastifyInstance) {
  fastify.get("/", { schema: exchangeRateSchema }, getEthereumExchangeRate);
  fastify.patch("/", { schema: updateExchangeRateSchema }, updateEthereumExchangeRate);
}
