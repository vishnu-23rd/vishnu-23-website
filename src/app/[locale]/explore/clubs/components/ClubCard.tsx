"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Interactive from "@/components/Interactive";
import InstagramIcon from "@/components/socialIcon/InstagramIcon";
import cn from "@/lib/helpers/cn";
import type { ClubItem } from "@/lib/types/club";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const ClubCard: StyleableFC<{
  club: ClubItem;
}> = ({ club, className, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const logoURL = `/clubs-logo/${club.logo}`;
  const igURL = club.ig;
  const t = useTranslations("");
  const username = new URL(club?.ig || "").pathname.split("/")[1];
  return (
    <motion.div
      layout
      className={cn("overflow-hidden bg-white text-start", className)}
      style={style}
    >
      <motion.div
        layout="position"
        className={cn(
          "type-body-medium flex w-full gap-3 transition-colors duration-200",
          isOpen && "bg-yellow/20"
        )}
      >
        <Image
          src={logoURL}
          alt=""
          width={72}
          height={72}
          className="m-3.5 mr-0"
        />
        <motion.div
          animate={{ y: isOpen && club.description ? 22 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="grid grow self-center"
        >
          <h3 className="type-title-medium truncate">{club.name}</h3>
          <motion.p
            aria-hidden
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="line-clamp-2"
          >
            {club.description}
          </motion.p>
        </motion.div>
        <Interactive
          title={t(`Clubs.Card.action.${isOpen ? "less" : "more"}`)}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          className="text-red shrink-0 px-4"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-fit"
          >
            <Icon name="expand_more" size={24} />
          </motion.div>
        </Interactive>
      </motion.div>

      <motion.div
        layout="position"
        className="overflow-hidden"
        style={{ height: isOpen ? "auto" : 0 }}
      >
        <motion.div
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="type-body-medium flex flex-col gap-4 p-4"
        >
          <p>{club.description}</p>
          <div
            className={cn(
              "flex justify-end",
              club.boothPosition && "justify-between"
            )}
          >
            {club.boothPosition && (
              <div className="flex gap-1">
                <Button
                  Appearance="secondary"
                  Size="x-small"
                  className="flex gap-2"
                >
                  <Icon name="storefront" />
                  <span className="type-title-medium">
                    {club.boothPosition?.position}
                  </span>
                </Button>
                <Button Appearance="secondary" Size="x-small">
                  <span className="type-title-medium">
                    {t(`Map.Faculty.building.${club.boothPosition?.building}`)}
                  </span>
                </Button>
              </div>
            )}
            {igURL && (
              <Button
                Appearance="secondary"
                Size="small"
                title={t("Clubs.Card.action.instagram", { username })}
                href={igURL}
              >
                <InstagramIcon />
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ClubCard;
