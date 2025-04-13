import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import {
  getObserverOf,
  intersect,
} from "@/utils/test-utils/intersectionObserverTestHelper";

import useIntersectionObserver from "../useIntersectionObserver";

const Observed = ({ onIntersect }: { onIntersect: () => void }) => {
  const { setTarget } = useIntersectionObserver({ onIntersect });
  return <div data-testid="observedTarget" ref={setTarget}></div>;
};

describe("useIntersectionObserver 훅 테스트", () => {
  it("observer 생성하기", () => {
    const onIntersect = jest.fn();
    const { getByTestId } = render(<Observed onIntersect={onIntersect} />);

    const observeTarget = getByTestId("observedTarget");
    const instance = getObserverOf(observeTarget);

    expect(instance.observe).toHaveBeenCalledWith(observeTarget);
  });

  it("교차되는 지점이 없다면 onIntersect는 실행되지 않는다.", () => {
    const onIntersect = jest.fn();
    const { getByTestId } = render(<Observed onIntersect={onIntersect} />);

    const observeTarget = getByTestId("observedTarget");
    intersect(observeTarget, false);

    expect(onIntersect).not.toHaveBeenCalled();
  });

  it("교차되는 지점이 있다면 onIntersect는 실행된다.", () => {
    const onIntersect = jest.fn();
    const { getByTestId } = render(<Observed onIntersect={onIntersect} />);

    const observeTarget = getByTestId("observedTarget");
    intersect(observeTarget, true);

    expect(onIntersect).toHaveBeenCalledTimes(1);
  });

  it("onIntersect가 2번 실행된다.", () => {
    const onIntersect = jest.fn();
    const { getByTestId } = render(<Observed onIntersect={onIntersect} />);

    const observedTarget = getByTestId("observedTarget");
    intersect(observedTarget, true);
    intersect(observedTarget, false);
    intersect(observedTarget, true);

    expect(onIntersect).toHaveBeenCalledTimes(2);
  });
});
