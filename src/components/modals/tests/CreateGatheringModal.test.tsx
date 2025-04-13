import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { setupModalRoot } from "@/utils/test-utils/setupModalRoot";

import CreateGatheringModal from "../create-gathering-modal/CreateGatheringModal";

// 모의 구현
const mockMutate = jest.fn();
jest.mock("@/hooks/gathering/useCreateGathering", () => ({
  useCreateGathering: () => ({
    mutate: mockMutate,
    isPending: false,
    isError: false,
    isSuccess: true,
  }),
}));
jest.mock("@/hooks/useModal", () => ({
  useModal: () => ({
    onOpen: jest.fn(),
    onClose: jest.fn(),
    isOpen: false,
  }),
}));

describe("CreateGatheringModal 컴포넌트 테스트", () => {
  setupModalRoot();

  const setup = () =>
    render(<CreateGatheringModal isOpen={true} onClose={jest.fn()} />);

  it("모달 제목과 버튼이 렌더링된다", () => {
    setup();
    expect(screen.getByText("모임 만들기")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  it("유효하지 않은 상태에서는 확인 버튼이 비활성화된다", () => {
    setup();
    const submitButton = screen.getByRole("button", { name: "확인" });
    expect(submitButton).toBeDisabled();
  });

  it("모든 필드를 채워야만 확인 버튼이 활성화된다", async () => {
    setup();

    const nameInput = screen.getByPlaceholderText("모임 이름을 입력해주세요.");
    fireEvent.change(nameInput, { target: { value: "스터디 모임" } });

    const submitButton = screen.getByRole("button", { name: "확인" });

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});
