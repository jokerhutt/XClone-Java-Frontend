
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
import { useEffect, useState, useRef } from "react";
import clsx from 'clsx';
import { useNavigate } from "react-router-dom";

function ProfileHoverPopover ({currentUserFollowing, backGroundColor, buttonColor, handleNewFollow, postCreator, cachedFollows, currentUser, toggleFollowing, setToggleFollowing}) {

    const [isHovering, setIsHovering] = useState(false);
    const [hoveringDisplayState, setHoveringDisplayState] = useState(false);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    

    function handleHoverTrue () {
        clearTimeout(timeoutRef.current);
        setIsHovering(true);
        timeoutRef.current = setTimeout(() => {
            setHoveringDisplayState(true);
        }, 1000)
    }

    function handleHoverFalse () {
        clearTimeout(timeoutRef.current);
        setIsHovering(false);
        timeoutRef.current = setTimeout(() => {
            setHoveringDisplayState(false);
        }, 200);
    }

    return (
        <>
    {postCreator ? (

    <Popover open={hoveringDisplayState} placement="bottom"
    >
        <PopoverHandler
                onMouseEnter={() => handleHoverTrue()}
                onMouseLeave={() => handleHoverFalse()}
                onClick={() => navigate(`/${postCreator.id}`)}
        >
            <img
            src={postCreator.profilePic} className="hover:cursor-pointer rounded-full"/>
        </PopoverHandler>
        <PopoverContent 
        onMouseEnter={() => handleHoverTrue()}
        onMouseLeave={() => handleHoverFalse()}
        className={clsx ("hover:cursor-pointer text-white shadow-lg rounded-xl border border-twitterBorder h-60 p-4 w-72 ring-2 ring-gray-400 ring-opacity-80 shadow-gray-400/70 overflow-hidden", {
            "bg-dimBackGround": backGroundColor === "dimBackGround",
            "bg-twitterBlack": backGroundColor === "twitterBlack",
        })}>
            <ProfileHoverPopoverContent currentUserFollowing={currentUserFollowing} handleNewFollow={handleNewFollow} toggleFollowing={toggleFollowing} setToggleFollowing={setToggleFollowing} currentUser={currentUser} cachedFollows={cachedFollows} postCreator={postCreator}/>
        </PopoverContent>
    </Popover>

    ) : (
        null
    )}
    </>
    )
}

export default ProfileHoverPopover;