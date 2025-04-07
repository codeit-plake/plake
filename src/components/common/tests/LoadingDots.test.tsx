import { render } from "@testing-library/react";

import LoadingDots from "@/components/common/LoadingDots";

describe("LoadingDots 컴포넌트 테스트", () => {
  it("기본 color(gray)로 렌더링된 결과가 스냅샷과 일치한다", () => {
    const { container } = render(<LoadingDots />);
    expect(container).toMatchSnapshot();
  });

  it("color가 purple일 때 스냅샷과 일치한다", () => {
    const { container } = render(<LoadingDots color="purple" />);
    expect(container).toMatchSnapshot();
  });
});
