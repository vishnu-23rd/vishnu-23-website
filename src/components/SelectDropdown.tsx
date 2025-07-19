"use client";

import Icon from "@/components/Icon";
import Interactive from "@/components/Interactive";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";
import { useState } from "react";

const SelectDropdown: StyleableFC<{
  value: string;
  onChange: (value: string) => void;
  items: string[];
  placeholder?: string;
}> = ({ value, onChange, items, placeholder, className, style }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative w-full", className)} style={style}>
      <Interactive
        onClick={() => setOpen(!open)}
        className="relative z-10 mb-2 h-11 w-full bg-white px-3 text-left outline-none"
      >
        <div className="flex w-full items-center justify-between">
          <div className="type-title-medium">{value || placeholder}</div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Icon name="expand_more" size={24} />
          </motion.div>
        </div>
      </Interactive>

      {open && (
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
            opacity: { duration: 0.2 },
          }}
          className="absolute top-full left-0 z-50 w-full origin-top overflow-hidden bg-white"
        >
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            exit={{ y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
          >
            {items.map((item, i) => (
              <Interactive
                key={i}
                className="type-body-large flex h-11 w-full items-center bg-white px-4 transition-colors"
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
              >
                {item}
              </Interactive>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SelectDropdown;
