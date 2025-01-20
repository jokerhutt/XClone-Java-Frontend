import "./App.css"

import { useState, useEffect } from "react";
import ReplyingModal from "./ReplyingModal";
import { FaRegComment, FaRegHeart, FaRegChartBar, FaRegBookmark } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ReplyTemplate from "./ReplyTemplate";

import ReplyPostTemplate from "./ReplyPostTemplate";




function PostTemplate ({post, currentUser, profileUser, isAReplyParent, replyObject, isInZoomedMode, disableMedia}) {

    const [postUser, setPostUser] = useState(null);
    const [postLikes, setPostLikes] = useState([]);
    const [currentPostMedia, setCurrentPostMedia] = useState([]);
    const [postReposts, setPostReposts] = useState([]);
    const [likedByUser, setLikedByUser] = useState(false);
    const [userBookMarked, setUserBookMarked] = useState([]);
    const [bookMarkedByUser, setBookMarkedByUser] = useState(false);
    const [isReplyingToggle, setIsReplyingToggle] = useState(false);
    const [postBookMarks, setPostBookMarks] = useState([]);
    const [postReplies, setPostReplies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
          const profileUserId = currentUser.id;
          fetch(`http://localhost:6790/api/grabuserbookmarked/${profileUserId}`)
          .then(response => response.json())
          .then(data => setUserBookMarked([...data]))
          .then(console.log("users bookmarked is " + userBookMarked))
          .catch(error => console.error(error));
        }
      }, []);

    useEffect(() => {
        if (post) {
            const postID = post.creatorId
            fetch(`http://localhost:6790/api/users/${postID}`)
            .then(response => response.json())
            .then(data => setPostUser(data))
            .catch(error => console.error(error))
        }
        else (
            console.log("error")
        )
    }, [post])

    const handleNavigation = () => {
        const postId = post.postId;
        navigate(`/post/${postId}`);
    }

    useEffect(() => {
        if (post) {
            const postID = post.postId
            fetch(`http://localhost:6790/api/replies/${postID}`)
            .then(response => response.json())
            .then(data => setPostReplies([...data]))
            .catch(error => console.error(error))
        }
        else (
            console.log("Epic fail")
        )

    }, [post])

    function grabPostMedia () {
        if (!disableMedia) {
            const postID = post.postId
            fetch(`http://localhost:6790/api/grabpostmedia/${postID}`)
            .then(response => response.json())
            .then(data => {
                console.log("Received data from grabbed post media is: " + JSON.stringify(data) + data)
                setCurrentPostMedia([...data])
            })
            .catch(error => console.error(error))
        }
    }

    useEffect(() => {
        grabPostMedia();
    }, [post])

    useEffect(() => {
        if (post) {
            const postID = post.postId
            fetch(`http://localhost:6790/api/grabpostbookmarks/${postID}`)
            .then(response => response.json())
            .then(data => setPostBookMarks([...data]))
            .catch(error => {
                console.error('Error fetching bookmarks:', error);
                setPostBookMarks([]);
            });
        }
    }, [post])

    useEffect(() => {
        console.log("Post Replies is: " + JSON.stringify(postReplies))
    }, [postReplies])

    useEffect(() => { 
        if (post) {
            const postID = post.postId;
            fetch(`http://localhost:6790/api/postlikes/${postID}`)
            .then(response => response.json())
            .then(data => setPostLikes([...data]))
            .catch(error => {
                console.error('Error fetching likes:', error);
                setPostLikes([]);
            });
        }
    }, [post])

    useEffect(() => {
        if (postLikes && currentUser) {
            const likedByUser = postLikes.find(like => like.likerId === currentUser.id);
            if (likedByUser){
                setLikedByUser(true);
            } else {
                setLikedByUser(false);
            }
        }

    }, [postLikes, currentUser]);


    useEffect(() => {
        if (userBookMarked && currentUser) {
            const isbookmarked = userBookMarked.find(bookmark => bookmark.userId === currentUser.id);
            if (isbookmarked){
                setBookMarkedByUser(true);
            } else {
                setBookMarkedByUser(false);
            }
        }
    }, [userBookMarked, currentUser]);

    useEffect(() => { 
        if (post) {
            const postID = post.postId;
            fetch(`http://localhost:6790/api/postreposts/${postID}`)
            .then(response => response.json())
            .then(data => setPostReposts([...data]))
            .catch(error => {
                console.error('Error fetching reposts:', error);
                setPostReposts([]);
            });
        }
    }, [post])

    useEffect(() => {
        console.log("Post user template user is + " + JSON.stringify(postUser))
    }, [postUser])

    useEffect(() => {
        console.log("Post user template likes is: " + JSON.stringify(postLikes))
    }, [postLikes])

    useEffect(() => {
        console.log("Post user template reposts is: " + JSON.stringify(postLikes))
    }, [postReposts])

    function handleNewLike () {
        const likeInformation = {
            postId: post.postId,
            likerId: currentUser.id,
            notificationType: "LIKE",
            notificationObject: post.postId, //TODO
            receiverId: post.creatorId,
            senderId: currentUser.id 
        };

        const decryptedPayload = JSON.stringify(likeInformation)

        console.log("Super Secret Like Information is being sent..." + decryptedPayload)

        fetch('http://localhost:6790/api/newlike', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(likeInformation),
          })
          .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to sign up');
            }
        })
        .then((data) => {
              alert('Like added successfully!');
              console.log("Response is " + JSON.stringify(data));
              setPostLikes([...data]);  
              console.log(data);
        })
    }

    function handleNewBookMark () {
            const bookMarkInformation = {
                userId: currentUser.id,
                postId: post.postId
            };

            fetch('http://localhost:6790/api/newbookmark', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookMarkInformation),
              })
              .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to add bookmark');
                }
            })
            .then((data) => {
                  alert('Bookmark added successfully!');
                  console.log("Response Bookmarked is is " + JSON.stringify(data));
                  setUserBookMarked([...data]);  
                  console.log(data);
            });
    

    }

    function handleNewRepost () {
        const repostInformation = {
            postId: post.postId,
            reposterId: currentUser.id,
            notificationType: "REPOST",
            notificationObject: post.postId,
            receiverId: post.creatorId,
            senderId: currentUser.id 
        };
        const decryptedPayload = JSON.stringify(repostInformation)
        console.log("Super Secret Repost Information is being sent..." + decryptedPayload)

        fetch('http://localhost:6790/api/newrepost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(repostInformation),
          })
          .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to sign up');
            }
        })
        .then((data) => {
              alert('Repost added successfully!');
              console.log("Response is " + JSON.stringify(data));
              setPostReposts([...data]);  
              console.log(data);
        });

    }

    useEffect(() => {
        console.log(isReplyingToggle)
    }, [isReplyingToggle])

    useEffect(() => {
            console.log("THIS POSTS MEDIA IS: " + JSON.stringify(currentPostMedia))
    }, [currentPostMedia])

    return(
        <>
        {postUser ? (
            <div className="w-full h-full flex-col-reverse">
            <div className="w-full h-fit flex pl-4 pr-4 pt-3 flex-grow">

            {isReplyingToggle ? (
                <ReplyingModal setIsReplyingToggle={setIsReplyingToggle(false)} postUser={postUser} currentUser={currentUser} post={post}/>
            ) : (
                null
            )}
            
            {isAReplyParent ? (
                <div className="flex-[1] flex flex-col w-full h-full mr-4 ">
                <Link to={`/${post.creatorId}`}>
                    <img src={postUser.profilePic} className="rounded-full"/>
                </Link>
                <div className="flex items-center justify-center h-full bg-none w-full ml-1">
                    <div className="bg-none border-r-0.5 border-l-0.5 border-twitterBorder w-0.5 mr-2 border h-4 max-h-20 mb-2 mt-0">
                    </div> 
                </div>
                </div>
            ) : (
                <Link to={`/${post.creatorId}`} className="flex-[1] flex flex-col w-full h-full mr-4 ">
                    <img src={postUser.profilePic} className="rounded-full"/>
                </Link>
            )}

            <div className="flex flex-col text-white flex-[12]">
                {profileUser && post.creatorId != profileUser.id ? (
                <div className="flex justify-between">
                    <div className="flex gap-2">
                            <p className="font-bold">{postUser.displayName}</p>
                            <p className="text-twitterBorder">@{postUser.username}</p>
                    </div>
                    <div className="flex items-center gap-2 text-twitterBlue font-semibold">
                        <FaRetweet className="text-lg"/>
                        <p> {profileUser.displayName} Reposted </p>
                    </div>
                </div>
                ) : (
                    <div className="flex gap-2">
                        <p className="font-bold">{postUser.displayName}</p>
                        <p className="text-twitterBorder">@{postUser.username}</p>
                    </div>
                )}

                <div 
                onClick={() => handleNavigation()}
                className="hover:cursor-pointer text-white pt-1 pb-2">
                    <p>{post.postText}</p>
                </div>

                {currentPostMedia && currentPostMedia.length > 0 && !disableMedia ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                        {currentPostMedia.map((image, index) => {
                            return (
                                <div key={index} className="col-span-1">
                                    <img
                                        onClick={() => navigate(`/imagepreview/${post.postId}/${image.position}`)}
                                        src={image.mediaFile}
                                        className="hover:cursor-pointer w-full h-48 object-cover rounded-lg "
                                    />
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    null
                )}

                <div className="flex-[1] max-h-5 py-2 text-gray-300 flex justify-between pb-2">
                    {postReplies ? (
                        <div className="flex items-center gap-2">
                        <FaRegComment onClick={() => setIsReplyingToggle(true)} className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{postReplies.length}</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                        <FaRegComment onClick={() => setIsReplyingToggle(true)} className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                    <FaRetweet 
                    onClick={() => handleNewRepost()}
                    className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{postReposts.length}</p>
                    </div>
                    {likedByUser ? (
                        <div className="flex items-center gap-2">
                        <FaRegHeart 
                        onClick={() => handleNewLike()}
                        className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-gray-300 text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{postLikes.length}</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                        <FaRegHeart 
                        onClick={() => handleNewLike()}
                        className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{postLikes.length}</p>
                        </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                    <FaRegChartBar className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                    </div>
                    {bookMarkedByUser && postBookMarks ? (
                        <div className="flex items-center gap-2">
                        <FaRegBookmark 
                        onClick={() => {handleNewBookMark()}}
                        className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-gray-300 text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{postBookMarks.length}</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                        <FaRegBookmark 
                        onClick={() => {handleNewBookMark()}}
                        className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{postBookMarks.length}</p>
                        </div>
                    )}

                
                </div>
            </div>
        </div>
        {isAReplyParent && replyObject && postUser ? (
                <div>
                    <ReplyPostTemplate post={replyObject} ogPostUser={postUser}/>
                </div>
            ) : isInZoomedMode && postUser && postReplies ?(
                <div className="flex-col w-full h-full mt-4">
                <div className="">
                    <hr/>
                </div>
                {postReplies.map((reply) => 
                <div>
                <ReplyPostTemplate post={reply} ogPostUser={postUser}/>
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