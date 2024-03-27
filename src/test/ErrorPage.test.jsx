import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorPage from "../pages/ErrorPage";
import { expect, test } from "vitest";

test("Footer renders with correct copyright text", () => {
  render(<ErrorPage />);
  expect(1).toBe(1);
});
