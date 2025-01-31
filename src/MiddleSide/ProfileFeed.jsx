import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { IoIosCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { Link } from "react-router-dom";
import ProfileFeedFollow from "./ProfileFeedFollow";
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import ProfileFeedTabState from "./HomeFeed/ProfileFeedTabState";
import ReplyTemplate from "../ReplyTemplate";
import { CiMail } from "react-icons/ci";
import '../App.css'
import { startTransition } from "react";
import PostTemplate from "../PostTemplate";

function ProfileFeed ({setCurrentUserProfileData, currentUserProfileData, cachedMediaPosts, cachedAddedReplies, setCachedAddedReplies, cachedReposts, setCachedReposts, cachedBookMarks, cachedProfiles, setCachedProfiles, handleNewFollow, posts, currentUser, setCurrentUser, setCachedBookMarks, setPosts, setCachedLikedPosts, cachedLikedPosts, userFollowers, userFollowing}) {

    const {profileUserId} = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [profileUserData, setProfileUserData] = useState(null);
    const [userLikedPosts, setUserLikedPosts] = useState(null);
    const [tabState, setTabState] = useState("posts");

    const [postMediaArray, setPostMediaArray] = useState([]);
    
    const [profileUserFollowers, setProfileUserFollowers] = useState([]);
    const [profileUserFollowing, setProfileUserFollowing] = useState([]);
    const [isAReplyParent, setIsAReplyParent] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (profileUserId) {
            if (currentUser && currentUserProfileData && profileUserId == currentUser.id) {
                console.log("Using cached data for current user", currentUser.id);
                setProfileUserData(currentUserProfileData);
                return
            }
        
            if (cachedProfiles[profileUserId]) {
                setProfileUserData(cachedProfiles[profileUserId]);
                return;
            }

            fetchUserProfileData();

            console.log("Fetching fresh data for user", profileUserId);
        

        }

}, [profileUserId]);

    useEffect(() => {

        if (profileUserData) {

            const tempUserPosts = profileUserData.userPosts;
            const tempArray = [];
            for (let i = 0; i < tempUserPosts.length; i++) {
    
                const post = tempUserPosts[i];
    
                if (post.mediaList.length > 0) {
                    for (let i = 0; i < post.mediaList.length; i++) {
                        const currentMedia = post.mediaList[i]
                        tempArray.push(currentMedia);
                    }
                }
    
            }

            setPostMediaArray([...tempArray]);

        }


    }, [profileUserData])

    function fetchUserProfileData () {

        console.log("LADY GAGA")

        Promise.all([
            fetch(`http://localhost:6790/api/grabuserrepliedPosts/${profileUserId}`).then(res => res.json()),
            fetch(`http://localhost:6790/api/grabposts/${profileUserId}`).then(res => res.json()),
            fetch(`http://localhost:6790/api/grabpostsandreposts/${profileUserId}`).then(res => res.json()),
            fetch(`http://localhost:6790/api/grabuserlikes/${profileUserId}`).then(res => res.json()),
            fetch(`http://localhost:6790/api/grabusers/${profileUserId}`).then(res => res.json()),
            fetch(`http://localhost:6790/api/grabuserfollowing/${profileUserId}`).then(res => res.json()),
            fetch(`http://localhost:6790/api/grabuserfollowers/${profileUserId}`).then(res => res.json())
        ])
        .then(([replies, posts, postsAndReposts, likes, user, following, followers]) => {
            const userData = {
                userReplies: replies,
                userPosts: posts,
                userPostsAndReposts: postsAndReposts,
                userProfile: user,
                userLiked: likes,
                userFollowing: following,
                userFollowers: followers
        };
        cachedProfiles[profileUserId] = userData;
        setProfileUserData(userData);
    })
    .catch(error => {
        console.error("Error fetching profile data:", error);
    });
    }

    useEffect(() => {
        if (profileUserData) {
            setProfileUser(profileUserData.userProfile)
        }

    }, [profileUserData])

    useEffect(() => {
        if (currentUser && currentUserProfileData && profileUserId == currentUser.id) {
            setProfileUserData(currentUserProfileData);
        }
    }, [currentUserProfileData])






    // useEffect(() => {
    //     console.log("user ID is " + profileUserId)
    //     fetch(`http://localhost:6790/api/grabusers/${profileUserId}`)
    //     .then(response => response.json())
    //     .then((data) => setProfileUser(data))
    //     .catch(error => console.error(error));
    // }, [profileUserId]);

    // useEffect(() => {
    //     fetch(`http://localhost:6790/api/grabuserreplies/${profileUserId}`)
    //     .then(response => response.json())
    //     .then((data) => setUserReplies([...data]))
    //     .catch(error => console.error(error));
    // }, [profileUser])

    // useEffect(() => {
    //     fetch(`http://localhost:6790/api/grabposts/${profileUserId}`)
    //     .then(response => response.json())
    //     .then((data) => setUserPosts([...data]))
    //     .catch(error => console.error(error));
    // }, [profileUser])

    // useEffect(() => {
    //     if (profileUser) {
    //       const profileUserId = profileUser.id;
    //       fetch(`http://localhost:6790/api/grabuserfollowing/${profileUserId}`)
    //       .then(response => response.json())
    //       .then(data => setProfileUserFollowing([...data]))
    //       .then(console.log("user following is " + profileUserFollowing))
    //       .catch(error => console.error(error));
    //     }
    //   }, [profileUser, userFollowing]);
    
    //   useEffect(() => {
    //     if (profileUser) {
    //       const profileUserId = profileUser.id;
    //       fetch(`http://localhost:6790/api/grabuserfollowers/${profileUserId}`)
    //       .then(response => response.json())
    //       .then(data => setProfileUserFollowers([...data]))
    //       .then(console.log("user userfollowers is " + profileUserFollowers))
    //       .catch(error => console.error(error));
    //     }
    //   }, [profileUser, userFollowing])

    // useEffect(() => {
    //     fetch(`http://localhost:6790/api/grabpostsandreposts/${profileUserId}`)
    //     .then(response => response.json())
    //     .then((data) => setUserPostsAndReposts([...data]))
    //     .catch(error => console.error(error));
    // }, [profileUser])

    // useEffect(() => {
    //     fetch(`http://localhost:6790/api/grabuserlikes/${profileUserId}`)
    //     .then(response => response.json())
    //     .then((data) => setUserLikedPosts([...data]))
    //     .catch(error => {
    //         console.error('Error fetching likes:', error);
    //         setUserLikedPosts([]);
    //     });
    // }, [])

    return(
        <div className="flex flex-col flex-grow">
            {profileUserData && profileUser ? (
                <>
            <div className="flex-[526] flex flex-col flex-grow bg-black h-full w-full text-white pt-3">

            <div className="flex-[45] flex h-full w-full px-4 border border-twitterBorder sticky top-0 z-20 backdrop-blur-md bg-black bg-opacity-70">
                <div className="w-8 mr-2 h-full flex justify-start text-lg items-center">
                    <FaArrowLeft onClick={() => navigate(-1)} className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                </div>
                <div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-xl font-bold">{profileUser.displayName}</h2> <MdOutlineVerified className="text-twitterBlue"/>
                    </div>
                <p className="text-twitterBorder">22 posts</p>
                </div>
            </div>

            <div className="flex-[240] h-full w-full relative border-x border-x-twitterBorder">
                <div>
                    <img className="h-52 w-full" src={profileUser.backGround}/>
                </div>
                <div className="z-45 absolute -translate-x-1 -bottom-1/4  mb-2 ml-4 h-35 w-35">
                    <img className="rounded-full h-32 w-32 object-cover border-4 border-black" src={profileUser.profilePic}/>
                </div>
            </div>
            <div className="flex-[200] flex-col h-full w-full flex px-4 py-3 border-x border-x-twitterBorder">

                <div className="flex-[69] h-full w-full flex">
                    <ProfileFeedFollow currentUser={currentUser} profileUser={profileUser} userFollowing={userFollowing} handleNewFollow={handleNewFollow}/>
                </div>

                <div className="flex-[47] h-full w-full mt-4">
                    <h2 className="font-bold text-2xl">{profileUser.displayName}</h2> 
                    <p className="text-sm">@{profileUser.username}</p>
                </div>
                <div className="flex-[65] h-full w-full flex flex-col gap-0.5">
                    <p>{profileUser.bio}</p>
                    <div className="flex gap-5 my-1 text-twitterBorder">
                        <div className="flex items-center gap-2">
                            <MdOutlineLocationOn className="text-twitterBorder"/>
                            <p>The Hague</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <MdCalendarMonth className="text-twitterBorder"/>
                            <p>Joined December 2023</p>
                        </div>
                    </div>
                    <div className="flex gap-8 mb-3 text-twitterBorder">
                        <p> <span className="text-white font-bold">{profileUserData.userFollowing.length}</span> Following</p>
                        <p> <span className="text-white font-bold">{profileUserData.userFollowers.length}</span> Followers</p>
                    </div>
                </div>

            </div>
            <div className="flex-[55] h-full w-full border-b-2 border-twitterBorder pb-0.5 border-x border-x-twitterBorder justify-evenly px-4 flex">
                <ProfileFeedTabState setTabState={setTabState} tabState={tabState}/>
            </div>




        </div>


            <div className="flex-[320] text-white flex flex-col-reverse justify-end h-full w-full border-l-2 border-r-2 border-twitterBorder" style={{ display: tabState === "posts" ? "block" : "none" }}>
                {profileUserData.userPostsAndReposts.map((post) => 
                    <div className="w-full h-fit pb-2 border-b-2 border-twitterBorder">
                        <PostTemplate setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} profileUser={profileUser} currentUser={currentUser} post={post} cachedMediaPosts={cachedMediaPosts} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} postReposts={post.repostList} postBookMarks={post.bookMarkList} postLikes={post.likeList} postCreator={post.creator} postMedia={post.mediaList} postReplies={post.replyList}/>
                    </div>
                )}
            </div>

            <div className="flex-[320] text-white flex flex-col-reverse justify-end h-full w-full border-l-2 border-r-2 border-twitterBorder" style={{ display: tabState === "likes" ? "block" : "none" }}>
                {profileUserData.userLiked.map((post) => 
                    <div className="w-full h-fit pb-2 border-b-2 border-twitterBorder">
                        <PostTemplate setCurrentUserProfileData={setCurrentUserProfileData} currentUserProfileData={currentUserProfileData} currentUser={currentUser} post={post} cachedMediaPosts={cachedMediaPosts} cachedAddedReplies={cachedAddedReplies} setCachedAddedReplies={setCachedAddedReplies} cachedReposts={cachedReposts} setCachedReposts={setCachedReposts} cachedBookMarks={cachedBookMarks} setCachedBookMarks={setCachedBookMarks} setCachedLikedPosts={setCachedLikedPosts} cachedLikedPosts={cachedLikedPosts} postReposts={post.repostList} postBookMarks={post.bookMarkList} postLikes={post.likeList} postCreator={post.creator} postMedia={post.mediaList} postReplies={post.replyList}/>
                    </div>
                )}
            </div>

            <div className="flex-[320] text-white flex flex-col-reverse justify-end h-full w-full border-l-2 border-r-2 border-twitterBorder" style={{ display: tabState === "media" ? "block" : "none" }}>
                <div className="grid grid-cols-3 gap-1">
                    {postMediaArray.map((image, index) => 
                        <div key={index} className="w-full aspect-square bg-gray-200">
                            <img 
                                onClick={() => navigate(`/imagepreview/${image.postId}/${image.position}`)}
                                src={image.mediaFile} 
                                className="hover:cursor-pointer w-full h-full object-cover rounded-md"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* <div style={{ display: tabState === "replies" ? "block" : "none" }}>
                {userReplies.map((reply) => 
                    <div className="w-full h-fit pb-2 border-b-2 border-twitterBorder">
                        <ReplyTemplate posts={posts} currentUser={currentUser} replyObject={reply} profileUser={profileUser} isAReplyParent={isAReplyParent}/>
                    </div>
                )}
            </div> */}

        </>
            ) : (
                <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                    <p>Loading...</p>
                </div>
            )}

        </div>
    )
}

export default ProfileFeed;