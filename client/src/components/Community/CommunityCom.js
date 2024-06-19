import Blog from 'components/Community/Blog'
import React, { useEffect, useMemo, useState, Fragment } from 'react'
import { BASEURL } from "../../config/config";
import axios from 'axios'
import AuthService from 'services/auth.service';
import CreateBlog from 'components/Community/CreateBlog';


export default function CommunityCom() {
  const [posts, setPosts] = useState([])
  const [showNewPost, setShowNewPost] = useState(false)
  const [numberOfBlog, setNumberOfBlog] = useState(0);

  const [blogShowNumLimit, setBlogShowNumLimit] = useState(5);

  let currentUser = AuthService.getCurrentUser();

  const header = useMemo(
    () => ({
      "x-access-token": currentUser.accessToken,
    }),
    [currentUser.accessToken]
  );

  const deletePost = (index) => {
    let data = posts;
    console.log(data)
    data.splice(index, 1);
    console.log(data)
    setPosts([...data]);
  }

  useEffect(() => {
    axios.get(`${BASEURL}/api/community/post/all`, {
      headers: header,
      params: {
        limit: 5,
        offset: 0
      }

    }).then((res) => {

      setPosts(res.data.posts)
      setNumberOfBlog(res.data.posts.length)
      setBlogShowNumLimit(prev => prev + 5)
    }).catch((err) => {
      alert(err)
    })
  }, [header])


  const handleOnShowMore = () => {
    setBlogShowNumLimit(prev => prev + 5)
    axios.get(`${BASEURL}/api/community/post/all`, {
      headers: header,
      params: {
        limit: 5,
        offset: numberOfBlog
      }

    }).then((res) => {
      console.log(res.data.posts)
      const updatedArr = res.data.posts
      setPosts(prev => [...prev, ...updatedArr])
      setNumberOfBlog(prev => prev + res.data.posts.length)
    }).catch((err) => {
      alert(err)
    })
  }

  return (
    <>
      <div className='flex justify-center bg-[#faedda] h-[90vh] sm:h-[95vh] overflow-y-scroll'>
        <div className='w-full sm:w-[500px] py-2'>
          <div>
            <div className="flex items-center justify-center">
              <CreateBlog setShowNewPost={setShowNewPost} showNewPost={showNewPost} />
            </div>
          </div>
          {posts.map((post, index) => (
            <div key={post.id}>
              <Blog post={post} deletePost={() => deletePost(index)} />
            </div>
          ))}
          {numberOfBlog === blogShowNumLimit - 5 && <div className='rounded-xl bg-white border border-solid px-3 py-1 text-center cursor-pointer hover:bg-[#999999]' onClick={handleOnShowMore}>
            Show more blogs
          </div>}
        </div>
      </div>
    </>
  )
}
