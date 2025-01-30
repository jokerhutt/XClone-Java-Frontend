function ProfileFeedTabState({setTabState, tabState}) {
    return(
        <>
        <div 
            onClick={() => setTabState("posts")}
            className="flex justify-center w-full h-full hover:bg-twitterBorder hover:cursor-pointer">
                {tabState == "posts" ? (
                    <p className="border-b-2 font-bold border-twitterBlue">Posts</p>
                ) : (
                    <p>Posts</p>
                )}
                
            </div>
            <div 
            onClick={() => setTabState("replies")}
            className="flex justify-center items-center w-full h-full hover:bg-twitterBorder hover:cursor-pointer">
                {tabState == "replies" ? (
                    <p className="border-b-2 font-bold border-twitterBlue">Replies</p>
                ) : (
                    <p>Replies</p>
                )}
            </div>
            <div className="flex justify-center items-center w-full h-full hover:bg-twitterBorder hover:cursor-pointer">
                <p>Media</p>
            </div>
            <div 
            onClick={() => setTabState("likes")}
            className="flex justify-center items-center w-full h-full hover:bg-twitterBorder hover:cursor-pointer">
                {tabState == "likes" ? (
                    <p className="border-b-2 font-bold border-twitterBlue">Likes</p>
                ) : (
                    <p>Likes</p>
                )}      
        </div>
        </>
    )
}

export default ProfileFeedTabState;