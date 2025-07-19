"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useRouter } from "@/i18n/navigation";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import facultyMapEN from "@/public/map/Faculty-en.png";
import facultyMapTH from "@/public/map/Faculty-th.png";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const buildings = [
  {
    key: "larngear",
    style: "right-[20%] top-[23%] w-[18%] h-[18%]",
    href: "/explore/map/larngear",
  },
  {
    key: "eng3",
    style: "left-[33%] top-[20%] w-[28%] h-[22%]",
    href: "/explore/map/eng3",
  },
  {
    key: "en100",
    style: "right-[8%] top-[45%] w-[22%] h-[22%]",
    href: "/explore/map/en100",
  },
];

const FacultyMap: StyleableFC = ({ className, style }) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Map.Faculty");

  const [selected, setSelected] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = (target: string) => {
    setSelected(target);
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(`/explore/map/${target}`);
    }, 1000);
  };

  const facultyMap = locale === "th" ? facultyMapTH : facultyMapEN;
  const backgroundOverlay =
    "border-2 border-red bg-yellow mix-blend-overlay z-15";

  return (
    <div
      className={cn("relative flex flex-col items-center gap-4", className)}
      style={style}
    >
      {isTransitioning && <div className="fixed inset-0 z-10 bg-black/30" />}

      <figure className="relative">
        <Image src={facultyMap} alt={t("alt")} priority />
        {buildings.map((building) => (
          <button
            key={building.key}
            onClick={() => handleClick(building.key)}
            className={cn(
              "absolute",
              building.style,
              selected === building.key && backgroundOverlay
            )}
          />
        ))}
      </figure>

      <div className="justify-left text-red flex w-full items-center gap-2.5 pb-3">
        <Icon name="touch_app" size={24} />
        <p className="type-title-medium text-balance">{t("instruction")}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {buildings.map((building) => (
          <Button
            key={building.key}
            Appearance="primary"
            Size="small"
            className="type-title-medium"
            onClick={() => handleClick(building.key)}
          >
            {t(`building.${building.key}`)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FacultyMap;
