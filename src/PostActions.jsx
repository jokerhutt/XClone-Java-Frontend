import { useState, useEffect } from "react";
import { FaRegComment, FaRegHeart, FaRegChartBar, FaRegBookmark, FaRetweet } from "react-icons/fa";

function PostActions ({setCurrentUserProfileData, bookMarkContent, setBookMarkContent, tempPostReplies, isInZoomedMode, currentPostReplies, setIsReplyingToggle, postReposts, cachedReposts, setCachedReposts, cachedBookMarks, setCachedBookMarks, setCachedLikedPosts, cachedLikedPosts, postLikes, post, currentUser, postReplies, postCreator, postBookMarks}) {

    //FLAG VARIABLES FOR INTERACTIONS
    const [isBookMarked, setIsBookMarked] = useState(false);
    const [isReposted, setIsReposted] = useState(false);
    const [isLiked, setIsLiked] = useState(false);


    const [likesLength, setLikesLength] = useState(0);
    const [bookMarksLength, setBookMarksLength] = useState(0);
    const [repostsLength, setRepostsLength] = useState(0);

    function handleLikeUpdate () {
        if (postLikes && cachedLikedPosts) {

            if (currentUser) {
                const userLikedArray = cachedLikedPosts[post.postId] || [];
                const isPostLikedByUser = postLikes.some((like) => like.likerId === currentUser.id)
          
                if (isPostLikedByUser && userLikedArray && userLikedArray.length != 0) {
                    setIsLiked(true);
                    setLikesLength(postLikes.length);
                } else if (userLikedArray && userLikedArray.length != 0 && !isPostLikedByUser) {
                    setIsLiked(true);
                    setLikesLength(postLikes.length + 1);
                } else if (isPostLikedByUser && userLikedArray.length <= 0) {
                    setIsLiked(false)
                    setLikesLength(postLikes.length - 1)
                } else {
                    setIsLiked(false);
                    setLikesLength(postLikes.length);
                }
            } else {
                setIsLiked(false);
                setLikesLength(postLikes.length);
            }
        }
    }

    function handleBookMarkUpdate () {
        if (postBookMarks && cachedBookMarks) {

            if (currentUser) {
                const userBookMarkedArray = cachedBookMarks[post.postId] || [];
                const isPostBookMarkedByUser = postBookMarks.some((bookmark) => bookmark.userId === currentUser.id)

                if (isPostBookMarkedByUser && userBookMarkedArray && userBookMarkedArray.length != 0) {
                    setIsBookMarked(true);
                    setBookMarksLength(postBookMarks.length);
                } else if (userBookMarkedArray && userBookMarkedArray.length != 0 && !isPostBookMarkedByUser) {
                    setIsBookMarked(true);
                    setBookMarksLength(postBookMarks.length + 1);
                } else if (isPostBookMarkedByUser && userBookMarkedArray.length <= 0) {
                    setIsBookMarked(false)
                    setBookMarksLength(postBookMarks.length - 1)
                } else {
                    setIsBookMarked(false);
                    setBookMarksLength(postBookMarks.length);
                }

            } else {
                setIsBookMarked(false);
                setBookMarksLength(postBookMarks.length);
            }
        }
    }

    function handleRepostUpdate () {
        if (postReposts && cachedReposts) {

            if (currentUser) {
                const userRepostsArray = cachedReposts[post.postId] || [];
                const isPostRepostedByUser = postReposts.some((repost) => repost.reposterId === currentUser.id)

                if (isPostRepostedByUser && userRepostsArray && userRepostsArray.length != 0) {
                    setIsReposted(true);
                    setRepostsLength(postReposts.length);
                } else if (userRepostsArray && userRepostsArray.length != 0 && !isPostRepostedByUser) {
                    setIsReposted(true);
                    setRepostsLength(postReposts.length + 1);
                } else if (isPostRepostedByUser && userRepostsArray.length <= 0) {
                    setIsReposted(false)
                    setRepostsLength(postReposts.length - 1)
                } else {
                    setIsReposted(false);
                    setRepostsLength(postReposts.length);
                }

            } else {
                setIsReposted(false);
                setRepostsLength(postReposts.length);
            }
        }
    }


    useEffect(() => {
        handleLikeUpdate();
    }, [cachedLikedPosts, postLikes, post.postId]); 

    
    useEffect(() => {
        handleBookMarkUpdate();
    }, [cachedBookMarks, postBookMarks, post.postId]); 

    useEffect(() => {
        handleRepostUpdate();
    }, [cachedReposts, postReposts, post.postId]);

    useEffect(() => {

        if (post.postId === 8) {
            console.log("Cached is " + JSON.stringify(cachedLikedPosts))
            console.log("POSTLIKES is " + JSON.stringify(postLikes))
        }


    }, [cachedLikedPosts, postLikes])


    function handleLike() {

        const likeInformation = {
            postId: post.postId,
            likerId: currentUser.id,
            notificationType: "LIKE",
            notificationObject: post.postId, //TODO
            receiverId: postCreator.id,
            senderId: currentUser.id 
        };

        fetch('http://localhost:6790/api/newlike', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(likeInformation),
          })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to Add or Remove Like');
            }
        })
        .then((data) => {
            if (data.postId === post.postId) {
                setCachedLikedPosts((prev) => ({
                    ...prev,
                    [post.postId]: data,
                }));
                setCurrentUserProfileData((prev) => ({
                    ...prev,
                    userLiked: [...prev.userLiked, post],
                }));
                alert('Like added');
            }
            else {
                setCachedLikedPosts((prev) => {
                    const updatedCache = { ...prev };
                    delete updatedCache[post.postId];
                    return updatedCache;
                });
                setCurrentUserProfileData((prev) => ({
                    ...prev,
                    userLiked: prev.userLiked.filter((likedPost) => likedPost.postId !== post.postId),
                }));

                alert('Like Removed');
                }
            
        })
        .then(handleLikeUpdate());
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
                if (data.postId === post.postId) {
                    setCachedBookMarks((prev) => ({
                        ...prev,
                        [post.postId]: data,
                    }));
                    setIsBookMarked(true);

                    filterBookMarkContent(true)
                    alert('BookMark added successfully!');
                }
                else {
                    setCachedBookMarks((prev) => {
                        const updatedCache = { ...prev };
                        delete updatedCache[post.postId];
                        return updatedCache;
                    });
                    setIsBookMarked(false);
                    filterBookMarkContent(false);
                    
                    alert('Bookmark Removed successfully!');
                    }

            })
            .then(handleBookMarkUpdate())
    }

    function filterBookMarkContent (booleanValue) {
        if (booleanValue === true) {
            setBookMarkContent((prev) => ([...prev, post]))
        } else if (booleanValue === false) {
            const filteredBookMarkContent = bookMarkContent.filter((bookMarkedPost) => bookMarkedPost.postId !== post.postId)
            setBookMarkContent(filteredBookMarkContent);
        }
    }

    function handleNewRepost () {
        const repostInformation = {
            postId: post.postId,
            reposterId: currentUser.id,
            notificationType: "REPOST",
            notificationObject: post.postId,
            receiverId: postCreator.id,
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
                throw new Error('Failed to do shit up');
            }
        })
        .then((data) => {
            if (data.postId === post.postId) {
                setCachedReposts((prev) => ({
                    ...prev,
                    [post.postId]: data,
                }));
                setCurrentUserProfileData((prev) => ({
                    ...prev,
                    userPostsAndReposts: [...prev.userPostsAndReposts, post],
                }));
                alert('Repost added successfully!');
            }
            else {
                setCachedReposts((prev) => {
                    const updatedCache = { ...prev };
                    delete updatedCache[post.postId];
                    return updatedCache;
                });
                setCurrentUserProfileData((prev) => ({
                    ...prev,
                    userPostsAndReposts: prev.userPostsAndReposts.filter((repost) => repost.postId !== post.postId),
                }));
                alert('Like Removed successfully!');
                }
        })
        .then(handleRepostUpdate());
    }




    return (
        <div>
                            <div className="flex-[1] max-h-5 py-2 text-gray-300 flex justify-between pb-2">
                    
                    
                    
                    {tempPostReplies && isInZoomedMode ? (
                        <div className="flex items-center gap-2">
                        <FaRegComment onClick={() => setIsReplyingToggle(true)} className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{tempPostReplies.length}</p>
                        </div>
                    ) : postReplies ? (
                        <div className="flex items-center gap-2">
                        <FaRegComment onClick={() => setIsReplyingToggle(true)} className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{currentPostReplies.length}</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                        <FaRegComment onClick={() => setIsReplyingToggle(true)} className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                        </div>
                    )}

                    {isReposted && repostsLength && postReposts ? (
                        <div className="flex items-center gap-2">
                            <FaRetweet 
                            onClick={() => handleNewRepost()}
                            className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-gray-300 text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{repostsLength}</p>
                        </div>
                    ) : !isReposted && repostsLength && postReposts ? (
                        <div className="flex items-center gap-2">
                            <FaRetweet 
                            onClick={() => handleNewRepost()}
                            className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{repostsLength}</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <FaRetweet 
                            onClick={() => handleNewRepost()}
                            className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                        </div>  
                    )}

                    {isLiked && likesLength && postLikes ? (
                        <div className="flex items-center gap-2">
                        <FaRegHeart 
                        onClick={() => handleLike()}
                        className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-gray-300 text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                         <p className="text-white text-sm">{likesLength}</p>
                        </div>
                    ) : !isLiked && postLikes && likesLength ? (
                        <div className="flex items-center gap-2">
                        <FaRegHeart 
                        onClick={() => handleLike()}
                        className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{likesLength}</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                        <FaRegHeart 
                        onClick={() => handleLike()}
                        className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                        </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                    <FaRegChartBar className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                    </div>
                    {postBookMarks && isBookMarked && bookMarksLength ? (
                        <div className="flex items-center gap-2">
                        <FaRegBookmark 
                        onClick={() => {handleNewBookMark()}}
                        className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-gray-300 text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{bookMarksLength}</p>
                        </div>
                    ) : !isBookMarked && postBookMarks && bookMarksLength ? (
                        <div className="flex items-center gap-2">
                        <FaRegBookmark 
                        onClick={() => {handleNewBookMark()}}
                        className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">{bookMarksLength}</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                        <FaRegBookmark 
                        onClick={() => {handleNewBookMark()}}
                        className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/> <p className="text-white text-sm">0</p>
                        </div>
                    )}

                
                </div>

        </div>
    )

}

export default PostActions;