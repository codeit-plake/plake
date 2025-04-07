import { useState } from "react";

import { Button } from "@/components/ui/Button";

interface ImageUploaderProps {
  setValue: (value: File) => void;
}

const ImageUploader = ({ setValue }: ImageUploaderProps) => {
  const [fileName, setFileName] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue(file);
    setFileName(file.name);
  };

  const imageDescription = fileName ? fileName : "이미지를 첨부해주세요.";

  return (
    <div className="flex items-center gap-3">
      <div className="flex w-full items-center overflow-auto rounded-2xl bg-gray-50 px-4 py-[10px]">
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
      >
        파일 찾기
      </Button>
    </div>
  );
};

export default ImageUploader;
