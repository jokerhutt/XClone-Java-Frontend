import './App.css'
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import PostTemplate from './PostTemplate';
import { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";

function ZoomedPost ({currentUser}) {

    const navigate = useNavigate();
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [isInZoomedMode, setIsInZoomedMode] = useState(true); 


    useEffect(() => {
        if (postId) {
            fetch(`http://localhost:6790/api/posts/${postId}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error(error))
        }
    }, [postId, currentUser])

    useEffect(() => {
        console.log("Post id is: " + postId)
        console.log("POST IS: " + JSON.stringify(post))
    }, [post, postId])

    return (
        <>
        <div className='flex-col w-full h-full'>
            <div className='h-14 w-full border-l-2 px-4 justify-start gap-5 flex border-r-2 border-b-2 border-twitterBorder text-white'>
                <div className="w-8 ml-2 h-full flex justify-start text-lg items-center">
                    <FaArrowLeft onClick={() => navigate(-1)} className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                </div>
                <div className="flex items-center justify-start">
                    <h2 className='font-bold'>Post</h2>
                </div>
            </div>
            <div className='flex-[3] flex flex-col-reverse justify-end h-full w-full border-l-2  border-r-2 border-twitterBorder'>
                    {post && currentUser ? (
                <div className="w-full h-fit pb-2 border-b-2 border-twitterBorder">
                    <div className="flex-col w-full h-full">
                        <PostTemplate post={post} currentUser={currentUser} isInZoomedMode={isInZoomedMode}/>
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