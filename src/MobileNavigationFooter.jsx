import { FaBookmark, FaSearch, FaHome, FaBell, FaListAlt, FaBook, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { FaB } from "react-icons/fa6";

function MobileNavigationFooter ({currentUser, hasMessages}) {
    return(
        <div className="text-white h-full w-full flex justify-around items-center">

        {currentUser ? (
        <>
        <Link to="/"className="flex gap-4 items-center text-2xl ">
        <FaHome/>
        </Link>
        <Link className="hover:cursor-not-allowed flex gap-4 items-center text-2xl ">
        <FaSearch/>
        </Link>
        <Link to={`/notifications/${currentUser.id}`} className="items-center text-2xl ">        
            <FaBell/>
        </Link>
        <Link to={`/messages/${currentUser.id}`} className="flex gap-4 items-center text-2xl ">
        {currentUser && hasMessages === true ? (
                <>
                <div className="h-3 w-3 rounded-full bg-twitterBlue z-50 absolute translate-x-4 flex justify-center items-center">

                </div>
                <IoMdMail/>
                </>
            ) : (
                <IoMdMail/>
            )}
        </Link> 
        <Link to={`/bookmarks/${currentUser.id}`} className="flex gap-4 items-center text-2xl ">
            <FaBookmark/>
        </Link>
        </>
        ) : (
            <>
        <Link to="/"className="flex gap-4 items-center text-2xl ">
            <FaHome/>
        </Link>
        <Link className="hover:cursor-not-allowed flex gap-4 items-center text-2xl ">
            <FaSearch/>
        </Link>
        <Link className="items-center text-2xl ">        
                <FaBell/>
        </Link>
        <Link className="flex gap-4 items-center text-2xl relative">
                <IoMdMail/>
        </Link> 
        </>
        )}


        </div>
    )
}

export default MobileNavigationFooter;