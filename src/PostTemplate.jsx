import "./App.css"
import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import ReplyingModal from "./ReplyingModal";
import { FaRetweet } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import clsx from 'clsx';

import MorePost from "./MorePost";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { FaRegComment } from "react-icons/fa6";
import FollowersFollowing from "./FollowersFollowing";
import PostActions from "./PostActions";
import { useNavigate } from 'react-router-dom';
import ReplyTemplate from "./ReplyTemplate";
import LastSeen from "./LastSeen";

import ReplyPostTemplate from "./ReplyPostTemplate";
import ProfileHoverPopover from "./ProfileHoverPopover";




function PostTemplate ({currentUserFollowing, backGroundColor, buttonColor, bookMarkContent, setBookMarkContent, handleNewFollow, cachedFollows, currentUserProfileData, setCurrentUserProfileData, tempReplies, setTempReplies, cachedAddedReplies, setCachedAddedReplies, isInZoomedMode, postReplies, postReposts, cachedReposts, setCachedReposts, cachedBookMarks, setCachedBookMarks, setCachedLikedPosts, cachedLikedPosts, likedPostIdsSet, setUserLikedPosts, postBookMarks, postLikes, replyObject, isAReplyParent, post, postCreator, postMedia, currentUser, disableMedia, profileUser}) {

    const [isReplyingToggle, setIsReplyingToggle] = useState(false);
    const [currentPostReplies, setCurrentPostReplies] = useState(postReplies);
    const [tempPostReplies, setTempPostReplies] = useState()
    const [isMorePost, setIsMorePost] = useState(false);
    const [toggleFollowing, setToggleFollowing] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = () => {
        const postId = post.postId;
        navigate(`/post/${postId}`);
    }

    useEffect(() => {
        if (postReplies) {
            console.log("Replies thing is " + JSON.stringify(cachedAddedReplies))
            console.log("Post Replies thing is " + JSON.stringify(postReplies))
            const checkReplyList = cachedAddedReplies.filter((reply) => reply.postId === post.postId);
    
            //Checks for duplicates by making a filtered array
            const uniqueReplies = [...postReplies, ...checkReplyList].filter(
                (reply, index, self) =>
                    index === self.findIndex((r) => r.id === reply.id)
            );
            
            setCurrentPostReplies(uniqueReplies);
        }
    }, [postReplies, cachedAddedReplies])

    useEffect(() => {
        if (tempReplies) {
            console.log("Temp Replies thing is " + JSON.stringify(tempReplies))
            console.log("Post Replies thing is " + JSON.stringify(postReplies))
            const checkReplyList = tempReplies.filter((reply) => reply.postId === post.postId);
            setTempPostReplies([...postReplies, ...checkReplyList]);
        }
    }, [postReplies, tempReplies])


    

    return(
        <>
        {postCreator ? (
            <div className="w-full h-full flex-col-reverse">
            <div className="w-full h-fit flex pl-4 pr-4 pt-3 flex-grow">

            {isReplyingToggle && postCreator && currentUser ? (
                <ReplyingModal backGroundColor={backGroundColor} buttonColor={buttonColor} tempPostReplies={tempPostReplies} setTempPostReplies={setTempPostReplies} setIsReplyingToggle={setIsReplyingToggle} currentUser={currentUser} post={post} postUser={postCreator} setCachedAddedReplies={setCachedAddedReplies}/>
            ) : (
                null
            )}
            
            {isAReplyParent ? (
                <div className="flex-[1] flex flex-col w-full h-full mr-4 ">
                <Link to={`/${postCreator.id}`}>
                    <div className="relative">
                        <img src={postCreator.profilePic} className="rounded-full"/>
                        <div className="absolute top-0 right-0 z-20 mt-2 w-60 bg-black text-white shadow-md rounded-lg py-2 border border-twitterBorder">
                            <ProfileHoverPopover backGroundColor={backGroundColor} buttonColor={buttonColor} currentUserFollowing={currentUserFollowing} handleNewFollow={handleNewFollow} currentUser={currentUser} cachedFollows={cachedFollows}/>
                        </div>
                    </div>
                </Link>
                <div className="flex items-center justify-center h-full bg-none w-full ml-1">
                    <div className="bg-none border-r border-l border-twitterBorder w-0.5 mr-2 border h-4 max-h-20 mb-2 mt-0">
                    </div> 
                </div>
                </div>
            ) : (
                <div className="flex-[1] flex flex-col w-full h-full mr-4 ">
                    <ProfileHoverPopover backGroundColor={backGroundColor} buttonColor={buttonColor} currentUserFollowing={currentUserFollowing} handleNewFollow={handleNewFollow} toggleFollowing={toggleFollowing} setToggleFollowing={setToggleFollowing} currentUser={currentUser} cachedFollows={cachedFollows} postCreator={postCreator}/>
                </div>
            )}

            <div className="flex flex-col text-white flex-[12]">
                {profileUser && postCreator.id != profileUser.id ? (
                <div className="flex justify-between">
                    <div className="flex gap-2">
                            <p className="font-bold">{postCreator.displayName}</p>
                            <p className="text-twitterBorder">@{postCreator.username}</p>
                    </div>
                    <div className={clsx ("flex items-center gap-2 font-semibold", {
                        "text-twitterRed": buttonColor === "twitterRed",
                        "text-twitterBlue": buttonColor === "twitterBlue",
                        "text-twitterYellow": buttonColor === "twitterYellow",
                        "text-twitterPurple": buttonColor === "twitterPurple",
                    })}>
                        <FaRetweet className="text-lg"/>
                        <p className="hidden md:block"> {profileUser.displayName} Reposted </p>
                    </div>
                </div>
                ) : (
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <p className="font-bold">{postCreator.displayName}</p>
                            <p className="text-twitterBorder">@{postCreator.username} -</p>
                            <LastSeen locale="en-US" date={post.createdAt}/>
                        </div>
                        <div className="relative">
                            <div onClick={() => setIsMorePost(!isMorePost)} className="hover:cursor-pointer rounded-full flex justify-center items-center hover:bg-twitterBlue hover:bg-opacity-40 p-1">
                                <BsThreeDots />
                            </div>
                            {isMorePost ? (
                            <div className="absolute top-0 right-0 z-20 mt-2 w-60 bg-black text-white shadow-md rounded-lg py-2 border border-twitterBorder">
                                <MorePost/>
                            </div>
                            ) : (
                                null
                            )}

                        </div>
                    </div>

                )}

                <div 
                onClick={() => handleNavigation()}
                className="hover:cursor-pointer text-white pt-1 pb-2">
                    <p>{post.postText}</p>
                </div>
                {postMedia && postMedia.length > 0 && !disableMedia ? (
                    <div className={`grid grid-cols-2 md:gap-4 gap-2 my-4`}>
                        {postMedia.map((image, index) => {
                        return (
                        <div key={index} className={`col-span-${postMedia.length === 1 ? "2" : "1"} flex justify-center items-center w-full h-full`}>
                            <img
                                onClick={() => navigate(`/imagepreview/${post.postId}/${image.position}`)}
                                src={image.mediaFile}
                                className={`hover:cursor-pointer w-full h-28 md:h-48 object-cover rounded-lg`}
                            />
                        </div>)})}
                    </div>
                ) : (
                    null
                )}
            </div>
        </div>

            <div className="pl-4 pr-4">
                <PostActions 
                buttonColor={buttonColor}
                bookMarkContent={bookMarkContent} setBookMarkContent={setBookMarkContent}
                setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData}
                isInZoomedMode={isInZoomedMode} tempPostReplies={tempPostReplies}
                currentPostReplies={currentPostReplies}
                cachedAddedReplies={cachedAddedReplies}
                setIsReplyingToggle={setIsReplyingToggle}
                postReposts={postReposts} postReplies={postReplies}
                cachedReposts={cachedReposts} setCachedReposts={setCachedReposts}
                cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks}
                setCachedLikedPosts={setCachedLikedPosts}
                cachedLikedPosts={cachedLikedPosts}
                postLikes={postLikes} postBookMarks={postBookMarks}
                post={post} postCreator={postCreator} currentUser={currentUser}/>
            </div>

        {isAReplyParent && replyObject && postCreator ? (
                <div>
                    <ReplyPostTemplate buttonColor={buttonColor} post={replyObject} ogPostUser={postCreator}/>
                </div>
            ) : isInZoomedMode ? (
                <div className="flex-col w-full h-full mt-4">
                <div className="">
                    <hr/>
                </div>
                {currentPostReplies && currentPostReplies.length > 0 ? (
                <>
                {currentPostReplies.map((reply) => 
                    <div>
                        <ReplyPostTemplate buttonColor={buttonColor} tempPostReplies={tempPostReplies} tempReplies={tempReplies} post={reply} ogPostUser={postCreator} cachedAddedReplies={cachedAddedReplies}/>
                     </div>
                )}
                </>
                ) : (
                    <div className="text-white flex w-full h-20 justify-center items-center text-2xl font-bold">
                        <p>No replies yet...</p>
                    </div>    
                )}

        </div>
        ) :  (
            null
                )}
            </div>) : (
            <div className="flex-col w-full h-full text-white">
                <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                    <p>Loading...</p>
                </div>
            </div>
            )}
</>
    )
}

export default PostTemplate;