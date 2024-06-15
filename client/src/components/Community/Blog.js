import React, { useMemo, useState, useEffect } from "react";
import parser from 'html-react-parser';
import { BASEURL } from "../../config/config";
import { ReactComponent as LilkeIcon } from "assets/icons/like.svg";
import { ReactComponent as CommentIcon } from "assets/icons/comment.svg";
import { ReactComponent as FileIcon } from "assets/icons/file.svg";
// import { ReactComponent as ThreeDotIcon } from "assets/icons/threedot.svg";
// import { ReactComponent as ThreeDotColIcon } from "assets/icons/threedot-col.svg";
import { ReactComponent as AvatarIcon } from "assets/icons/avatar.svg";
import { ReactComponent as LoveLikeIcon } from "assets/icons/love-like.svg";
import { ReactComponent as PostSendIcon } from "assets/icons/postsend.svg";
import AuthService from "services/auth.service";
import axios from "axios";
import Comment from "./Comment";
import Profile from "pages/Profile";
import ThreeDotDropDown from "./ThreeDotDropDown";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

const svgStyle = {
  fill: "red"
};

export default function Blog({ post }) {
  const [isComment, setIsComment] = useState(false)
  const [comment, setComment] = useState("")
  const [numOfLikes, setNumOfLikes] = useState(post.postLikes.length)
  const [comments, setComments] = useState(post.comments)
  const [content, setContent] = useState('');
  const [originContent, setOriginContent] = useState(post.content)
  const [currentContent, setCurrentContent] = useState('')
  const [urls, setUrls] = useState([]);
  const [editable, setEditable] = useState(false)


  let temp_content;
  let filename = ""
  if (post.file) {
    const splited = post.file.split("/")
    filename = splited[splited.length - 1]
  }

  useEffect(() => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    setUrls(originContent.match(urlRegex));

    setContent(originContent.replace(urlRegex, url => `<a href="${url}" target="_blank" className="text-[blue] underline hover:text-[#e0897a]">${url}</a>`));
  }, [originContent])

  let currentUser = AuthService.getCurrentUser();
  const [isLiked, setIsLiked] = useState(post.postLikes.some(obj => obj.userId === currentUser.id))

  const header = useMemo(
    () => ({
      "x-access-token": currentUser.accessToken,
    }),
    [currentUser.accessToken]
  );

  const imageUrl = `${BASEURL}/${post.image}`; // Ensure this points to the right URL

  const downloadFile = () => {
    if (post.file) {
      window.location.href = `${BASEURL}/api/community/download?path=${encodeURIComponent(post.file)}`;
    }
  };

  const handleOnComment = () => {
    setIsComment(!isComment)
  }

  const handleOnCommentChange = (e) => {
    e.preventDefault()
    setComment(e.target.value)
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const handleOnPost = () => {
    axios.post(`${BASEURL}/api/community/comment/create`, {
      postId: post.id,
      text: comment
    },
      {
        headers: header,
      }).then((res) => {
        console.log(res.data)
        setIsComment(false)
        // window.location.reload();
        // setNumOfLikes(numOfLikes + 1)
        setComments(prevArray => [...prevArray, {
          id: 0,
          postId: post.id,
          text: comment,
          userId: currentUser.id
        }])
        setComment("")

      }).catch((err) => {
        console.log(err)
      })
  }
  const handleOnLike = () => {
    if (!isLiked) {

      axios.post(`${BASEURL}/api/community/post/like/create`, {
        postId: post.id,
      },
        {
          headers: header,
        }).then((res) => {
          console.log(res)
          setIsComment(false)
          // window.location.reload();
          setNumOfLikes(prevState => prevState + 1)
          setIsLiked(true)
        })
    }
    else {
      axios.delete(`${BASEURL}/api/community/post/like/create/${post.id}`,
        {
          headers: header,
        }).then((res) => {
          console.log(res)
          setIsComment(false)
          // window.location.reload();
          setNumOfLikes(prevState => prevState - 1)
          setIsLiked(false)
        })
    }

  }

  const onEdit = () => {
    // if(post.userId === currentUser.id) {
    //   console.log("first")
    // }
    setEditable(true)
    setCurrentContent(originContent)
  }

  const onDelete = () => {

  }

  return (
    <div className='my-3 pb-5 rounded-lg bg-white'>
      {/* <div className="flex justify-end mx-4 border-b mb-4 py-1">
            </div> */}
      <div className="py-2 mx-3 flex justify-between border-b">
        <AvatarIcon width="40" height="40" />
        <div className="rounded-full hover:bg-gray-200 w-fit h-fit">
          <ThreeDotDropDown
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
      <div className=" flex flex-col items-center mt-3">
        <h1 className='text-center w-full text-lg sm:text-lg font-oswald max-w-[600px] mb-1 px-2'>{post.title}</h1>
        {!editable && <div className='text-sm sm:text-sm text-start w-full mb-1 px-3'>{parser(content)}</div>}
        {editable && <div className="flex flex-col w-full gap-4 px-2 py-2">
          <textarea className="form-control w-full h-[300px] border border-solid" onChange={(e) => setCurrentContent(e.target.value)}>{originContent}</textarea>
          <div className="flex gap-4 justify-center">
            <div className="cursor-pointer bg-green-600 text-white px-2 py-1 rounded-lg" onClick={() => {
              setEditable(false);
              setOriginContent(currentContent);
            }}>Save</div>
            <div className="cursor-pointer bg-orange-600 text-white px-2 py-1 rounded-lg" onClick={() => setEditable(false)}>Cancel</div>
          </div>
        </div>}
        {/* <textarea className="text-sm sm:text-sm text-start w-full mb-1 px-3">{parser(content)}</textarea> */}
        {/* <textarea
          value={blogContent}
          style={{height: '50px', overflow: 'hidden'}}
          className='w-full focus:outline-none ps-2'
          onChange={(e) => {
            setBlogContent(e.target.value);
            e.target.style.height = 'inherit';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          placeholder='Write the content of post here'
        /> */}
        {urls && <div>
          {
            urls.map((url, index) => (
              <div className='p-4 w-full' key={index}><LinkPreview url={url} /></div>
            ))
            // urls.map(url => <LinkPreview url={url} />)
          }
        </div>}
        {
          post.image && (
            <>
              <img src={imageUrl} alt="Blog Image Post" />
            </>
          )
        }
      </div>
      <div className="flex justify-between py-1 mx-2 border-b">
        <div className="flex flex-row gap-1">
          <LoveLikeIcon width="15" height="15" />
          <label className="text-xs">
            {numOfLikes}
          </label>
        </div>
        <div>
          <label className="text-xs">
            {comments.length}  comments
          </label>
        </div>
      </div>
      <div className="flex flex-row items-start gap-6 px-6 py-2">
        <div className="flex flex-row">
          {
            isLiked ? (
              <>
                <LoveLikeIcon width="20" height="20" className="hover: cursor-pointer" onClick={handleOnLike} />
              </>
            ) : (
              <>
                <LilkeIcon width="20" height="20" className="hover: cursor-pointer" onClick={handleOnLike} />
              </>
            )
          }

        </div>
        <div className="flex flex-row">
          <CommentIcon width="20" height="20" className='hover: cursor-pointer' onClick={handleOnComment} />
        </div>
        <div className="flex flex-row gap-1 items-center">
          <FileIcon width="20" height="20" className='hover: cursor-pointer' onClick={downloadFile} />
          <div className="text-xs">{filename}</div>
        </div>
      </div>
      {
        isComment && (
          <div className="px-6">
            {
              comments.map((comment, key) => (
                <div key={key}>
                  <Comment comment={comment} />
                </div>
              ))
            }
            <div className='flex flex-row gap-3 mt-6 mb-4'>
              <div><AvatarIcon width="30" height="30" /></div>
              <textarea value={comment} onInput={handleOnCommentChange} style={{ height: '36px', overflow: 'hidden', resize: 'none' }} className="border text-sm w-full px-4 pt-2 rounded-[17px]" placeholder="Add a comment..." />
            </div>
            <div className="flex justify-end">
              <>
                {
                  comment && (
                    <>
                      <button className="p-2 text-white rounded-lg hover:bg-gray-200" onClick={handleOnPost}><PostSendIcon width="20" height="20" /></button>
                    </>
                  )
                }
              </>
            </div>
          </div>

        )
      }
    </div>
  );
}
