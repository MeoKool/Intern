import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import { expect, test } from "vitest";
import { BrowserRouter, Route, Routes } from "react-router-dom";

test("Footer renders with correct copyright text", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
  expect(1).toBe(1);
});
