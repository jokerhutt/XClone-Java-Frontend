import FollowersFollowing from "./FollowersFollowing";


function ProfileHoverPopoverContent ({postCreator, cachedFollows, currentUser}) {
    return(
        <>
            <div className="h-full w-full flex flex-col">
                {postCreator ? (
                    <>
                    <div className="relative">
                        <img src={postCreator.backGround}/>
                        <div className="z-45 absolute -translate-x-1 -bottom-1/3  mb-2 ml-4 h-35 w-35">
                            <img className="rounded-full h-16 w-16 object-cover border-4 border-black" src={postCreator.profilePic}/>
                        </div>
                    </div>
                    <div className="flex w-full justify-end mt-4">
                        <div className="hover:cursor-pointer bg-white w-1/3 flex justify-center items-center h-6 rounded-l-full rounded-r-full hover:bg-gray-200">
                            <p className="text-black font-bold">Follow</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="font-bold text-xl">{postCreator.displayName}</p>
                        <p>@{postCreator.username}</p>
                    </div>
                    <div className="w-full">
                        <FollowersFollowing currentUser={currentUser} cachedFollows={cachedFollows} mainUser={postCreator} />
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