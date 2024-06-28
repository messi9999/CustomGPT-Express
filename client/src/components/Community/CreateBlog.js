import React, { useMemo, useState } from 'react'
import { BASEURL } from "../../config/config";
import AuthService from "services/auth.service";
import axios from "axios";

import { ReactComponent as MediaIcon } from "assets/icons/img-icon.svg";
import { ReactComponent as FileIcon } from "assets/icons/fi_154841.svg";

export default function CreateBlog({ showNewPost, setShowNewPost }) {
  const [image, setImage] = useState(null);
  const [postFile, setPostFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [imgerror, setImgError] = useState("");
  const [fileerror, setFileError] = useState("");

  let currentUser = AuthService.getCurrentUser();
  const header = useMemo(
    () => ({
      'Content-Type': 'multipart/form-data',
      "x-access-token": currentUser.accessToken,
    }),
    [currentUser.accessToken]
  );


  const handleImageUpload = (event) => {
    const f = event.target.files[0];

    const maxSize = 5 * 1024 * 1024; // 5MB

    if (f.size > maxSize) {
      setImgError("This image is too large. Please select an image smaller than 5MB.");
      return;
    }
    const reader = new FileReader();


    reader.onloadend = () => {
      setImage(f);
      setPreview(reader.result);
    };

    if (f) {
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }

    setImgError("")
  };

  const handleFileUpload = (event) => {
    const f = event.target.files[0];

    const maxSize = 20 * 1024 * 1024; // 5MB

    if (f.size > maxSize) {
      setFileError("This file is too large. Please select a file smaller than 20MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPostFile(f);
    };

    if (f) {
      reader.readAsDataURL(f);
    }

    setFileError("")

  }

  const handlePost = () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('file', postFile);
    formData.append('title', title);
    formData.append('content', content);
    console.log(formData)

    axios.post(`${BASEURL}/api/community/post/create`, formData,
      {
        headers: header,
      }).then((res) => {
        console.log(res.data)
        window.location.reload();

      }).catch((err) => {
        console.log(err)
      })

  };
  return (
    <div className='bg-[#fff7ea] w-full max-w-[800px] p-2 sm:p-2 rounded-xl shadow-lg'>
      {/* {title && <h1 className='w-full sm:p-4 sm:px-4 mb-5 text-3xl sm:text-5xl font-oswald break-words'>{title}</h1>} */}
      {preview && <img className='w-full sm:p-4 sm:px-4 mb-5' src={preview} alt="Preview" />}
      {/* {content && <pre className='sm:p-4 sm:px-4 w-full whitespace-pre-wrap'>{content}</pre>} */}
      <div className='sm:px-6 sm:pe-10 mt-2 mb-1 flex flex-row items-center text-sm'>
        {/* <label>Title: </label> */}
        <input
          className='w-full border-b pb-0 h-10 ms-2 focus:outline-none bg-[#fff7ea]'
          onChange={(e) => { setTitle(e.target.value) }}
          placeholder="What's on your mind..."
        />
      </div>
      <div className='sm:px-6 sm:pe-10 mb-3 pt-1 flex flex-row items-top text-sm'>
        {/* <label>Content: </label> */}
        <textarea
          style={{ height: '36px', overflow: 'hide', resize: 'none' }}
          className='w-full focus:outline-none ps-2 bg-[#fff7ea]'
          onChange={(e) => {
            setContent(e.target.value);
            e.target.style.height = 'inherit';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          placeholder='Put your post here...'
        />

      </div>
      {
        imgerror && (
          <>
            <p className="text-red-600">{imgerror}</p>
          </>
        )
      }
      {
        fileerror && (
          <>
            <p className="text-red-600">{fileerror}</p>
          </>
        )
      }
      <input
        className='hidden'
        type="file"
        onChange={handleImageUpload}
        id="imageInput"
        accept="image/*" />
      <input
        className='hidden'
        type="file"
        onChange={handleFileUpload}
        id="fileInput" />
      <div className='flex justify-between px-6 text-sm sm:text-md'>
        <div className='flex items-center gap-4'>
          <div className='flex flex-row items-center gap-1'>
            <label
              htmlFor="imageInput"
              className="px-1 py-1 cursor-pointer rounded-full hover:bg-gray-200">
              <MediaIcon width="20" height="20" />
            </label>
            <label className='text-xs text-gray-500'>Photo/Video</label>
          </div>
          <div className='flex flex-row items-center text-center'>
            <label
              htmlFor="fileInput"
              className="px-1 py-1 cursor-pointer rounded-2xl hover:bg-gray-200">
              <FileIcon width="20" height="20" />
            </label>
            {
              postFile ? (<label className='text-xs text-gray-500'>{postFile.name}</label>) : (<label className='text-xs text-gray-500'>Document</label>)
            }
          </div>

        </div>
        <div className='flex gap-4'>
          <button
            className='bg-[#8C52FF] text-slate-100 px-4 rounded-2xl hover:bg-blue-800'
            onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
