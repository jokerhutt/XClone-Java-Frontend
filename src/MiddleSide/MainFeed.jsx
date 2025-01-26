import { useState, useEffect } from "react";
import TopMainFeed from "./HomeFeed/TopMainFeed";
import { Outlet } from "react-router-dom";

import PostTemplate from "../PostTemplate";
import '../App.css'

function MainFeed ({cachedAddedReplies, setCachedAddedReplies, cachedReposts, setCachedReposts, cachedBookMarks, setCachedBookMarks, setCachedLikedPosts, cachedLikedPosts, likedPostIdsSet, currentUser, setUserLikedPosts, setCurrentUser, forYouFeedContent, setForYouFeedContent}) {

    const [mainFeedTab, setMainFeedTab] = useState("FORYOU");

    return(
        <div className="flex flex-col flex-grow">
            <div className="flex-[1] bg-black">
                <TopMainFeed currentUser={currentUser} mainFeedTab={mainFeedTab} setMainFeedTab={setMainFeedTab} setCurrentUser={setCurrentUser} forYouFeedContent={forYouFeedContent} setForYouFeedContent={setForYouFeedContent}/>
            </div>

            <div className="flex-[3] flex flex-col-reverse justify-end h-full w-full border-l-2  border-r-2 border-twitterBorder">
            {forYouFeedContent ? (
                <>
                {forYouFeedContent.map((post) => 
                    <div className="pb-2 border-b-2 border-twitterBorder" style={{ display: mainFeedTab === "FORYOU" ? "block" : "none" }}>
                        <PostTemplate cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} postReplies={post.replyList} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} setUserLikedPosts={setUserLikedPosts} likedPostIdsSet={likedPostIdsSet} postReposts={post.repostList} postBookMarks={post.bookMarkList} postLikes={post.likeList} post={post} postCreator={post.creator} postMedia={post.mediaList} currentUser={currentUser} />
                    </div>
                    )}
                </>
            ) : (
                null
            )}




            </div>

            {/* <div className="flex-[3] flex flex-col-reverse justify-end h-full w-full border-l-2  border-r-2 border-twitterBorder" style={{ display: mainFeedTab === "FOLLOWING" ? "block" : "none" }}>  
                {userFollowingPosts.map((post) => 
                    <div className="pb-2 border-b-2 border-twitterBorder" >
                        <PostTemplate post={post} posts={posts} currentUser={currentUser} />
                    </div>
                )}
            </div> */}

        <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
            <p>Load More Posts</p>
        </div>


        </div>
    )
}

export default MainFeed;