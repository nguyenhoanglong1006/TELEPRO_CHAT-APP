import { FC, HTMLProps } from "react";

// css khi dang reload website cua cac item
const Skeleton: FC<HTMLProps<HTMLDivElement>> = ({ className, ...others }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-300 ${className}`}
      {...others}
    ></div>
  );
};

export default Skeleton;
