import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ReactComponent as AvatarIcon } from "assets/icons/avatar.svg";
import { ReactComponent as LoveLikeIcon } from "assets/icons/love-like.svg";
import { BASEURL } from "../../config/config";
import AuthService from 'services/auth.service';
import axios from 'axios';
import ThreeDotDropDown from "./ThreeDotDropDown";


function replaceNulls(data) {
  if (data === null) {
    return '';
  }
  if (Array.isArray(data)) {
    return data.map(replaceNulls);
  }
  if (typeof data === 'object') {
    for (let key in data) {
      data[key] = replaceNulls(data[key]);
    }
  }
  return data;
}

export default function Comment({ comment, deleteComment }) {
  let currentUser = AuthService.getCurrentUser();

  const [numOfLikes, setNumOfLikes] = useState(comment.commentLikes.length)
  const [isLiked, setIsLiked] = useState(comment.commentLikes.some(obj => obj.userId === currentUser.id))
  const [isEditable, setIsEditable] = useState(false);
  const [content, setContent] = useState(comment.text);

  const [updatedContent, setUpdatedContent] = useState(comment.text)

  const textareaRef = useRef(null)

  useEffect(() => {
    if (isEditable && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content, isEditable]);

  const header = useMemo(
    () => ({
      "x-access-token": currentUser.accessToken,
    }),
    [currentUser.accessToken]
  );

  const onEdit = () => {
    setIsEditable(true)

  }

  const onDelete = () => {
    axios.delete(`${BASEURL}/api/community/comment/create/${comment.id}`,
      {
        headers: header,
      }).then((res) => {
        deleteComment();
      }).catch((err) => {
        alert(err)
      })

  }

  const handleCommentChange = (e) => {
    e.preventDefault()
    setUpdatedContent(e.target.value);
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const handleOnSave = () => {
    axios.put(`${BASEURL}/api/community/comment/create`, {
      commentId: comment.id,
      text: updatedContent
    },
      {
        headers: header,
      }
    ).then((res) => {
      setContent(updatedContent)
      setIsEditable(false)
    }).catch((err) => {
      alert(err)
    })
  }

  console.log("comment: ", comment)

  return (
    <div className='mb-2'>
      <div className='flex flex-row gap-4'>
        <div>
          {
            comment.user.avatar_uri ? (
              <>
                <img
                  src={`${BASEURL}/${comment.user.avatar_uri}`}
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
        </div>
        <div className='bg-[#fffaf4] rounded-e-lg rounded-b-lg p-3 w-full'>
          <div className='flex flex-row justify-between'>
            <div className='text-sm mb-2 font-semibold'>
              <label>{(comment.user.firstname || comment.user.lastname) ? (
                <label>{replaceNulls(comment.user.firstname)} {replaceNulls(comment.user.lastname)}</label>
              ) : (
              )}</label>
            </div>
  
          </div>
          <div className='text-sm sm:text-md text-gray-600'>
            {/* <p contentEditable={isEditable} onInput={handleCommentChange}>{content}</p> */}
            <div>
              {isEditable ? (
                <div>
                  <textarea
                    ref={textareaRef}
                    className='bg-transparent overflow-hidden w-full h-auto focus:outline-none resize-none'
                    defaultValue={content}
                    onChange={(e) => { handleCommentChange(e) }}
                  />
                  <div className='flex gap-4 mt-3 justify-end text-xs'>
                    <button className='hover:text-blue-500' onClick={handleOnSave}>Save</button>
                    <button className='hover:text-red-500' onClick={() => { setIsEditable(false); setContent(comment.text) }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <p>{content}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row text-xs gap-1 ps-14 mt-1'>
        <label>Like &middot; </label>
        <LoveLikeIcon width="15" height="15" onClick={handelOnCommnetLike} />
        <label>{numOfLikes}</label>
      </div>
    </div>
  )
}
