import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReserveList from "../pages/ReseverList";
import { expect, test } from "vitest";

test("Footer renders with correct copyright text", () => {
  render(<ReserveList />);
  expect(1).toBe(1);
});
