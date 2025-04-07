import { render } from "@testing-library/react";

import LoadingSpinner from "@/components/common/LoadingSpinner";

describe("LoadingSpinner 컴포넌트 테스트", () => {
  it("기본 렌더링 결과가 스냅샷과 일치한다", () => {
    const { container } = render(<LoadingSpinner />);
    expect(container).toMatchSnapshot();
  });

  it("size와 color 조합이 다를 때도 스냅샷이 정상적으로 생성된다", () => {
    const { container } = render(<LoadingSpinner size="lg" color="gray" />);
    expect(container).toMatchSnapshot();
  });

  it("접근성 텍스트가 포함된다", () => {
    const { getByText } = render(<LoadingSpinner />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
