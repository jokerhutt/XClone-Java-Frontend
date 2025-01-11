import { useState } from "react";
import TopMainFeed from "./HomeFeed/TopMainFeed";
import { Outlet } from "react-router-dom";

import PostTemplate from "../PostTemplate";
import '../App.css'

function MainFeed ({posts, currentUser, setCurrentUser, setPosts}) {

    return(
        <div className="flex flex-col flex-grow">
            <div className="flex-[1] bg-black">
                <TopMainFeed setPosts={setPosts} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </div>

            <div className="flex-[3] flex flex-col-reverse justify-end h-full w-full border-l-2  border-r-2 border-twitterBorder">
                {posts.map((post) => 
                <div className="pb-2 border-b-2 border-twitterBorder">
                    <PostTemplate post={post} posts={posts}/>
                </div>
                )}
            </div>
        </div>
    )
}

export default MainFeed;