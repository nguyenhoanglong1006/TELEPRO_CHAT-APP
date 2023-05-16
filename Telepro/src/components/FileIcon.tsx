import { FC, useState } from "react";

import { FILE_ICON } from "../shared/constants";

interface FileIconProps {
  extension: string;
  className?: string;
}

// icon cua file sau khi gui tren message content***
const FileIcon: FC<FileIconProps> = ({ extension, className }) => {
  const [isError, setIsError] = useState(false);

  if (isError) return <i className={`bx bxs-file ${className || ""}`}></i>;

  return (
    <img
      className={className || ""}
      onError={() => setIsError(true)}
      src={FILE_ICON(extension)}
    ></img>
  );
};

export default FileIcon;
