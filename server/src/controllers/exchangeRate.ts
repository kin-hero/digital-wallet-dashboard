import type { FastifyRequest, FastifyReply } from "fastify";
import type { ExchangeRateBody } from "../schemas/exchangeRate.schema";
import { getEthereumExchangeRate as getEthereumExchangeRateFromService, updateEthereumExchangeRate as updateEthereumExchangeRateFromService } from "../services/exchangeRate";

// In production, this should be async when fetching from a real API or database
export const getEthereumExchangeRate = (_request: FastifyRequest, reply: FastifyReply) => {
  const response = getEthereumExchangeRateFromService();
  return reply.status(200).send(response);
};

export const updateEthereumExchangeRate = (request: FastifyRequest<{ Body: ExchangeRateBody }>, reply: FastifyReply) => {
  const { currency, rate } = request.body;
  const response = updateEthereumExchangeRateFromService(currency, rate);
  return reply.status(200).send(response);
};
