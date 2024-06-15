import React from 'react'
import { ReactComponent as AvatarIcon } from "assets/icons/avatar.svg";
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate()
    const handleOnNavigate = () => {
        navigate("/community/profile")
    }

    const backToDashboard = () => {
        navigate("/create");
      }
    
    const handleOnBlogs = () => {
        navigate("/community/blogs")
    }
    return (
        <>
            <div className="w-full flex justify-center mt-1">
                <div className="flex justify-end gap-6 sm:w-[500px] w-full px-3 py-1">
                    <button 
                        className="bg-[#3cdaa5] hover:bg-[#44be96] text-white text-xs px-2 rounded-lg" 
                        onClick={backToDashboard}>
                        Copilot
                    </button>
                    <button
                        className="bg-[#3cdaa5] hover:bg-[#44be96] text-white text-xs px-2 rounded-lg" 
                        onClick={handleOnBlogs}>
                        Posts
                    </button>
                    <AvatarIcon 
                        className="hover:cursor-pointer" 
                        width="30" 
                        height="30" 
                        onClick={handleOnNavigate}
                    />
                </div>
            </div>
        </>
    )
}
