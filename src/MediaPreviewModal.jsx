import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import PostTemplate from './PostTemplate';
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";




function MediaPreviewModal ({cachedLikedPosts, bookMarkContent, setBookMarkContent, setCachedLikedPosts, setCachedBookMarks, cachedBookMarks, cachedMediaPosts, cachedAddedReplies, setCachedReposts, setCachedAddedReplies, cachedReposts, currentUser}) {
    const { postId, position } = useParams();
    const navigate = useNavigate();
    const [previewedPost, setPreviewedPost] = useState(null);
    const [previewedPostMedia, setPreviewedPostMedia] = useState(null);
    const [disableMedia, setDisableMedia] = useState(true);



    useEffect(() => {
        const foundPost = cachedMediaPosts[postId]; 
        setPreviewedPost(foundPost);
        setPreviewedPostMedia(foundPost.mediaList)
    }, [])



    return (
        <>
        <div className="fixed inset-0 h-full z-70 w-screen bg-black bg-opacity-50 backdrop-blur-lg backdrop-brightness-75 flex justify-center items-center">

            <div className="flex-[80] h-full w-full flex-col relative">
                <div className='text-white h-10 absolute py-16 px-16 z-65 text-xl'>
                    <p onClick={() => navigate(-1)} className='hover:cursor-pointer'>X</p>
                </div>
                {position && previewedPostMedia && previewedPost ? (
                <div className="w-full h-full flex justify-center items-center px-2">

                        <div className='h-full w-22 flex items-center justify-center px-16 text-white'>
                            <div className='rounded-full hover:bg-twitterBlue hover:cursor-pointer p-1'>
                            {position > 1 ? (
                                    <FaArrowLeft 
                                    onClick={() => navigate(`/imagepreview/${postId}/${parseInt(position) - 1}`, { replace: true })}
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
                                    onClick={() => navigate(`/imagepreview/${postId}/${parseInt(position) + 1}`, { replace: true })}
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
            {previewedPost ? (
            <div className="flex-[25] bg-black h-full w-full pr-6 flex-col">
                <PostTemplate bookMarkContent={bookMarkContent} setBookMarkContent={setBookMarkContent} post={previewedPost} cachedMediaPosts={cachedMediaPosts} currentUser={currentUser} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} disableMedia={disableMedia}
                isInZoomedMode={true}
                postReposts={previewedPost.repostList} postBookMarks={previewedPost.bookMarkList} postLikes={previewedPost.likeList} postCreator={previewedPost.creator} postMedia={previewedPost.mediaList} postReplies={previewedPost.replyList}
                />
            </div> 
            ) : (
                null
            )}
 

            
        </div>
        </>
    )
}

export default MediaPreviewModal;