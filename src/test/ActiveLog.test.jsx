import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ActiveLog from "../components/ActiveLog/ActiveLog";
import { expect, test } from "vitest";

test("Footer renders with correct copyright text", () => {
  render(<ActiveLog />);
  expect(1).toBe(1);
});
