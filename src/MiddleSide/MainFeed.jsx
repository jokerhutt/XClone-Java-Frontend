import { useState, useEffect, useRef } from "react";
import TopMainFeed from "./HomeFeed/TopMainFeed";
import { Outlet } from "react-router-dom";
import clsx from 'clsx';
import { ImQuill } from "react-icons/im";
import PostModal from "../PostModal";
import { GiQuillInk } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import SignUpModal from "../SignUpModal";
import LoginModal from "../LogInModal";

import PostTemplate from "../PostTemplate";
import '../App.css'

function MainFeed ({currentUserFollowing, buttonColor, backGroundColor, bookMarkContent, setBookMarkContent, handleNewFollow, cachedFollows, followingFeedContent, setButtonColor, setBackGroundColor, getForYouFeed, cachedMediaPosts, setCachedMediaPosts, changeForYouFeed, setCurrentUserProfileData, mainFeedTab, setMainFeedTab, currentUserProfileData, cachedAddedReplies, setCachedAddedReplies, cachedReposts, setCachedReposts, cachedBookMarks, setCachedBookMarks, setCachedLikedPosts, cachedLikedPosts, likedPostIdsSet, currentUser, setUserLikedPosts, setCurrentUser, forYouFeedContent, setForYouFeedContent}) {

    const [isPosting, setIsPosting] = useState(false);
    const [loginState, setLoginState] = useState(false);
    const [signingUp, setSigningup] = useState(false);
    const [scrollUp, setScrollUp] = useState(true);
    const feedRef = useRef(null);

    const navigate = useNavigate();


    useEffect(() => {
        const feedDiv = feedRef.current; // Get the scrollable div
        if (!feedDiv) return; // Prevent errors if it doesn't exist

        let lastScrollTop = feedDiv.scrollTop; // 🔹 Track last scroll position

        const handleScroll = () => {
            const currentScrollTop = feedDiv.scrollTop; // Get current scroll position
            if (currentScrollTop > lastScrollTop) {
                setScrollUp(false); // 🔻 Scrolling down -> Hide header
            } else if (currentScrollTop < lastScrollTop) {
                setScrollUp(true); // 🔼 Scrolling up -> Show header
            }
            lastScrollTop = currentScrollTop; // Update last scroll position
        };

        feedDiv.addEventListener("scroll", handleScroll);
        return () => {
            feedDiv.removeEventListener("scroll", handleScroll);
        };
    }, []);



    return(
        <div className="flex flex-col flex-grow relative">

            {signingUp ? (
                <SignUpModal 
                buttonColor={buttonColor} backGroundColor={backGroundColor} setCurrentUser={setCurrentUser} currentUser={currentUser} setSigningup={setSigningup}
                />
            ) : loginState ? (
                <LoginModal
                buttonColor={buttonColor} backGroundColor={backGroundColor} setCurrentUser={setCurrentUser} currentUser={currentUser} loginState={loginState} setLoginState={setLoginState}
                />
            ) : (
                null
            )}

            {isPosting && currentUser && forYouFeedContent ? (
                <PostModal buttonColor={buttonColor} backGroundColor={backGroundColor} setForYouFeedContent={setForYouFeedContent} forYouFeedContent={forYouFeedContent} currentUser={currentUser} isPosting={isPosting} setIsPosting={setIsPosting}/>
            ) : (
                null
            )}

            <div className=" md:flex-[1]">
                <TopMainFeed scrollUp={scrollUp} setScrollUp={setScrollUp} backGroundColor={backGroundColor} cachedFollows={cachedFollows} currentUserFollowing={currentUserFollowing} setButtonColor={setButtonColor} setBackGroundColor={setBackGroundColor} buttonColor={buttonColor} cachedMediaPosts={cachedMediaPosts} setCachedMediaPosts={setCachedMediaPosts} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} currentUser={currentUser} mainFeedTab={mainFeedTab} setMainFeedTab={setMainFeedTab} setCurrentUser={setCurrentUser} forYouFeedContent={forYouFeedContent} setForYouFeedContent={setForYouFeedContent}/>
            </div>

            <div className="flex-[3] flex md:mt-0 mt-24 flex-col justify-end h-full w-full border-l  border-r relative border-twitterBorder">
            {forYouFeedContent ? (
                <>
                {forYouFeedContent.map((post) => 
                    <div className="pb-2 border-b-2 border-twitterBorder" style={{ display: mainFeedTab === "FORYOU" ? "block" : "none" }}>
                        <PostTemplate backGroundColor={backGroundColor} buttonColor={buttonColor} bookMarkContent={bookMarkContent} setBookMarkContent={setBookMarkContent} currentUserFollowing={currentUserFollowing} handleNewFollow={handleNewFollow} cachedFollows={cachedFollows} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} postReplies={post.replyList} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} setUserLikedPosts={setUserLikedPosts} likedPostIdsSet={likedPostIdsSet} postReposts={post.repostList} postBookMarks={post.bookMarkList} postLikes={post.likeList} post={post} postCreator={post.creator} postMedia={post.mediaList} currentUser={currentUser} />
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
                        <PostTemplate backGroundColor={backGroundColor} buttonColor={buttonColor} bookMarkContent={bookMarkContent} setBookMarkContent={setBookMarkContent} currentUserFollowing={currentUserFollowing} handleNewFollow={handleNewFollow} cachedFollows={cachedFollows} setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} postReplies={post.replyList} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} setUserLikedPosts={setUserLikedPosts} likedPostIdsSet={likedPostIdsSet} postReposts={post.repostList} postBookMarks={post.bookMarkList} postLikes={post.likeList} post={post} postCreator={post.creator} postMedia={post.mediaList} currentUser={currentUser} />
                    </div>
                )}
            </div>

        <div 
        onClick={changeForYouFeed}
        className={clsx ("hover:cursor-pointer text-twitterBlue h-full w-full flex justify-center items-center text-xl", {
            "text-twitterRed": buttonColor === "twitterRed",
            "text-twitterBlue": buttonColor === "twitterBlue",
            "text-twitterYellow": buttonColor === "twitterYellow",
            "text-twitterPurple": buttonColor === "twitterPurple",
        })}>
            <div className="w-1/3 h-14 mt-4 mb-4 flex justify-center items-center rounded-lg border border-twitterBorder">
                <p className="text-center">Load More Posts</p>
            </div>
        </div>
        {currentUser ? (
        <div onClick={() => navigate("/compose")} className="md:hidden h-14 w-14 bg-twitterBlue bottom-24 right-8 rounded-full z-50 fixed flex justify-center items-center">
            <ImQuill className="text-2xl text-white"/>
        </div>
        ) : (
            <div className="md:hidden h-32 w-full bottom-16 mb-1 border border-twitterBlue z-30 fixed flex justify-around gap-2 items-center backdrop-blur-md bg-opacity-7">
                <div onClick={() => setSigningup(true)} className="rounded-l-full rounded-r-full border border-twitterBlue font-bold text-xl flex items-center py-4 px-10 justify-center"> 
                    <p className="text-white">Sign up</p>
                </div>

                <div onClick={() => setLoginState(true)} className="rounded-l-full rounded-r-full border border-twitterBlue font-bold text-xl flex items-center py-4 px-10 justify-center"> 
                    <p className="text-white">Log in</p>
                </div>
            </div>
        )}
        </div>
    )
}

export default MainFeed;