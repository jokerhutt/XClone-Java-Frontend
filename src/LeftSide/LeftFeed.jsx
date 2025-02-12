import { FaBookmark, FaSearch, FaHome, FaBell, FaListAlt, FaBook, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import MoreModal from "../MoreModal";
import { PiDotsThreeCircle } from "react-icons/pi";
import PostModal from "../PostModal";
import { GoDotFill } from "react-icons/go";
import LogOutModal from "../../LogOutModal";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";



function LeftFeed ({hasMessages,setBackGroundColor, setButtonColor, buttonColor, backGroundColor, setHasMessages, currentUser, forYouFeedContent, setForYouFeedContent}) {

    const [isPosting, setIsPosting] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    return(
        <>
        {isPosting && currentUser && forYouFeedContent ? (
            <PostModal buttonColor={buttonColor} backGroundColor={backGroundColor} setForYouFeedContent={setForYouFeedContent} forYouFeedContent={forYouFeedContent} currentUser={currentUser} isPosting={isPosting} setIsPosting={setIsPosting}/>
        ) : (
                null
            )}
<div className="flex flex-col flex-grow h-full w-full ml-20">

<Link to="/" className="flex-[1] h-full w-full flex items-center">
    <img src="/X.png" className="h-8 w-8"/>
</Link>

<div className="flex-[10] h-full w-full text-white mt-4 flex flex-col gap-6">
    <Link to="/"className="flex gap-4 items-center text-2xl ">
        <FaHome/>
        <p>Home</p>
    </Link>
    <Link className="hover:cursor-not-allowed flex gap-4 items-center text-2xl ">
        <FaSearch/>
        <p>Explore</p>
    </Link>
    {currentUser ? (
    <Link to={`/notifications/${currentUser.id}`} className="flex gap-4 items-center text-2xl ">
        <FaBell/>
        <p>Notifications</p>
    </Link>
    ) : (
    <div className="flex gap-4 items-center text-2xl ">
        <FaBell/>
        <p>Notifications</p>
    </div>
    )}
    {currentUser && hasMessages === true ? (
        <Link to={`/messages/${currentUser.id}`} className="flex gap-4 items-center text-2xl ">
            <IoMdMail/>
            <p>Messages</p>
            <div className="mr-6 text-twitterBlue">
                <GoDotFill />
            </div>
            </Link> 
    ) : currentUser ? (
        <Link to={`/messages/${currentUser.id}`} className="flex gap-4 items-center text-2xl ">
            <IoMdMail/>
            <p>Messages</p>
        </Link> 
    ) : (
        <Link className="flex gap-4 items-center text-2xl ">
            <IoMdMail/>
            <p>Messages</p>
        </Link> 
    )}

    {/* <Link className=" hover:cursor-not-allowed flex gap-4 items-center text-2xl ">
        <FaListAlt/>
        <p>Lists</p>
    </Link> */}
    {currentUser ? (
    <Link to={`/bookmarks/${currentUser.id}`} className="flex gap-4 items-center text-2xl ">
        <FaBookmark/>
        <p>Bookmarks</p>
    </Link>
    ) : (
    <div className="flex gap-4 items-center text-2xl ">
        <FaBookmark/>
        <p>Bookmarks</p>
    </div>  
    )}
    {/* <Link className="flex hover:cursor-not-allowed gap-4 items-center text-2xl ">
        <FaUserGroup />
        <p>Communities</p>
    </Link> */}
    {currentUser ? (
    <Link to={`/${currentUser.id}`} className="flex gap-4 items-center text-2xl ">
        <FaUser/>
        <p>Profile</p>
    </Link>
    ) : (
    <div className="flex gap-4 items-center text-2xl ">
        <FaUser/>
        <p>Profile</p>
    </div>
    )}
    <MoreModal backGroundColor={backGroundColor} buttonColor={buttonColor} setBackGroundColor={setBackGroundColor} setButtonColor={setButtonColor}/>
</div>
{currentUser ? (
    <>
<div className="flex-[2] w-full h-full">
    <div 
    onClick={() => setIsPosting(true)}
    className="bg-white w-3/5 h-12 flex justify-center items-center rounded-l-full rounded-r-full hover:cursor-pointer">
        <p className="text-center">Post</p>
    </div>
</div>

<div className="flex-[2] w-3/5 h-full mb-4">
    <LogOutModal isLoggingOut={isLoggingOut} setIsLoggingOut={setIsLoggingOut} currentUser={currentUser}/>
</div>
</>
) : (
    null
)}



</div>

         
        </>
        
    )
}

export default LeftFeed;