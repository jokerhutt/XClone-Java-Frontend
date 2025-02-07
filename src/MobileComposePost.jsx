import NewPost from "./MiddleSide/HomeFeed/NewPost";
import { FaArrowLeft } from "react-icons/fa";
import clsx from 'clsx';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MobileComposePost ({
    buttonColor, backGroundColor, setForYouFeedContent, setCachedMediaPosts, currentUser, forYouFeedContent, currentUserProfileData, setCurrentUserProfileData}) {
    const [mobileCompose, setMobileCompose] = useState(true)
    const navigate = useNavigate();

    return (
        <div className="h-full w-full flex flex-col">
            <div className='h-16 w-full px-4 justify-start gap-5 flex border-b border-twitterBorder text-white'>
                <div className="w-8 ml-2 h-full flex justify-start text-lg sticky top-0 z-20 items-center">
                    <FaArrowLeft onClick={() => navigate(-1)} className={clsx ("hover:drop-shadow-[0_0_15px_#1C9BF0] transition duration-300 hover:cursor-pointer", {
                        "hover:text-twitterRed": buttonColor === "twitterRed",
                        "hover:text-twitterBlue": buttonColor === "twitterBlue",
                        "hover:text-twitterYellow": buttonColor === "twitterYellow",
                        "hover:text-twitterPurple": buttonColor === "twitterPurple",
                    })}/>
                </div>
                <div className="flex items-center justify-start">
                    <h2 className='font-bold'>Compose a post</h2>
                </div>
            </div>
            <div className="px-6 flex flex-grow pt-2">
                <NewPost mobileCompose={mobileCompose} setCachedMediaPosts={setCachedMediaPosts} currentUserProfileData={currentUserProfileData} setCurrentUserProfileData={setCurrentUserProfileData} buttonColor={buttonColor} setForYouFeedContent={setForYouFeedContent} forYouFeedContent={forYouFeedContent} currentUser={currentUser}/>
            </div>
            
        </div>
    )
}

export default MobileComposePost;