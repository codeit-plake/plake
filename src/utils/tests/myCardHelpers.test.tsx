import { IMyGathering } from "@/types/gathering";
import { getButtonType, getStatusProps } from "@/utils/myCardHelpers";

describe("myCardHelpers", () => {
  describe("getStatusProps", () => {
    it("이용 완료 상태일 경우 '이용 완료'만 반환", () => {
      const gathering: IMyGathering = {
        isCompleted: true,
        participantCount: 3,
        isReviewed: false,
      } as IMyGathering;

      const result = getStatusProps(gathering);
      expect(result).toHaveLength(1);
      expect(result[0].label).toBe("이용 완료");
    });

    it("참여 인원이 5명 이상이고 이용 완료가 아닌 경우 '이용 예정' + '개설 확정'", () => {
      const gathering = {
        isCompleted: false,
        participantCount: 5,
        isReviewed: false,
      } as IMyGathering;

      const result = getStatusProps(gathering);
      expect(result).toHaveLength(2);
      expect(result[0].label).toBe("이용 예정");
      expect(result[1].label).toBe("개설 확정");
    });

    it("참여 인원이 5명 미만이고 이용 완료가 아닌 경우 '이용 예정' + '개설 대기'", () => {
      const gathering = {
        isCompleted: false,
        participantCount: 2,
        isReviewed: false,
      } as IMyGathering;

      const result = getStatusProps(gathering);
      expect(result).toHaveLength(2);
      expect(result[0].label).toBe("이용 예정");
      expect(result[1].label).toBe("개설 대기");
    });
  });

  describe("getButtonType", () => {
    it("리뷰 작성이 완료된 경우 'viewReview' 반환", () => {
      const gathering = {
        isReviewed: true,
      } as IMyGathering;

      const result = getButtonType(gathering);
      expect(result).toBe("viewReview");
    });

    it("리뷰 작성이 안된 경우 'writeReview' 반환", () => {
      const gathering = {
        isReviewed: false,
      } as IMyGathering;

      const result = getButtonType(gathering);
      expect(result).toBe("writeReview");
    });
  });
});
