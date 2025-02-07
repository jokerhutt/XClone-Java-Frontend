
import {
    Drawer,
    Button,
    Typography,
    IconButton,
  } from "@material-tailwind/react";
  import { FaBookmark, FaSearch, FaHome, FaBell, FaListAlt, FaBook, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FaPaintBrush } from "react-icons/fa";
import StylingComponent from "./StylingComponent";
import FollowersFollowing from "./FollowersFollowing";
import { IoMdMail } from "react-icons/io";

  import clsx from 'clsx';
import { useState } from "react";

function MobileLeftFeedDrawer ({open, currentUserFollowing, cachedFollows, buttonColor, backGroundColor, setBackGroundColor, setButtonColor, currentUser, openDrawer, closeDrawer}) {
    
    const [toggleFollowing, setToggleFollowing] = useState(false);
    
    return (
        <>

        <Drawer size={260} placement="left" open={open} onClose={closeDrawer} className={clsx ("border l border-l-twitterBorder", {
            "bg-dimBackGround": backGroundColor === "dimBackGround",
            "bg-twitterBlack": backGroundColor === "twitterBlack",
        })}>

            <div className="px-4 w-full h-full flex flex-col py-6">

                <div className="h-28 w-full">
                {currentUser ? (
                    <div className="h-full w-full flex flex-col">
                    
                        <div className="w-full flex gap-4 items-center">
                            <img className="h-8 rounded-full" src={currentUser.profilePic}/>
                            <div className="text-white flex flex-col justify-center">
                            <p className="font-bold">{currentUser.displayName}</p>
                            <p className="text-twitterBorder">@{currentUser.username}</p>
                            </div>
                        </div>
                        <div className="py-1">
                            <FollowersFollowing currentUserFollowing={currentUserFollowing} setToggleFollowing={setToggleFollowing} currentUser={currentUser} mainUser={currentUser} cachedFollows={cachedFollows}/>
                        </div>
                    </div>
                ) : (
                    <div>
                    </div>
                )}

                </div>

                <div className="w-full h-auto my-4 flex flex-col text-white gap-6">
                {currentUser ? (
                    <>
                    <Link onClick={closeDrawer} to={`/${currentUser.id}`} className="flex gap-4 items-center text-2xl ">
                        <FaUser/>
                        <p>Profile</p>
                    </Link>
                    <Link className="hover:cursor-not-allowed flex gap-4 items-center text-2xl ">
                    <FaSearch/>
                    <p>Explore</p>
                    </Link>
                    <Link onClick={closeDrawer} to={`/notifications/${currentUser.id}`} className="flex gap-4 items-center text-2xl">        
                        <FaBell/>
                        <p>Notifications</p>
                    </Link>
                    <Link onClick={closeDrawer} to={`/messages/${currentUser.id}`} className="flex gap-4 items-center text-2xl ">
                        <IoMdMail/>
                        <p>Messages</p>
                    </Link> 
                    <Link onClick={closeDrawer} to={`/bookmarks/${currentUser.id}`} className="flex gap-4 items-center text-2xl ">
                        <FaBookmark/>
                        <p>Bookmarks</p>
                    </Link>
                    </>
                    ) : (
                        <>
                    <Link className="flex gap-4 items-center text-2xl ">
                        <FaUser/>
                        <p>Profile</p>
                    </Link>
                    <Link className="hover:cursor-not-allowed flex gap-4 items-center text-2xl ">
                        <FaSearch/>
                        <p>Explore</p>
                    </Link>
                    <Link className="items-center text-2xl flex gap-4">        
                        <FaBell/>
                        <p>Notifications</p>
                    </Link>
                    <Link className="flex gap-4 items-center text-2xl ">
                        <IoMdMail/>
                        <p>Messages</p>
                    </Link> 
                    <Link className="flex gap-4 items-center text-2xl ">
                        <FaBookmark/>
                        <p>Bookmarks</p>
                    </Link>

                    </>
                )}
                </div>
                <div>
                <div className="flex gap-4 w-full justify-center my-2 border-t border-b border-y-twitterBorder py-2 items-center text-2xl text-center text-white">
                        <p>Display</p>
                </div>
                    <StylingComponent setBackGroundColor={setBackGroundColor} buttonColor={buttonColor} setButtonColor={setButtonColor} backGroundColor={backGroundColor}/> 
                </div>

            </div>

        </Drawer>

        </>
    )
}

export default MobileLeftFeedDrawer