import type { FastifyRequest, FastifyReply } from "fastify";
import type { CheckWalletAgeParams } from "../schemas/wallet.schema";
import verifyWalletAge from "../service/wallet";

export const checkWalletAge = async (request: FastifyRequest<{ Params: CheckWalletAgeParams }>, reply: FastifyReply) => {
  const { address } = request.params;
  const response = await verifyWalletAge(address);
  return reply.status(200).send(response);
};
