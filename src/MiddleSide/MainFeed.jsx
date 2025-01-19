import { useState, useEffect } from "react";
import TopMainFeed from "./HomeFeed/TopMainFeed";
import { Outlet } from "react-router-dom";

import PostTemplate from "../PostTemplate";
import '../App.css'

function MainFeed ({posts, currentUser, setCurrentUser, setPosts, userFollowingPosts, fetchUserFollowingPosts, refreshPosts}) {

    const [mainFeedTab, setMainFeedTab] = useState("FORYOU");

    // useEffect(() => {
    //     if (currentUser) {
    //         const profileUserId = currentUser.id
    //         fetch(`http://localhost:6790/api/grabuserreplies/${profileUserId}`)
    //         .then(response => response.json())
    //         .then((data) => setUserReplies([...data]))
    //         .catch(error => console.error(error));

    //     }
    // }, [])

    useEffect(() => {
        fetchUserFollowingPosts()
    }, [mainFeedTab])


    return(
        <div className="flex flex-col flex-grow">
            <div className="flex-[1] bg-black">
                <TopMainFeed refreshPosts={refreshPosts} fetchUserFollowingPosts={fetchUserFollowingPosts} setPosts={setPosts} currentUser={currentUser} setCurrentUser={setCurrentUser} mainFeedTab={mainFeedTab} setMainFeedTab={setMainFeedTab}/>
            </div>
{mainFeedTab === "FORYOU" ? (
            <div className="flex-[3] flex flex-col-reverse justify-end h-full w-full border-l-2  border-r-2 border-twitterBorder">
            {posts.map((post) => 
            <div className="pb-2 border-b-2 border-twitterBorder">
                <PostTemplate post={post} posts={posts} currentUser={currentUser} />
            </div>
            )}
        </div>
        ) : mainFeedTab === "FOLLOWING" ? (
            <div className="flex-[3] flex flex-col-reverse justify-end h-full w-full border-l-2  border-r-2 border-twitterBorder">
            {userFollowingPosts.map((post) => 
                <div className="pb-2 border-b-2 border-twitterBorder">
                    <PostTemplate post={post} posts={posts} currentUser={currentUser} />
                </div>
            )}
            </div>
        ) : (
        <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
            <p>Loading...</p>
        </div>
        )}

        </div>
    )
}

export default MainFeed;