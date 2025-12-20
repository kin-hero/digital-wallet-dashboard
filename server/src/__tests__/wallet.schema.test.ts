import { describe, it, expect } from "vitest";
import { ethereumAddressSchema, currencySchema } from "../schemas/common.schema";
import { ethereumAddressParams, currencyQueryString } from "../schemas/wallet.schema";

describe("Schema Validation", () => {
  describe("ethereumAddressSchema", () => {
    describe("valid addresses", () => {
      it("should accept valid Ethereum address with lowercase hex", () => {
        const validAddress = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
        const result = ethereumAddressSchema.safeParse(validAddress);
        expect(result.success).toBe(true);
      });

      it("should accept valid Ethereum address with uppercase hex", () => {
        const validAddress = "0xDE0B295669A9FD93D5F28D9EC85E40F4CB697BAE";
        const result = ethereumAddressSchema.safeParse(validAddress);
        expect(result.success).toBe(true);
      });

      it("should accept valid Ethereum address with mixed case", () => {
        const validAddress = "0xDe0B295669a9Fd93D5f28d9Ec85E40f4Cb697bAe";
        const result = ethereumAddressSchema.safeParse(validAddress);
        expect(result.success).toBe(true);
      });
    });

    describe("invalid addresses", () => {
      it("should reject address without 0x prefix", () => {
        const invalidAddress = "de0b295669a9fd93d5f28d9ec85e40f4cb697bae";
        const result = ethereumAddressSchema.safeParse(invalidAddress);
        expect(result.success).toBe(false);
      });

      it("should reject address that is too short", () => {
        const invalidAddress = "0xde0b295669a9fd93d5f28d9ec85e";
        const result = ethereumAddressSchema.safeParse(invalidAddress);
        expect(result.success).toBe(false);
      });

      it("should reject address that is too long", () => {
        const invalidAddress = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae123";
        const result = ethereumAddressSchema.safeParse(invalidAddress);
        expect(result.success).toBe(false);
      });

      it("should reject address with invalid characters (non-hex)", () => {
        const invalidAddress = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697baz";
        const result = ethereumAddressSchema.safeParse(invalidAddress);
        expect(result.success).toBe(false);
      });

      it("should reject empty string", () => {
        const invalidAddress = "";
        const result = ethereumAddressSchema.safeParse(invalidAddress);
        expect(result.success).toBe(false);
      });

      it("should reject just 0x prefix", () => {
        const invalidAddress = "0x";
        const result = ethereumAddressSchema.safeParse(invalidAddress);
        expect(result.success).toBe(false);
      });
    });
  });

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

  describe("ethereumAddressParams (object schema)", () => {
    it("should accept valid address object", () => {
      const validParams = { address: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae" };
      const result = ethereumAddressParams.safeParse(validParams);
      expect(result.success).toBe(true);
    });

    it("should reject invalid address in object", () => {
      const invalidParams = { address: "invalid-address" };
      const result = ethereumAddressParams.safeParse(invalidParams);
      expect(result.success).toBe(false);
    });

    it("should reject missing address field", () => {
      const invalidParams = {};
      const result = ethereumAddressParams.safeParse(invalidParams);
      expect(result.success).toBe(false);
    });
  });

  describe("currencyQueryString (object schema)", () => {
    it("should accept valid currency in querystring object", () => {
      const validQuery = { currency: "USD" };
      const result = currencyQueryString.safeParse(validQuery);
      expect(result.success).toBe(true);
    });

    it("should reject invalid currency in querystring object", () => {
      const invalidQuery = { currency: "GBP" };
      const result = currencyQueryString.safeParse(invalidQuery);
      expect(result.success).toBe(false);
    });

    it("should reject missing currency field", () => {
      const invalidQuery = {};
      const result = currencyQueryString.safeParse(invalidQuery);
      expect(result.success).toBe(false);
    });
  });
});
