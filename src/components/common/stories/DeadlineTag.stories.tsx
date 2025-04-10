import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";

import DeadlineTag from "@/components/common/DeadlineTag";

const meta: Meta<typeof DeadlineTag> = {
  title: "Components/Common/DeadlineTag",
  component: DeadlineTag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    registrationEnd: {
      control: { type: "date" },
      description: "모임 마감시간",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeadlineTag>;

export const HourDeadlineTag: Story = {
  args: { registrationEnd: dayjs() },
  parameters: {
    docs: {
      description: {
        story: "마감 당일일 경우의 데드라인 태그입니다.",
      },
    },
  },
};

export const DayDeadlineTag: Story = {
  render: () => {
    const date = dayjs();

    return <DeadlineTag registrationEnd={date.add(1, "month")} />;
  },
  parameters: {
    docs: {
      description: {
        story: "마감까지 하루 이상 남은 경우의 데드라인 태그입니다.",
      },
    },
  },
};
