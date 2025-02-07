import { useState, useEffect } from "react";
import '../../App.css'
import EmojiPicker from 'emoji-picker-react';
import imageCompression from 'browser-image-compression';
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import GifPopover from "../../GifPopover";
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { BsEmojiSmile } from "react-icons/bs";
import GifPicker from 'gif-picker-react';
import { FaGlobeAmericas } from "react-icons/fa";



function NewPost ({cachedMediaPosts, buttonColor, setCachedMediaPosts, setCurrentUserProfileData, currentUserProfileData, currentUser, setIsPosting, setCurrentUser, mobileCompose, isPosting, setForYouFeedContent, forYouFeedContent}) {

    const [postTitle, setPostTitle] = useState("");
    const [postMedia, setPostMedia] = useState([]);
    const [emojiToggle, setEmojiToggle] = useState(false);
    const navigate = useNavigate();

    function addGifToPost (gifUrl) {
        const postMediaArray = [...postMedia];
        postMediaArray.push(gifUrl)
        setPostMedia(postMediaArray);
    }

    useEffect(() => {
        console.log("Is posting is: " + isPosting)
    }, [isPosting])

    useEffect(() => {
        if (currentUser) {
            console.log("Current User is is: " + JSON.stringify(currentUser))
        }
    }, [currentUser])

    const handleImageClick = () => {
        document.getElementById('imageInput').click();
      };

    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
        const compressedImages = [];
      
        for (const file of files) {
          try {
            const options = {
              maxSizeMB: 5,
              useWebWorker: true,
            };
            const compressedFile = await imageCompression(file, options);
      
            const reader = new FileReader();
            reader.onload = () => {
              compressedImages.push(reader.result);
              if (compressedImages.length === files.length) {
                setPostMedia((prevMedia) => [...prevMedia, ...compressedImages]);
              }
            };
            reader.readAsDataURL(compressedFile);
          } catch (error) {
            console.error("Image compression failed:", error.message);
          }
        }
      };

      function handleEmojiAdd(emoji) {
        setPostTitle((prevTitle) => prevTitle + emoji.emoji);
      }

    function handleNewPost (e) {

        e.preventDefault();

        if (postMedia.length < 4) {

            const newPostPayload = {
                postTitle: postTitle,
                userId: currentUser.id,
                postMedia: postMedia,
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
                    const destructuredPost = data;
                    setForYouFeedContent((prevPosts) => [data, ...prevPosts]);
    
                    setCurrentUserProfileData((prev) => {
                        const updatedUserPostsAndReposts = [destructuredPost, ...prev.userPostsAndReposts];
                        const updatedUserPosts = [destructuredPost, ...prev.userPosts];
    
                        return {
                            ...prev,
                            userPostsAndReposts: updatedUserPostsAndReposts,
                            userPosts: updatedUserPosts,
                        };
                    });
    
                    setCachedMediaPosts(prevCache => ({
                        ...prevCache,
                        [destructuredPost.postId]: destructuredPost
                      }));
    
                    if (isPosting) {
                        setIsPosting(false);
                    }
                    if (mobileCompose) {
                        navigate("/")
                    }
    
            })

        } else {
            alert("no more than 4 images")
        }

        
        // .then(() => {
        //     setTimeout(() => {
        //         refreshPosts();
        //     }, 10);
        // })
    }
    
    useEffect(() => {
        console.log("POst media length is " + postMedia.length)
        if (postMedia) {
            console.log("POST MEDIA IS: " + JSON.stringify(postMedia))
        }
    }, [postMedia])

    const handleRemoveImage = (indexToRemove) => {
        setPostMedia((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
      };

    return(
        
        <div className=" w-full h-full pt-1">

            {forYouFeedContent ? (
                            <div className="flex w-full h-auto">

                            {isPosting && currentUser ? (
                            <div className="flex-[1] flex flex-col w-full h-full mr-6 pt-3 z-40">
                                <img src={currentUser.profilePic} className="rounded-full w-12"/>
                            </div>
                            ) : currentUser ? (
                            <div className="flex-[1] flex flex-col w-full h-full mr-4 pt-3 z-40">
                                <img src={currentUser.profilePic} className="rounded-full w-10"/>
                            </div>
                            ) : (
                            <div className="flex-[1] flex flex-col w-full h-full mr-4 pt-3 z-40">
                                <img src="/DEFAULTPFP.png" className="rounded-full w-10"/>
                            </div>
                            )}
            
            
                            <div className="flex-[12] flex flex-col w-full">
                                <textarea 
                                value={postTitle} 
                                placeholder="What is happening?!" 
                                onChange={(e) => {
                                    setPostTitle(e.target.value);
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}

                                className="text-xl md:flex-[5] flex py-3 md:h-6 max-h-40 bg-transparent text-gray-100 border-none focus:outline-none"
                                />

                                {postMedia.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4 my-4">
                                        {postMedia.slice(0, 4).map((image, index) => {
                                            return (
                                                <div key={index} className="col-span-1 relative">
                                                    <img
                                                        src={image}
                                                        className="w-full md:h-48 h-24 object-cover relative rounded-lg"
                                                    />
                                                    <div 
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="absolute top-2 rounded-full border-2 right-4 hover:cursor-pointer hover:bg-twitterHover hover:bg-opacity-40">
                                                        <p className="text-white px-1.5">X</p>
                                                    </div>
                                                </div>
                                            )

                                        })}
                                    </div>
                                ) : (
                                    null
                                )}
            
                                <div className="md:flex-[12] text-white ">

                                <hr className="md:hidden border-twitterBorder"/>
                                
                                    <div className={clsx ("flex gap-2 pt-2 md:pt-0 items-center flex-[1] text-sm hover:drop-shadow-[0_0_15px_#1C9BF0] transition duration-300 hover:cursor-pointer", {
            "text-twitterRed": buttonColor === "twitterRed",
            "text-twitterBlue": buttonColor === "twitterBlue",
            "text-twitterYellow": buttonColor === "twitterYellow",
            "text-twitterPurple": buttonColor === "twitterPurple",
            "hover:text-twitterRed": buttonColor === "twitterRed",
            "hover:text-twitterBlue": buttonColor === "twitterBlue",
            "hover:text-twitterYellow": buttonColor === "twitterYellow",
            "hover:text-twitterPurple": buttonColor === "twitterPurple",
        })}>
                                        <FaGlobeAmericas />
                                        <p className="font-bold ">Everyone can reply</p>
                                    </div>
            
                                    <hr className="mt-3 border-twitterBorder"/>
            
                                    <div className="flex-[3] flex justify-between">
                                        <div className={clsx ("h-1/2 flex gap-4 pt-2 items-center", {
            "text-twitterRed": buttonColor === "twitterRed",
            "text-twitterBlue": buttonColor === "twitterBlue",
            "text-twitterYellow": buttonColor === "twitterYellow",
            "text-twitterPurple": buttonColor === "twitterPurple",
        })}>
                                        <div>
                                            {/* <input
                                                id="imageInput"
                                                type="file"
                                                accept=".png,.jpg,.jpeg"
                                                multiple
                                                onChange={handleImageChange} // Handle file change
                                                style={{ display: 'none' }} // Hide the file input
                                            /> */}
                                            
                                            <input type="file" id="imageInput" accept="image/*" style={{ display: 'none' }} onChange={(event) => handleImageUpload(event)}></input>
                                            <CiImageOn onClick={handleImageClick} className={clsx ("hover:cursor-pointer text-xl hover:drop-shadow-[0_0_15px_#1C9BF0] transition duration-300", {
                                                "hover:text-twitterRed": buttonColor === "twitterRed",
                                                "hover:text-twitterBlue": buttonColor === "twitterBlue",
                                                "hover:text-twitterYellow": buttonColor === "twitterYellow",
                                                "hover:text-twitterPurple": buttonColor === "twitterPurple",
                                            })}/>
                                        </div>
                                            <div className="relative">
                                                <GifPopover buttonColor={buttonColor} addGifToPost={addGifToPost}/>
                                            </div>
                                            
                                            <div className="relative">
                                            <BsEmojiSmile
                                            onClick={() => setEmojiToggle(!emojiToggle)}
                                            
                                            className={clsx ("text-l hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer", {
                                                "hover:text-twitterRed": buttonColor === "twitterRed",
                                                "hover:text-twitterBlue": buttonColor === "twitterBlue",
                                                "hover:text-twitterYellow": buttonColor === "twitterYellow",
                                                "hover:text-twitterPurple": buttonColor === "twitterPurple",
                                            })}/>
                                            <div className="absolute z-40 translate-y-5">
                                                <EmojiPicker open={emojiToggle} onEmojiClick={handleEmojiAdd} theme={"dark"} height={340} width={280}/>
                                            </div>
                                            </div>
                                        </div>
                                        <div className='h-full w-full text-black flex-[3] flex justify-end items-center py-4'>
                                            {currentUser && postTitle.length > 0 || postMedia.length > 0? (
                                                <div className='hover:cursor-pointer h-full w-1/2 md:w-1/4 bg-white flex justify-center items-center py-1 rounded-l-full rounded-r-full hover:bg-gray-200'
                                                onClick={(e) => handleNewPost(e)}
                                                >
                                                    <p className="font-bold">Post</p>
                                                </div>
                                            ) : currentUser ? (
                                                <div className='h-full w-1/2 md:w-1/4 bg-gray-400 flex justify-center items-center py-1 rounded-l-full rounded-r-full'
                                                onClick={(e) => handleNewPost(e)}
                                                >
                                                    <p className="font-bold">Post</p>
                                                </div>
                                            )  : (
                                                <div className='hover:cursor-not-allowed h-fullw-1/2 md:w-1/4 bg-white flex justify-center items-center py-1 rounded-l-full rounded-r-full hover:bg-gray-200'
                                                >
                                                    <p className="font-bold">Post</p>
                                                </div>
                                            )}

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