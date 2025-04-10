import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import GatheringSubTab from "../GatheringSubTab";

jest.mock(
  "next/dist/shared/lib/router-context",
  () =>
    jest.requireActual("next/dist/shared/lib/router-context.shared-runtime"),
  { virtual: true },
);

describe("SubTab 컴포넌트 테스트", () => {
  describe("오프라인 메인탭 하위의 서브탭 중", () => {
    it("전체 탭을 클릭하면 URL은 '/gathering/offline'과 일치한다.", async () => {
      render(<GatheringSubTab pathname={"/gathering/offline"} />, {
        wrapper: MemoryRouterProvider,
      });

      fireEvent.click(screen.getByLabelText("오프라인 전체 탭"));

      await waitFor(() => {
        expect(mockRouter.memoryRouter.asPath).toEqual("/gathering/offline");
      });
    });

    it("운동 탭을 클릭하면 URL은 '/gathering/offline?type=OFFICE_STRETCHING'과 일치한다.", async () => {
      render(<GatheringSubTab pathname={"/gathering/offline"} />, {
        wrapper: MemoryRouterProvider,
      });

      fireEvent.click(screen.getByLabelText("오프라인 운동 탭"));

      await waitFor(() => {
        expect(mockRouter.memoryRouter.asPath).toEqual(
          "/gathering/offline?type=exercise",
        );
      });
    });

    it("미식 탭을 클릭하면 URL은 '/gathering/offline?type=MINDFULNESS'과 일치한다.", async () => {
      render(<GatheringSubTab pathname={"/gathering/offline"} />, {
        wrapper: MemoryRouterProvider,
      });

      fireEvent.click(screen.getByLabelText("오프라인 미식 탭"));

      await waitFor(() => {
        expect(mockRouter.memoryRouter.asPath).toEqual(
          "/gathering/offline?type=dining",
        );
      });
    });

    it("예술 탭을 클릭하면 URL은 '/gathering/offline??type=WORKATION'과 일치한다.", async () => {
      render(<GatheringSubTab pathname={"/gathering/offline"} />, {
        wrapper: MemoryRouterProvider,
      });

      fireEvent.click(screen.getByLabelText("오프라인 예술 탭"));

      await waitFor(() => {
        expect(mockRouter.memoryRouter.asPath).toEqual(
          "/gathering/offline?type=art",
        );
      });
    });
  });

  describe("온라인 메인탭의 하위탭 중", () => {
    it("전체 탭을 클릭하면 URL은 '/gathering/online'과 일치한다.", async () => {
      render(<GatheringSubTab pathname={"/gathering/online"} />, {
        wrapper: MemoryRouterProvider,
      });

      fireEvent.click(screen.getByLabelText("온라인 전체 탭"));

      await waitFor(() => {
        expect(mockRouter.memoryRouter.asPath).toEqual("/gathering/online");
      });
    });
  });
});
