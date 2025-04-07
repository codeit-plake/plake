import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import MainTab from "../MainTab";

jest.mock(
  "next/dist/shared/lib/router-context",
  () =>
    jest.requireActual("next/dist/shared/lib/router-context.shared-runtime"),
  { virtual: true },
);

describe("MainTab 컴포넌트 테스트", () => {
  it("오프라인 탭을 클릭하면 URL은 '/gathering/offline'과 일치한다.", async () => {
    render(<MainTab pathname={"/gathering/offline"} />, {
      wrapper: MemoryRouterProvider,
    });

    fireEvent.click(screen.getByLabelText("오프라인 탭"));

    await waitFor(() => {
      expect(mockRouter.memoryRouter.asPath).toEqual("/gathering/offline");
    });
  });

  it("온라인 탭을 클릭하면 URL은 '/gathering/online'과 일치한다.", async () => {
    render(<MainTab pathname={"/gathering/offline"} />, {
      wrapper: MemoryRouterProvider,
    });

    fireEvent.click(screen.getByLabelText("온라인 탭"));

    await waitFor(() => {
      expect(mockRouter.memoryRouter.asPath).toEqual("/gathering/online");
    });
  });
});
