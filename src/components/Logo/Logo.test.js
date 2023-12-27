import { render } from "@testing-library/react";
import Logo from "./Logo";

describe("The logo component", () => {
  it("alt contains correct value", () => {
    render(<Logo height="40" width="64" />);
    const logoImg = document.querySelector("img");
    expect(logoImg.alt).toContain("Logo");
  });

  it("src contains correct value", () => {
    render(<Logo height="40" width="64" />);
    const logoImg = document.querySelector("img");
    expect(logoImg.src).toContain("Logo.svg");
  });
});
