import React, { useCallback } from 'react'
import { ReactComponent as CommunityIconR } from "assets/icons/community-icon-r.svg";
import { ReactComponent as CommunityIconG } from "assets/icons/community-icon-g.svg";
import { ReactComponent as CreateIconG } from "assets/icons/create-icon-g.svg";
import { ReactComponent as CreateIconR } from "assets/icons/create-icon-r.svg";
import { ReactComponent as ProfileIconG } from "assets/icons/profile-icon-g.svg";
import { ReactComponent as ProfileIconR } from "assets/icons/profile-icon-r.svg";
import { ReactComponent as LogoutIcon } from "assets/icons/logout-icon.svg";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AuthService from 'services/auth.service';
// import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";

const TitleBarItem = ({ to, IconActive, IconInactive, label }) => {
    const { pathname } = useLocation();

    return (
        <div className='flex flex-col items-center'>
            <NavLink
                to={to}
                className="flex flex-col items-center my-2 text-primary-700 lg:hidden"
                type="button"
            >
                {
                    pathname === to ? (
                        <IconActive className="h-8 w-8 rounded-sm hover:bg-neutral-300" />
                    ) : (
                        <IconInactive className="h-8 w-8 p-1 rounded-sm hover:bg-neutral-300" />
                    )
                }
                <label className={`${pathname === to ? 'text-[#FF90A1]' : 'text-[#010101]'} pt-1`}>{label}</label>
            </NavLink>
        </div>
    );
};

export default function TitleBar() {
    // const { pathname } = useLocation();

    // let currentUser = AuthService.getCurrentUser();
    const navigate = useNavigate()
    // const handleOnNavigate = () => {
    //     navigate("/profile")
    // }

    // const backToDashboard = () => {
    //     navigate("/create");
    // }

    const handleLogOut = useCallback(() => {
        AuthService.logout();
        navigate("/");
        window.location.reload();
    }, [navigate]);

    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
    // const id = open ? "simple-popover" : undefined;

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const handleOpen = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const onLogout = () => {
    //     handleLogOut()
    // }

    // const onProfile = () => {
    //     handleOnNavigate()
    // }

    return (
        <>
            <div className="w-full flex justify-center bg-[#faedda] h-[10vh] sm:h-0 shadow-custom-above">
                <div className="flex justify-between sm:justify-end gap-6 sm:w-[500px] w-full px-3 py-1 items-center">
                    <TitleBarItem
                        to="/create"
                        IconActive={CreateIconR}
                        IconInactive={CreateIconG}
                        label="Create"
                    />
                    <TitleBarItem
                        to="/profile"
                        IconActive={ProfileIconR}
                        IconInactive={ProfileIconG}
                        label="Profile"
                    />
                    <TitleBarItem
                        to="/community/blogs"
                        IconActive={CommunityIconR}
                        IconInactive={CommunityIconG}
                        label="Community"
                    />
                    <div
                        className="flex flex-col items-center my-2 text-primary-700 lg:hidden"
                        onClick={() => {
                            handleLogOut();
                        }}
                    >
                        <LogoutIcon className="w-8 h-8" />
                        <span className='pt-1'>Logout</span>
                    </div>
                    {/* <TitleBarItem
                        to="/profile"
                        IconActive={ProfileIconR}
                        IconInactive={ProfileIconG}
                        label="Profile"
                    /> */}
                    {/* <div className='flex flex-col items-center'>
                        <button
                            // to="/community/blogs"
                            className="flex flex-col items-center my-2 text-primary-700 lg:hidden"
                            type="button"
                            onClick={handleLogOut()}
                        >
                            {
                                pathname === "/community/blogs" ? (<CommunityIconR className="h-9 w-9 p-1 rounded-full hover:bg-neutral-300" />) : (<CommunityIconG className="h-9 w-9 rounded-full hover:bg-neutral-300" />)
                            }
                            <label className={`${pathname === '/community/blogs' ? 'text-[#FF90A1]' : 'text-[#010101]'} pt-1`}>Logout</label>
                        </button>
                    </div> */}


                    {/* <div>
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
                    </div> */}
                </div>
            </div>
        </>
    )
}
