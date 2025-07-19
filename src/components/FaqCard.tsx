"use client";

import Icon from "@/components/Icon";
import Interactive from "@/components/Interactive";
import cn from "@/lib/helpers/cn";
import type { FaqQuestion } from "@/lib/types/faq";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const FaqCard: StyleableFC<{ questions: FaqQuestion }> = ({
  questions,
  style,
  className,
}) => {
  const t = useTranslations("Home.FaqCard");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      className={cn("overflow-hidden bg-white *:text-start", className)}
      style={style}
    >
      <motion.div
        layout="position"
        className={cn(
          "flex w-full transition-colors duration-200",
          isOpen && "bg-yellow/20"
        )}
      >
        <p className="type-title-medium w-full px-4 py-3 text-balance">
          {questions.question}
        </p>
        <Interactive
          title={t(isOpen ? "action.less" : "action.more")}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          className="text-red shrink-0 px-4"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
        <motion.p
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="type-body-medium px-4 py-3"
        >
          {questions.answer}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default FaqCard;
