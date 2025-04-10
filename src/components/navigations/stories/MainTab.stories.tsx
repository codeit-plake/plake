import type { Meta, StoryObj } from "@storybook/react";

import MainTab from "../MainTab";

const meta: Meta<typeof MainTab> = {
  title: "Components/Navigation/Tab",
  component: MainTab,
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: { type: "boolean" },
      description: "활성화 여부",
    },
    name: {
      control: { type: "text" },
      description: "탭 이름",
    },
  },
  parameters: {
    componentSubtitle: "타입 탭",
    docs: {
      description: {
        component: "타입 별 정보를 보여주는 탭입니다.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MainTab>;

export const Default: Story = {
  args: {
    active: true,
    name: "오프라인",
  },
};

export const InactiveOffline: Story = {
  args: {
    active: false,
    name: "오프라인",
  },
};

export const ActiveOnlineTab: Story = {
  args: {
    active: true,
    name: "온라인",
  },
};
