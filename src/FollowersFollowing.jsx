import { useEffect, useState } from "react";

function FollowersFollowing ({currentUserFollowing, toggleFollowing, setToggleFollowing, mainUser, cachedFollows, currentUser}) {

    const [userFollowerList, setUserFollowerList] = useState(mainUser.followerList);
    const [userFollowingList, setUserFollowingList] = useState(mainUser.followingList);
    const [followersLength, setFollowersLength] = useState(userFollowerList.length);
    const [followingLength, setFollowingLength] = useState(userFollowingList.length);


    useEffect(() => {
        if (cachedFollows) {
            console.log("CACHED FOLLOWS IS " + JSON.stringify(cachedFollows))
        }

    }, [cachedFollows])


    

    function handleFollowersUpdate () {
        if (userFollowerList) {
            if (currentUser && mainUser.id === currentUser.id) {
                setFollowersLength(userFollowerList.length)
                setFollowingLength(currentUserFollowing)
            }   else if (currentUser && mainUser.id !== currentUser.id && cachedFollows) {
                    const userFollowingArray = cachedFollows[mainUser.id] || [];
                    const isUserFollowedByUser = userFollowerList.some((follow) => follow.followingId === currentUser.id)
                
                    if (isUserFollowedByUser && userFollowingArray && userFollowingArray.length != 0) {
                        setFollowersLength(userFollowerList.length);
                        setToggleFollowing(true)
                    } else if (userFollowingArray && userFollowingArray.length != 0 && !isUserFollowedByUser) {
                        setFollowersLength(userFollowerList.length + 1);
                        setToggleFollowing(true)
                    } else if (isUserFollowedByUser && userFollowingArray.length <= 0) {
                        setFollowersLength(userFollowerList.length - 1)
                        setToggleFollowing(false)
                    } else {
                        setFollowersLength(userFollowerList.length);
                        setToggleFollowing(false)
                    }
                } else {
                    setFollowersLength(userFollowerList.length);
                    setToggleFollowing(false)
            }
        }
    }

    useEffect(() => {
        if (userFollowerList && cachedFollows) {
            console.log("BLAH")
            handleFollowersUpdate()
        }
    }, [userFollowerList, cachedFollows, currentUserFollowing])

    return (
        <>
            <div className="flex w-full gap-4 items-center">
                <p> <span className="font-bold">{followersLength}</span> Followers</p>
                <p> <span className="font-bold">{followingLength}</span> Following</p>
            </div>
        </>
    )
}

export default FollowersFollowing;