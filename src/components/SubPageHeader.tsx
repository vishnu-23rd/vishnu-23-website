import CurvedText from "@/components/CurvedText";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import cloud1Logo from "@/public/decorating/clouds/cloud1.svg";
import cloud2Logo from "@/public/decorating/clouds/cloud2.svg";
import Image from "next/image";

type Props = {
  title: string;
  curvedText: string;
  background?: string;
  subtitle?: string;
};

const SubPageHeader: StyleableFC<Props> = ({
  title,
  curvedText,
  subtitle,
  className,
  background,
}) => {
  const centerBase = "absolute left-1/2 -translate-x-1/2";
  const cloudStyle = "w-full h-full object-contain";

  return (
    <header
      className={cn(
        "text-blue fill-blue relative h-60 w-full shrink-0 text-center",
        className
      )}
    >
      <div className="relative mx-auto h-full max-w-90">
        {/* Big Circle Background */}
        <div
          className={cn(
            centerBase,
            "top-3 h-52 w-52 rounded-full bg-[url('/decorating/texture/stain.png')] bg-cover bg-no-repeat mix-blend-hard-light",
            background
          )}
        />
        {/* Curved Text */}
        <CurvedText
          ariaLabel={curvedText}
          className={cn("top-14 overflow-visible", centerBase)}
        >
          {curvedText}
        </CurvedText>
        {/* Title (h1) */}
        <h1 className={cn("type-chinese-medium top-21", centerBase)}>
          {title}
        </h1>
        {/* Subtitle (h2, optional) */}
        {subtitle && (
          <h2 className={cn("type-title-medium top-40", centerBase)}>
            {subtitle}
          </h2>
        )}
        {/* Decorative Clouds */}
        <div className="absolute top-6 left-14 h-10 w-20 overflow-hidden">
          <Image alt="" src={cloud1Logo} className={cloudStyle} />
        </div>
        <div className="absolute top-33 right-10 h-7 w-14">
          <Image alt="" src={cloud2Logo} className={cloudStyle} />
        </div>
      </div>
    </header>
  );
};

export default SubPageHeader;
