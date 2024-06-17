import React, { useState } from 'react'
import {
  Popover,
  Divider,
} from "@mui/material";
import { ReactComponent as ThreeDotColIcon } from "assets/icons/threedot-col.svg";

const ThreeDotDropDown = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <ThreeDotColIcon width="25" height="25"
        className="cursor-pointer"
        onClick={handleOpen}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <div className='flex flex-col gap-2 py-2'>
          <div
            onClick={() => {
              props.onEdit();
              handleClose();
            }}
            className='cursor-pointer text-[green] px-3 hover:text-[blue]'
          >Edit</div>
          <Divider />
          <div
            onClick={() => {
              props.onDelete();
              handleClose();
            }}
            className='cursor-pointer text-[green] px-3 hover:text-[blue]'
          >Delete</div>
        </div>
      </Popover>
    </div >
  )
}

export default ThreeDotDropDown;