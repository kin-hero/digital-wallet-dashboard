import type { FastifyRequest, FastifyReply } from "fastify";
import { getEthereumExchangeRate as getEthereumExchangeRateFromService } from "../service/exchangeRate";

// In production, this should be async when fetching from a real API or database
export const getEthereumExchangeRate = (_request: FastifyRequest, reply: FastifyReply) => {
  const response = getEthereumExchangeRateFromService();
  return reply.status(200).send(response);
};
