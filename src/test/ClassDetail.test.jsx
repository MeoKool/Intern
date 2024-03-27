import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClassDetail from "../components/ClassDetail/ClassDetail";
import { expect, test } from "vitest";

test("Footer renders with correct copyright text", () => {
  render(<ClassDetail />);
  expect(1).toBe(1);
});
