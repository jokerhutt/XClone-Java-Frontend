import { useEffect, useState } from "react";

function FollowersFollowing ({mainUser, cachedFollows, currentUser}) {

    const [userFollowerList, setUserFollowerList] = useState(mainUser.followerList);
    const [userFollowingList, setUserFollowingList] = useState(mainUser.followingList);
    const [followersLength, setFollowersLength] = useState(userFollowerList.length);
    const [followingLength, setFollowingLength] = useState(userFollowingList.length);

    useEffect(() => {
        console.log("MAIN USER IS " + JSON.stringify(mainUser))
        console.log("MAIN USER FOLLOWER LIST IS " + JSON.stringify(mainUser.followerList))
        console.log("USER FOLLOWER LIST IS " + JSON.stringify(userFollowerList))
        console.log("CACHE IS " + JSON.stringify(cachedFollows))
    }, [mainUser, userFollowerList, cachedFollows])





    

    function handleFollowersUpdate () {
        if (userFollowerList) {
            console.log("🔄 Updating userFollowerList state:", JSON.stringify(mainUser.followerList) + " " + JSON.stringify(userFollowerList));
            if (currentUser && mainUser.id !== currentUser.id && cachedFollows) {
                const userFollowingArray = cachedFollows[mainUser.id] || [];
                const isUserFollowedByUser = userFollowerList.some((follow) => follow.followingId === currentUser.id)
          
                if (isUserFollowedByUser && userFollowingArray && userFollowingArray.length != 0) {
                    setFollowersLength(userFollowerList.length);
                } else if (userFollowingArray && userFollowingArray.length != 0 && !isUserFollowedByUser) {
                    setFollowersLength(userFollowerList.length + 1);
                } else if (isUserFollowedByUser && userFollowingArray.length <= 0) {
                    setFollowersLength(userFollowerList.length - 1)
                } else {
                    setFollowersLength(userFollowerList.length);
                }
            } else {
                setFollowersLength(userFollowerList.length);
            }
        }
    }

    useEffect(() => {
        if (userFollowerList && cachedFollows) {
            handleFollowersUpdate()
        }
    }, [userFollowerList, cachedFollows])

    return (
        <>
            <div className="flex w-full gap-2 items-center">
                <p>{followersLength} Followers</p>
                <p>{followingLength} Following</p>
            </div>
        </>
    )
}

export default FollowersFollowing;