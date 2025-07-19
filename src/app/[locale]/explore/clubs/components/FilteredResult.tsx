"use client";

import cn from "@/lib/helpers/cn";
import type { ClubItem } from "@/lib/types/club";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const FilteredResult: StyleableFC<{
  selectedGenre: string | null;
  filteredItems:
    | ClubItem[]
    | { key: string; genre: string; items: ClubItem[] }[];
  renderItem: (item: ClubItem) => React.ReactNode;
}> = ({ selectedGenre, filteredItems, renderItem, className, style }) => {
  const t = useTranslations("Clubs");
  if (selectedGenre) {
    const items = filteredItems as ClubItem[];
    return (
      <>
        <p className="type-title-large text-red mb-4 text-center font-bold">
          {selectedGenre ? t(`List.title.${selectedGenre}`) : ""}
        </p>
        {items.length > 0 &&
          items.map((item, i) => <div key={i}>{renderItem(item)}</div>)}
      </>
    );
  }
  return (
    <>
      {(
        filteredItems as { key: string; genre: string; items: ClubItem[] }[]
      ).map(
        (g) =>
          g.items.length > 0 && (
            <div key={g.key} className={cn("mb-6", className)} style={style}>
              <motion.h3
                layout="position"
                className="type-title-large text-red mb-4 text-center font-bold"
              >
                {t(`List.title.${g.key}`)}
              </motion.h3>
              {g.items.map((item, i) => (
                <div key={i}>{renderItem(item)}</div>
              ))}
            </div>
          )
      )}
    </>
  );
};

export default FilteredResult;
