import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { IoIosCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { useParams } from "react-router"
import '../App.css'
import PostTemplate from "../PostTemplate";

function ProfileFeed ({posts, currentUser, setCurrentUser, setPosts}) {

    const {profileUserId} = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [userPosts, setUserPosts] = useState(null);

    useEffect(() => {
        console.log("user ID is " + profileUserId)
        fetch(`http://localhost:6790/api/grabusers/${profileUserId}`)
        .then(response => response.json())
        .then((data) => setProfileUser(data))
        .catch(error => console.error(error));
    }, [profileUserId]);

    useEffect(() => {
        fetch(`http://localhost:6790/api/grabposts/${profileUserId}`)
        .then(response => response.json())
        .then((data) => setUserPosts([...data]))
        .catch(error => console.error(error));
    }, [profileUser])

    useEffect(() => {
        console.log("userdata is: " + JSON.stringify(profileUser));
    }, [profileUser])

    useEffect(() => {
        console.log("userpost is: " + JSON.stringify(userPosts));
    }, [userPosts])

    return(
        <div className="flex flex-col flex-grow">
            {profileUser ? (
                <>
            <div className="flex-[526] flex flex-col flex-grow bg-black h-full w-full text-white pt-3">

            <div className="flex-[45] flex h-full w-full px-4">
                <div className="w-8 mr-2 h-full flex justify-start text-lg items-center">
                    <FaArrowLeft/>
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
                    <img className="rounded-full h-32 w-full object-cover border-4 border-black" src={profileUser.profileP}/>
                </div>
            </div>
            <div className="flex-[200] flex-col h-full w-full flex px-4 py-3">

                <div className="flex-[69] h-full w-full flex">
                    <div className="h-full w-full flex justify-end">
                        <div className="h-full w-1/5 flex justify-center items-center border-twitterBorder rounded-l-xl rounded-r-xl py-0.5 border-2">
                            <p className="text-4">Edit Profile</p>
                        </div>
                    </div>
                </div>

                <div className="flex-[47] h-full w-full mt-4">
                    <h2 className="font-bold text-2xl">{profileUser.displayName}</h2> 
                    <p className="text-sm">@{profileUser.username}</p>
                </div>
                <div className="flex-[65] h-full w-full flex flex-col gap-0.5">
                    <p>21 year old on my web development journey</p>
                    <div className="flex gap-5 mb-3 text-twitterBorder">
                        <div className="flex items-center gap-2">
                            <MdOutlineLocationOn className="text-twitterBorder"/>
                            <p>The Hague</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <MdCalendarMonth className="text-twitterBorder"/>
                            <p>Joined December 2023</p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

            </div>
            <div className="flex-[55] h-full w-full border-b-2 border-twitterBorder pb-0.5 justify-evenly px-4 flex">
                <div className="flex justify-center w-full h-full hover:bg-twitterBorder">
                    <p className="border-b-2 font-bold border-twitterBlue">Posts</p>
                </div>
                <div className="flex justify-center items-center w-full h-full hover:bg-twitterBorder">
                    <p>Replies</p>
                </div>
                <div className="flex justify-center items-center w-full h-full hover:bg-twitterBorder">
                    <p>Media</p>
                </div>
                <div className="flex justify-center items-center w-full h-full hover:bg-twitterBorder">
                    <p>Likes</p>
                </div>
            </div>




        </div>

        {userPosts ? (
            <div className="flex-[320] text-white flex flex-col-reverse justify-end h-full w-full border-l-2 border-r-2 border-twitterBorder">
                {userPosts.map((post) => 
                    <div className="w-full h-fit pb-2 border-b-2 border-twitterBorder">
                        <PostTemplate post={post} posts={posts}/>
                    </div>
                )}
            </div>
        ) : (
            <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                <p>Loading...</p>
            </div>
        )}

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