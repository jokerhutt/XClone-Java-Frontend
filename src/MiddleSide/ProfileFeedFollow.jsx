import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";

function ProfileFeedFollow({isFollowing, currentUser, profileUser, userFollowing, handleNewFollow}) {

    const [unfollowHover, setUnfollowHover] = useState(false);

    useEffect(() => {
        console.log("profile user is: " + JSON.stringify(profileUser))
        console.log("current user is: " + JSON.stringify(currentUser))
    }, [profileUser, currentUser])

    return (
    <div className="h-full w-full flex justify-end gap-6 items-center">
        {currentUser && profileUser.id === currentUser.id? (
        <div 
        className="hover:cursor-pointer h-full w-1/5 flex justify-center items-center border-twitterBorder rounded-l-xl rounded-r-xl py-0.5 border-2">
            <p className="text-4">Edit Profile</p>
        </div>
        ) : isFollowing ? (
                <>
                <Link to={`/messages/${currentUser.id}/${profileUser.id}`} className="text-xl hover:cursor-pointer">
                    <CiMail />
                </Link>
                <div 
                onClick={() => handleNewFollow(profileUser.id, currentUser.id)}
                onMouseEnter={() => setUnfollowHover(true)}
                onMouseLeave={() => setUnfollowHover(false)}
                className="hover:cursor-pointer h-full w-1/5 flex justify-center items-cente rounded-l-xl rounded-r-xl py-0.5 border-twitterBorder border-2">
                    {unfollowHover ? (
                        <div className="">
                            <p className="text-4 text-red-500">Unfollow</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-4">Following</p>
                        </div>
                    )}

                </div>
                </>
        ) : (
            <>
            <Link to={`/messages/${currentUser.id}/${profileUser.id}`} className="text-xl hover:cursor-pointer">
                <CiMail />
            </Link>
            <div 
            onClick={() => handleNewFollow(profileUser.id, currentUser.id)}
            className="hover:cursor-pointer h-full w-1/5 flex justify-center items-center bg-white text-black rounded-l-xl rounded-r-xl py-0.5 border-2">
                <p className="text-4">Follow</p>
            </div>
            </>
        )}
    </div>
    )
}

export default ProfileFeedFollow;