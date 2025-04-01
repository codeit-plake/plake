import { v4 as uuidv4 } from "uuid";

import { IMainReview } from "@/types/review/main-review";

export const mainReviewList: IMainReview[] = [
  {
    id: uuidv4(),
    content: `많은 사람들과 함께 \n 좋아하는 것을 즐길 수 있어 \n 좋았어요`,
    rating: 5,
  },
  {
    id: uuidv4(),
    content: `같은 취향을 가진 사람들과 \n 소통할 수 있어 즐거웠어요`,
    rating: 4.5,
  },
  {
    id: uuidv4(),
    content: `좋아하는 걸 같이 이야기할 수 있어 \n 행복했어요`,
    rating: 5,
  },
  {
    id: uuidv4(),
    content: `함께 몰입할 수 있어 즐거웠어요`,
    rating: 4.5,
  },
  {
    id: uuidv4(),
    content: `다 같이 즐기니까 \n 새로운 매력을 발견했어요`,
    rating: 5,
  },
  {
    id: uuidv4(),
    content: `같은 관심사를 가진 사람들과 \n 함께여서 더 뜻깊었어요`,
    rating: 5,
  },
] as const;

export const REVIEW_SORT_OPTION = [
  { value: "createdAt&desc", label: "최신순" },
  { value: "createdAt&asc", label: "오래된순" },
  { value: "score&desc", label: "평점 높은순" },
  { value: "score&asc", label: "평점 낮은순" },
  { value: "participantCount&desc", label: "인원 많은순" },
  { value: "participantCount&asc", label: "인원 적은순" },
];

export const REVIEW_TAB = [
  { name: "오프라인", value: "", href: "/all-reviews/offline" },
  { name: "온라인", value: "online", href: "/all-reviews/online" },
];

export const REVIEW_ONLINE_PATH = "/all-reviews/online";

export const REVIEW_OFFLINE_PATH = "/all-reviews/offline";
