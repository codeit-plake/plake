import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import CreateReviewModal from "@/components/modals/create-review-modal/CreateReviewModal";
import { useCreateReview as _useCreateReview } from "@/hooks/review/useCreateReview";
import { useModal as _useModal } from "@/hooks/useModal";
import { setupModalRoot } from "@/utils/test-utils/setupModalRoot";

jest.mock("@/hooks/review/useCreateReview");
jest.mock("@/hooks/useModal");

const mockHandleCreateReview = jest.fn();
const mockOnOpen = jest.fn();
const mockOnClose = jest.fn();

beforeEach(() => {
  (_useCreateReview as jest.Mock).mockReturnValue({
    handleCreateReview: mockHandleCreateReview,
    isPending: false,
    isError: false,
  });

  (_useModal as jest.Mock).mockReturnValue({
    onOpen: mockOnOpen,
    onClose: mockOnClose,
    isOpen: false,
  });
});

describe("CreateReviewModal", () => {
  setupModalRoot();

  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    type: "createReview" as const,
    reviewTargetId: 123,
  };

  it("모달 제목, 평점 컴포넌트, textarea, 버튼들이 렌더링된다.", () => {
    render(<CreateReviewModal {...defaultProps} />);
    expect(screen.getByText("리뷰 쓰기")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/리뷰는 프로그램 운영/i),
    ).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();
    expect(screen.getByText("리뷰 등록")).toBeInTheDocument();
  });

  it("리뷰 등록 버튼 클릭 시 handleCreateReview가 호출되고 모달이 닫힌다.", async () => {
    render(<CreateReviewModal {...defaultProps} />);

    fireEvent.click(screen.getByTestId("rating-heart-5"));
    fireEvent.change(screen.getByPlaceholderText(/리뷰는 프로그램 운영/i), {
      target: { value: "좋은 경험이었어요!" },
    });

    const submitButton = await screen.findByRole("button", {
      name: "리뷰 등록",
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleCreateReview).toHaveBeenCalledWith({
        gatheringId: 123,
        score: 5,
        comment: "좋은 경험이었어요!",
      });
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it("취소 버튼 클릭 시 onClose가 호출된다.", () => {
    render(<CreateReviewModal {...defaultProps} />);
    fireEvent.click(screen.getByText("취소"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("입력값이 없을 경우 등록 버튼은 비활성화된다.", () => {
    render(<CreateReviewModal {...defaultProps} />);
    const submitButton = screen.getByRole("button", { name: "리뷰 등록" });
    expect(submitButton).toBeDisabled();
  });

  it("리뷰 생성 중 로딩 상태가 되면 스피너가 표시된다.", () => {
    (_useCreateReview as jest.Mock).mockReturnValue({
      handleCreateReview: mockHandleCreateReview,
      isPending: true,
      isError: false,
    });

    render(<CreateReviewModal {...defaultProps} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("리뷰 생성 실패 시 AlertModal이 표시된다.", () => {
    (_useModal as jest.Mock).mockReturnValue({
      onOpen: mockOnOpen,
      onClose: mockOnClose,
      isOpen: true,
    });

    render(<CreateReviewModal {...defaultProps} />);
    expect(
      screen.getByText(
        text =>
          text.includes("리뷰 등록에 실패했습니다.") &&
          text.includes("잠시 후 다시 시도해주세요."),
      ),
    ).toBeInTheDocument();
  });
});
