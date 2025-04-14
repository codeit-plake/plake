/**
 * #P901 성능: 프로필 이미지 최적화
 * #T901 타입: 사용자 데이터 타입 안정성 강화
 * #A901 접근성: 프로필 섹션 구조 개선
 */
"use client";

import Image from "next/image";
import { useState } from "react";

import Avatar from "@/components/common/Avatar";
import EditProfileModal from "@/components/modals/edit-profile-modal/EditProfileModal";
import MyProfileSkeleton from "@/components/skeletons/MyProfileSkeleton";
import useUserStore from "@/stores/useUserStore";

/**
 * #P902 성능: 상태 관리 최적화
 * #U901 사용자 경험: 프로필 수정 상호작용 개선
 * #E1001 에러: 사용자 데이터 누락 처리
 */
const MyProfile = () => {
  const user = useUserStore(state => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const profileInfo = [
    { label: "company.", value: user?.companyName || "" },
    { label: "E-mail.", value: user?.email || "" },
  ];

  return (
    <section
      className="overflow-hidden rounded-3xl border-2 border-gray-200"
      aria-label="내 프로필 정보"
    >
      <div className="relative">
        <div className="relative flex h-[65px] items-center justify-between bg-purple-300 px-6">
          <h2 className="z-10 mt-[-6px] text-lg font-semibold">내 프로필</h2>
          <Image
            className="absolute bottom-2 left-1/2 -translate-x-1/3 sm:left-2/3 sm:-translate-x-1/2"
            src="/images/profile-background.png"
            alt="background-image"
            width={158}
            height={47}
            style={{ width: "158px", height: "47px" }}
            priority
          />
          <button
            className="z-10"
            onClick={() => setIsOpen(true)}
            disabled={!user}
            aria-label="프로필 수정"
          >
            <Image
              src="/images/edit-button.png"
              alt="수정"
              width={32}
              height={32}
            />
          </button>
        </div>
        <div className="absolute bottom-2 w-full border-b-2 border-purple-400 px-6"></div>
      </div>

      {user ? (
        <div
          className="flex h-[109px] gap-3 bg-white px-6"
          role="region"
          aria-label="프로필 상세 정보"
        >
          <div className="mt-[-16px]">
            <Avatar
              size={"large"}
              type={"default"}
              disableClick={true}
              imgPath={user.image}
            />
          </div>
          <div>
            <p className="mb-2 mt-1 truncate font-semibold">{user.name}</p>
            <dl className="space-y-1">
              {profileInfo.map((info, index) => (
                <div key={index} className="flex flex-wrap">
                  <dt className="w-[72px] text-left text-sm font-semibold text-gray-800">
                    {info.label}
                  </dt>
                  <dd className="w-[calc(100%-72px)] truncate text-sm text-gray-700">
                    {info.value || "정보 없음"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ) : (
        <MyProfileSkeleton />
      )}

      {user && (
        <EditProfileModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={user}
        />
      )}
    </section>
  );
};

export default MyProfile;
