"use client";

import ClubCard from "@/app/[locale]/explore/clubs/components/ClubCard";
import ClubListItem from "@/app/[locale]/explore/map/components/ClubListItem";
import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import type { ClubItem } from "@/lib/types/club";
import type { StyleableFC } from "@/lib/types/misc";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

export interface BoothPosition {
  position: number;
  style: string;
}

interface BoothMapProps {
  image: StaticImageData;
  altText: string;
  booths: BoothPosition[];
  clubList: ClubItem[];
}

const BoothMap: StyleableFC<BoothMapProps> = ({
  image,
  altText,
  booths,
  clubList,
  className,
  style,
}) => {
  const [selectedClub, setSelectedClub] = useState<ClubItem | null>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Map");

  const scrollToCard = () => {
    scrollTargetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleClickBooth = (position: number) => {
    const club = clubList.find((c) => c.boothPosition?.position === position);
    if (club) setSelectedClub(club);
  };

  const handleSelectClub = (club: ClubItem) => {
    setSelectedClub(club);
    scrollToCard();
  };

  return (
    <div className={cn("relative space-y-3", className)} style={style}>
      <figure className="relative">
        <Image src={image} alt={altText} priority />

        {booths.map(({ position, style: boothStyle }) => (
          <button
            key={position}
            type="button"
            aria-label={`Booth ${position}`}
            onClick={() => handleClickBooth(position)}
            className={cn(
              "absolute z-20 h-[10%] w-[8%] cursor-pointer",
              boothStyle
            )}
          />
        ))}
      </figure>

      <div
        className={cn(
          "text-red mt-2 flex w-full items-center justify-start gap-2.5",
          !selectedClub && "mb-8"
        )}
      >
        <Icon name="touch_app" size={24} />
        <p className="type-title-medium">{t("Building.instruction")}</p>
      </div>

      <LayoutGroup>
        <AnimatePresence>
          {selectedClub && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0 }}
              ref={scrollTargetRef}
              className="py-4"
            >
              <ClubCard club={selectedClub} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout="position">
          <ClubListItem clubList={clubList} onClick={handleSelectClub} />
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default BoothMap;
