import { fireEvent, render, screen } from "@testing-library/react";

import ServiceSelector from "@/components/ui/ServiceSelector";
import { SERVICE_LIST, SUB_SERVICE_LIST } from "@/constants/gathering";

describe("ServiceSelector", () => {
  const mockSetTypeValue = jest.fn();
  const mockSetLocationValue = jest.fn();

  describe("기본 렌더링 테스트", () => {
    it("모든 서비스 타입이 화면에 표시되어야 함", () => {
      render(
        <ServiceSelector
          setTypeValue={mockSetTypeValue}
          setLocationValue={mockSetLocationValue}
        />,
      );

      // 모든 서비스 타입이 표시되는지 확인
      Object.values(SERVICE_LIST).forEach(service => {
        expect(
          screen.getByRole("radio", { name: service.name }),
        ).toBeInTheDocument();
      });
    });

    it("초기 렌더링 시 기본적으로 OFFLINE 서비스가 선택되어 있어야 함", () => {
      render(
        <ServiceSelector
          setTypeValue={mockSetTypeValue}
          setLocationValue={mockSetLocationValue}
        />,
      );

      const offlineRadio = screen.getByRole("radio", {
        name: SERVICE_LIST.OFFLINE.name,
      });
      expect(offlineRadio).toBeChecked();
    });
  });

  describe("서비스 타입 변경 테스트", () => {
    it("서비스 타입을 OFFLINE에서 ONLINE으로 변경하면 적절한 값이 설정되어야 함", () => {
      render(
        <ServiceSelector
          setTypeValue={mockSetTypeValue}
          setLocationValue={mockSetLocationValue}
        />,
      );

      const onlineRadio = screen.getByRole("radio", {
        name: SERVICE_LIST.ONLINE.name,
      });

      fireEvent.click(onlineRadio);

      expect(mockSetTypeValue).toHaveBeenCalledWith(SERVICE_LIST.ONLINE.type);
      expect(mockSetLocationValue).toHaveBeenCalledWith(
        SERVICE_LIST.ONLINE.location,
      );
    });

    it("서비스 타입을 ONLINE에서 OFFLINE으로 변경하면 적절한 값이 설정되어야 함", () => {
      render(
        <ServiceSelector
          setTypeValue={mockSetTypeValue}
          setLocationValue={mockSetLocationValue}
        />,
      );

      // ONLINE 서비스 타입 선택
      const onlineRadio = screen.getByRole("radio", {
        name: SERVICE_LIST.ONLINE.name,
      });

      fireEvent.click(onlineRadio);

      // OFFLINE 서비스 타입 선택
      const offlineRadio = screen.getByRole("radio", {
        name: SERVICE_LIST.OFFLINE.name,
      });

      fireEvent.click(offlineRadio);

      // 빈 값으로 초기화
      expect(mockSetTypeValue).toHaveBeenCalledWith("");
      expect(mockSetLocationValue).toHaveBeenCalledWith("");
    });

    it("OFFLINE 서비스 선택 시 서브 서비스 선택 UI가 표시됨", () => {
      render(
        <ServiceSelector
          setTypeValue={mockSetTypeValue}
          setLocationValue={mockSetLocationValue}
        />,
      );

      const offlineRadio = screen.getByRole("radio", {
        name: SERVICE_LIST.OFFLINE.name,
      });
      fireEvent.click(offlineRadio);

      SUB_SERVICE_LIST.OFFLINE.forEach(subService => {
        expect(
          screen.getByRole("button", { name: subService.name }),
        ).toBeInTheDocument();
      });
    });

    it("서브 서비스를 클릭하면 setTypeValue가 호출됨", () => {
      render(
        <ServiceSelector
          setTypeValue={mockSetTypeValue}
          setLocationValue={mockSetLocationValue}
        />,
      );

      const firstSubService = SUB_SERVICE_LIST.OFFLINE[0];

      const subServiceButton = screen.getByRole("button", {
        name: firstSubService.name,
      });
      fireEvent.click(subServiceButton);

      expect(mockSetTypeValue).toHaveBeenCalledWith(firstSubService.value);
    });
  });
});
