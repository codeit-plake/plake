import { v4 as uuidv4 } from "uuid";

export interface IMainReview {
  id: string;
  content: string;
  rating: number;
}

export const reviewList: IMainReview[] = [
  {
    id: uuidv4(),
    content: `많은 사람들과 함께 \n 좋아하는 것을 즐길 수 있어 \n 좋았어요.`,
    rating: 5,
  },
  {
    id: uuidv4(),
    content: `같은 취향을 가진 사람들과 \n 소통할 수 있어 즐거웠어요`,
    rating: 4,
  },
  {
    id: uuidv4(),
    content: `좋아하는 걸 같이 이야기할 수 있어 \n 행복했어요`,
    rating: 5,
  },
  {
    id: uuidv4(),
    content: `함께 몰입할 수 있어 즐거웠어요`,
    rating: 4,
  },
  {
    id: uuidv4(),
    content: `다 같이 즐기니까 \n 새로운 매력을 발견했어요`,
    rating: 4,
  },
  {
    id: uuidv4(),
    content: `같은 관심사를 가진 사람들과 \n 함께여서 더 뜻깊었어요`,
    rating: 5,
  },
] as const;
