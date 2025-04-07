import { render, screen, waitFor } from "@testing-library/react";
import { useInView } from "framer-motion";

import InViewSlide from "@/components/ui/InViewSlide";

jest.mock("framer-motion", () => ({
  ...jest.requireActual("framer-motion"),
  useInView: jest.fn(),
}));

describe("InViewSlide", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("children이 정상적으로 렌더링되어야 함", () => {
    render(<InViewSlide direction="left">테스트 컨텐츠</InViewSlide>);

    expect(screen.getByText("테스트 컨텐츠")).toBeInTheDocument();
  });

  it("useInView가 false일 때 hidden 상태가 유지되어야 함", () => {
    (useInView as jest.Mock).mockReturnValue(false);

    const { container } = render(
      <InViewSlide direction="left">테스트 컨텐츠</InViewSlide>,
    );

    expect(container.firstChild).toHaveStyle("opacity: 0");
  });

  it("useInView가 true일 때 visible 상태가 적용되어야 함", async () => {
    (useInView as jest.Mock).mockReturnValue(true);

    const { container } = render(
      <InViewSlide direction="left">테스트 컨텐츠</InViewSlide>,
    );

    await waitFor(
      () => {
        expect(container.firstChild).toHaveStyle("opacity: 1");
      },
      { timeout: 1500 },
    );
  });
});
