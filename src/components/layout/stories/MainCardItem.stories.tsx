import type { Meta, StoryObj } from "@storybook/react";

import {
  closedGatheringMock,
  mockGathering,
} from "@/utils/test-utils/gatheringMocking";

import MainCardItem from "../MainCardItem";

const meta: Meta<typeof MainCardItem> = {
  title: "Components/Layout/MainCardItem",
  component: MainCardItem,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    componentSubtitle: "모임 목록 카드",
    artTypes: {
      gathering: {
        id: {
          control: { type: "text" },
          description: "모임 아이디",
        },
        name: {
          control: { type: "text" },
          description: "모임 이름",
        },
        dateTime: {
          control: { type: "date" },
          description: "모임 날짜 및 시간 (YYYY-MM-DDTHH:MM:SS)",
        },
        registrationEnd: {
          control: { type: "date" },
          description: "모임 모집 마감 날짜 및 시간 (YYYY-MM-DDTHH:MM:SS)",
        },
        location: {
          control: { type: "text" },
          description: "모임 장소",
        },
        particpantCount: {
          control: { type: "number" },
          description: "모임 참여인 수",
        },
        capacity: {
          control: { type: "number" },
          description: "모집 정원",
        },
        image: {
          control: { type: "string" },
          description: "모임 이미지 url",
        },
      },
    },
    docs: {
      description: {
        component: "모임의 정보를 표시하는 카드 컴포넌트입니다.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MainCardItem>;

const gathering = mockGathering();

export const Default: Story = {
  render: () => {
    return <MainCardItem gathering={gathering} />;
  },
  parameters: {
    docs: {
      description: {
        story: "마감되지 않은 카드의 모습입니다.",
      },
    },
  },
};

export const ClosedCardItem: Story = {
  render: () => {
    return <MainCardItem gathering={closedGatheringMock} />;
  },
  parameters: {
    docs: {
      description: {
        story: "마감된 카드 예시입니다.",
      },
    },
  },
};
