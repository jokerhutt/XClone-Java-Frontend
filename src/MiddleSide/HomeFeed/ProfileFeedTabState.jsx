import clsx from 'clsx';

function ProfileFeedTabState({setTabState, buttonColor, tabState}) {

    
    return(
        <>
        <div 
            onClick={() => setTabState("posts")}
            className="flex justify-center w-full h-full hover:bg-twitterBorder hover:cursor-pointer">
                {tabState == "posts" ? (
                    <p className={clsx("border-b-2 font-bold", {
                        "border-twitterRed": buttonColor === "twitterRed",
                        "border-twitterBlue": buttonColor === "twitterBlue",
                        "border-twitterYellow": buttonColor === "twitterYellow",
                        "border-twitterPurple": buttonColor === "twitterPurple",
                    })}>Posts</p>
                ) : (
                    <p>Posts</p>
                )}
                
            </div>
            {/* <div 
            onClick={() => setTabState("replies")}
            className="flex justify-center items-center w-full h-full hover:bg-twitterBorder hover:cursor-pointer">
                {tabState == "replies" ? (
                    <p className="border-b-2 font-bold border-twitterBlue">Replies</p>
                ) : (
                    <p>Replies</p>
                )}
            </div> */}
            <div 
            onClick={() => setTabState("media")}
            className="flex justify-center items-center w-full h-full hover:bg-twitterBorder hover:cursor-pointer">
                {tabState == "media" ? (
                    <p className={clsx("border-b-2 font-bold", {
                        "border-twitterRed": buttonColor === "twitterRed",
                        "border-twitterBlue": buttonColor === "twitterBlue",
                        "border-twitterYellow": buttonColor === "twitterYellow",
                        "border-twitterPurple": buttonColor === "twitterPurple",

                    })}>Media</p>
                ) : (
                    <p>Media</p>
                )}      
            </div>
            <div 
            onClick={() => setTabState("likes")}
            className="flex justify-center items-center w-full h-full hover:bg-twitterBorder hover:cursor-pointer">
                {tabState == "likes" ? (
                    <p className={clsx("border-b-2 font-bold", {
                        "border-twitterRed": buttonColor === "twitterRed",
                        "border-twitterBlue": buttonColor === "twitterBlue",
                        "border-twitterYellow": buttonColor === "twitterYellow",
                        "border-twitterPurple": buttonColor === "twitterPurple",
                    })}>Likes</p>
                ) : (
                    <p>Likes</p>
                )}      
        </div>
        </>
    )
}

export default ProfileFeedTabState;