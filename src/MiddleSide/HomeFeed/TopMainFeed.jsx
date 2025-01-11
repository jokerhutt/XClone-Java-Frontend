
import { useState } from "react";
import '../../App.css'
import NewPost from "./NewPost";
function TopMainFeed ({currentUser, setCurrentUser, setPosts}) {
    return(
        <div className="flex flex-col flex-grow h-full">
            <div className="flex-[1] bg-black h-full">
                <div className="flex flex-row justify-center h-full border-s-twitterBorder">
                    <div className="px-4 flex flex-row justify-center items-end h-full w-full" >
                        <p className="text-white py-4 font-bold border-b-4 border-b-twitterBlue text-sm">For You</p>
                    </div>
                    <div className="px-4 flex flex-row justify-center items-end h-full w-full">
                        <p className="text-white py-4 font-bold text-sm">Following</p>
                    </div>
                </div>
            </div>
            <div className="flex-[6] bg-black h-full px-4 border-2 border-twitterBorder" >
                <NewPost setPosts={setPosts} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            </div>
        </div>
    )
}

export default TopMainFeed;