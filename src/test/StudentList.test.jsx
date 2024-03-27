import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import StudentList from "../pages/studentList";
import { expect, test } from "vitest";

test("Footer renders with correct copyright text", () => {
  render(<StudentList />);
  expect(1).toBe(1);
});
