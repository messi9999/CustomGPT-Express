import React, { useMemo, useState } from 'react'
import { ReactComponent as AvatarIcon } from "assets/icons/avatar.svg";
import { ReactComponent as LoveLikeIcon } from "assets/icons/love-like.svg";
import { BASEURL } from "../../config/config";
import AuthService from 'services/auth.service';
import axios from 'axios';


export default function Comment({ comment }) {
  let currentUser = AuthService.getCurrentUser();

  console.log(comment)
  const [numOfLikes, setNumOfLikes] = useState(comment.commentLikes.length)
  const [isLiked, setIsLiked] = useState(comment.commentLikes.some(obj => obj.userId === currentUser.id))



  const header = useMemo(
    () => ({
      "x-access-token": currentUser.accessToken,
    }),
    [currentUser.accessToken]
  );

  const handelOnCommnetLike = () => {
    console.log("click")
    if (!isLiked) {

      axios.post(`${BASEURL}/api/community/comment/like/create`, {
        commentId: comment.id,
      },
        {
          headers: header,
        }).then((res) => {
          setNumOfLikes(prevState => prevState + 1)
          setIsLiked(true)
        })
    }
    else {
      axios.delete(`${BASEURL}/api/community/comment/like/create/${comment.id}`,
        {
          headers: header,
        }).then((res) => {
          setNumOfLikes(prevState => prevState - 1)
          setIsLiked(false)
        })
    }

  }
  return (
    <div className='mb-2'>
      <div className='flex flex-row gap-4'>
        {/* <label>{comment.userId}</label> */}
        {/* <AvatarIcon width="40" height="40" /> */}
        {
          comment.user.avatar ? (
            <>
              <img
                src={`${BASEURL}/${comment.user.avatar.uri}`}
                width={40}
                height={40}
                className="rounded-full"
                alt=''
              />
            </>
          ) : (
            <>
              <AvatarIcon
                className="hover:cursor-pointer"
                width="40"
                height="40"
              />
            </>
          )
        }
        <div className='bg-gray-100 rounded-e-lg rounded-b-lg p-3 w-full text-sm sm:text-md'>{comment.text}</div>
      </div>
      <div className='flex flex-row text-xs gap-1 ps-14 mt-1'>
        <label>Like &middot; </label>
        <LoveLikeIcon width="15" height="15" onClick={handelOnCommnetLike} />
        <label>{numOfLikes}</label>
      </div>
    </div>
  )
}
