import { DiscoverContext } from "common/Context";
import React, { useContext } from "react";

const DiscoverButton = ({ content, id }) => {
  const { title, imgUrl } = content;
  const { setIdxOfDiscover } = useContext(DiscoverContext);

  const onEvent = () => {
    setIdxOfDiscover(id);
  };
  return (
    <button
      type="button"
      className="flex flex-col overflow-hidden rounded-xl bg-neutral-200 transition-all duration-150 hover:scale-95 hover:bg-neutral-200-hover"
      onClick={onEvent}
    >
      <div className="relative flex h-[124px] w-full items-center justify-center bg-neutral-300">
        <img
          alt={title}
          src={imgUrl}
          height="auto"
          className="absolute w-full h-full transparent object-cover"
        />
      </div>
      <span className="t-heading-s p-4 pb-8 text-left text-primary-700 font-bolder">
        {title}
      </span>
    </button>
  );
};

export default DiscoverButton;