import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import * as nextNavigation from "next/navigation";

import {
  mockGathering,
  mockReview,
  mockReviews,
} from "@/utils/test-utils/reviewMocking";

import ReviewCardItem from "../ReviewCardItem";
import ReviewCardList from "../ReviewCardList";

describe("ReviewCardItem 컴포넌트 테스트", () => {
  it("ReviewCardItem이 정상적으로 렌더링된다.", () => {
    const review = mockReview();
    render(<ReviewCardItem review={review} />);
    const reviewCardItem = screen.getByLabelText("리뷰 카드 아이템");
    expect(reviewCardItem).toBeInTheDocument();
  });
  it("리뷰 카드 아이템에 작성자 이름이 표시된다.", () => {
    const review = mockReview();
    render(<ReviewCardItem review={review} />);
    expect(screen.getByText(review.User.name)).toBeInTheDocument();
  });
  it("리뷰 카드 아이템에 작성자 아바타 이미지가 있다면 이미지가 표시된다.", () => {
    const review = mockReview({
      User: { image: "https://picsum.photos/50/70" },
    });
    render(<ReviewCardItem review={review} />);
    const profileImage = screen.getByAltText("avatar-default");
    expect(profileImage).toHaveAttribute(
      "src",
      expect.stringContaining("picsum.photos"),
    );
  });
  it("리뷰 카드 아이템에 작성자 아바타 이미지가 없다면 기본 이미지가 표시된다.", () => {
    const review = mockReview();
    render(<ReviewCardItem review={review} />);
    const profileImage = screen.getByAltText("avatar-default");
    expect(profileImage).toHaveAttribute(
      "src",
      expect.stringContaining("avatar"),
    );
  });
  it("리뷰 카드 아이템에 생성 날짜가 표시된다.", () => {
    const review = mockReview();
    render(<ReviewCardItem review={review} />);
    expect(
      screen.getByText(dayjs(review.createdAt).format("YYYY.MM.DD")),
    ).toBeInTheDocument();
  });
  it("리뷰 카드 아이템에 모임 이름이 표시된다.", () => {
    const review = mockReview();
    render(<ReviewCardItem review={review} />);
    expect(screen.getByText(review.Gathering.name)).toBeInTheDocument();
  });
  it("리뷰 카드 아이템에 모임 이미지가 표시된다.", () => {
    const review = mockReview();
    render(<ReviewCardItem review={review} />);
    const gatheringImage = screen.getByAltText(review.Gathering.name);
    expect(gatheringImage).toBeInTheDocument();
  });
  it("리뷰 카드 아이템에 리뷰가 표시된다.", () => {
    const review = mockReview();
    render(<ReviewCardItem review={review} />);
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });
  it("리뷰 카드 아이템에 모임 위치가 표시된다.", () => {
    const review = mockReview();
    render(<ReviewCardItem review={review} />);
    expect(screen.getByText(review.Gathering.location)).toBeInTheDocument();
  });
  it("리뷰 카드 아이템에 모임 위치가 '온라인'으로 표시된다.", () => {
    const review = mockReview({
      Gathering: mockGathering({ location: "홍대입구" }),
    });

    render(<ReviewCardItem review={review} />);
    expect(screen.getByText("온라인")).toBeInTheDocument();
  });
  it("마이페이지일 경우 리뷰 카드 아이템에 유저 네임과 프로필 이미지가 표시되지 않는다.", () => {
    jest
      .spyOn(nextNavigation, "usePathname")
      .mockReturnValue("/mypage/reviews");
    const review = mockReview();
    render(<ReviewCardItem review={review} />);
    expect(screen.queryByText(review.User.name)).not.toBeInTheDocument();

    const profileImage = screen.queryByAltText("avatar-default");
    expect(profileImage).not.toBeInTheDocument();
  });
});

describe("ReviewCardList 컴포넌트 테스트", () => {
  it("ReviewCardList가 정상적으로 렌더링된다.", () => {
    render(<ReviewCardList />);
    const reviewCardList = screen.getByLabelText("리뷰 카드 리스트");
    expect(reviewCardList).toBeInTheDocument();
  });

  it("여러 리뷰 카드 아이템을 렌더링한다.", () => {
    const reviews = mockReviews(5);
    render(<ReviewCardList reviews={reviews} />);

    const reviewCardItems = screen.queryAllByLabelText("리뷰 카드 아이템");
    expect(reviewCardItems).toHaveLength(5);
  });
});
