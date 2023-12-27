import { getByText, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import About from "./About";

describe("About component", () => {
  it("should render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const html = asFragment();

    expect(html).toMatchSnapshot();
  });
});
