import { StyleableFC } from "@/lib/types/misc";

const TwitterIcon: StyleableFC<{ color: string }> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M2.36719 3L9.46289 13.1406L2.74023 21H5.38086L10.6445 14.8301L14.9609 21H21.8711L14.4492 10.375L20.7402 3H18.1406L13.2715 8.6875L9.29883 3H2.36719ZM6.20703 5H8.25586L18.0332 19H16.002L6.20703 5Z"
        className={`fill-${color}`}
      />
    </svg>
  );
};

export default TwitterIcon;
