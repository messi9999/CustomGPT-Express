import React, { useMemo, useState, useEffect, useRef } from "react";
import parser from 'html-react-parser';
import { BASEURL } from "../../config/config";
import { ReactComponent as LilkeIcon } from "assets/icons/like.svg";
import { ReactComponent as CommentIcon } from "assets/icons/comment.svg";
import { ReactComponent as FileIcon } from "assets/icons/file.svg";
import { ReactComponent as AvatarIcon } from "assets/icons/avatar.svg";
import { ReactComponent as LoveLikeIcon } from "assets/icons/love-like.svg";
import { ReactComponent as PostSendIcon } from "assets/icons/postsend.svg";
import AuthService from "services/auth.service";
import axios from "axios";
import Comment from "./Comment";
import ThreeDotDropDown from "./ThreeDotDropDown";


export default function Blog({ post, deletePost }) {
  const [isComment, setIsComment] = useState(false)
  const [comment, setComment] = useState("")
  const [numOfLikes, setNumOfLikes] = useState(post.postLikes.length)
  const [comments, setComments] = useState(post.comments)
  const [content, setContent] = useState('');
  const [originContent, setOriginContent] = useState(post.content)
  const [currentContent, setCurrentContent] = useState('')
  // const [urls, setUrls] = useState([]);
  const [editable, setEditable] = useState(false)

  let currentUser = AuthService.getCurrentUser();
  const [isLiked, setIsLiked] = useState(post.postLikes.some(obj => obj.userId === currentUser.id))

  let filename = ""
  if (post.file) {
    const splited = post.file.split("/")
    filename = splited[splited.length - 1]
  }

  const textareaRef = useRef(null)

  useEffect(() => {
    if (editable && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content, editable]);


  useEffect(() => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // setUrls(originContent.match(urlRegex));

    setContent(originContent.replace(urlRegex, url => `<a href="${url}" target="_blank" className="text-[blue] underline hover:text-[#e0897a]">${url}</a>`));
  }, [originContent])

  useEffect(() => { }, [comments]);



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
    if (isComment) {
      setIsComment(false)
    } else {
      axios.get(`${BASEURL}/api/community/comment/byPost/${post.id}`,
        {
          headers: header,
        }).then((res) => {
          setIsComment(true)
          console.log(res.data)
          setComments(res.data.comments)
          setComment("")

        }).catch((err) => {
          console.log(err)
        })
    }
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
        setComments(prevArray => [...prevArray, {
          id: comments[comments.length-1].id + 1,
          postId: post.id,
          text: comment,
          userId: currentUser.id,
          // commentLikes: [{
          //   commentId: comments[comments.length-1].id + 1,
          //   id: comments[comments.length-1].commentLikes ? comments[comments.length-1].commentLikes.id + 1 : 1,
          //   userId: currentUser.id
          // }],
          // user: {
          //   avatar: currentUser.
          // }
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
          setIsComment(false)
          setNumOfLikes(prevState => prevState + 1)
          setIsLiked(true)
        })
    }
    else {
      axios.delete(`${BASEURL}/api/community/post/like/create/${post.id}`,
        {
          headers: header,
        }).then((res) => {
          setIsComment(false)
          setNumOfLikes(prevState => prevState - 1)
          setIsLiked(false)
        })
    }

  }

  const onEdit = () => {
    if (post.userId === currentUser.id) {
      setEditable(true)
      setCurrentContent(originContent)
    }
  }

  const handleOnEditSave = () => {
    axios.put(`${BASEURL}/api/community/post/create`, {
      content: currentContent,
      postId: post.id
    },
      {
        headers: header,
      }).then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  const onDeleteComment = (index) => {
    let data = comments;
    data.splice(index, 1);
    setComments([...data]);
  }

  const onDelete = () => {
    if (post.userId === currentUser.id) {
      axios.delete(`${BASEURL}/api/community/post/create/${post.id}`,
        {
          headers: header,
        }).then((res) => {
          deletePost();
          alert("Successfully deleted!");
        }).catch((err) => {
          console.log(err);
        })
    } else {
      alert("This is not your blog. Can't delete it.")
    }
  }

  return (
    <div className='my-3 pb-5 rounded-lg bg-white'>
      {/* <div className="flex justify-end mx-4 border-b mb-4 py-1">
            </div> */}
      <div className="py-2 mx-3 flex justify-between border-b">
        <div className="flex flex-row items-center gap-3 text-sm">
          {
            post.user.avatar ? (
              <>
                <img
                  src={`${BASEURL}/${post.user.avatar.uri}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt=""
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
          <label>{post.user.avatar ? (
            <label>{post.user.avatar.firstname} {post.user.avatar.lastname}</label>
          ) : (
            <label>{post.user.username}</label>
          )}</label>
        </div>

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
        {editable && <div className="flex flex-col w-full gap-4 px-2 py-2 text-sm sm:text-sm text-start">
          <textarea
            ref={textareaRef}
            className="w-full overflow-hidden focus:outline-none resize-none"
            onChange={(e) => setCurrentContent(e.target.value)}
            defaultValue={originContent}
          />
          <div className='flex gap-4 mt-3 justify-end'>
            <button className='hover:text-blue-500' onClick={() => {
              setEditable(false);
              setOriginContent(currentContent);
              handleOnEditSave()
            }}>Save</button>
            <button className='hover:text-red-500' onClick={() => setEditable(false)}>Cancel</button>
          </div>

        </div>}
        {/* {urls && <div>
          {
            urls.map((url, index) => (
              <div className='p-4 w-full' key={index}><LinkPreview url={url} /></div>
            ))
          }
        </div>} */}
        {
          post.image && (
            <>
              <img src={imageUrl} alt="" />
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
                  <Comment comment={comment} deleteComment={() => onDeleteComment(key)} />
                </div>
              ))
            }
            <div className='flex flex-row gap-3 mt-6 mb-4'>
              <div>{
                currentUser.avatar ? (
                  <>
                    <img
                      src={`${BASEURL}/${currentUser.avatar.uri}`}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <AvatarIcon
                      className="hover:cursor-pointer"
                      width="30"
                      height="30"
                    />
                  </>
                )
              }</div>
              <textarea 
                value={comment} 
                onInput={handleOnCommentChange} 
                style={{ height: '36px', overflow: 'hidden', resize: 'none' }} 
                className="border text-sm w-full px-4 pt-2 rounded-[17px]" 
                placeholder="Add a comment..." 
              />
            </div>
            <div className="flex justify-end">
              <>
                {
                  comment && (
                    <>
                      <button 
                        className="p-2 text-white rounded-lg hover:bg-gray-200" 
                        onClick={handleOnPost}>
                          <PostSendIcon width="20" height="20" />
                      </button>
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
