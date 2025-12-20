import type { FastifyInstance } from "fastify";
import { checkWalletAgeSchema } from "../schemas/wallet.schema";
import { checkWalletAge } from "../controllers/wallet";

export default function walletRoutes(fastify: FastifyInstance) {
  fastify.get("/:address/is-old", { schema: checkWalletAgeSchema }, checkWalletAge);
}
