import { createFormDataFromObject } from "../form";

describe("createFormDataFromObject 유틸 테스트", () => {
  it("문자열과 숫자를 포함한 객체를 FormData로 변환해야 함", () => {
    const data = {
      name: "kim",
      age: 25,
    };

    const formData = createFormDataFromObject(data);

    expect(formData.get("name")).toBe("kim");
    expect(formData.get("age")).toBe("25");
  });

  it("File 인스턴스를 포함한 객체를 FormData로 변환해야 함", () => {
    const file = new File(["image.png"], "image.png", { type: "image/png" });

    const data = {
      file,
    };

    const formData = createFormDataFromObject(data);

    expect(formData.get("file")).toBe(file);
  });

  it("null과 undefined 값은 FormData에 추가되지 않아야 함", () => {
    const data = {
      name: "kim",
      age: null,
      file: undefined,
    };

    const formData = createFormDataFromObject(data);

    expect(formData.get("name")).toBe("kim");
    expect(formData.get("age")).toBeNull();
    expect(formData.get("file")).toBeNull();
  });

  it("빈 객체를 전달하면 빈 FormData가 반환되어야 함", () => {
    const data = {};

    const formData = createFormDataFromObject(data);

    const entries = Array.from(formData.entries());
    expect(entries).toHaveLength(0);
  });
});
