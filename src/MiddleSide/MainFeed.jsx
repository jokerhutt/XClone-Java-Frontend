import { useState, useEffect } from "react";
import TopMainFeed from "./HomeFeed/TopMainFeed";
import { Outlet } from "react-router-dom";

import PostTemplate from "../PostTemplate";
import '../App.css'

function MainFeed ({currentUserFollowing, handleNewFollow, cachedFollows, followingFeedContent, getForYouFeed, cachedMediaPosts, setCachedMediaPosts, changeForYouFeed, setCurrentUserProfileData, currentUserProfileData, cachedAddedReplies, setCachedAddedReplies, cachedReposts, setCachedReposts, cachedBookMarks, setCachedBookMarks, setCachedLikedPosts, cachedLikedPosts, likedPostIdsSet, currentUser, setUserLikedPosts, setCurrentUser, forYouFeedContent, setForYouFeedContent}) {

    const [mainFeedTab, setMainFeedTab] = useState("FORYOU");

    return(
        <div className="flex flex-col flex-grow">
            <div className="flex-[1] bg-black">
                <TopMainFeed cachedMediaPosts={cachedMediaPosts} setCachedMediaPosts={setCachedMediaPosts} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} currentUser={currentUser} mainFeedTab={mainFeedTab} setMainFeedTab={setMainFeedTab} setCurrentUser={setCurrentUser} forYouFeedContent={forYouFeedContent} setForYouFeedContent={setForYouFeedContent}/>
            </div>

            <div className="flex-[3] flex flex-col justify-end h-full w-full border-l  border-r border-twitterBorder">
            {forYouFeedContent ? (
                <>
                {forYouFeedContent.map((post) => 
                    <div className="pb-2 border-b-2 border-twitterBorder" style={{ display: mainFeedTab === "FORYOU" ? "block" : "none" }}>
                        <PostTemplate currentUserFollowing={currentUserFollowing} handleNewFollow={handleNewFollow} cachedFollows={cachedFollows} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} postReplies={post.replyList} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} setUserLikedPosts={setUserLikedPosts} likedPostIdsSet={likedPostIdsSet} postReposts={post.repostList} postBookMarks={post.bookMarkList} postLikes={post.likeList} post={post} postCreator={post.creator} postMedia={post.mediaList} currentUser={currentUser} />
                    </div>
                    )}
                </>
            ) : (
                null
            )}
            </div>

            <div className="flex-[3] flex flex-col-reverse justify-end h-full w-full border-l-2  border-r-2 border-twitterBorder" style={{ display: mainFeedTab === "FOLLOWING" ? "block" : "none" }}>  
                {followingFeedContent.map((post) => 
                    <div className="pb-2 border-b-2 border-twitterBorder" >
                        <PostTemplate currentUserFollowing={currentUserFollowing} handleNewFollow={handleNewFollow} cachedFollows={cachedFollows} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} postReplies={post.replyList} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} setUserLikedPosts={setUserLikedPosts} likedPostIdsSet={likedPostIdsSet} postReposts={post.repostList} postBookMarks={post.bookMarkList} postLikes={post.likeList} post={post} postCreator={post.creator} postMedia={post.mediaList} currentUser={currentUser} />
                    </div>
                )}
            </div>

        <div 
        onClick={changeForYouFeed}
        className="hover:cursor-pointer text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
            <p>Load More Posts</p>
        </div>


        </div>
    )
}

export default MainFeed;