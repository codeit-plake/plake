"use client";

import FavoriteMainTab from "./FavoriteMainTab";
import FavoriteSubTab from "./FavoriteSubTab";

const FavoriteFilterTab = () => {
  return (
    <section className="flex flex-col gap-6" aria-label="주제 탭">
      <FavoriteMainTab />
      <FavoriteSubTab />
    </section>
  );
};

export default FavoriteFilterTab;
