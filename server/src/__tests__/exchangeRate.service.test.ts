import { describe, it, expect, vi, beforeEach } from "vitest";
import { getEthereumExchangeRate, updateEthereumExchangeRate } from "../services/exchangeRate";
import * as exchangeRateInfra from "../infrastructure/exchangeRate";

// Mock the infrastructure layer
vi.mock("../infrastructure/exchangeRate");

describe("Exchange Rate Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getEthereumExchangeRate", () => {
    it("should return current exchange rates with success status", () => {
      // Arrange
      const mockRates = {
        USD: 3000,
        EUR: 2500,
      };
      vi.mocked(exchangeRateInfra.getEthereumExchangeRate).mockReturnValue(mockRates);

      // Act
      const result = getEthereumExchangeRate();

      // Assert
      expect(result.statusCode).toBe(200);
      expect(result.message).toBe("Success");
      expect(result.result).toEqual(mockRates);
      expect(exchangeRateInfra.getEthereumExchangeRate).toHaveBeenCalledTimes(1);
    });

    it("should return different rates when infrastructure returns different values", () => {
      // Arrange
      const mockRates = {
        USD: 3500,
        EUR: 2800,
      };
      vi.mocked(exchangeRateInfra.getEthereumExchangeRate).mockReturnValue(mockRates);

      // Act
      const result = getEthereumExchangeRate();

      // Assert
      expect(result.result.USD).toBe(3500);
      expect(result.result.EUR).toBe(2800);
    });

    it("should have proper response structure", () => {
      // Arrange
      const mockRates = {
        USD: 3000,
        EUR: 2500,
      };
      vi.mocked(exchangeRateInfra.getEthereumExchangeRate).mockReturnValue(mockRates);

      // Act
      const result = getEthereumExchangeRate();

      // Assert
      expect(result).toHaveProperty("statusCode");
      expect(result).toHaveProperty("message");
      expect(result).toHaveProperty("result");
      expect(result.result).toHaveProperty("USD");
      expect(result.result).toHaveProperty("EUR");
    });
  });

  describe("updateEthereumExchangeRate", () => {
    describe("updating USD rate", () => {
      it("should update USD rate and return new exchange rates", () => {
        // Arrange
        const newUsdRate = 3500;
        const mockUpdatedRates = {
          USD: 3500,
          EUR: 2500,
        };
        vi.mocked(exchangeRateInfra.updateEthereumExchangeRate).mockReturnValue(mockUpdatedRates);

        // Act
        const result = updateEthereumExchangeRate("USD", newUsdRate);

        // Assert
        expect(result.statusCode).toBe(200);
        expect(result.message).toBe("Successfully updated USD to 3500");
        expect(result.result.USD).toBe(3500);
        expect(result.result.EUR).toBe(2500);
        expect(exchangeRateInfra.updateEthereumExchangeRate).toHaveBeenCalledWith("USD", 3500);
      });

      it("should handle large USD rate values", () => {
        // Arrange
        const largeRate = 1000000;
        const mockUpdatedRates = {
          USD: 1000000,
          EUR: 2500,
        };
        vi.mocked(exchangeRateInfra.updateEthereumExchangeRate).mockReturnValue(mockUpdatedRates);

        // Act
        const result = updateEthereumExchangeRate("USD", largeRate);

        // Assert
        expect(result.result.USD).toBe(1000000);
        expect(result.message).toContain("1000000");
      });

      it("should handle decimal USD rate values", () => {
        // Arrange
        const decimalRate = 3250.75;
        const mockUpdatedRates = {
          USD: 3250.75,
          EUR: 2500,
        };
        vi.mocked(exchangeRateInfra.updateEthereumExchangeRate).mockReturnValue(mockUpdatedRates);

        // Act
        const result = updateEthereumExchangeRate("USD", decimalRate);

        // Assert
        expect(result.result.USD).toBe(3250.75);
      });
    });

    describe("updating EUR rate", () => {
      it("should update EUR rate and return new exchange rates", () => {
        // Arrange
        const newEurRate = 2800;
        const mockUpdatedRates = {
          USD: 3000,
          EUR: 2800,
        };
        vi.mocked(exchangeRateInfra.updateEthereumExchangeRate).mockReturnValue(mockUpdatedRates);

        // Act
        const result = updateEthereumExchangeRate("EUR", newEurRate);

        // Assert
        expect(result.statusCode).toBe(200);
        expect(result.message).toBe("Successfully updated EUR to 2800");
        expect(result.result.EUR).toBe(2800);
        expect(result.result.USD).toBe(3000);
        expect(exchangeRateInfra.updateEthereumExchangeRate).toHaveBeenCalledWith("EUR", 2800);
      });

      it("should handle small EUR rate values", () => {
        // Arrange
        const smallRate = 0.01;
        const mockUpdatedRates = {
          USD: 3000,
          EUR: 0.01,
        };
        vi.mocked(exchangeRateInfra.updateEthereumExchangeRate).mockReturnValue(mockUpdatedRates);

        // Act
        const result = updateEthereumExchangeRate("EUR", smallRate);

        // Assert
        expect(result.result.EUR).toBe(0.01);
      });
    });

    describe("response structure", () => {
      it("should always include statusCode, message, and result", () => {
        // Arrange
        const mockUpdatedRates = {
          USD: 3000,
          EUR: 2500,
        };
        vi.mocked(exchangeRateInfra.updateEthereumExchangeRate).mockReturnValue(mockUpdatedRates);

        // Act
        const result = updateEthereumExchangeRate("USD", 3000);

        // Assert
        expect(result).toHaveProperty("statusCode");
        expect(result).toHaveProperty("message");
        expect(result).toHaveProperty("result");
        expect(result.result).toHaveProperty("USD");
        expect(result.result).toHaveProperty("EUR");
      });

      it("should include currency and rate in success message", () => {
        // Arrange
        const currency = "USD";
        const rate = 4000;
        const mockUpdatedRates = {
          USD: 4000,
          EUR: 2500,
        };
        vi.mocked(exchangeRateInfra.updateEthereumExchangeRate).mockReturnValue(mockUpdatedRates);

        // Act
        const result = updateEthereumExchangeRate(currency, rate);

        // Assert
        expect(result.message).toContain(currency);
        expect(result.message).toContain(rate.toString());
      });
    });

    describe("infrastructure layer interaction", () => {
      it("should call infrastructure update function with correct parameters", () => {
        // Arrange
        const mockUpdatedRates = {
          USD: 3200,
          EUR: 2500,
        };
        vi.mocked(exchangeRateInfra.updateEthereumExchangeRate).mockReturnValue(mockUpdatedRates);

        // Act
        updateEthereumExchangeRate("USD", 3200);

        // Assert
        expect(exchangeRateInfra.updateEthereumExchangeRate).toHaveBeenCalledTimes(1);
        expect(exchangeRateInfra.updateEthereumExchangeRate).toHaveBeenCalledWith("USD", 3200);
      });

      it("should return whatever the infrastructure layer returns", () => {
        // Arrange
        const customRates = {
          USD: 9999,
          EUR: 8888,
        };
        vi.mocked(exchangeRateInfra.updateEthereumExchangeRate).mockReturnValue(customRates);

        // Act
        const result = updateEthereumExchangeRate("EUR", 8888);

        // Assert
        expect(result.result).toEqual(customRates);
      });
    });
  });
});
