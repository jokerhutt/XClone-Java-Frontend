import { useState, useEffect } from "react";
import '../../App.css'
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";



function NewPost ({currentUser, setCurrentUser, setPosts, isPosting}) {

    const [postTitle, setPostTitle] = useState("");
    const [postMedia, setPostMedia] = useState("");

    useEffect(() => {
        console.log("Is posting is: " + isPosting)
    }, [isPosting])

    useEffect(() => {
        if (currentUser) {
            console.log("Current User is is: " + JSON.stringify(currentUser))
        }
    }, [currentUser])

    function handleNewPost (e) {

        e.preventDefault();

        const newPostPayload = {
            postTitle: postTitle,
            userId: currentUser.id,
        };

        fetch('http://localhost:6790/api/newpost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPostPayload),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to upload post');
            }
        })
        .then((data) => {
                alert('Post Upload successful!');
                setPosts(prevPosts => [data, ...prevPosts]);
        });
    }

    return(
        
        <div className=" w-full h-full pt-1 z-50">

            {setPosts ? (
                            <div className="flex flex-row flex-grow  w-full h-full">

                            {isPosting && currentUser ? (
                            <div className="flex-[1] flex flex-col w-full h-full mr-6 pt-3 z-65">
                                <img src={currentUser.profilePic} className="rounded-full w-12"/>
                            </div>
                            ) : currentUser ? (
                            <div className="flex-[1] flex flex-col w-full h-full mr-4 pt-3 z-65">
                                <img src={currentUser.profilePic} className="rounded-full w-10"/>
                            </div>
                            ) : (
                            <div className="flex-[1] flex flex-col w-full h-full mr-4 pt-3 z-65">
                                <img src="/DEFAULTPFP.png" className="rounded-full w-10"/>
                            </div>
                            )}
            
            
                            <div className="flex-[12] flex flex-col w-full">
                                <input placeholder="What is happening?!" onChange={(e) => setPostTitle(e.target.value)} className="text-xl flex-[5] flex py-3 h-6 bg-transparent text-gray-100 border-none focus:outline-none"/>
            
                                <div className="flex-[12] text-white ">
            
                                    <div className=" flex gap-2 items-center flex-[1] text-sm text-twitterBlue hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer">
                                        <FaGlobeAmericas />
                                        <p className="font-bold ">Everyone can reply</p>
                                    </div>
            
                                    <hr className="mt-3 border-twitterBorder"/>
            
                                    <div className="flex-[3] flex justify-between">
                                        <div className="h-1/2 flex gap-4 pt-2 text-twitterBlue items-center">
                                            <CiImageOn className="text-xl hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                                            <MdOutlineGifBox className="text-xl hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                                            <BsEmojiSmile className="text-l hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                                        </div>
                                        <div className='h-full w-full text-black flex-[3] flex justify-end items-center py-4'>
                                            <div className='h-full w-1/4 bg-white flex justify-center items-center py-1 rounded-l-full rounded-r-full hover:bg-gray-200'
                                            onClick={(e) => handleNewPost(e)}
                                            >
                                                <p>Post</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
                        </div>
            ) : (
                <div>
                </div>
            )}



        </div>
    )
}

export default NewPost;