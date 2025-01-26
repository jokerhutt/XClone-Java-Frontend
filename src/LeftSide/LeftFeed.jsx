import { FaBookmark, FaSearch, FaHome, FaBell, FaListAlt, FaBook, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import PostModal from "../PostModal";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";



function LeftFeed ({currentUser}) {

    const [isPosting, setIsPosting] = useState(false);

    return(
        <>
        {/* {isPosting && currentUser && setPosts ? (
            <PostModal setPosts={setPosts} currentUser={currentUser} isPosting={isPosting} setIsPosting={setIsPosting}/>
        ) : (
                null
            )} */}
<div className="flex flex-col flex-grow h-full w-full ml-20">

<div className="flex-[1] h-full w-full bg-black flex items-center">
    <img src="/X.png" className="h-8 w-8"/>
</div>

<div className="flex-[10] h-full w-full bg-black text-white mt-4 flex flex-col gap-6">
    <Link to="/"className="flex gap-4 items-center text-2xl font-bold">
        <FaHome/>
        <p>Home</p>
    </Link>
    <Link to="/explore" className="flex gap-4 items-center text-2xl font-bold">
        <FaSearch/>
        <p>Explore</p>
    </Link>
    {currentUser ? (
    <Link to={`/notifications/${currentUser.id}`} className="flex gap-4 items-center text-2xl font-bold">
        <FaBell/>
        <p>Notifications</p>
    </Link>
    ) : (
    <div className="flex gap-4 items-center text-2xl font-bold">
        <FaBell/>
        <p>Notifications</p>
    </div>
    )}
    {currentUser ? (
    <Link to={`/messages/${currentUser.id}`} className="flex gap-4 items-center text-2xl font-bold">
        <IoMdMail/>
        <p>Messages</p>
    </Link> 
    ) : (
        <Link to={`/messages}`} className="flex gap-4 items-center text-2xl font-bold">
        <IoMdMail/>
        <p>Messages</p>
    </Link> 
    )}

    <Link to="/lists" className="flex gap-4 items-center text-2xl font-bold">
        <FaListAlt/>
        <p>Lists</p>
    </Link>
    {currentUser ? (
    <Link to={`/bookmarks/${currentUser.id}`} className="flex gap-4 items-center text-2xl font-bold">
        <FaBookmark/>
        <p>Bookmarks</p>
    </Link>
    ) : (
    <div className="flex gap-4 items-center text-2xl font-bold">
        <FaBookmark/>
        <p>Bookmarks</p>
    </div>  
    )}
    <Link to="/communities" className="flex gap-4 items-center text-2xl font-bold">
        <FaUserGroup />
        <p>Communities</p>
    </Link>
    {currentUser ? (
    <Link to={`/${currentUser.id}`} className="flex gap-4 items-center text-2xl font-bold">
        <FaUser/>
        <p>Profile</p>
    </Link>
    ) : (
    <div className="flex gap-4 items-center text-2xl font-bold">
        <FaUser/>
        <p>Profile</p>
    </div>
    )}

    <div className="flex gap-4 items-center text-2xl font-bold">
        <FaUserGroup/>
        <p>More</p>
    </div>
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

<div className="flex-[1] w-full h-full mb-4">
    <div className="bg-transparent w-3/5 h-12 p-2 flex justify-center items-center rounded-l-full rounded-r-full hover:bg-twitterBorder hover:cursor-pointer">
        <div className="flex-[1] flex justify-start items-center">
            <img src={currentUser.profilePic} className="h-2/3 w-2/3 rounded-full"/>
        </div>
        <div className="flex-[2] flex flex-col text-white w-full h-full pl-4">
            <div>
            <p>{currentUser.displayName}</p>
            </div>
            <div>
                <p>{currentUser.username}</p>
            </div>
        </div>
        <div className="text-white text-2xl">
            <HiOutlineDotsHorizontal />
        </div>
    </div>
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