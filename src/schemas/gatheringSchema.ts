import { z } from "zod";

const capacitySchema = z
  .number({
    message: "모임 정원을 입력해주세요.",
  })
  .nullable()
  .refine(
    (val): val is number | null => val === null || (val >= 5 && val <= 20),
    {
      message: "모임 정원은 5명에서 20명 사이여야 합니다.",
    },
  );

const formSchema = z.object({
  name: z.string().min(1, { message: "모임 이름을 입력해주세요." }),
  location: z.string().min(1, { message: "모임 장소를 선택해주세요." }),
  image: z.instanceof(File).refine(file => file.size > 0, {
    message: "모임 이미지를 선택해주세요.",
  }),
  type: z.string().min(1, { message: "모임 서비스를 선택해주세요." }),
  dateTime: z.string().min(1, { message: "모집 날짜를 선택해주세요." }),
  registrationEnd: z.string().min(1, { message: "마감 날짜를 선택해주세요." }),
  capacity: capacitySchema,
});

export const CreateGatheringFormSchema = formSchema.refine(
  data => {
    if (!data.dateTime || !data.registrationEnd) return true;
    return new Date(data.registrationEnd) < new Date(data.dateTime);
  },
  {
    message: "마감 날짜는 모집 날짜보다 이전이어야 합니다.",
    path: ["registrationEnd"],
  },
);

export type CreateGatheringFormType = z.infer<typeof CreateGatheringFormSchema>;
