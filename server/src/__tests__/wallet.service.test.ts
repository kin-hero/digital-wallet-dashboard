import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { checkWalletAge } from "../services/wallet";
import * as walletInfra from "../infrastructure/wallet";
import type { EtherscanTxResponse } from "../schemas/etherscan.schema";

// Mock the infrastructure layer
vi.mock("../infrastructure/wallet");

describe("Wallet Service - checkWalletAge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock current date to make tests deterministic
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-12-20T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("when wallet has no transactions", () => {
    it("should return isOld: false and lastTransactionDate: Never", async () => {
      // Arrange
      const mockResponse: EtherscanTxResponse = {
        status: "1",
        message: "OK",
        result: [], // No transactions
      };
      vi.mocked(walletInfra.getTheMostRecentTransactionOfAddress).mockResolvedValue(mockResponse);

      // Act
      const result = await checkWalletAge("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.message).toBe("Success");
      expect(result.result.isOld).toBe(false);
      expect(result.result.lastTransactionDate).toBe("Never");
    });
  });

  describe("when wallet last transaction is older than 1 year", () => {
    it("should return isOld: true for transaction 400 days ago", async () => {
      // Arrange - Transaction from 400 days ago
      const daysAgo = 400;
      const timestamp = Math.floor(Date.now() / 1000) - daysAgo * 24 * 60 * 60;
      const transactionDate = new Date(timestamp * 1000);

      const mockResponse: EtherscanTxResponse = {
        status: "1",
        message: "OK",
        result: [
          {
            blockNumber: "12345678",
            timeStamp: timestamp.toString(),
            hash: "0xabc123...",
            nonce: "1",
            blockHash: "0xdef456...",
            transactionIndex: "0",
            from: "0xfrom...",
            to: "0xto...",
            value: "1000000000000000000",
            gas: "21000",
            gasPrice: "20000000000",
            isError: "0",
            txreceipt_status: "1",
            input: "0x",
            contractAddress: "",
            cumulativeGasUsed: "21000",
            gasUsed: "21000",
            confirmations: "100",
            methodId: "0x",
            functionName: "",
          },
        ],
      };
      vi.mocked(walletInfra.getTheMostRecentTransactionOfAddress).mockResolvedValue(mockResponse);

      // Act
      const result = await checkWalletAge("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.message).toBe("Success");
      expect(result.result.isOld).toBe(true);
      expect(result.result.lastTransactionDate).toBe(transactionDate.toISOString().substring(0, 10));
    });

    it("should return isOld: true for transaction exactly 365 days ago (boundary test)", async () => {
      // Arrange - Transaction exactly 365 days ago
      const daysAgo = 365;
      const timestamp = Math.floor(Date.now() / 1000) - daysAgo * 24 * 60 * 60;

      const mockResponse: EtherscanTxResponse = {
        status: "1",
        message: "OK",
        result: [
          {
            blockNumber: "12345678",
            timeStamp: timestamp.toString(),
            hash: "0xabc123...",
            nonce: "1",
            blockHash: "0xdef456...",
            transactionIndex: "0",
            from: "0xfrom...",
            to: "0xto...",
            value: "1000000000000000000",
            gas: "21000",
            gasPrice: "20000000000",
            isError: "0",
            txreceipt_status: "1",
            input: "0x",
            contractAddress: "",
            cumulativeGasUsed: "21000",
            gasUsed: "21000",
            confirmations: "100",
            methodId: "0x",
            functionName: "",
          },
        ],
      };
      vi.mocked(walletInfra.getTheMostRecentTransactionOfAddress).mockResolvedValue(mockResponse);

      // Act
      const result = await checkWalletAge("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");

      // Assert
      expect(result.result.isOld).toBe(true);
    });
  });

  describe("when wallet last transaction is less than 1 year old", () => {
    it("should return isOld: false for transaction 300 days ago", async () => {
      // Arrange - Transaction from 300 days ago
      const daysAgo = 300;
      const timestamp = Math.floor(Date.now() / 1000) - daysAgo * 24 * 60 * 60;
      const transactionDate = new Date(timestamp * 1000);

      const mockResponse: EtherscanTxResponse = {
        status: "1",
        message: "OK",
        result: [
          {
            blockNumber: "12345678",
            timeStamp: timestamp.toString(),
            hash: "0xabc123...",
            nonce: "1",
            blockHash: "0xdef456...",
            transactionIndex: "0",
            from: "0xfrom...",
            to: "0xto...",
            value: "1000000000000000000",
            gas: "21000",
            gasPrice: "20000000000",
            isError: "0",
            txreceipt_status: "1",
            input: "0x",
            contractAddress: "",
            cumulativeGasUsed: "21000",
            gasUsed: "21000",
            confirmations: "100",
            methodId: "0x",
            functionName: "",
          },
        ],
      };
      vi.mocked(walletInfra.getTheMostRecentTransactionOfAddress).mockResolvedValue(mockResponse);

      // Act
      const result = await checkWalletAge("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.result.isOld).toBe(false);
      expect(result.result.lastTransactionDate).toBe(transactionDate.toISOString().substring(0, 10));
    });

    it("should return isOld: false for transaction 364 days ago (boundary test)", async () => {
      // Arrange - Transaction 364 days ago (just before threshold)
      const daysAgo = 364;
      const timestamp = Math.floor(Date.now() / 1000) - daysAgo * 24 * 60 * 60;

      const mockResponse: EtherscanTxResponse = {
        status: "1",
        message: "OK",
        result: [
          {
            blockNumber: "12345678",
            timeStamp: timestamp.toString(),
            hash: "0xabc123...",
            nonce: "1",
            blockHash: "0xdef456...",
            transactionIndex: "0",
            from: "0xfrom...",
            to: "0xto...",
            value: "1000000000000000000",
            gas: "21000",
            gasPrice: "20000000000",
            isError: "0",
            txreceipt_status: "1",
            input: "0x",
            contractAddress: "",
            cumulativeGasUsed: "21000",
            gasUsed: "21000",
            confirmations: "100",
            methodId: "0x",
            functionName: "",
          },
        ],
      };
      vi.mocked(walletInfra.getTheMostRecentTransactionOfAddress).mockResolvedValue(mockResponse);

      // Act
      const result = await checkWalletAge("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");

      // Assert
      expect(result.result.isOld).toBe(false);
    });

    it("should return isOld: false for very recent transaction (1 day ago)", async () => {
      // Arrange - Transaction from 1 day ago
      const daysAgo = 1;
      const timestamp = Math.floor(Date.now() / 1000) - daysAgo * 24 * 60 * 60;

      const mockResponse: EtherscanTxResponse = {
        status: "1",
        message: "OK",
        result: [
          {
            blockNumber: "12345678",
            timeStamp: timestamp.toString(),
            hash: "0xabc123...",
            nonce: "1",
            blockHash: "0xdef456...",
            transactionIndex: "0",
            from: "0xfrom...",
            to: "0xto...",
            value: "1000000000000000000",
            gas: "21000",
            gasPrice: "20000000000",
            isError: "0",
            txreceipt_status: "1",
            input: "0x",
            contractAddress: "",
            cumulativeGasUsed: "21000",
            gasUsed: "21000",
            confirmations: "100",
            methodId: "0x",
            functionName: "",
          },
        ],
      };
      vi.mocked(walletInfra.getTheMostRecentTransactionOfAddress).mockResolvedValue(mockResponse);

      // Act
      const result = await checkWalletAge("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");

      // Assert
      expect(result.result.isOld).toBe(false);
    });
  });

  describe("response structure", () => {
    it("should always include statusCode, message, and result", async () => {
      // Arrange
      const mockResponse: EtherscanTxResponse = {
        status: "1",
        message: "OK",
        result: [],
      };
      vi.mocked(walletInfra.getTheMostRecentTransactionOfAddress).mockResolvedValue(mockResponse);

      // Act
      const result = await checkWalletAge("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");

      // Assert
      expect(result).toHaveProperty("statusCode");
      expect(result).toHaveProperty("message");
      expect(result).toHaveProperty("result");
      expect(result.result).toHaveProperty("isOld");
      expect(result.result).toHaveProperty("lastTransactionDate");
    });
  });
});
