import { z } from "zod";

const configSchema = z.object({
  port: z.number().int().positive().default(3001),
  etherscanApiKey: z.string().min(1, "Etherscan API key is required"),
  validWalletYears: z.number().positive().default(1),
  frontEndUrl: z.string().default("http://localhost:3000"),
});

const parseConfig = () => {
  const rawConfig = {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    etherscanApiKey: process.env.ETHERSCAN_API_KEY,
    validWalletYears: process.env.VALID_WALLET_YEAR ? Number(process.env.VALID_WALLET_YEAR) : 1,
    frontEndUrl: process.env.FRONTEND_URL,
  };

  return configSchema.parse(rawConfig);
};

export const config = parseConfig();
