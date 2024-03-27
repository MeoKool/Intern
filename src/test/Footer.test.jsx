import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../components/Footer/Footer";
import { expect, test } from "vitest";

test("Footer renders with correct copyright text", () => {
  render(<Footer />);
  const copyrightText = screen.getByText(
    /Copyright@2024 BA Warrior. All rights reserved./i
  );
  expect(copyrightText).toBeInTheDocument();
});
