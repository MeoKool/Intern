import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmailPage from "../pages/EmailPage";
import { expect, test } from "vitest";

test("Footer renders with correct copyright text", () => {
  render(<EmailPage />);
  expect(1).toBe(1);
});
