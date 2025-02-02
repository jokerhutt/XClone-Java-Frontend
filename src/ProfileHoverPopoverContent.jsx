import FollowersFollowing from "./FollowersFollowing";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileHoverPopoverContent ({currentUserFollowing, handleNewFollow, toggleFollowing, setToggleFollowing, postCreator, cachedFollows, currentUser}) {
    
    const [unfollowHover, setUnfollowHover] = useState(false);
    const [disableNavigation, setDisableNavigation] = useState(false)
    const navigate = useNavigate();

    function handleNavigation () {
        if (disableNavigation === false) {
            navigate(`/${postCreator.id}`)
        }
    } 
    
    return(
        <>
            <div 
            onClick={() => handleNavigation()}
            className="h-full w-full flex flex-col">
                {postCreator ? (
                    <>
                    <div className="relative">
                        <img src={postCreator.backGround} className="h-24 w-full"/>
                        <div className="z-45 absolute -translate-x-1 -bottom-1/3  mb-2 ml-4 h-35 w-35">
                            <img className="rounded-full h-16 w-16 object-cover border-4 border-black" src={postCreator.profilePic}/>
                        </div>
                    </div>
                    <div className="flex w-full justify-end mt-3" onMouseEnter={() => setDisableNavigation(true)} onMouseLeave={() => setDisableNavigation(false)}>
                        {toggleFollowing ? (
                        <div 
                        onClick={() => handleNewFollow(postCreator.id, currentUser.id)}
                        onMouseEnter={() => setUnfollowHover(true)}
                        onMouseLeave={() => setUnfollowHover(false)}
                        className="hover:cursor-pointer bg-black w-1/3 flex justify-center border-twitterBorder border items-center h-6 rounded-l-full rounded-r-full">
                            {unfollowHover ? (
                                <p className="text-red-500">Unfollow</p>
                            ) : (
                                <p className="text-white">Following</p>
                            )}

                        </div>     
                        ) : currentUser ? (                           
                        <div 
                        onClick={() => handleNewFollow(postCreator.id, currentUser.id)}
                        className="hover:cursor-pointer bg-white w-1/3 flex justify-center items-center h-6 rounded-l-full rounded-r-full hover:bg-gray-200">
                            <p className="text-black">Follow</p>
                        </div>
                        ) : (
                        <div 
                            className="hover:cursor-pointer bg-white w-1/3 flex justify-center items-center h-6 rounded-l-full rounded-r-full hover:bg-gray-200">
                                <p className="text-black">Follow</p>
                        </div>
                        )}

                    </div>
                    <div className="w-full">
                        <p className="font-bold text-xl">{postCreator.displayName}</p>
                        <p>@{postCreator.username}</p>
                    </div>
                    <div className="w-full mt-2">
                        <FollowersFollowing currentUserFollowing={currentUserFollowing} toggleFollowing={toggleFollowing} setToggleFollowing={setToggleFollowing} currentUser={currentUser} cachedFollows={cachedFollows} mainUser={postCreator} />
                    </div>
                    </>
                ) : (
                    null
                )}



            </div>
        </>
    )
}

export default ProfileHoverPopoverContent;