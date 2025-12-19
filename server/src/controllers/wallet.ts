import type { FastifyRequest, FastifyReply } from "fastify";
import type { CheckWalletAgeParams, CheckWalletAgeResponse } from "../schemas/wallet.schema";
import verifyWalletAge from "../service/wallet";
import { EtherscanApiError, ServiceUnavailableError } from "../errors";

export const checkWalletAge = async (request: FastifyRequest<{ Params: CheckWalletAgeParams }>, reply: FastifyReply) => {
  try {
    const { address } = request.params;
    const response: CheckWalletAgeResponse = await verifyWalletAge(address);
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
