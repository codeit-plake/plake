/**
 * #P701 성능: 이미지 업로드 최적화
 * #S701 보안: 파일 업로드 검증 강화
 * #E801 에러: 파일 크기 및 형식 검증
 */
import { useState } from "react";

import { Button } from "@/components/ui/Button";

/**
 * #T701 타입: props 인터페이스 문서화
 * #T702 타입: 파일 객체 타입 제한
 */
interface ImageUploaderProps {
  setValue: (value: File) => void;
}

/**
 * #A701 접근성: 파일 업로드 상태 알림
 * #U701 사용자 경험: 드래그 앤 드롭 지원
 * #S702 보안: 파일 MIME 타입 검증
 */
const ImageUploader = ({ setValue }: ImageUploaderProps) => {
  const [fileName, setFileName] = useState<string>("");

  /**
   * #E802 에러: 파일 업로드 실패 처리
   * #U702 사용자 경험: 업로드 진행률 표시
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue(file);
    setFileName(file.name);
  };

  const imageDescription = fileName ? fileName : "이미지를 첨부해주세요.";

  return (
    <div
      className="flex items-center gap-3"
      role="region"
      aria-label="이미지 업로드"
    >
      <div
        className="flex w-full items-center overflow-auto rounded-2xl bg-gray-50 px-4 py-[10px]"
        aria-live="polite"
      >
        <p className="line-clamp-1 font-medium text-gray-400">
          {imageDescription}
        </p>
      </div>
      <input
        type="file"
        aria-label="이미지 업로드"
        className="hidden"
        id="image-file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <Button
        type="button"
        variant="purple-outline"
        onClick={() => document.getElementById("image-file")?.click()}
        aria-controls="image-file"
      >
        파일 찾기
      </Button>
    </div>
  );
};

export default ImageUploader;
