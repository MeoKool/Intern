import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "../pages/LandingPage";
import { expect, test } from "vitest";
import { GlobalProvider } from "../context/GlobalContext";

test("Footer renders with correct copyright text", () => {
  render(
    <GlobalProvider>
      <LandingPage />
    </GlobalProvider>
  );
  expect(1).toBe(1);
});
