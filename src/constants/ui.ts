// 메인 배너 아이템
import mainBanner1 from "@/assets/images/main_slide1.jpg";
import mainBanner2 from "@/assets/images/main_slide2.jpg";
import mainBanner3 from "@/assets/images/main_slide3.jpg";
import mainBanner4 from "@/assets/images/main_slide4.jpg";

export const MAIN_BANNER_ITEMS = [
  {
    image: mainBanner1,
    text: "러닝",
    link: "/gathering/offline?type=exercise",
  },
  {
    image: mainBanner2,
    text: "게임",
    link: "/gathering/online",
  },
  {
    image: mainBanner3,
    text: "음악",
    link: "/gathering/offline?type=art",
  },
  {
    image: mainBanner4,
    text: "치맥",
    link: "/gathering/offline?type=dining",
  },
] as const;

// 메인 탭
export const MAIN_TAB = [
  { name: "오프라인", value: "", href: "/gathering/offline" },
  { name: "온라인", value: "online", href: "/gathering/online" },
] as const;

// 서브 탭
export const SUB_TAB = {
  OFFLINE: [
    { name: "전체", value: "", visibleValue: "" },
    {
      name: "운동",
      value: "OFFICE_STRETCHING",
      visibleValue: "exercise",
    },
    {
      name: "미식",
      value: "MINDFULNESS",
      visibleValue: "dining",
    },
    {
      name: "예술",
      value: "WORKATION",
      visibleValue: "art",
    },
  ],
  ONLINE: [{ name: "전체", value: "", visibleValue: "" }],
} as const;

export const MY_REVIEW_TAB = [
  { name: "작성 가능한 리뷰", value: "writable" },
  { name: "작성한 리뷰", value: "written" },
] as const;

// 지역 선택 드롭다운 옵션
export const LOCATION_OPTION = [
  { value: "건대입구", label: "건대입구" },
  { value: "을지로3가", label: "을지로3가" },
  { value: "신림", label: "신림" },
];

//정렬기준 선택 드롭다운 옵션
export const SORT_OPTION = [
  { value: "registrationEnd", label: "마감임박순" },
  { value: "participantCount", label: "인기순" },
];

// 액션 버튼 텍스트
export const MY_CARD_ACTION_TEXT = {
  CANCEL: "예약 취소하기",
  VIEW_REVIEW: "내가 쓴 리뷰 보기",
  WRITE_REVIEW: "리뷰 작성하기",
} as const;
