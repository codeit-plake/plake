import { CreateGatheringFormType } from "@/schemas/gatheringSchema";

export const GATHERING = {
  CAPACITY: {
    MIN: 5,
    MAX: 20,
  },
} as const;

export const GATHERING_FORM: CreateGatheringFormType = {
  name: "",
  location: "",
  image: new File([], ""),
  type: "",
  dateTime: "",
  registrationEnd: "",
  capacity: null,
} as const;

export const SERVICE_LIST = {
  OFFLINE: {
    value: "offline",
    name: "오프라인",
  },
  ONLINE: {
    value: "online",
    name: "온라인",
    location: "홍대입구",
    type: "WORKATION",
  },
} as const;

export const SUB_SERVICE_LIST = {
  OFFLINE: [
    { name: "운동", value: "OFFICE_STRETCHING" },
    { name: "미식", value: "MINDFULNESS" },
    { name: "예술", value: "WORKATION" },
  ],
} as const;
