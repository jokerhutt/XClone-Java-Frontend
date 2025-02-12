import './App.css'
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import PostTemplate from './PostTemplate';
import { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import clsx from 'clsx';

function ZoomedPost ({cachedAddedReplies, buttonColor, backGroundColor, bookMarkContent, setBookMarkContent, setCachedAddedReplies, cachedReposts, setCachedReposts, cachedBookMarks, setCachedBookMarks, setCachedLikedPosts, cachedLikedPosts, currentUser}) {

    const navigate = useNavigate();
    const { postId } = useParams();
    const [fetchedPost, setFetchedPost] = useState(null);
    const [isInZoomedMode, setIsInZoomedMode] = useState(true); 

    const [tempReplies, setTempReplies] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:6790/api/posts/${postId}`)
        .then(response => response.json())
        .then(data => setFetchedPost(data))
        .catch(error => console.error(error));
      }, []);

    useEffect(() => {
        setTempReplies([])
    }, [fetchedPost])

      useEffect(() => {
        console.log("Fetched Post users is " + JSON.stringify(fetchedPost))
      }, fetchedPost)

    return (
        <>
        <div className='flex-col w-full h-full'>
        <div className='h-16 w-full px-4 justify-start sticky top-0 z-20 gap-5 flex border-b border-twitterBorder text-white backdrop-blur-md bg-opacity-7'>
                <div className="w-8 ml-2 h-full flex justify-start text-lg  items-center">
                    <FaArrowLeft onClick={() => navigate(-1)} className={clsx ("hover:drop-shadow-[0_0_15px_#1C9BF0] transition duration-300 hover:cursor-pointer", {
                        "hover:text-twitterRed": buttonColor === "twitterRed",
                        "hover:text-twitterBlue": buttonColor === "twitterBlue",
                        "hover:text-twitterYellow": buttonColor === "twitterYellow",
                        "hover:text-twitterPurple": buttonColor === "twitterPurple",
                    })}/>
                </div>
                <div className="flex items-center justify-start">
                    <h2 className='font-bold'>Post</h2>
                </div>
            </div>
            <div className='flex-[3] flex flex-col-reverse justify-end h-full w-full border-l-2  border-r-2 border-twitterBorder'>
                    {fetchedPost ? (
                <div className="w-full h-fit pb-2 border-b-2 border-twitterBorder">
                    <div className="flex-col w-full h-full">
                        <PostTemplate buttonColor={buttonColor} backGroundColor={backGroundColor} bookMarkContent={bookMarkContent} setBookMarkContent={setBookMarkContent} tempReplies={tempReplies} setTempReplies={setTempReplies} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} isInZoomedMode={isInZoomedMode} postReplies={fetchedPost.replyList} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} postReposts={fetchedPost.repostList} postBookMarks={fetchedPost.bookMarkList} postLikes={fetchedPost.likeList} post={fetchedPost} postCreator={fetchedPost.creator} postMedia={fetchedPost.mediaList} currentUser={currentUser}
                        />
                    </div>
                </div>
                    ) : (
                    <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                        <p>POSTMODALZOOM LOAD...</p>
                    </div>
                    )}
            </div>
            </div>

        </>
    )
}

export default ZoomedPost;