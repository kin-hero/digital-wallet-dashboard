import type { FastifyInstance } from "fastify";
import { checkWalletAgeSchema, walletBalanceWithCurrencySchema } from "../schemas/wallet.schema";
import { checkWalletAge, getWalletBalanceWithCurrency } from "../controllers/wallet";

export default function walletRoutes(fastify: FastifyInstance) {
  fastify.get("/:address/is-old", { schema: checkWalletAgeSchema }, checkWalletAge);
  fastify.get("/:address/balance", { schema: walletBalanceWithCurrencySchema }, getWalletBalanceWithCurrency);
}
