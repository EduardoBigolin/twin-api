import { describe, expect, it } from "vitest";
import { GetProductById } from "../../query/getProduct";
import { Setup } from "../application/setup";

describe("GetProductById", () => {
  it("getProductData", async () => {
    const newProduct = await Setup.getProduct();
    const product = await new GetProductById().execute(
      newProduct.body.product as string
    );
    expect(product).toBeTruthy();
    expect(product).not.toBe(null);
  });

  it("should return false if id is invalid", async () => {
    const product = await new GetProductById().execute("1");
    expect(product).toBe(null);
  });
});
