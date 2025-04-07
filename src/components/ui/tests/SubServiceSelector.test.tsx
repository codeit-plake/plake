import { fireEvent, render, screen } from "@testing-library/react";

import SubServiceSelector from "@/components/ui/SubServiceSelector";
import { SUB_SERVICE_LIST } from "@/constants/gathering";

describe("SubServiceSelector", () => {
  const mockOnClickTab = jest.fn();
  const subServices = SUB_SERVICE_LIST.OFFLINE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("컴포넌트가 정상적으로 렌더링 되어야 함", () => {
    render(
      <SubServiceSelector selectedSubService="" onClickTab={mockOnClickTab} />,
    );

    subServices.forEach(subService => {
      expect(
        screen.getByRole("button", { name: subService.name }),
      ).toBeInTheDocument();
    });
  });

  it("버튼을 클릭하면 onClickTab이 올바르게 호출됨", () => {
    render(
      <SubServiceSelector selectedSubService="" onClickTab={mockOnClickTab} />,
    );

    const firstButton = screen.getByRole("button", {
      name: subServices[0].name,
    });
    fireEvent.click(firstButton);

    expect(mockOnClickTab).toHaveBeenCalledTimes(1);
    expect(mockOnClickTab).toHaveBeenCalledWith(subServices[0].value);
  });

  it("선택된 버튼에 올바른 스타일이 적용됨", () => {
    render(
      <SubServiceSelector
        selectedSubService={subServices[0].value}
        onClickTab={mockOnClickTab}
      />,
    );

    const selectedButton = screen.getByRole("button", {
      name: subServices[0].name,
    });
    expect(selectedButton).toMatchSnapshot();
  });
});
