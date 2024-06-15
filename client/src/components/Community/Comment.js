import React from 'react'
import { ReactComponent as AvatarIcon } from "assets/icons/avatar.svg";
import { ReactComponent as LoveLikeIcon } from "assets/icons/love-like.svg";

export default function Comment({ comment }) {
  console.log(comment)
  return (
    <div className='mb-2'>
      <div className='flex flex-row gap-4'>
        {/* <label>{comment.userId}</label> */}
        <AvatarIcon width="40" height="40" />
        <div className='bg-gray-100 rounded-e-lg rounded-b-lg p-3 w-full text-sm sm:text-md'>{comment.text}</div>
      </div>
      <div className='flex flex-row text-xs gap-1 ps-14 mt-1'>
        <label>Like &middot; </label>
        <LoveLikeIcon width="15" height="15" />
        <label>{comment.commentLikes.length}</label>
      </div>
    </div>
  )
}
