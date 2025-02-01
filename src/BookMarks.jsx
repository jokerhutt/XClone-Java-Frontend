import { useState, useEffect } from 'react';
import './App.css'
import { useParams } from "react-router"
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import PostTemplate from './PostTemplate';

function BookMarks ({cachedAddedReplies, setCachedAddedReplies, cachedReposts, setCachedReposts, setCurrentUserProfileData, currentUserProfileData, cachedBookMarks, setCachedBookMarks, setCachedLikedPosts, cachedLikedPosts, currentUser}) {

    const navigate = useNavigate();
    const [userBookMarkedPosts, setUserBookMarkedPosts] = useState([])

    useEffect(() => {
        if (currentUser) {
            const profileUserId = currentUser.id
            console.log("user ID is " + profileUserId)
            fetch(`http://localhost:6790/api/grabuserbookmarkedposts/${profileUserId}`)
            .then(response => response.json())
            .then((data) => setUserBookMarkedPosts(data))
            .catch(error => console.error(error));
        }
    }, [currentUser]);

    return (
            <div className="flex-[320] text-white flex flex-col-reverse justify-end h-full w-full border-l border-r border-twitterBorder">
                {userBookMarkedPosts && userBookMarkedPosts.length > 0 ? (
                    <>
                    {userBookMarkedPosts.map((post) => 
                        <div className="w-full h-fit pb-2 border-b-2 border-twitterBorder">
                            <PostTemplate setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} postReplies={post.replyList} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} postReposts={post.repostList} postBookMarks={post.bookMarkList} postLikes={post.likeList} post={post} postCreator={post.creator} postMedia={post.mediaList} currentUser={currentUser}/>
                        </div>
                    )}
                    </>
                ) : userBookMarkedPosts ? (
                    <>
                    <div className='flex flex-col w-full h-full py-10 gap-4 items-center'>
                        <img className='w-2/3' src="/no-bookmarks.png"/>
                        <h1 className='text-2xl text-center text-gray-200 font-bold'>Save Tweets for later</h1>
                        <div className='w-2/3'>
                        <p className='text-center text-twitterBorder'>Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</p>
                        </div>
                    </div>
                    </>
                ) : (
                <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                    <p>Loading...</p>
                </div>
                )}
            <div className='h-14 w-full px-4 justify-start gap-5 flex border-b border-twitterBorder text-white'>
                <div className="w-8 ml-2 h-full flex justify-start text-lg items-center">
                    <FaArrowLeft onClick={() => navigate(-1)} className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                </div>
                <div className="flex items-center justify-start">
                    <h2 className='font-bold'>All Bookmarks</h2>
                </div>
            </div>

            </div>

    )
}

export default BookMarks;