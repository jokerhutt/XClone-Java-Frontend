
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { FaRegComment } from "react-icons/fa6";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
  } from "@material-tailwind/react";

  import ProfileHoverPopoverContent from "./ProfileHoverPopoverContent";
import { useEffect, useState } from "react";

function ProfileHoverPopover ({handleNewFollow, postCreator, cachedFollows, currentUser, toggleFollowing, setToggleFollowing}) {

    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
    {postCreator ? (

    <Popover open={isHovering} placement="bottom">
        <PopoverHandler
                onMouseEnter={() => setIsHovering(true)}  // Keep open while hovering over content
                onMouseLeave={() => setIsHovering(false)} // Close when leaving
        >
            <img src={postCreator.profilePic} className="rounded-full"/>
        </PopoverHandler>
        <PopoverContent 
        onMouseEnter={() => setIsHovering(true)}  // Keep open while hovering over content
        onMouseLeave={() => setIsHovering(false)} // Close when leaving
        className=" hover:cursor-pointer
        bg-black text-white shadow-lg rounded-xl p-4 border border-twitterBorder 
        h-60 w-72 mt-2 ring-2 ring-gray-400 ring-opacity-80 shadow-gray-400/70
    ">
            <ProfileHoverPopoverContent handleNewFollow={handleNewFollow} toggleFollowing={toggleFollowing} setToggleFollowing={setToggleFollowing} currentUser={currentUser} cachedFollows={cachedFollows} postCreator={postCreator}/>
        </PopoverContent>
    </Popover>

    ) : (
        null
    )}
    </>
    )
}

export default ProfileHoverPopover;