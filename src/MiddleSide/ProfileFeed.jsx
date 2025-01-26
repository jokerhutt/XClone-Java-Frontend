import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { IoIosCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { Link } from "react-router-dom";
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import ReplyTemplate from "../ReplyTemplate";
import { CiMail } from "react-icons/ci";
import '../App.css'
import PostTemplate from "../PostTemplate";
import { use } from "react";

function ProfileFeed ({handleNewFollow, posts, currentUser, setCurrentUser, setPosts, userFollowers, userFollowing}) {

    const {profileUserId} = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [userPosts, setUserPosts] = useState(null);
    const [userPostsAndReposts, setUserPostsAndReposts] = useState([]);
    const [userLikedPosts, setUserLikedPosts] = useState(null);
    const [tabState, setTabState] = useState("posts");
    const [userReplies, setUserReplies] = useState([]);
    const [profileUserFollowers, setProfileUserFollowers] = useState([]);
    const [profileUserFollowing, setProfileUserFollowing] = useState([]);
    const [isAReplyParent, setIsAReplyParent] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("user ID is " + profileUserId)
        fetch(`http://localhost:6790/api/grabusers/${profileUserId}`)
        .then(response => response.json())
        .then((data) => setProfileUser(data))
        .catch(error => console.error(error));
    }, [tabState]);

    useEffect(() => {
        fetch(`http://localhost:6790/api/grabuserreplies/${profileUserId}`)
        .then(response => response.json())
        .then((data) => setUserReplies([...data]))
        .catch(error => console.error(error));
    }, [profileUser])

    useEffect(() => {
        fetch(`http://localhost:6790/api/grabposts/${profileUserId}`)
        .then(response => response.json())
        .then((data) => setUserPosts([...data]))
        .catch(error => console.error(error));
    }, [profileUser])

    useEffect(() => {
        if (profileUser) {
          const profileUserId = profileUser.id;
          fetch(`http://localhost:6790/api/grabuserfollowing/${profileUserId}`)
          .then(response => response.json())
          .then(data => setProfileUserFollowing([...data]))
          .then(console.log("user following is " + profileUserFollowing))
          .catch(error => console.error(error));
        }
      }, [profileUser, userFollowing]);
    
      useEffect(() => {
        if (profileUser) {
          const profileUserId = profileUser.id;
          fetch(`http://localhost:6790/api/grabuserfollowers/${profileUserId}`)
          .then(response => response.json())
          .then(data => setProfileUserFollowers([...data]))
          .then(console.log("user userfollowers is " + profileUserFollowers))
          .catch(error => console.error(error));
        }
      }, [profileUser, userFollowing])

    useEffect(() => {
        fetch(`http://localhost:6790/api/grabpostsandreposts/${profileUserId}`)
        .then(response => response.json())
        .then((data) => setUserPostsAndReposts([...data]))
        .catch(error => console.error(error));
    }, [profileUser])

    useEffect(() => {
        fetch(`http://localhost:6790/api/grabuserlikes/${profileUserId}`)
        .then(response => response.json())
        .then((data) => setUserLikedPosts([...data]))
        .catch(error => {
            console.error('Error fetching likes:', error);
            setUserLikedPosts([]);
        });
    }, [])

    return(
        <div className="flex flex-col flex-grow">
            {profileUser && profileUserFollowers && profileUserFollowing && userFollowing && userFollowers && posts && userLikedPosts && userPostsAndReposts && userReplies ? (
                <>
            <div className="flex-[526] flex flex-col flex-grow bg-black h-full w-full text-white pt-3">

            <div className="flex-[45] flex h-full w-full px-4">
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
            <div className="flex-[240] h-full w-full relative">
                <div>
                    <img src={profileUser.backGround}/>
                </div>
                <div className="z-45 absolute -translate-x-1 -bottom-1/4  mb-2 ml-4 max-h-35 max-w-35">
                    <img className="rounded-full h-32 w-32 object-cover border-4 border-black" src={profileUser.profilePic}/>
                </div>
            </div>
            <div className="flex-[200] flex-col h-full w-full flex px-4 py-3">

                <div className="flex-[69] h-full w-full flex">
                    <div className="h-full w-full flex justify-end gap-6 items-center">
                        {currentUser && profileUser.id === currentUser.id? (
                        <div 
                        className="hover:cursor-pointer h-full w-1/5 flex justify-center items-center border-twitterBorder rounded-l-xl rounded-r-xl py-0.5 border-2">
                            <p className="text-4">Edit Profile</p>
                        </div>
                        ) : currentUser && profileUser && userFollowing.find(follow => follow.followedId === profileUser.id) ? (
                                <>
                                <Link to={`/messages/${currentUser.id}/${profileUser.id}`} className="text-xl hover:cursor-pointer">
                                    <CiMail />
                                </Link>
                                <div 
                                onClick={() => handleNewFollow(profileUser.id, currentUser.id)}
                                className="hover:cursor-pointer h-full w-1/5 flex justify-center items-center border-twitterBorder rounded-l-xl rounded-r-xl py-0.5 border-2">
                                    <p className="text-4">Following</p>
                                </div>
                                </>
                        ) : (
                            <div 
                            onClick={() => handleNewFollow(profileUser.id, currentUser.id)}
                            className="hover:cursor-pointer h-full w-1/5 flex justify-center items-center bg-white text-black rounded-l-xl rounded-r-xl py-0.5 border-2">
                                <p className="text-4">Follow</p>
                            </div>
                        )}

                    </div>
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
                        <p> <span className="text-white font-bold">{profileUserFollowing.length}</span> Following</p>
                        <p> <span className="text-white font-bold">{profileUserFollowers.length}</span> Followers</p>
                    </div>
                </div>

            </div>
            <div className="flex-[55] h-full w-full border-b-2 border-twitterBorder pb-0.5 justify-evenly px-4 flex">
                <div 
                onClick={() => setTabState("posts")}
                className="flex justify-center w-full h-full hover:bg-twitterBorder">
                    {tabState == "posts" ? (
                        <p className="border-b-2 font-bold border-twitterBlue">Posts</p>
                    ) : (
                        <p>Posts</p>
                    )}
                    
                </div>
                <div 
                onClick={() => setTabState("replies")}
                className="flex justify-center items-center w-full h-full hover:bg-twitterBorder">
                    {tabState == "replies" ? (
                        <p className="border-b-2 font-bold border-twitterBlue">Replies</p>
                    ) : (
                        <p>Replies</p>
                    )}
                </div>
                <div className="flex justify-center items-center w-full h-full hover:bg-twitterBorder">
                    <p>Media</p>
                </div>
                <div 
                onClick={() => setTabState("likes")}
                className="flex justify-center items-center w-full h-full hover:bg-twitterBorder">
                    {tabState == "likes" ? (
                        <p className="border-b-2 font-bold border-twitterBlue">Likes</p>
                    ) : (
                        <p>Likes</p>
                    )}
                    
                </div>
            </div>




        </div>


            <div className="flex-[320] text-white flex flex-col-reverse justify-end h-full w-full border-l-2 border-r-2 border-twitterBorder" style={{ display: tabState === "posts" ? "block" : "none" }}>
                {userPostsAndReposts.map((post) => 
                    <div className="w-full h-fit pb-2 border-b-2 border-twitterBorder">
                        <PostTemplate profileUser={profileUser} currentUser={currentUser} post={post} posts={posts}/>
                    </div>
                )}
            </div>

            <div className="flex-[320] text-white flex flex-col-reverse justify-end h-full w-full border-l-2 border-r-2 border-twitterBorder" style={{ display: tabState === "likes" ? "block" : "none" }}>
                {userLikedPosts.map((post) => 
                    <div className="w-full h-fit pb-2 border-b-2 border-twitterBorder">
                        <PostTemplate currentUser={currentUser} post={post} posts={posts}/>
                    </div>
                )}
            </div>

            <div style={{ display: tabState === "replies" ? "block" : "none" }}>
                {userReplies.map((reply) => 
                    <div className="w-full h-fit pb-2 border-b-2 border-twitterBorder">
                        <ReplyTemplate posts={posts} currentUser={currentUser} replyObject={reply} profileUser={profileUser} isAReplyParent={isAReplyParent}/>
                    </div>
                )}
            </div>

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