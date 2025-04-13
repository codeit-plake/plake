import { fireEvent, render, screen } from "@testing-library/react";

import Pagination from "@/components/ui/Pagination";

describe("Pagination 컴포넌트 테스트", () => {
  const onPageChange = jest.fn();

  describe("렌더링 테스트", () => {
    it("페이지네이션이 totalPage가 0이면 렌더링되지 않음", () => {
      const { container } = render(
        <Pagination
          totalPage={0}
          currentPage={1}
          onPageChange={onPageChange}
        />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("현재 페이지가 1일 때 이전 버튼이 보이지 않음", () => {
      render(
        <Pagination
          totalPage={10}
          currentPage={1}
          onPageChange={onPageChange}
        />,
      );
      expect(screen.queryByText("<")).not.toBeInTheDocument();
    });

    it("현재 페이지가 2 이상이면 이전 버튼이 표시됨", () => {
      render(
        <Pagination
          totalPage={10}
          currentPage={2}
          onPageChange={onPageChange}
        />,
      );
      expect(screen.getByText("<")).toBeInTheDocument();
    });

    it("현재 페이지가 totalPage이면 다음 버튼이 보이지 않음", () => {
      render(
        <Pagination
          totalPage={5}
          currentPage={5}
          onPageChange={onPageChange}
        />,
      );
      expect(screen.queryByText(">")).not.toBeInTheDocument();
    });

    it("현재 페이지가 totalPage보다 작으면 다음 버튼이 표시됨", () => {
      render(
        <Pagination
          totalPage={5}
          currentPage={3}
          onPageChange={onPageChange}
        />,
      );
      expect(screen.getByText(">")).toBeInTheDocument();
    });

    it("첫 페이지와 마지막 페이지가 1페이지 이상 차이나면 ...이 표시됨", () => {
      render(
        <Pagination
          totalPage={10}
          currentPage={5}
          onPageChange={onPageChange}
        />,
      );
      expect(screen.getAllByText("...")).toHaveLength(2);
    });
  });

  describe("이벤트 테스트", () => {
    it("페이지 버튼을 클릭하면 onPageChange가 호출됨", () => {
      render(
        <Pagination
          totalPage={5}
          currentPage={3}
          onPageChange={onPageChange}
        />,
      );
      fireEvent.click(screen.getByText("2"));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("이전 버튼을 클릭하면 이전 페이지로 이동함", () => {
      render(
        <Pagination
          totalPage={10}
          currentPage={5}
          onPageChange={onPageChange}
        />,
      );
      fireEvent.click(screen.getByText("<"));
      expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it("다음 버튼을 클릭하면 다음 페이지로 이동함", () => {
      render(
        <Pagination
          totalPage={10}
          currentPage={5}
          onPageChange={onPageChange}
        />,
      );
      fireEvent.click(screen.getByText(">"));
      expect(onPageChange).toHaveBeenCalledWith(6);
    });

    it("첫 페이지에서 첫 페이지 버튼을 클릭하면 onPageChange가 호출되지 않음", () => {
      render(
        <Pagination
          totalPage={10}
          currentPage={1}
          onPageChange={onPageChange}
        />,
      );
      fireEvent.click(screen.getByText("1"));
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });
});
