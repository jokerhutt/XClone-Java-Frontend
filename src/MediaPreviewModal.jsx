import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import PostTemplate from './PostTemplate';
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";




function MediaPreviewModal ({currentUser}) {
    const { postId, position } = useParams();
    const navigate = useNavigate();
    const [previewedPost, setPreviewedPost] = useState(null);
    const [previewedPostMedia, setPreviewedPostMedia] = useState(null);
    const [currentlyPreviewingIndex, setCurrentlyPreviewingIndex] = useState(null);
    const [disableMedia, setDisableMedia] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:6790/api/posts/${postId}`)
        .then(response => response.json())
        .then((data) => setPreviewedPost(data))
        .then(console.log("PREVIEWCHECK1"))
        .catch(error => console.error(error));
    }, [postId, position])

    useEffect(() => {
        const postID = postId
        fetch(`http://localhost:6790/api/grabpostmedia/${postID}`)
        .then(response => response.json())
        .then(data => {
            console.log("Received data from grabbed post media is: " + JSON.stringify(data) + data)
            setPreviewedPostMedia([...data])
        })
        .catch(error => console.error(error))
    }, [postId, position])

    return (
        <>
        <div className="fixed inset-0 h-full z-70 w-screen bg-black bg-opacity-50 backdrop-blur-lg backdrop-brightness-75 flex justify-center items-center">

            <div className="flex-[80] h-full w-full ">
                {position && previewedPostMedia && previewedPost ? (
                <div className="w-full h-full flex justify-center items-center px-2">

                        <div className='h-full w-22 flex items-center justify-center px-16 text-white'>
                            <div className='rounded-full hover:bg-twitterBlue hover:cursor-pointer p-1'>
                            {position > 1 ? (
                                    <FaArrowLeft 
                                    onClick={() => navigate(`/imagepreview/${postId}/${parseInt(position) - 1}`)}
                                    className='text-xl text-white'/>
                                ) : (
                                    null
                                )}
                            </div>
                        </div>

                    <div className='w-full h-full flex justify-center items-center py-16'>
                        <img className='w-auto  h-auto' src={previewedPostMedia[position - 1].mediaFile} />
                    </div>

                        <div className='h-full w-22 flex items-center justify-center px-16 text-white'>
                            <div className='rounded-full hover:bg-twitterBlue hover:cursor-pointer p-1'>
                                {position < previewedPostMedia.length ? (
                                    <FaArrowRight 
                                    onClick={() => navigate(`/imagepreview/${postId}/${parseInt(position) + 1}`)}
                                    className='text-xl text-white'/>
                                ) : (
                                    null
                                )}

                            </div>
                        </div>

                </div>
                ) : (
                    <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                        <p>Loading Image...</p>
                    </div>
                )}

            </div>

            <div className="flex-[25] bg-black h-full w-full pr-6 flex-col">
                <PostTemplate post={previewedPost} currentUser={currentUser} disableMedia={disableMedia}/>
            </div>  

            
        </div>
        </>
    )
}

export default MediaPreviewModal;