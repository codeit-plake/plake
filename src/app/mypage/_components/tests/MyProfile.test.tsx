import { fireEvent, render, screen } from "@testing-library/react";

import MyProfile from "@/app/mypage/_components/MyProfile";
import {
  applyUserStoreSelectorMock,
  mockUserStore,
} from "@/utils/test-utils/userMocking";

jest.mock("@/components/modals/edit-profile-modal/EditProfileModal", () => ({
  __esModule: true,
  default: () => <div data-testid="edit-profile-modal">프로필 수정하기</div>,
}));
jest.mock("@/stores/useUserStore");

describe("MyProfile", () => {
  it("유저 정보가 있을 때 프로필 정보가 렌더링된다.", () => {
    const store = mockUserStore.loggedIn();
    applyUserStoreSelectorMock(store);

    render(<MyProfile />);
    expect(screen.getByText("내 프로필")).toBeInTheDocument();
    expect(screen.getByText(store.user.name)).toBeInTheDocument();
    expect(screen.getByText(store.user.companyName)).toBeInTheDocument();
    expect(screen.getByText(store.user.email)).toBeInTheDocument();
  });

  it("유저 정보가 있을 때 수정 버튼이 활성화된다.", () => {
    mockUserStore.loggedIn();

    render(<MyProfile />);
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });

  it("유저 정보가 없을 때 MyProfileSkeleton이 렌더링된다.", () => {
    const store = mockUserStore.loggedOut();
    applyUserStoreSelectorMock(store);

    render(<MyProfile />);
    expect(screen.getByTestId("profile-skeleton")).toBeInTheDocument();
  });

  it("수정 버튼 클릭 시 EditProfileModal이 열린다.", () => {
    mockUserStore.loggedIn();

    render(<MyProfile />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByTestId("edit-profile-modal")).toBeInTheDocument();
  });
});
