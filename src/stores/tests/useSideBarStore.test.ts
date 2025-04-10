import useSideBarStore from "@/stores/useSideBarStore";

jest.unmock("@/stores/useSideBarStore");

describe("useSideBarStore 테스트", () => {
  test("초기화 시 isOpen이 false이다.", () => {
    const state = useSideBarStore.getState();
    expect(state.isOpen).toBe(false);
  });

  test("onToggleSideBar가 true로 호출되면 isOpen이 true로 설정된다.", () => {
    const { onToggleSideBar } = useSideBarStore.getState();

    onToggleSideBar(true);

    expect(useSideBarStore.getState().isOpen).toBe(true);
  });

  test("onToggleSideBar가 false로 호출되면 isOpen이 false로 설정된다.", () => {
    useSideBarStore.setState({ isOpen: true });

    const { onToggleSideBar } = useSideBarStore.getState();

    onToggleSideBar(false);

    expect(useSideBarStore.getState().isOpen).toBe(false);
  });

  test("상태를 여러 번 올바르게 토글해야 한다.", () => {
    const { onToggleSideBar } = useSideBarStore.getState();

    expect(useSideBarStore.getState().isOpen).toBe(false);

    onToggleSideBar(true);
    expect(useSideBarStore.getState().isOpen).toBe(true);

    onToggleSideBar(false);
    expect(useSideBarStore.getState().isOpen).toBe(false);

    onToggleSideBar(true);
    expect(useSideBarStore.getState().isOpen).toBe(true);
  });
});
