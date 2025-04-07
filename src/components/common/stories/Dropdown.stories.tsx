import type { Meta, StoryObj } from "@storybook/react";

import Dropdown from "@/components/common/Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Common/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    option: {
      control: { type: "object" },
      description: "select 내부의 옵션들",
    },
    placeholder: {
      control: { type: "text" },
      description: "기본으로 표시되는 문자",
    },
    type: {
      control: { type: "text" },
      description:
        "드롭다운의 타입 (sort : 정렬 드롭다운, form: 폼 내부에 사용되는 드롭다운)",
    },
    onSelect: {
      action: "clicked",
      description: "드롭다운 셀렉 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};

export const FormDropdown: Story = {
  args: {
    type: "form",
  },
};
