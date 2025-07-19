import Icon from "@/components/Icon";
import Interactive from "@/components/Interactive";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import Image, { StaticImageData } from "next/image";

const NavigationCard: StyleableFC<{
  image: StaticImageData;
  title: string;
  desc: string;
  variant: "yellow" | "blue";
  href: string;
}> = ({ image, title, desc, variant, href, className, style }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <Image
        src={image}
        alt=""
        priority
        className="pointer-events-none relative z-10 -mb-32 max-w-92"
      />
      <Interactive
        href={href}
        className={cn(
          "from-yellow to-yellow-white -mb-72 flex h-135 w-250 flex-col items-center bg-linear-to-b pt-33 [clip-path:ellipse()]",
          variant === "yellow"
            ? "text-red"
            : "text-yellow bg-blue from-blue to-white/20",
          className
        )}
        style={style}
      >
        <div className="relative flex flex-col items-center text-center text-balance">
          <h2 className="type-chinese-medium mb-3">{title}</h2>
          <p
            className={cn(
              "type-body-medium w-70",
              variant === "yellow" ? "text-black" : "text-white"
            )}
          >
            {desc}
          </p>
          <Icon
            name="arrow_forward"
            className="absolute -right-8 -bottom-0.5"
          />
        </div>
      </Interactive>
    </div>
  );
};

export default NavigationCard;
