import React, { useState, useRef, useEffect, useMemo } from 'react';
import AvatarEditor from 'react-avatar-editor'
import { Avatar } from '@files-ui/react';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/auth.service';
import axios from 'axios';
import { BASEURL } from "../../config/config";

const fallBackImage =
  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

export default function CommunityProfile() {

  // const [imageSource2, setImageSource2] = React.useState(undefined);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageSource, setImageSource] = useState(undefined);
  const [imageResult, setImageResult] = useState(fallBackImage);
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef(null);

  const navigate = useNavigate();

  let currentUser = AuthService.getCurrentUser();

  
  const header = useMemo(
    () => ({
      "x-access-token": currentUser.accessToken,
    }),
    [currentUser.accessToken]
  );


  // useEffect(() => {

  // }, [])

  const onAvatarChange = (image) => {
    setImageSource(image);
    setIsEditing(true);
  }

  const onSaveClick = () => {
    if (editorRef.current) {

      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      fetch(canvas)
        .then(res => res.blob())
        .then(blob => {
          setImageResult(window.URL.createObjectURL(blob))
          setIsEditing(false);
        });
    }
  }

  const handleOnSaveProfile = () => {
    const formData = new FormData();
    formData.append('avatar', imageSource);
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);

    axios.put(`${BASEURL}/api/test/useravatar`, formData,
      {
        headers: header,
      }).then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className='flex justify-center pt-6 bg-[#e8e6e6]'>
        {/* <CreateBlog /> */}
        <div className='w-full sm:w-[500px] h-screen py-2'>
          <div className='my-3 pb-5 rounded-lg bg-white'>
            <div className='flex flex-col justify-center items-center pt-5 gap-3'>
              <div className='rounded-full overflow-hidden relative'>
                {
                  !isEditing ? <Avatar
                    src={imageResult}
                    emptyLabel={"Select"}
                    changeLabel={'Change'}
                    variant='circle'
                    onError={() => setImageResult(fallBackImage)}
                    onChange={onAvatarChange}
                    accept=".jpg, .png"
                    alt="Avatar2"
                  /> : <AvatarEditor
                    ref={editorRef}
                    image={imageSource}
                    border={0}
                    scale={1.2}
                  />
                }
              </div>
              {isEditing && <button onClick={onSaveClick}>Save</button>}
              <div className='flex items-center mt-3'>
                <span className=''>FirstName:</span>
                <input
                  className='w-full border-b pb-0 h-10 ms-2 focus:outline-none'
                  onChange={(e) => { setFirstName(e.target.value) }}
                />
              </div>
              <div className='flex items-center'>
                <span>LastName:</span>
                <input
                  className='w-full border-b pb-0 h-10 ms-2 focus:outline-none'
                  onChange={(e) => { setLastName(e.target.value) }}
                />
              </div>
              <button 
                className="bg-gray-100 py-2 px-3 rounded-full mt-3 hover:bg-gray-300"
                onClick={handleOnSaveProfile}
                >
                  Save Profile
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
