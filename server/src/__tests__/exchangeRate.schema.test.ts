import { describe, it, expect } from "vitest";
import { exchangeRateBodySchema } from "../schemas/exchangeRate.schema";
import { currencySchema } from "../schemas/common.schema";

describe("Exchange Rate Schema Validation", () => {
  describe("currencySchema", () => {
    describe("valid currencies", () => {
      it("should accept USD", () => {
        const result = currencySchema.safeParse("USD");
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe("USD");
        }
      });

      it("should accept EUR", () => {
        const result = currencySchema.safeParse("EUR");
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe("EUR");
        }
      });
    });

    describe("invalid currencies", () => {
      it("should reject lowercase usd", () => {
        const result = currencySchema.safeParse("usd");
        expect(result.success).toBe(false);
      });

      it("should reject GBP", () => {
        const result = currencySchema.safeParse("GBP");
        expect(result.success).toBe(false);
      });

      it("should reject JPY", () => {
        const result = currencySchema.safeParse("JPY");
        expect(result.success).toBe(false);
      });

      it("should reject empty string", () => {
        const result = currencySchema.safeParse("");
        expect(result.success).toBe(false);
      });

      it("should reject null", () => {
        const result = currencySchema.safeParse(null);
        expect(result.success).toBe(false);
      });

      it("should reject undefined", () => {
        const result = currencySchema.safeParse(undefined);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("exchangeRateBodySchema", () => {
    describe("valid exchange rate bodies", () => {
      it("should accept valid USD rate", () => {
        const validBody = {
          currency: "USD",
          rate: 3000,
        };
        const result = exchangeRateBodySchema.safeParse(validBody);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.currency).toBe("USD");
          expect(result.data.rate).toBe(3000);
        }
      });

      it("should accept valid EUR rate", () => {
        const validBody = {
          currency: "EUR",
          rate: 2500,
        };
        const result = exchangeRateBodySchema.safeParse(validBody);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.currency).toBe("EUR");
          expect(result.data.rate).toBe(2500);
        }
      });

      it("should accept decimal rate values", () => {
        const validBody = {
          currency: "USD",
          rate: 3000.50,
        };
        const result = exchangeRateBodySchema.safeParse(validBody);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.rate).toBe(3000.50);
        }
      });

      it("should accept very large rate values", () => {
        const validBody = {
          currency: "USD",
          rate: 1000000,
        };
        const result = exchangeRateBodySchema.safeParse(validBody);
        expect(result.success).toBe(true);
      });

      it("should accept very small positive rate values", () => {
        const validBody = {
          currency: "USD",
          rate: 0.01,
        };
        const result = exchangeRateBodySchema.safeParse(validBody);
        expect(result.success).toBe(true);
      });
    });

    describe("invalid exchange rate bodies", () => {
      it("should reject invalid currency", () => {
        const invalidBody = {
          currency: "GBP",
          rate: 3000,
        };
        const result = exchangeRateBodySchema.safeParse(invalidBody);
        expect(result.success).toBe(false);
      });

      it("should reject negative rate", () => {
        const invalidBody = {
          currency: "USD",
          rate: -100,
        };
        const result = exchangeRateBodySchema.safeParse(invalidBody);
        expect(result.success).toBe(false);
      });

      it("should reject zero rate", () => {
        const invalidBody = {
          currency: "USD",
          rate: 0,
        };
        const result = exchangeRateBodySchema.safeParse(invalidBody);
        expect(result.success).toBe(false);
      });

      it("should reject missing currency field", () => {
        const invalidBody = {
          rate: 3000,
        };
        const result = exchangeRateBodySchema.safeParse(invalidBody);
        expect(result.success).toBe(false);
      });

      it("should reject missing rate field", () => {
        const invalidBody = {
          currency: "USD",
        };
        const result = exchangeRateBodySchema.safeParse(invalidBody);
        expect(result.success).toBe(false);
      });

      it("should reject rate as string", () => {
        const invalidBody = {
          currency: "USD",
          rate: "3000",
        };
        const result = exchangeRateBodySchema.safeParse(invalidBody);
        expect(result.success).toBe(false);
      });

      it("should reject empty object", () => {
        const invalidBody = {};
        const result = exchangeRateBodySchema.safeParse(invalidBody);
        expect(result.success).toBe(false);
      });

      it("should reject null rate", () => {
        const invalidBody = {
          currency: "USD",
          rate: null,
        };
        const result = exchangeRateBodySchema.safeParse(invalidBody);
        expect(result.success).toBe(false);
      });

      it("should reject undefined rate", () => {
        const invalidBody = {
          currency: "USD",
          rate: undefined,
        };
        const result = exchangeRateBodySchema.safeParse(invalidBody);
        expect(result.success).toBe(false);
      });
    });
  });
});
