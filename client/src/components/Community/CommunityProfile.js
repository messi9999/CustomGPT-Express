import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import AvatarEditor from 'react-avatar-editor'
import { Avatar } from '@files-ui/react';
import AuthService from 'services/auth.service';
import axios from 'axios';
import { BASEURL } from "../../config/config";

const fallBackImage =
  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

export default function CommunityProfile() {

  let currentUser = AuthService.getCurrentUser();

  console.log('currentUser', currentUser);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageSource, setImageSource] = useState(undefined);
  const [imageResult, setImageResult] = useState(currentUser.avatar_uri ? `${BASEURL}/${currentUser.avatar_uri}` : fallBackImage);
  const [editedImage, setEditedImage] = useState(null)
  const [isEditing, setIsEditing] = useState(false);
  const [isImgSaved, setIsImgSaved] = useState(true)
  const editorRef = useRef(null);

  console.log('imageResult', imageResult);


  useEffect(() => {
    console.log('avatar_uri', currentUser.avatar_uri);
    if (currentUser.avatar_uri) {
      setImageResult(`${BASEURL}/${currentUser.avatar_uri}`)
    }
  }, [currentUser.avatar_uri])
  useEffect(() => {
    setFirstName(currentUser.firstname)
    setLastName(currentUser.lastname)
  }, [currentUser.firstname, currentUser.lastname])
  useEffect(() => {
    console.log(currentUser.avatar_uri ? `${BASEURL}/${currentUser.avatar_uri}` : fallBackImage);
  }, [currentUser]);

  const header = useMemo(
    () => ({
      "x-access-token": currentUser.accessToken,
    }),
    [currentUser.accessToken]
  );

  const onAvatarChange = useCallback((image) => {
    setIsImgSaved(false)
    setImageSource(image);
    setIsEditing(true);
  }, [])

  const onSaveClick = useCallback(() => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      fetch(canvas)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "avatar.png", { type: "image/png" });
          setImageResult(window.URL.createObjectURL(file));
          setIsEditing(false);
          setEditedImage(file)
        }).catch((error) => {
          alert(error)
        })
      setIsImgSaved(true)
    }
  }, [])

  const handleOnSaveProfile = () => {
    if (isImgSaved) {
      const formData = new FormData();
      formData.append('avatar', editedImage);
      formData.append('firstname', firstName);
      formData.append('lastname', lastName);

      if (editedImage) {
        console.log('asdfasdfsdafasdf', currentUser);
        if (currentUser.avatar_uri) {
          console.log("2234234");
          formData.append('uri', currentUser.avatar_uri)
        } else {
          alert("Please upload your avatar!")
        }
      }


      console.log("formData", formData);
      if (formData.has('uri')) {
        axios.put(`${BASEURL}/api/test/useravatar`, formData,
          {
            headers: header,
          }).then((res) => {
            currentUser.avatar_uri = res.data.avatar_uri
            currentUser.firstname = res.data.firstname
            currentUser.lastname = res.data.lastname
            localStorage.setItem("user", JSON.stringify(currentUser))
            alert("Successfully updated!!!")
          }).catch((err) => {
            console.log(err)
          })
      } else {
        alert("Please upload your avatar!")
      }
    } else {
      alert("Please save Avatar image first!!!")
    }
  }

  return (
    <>
      <div className='flex justify-center pt-6 bg-[#faedda] w-full'>
        <div className='w-4/5 md:w-[500px] py-2'>
          <div className='my-3 pb-5 rounded-lg bg-[#fcf4e6] shadow-md w-full'>
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
              {isEditing && <button onClick={onSaveClick} className='bg-[#ffdfa7] py-0 px-3 rounded-full mt-3 hover:bg-[#ffce79] shadow-sm'>Save</button>}
              <div className='flex items-center mt-3 px-2'>
                <span className=''>First&nbsp;Name:</span>
                <input
                  className='w-full border-b pb-0 h-10 ms-2 focus:outline-none bg-[#fcf4e6] ps-2'
                  onChange={(e) => { setFirstName(e.target.value) }}
                  defaultValue={currentUser.firstname}
                />
              </div>
              <div className='flex items-center px-2'>
                <span>Last&nbsp;Name:</span>
                <input
                  className='w-full border-b pb-0 h-10 ms-2 focus:outline-none bg-[#fcf4e6] ps-2'
                  onChange={(e) => { setLastName(e.target.value) }}
                  defaultValue={currentUser.lastname}
                />
              </div>
              <button
                className="bg-[#ffdfa7] py-2 px-3 rounded-full mt-3 hover:bg-[#ffce79] shadow-md"
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
