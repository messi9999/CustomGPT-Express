import React from "react";

const DiscoverButton = ({ content, id, onEvent }) => {
  const { title, imgUrl } = content;

  return (
    <button
      type="button"
      className="flex flex-col overflow-hidden rounded-xl bg-neutral-200 transition-all duration-150 hover:scale-95 hover:bg-neutral-200-hover"
      onClick={() => {
        onEvent(id);
      }}
    >
      <div className="relative flex h-[124px] w-full items-center justify-center bg-neutral-300">
        <img
          alt={title}
          src={imgUrl}
          height="auto"
          className="absolute w-full h-full transparent"
        />
      </div>
      <span className="t-heading-s p-4 pb-8 text-left text-primary-700 font-bolder">
        {title}
      </span>
    </button>
  );
};

export default DiscoverButton;
