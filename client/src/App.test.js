import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders insert coin link", () => {
  render(<App />);
  const linkElement = screen.getByText(/INSERT COIN/i);
  expect(linkElement).toBeInTheDocument();
});
