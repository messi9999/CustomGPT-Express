import React, { useCallback, useState } from 'react'
import { ReactComponent as AvatarIcon } from "assets/icons/avatar.svg";
import { ReactComponent as HomeIcon } from "assets/icons/home_icon.svg";
import { NavLink, useNavigate } from 'react-router-dom';
import AuthService from 'services/auth.service';
import { BASEURL } from "../../config/config";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";

import {
    Popover,
    Divider,
} from "@mui/material";

export default function TitleBar() {
    let currentUser = AuthService.getCurrentUser();
    const navigate = useNavigate()
    const handleOnNavigate = () => {
        navigate("/profile")
    }

    const backToDashboard = () => {
        navigate("/create");
    }

    const handleLogOut = useCallback(() => {
        AuthService.logout();
        navigate("/");
        window.location.reload();
    }, [navigate]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onLogout = () => {
        handleLogOut()
    }

    const onProfile = () => {
        handleOnNavigate()
    }

    return (
        <>
            <div className="w-full flex justify-center mt-1 bg-[#faedda] h-[10vh] sm:h-[5vh] shadow-lg">
                <div className="flex justify-between sm:justify-end gap-6 sm:w-[500px] w-full px-3 py-1 items-center">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full p-1.5 text-primary-700 bg-neutral-300 hover:bg-neutral-300-hover active:bg-neutral-300-tap lg:hidden">
                        <HomeIcon width={30} height={30} onClick={backToDashboard} />
                    </button>
                    <NavLink
                        to="/community/blogs"
                        className="flex h-9 w-9 items-center justify-center rounded-full p-1.5 text-primary-700 bg-neutral-300 hover:bg-neutral-300-hover active:bg-neutral-300-tap lg:hidden"
                        type="button"
                    >
                        <svg
                            fill="none"
                            height="20"
                            viewBox="0 0 20 20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.75 3.75C8.75 2.23122 7.51878 1 6 1C4.48122 1 3.25 2.23122 3.25 3.75C3.25 5.26878 4.48122 6.5 6 6.5C7.51878 6.5 8.75 5.26878 8.75 3.75ZM4.25 3.75C4.25 2.7835 5.0335 2 6 2C6.9665 2 7.75 2.7835 7.75 3.75C7.75 4.7165 6.9665 5.5 6 5.5C5.0335 5.5 4.25 4.7165 4.25 3.75Z"
                                fill="#212121" />
                            <path d="M2.5 7.5H6.68252C6.51859 7.81013 6.39687 8.14601 6.32501 8.5H2.5C2.22386 8.5 2 8.72386 2 9V9.5C2 10.7591 3.09851 12.1138 5.09636 12.4309C4.77396 12.6501 4.50546 12.9426 4.31486 13.2845C2.20563 12.7119 1 11.0874 1 9.5V9C1 8.17157 1.67157 7.5 2.5 7.5Z" fill="#212121" /><path d="M7.87858 7.5C8.38298 6.88925 9.14603 6.5 10 6.5C10.854 6.5 11.617 6.88925 12.1214 7.5C12.3605 7.78952 12.5415 8.12881 12.6465 8.5C12.7139 8.73842 12.75 8.98999 12.75 9.25C12.75 10.32 12.1389 11.2473 11.2466 11.7019C10.8919 11.8825 10.4929 11.9885 10.0702 11.9991C10.0469 11.9997 10.0235 12 10 12C9.97654 12 9.95315 11.9997 9.92983 11.9991C9.50709 11.9885 9.10806 11.8826 8.75342 11.7019C7.86115 11.2473 7.25 10.32 7.25 9.25C7.25 8.98999 7.28608 8.73842 7.35352 8.5C7.4585 8.12881 7.63948 7.78952 7.87858 7.5ZM8.41841 8.5C8.31042 8.72731 8.25 8.9816 8.25 9.25C8.25 9.96407 8.67768 10.5782 9.29086 10.8504C9.50763 10.9466 9.74757 11 10 11C10.2524 11 10.4924 10.9466 10.7091 10.8504C11.3223 10.5782 11.75 9.96407 11.75 9.25C11.75 8.9816 11.6896 8.72731 11.5816 8.5C11.3362 7.98351 10.8453 7.60627 10.2597 7.51914C10.175 7.50653 10.0883 7.5 10 7.5C9.91175 7.5 9.82502 7.50653 9.74028 7.51914C9.15468 7.60627 8.66377 7.98351 8.41841 8.5Z" fill="#212121" /><path d="M15.6851 13.2845C15.4945 12.9426 15.226 12.6501 14.9036 12.4309C16.9015 12.1138 18 10.7591 18 9.5V9C18 8.72386 17.7761 8.5 17.5 8.5H13.675C13.6031 8.14601 13.4814 7.81013 13.3175 7.5H17.5C18.3284 7.5 19 8.17157 19 9V9.5C19 11.0874 17.7944 12.7119 15.6851 13.2845Z" fill="#212121" /><path d="M14.4872 13.3706C14.2234 13.1398 13.878 13 13.5 13H6.5C6.06797 13 5.6786 13.1826 5.40489 13.4749C5.15376 13.7431 5 14.1036 5 14.5V15C5 16.9714 6.85951 19 10 19C13.1405 19 15 16.9714 15 15V14.5C15 14.0496 14.8015 13.6456 14.4872 13.3706ZM6 14.5C6 14.2239 6.22386 14 6.5 14H13.5C13.7761 14 14 14.2239 14 14.5V15C14 16.4376 12.5678 18 10 18C7.43216 18 6 16.4376 6 15V14.5Z" fill="#212121" /><path d="M14 1C15.5188 1 16.75 2.23122 16.75 3.75C16.75 5.26878 15.5188 6.5 14 6.5C12.4812 6.5 11.25 5.26878 11.25 3.75C11.25 2.23122 12.4812 1 14 1ZM14 2C13.0335 2 12.25 2.7835 12.25 3.75C12.25 4.7165 13.0335 5.5 14 5.5C14.9665 5.5 15.75 4.7165 15.75 3.75C15.75 2.7835 14.9665 2 14 2Z"
                                fill="#212121" />
                        </svg>
                    </NavLink>
                    {/* <button
                        className="relative flex items-center rounded-full self-end overflow-hidden p-2 bg-neutral-200 hover:bg-neutral-200-hover lg:hidden"
                        type="button"
                        onClick={() => {
                            handleLogOut();
                        }}
                        >
                        <LogoutIcon />
                    </button> */}
                    <div>
                        <div className='flex flex-row gap-3 items-center'>
                            <div className='text-sm font-rhythmicHits'>
                                {currentUser.username}
                            </div>
                            {
                                (currentUser.avatar) ? (
                                    <>
                                        <div
                                            className='py-3'
                                            onClick={handleOpen}
                                        >
                                            <img
                                                src={`${BASEURL}/${currentUser.avatar.uri}`}
                                                width={35}
                                                height={35}
                                                className="rounded-full hover:cursor-pointer"
                                                alt=''
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className='py-3'
                                            onClick={handleOpen}
                                        >
                                            <AvatarIcon
                                                className="hover:cursor-pointer py-3"
                                                width="35"
                                                height="35"
                                            />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            transformOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            anchorPosition={{ top: 400, left: 400 }}
                        >
                            <div className='flex flex-col gap-2 py-2'>
                                <div
                                    onClick={() => {
                                        onLogout();
                                        handleClose();
                                    }}
                                    className='cursor-pointer text-[#000000] px-3 hover:text-[#678efa] text-sm'
                                ><LogoutIcon /></div>
                                <Divider />
                                <div
                                    onClick={() => {
                                        onProfile();
                                        handleClose();
                                    }}
                                    className='cursor-pointer text-[#000000] px-3 hover:text-[#678efa] text-sm'
                                >Profile</div>
                            </div>
                        </Popover>
                    </div>
                </div>
            </div>
        </>
    )
}
