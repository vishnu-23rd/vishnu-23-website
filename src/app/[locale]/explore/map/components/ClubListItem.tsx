"use client";

import Interactive from "@/components/Interactive";
import { ClubItem } from "@/lib/types/club";
import { StyleableFC } from "@/lib/types/misc";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ClubListItem: StyleableFC<{
  clubList: ClubItem[];
  onClick: (club: ClubItem) => void;
}> = ({ clubList, onClick, className, style }) => {
  const t = useTranslations("Map");
  return (
    <div className={className} style={style}>
      <p className="type-title-large text-red mb-1 text-center font-bold">
        {t("Building.list")}
      </p>
      {clubList.map((club, index) => (
        <Interactive
          key={index}
          className="type-title-medium flex w-full cursor-pointer items-center gap-2.5 px-2 py-1"
          onClick={() => {
            onClick(club);
          }}
        >
          <p className="text-red min-w-5 text-end">
            {club.boothPosition?.position}
          </p>
          <Image
            src={`/clubs-logo/${club.logo}`}
            alt={club.name}
            width={36}
            height={36}
            className="bg-white"
          />
          <p className="grow text-start text-black">{club.name}</p>
        </Interactive>
      ))}
    </div>
  );
};

export default ClubListItem;
