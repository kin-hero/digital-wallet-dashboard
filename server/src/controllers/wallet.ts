import type { FastifyRequest, FastifyReply } from "fastify";
import type { EthereumAddressParams, CheckWalletAgeResponse, CurrencyQueryString, WalletBalanceWithCurrencyResponse } from "../schemas/wallet.schema";
import { checkWalletAge as checkWalletAgeFromService, getWalletBalanceWithCurrency as getWalletBalanceWithCurrencyFromService } from "../services/wallet";
import { EtherscanApiError, ServiceUnavailableError } from "../errors";

export const checkWalletAge = async (request: FastifyRequest<{ Params: EthereumAddressParams }>, reply: FastifyReply) => {
  try {
    const { address } = request.params;
    const response: CheckWalletAgeResponse = await checkWalletAgeFromService(address);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof EtherscanApiError) {
      return reply.status(error.statusCode).send(error.toJSON());
    }
    if (error instanceof ServiceUnavailableError) {
      return reply.status(error.statusCode).send(error.toJSON());
    }
    throw error;
  }
};

export const getWalletBalanceWithCurrency = async (request: FastifyRequest<{ Params: EthereumAddressParams; Querystring: CurrencyQueryString }>, reply: FastifyReply) => {
  try {
    const { address } = request.params;
    const { currency } = request.query;
    const response: WalletBalanceWithCurrencyResponse = await getWalletBalanceWithCurrencyFromService(address, currency);
    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof EtherscanApiError) {
      return reply.status(error.statusCode).send(error.toJSON());
    }
    if (error instanceof ServiceUnavailableError) {
      return reply.status(error.statusCode).send(error.toJSON());
    }
    throw error;
  }
};
