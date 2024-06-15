import Blog from 'components/Community/Blog'
import React, { useEffect, useMemo, useState, Fragment } from 'react'
// import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { BASEURL } from "../../config/config";
import axios from 'axios'
import AuthService from 'services/auth.service';
import CreateBlog from 'components/Community/CreateBlog';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from "react-router-dom";

import { ReactComponent as AvatarIcon } from "assets/icons/avatar.svg";
import Sidebar from 'components/Community/Sidebar';


export default function CommunityCom() {
  const [posts, setPosts] = useState([])
  const [showNewPost, setShowNewPost] = useState(false)
  const [numberOfBlog, setNumberOfBlog] = useState(6);
  const navigate = useNavigate();

  let currentUser = AuthService.getCurrentUser();

  const header = useMemo(
    () => ({
      "x-access-token": currentUser.accessToken,
    }),
    [currentUser.accessToken]
  );


  useEffect(() => {
    axios.get(`${BASEURL}/api/community/post/all`, {
      headers: header,
    }).then((res) => {
      setPosts(res.data.posts)
    }).catch((err) => {
      alert(err)
    })
  }, [])

  const toggleShowNewPost = () => {
    setShowNewPost(prevState => !prevState)
  }

  return (
    <>
      <div className='flex justify-center pt-6 bg-[#e8e6e6]'>
        {/* <CreateBlog /> */}
        <div className='w-full sm:w-[500px] h-full py-2'>
          <div>
            <div className="flex items-center justify-center">
              <CreateBlog setShowNewPost={setShowNewPost} showNewPost={showNewPost} />
            </div>
          </div>
          {posts.map((post, index) => (
            <div key={index}>
              <Blog post={post} />
            </div>
          ))}
          {numberOfBlog > 5 && <div className='rounded-xl bg-white border border-solid px-3 py-1 text-center cursor-pointer hover:bg-[#999999]'>
            Show more blogs
          </div>}
        </div>
      </div>
    </>
  )
}
