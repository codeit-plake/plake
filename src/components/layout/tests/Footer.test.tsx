import { render, screen } from "@testing-library/react";

import Footer from "../Footer";

describe("Footer 컴포넌트 테스트", () => {
  it("Footer가 정상적으로 렌더링된다.", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("Footer에 저작권 정보가 포함되어 있다.", () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/© 2025 PLAKE/i);
    expect(copyrightText).toBeInTheDocument();
  });
});
