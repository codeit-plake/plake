export const favoriteFilterKey: { [key: string]: string } = {
  "0-0": "OFFLINE", //메인 탭: 오프라인, 서브 탭: 전체
  "0-1": "OFFLINE_EXERCISE", //메인 탭: 오프라인, 서브 탭: 운동
  "0-2": "OFFLINE_DINING", //메인 탭: 오프라인, 서브 탭: 미식
  "0-3": "OFFLINE_ART", //메인 탭: 오프라인, 서브 탭: 예술
  "1-0": "ONLINE", //메인 탭: 온라인, 서브 탭: 전체
};

export type IFavoriteFilterParams = {
  id: Array<string>;
};

export interface IfavoriteAll {
  favorite: IFavorite;
}
export interface IFavorite {
  [key: string]: Array<string>;
}

export const MAX_FAVORITE_COUNT = 30;
