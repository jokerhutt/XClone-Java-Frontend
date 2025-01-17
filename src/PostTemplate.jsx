import "./App.css"

import { useState, useEffect } from "react";
import ReplyingModal from "./ReplyingModal";
import { FaRegComment, FaRegHeart, FaRegChartBar, FaRegBookmark } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ReplyPostTemplate from "./ReplyPostTemplate";




function PostTemplate ({post, posts, currentUser, profileUser, isAReplyParent, replyObject, replyPostUser}) {

    const [postUser, setPostUser] = useState(null);
    const [postLikes, setPostLikes] = useState([]);
    const [postReposts, setPostReposts] = useState([]);
    const [likedByUser, setLikedByUser] = useState(false);
    const [isReplyingToggle, setIsReplyingToggle] = useState(false);
    const [postReplies, setPostReplies] = useState([]);

    useEffect(() => {
        if (post) {
            const postID = post.creatorId
            fetch(`http://localhost:6790/api/users/${postID}`)
            .then(response => response.json())
            .then(data => setPostUser(data))
            .catch(error => console.error(error))
        }
        else (
            alert("Broooo")
        )

    }, [posts, post])

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

    }, [posts, post])

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

    return(
        <>
        {postUser ? (
            <div className="w-full h-full flex-col">
            <div className="w-full h-full flex pl-4 pr-4 pt-3 flex-grow">

            {isReplyingToggle ? (
                <ReplyingModal postUser={postUser} currentUser={currentUser} post={post}/>
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

                <div className="text-white pt-1 pb-2">
                    <p>{post.postText}</p>
                </div>

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
                    <div className="flex items-center gap-2">
                    <FaRegBookmark className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                    </div>
                
                </div>
            </div>
        </div>
        {isAReplyParent ? (
                <div>
                    <ReplyPostTemplate currentUser={currentUser} post={replyObject} postUser={replyPostUser} ogPostUser={postUser}/>
                </div>
            ) : (
                null
            )}
        </div>
        ) : (
            <div>
            <p>Waiting</p>    
            </div>
        )}
</>
    )
}

export default PostTemplate;